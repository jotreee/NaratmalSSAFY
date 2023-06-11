package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.Font;
import com.ssafy.be.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FontRepository extends JpaRepository<Font,Long> {
    Font findByFontName(String fontName);
    Page<Font> findByFontNameContains(Pageable page,String fontName);
    Page<Font> findByFontCreatorIn(Pageable page, List<User> users);

}
