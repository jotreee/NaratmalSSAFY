package com.ssafy.be.db.repository;

import com.ssafy.be.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long>  {

    User findByUserNickname(String nickname);
    User findByUserEmail(String email);
    List<User> findByUserNameContainsOrUserNicknameContainsIgnoreCaseOrUserLocationContains(String userName, String userNickName, String userLocation);
}
