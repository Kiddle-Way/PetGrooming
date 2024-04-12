package com.petgrooming.dto;

import java.util.Date;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.petgrooming.domain.Member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO extends User {
	private static final long serialVersionUID = 1L;

	//회원 번호
	private Long m_num;
	//회원 이름
	private String m_name;
	//회원 생년월일
	private Date m_birth;
	//회원 성별
	private int m_gender;
	//회원 이메일
	private String m_email;
	//회원 비밀번호
	private String m_pw;
	//회원 전화번호
	private String m_phone;
	//회원 주소
	private String m_addr;
	//회원 강아지 견종
	private String dog_breed;
	//회원 강아지 이름
	private String dog_name;
	//회원 강아지 생년월일
	private Date dog_birth;
	//회원 강아지 주의사항
	private String dog_notice;
	//회원 강아지 상태
	private boolean m_state;
	//회원 강아지 개인정보 동의 내역
	private boolean m_agree;

	//회원 권한
	private List<String> roleNames = new ArrayList<>();

	// 기본 생성자 추가
	public MemberDTO() {
		super("", "", new ArrayList<>());
		this.roleNames = new ArrayList<>();
	}

	// 매개변수를 받는 생성자 추가
	public MemberDTO(Long m_num, String m_name, Date m_birth, int m_gender, String m_email, String m_pw, String m_phone,
			String m_addr, String dog_breed, String dog_name, Date dog_birth, String dog_notice, boolean m_state,
			boolean m_agree, List<String> roleNames) {
		super(m_email, m_pw,
				roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));

		this.m_num = m_num;
		this.m_name = m_name;
		this.m_birth = m_birth;
		this.m_gender = m_gender;
		this.m_email = m_email;
		this.m_pw = m_pw;
		this.m_phone = m_phone;
		this.m_addr = m_addr;
		this.dog_breed = dog_breed;
		this.dog_name = dog_name;
		this.dog_birth = dog_birth;
		this.dog_notice = dog_notice;
		this.m_state = m_state;
		this.m_agree = m_agree;
		this.roleNames = roleNames;
	}

	public Map<String, Object> getClaims() {
		Map<String, Object> dataMap = new HashMap<>();

		dataMap.put("m_num", m_num);
		dataMap.put("m_name", m_name);
		dataMap.put("m_birth", m_birth);
		dataMap.put("m_gender", m_gender);
		dataMap.put("m_email", m_email);
		dataMap.put("m_pw", m_pw);
		dataMap.put("m_phone", m_phone);
		dataMap.put("m_addr", m_addr);
		dataMap.put("dog_breed", dog_breed);
		dataMap.put("dog_name", dog_name);
		dataMap.put("dog_notice", dog_notice);
		dataMap.put("m_state", m_state);
		dataMap.put("m_agree", m_agree);
		dataMap.put("roleNames", roleNames);

		return dataMap;
	}

	public Member toMember() {
		Member member = new Member();
		member.setM_num(this.getM_num());
		member.setM_name(this.getM_name());
		member.setM_birth(this.getM_birth());
		member.setM_gender(this.getM_gender());
		member.setM_email(this.getM_email());
		member.setM_pw(this.getM_pw());
		member.setM_phone(this.getM_phone());
		member.setM_addr(this.getM_addr());
		member.setDog_breed(this.getDog_breed());
		member.setDog_name(this.getDog_name());
		member.setDog_birth(this.getDog_birth());
		member.setDog_notice(this.getDog_notice());
		member.setM_state(this.isM_state());
		member.setM_agree(this.isM_agree());
		return member;
	}
}
