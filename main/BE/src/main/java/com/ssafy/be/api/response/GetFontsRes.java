package com.ssafy.be.api.response;

import com.ssafy.be.api.dto.TotalResFont;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetFontsRes {
    List<TotalResFont> fonts;
}
