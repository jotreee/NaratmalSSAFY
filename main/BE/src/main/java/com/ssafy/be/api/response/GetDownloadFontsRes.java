package com.ssafy.be.api.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetDownloadFontsRes {
    String fontName;
    String webFontPath;
    String fontFamilyName;
}
