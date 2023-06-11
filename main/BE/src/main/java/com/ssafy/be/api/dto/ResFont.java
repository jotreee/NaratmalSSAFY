package com.ssafy.be.api.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ResFont
{
    //폰트 파일 주소, 이름 필요
    Creator creator;
    Long fontSeq;
    String fontName;
    String fontFamilyName;
    String fontDownloadPath;
    String webFontPath;
    Long favCount;
    String description;
    Long downloadCount;
    String regDate;

}
