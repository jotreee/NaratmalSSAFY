package com.ssafy.be.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Waiting {
    String fontName;
    Creator creator;
    @JsonProperty(value="isCreating")
    boolean isCreating;
}
