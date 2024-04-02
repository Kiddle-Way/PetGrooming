package com.petgrooming.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.petgrooming.domain.Member;
import com.petgrooming.dto.MemberDTO;

import jakarta.transaction.Transactional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	// 회원 상태 전환
	@Modifying
	@Query("Update Member m set m.m_num = :state where m.m_num = :m_num")
	void updateToDelete(@Param("m_num") Long m_num, @Param("state") boolean state);

	// 회원 정보(이메일로) 불러오기(권환도 함께 가져옴)
	@EntityGraph(attributePaths = { "memberRoleList" })
	@Query("SELECT m FROM Member m WHERE m.m_email = :m_email")
	Member getWithRoles(@Param("m_email") String m_email);

	// 회원 정보 불러오기
	@Query("SELECT m FROM Member m WHERE m.m_num = :m_num")
	<Optional> Member getMemberById(@Param("m_num") Long m_num);

	// 회원 정보불러오기(탈퇴x)
	@Query("SELECT m FROM Member m WHERE m.m_state = false")
	Page<Member> workList(Pageable pageable);

	// 회원 정보불러오기(탈퇴)
	@Query("SELECT m FROM Member m WHERE m.m_state = true")
	Page<Member> retireList(Pageable pageable);

	@Transactional
	default Member registerMember(MemberDTO memberDTO) {
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

	@Transactional
	default Member updateMember(MemberDTO memberDTO) {
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
}
