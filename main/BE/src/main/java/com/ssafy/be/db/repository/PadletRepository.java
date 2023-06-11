package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.PadletContents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PadletRepository extends JpaRepository<PadletContents,Long> {
    List<PadletContents> findAllByLocation(String location);
}
