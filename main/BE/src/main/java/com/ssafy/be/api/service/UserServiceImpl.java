package com.ssafy.be.api.service;

import com.ssafy.be.api.dto.Creator;
import com.ssafy.be.api.dto.ResFont;
import com.ssafy.be.api.dto.Waiting;
import com.ssafy.be.api.response.*;
import com.ssafy.be.common.util.JwtTokenUtil;
import com.ssafy.be.common.util.KakaoLogin;
import com.ssafy.be.db.entity.*;
import com.ssafy.be.db.repository.FontRepository;
import com.ssafy.be.db.repository.UserFontRepository;
import com.ssafy.be.db.repository.UserRepository;
import com.ssafy.be.db.repository.WaitCreateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    KakaoLogin kakaoLogin;
    @Autowired
    FontRepository fontRepository;
    @Autowired
    UserFontRepository userFontRepository;
    @Autowired
    WaitCreateRepository waitCreateRepository;


    @Override
    public Boolean checkNickname(String nickname) {
        User user = userRepository. findByUserNickname(nickname);
        if(user==null) {
            return true;
        }
        return false;
    }

    @Override
    public UserLoginRes login(String code){

        //인가 코드 kakao로 요청
        //카카오token받기
        String kakaoToken = kakaoLogin.getKaKaoAccessToken(code);
        System.out.println(kakaoToken);

        String email = kakaoLogin.getEmail(kakaoToken);
        System.out.println(email);
        User user = userRepository.findByUserEmail(email);
        if(user==null){
            return UserLoginRes.builder()
                    .isSignUp(true)
                    .loginResult(email)
                    .email("NotRegist")
                    .build();
        }
        else {
            //JWT 토큰 발급 받기
            String accessToken = JwtTokenUtil.getToken(email);
            return UserLoginRes.builder()
                    .isSignUp(false)
                    .loginResult(accessToken)
                    .email(user.getUserEmail())
                    .build();
        }
    }
    @Override
    public User getUserByUserEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    @Override
    public UserLoginRes registUser(String email, String location, String name, String nickname) {
        if(!checkNickname(nickname)){
            return UserLoginRes.builder().loginResult("already_using_nickname").isSignUp(false).build();
        }
        User user = User.builder()
                .userEmail(email)
                .userLocation(location)
                .userName(name)
                .userNickname(nickname)
                .build();
        if(userRepository.findByUserEmail(user.getUserEmail())!=null){
            return UserLoginRes.builder().loginResult("already_regist").isSignUp(false).build();
        }
            User registedUser = userRepository.save(user);
            if(registedUser == null){
                return UserLoginRes.builder().loginResult("fail_regist").isSignUp(false).build();
            }
            String token = JwtTokenUtil.getToken(registedUser.getUserEmail());
            return UserLoginRes.builder().loginResult(token).isSignUp(false).email(registedUser.getUserEmail()).build();
    }

    @Override
    public GetUserInfoRes getUserInfo(User inputUser) {
        User user = userRepository.findByUserEmail(inputUser.getUserEmail());
        List<WaitCreate> waitCreates = waitCreateRepository.findByUserSeq(user.getUserSeq());
        List<ResFont> resLike = new ArrayList<>();
        List<ResFont> resDownload = new ArrayList<>();
        List<ResFont> resMyFont = new ArrayList<>();
        List<Waiting> waitings = new ArrayList<>();

        //즐찾 폰트
        for(UserFont e : user.getLikeFonts()){
            Font temp = e.getFont();
            ResFont resFont = ResFont.builder()
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
                    .build();
            resLike.add(resFont);
        }
        //다운로드 폰트
        for(FontDownloadHistory e : user.getDownloadFonts()){
            Font temp = e.getDownloadFont();
            ResFont resFont = ResFont.builder()
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
                    .build();
            resDownload.add(resFont);
        }
        //제작 폰트
        for(Font temp : user.getCreateFonts()){
            if(temp.getFontDownloadFile()==null) continue;
            ResFont resFont = ResFont.builder()
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
                    .downloadCount(temp.getFontDownloadCount())
                    .fontSeq(temp.getFontSeq())
                    .build();
            resMyFont.add(resFont);
        }
        for(WaitCreate temp : waitCreates){
            Waiting waiting = Waiting.builder()
                    .isCreating(temp.getWaitCreateState()==0?false:true)
                    .creator(Creator.builder()
                            .email(user.getUserEmail())
                            .location(user.getUserLocation())
                            .name(user.getUserName())
                            .nickname(user.getUserNickname())
                            .build())
                    .fontName(temp.getWaitCreateName())
                    .build();
            waitings.add(waiting);
        }

        GetUserInfoRes res = GetUserInfoRes.builder()
                .userEmail(user.getUserEmail())
                .userLocation(user.getUserLocation())
                .userName(user.getUserName())
                .userNickname(user.getUserNickname())
                .downloadFonts(resDownload)
                .likeFonts(resLike)
                .myFonts(resMyFont)
                .waitingFonts(waitings)
                .build();
        return res;
    }

    @Override
    public UpdateUserInfoRes updateUserInfo(Long seq,String email, String location, String name, String nickname) {
        User user = User.builder()
                .userSeq(seq)
                .userEmail(email)
                .userLocation(location)
                .userName(name)
                .userNickname(nickname)
                .build();
        User updatedUser = userRepository.save(user);
        UpdateUserInfoRes res = UpdateUserInfoRes.builder()
                .userName(updatedUser.getUserName())
                .userLocation(updatedUser.getUserLocation())
                .userNickname(updatedUser.getUserNickname())
                .build();
        return res;
    }

    @Override
    @Transactional
    public IsSuccessRes toggleLikeFont(User user, Long targetId) {
        Font target = fontRepository.findById(targetId).get();
        IsSuccessRes res;
        if(userFontRepository.findByUserAndFont(user,target)!=null){
            userFontRepository.deleteByUserAndFont(user, target);
            if (userFontRepository.findByUserAndFont(user, target) == null) {
                //font 객체 생성
                target.updateFavCount("FavClear");
                fontRepository.save(target);
                res = IsSuccessRes.builder().isSuccess(true).msg("즐겨찾기 해제 성공").build();
            } else {
                res = IsSuccessRes.builder().isSuccess(false).msg("즐겨찾기 해제 실패").build();
            }
        } else {
                userFontRepository.save(UserFont.builder().font(target).user(user).build());
                target.updateFavCount("FavRegist");
                fontRepository.save(target);
                res = IsSuccessRes.builder().isSuccess(true).msg("즐겨찾기 성공").build();
            if(userFontRepository.findByUserAndFont(user, target)==null){
                res = IsSuccessRes.builder().isSuccess(false).msg("즐겨찾기 실패").build();
            }
        }
        return res;
    }

    @Override
    public List<GetDownloadFontsRes> getDownloadFonts(User user) {
        List<FontDownloadHistory> downloadFonts = userRepository.findByUserEmail(user.getUserEmail()).getDownloadFonts();
        List<GetDownloadFontsRes> res = new ArrayList<>();
        for(FontDownloadHistory t : downloadFonts){
            String path = t.getDownloadFont().getFontDownloadFile().getWoffSavedPath();
            String name = t.getDownloadFont().getFontName();
            res.add(GetDownloadFontsRes.builder().fontName(name).fontFamilyName(t.getDownloadFont().getFontDownloadFile().getFileSavedName()).webFontPath(path).build());
        }
        return res;
    }

}
