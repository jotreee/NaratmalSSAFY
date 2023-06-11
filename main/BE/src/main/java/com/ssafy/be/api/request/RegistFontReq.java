package com.ssafy.be.api.request;

import com.ssafy.be.api.dto.RegistFontInfo;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class RegistFontReq {
    String fontName;
    String description;
    List<MultipartFile> uploadImg;
}
