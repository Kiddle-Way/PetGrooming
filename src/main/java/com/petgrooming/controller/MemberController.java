package com.petgrooming.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.petgrooming.domain.Member;
import com.petgrooming.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class MemberController {

	private final MemberRepository memberRepository;

	// 회원 추가
	@PostMapping("/")
	public ResponseEntity<Member> createMember(@RequestBody Member member) {
		log.info("Received request to create member: {}", member);
		Member savedMember = memberRepository.save(member);
		return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
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

		// m_state 값을 true로 변경하여 회원을 "삭제" 처리
		member.setM_state(true);

		Member updatedMember = memberRepository.save(member);
		return new ResponseEntity<>(updatedMember, HttpStatus.OK);
	}

}