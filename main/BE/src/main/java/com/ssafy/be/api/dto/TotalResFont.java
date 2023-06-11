package com.ssafy.be.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class TotalResFont {
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
    @JsonProperty(value="isLike")
    boolean isLike;
}
