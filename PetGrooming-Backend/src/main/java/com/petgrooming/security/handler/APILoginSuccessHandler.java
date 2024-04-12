package com.petgrooming.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import com.google.gson.Gson;
import com.petgrooming.dto.MemberDTO;
import com.petgrooming.util.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

//API 로그인 성공 시 처리하는 핸들러 클래스입니다.
@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.info("-------------------------------------");
		log.info(authentication);
		log.info("-------------------------------------");

		MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();
		Map<String, Object> claims = memberDTO.getClaims();

		String accessToken = JWTUtil.generateToken(claims, 10); // 10 분
		String refreshToken = JWTUtil.generateToken(claims, 60 * 24); // 24 시간
		claims.put("accessToken", accessToken);
		claims.put("refreshToken", refreshToken);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(claims);

		response.setContentType("application/json; charset=UTF-8");
		PrintWriter printWriter = response.getWriter();
		printWriter.println(jsonStr);
		printWriter.close();
	}
}