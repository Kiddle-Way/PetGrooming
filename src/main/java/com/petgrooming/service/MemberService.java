package com.petgrooming.service;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.Member2DTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

public interface MemberService {

	// 회원가입
	Long registerMember(Member member);

	// 회원 조회
	Member getMemberById(Long m_num);

	// 회원 정보 수정
	Member updateMember(Long m_num, Member member);

	// 회원탈퇴
	void updateMemberState(Long m_num);

	// 회원 리스트
	PageResponseDTO<Member2DTO> workList(PageRequestDTO pageRequestDTO);

	// 퇴직 리스트
	PageResponseDTO<Member2DTO> retireList(PageRequestDTO pageRequestDTO);

}
