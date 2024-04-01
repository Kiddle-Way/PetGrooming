package com.petgrooming.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.gson.Gson;
import com.petgrooming.dto.MemberDTO;
import com.petgrooming.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		log.info("---------------------- JWTCheckFilter --------------------");
		String authHeaderStr = request.getHeader("Authorization");
		if (authHeaderStr == null) {
		    // authHeaderStr이 null인 경우에 대한 예외 처리
		    // 로그를 출력하고 예외를 던집니다.
		    log.error("Authentication header is null. Unable to process JWT token.");
		    throw new IllegalStateException("Authentication header is null");
		} else {
		    // authHeaderStr이 null이 아닌 경우에는 기존의 로직을 수행합니다.
		    // JWT 토큰 확인 등의 작업을 이곳에 수행합니다.
		    // 예를 들어, 다음과 같이 작업을 수행할 수 있습니다:
		    // performJWTValidation(authHeaderStr);
		}
		if (authHeaderStr == null) {
		    // authHeaderStr이 null인 경우에 대한 예외 처리
		    // 로그를 출력하고 예외를 던집니다.
		    log.error("Authentication header is null. Unable to process JWT token.");
		    throw new IllegalStateException("Authentication header is null");
		} else {
		    // authHeaderStr이 null이 아닌 경우에는 기존의 로직을 수행합니다.
		    // JWT 토큰 확인 등의 작업을 이곳에 수행합니다.
		    // 예를 들어, 다음과 같이 작업을 수행할 수 있습니다:
		    // performJWTValidation(authHeaderStr);
		}
		try {
			// Bearer accestoken...
			String accessToken = authHeaderStr.substring(7);
			Map<String, Object> claims = JWTUtil.validateToken(accessToken);
			log.info("JWT claims: " + claims);

			// filterChain.doFilter(request, response); //이하 추가
	         Integer m_num = (Integer) claims.get("m_num");
	         String m_name = (String) claims.get("m_name");
	         Long m_birthLong = (Long) claims.get("m_birth");
	         Date m_birth = new Date(m_birthLong);
	         int m_gender = (int) claims.get("m_gender");
	         String m_pw = (String) claims.get("m_pw");
	         String m_email = (String) claims.get("m_email");
	         String m_phone = (String) claims.get("m_phone");
	         String m_addr = (String) claims.get("m_addr");
	         String dog_breed = (String) claims.get("dog_breed");
	         String dog_name = (String) claims.get("dog_name");
	         Long dog_birthLong = (Long) claims.get("dog_birth");
	         Date dog_birth = (dog_birthLong != null) ? new Date(dog_birthLong) : null; // null 체크 추가
	         String dog_notice = (String) claims.get("dog_notice");
	         Boolean m_state = (Boolean) claims.get("m_state");
	         Boolean m_agree = (Boolean) claims.get("m_agree");
	         List<String> roleNames = (List<String>) claims.get("roleNames");

	         MemberDTO memberDTO = new MemberDTO(m_num.longValue(), m_name, m_birth, m_gender, m_email, m_pw, m_phone, m_addr,
	                 dog_breed, dog_name, dog_birth, dog_notice, m_state, m_agree, roleNames);

			log.info("-----------------------------------");
			log.info(memberDTO);
			log.info(memberDTO.getAuthorities());

			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO,
					m_pw, memberDTO.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authenticationToken);

			filterChain.doFilter(request, response);
		} catch (Exception e) {
			log.error("JWT Check Error..............");
			log.error(e.getMessage());
			Gson gson = new Gson();
			String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
			response.setContentType("application/json");
			PrintWriter printWriter = response.getWriter();
			printWriter.println(msg);
			printWriter.close();
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		// Preflight 요청은 체크하지 않음
		if (request.getMethod().equals("OPTIONS")) {
			return true;
		}
		String path = request.getRequestURI();
		log.info("check uri.............." + path);
		// api/member/ 경로의 호출은 체크하지 않음
		if (path.startsWith("/api/member/")) {
			return true;
		}
		
		if (path.startsWith("/api/review/view")) {
			return true;
		}
		
		if (path.startsWith("/api/inquiry/view")) {
			return true;
		}
		
		if (path.startsWith("/api/designer/view")) {
			return true;
		}
		
		if (path.startsWith("/api/designer/view")) {
			return true;
		}
		
		if (path.startsWith("/api/notice/view")) {
			return true;
		}
		
		if (path.startsWith("/api/availabletime")) {
			return true;
		}
		return false;
	}
}