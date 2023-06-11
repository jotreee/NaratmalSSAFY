package com.ssafy.be.common.util;

import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.codec.binary.Hex;

@Service
public class EncodeFontName {
    public String encodeFontName(String fontName) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String res;
        MessageDigest md = MessageDigest.getInstance("SHA1");
        //해쉬값 업데이트
        md.update(fontName.getBytes("utf-8"));
        //Byte To Hex
        res =  Hex.encodeHexString(md.digest());
        return res;
    }
}
