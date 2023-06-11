package com.ssafy.be.api.controller;

import com.ssafy.be.api.request.*;
import com.ssafy.be.api.response.*;
import com.ssafy.be.api.service.DownloadHistoryService;
import com.ssafy.be.api.service.UserService;
import com.ssafy.be.common.auth.UserDetail;
import com.ssafy.be.db.entity.User;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RequestMapping("/user")
@RestController

public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    DownloadHistoryService downloadHistoryService;
    private final Logger logger = LogManager.getLogger(UserController.class);
    @GetMapping("/checknickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname){
        //닉네임 있는지 확인
        logger.info("checkNickname nickname: ["+nickname+"]");
        boolean res = userService.checkNickname(nickname);
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginRes> login(@RequestBody UserLoginReq loginReq){
        UserLoginRes res = userService.login(loginReq.getCode());
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping()
    @ApiResponses({
            @ApiResponse(code = 901, message = "등록 실패"),
            @ApiResponse(code = 902, message = "이미 등록된 사용자"),
    })
    public ResponseEntity<UserLoginRes> registUser(@RequestBody RegistUserReq userInfo){
        //사용자 정보 받아서 검증...?
        logger.info("signUp userEmail: ["+userInfo.getUserEmail()+"] userName: ["+ userInfo.getUserName()+"]");
        UserLoginRes res = userService.registUser(
                userInfo.getUserEmail(),
                userInfo.getUserLocation(),
                userInfo.getUserName(),
                userInfo.getUserNickname()
        );
        if(res.getLoginResult().equals("fail_regist")) {
            return ResponseEntity.status(901).body(res);
        }
        if(res.getLoginResult().equals("already_regist")){
            return ResponseEntity.status(902).body(res);
        }
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping()
    public ResponseEntity<GetUserInfoRes> getUserInfo(@ApiIgnore Authentication authentication){
        UserDetail userDetails = (UserDetail)authentication.getDetails();
        User user = userDetails.getUser();
        logger.info("getUserInfo requestUser: ["+user.getUserEmail()+"]");
        GetUserInfoRes res = userService.getUserInfo(user);
        return ResponseEntity.status(200).body(res);
    }

    @PutMapping()
    public ResponseEntity<UpdateUserInfoRes> updateUserInfo(@ApiIgnore Authentication authentication, @RequestBody UpdateUserInfoReq userInfo){
        UserDetail userDetails = (UserDetail)authentication.getDetails();
        User user = userDetails.getUser();
        logger.info("updateUserInfo requestUser: ["+user.getUserEmail()+"] "+" name: ["+userInfo.getUserName()+"]"+"nickname: ["+userInfo.getUserNickname()+"] "+" location: ["+userInfo.getUserLocation()+"]");
        UpdateUserInfoRes res = userService.updateUserInfo(
                user.getUserSeq(),
                user.getUserEmail(),
                userInfo.getUserLocation(),
                userInfo.getUserName(),
                userInfo.getUserNickname()
        );
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/toggleLike")
    public ResponseEntity<IsSuccessRes> likeFontToggle(@ApiIgnore Authentication authentication, @RequestBody LikeFontToggleReq target){
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        User user = userDetail.getUser();
        logger.info("toggleLike requestUser: ["+user.getUserEmail()+"] "+" fontSeq: ["+target.getId()+"]");
        IsSuccessRes res = userService.toggleLikeFont(user,target.getId());
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("/download")
    //TODO 반환타입 Void
    public ResponseEntity<IsSuccessRes> registDownloadHistory(@ApiIgnore Authentication authentication, @RequestBody RegistDownloadHistoryReq req){
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        User user = userDetail.getUser();
        logger.info("registDownloadHistory requestUser: ["+user.getUserEmail()+"] "+" fontName: ["+req.getFontName()+"]");
        downloadHistoryService.registDownloadHistory(user,req.getFontSeq(), req.getFontName());
        return ResponseEntity.status(200).body(IsSuccessRes.builder().isSuccess(true).msg("다운로드 기록이 저장되었습니다.").build());
    }

    @GetMapping("/download")
    public ResponseEntity<List<GetDownloadFontsRes>> getDownloadFonts(@ApiIgnore Authentication authentication){
        UserDetail userDetail = (UserDetail) authentication.getDetails();
        User user = userDetail.getUser();
        logger.info("getDownloadFonts requestUser: ["+user.getUserEmail()+"]");
        List<GetDownloadFontsRes> res = userService.getDownloadFonts(user);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/checkToken")
    public ResponseEntity<IsSuccessRes> getCheckToken(@ApiIgnore Authentication authentication){
        return ResponseEntity.status(200).body(IsSuccessRes.builder().isSuccess(true).msg("Valid Token").build());
    }
}
