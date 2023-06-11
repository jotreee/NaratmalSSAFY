package com.ssafy.be.api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class PadletResDto {

    //------패들릿 내용
    Long seq;
    String title;
    String content;
    String color;
    //------폰트 정보
    String fontName;
    String fontFamilyName;
    String fontPath;
    Long fontSeq;
    //------작성자 정보
    String userEmail;
    String userLocation;
    String userName;
    String userNickname;
}
