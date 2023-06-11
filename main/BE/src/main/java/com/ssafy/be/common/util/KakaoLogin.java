package com.ssafy.be.common.util;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
@PropertySource(value = "classpath:application.properties",encoding = "UTF-8")
public class KakaoLogin {
    @Value("${kakao.login.redirectURI}")
    private String redirectURI;

    private String changeURI;
    //String redirectURI="";

    @Value("${kakao.api.key}")
    private String ApiKey;
    public String getKaKaoAccessToken(String code){
        try{
            changeURI=URLEncoder.encode(redirectURI,"UTF-8");
        }
        catch (Exception e){
            e.printStackTrace();
        }
        String AccessToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try{
            System.out.println(redirectURI);
            URL url = new URL(reqURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=");
            sb.append(ApiKey);
            sb.append("&redirect_uri=");
            sb.append(changeURI);
            sb.append("&code=");
            sb.append(code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = connection.getResponseCode();
            if(responseCode!=200){
                System.out.println(responseCode);
                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                String line = "";
                String result = "";

                while ((line = br.readLine()) != null) {
                    result += line;
                }
                System.out.println(result);
                br.close();
                bw.close();

                return "Connection Fail";
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            JsonElement element =  JsonParser.parseString(result);
            br.close();
            bw.close();
            return element.getAsJsonObject().get("access_token").getAsString();

        }
        catch (Exception e){
            e.printStackTrace();
        }
        return AccessToken;
    }
    public String getEmail(String token){
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String email = "";
        try{
            URL url = new URL(reqURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Authorization", "Bearer "+token);
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("property_keys=[\"kakao_account.email\"]");
//            bw.write(sb.toString());
//            bw.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            JsonElement element =  JsonParser.parseString(result);
            br.close();
            //bw.close();
            return element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
        }
        catch (Exception e){

        }
        return email;
    }
}
