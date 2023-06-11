# Load Generator Weight and Finetune

from utils.util import custom_img, knock_the_door
from utils.DataLoader import char_dataloader
import glob
from tqdm.auto import tqdm
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
from utils.font_test import common_han
from PIL import Image
# from fontforge.build.bin.fontforge import font
from models.AutoEncoder import AutoEncoder
from models.GAN import GeneativeModel
import cv2
import os
import requests
from img2png import img2png
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

class FontMaker():
    
    def __init__(self, fontname):
        self.fontname = fontname
        logger.info(fontname + " 훈련 시작")
        self.model, self.dataloader = self.finetuning()
        logger.info(fontname + " 훈련 완료")
        self.font_gen = self.generate(self.model, self.dataloader)
        logger.info(fontname + " 폴더 만들기")
        
        if not os.path.isdir(os.path.join(self.nowDir, 'FONT', self.fontname, 'img')):
            os.mkdir(os.path.join(self.nowDir, 'FONT', self.fontname, 'img'))
        
        logger.info(fontname + " png 제작 시작")
        img2png(self.font_gen, self.nowDir, self.fontname, common_han)
        logger.info(fontname + " png 제작 완료")
        
        # imgs = []
        # maxH = 1
        # for i in range(len(common_han)):
        #     img = np.abs(self.font_gen[i]).astype(np.uint8)
        #     tmp = np.where(img!=255)
        #     sizeh = img.shape[0]
        #     sizew = img.shape[1]
        #     hs,he,ws,we = max(min(tmp[0]),0), min(max(tmp[0]),sizeh), max(min(tmp[1]),0), min(max(tmp[1]),sizew)
        #     img = np.pad(img[hs:he + 1,ws:we + 1], pad_width=2, mode='constant', constant_values=255)
        #     imgs.append(img)
        #     maxH = max(maxH, img.shape[0])
        # ratio = 128 / maxH
        
        
        # for i in range(len(imgs)):
        #     img = imgs[i]
        #     newH = max(int(img.shape[0] * ratio), 1)
        #     newW = int(newH * img.shape[1] / max(1, img.shape[0])) + 1
        #     img = Image.fromarray(cv2.resize(img.astype(np.uint8), (newW, newH), interpolation=cv2.INTER_CUBIC))
        #     img.save(os.path.join(self.nowDir, 'FONT', self.fontname, 'img', f'{hex(ord(common_han[i]))[2:].upper()}.png'), 'PNG')
        

    def finetuning(self, img_dir="targetimg", 
                ae_weight="download/ae_weight.pt",
                character_emb_path="download/character_emb.npz",
                category_layer="download/category_emb.npz",
                gen_weight="download/gen_weight.pt",
                source_font_npz="fonts/source_font.npz",
                epochs=200,
                learning_rate=5e-4,
                display_sample=False):
        self.nowDir = os.path.dirname(__file__)
        img_dir=os.path.join(self.nowDir, 'FONT', self.fontname, img_dir)
        ae_weight=os.path.join(self.nowDir, ae_weight)
        character_emb_path=os.path.join(self.nowDir, character_emb_path)
        category_layer=os.path.join(self.nowDir, category_layer)
        gen_weight=os.path.join(self.nowDir, gen_weight)
        source_font_npz=os.path.join(self.nowDir, source_font_npz)
        # Load your img
        self.custom_char = custom_img(img_dir) # custom_char = 새로 이미징된 입력 이미지

        # Load character embedder
        self.device = torch.device("cpu")
        self.model = AutoEncoder()
        self.model.load_state_dict(torch.load(ae_weight, map_location='cpu'))
        self.char_embedding = []
        self.char_labels = []
        
        with torch.no_grad():
            for i in range(int(len(self.custom_char)/2)):
                inputs = torch.cat((torch.Tensor(self.custom_char[(2*i)][0]).reshape(1,1,32,32),torch.Tensor(self.custom_char[(2*i)+1][0]).reshape(1,1,32,32)),dim=0)
                output,emd = self.model(inputs)
                self.char_embedding.append(emd[0].to('cpu').numpy())
                self.char_labels.append(self.custom_char[(2*i)][1])
                self.char_embedding.append(emd[1].to('cpu').numpy())
                self.char_labels.append(self.custom_char[(2*i)+1][1])

                # Matching characters to common_hangul
                self.char_dictionary = knock_the_door(character_emb_path,self.char_embedding,self.char_labels)

        # Load layer embedding, source fonts
        self.datasets = np.load(source_font_npz)
        self.embeded = np.load(category_layer)
        self.source_fonts = self.datasets['source_fonts']
        self.embed = {}
        self.embed['cl1'] = torch.Tensor(self.embeded['cl1'])
        self.embed['cl2'] = torch.Tensor(self.embeded['cl2'])
        self.embed['cl3'] = torch.Tensor(self.embeded['cl3'])
        self.embed['cl4'] = torch.Tensor(self.embeded['cl4'])
        self.embed['cl5'] = torch.Tensor(self.embeded['cl5'])
        self.embed['cl6'] = torch.Tensor(self.embeded['cl6'])

        # DataLoader
        self.dataloader, self.sample_dataloader, self.train_dataloader = char_dataloader(self.source_fonts, self.char_dictionary, self.custom_char, self.char_labels, self.embed)

        # Load Generator
        self.model = GeneativeModel()
        self.model.load_state_dict(torch.load(gen_weight))
        # print("device :",device)
        self.model.to(self.device)

        self.gen_loss = nn.L1Loss()
        self.optimizer_G = torch.optim.AdamW(self.model.parameters(),lr=learning_rate) # You need to calibrate the learning rate (5e-4 ~ 4e-4 recomendded)

        # Trainstep
        # self.progress_bar = tqdm(range(self.train_dataloader.__len__()*epochs))
        before_train_loss = 100000.0
        train_straight = 0
        for epoch in range(epochs):
            self.model.train()
            total_loss = 0
            
            for b,batch in enumerate(self.train_dataloader):

                self.optimizer_G.zero_grad()

                inputs = batch['source'].reshape(-1,1,32,32)/255
                target = batch['target'].reshape(-1,1,32,32)/255
                inputs = inputs.to(self.device)
                target = target.to(self.device)
                catemb = [emb.to(self.device) for emb in batch['emb']]

                output = self.model(inputs,*catemb)
                loss = self.gen_loss(output,target)
                loss.backward()
                self.optimizer_G.step()

                with torch.no_grad():
                #     self.progress_bar.update(1)
                    total_loss += loss.sum()
                # print(epoch,total_loss.item())
            logger.info(str(epoch) + '/' + str(epochs) + " : " + self.fontname + " " + str(total_loss.item()))
            if total_loss.item() <= before_train_loss:
                before_train_loss = total_loss.item()
                train_straight = 0
            else:
                train_straight += 1
                if train_straight > 4:
                    break
        return self.model, self.dataloader

    def generate(self, model,
                dataloader,
                display_sample=False,
                device=torch.device("cpu") if torch.cuda.is_available() else torch.device("cpu"),):
        generated_font = []
        # progress_bar = tqdm(range(dataloader.__len__()))
        
        logger.info("generate 시작 : " + self.fontname)
        with torch.no_grad():
            for batch in dataloader:
                inputs = batch['source'].reshape(-1,1,32,32)/255
                target = batch['target'].reshape(-1,1,32,32)/255
                inputs = inputs.to(device)
                target = target.to(device)
                catemb = [emb.to(device) for emb in batch['emb']]
                
                output = model(target,*catemb)
                # progress_bar.update(1)
                for gf in output.reshape(-1,32,32).to('cpu').detach().numpy():
                    generated_font.append(np.vectorize(lambda x : x if x<=250 else 255)(gf*255))
                if display_sample:
                    plt.subplot(1,2,1)
                    plt.imshow(target[1].reshape(32,32).to('cpu').detach().numpy()*255,cmap='gray')
                    plt.axis('off')
                    plt.subplot(1,2,2)
                    x = output[1].reshape(32,32).to('cpu').detach().numpy()*255
                    x = np.vectorize(lambda x : x if x<250 else 255)(x)
                    plt.imshow(x,cmap='gray')
                    plt.axis('off')
                    plt.show()
        logger.info("generate 완료 : " + self.fontname)

        return generated_font
        
    def makeTTF(self, fontNameHash, fontName):
        logger.info("ttf, woff 제작 시작 : " + self.fontname)
        requests.post('https://xn--910b35kqzb51p93w.com/nodeexpress/makefont/', json={'fontNameHash' : fontNameHash, 'fontName' : fontName})
        logger.info("ttf, woff 제작 완료 : " + self.fontname)
        # requests.post('http://localhost:28080/nodeexpress/makefont/', json={'fontNameHash' : fontNameHash, 'fontName' : fontName})