package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.User;
import com.ssafy.be.db.entity.UserFont;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFontRepository extends JpaRepository<UserFont,Long> {
    List<UserFont> findByUser(User user);
    void deleteByUserAndFont(User user, Font font);
    UserFont findByUserAndFont(User user, Font font);
}
