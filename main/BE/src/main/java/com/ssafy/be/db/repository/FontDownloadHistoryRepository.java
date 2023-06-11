package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.FontDownloadHistory;
import com.ssafy.be.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FontDownloadHistoryRepository extends JpaRepository<FontDownloadHistory,Long> {
    FontDownloadHistory findByUserAndDownloadFont(User user, Font font);
}
