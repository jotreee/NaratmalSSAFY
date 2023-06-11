package com.ssafy.be.api.request;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;

@Data
@Builder
public class RegistUserReq {
    String userEmail;
    String userNickname;
    String userName;
    String userLocation;
}
