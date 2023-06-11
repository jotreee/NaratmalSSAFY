package com.ssafy.be.api.response;

import com.ssafy.be.api.dto.PadletResDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetPadletRes {
    List<PadletResDto> padletList;
}
