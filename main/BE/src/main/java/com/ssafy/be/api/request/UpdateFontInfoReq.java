package com.ssafy.be.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateFontInfoReq {
    String fontName;
    String fontDescription;
}
