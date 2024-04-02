package com.petgrooming.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.Member2DTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.MemberRepository;
import com.petgrooming.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {

	private final MemberRepository memberRepository;
	private final MemberService memberService;

	// 회원 추가
	@PostMapping("/")
	public ResponseEntity<Long> registerMember(@RequestBody Member member) {
		Long m_num = memberService.registerMember(member);
		return new ResponseEntity<>(m_num, HttpStatus.CREATED);
	}

	// 회원 조회
	@GetMapping("/{m_num}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long m_num) {
		Optional<Member> optionalMember = memberRepository.findById(m_num);
		Member member = optionalMember.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
		return new ResponseEntity<>(member, HttpStatus.OK);
	}

	// 회원 정보 수정
	@PutMapping("/{m_num}")
	public ResponseEntity<Member> updateMember(@PathVariable Long m_num, @RequestBody Member member) {
		Member updatedMember = memberService.updateMember(m_num, member);
		return new ResponseEntity<>(updatedMember, HttpStatus.OK);
	}

	// 회원 삭제
	@PutMapping("/{m_num}/delete")
	public ResponseEntity<Member> updateMemberState(@PathVariable Long m_num) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));

		member.setM_state(true); // m_state 값을 true로 변경하여 회원을 "삭제" 처리

		Member updatedMember = memberRepository.save(member);
		return new ResponseEntity<>(updatedMember, HttpStatus.OK);
	}

	// 회원 리스트
	@GetMapping("/list")
	public PageResponseDTO<Member2DTO> workList(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return memberService.workList(pageRequestDTO);
	}

	// 퇴직 리스트
	@GetMapping("/retire")
	public PageResponseDTO<Member2DTO> getRetire(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return memberService.retireList(pageRequestDTO);
	}
}
