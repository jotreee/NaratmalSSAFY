from typing import Union

from fastapi import FastAPI

import os

import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "fontmaker"))

from fontmaker.generate import FontMaker, logger

from pydantic import BaseModel

from s3linker import s3_connection

import models_, database

import hashlib

import requests

import datetime

import send_finish_mail





app = FastAPI()

class Item(BaseModel):
    userSeq: int
    fontName: str
    fontDescription: str

pwd = os.path.dirname(os.path.realpath(__file__))

s3 = s3_connection()


@app.post("/fastapi/makefont")
def read_root(data : Item):
    nameHash = hashlib.sha1(data.fontName.encode('utf-8')).hexdigest()
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " 요청 확인")
    engine = database.create_engine(database.MYSQL_URL)
    session = database.Session(engine, autoflush=False)
    db_waitCreate = session.query(models_.TWaitCreate).filter(models_.TWaitCreate.wait_create_name == data.fontName).first()
    db_waitCreate.wait_create_state = 1
    session.commit()
    
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " DB 등록")
    maker = FontMaker(nameHash)
    maker.makeTTF(nameHash, data.fontName)
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " S3 저장 시작")
    ttfURL = 'https://d1mo4ucdb98b4w.cloudfront.net/' + nameHash + '.ttf'
    woffURL = 'https://d1mo4ucdb98b4w.cloudfront.net/' + nameHash + '.woff'
    try:
        s3.upload_file(os.path.join("fontmaker", "FONT", nameHash, "ttf_fonts", nameHash + ".ttf"), "naratmalssafy", nameHash + ".ttf")
        s3.upload_file(os.path.join("fontmaker", "FONT", nameHash, "ttf_fonts", nameHash + ".woff"), "naratmalssafy", nameHash + ".woff")
    except Exception as e:
        return {"msg" : "s3 저장 중 에러발생"}
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " S3 저장 완료")
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " 폰트, 파일정보 저장 시작")

    engine = database.create_engine(database.MYSQL_URL)
    session = database.Session(engine, autoflush=False)
    
    db_file = models_.TFile(file_original_name=data.fontName + '.ttf', file_saved_name='font_' + nameHash, file_saved_path=ttfURL, woff_saved_path=woffURL)
    db_user = session.query(models_.TUser).filter(models_.TUser.user_seq == data.userSeq).first()
    session.add(db_file)
    session.flush()
    db_font = models_.TFont(font_name=data.fontName, font_description=data.fontDescription, font_fav_count=0, t_user=db_user, font_download_count=0, t_file=db_file, font_reg_date=datetime.datetime.now())
    session.add(db_font)
    db_waitCreate = session.query(models_.TWaitCreate).filter(models_.TWaitCreate.wait_create_name == data.fontName).first()
    session.delete(db_waitCreate)
    
    session.commit()
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " 폰트, 파일정보 저장 완료")
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " 메일발송 시작")
    send_finish_mail.send_mail(db_user.user_email, data.fontName)
    logger.info(str(data.userSeq) + " " + data.fontName + " " + data.fontDescription + " " + nameHash + " 메일발송 완료")
    return {"ttfURL" : ttfURL, 'woffURL' : woffURL}