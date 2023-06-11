package com.ssafy.be.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Creator {
    String name;
    String email;
    String nickname;
    String location;
}
