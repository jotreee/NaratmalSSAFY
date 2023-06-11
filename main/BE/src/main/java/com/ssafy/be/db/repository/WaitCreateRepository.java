package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.WaitCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaitCreateRepository extends JpaRepository<WaitCreate,Long> {
    public WaitCreate findByWaitCreateName(String WaitCreateName);
    public List<WaitCreate> findByUserSeq(Long userSeq);
    public List<WaitCreate> findByWaitCreateState(Integer state);
}
