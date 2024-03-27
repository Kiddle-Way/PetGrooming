package com.petgrooming.service;

import com.petgrooming.dto.MemberDTO;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.domain.Member;
import com.petgrooming.repository.MemberRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberRepository memberRepository;

	private final ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private PasswordEncoder passwordEncoder;

	// 회원 가입
	@Override
	public Long registerMember(Member member) {
		// 비밀번호 인코딩 등 회원가입 처리
		String encodedPassword = passwordEncoder.encode(member.getM_pw());
		member.setM_pw(encodedPassword);

		// 회원 등록
		Member savedMember = memberRepository.save(member);

		// 등록된 회원의 고유 ID 반환
		return savedMember.getM_num();
	}

	// 회원 조회
	@Override
	public Member getMemberById(Long m_num) {
		Optional<Member> optionalMember = memberRepository.findById(m_num);
		return optionalMember.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
	}

	// 회원 정보 수정
    @Override
    public Member updateMember(Long m_num, Member member) {
        Member existingMember = memberRepository.findById(m_num)
                .orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));

        // 비밀번호 암호화
        //String encodedPassword = passwordEncoder.encode(member.getM_pw());
        existingMember.setM_pw(member.getM_pw());

        // 기타 필요한 정보 업데이트
        existingMember.setM_name(member.getM_name());
        existingMember.setM_birth(member.getM_birth());
        existingMember.setM_gender(member.getM_gender());
        existingMember.setM_phone(member.getM_phone());
        existingMember.setM_addr(member.getM_addr());
        existingMember.setDog_breed(member.getDog_breed());
        existingMember.setDog_name(member.getDog_name());
        existingMember.setDog_birth(member.getDog_birth());
        existingMember.setDog_notice(member.getDog_notice());
        existingMember.setM_state(member.isM_state());
        existingMember.setM_agree(member.isM_agree());

        // 엔티티 저장 및 반환
        return memberRepository.save(existingMember);
    }

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

	// 회원삭제
	@Override
	public void updateMemberState(Long m_num) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
		member.setM_state(!member.isM_state()); // 상태를 반전시켜 업데이트
		memberRepository.save(member);
	}

	@Override
	public PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage(), pageRequestDTO.getSize());

		Page<Member> result = memberRepository.findAll(pageable);

		List<MemberDTO> dtolist = result.getContent().stream().map(member -> modelMapper.map(member, MemberDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<MemberDTO> responseDTO = PageResponseDTO.<MemberDTO>withAll().dtoList(dtolist)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;

	}

}