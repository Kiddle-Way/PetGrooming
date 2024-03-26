package com.petgrooming.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // CORS 설정을 구성하는 메서드
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 요청에 대해 CORS 설정을 추가
        registry.addMapping("/**")
                // 허용할 오리진(Origin)을 지정 (여기서는 로컬 3000번 포트로의 요청만 허용)
                .allowedOrigins("http://localhost:3000")
                // 허용할 HTTP 메서드를 지정 (여기서는 모든 메서드를 허용)
                .allowedMethods("*");
    }
}