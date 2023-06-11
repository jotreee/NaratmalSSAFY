package com.ssafy.be.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateUserInfoRes {
    String userNickname;
    String userName;
    String userLocation;
}
