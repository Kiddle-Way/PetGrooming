package com.petgrooming.service;

import com.petgrooming.dto.MemberDTO;
import com.petgrooming.domain.Member;
import com.petgrooming.repository.MemberRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberRepository memberRepository;

	@Override
	public String createMember(MemberDTO memberDTO) {
		Member member = convertToEntity(memberDTO);
		Member savedMember = memberRepository.save(member);
		return savedMember.getM_email();
	}

	@Override
	public MemberDTO getMemberById(Long m_num) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
		return convertToDTO(member);
	}

	@Override
	public void modifyMember(MemberDTO memberDTO) {
		Long m_num = memberDTO.getM_num();
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));

		member.setM_name(memberDTO.getM_name());
		member.setM_birth(memberDTO.getM_birth());
		member.setM_gender(memberDTO.getM_gender());
		member.setM_pw(memberDTO.getM_pw());
		member.setM_phone(memberDTO.getM_phone());
		member.setM_addr(memberDTO.getM_addr());
		member.setDog_breed(memberDTO.getDog_breed());
		member.setDog_name(memberDTO.getDog_name());
		member.setDog_birth(memberDTO.getDog_birth());
		member.setDog_notice(memberDTO.getDog_notice());
		member.setM_state(memberDTO.isM_state());
		member.setM_agree(memberDTO.isM_agree());

		memberRepository.save(member);
	}

	/*
	 * // 로그인
	 * 
	 * @Override public Optional<Member> login(String m_email, String m_pw) { return
	 * memberRepository.login(m_email, m_pw); }
	 */

	private MemberDTO convertToDTO(Member member) {
		MemberDTO memberDTO = new MemberDTO();
		memberDTO.setM_num(member.getM_num());
		memberDTO.setM_name(member.getM_name());
		memberDTO.setM_birth(member.getM_birth());
		memberDTO.setM_gender(member.getM_gender());
		memberDTO.setM_email(member.getM_email());
		memberDTO.setM_pw(member.getM_pw());
		memberDTO.setM_phone(member.getM_phone());
		memberDTO.setM_addr(member.getM_addr());
		memberDTO.setDog_breed(member.getDog_breed());
		memberDTO.setDog_name(member.getDog_name());
		memberDTO.setDog_birth(member.getDog_birth());
		memberDTO.setDog_notice(member.getDog_notice());
		memberDTO.setM_state(member.isM_state());
		memberDTO.setM_agree(member.isM_agree());
		return memberDTO;
	}

	private Member convertToEntity(MemberDTO memberDTO) {
		Member member = new Member();
		member.setM_num(memberDTO.getM_num());
		member.setM_name(memberDTO.getM_name());
		member.setM_birth(memberDTO.getM_birth());
		member.setM_gender(memberDTO.getM_gender());
		member.setM_email(memberDTO.getM_email());
		member.setM_pw(memberDTO.getM_pw());
		member.setM_phone(memberDTO.getM_phone());
		member.setM_addr(memberDTO.getM_addr());
		member.setDog_breed(memberDTO.getDog_breed());
		member.setDog_name(memberDTO.getDog_name());
		member.setDog_birth(memberDTO.getDog_birth());
		member.setDog_notice(memberDTO.getDog_notice());
		member.setM_state(memberDTO.isM_state());
		member.setM_agree(memberDTO.isM_agree());
		return member;
	}

	@Override
	public void updateMemberState(Long m_num) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
		member.setM_state(!member.isM_state()); // 상태를 반전시켜 업데이트
		memberRepository.save(member);
	}

}