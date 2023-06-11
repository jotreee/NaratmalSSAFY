package com.ssafy.be.api.service;

import com.ssafy.be.db.entity.FontDownloadHistory;
import com.ssafy.be.db.entity.User;

public interface DownloadHistoryService {
    FontDownloadHistory registDownloadHistory(User user, Long fontSeq, String fontName);
}
