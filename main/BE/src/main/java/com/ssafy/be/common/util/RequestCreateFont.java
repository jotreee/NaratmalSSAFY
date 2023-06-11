package com.ssafy.be.common.util;

import com.ssafy.be.api.controller.FontController;
import com.ssafy.be.common.exception.CreateFailException;
import com.ssafy.be.db.entity.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
@Service

public class RequestCreateFont {
    @Value("${fastapi.request.url}")
    private String url;

    private final Logger logger = LogManager.getLogger(RequestCreateFont.class);
    @Async
    public Integer requestToFastAPI(String fontDescription, String fontName, User user){
//        String reqUrl;
//        try{
//            reqUrl = URLEncoder.encode(url,"UTF-8");
//        }catch (Exception e){
//            e.printStackTrace();
//            return -1;
//        }
        RestTemplate restTemplate = null;
        try{
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(10000);
            factory.setReadTimeout(1200000);
            restTemplate = new RestTemplate(factory);
        }catch (Exception e){
            e.printStackTrace();
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        Map<String,Object> body = new HashMap<>();
        body.put("fontDescription",fontDescription);
        body.put("fontName",fontName);
        body.put("userSeq",user.getUserSeq());
        HttpEntity<?> requestMessage = new HttpEntity<>(body,httpHeaders);
        try{
            restTemplate.postForEntity(url,requestMessage,String.class);
            logger.info("Request Fast-API: ["+ fontName+"]");
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return 0;
    }
}
