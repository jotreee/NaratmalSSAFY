package com.ssafy.be.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.be.api.dto.Creator;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GetFontDetailRes {
    Creator creator;
    Long fontSeq;
    String fontName;
    String fontFamilyName;
    String fontDownloadPath;
    String webFontPath;
    Long favCount;
    String fileName;
    String description;
    Long downloadCount;
    String regDate;
    @JsonProperty(value="isLike")
    boolean isLike;
    boolean isDownload;
}
