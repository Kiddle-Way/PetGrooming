package com.petgrooming.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.MemberDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.MemberRepository;
import com.petgrooming.service.MemberService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Map;
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
	    Long memberId = memberService.registerMember(member);
	    return new ResponseEntity<>(memberId, HttpStatus.CREATED);
	}

	// 회원 조회
	@GetMapping("/{m_num}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long m_num) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));
		return new ResponseEntity<>(member, HttpStatus.OK);
	}

	// 회원 수정
	@PutMapping("/{m_num}")
	public ResponseEntity<Member> updateMember(@PathVariable Long m_num, @RequestBody Member memberDetails) {
		Member member = memberRepository.findById(m_num)
				.orElseThrow(() -> new RuntimeException("Member not found with id: " + m_num));

		// BeanUtils.copyProperties()를 사용하여 업데이트
		BeanUtils.copyProperties(memberDetails, member, "m_email"); // m_email은 업데이트하지 않음

		Member updatedMember = memberRepository.save(member);
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

	@GetMapping("/list")
	public PageResponseDTO<MemberDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return memberService.list(pageRequestDTO);
	}

	/*
	 * // 회원 로그인
	 * 
	 * @PostMapping("/login2") public ResponseEntity<String> login(@RequestBody
	 * MemberLoginRequest request) { Optional<Member> memberOptional =
	 * memberService.login(request.getM_email(), request.getM_pw()); if
	 * (memberOptional.isPresent()) { return ResponseEntity.ok("Login successful");
	 * } else { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).
	 * body("Invalid email or password"); } }
	 * 
	 * @Data static class MemberLoginRequest { private String m_email; private
	 * String m_pw; }
	 */
}
