package com.petgrooming.service;

import java.util.Optional;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.MemberDTO;
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
	PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO);

}
