package com.petgrooming.service;

import com.petgrooming.dto.MemberDTO;

public interface MemberService {

	// 회원가입
	String createMember(MemberDTO memberDTO);

	// 내정보
	MemberDTO getMemberById(Long m_num);

	// 내정보 수정
	void modifyMember(MemberDTO memberDTO);

	// 회원탈퇴
	void updateMemberState(Long m_num);
	
}
