package com.ssafy.be.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserInfoReq {
    String userNickname;
    String userName;
    String userLocation;
}
