package com.petgrooming.util;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

//JWT 토큰을 생성하고 유효성을 검증하는 유틸리티 클래스입니다.
@Log4j2
public class JWTUtil {
	// 임시로 사용하는 키 값입니다. 실제 프로젝트에서는 보안상 적절한 방식으로 키를 관리해야 합니다.
	private static String key = "1234567890123456789012345678901234567890";

	public static String generateToken(Map<String, Object> valueMap, int min) {
		SecretKey key = null;

		try {
			key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}

		String jwtStr = Jwts.builder().setHeader(Map.of("typ", "JWT")).setClaims(valueMap)
				.setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant())).signWith(key).compact();

		return jwtStr;
	}

	public static Map<String, Object> validateToken(String token) {
		Map<String, Object> claim = null;
		try {
			SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
			// 파싱 및 검증, 실패 시 에러
			claim = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
		} catch (MalformedJwtException malformedJwtException) {
			throw new CustomJWTException("MalFormed");
		} catch (ExpiredJwtException expiredJwtException) {
			throw new CustomJWTException("Expired");
		} catch (InvalidClaimException invalidClaimException) {
			throw new CustomJWTException("Invalid");
		} catch (JwtException jwtException) {
			throw new CustomJWTException("JWTError");
		} catch (Exception e) {
			throw new CustomJWTException("Error");
		}
		return claim;
	}
}