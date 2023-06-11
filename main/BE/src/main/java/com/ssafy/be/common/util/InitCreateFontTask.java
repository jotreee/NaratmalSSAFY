package com.ssafy.be.common.util;

import com.ssafy.be.db.entity.WaitCreate;
import com.ssafy.be.db.repository.UserRepository;
import com.ssafy.be.db.repository.WaitCreateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class InitCreateFontTask {

    private  final WaitCreateRepository waitCreateRepository;
    private  final RequestCreateFont requestCreateFont;
    private final UserRepository userRepository;
    @PostConstruct
    public void setCreateQueue(){
        List<WaitCreate> requests = waitCreateRepository.findByWaitCreateState(0);
        for(WaitCreate request : requests){
            requestCreateFont.requestToFastAPI(request.getWaitDescription(), request.getWaitCreateName(), userRepository.findById(request.getUserSeq()).get());
        }
    }
}
