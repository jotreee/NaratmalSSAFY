package com.ssafy.be.api.service;

import com.ssafy.be.api.response.GetPadletRes;
import com.ssafy.be.api.response.IsSuccessRes;
import com.ssafy.be.db.entity.User;

public interface PadletService {
    public IsSuccessRes registPadlet(User user, Long fontSeq, String content, String title, String color, String location);
    public GetPadletRes getPadlet(String location);
    public IsSuccessRes deletePadlet(Long padletSeq);
}
