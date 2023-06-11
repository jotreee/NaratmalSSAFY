package com.ssafy.be.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckFontNameRes {
    boolean isUsable;
    String msg;
}
