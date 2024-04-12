package com.petgrooming.util; 
 
//JWT 예외를 처리하는 사용자 정의 예외 클래스입니다
public class CustomJWTException extends RuntimeException { 
 public CustomJWTException(String msg) { 
  super(msg); 
 } 
} 