package com.ssafy.be.api.service;

import com.ssafy.be.api.dto.PadletResDto;
import com.ssafy.be.api.response.GetPadletRes;
import com.ssafy.be.api.response.IsSuccessRes;
import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.PadletContents;
import com.ssafy.be.db.entity.User;
import com.ssafy.be.db.repository.FontRepository;
import com.ssafy.be.db.repository.PadletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PadletServiceImpl implements PadletService{
    @Autowired
    FontRepository fontRepository;
    @Autowired
    PadletRepository padletRepository;
    @Override
    public IsSuccessRes registPadlet(User user, Long fontSeq, String content, String title, String color, String location) {
        Font usedFont = fontRepository.findById(fontSeq).get();
        PadletContents save = PadletContents.builder()
                .title(title)
                .content(content)
                .font(usedFont)
                .user(user)
                .location(location)
                .color(color)
                .build();
        if(padletRepository.save(save)==null){
            return IsSuccessRes.builder().isSuccess(false).msg("등록에 실패했습니다.").build();
        }
        return IsSuccessRes.builder().isSuccess(true).msg("등록에 성공했습니다.").build();
    }

    @Override
    public GetPadletRes getPadlet(String location) {
        List<PadletContents> padlets = padletRepository.findAllByLocation(location);
        List<PadletResDto> resList = new ArrayList<>();
        for(PadletContents p : padlets){
            PadletResDto item = PadletResDto.builder()
                    .seq(p.getPadletContentsSeq())
                    .title(p.getTitle())
                    .color(p.getColor())
                    .content(p.getContent())
                    .fontName(p.getFont().getFontName())
                    .fontPath(p.getFont().getFontDownloadFile().getWoffSavedPath())
                    .fontSeq(p.getFont().getFontSeq())
                    .userEmail(p.getUser().getUserEmail())
                    .userName(p.getUser().getUserName())
                    .userLocation(p.getUser().getUserLocation())
                    .userNickname(p.getUser().getUserNickname())
                    .fontFamilyName(p.getFont().getFontDownloadFile().getFileSavedName())
                    .build();
            resList.add(item);
        }
        return GetPadletRes.builder().padletList(resList).build();
    }

    @Override
    public IsSuccessRes deletePadlet(Long padletSeq) {
        padletRepository.deleteById(padletSeq);
        if(!padletRepository.findById(padletSeq).isPresent()){
            return IsSuccessRes.builder().isSuccess(true).msg("삭제에 성공했습니다.").build();
        }
        return IsSuccessRes.builder().isSuccess(false).msg("삭제에 실패했습니다.").build();
    }
}
