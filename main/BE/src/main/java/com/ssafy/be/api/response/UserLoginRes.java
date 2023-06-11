package com.ssafy.be.api.response;

import com.ssafy.be.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class UserLoginRes {
    Boolean isSignUp;
    String loginResult;
    String email;
}
