package com.ssafy.be.common.auth;

import com.ssafy.be.api.service.UserService;
import com.ssafy.be.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class NaratmalssafyDetailService implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userService.getUserByUserEmail(userEmail);
        if(user != null) {

            UserDetail userDetails = new UserDetail(user);
            return userDetails;
        }
        return null;
    }
}
