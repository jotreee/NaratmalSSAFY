package com.ssafy.be.api.response;

import com.ssafy.be.api.dto.ResFont;
import com.ssafy.be.api.dto.Waiting;
import com.ssafy.be.db.entity.Font;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetUserInfoRes {
    //사용자 기본 정보(이름, 이메일, 지역, 닉네임)
    String userName;
    String userEmail;
    String userLocation;
    String userNickname;

    //내 폰트 (리스트)
    List<ResFont> myFonts;
    //즐겨찾기 한 폰트(리스트)
    List<ResFont> likeFonts;
    //다운로드 한 폰트(리스트)
    List<ResFont> downloadFonts;
    //제작 대기중
    List<Waiting> waitingFonts;


}
