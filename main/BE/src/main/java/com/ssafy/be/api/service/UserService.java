package com.ssafy.be.api.service;


import com.ssafy.be.api.response.*;
import com.ssafy.be.db.entity.User;

import java.util.List;

public interface UserService {
    Boolean checkNickname(String nickname);
    UserLoginRes login(String code);
    User getUserByUserEmail(String email);
    UserLoginRes registUser(String email, String location, String name, String nickname);
    GetUserInfoRes getUserInfo(User user);
    UpdateUserInfoRes updateUserInfo(Long seq,String email, String location, String name, String nickname);
    public IsSuccessRes toggleLikeFont(User user, Long targetId);
    List<GetDownloadFontsRes> getDownloadFonts(User user);
}
