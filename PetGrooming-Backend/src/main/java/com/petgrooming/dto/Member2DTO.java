package com.petgrooming.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//리스트 추출 용
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member2DTO {
	// 회원 번호
	private Long m_num;
	// 회원 이름
	private String m_name;
	// 회원 생년월일
	private Date m_birth;
	// 회원 성별
	private int m_gender;
	// 회원 이메일
	private String m_email;
	// 회원 비밀번호
	private String m_pw;
	// 회원 전화번호
	private String m_phone;
	// 회원 주소
	private String m_addr;
	// 회원 강아지 견종
	private String dog_breed;
	// 회원 강아지 이름
	private String dog_name;
	// 회원 강아지 생년월일
	private Date dog_birth;
	// 회원 강아지 주의사항
	private String dog_notice;
	// 회원 상태
	private boolean m_state;
	// 회원 개인정보 동의 내역
	private boolean m_agree;
	// 회원 권한
	private List<String> roleNames = new ArrayList<>();
}
