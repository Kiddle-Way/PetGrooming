package com.petgrooming.domain;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "MEMBER")
@Getter
@Setter
@ToString(exclude = "memberRoleList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

	// 회원번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GEN")
	@Column(name = "m_num")
	private Long m_num;

	// 회원이름
	@Column(name = "m_name", length = 50, nullable = false)
	private String m_name;

	// 회원 생년월일
	@Column(name = "m_birth", nullable = false)
	private Date m_birth;

	// 회원 성별
	@Column(name = "m_gender", nullable = false)
	private int m_gender;

	// 회원 이메일
	@Column(name = "m_email", length = 50, nullable = false, unique = true)
	private String m_email;

	// 회원 비밀번호
	@Column(name = "m_pw", length = 100, nullable = false)
	private String m_pw;

	// 회원 전화번호
	@Column(name = "m_phone", length = 100, nullable = false, unique = true)
	private String m_phone;

	// 회원 주소
	@Column(name = "m_addr", length = 100, nullable = false)
	private String m_addr;

	// 견종
	@Column(name = "dog_breed", length = 100)
	private String dog_breed;

	// 견이름
	@Column(name = "dog_name", length = 100)
	private String dog_name;

	// 견 생년월일
	@Column(name = "dog_birth")
	private Date dog_birth;

	// 견 알림내용
	@Column(name = "dog_notice", length = 1000)
	private String dog_notice;

	// 회원 상태
	@Column(name = "m_state", nullable = false)
	private boolean m_state;

	// 회원 개인정보동의 내역
	@Column(name = "m_agree", nullable = false)
	private boolean m_agree;

	public void changeState(boolean m_state) {
		this.m_state = m_state;
	}

	// 회원 역할(유저,관리자)
	@ElementCollection(fetch = FetchType.LAZY)
	@Builder.Default
	private List<MemberRole> memberRoleList = new ArrayList<>();

	public void addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
	}

	public void clearRole() {
		memberRoleList.clear();
	}

	@PrePersist
	public void addDefaultRole() {
		// 회원 역할 추가
		MemberRole userRole = MemberRole.USER;
		this.addRole(userRole);
	}
}
