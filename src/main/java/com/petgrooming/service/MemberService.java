package com.petgrooming.service;

import java.util.Optional;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.MemberDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

public interface MemberService {

	// 회원가입
	Long registerMember(Member member);

	// 내정보
	MemberDTO getMemberById(Long m_num);

	// 내정보 수정
	void modifyMember(MemberDTO memberDTO);

	// 회원탈퇴
	void updateMemberState(Long m_num);
	
	// 회원 리스트
	PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO);

	/*
	 * // 회원 로그인 Optional<Member> login(String m_email, String m_pw);
	 */
	
}
