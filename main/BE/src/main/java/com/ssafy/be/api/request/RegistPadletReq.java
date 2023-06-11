package com.ssafy.be.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegistPadletReq {
    String content;
    String title;
    String color;
    String location;
    Long fontSeq;
}
