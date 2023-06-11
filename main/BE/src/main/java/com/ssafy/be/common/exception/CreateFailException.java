package com.ssafy.be.common.exception;

public class CreateFailException extends RuntimeException{
    public CreateFailException(){

    }
    CreateFailException(String message){
        super(message);
    }
}
