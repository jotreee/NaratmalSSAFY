package com.ssafy.be.api.service;

import com.ssafy.be.api.dto.Creator;
import com.ssafy.be.api.dto.TotalResFont;
import com.ssafy.be.api.response.CheckFontNameRes;
import com.ssafy.be.api.response.GetFontDetailRes;
import com.ssafy.be.api.response.GetFontsRes;
import com.ssafy.be.common.exception.CreateFailException;
import com.ssafy.be.common.util.EncodeFontName;
import com.ssafy.be.common.util.RequestCreateFont;
import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.User;
import com.ssafy.be.db.entity.UserFont;
import com.ssafy.be.db.entity.WaitCreate;
import com.ssafy.be.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FontServiceImpl implements FontService {
    //즐겨찾기 수 다운로드 수
    @Autowired
    FontRepository fontRepository;
    @Autowired
    UserFontRepository userFontRepository;
    @Autowired
    FontDownloadHistoryRepository fontDownloadHistoryRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RequestCreateFont requestCreateFont;
    @Autowired
    EncodeFontName encodeFontName;
    @Autowired
    WaitCreateRepository waitCreateRepository;

    @Value("${users.handwriteImg.savePath}")
    private String saveFolderPath;

    @Override
    public GetFontsRes getFonts(User user, Pageable pageable, String flag, String keyword) {
        Page<Font> fontAll;
        if("fontName".equals(flag)){
            fontAll = fontRepository.findByFontNameContains(pageable,keyword);
        }
        else if("nickName".equals(flag)){
            List<User> creators = userRepository.findByUserNameContainsOrUserNicknameContainsIgnoreCaseOrUserLocationContains(keyword,keyword,keyword);
            fontAll = fontRepository.findByFontCreatorIn(pageable,creators);
        }
        else{
            fontAll =  fontRepository.findAll(pageable);
        }

        List<TotalResFont> resInput = new ArrayList<>();
        if(user != null){
            List<UserFont> myLike = userFontRepository.findByUser(user);
            HashSet<Long> forCheck =new HashSet<Long>();
            for(UserFont u : myLike){
                forCheck.add(u.getFont().getFontSeq());
            }
            for(Font temp : fontAll.getContent()){
                if(temp.getFontDownloadFile()==null) continue;
                TotalResFont totalResFont = TotalResFont.builder()
                        .creator(Creator.builder()
                                .email(temp.getFontCreator().getUserEmail())
                                .location(temp.getFontCreator().getUserLocation())
                                .name(temp.getFontCreator().getUserName())
                                .nickname(temp.getFontCreator().getUserNickname())
                                .build())
                        .description(temp.getFontDescription())
                        .fontDownloadPath(temp.getFontDownloadFile().getFileSavedPath())
                        .fontName(temp.getFontName())
                        .webFontPath(temp.getFontDownloadFile().getWoffSavedPath())
                        .fontFamilyName(temp.getFontDownloadFile().getFileSavedName())
                        .favCount(temp.getFontFavCount())
                        .fontSeq(temp.getFontSeq())
                        .downloadCount(temp.getFontDownloadCount())
                        .regDate(temp.getFontRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                        .isLike(forCheck.contains(temp.getFontSeq()))
                        .build();
                resInput.add(totalResFont);
            }
        }
        else{
            for(Font temp : fontAll.getContent()){
                if(temp.getFontDownloadFile()==null) continue;
                TotalResFont totalResFont = TotalResFont.builder()
                        .creator(Creator.builder()
                                .email(temp.getFontCreator().getUserEmail())
                                .location(temp.getFontCreator().getUserLocation())
                                .name(temp.getFontCreator().getUserName())
                                .nickname(temp.getFontCreator().getUserNickname())
                                .build())
                        .description(temp.getFontDescription())
                        .fontDownloadPath(temp.getFontDownloadFile().getFileSavedPath())
                        .fontName(temp.getFontName())
                        .fontFamilyName(temp.getFontDownloadFile().getFileSavedName())
                        .webFontPath(temp.getFontDownloadFile().getWoffSavedPath())
                        .favCount(temp.getFontFavCount())
                        .fontSeq(temp.getFontSeq())
                        .downloadCount(temp.getFontDownloadCount())
                        .regDate(temp.getFontRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                        .isLike(false)
                        .build();
                resInput.add(totalResFont);
            }
        }

        GetFontsRes res = GetFontsRes.builder().fonts(resInput).build();
        return res;
    }

    @Override
    public GetFontDetailRes getFont(User user, Long fontSeq) {
        Font target = fontRepository.findById(fontSeq).get();
        boolean isDownload =false;
        boolean isLike = false;
        if(user!=null){
            //다운로드 했는지 확인해
            isDownload = fontDownloadHistoryRepository.findByUserAndDownloadFont(user, target) != null;
            //즐겨찾기 했는지 확인해
            isLike = userFontRepository.findByUserAndFont(user, target) != null;
        }
        GetFontDetailRes res = GetFontDetailRes.builder()
                .creator(Creator.builder()
                        .email(target.getFontCreator().getUserEmail())
                        .location(target.getFontCreator().getUserLocation())
                        .name(target.getFontCreator().getUserName())
                        .nickname(target.getFontCreator().getUserNickname())
                        .build())
                .description(target.getFontDescription())
                .downloadCount(target.getFontDownloadCount())
                .fontSeq(target.getFontSeq())
                .favCount(target.getFontFavCount())
                .fileName(target.getFontDownloadFile().getFileSavedName())
                .fontName(target.getFontName())
                .fontFamilyName(target.getFontDownloadFile().getFileSavedName())
                .fontDownloadPath(target.getFontDownloadFile().getFileSavedPath())
                .webFontPath(target.getFontDownloadFile().getWoffSavedPath())
                .isDownload(isDownload)
                .isLike(isLike)
                .regDate(target.getFontRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
        //폰트 반환해
        return res;
    }

    @Override
    public CheckFontNameRes checkFontName(String fontName) {
        CheckFontNameRes res;
        Font findRes= fontRepository.findByFontName(fontName);
        WaitCreate findRes2 = waitCreateRepository.findByWaitCreateName(fontName);
        if(findRes ==null&&findRes2==null){
            res = CheckFontNameRes.builder()
                    .isUsable(true)
                    .msg("사용가능한 폰트 이름입니다.")
                    .build();
        }
        else {
            res = CheckFontNameRes.builder()
                    .isUsable(false)
                    .msg("이미 사용중인 폰트 이름입니다.")
                    .build();
        }
        return res;
    }

    @Override
    public Long registWaitInfo(String fontName, User user, String fontDescription) {
        WaitCreate waitCreate = WaitCreate.builder()
                .waitCreateName(fontName)
                .waitCreateState(0)
                .userSeq(user.getUserSeq())
                .waitDescription(fontDescription)
                .build();
        if(!checkFontName(fontName).isUsable()){
            return -1L;
        }
        WaitCreate res = waitCreateRepository.save(waitCreate);
        return res.getWaitCreateSeq();
    }

    @Override
    public Long createFont(List<MultipartFile> uploadImg, String fontDescription, String fontName,User user) {
        //사진 저장하기
        String path;
        File file;
        String contentType;
        String [] fileNames = {"다","람","쥐","헌","쳇","바","퀴","에","타","고","파"};
        int idx = 0;
        //String absolutePath = new File("").getAbsolutePath() + "\\";
        String absolutePath = System.getProperty("user.dir");;
        String dirName = "";
        try{
            dirName = encodeFontName.encodeFontName(fontName);
        }catch (Exception e){
            e.printStackTrace();
            return -6L;
        }

        path = saveFolderPath + dirName + "/targetimg";
        file  = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
        for(MultipartFile img : uploadImg){
            if(idx==0) { // "다" 제외
                idx++;
                continue;
            }
            if(img.isEmpty()){
                return -2L;
            }
            contentType = img.getContentType();
            if(ObjectUtils.isEmpty(contentType)){
                return -3L;
            }
            if(!contentType.contains("image/png")){
                return -4L;
            }
            file = new File(absolutePath+path+"/"+fileNames[idx]+".png");
            idx++;
            try{
                img.transferTo(file);
            } catch (IOException e){
                e.printStackTrace();
                return -5L;
            }

        }

        if(registWaitInfo(fontName,user,fontDescription)==-1) return -1L;
        //fast API fontSeq 전달하기
        requestCreateFont.requestToFastAPI(fontDescription,fontName,user);
        return 0L;
    }

    @Override
    public Long updateFontInfo(String fontName, String fontDescription, User user) {
        Font font = fontRepository.findByFontName(fontName);
        if(font == null){
            return -3L;
        }
        if(font.getFontDownloadFile()==null){
            return-2L;
        }
        if(!user.getUserEmail().equals(font.getFontCreator().getUserEmail())){
            return -1L;
        }
        font.updateInfo(fontDescription);
        Font updatedFont = fontRepository.save(font);
        return updatedFont.getFontSeq();
    }
}
