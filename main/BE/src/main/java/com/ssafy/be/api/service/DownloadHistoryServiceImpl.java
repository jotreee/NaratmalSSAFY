package com.ssafy.be.api.service;

import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.FontDownloadHistory;
import com.ssafy.be.db.entity.User;
import com.ssafy.be.db.repository.FontDownloadHistoryRepository;
import com.ssafy.be.db.repository.FontRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DownloadHistoryServiceImpl implements DownloadHistoryService{
    @Autowired
    FontDownloadHistoryRepository fontDownloadHistoryRepository;
    @Autowired
    FontRepository fontRepository;
    @Override
    public FontDownloadHistory registDownloadHistory(User user, Long fontSeq, String fontName) {
        //다운로드 횟수 중복 체크 할건지
        Font downloadFont = fontRepository.findById(fontSeq).get();
        if(fontDownloadHistoryRepository.findByUserAndDownloadFont(user,downloadFont)==null) {
            FontDownloadHistory downloadHistory = FontDownloadHistory.builder()
                    .downloadFont(downloadFont)
                    .user(user)
                    .build();
            fontDownloadHistoryRepository.save(downloadHistory);
        }
        downloadFont.updateDownloadCount();
        fontRepository.save(downloadFont);
        return null;
    }
}
