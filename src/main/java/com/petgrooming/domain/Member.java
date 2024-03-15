package com.petgrooming.domain;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "MEMBER")
@Getter
@Setter
@ToString(exclude = "memberRoleList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GEN")
	@Column(name = "m_num")
	private Long m_num;

	@Column(name = "m_name", length = 50, nullable = false)
	private String m_name;

	@Column(name = "m_birth", nullable = false)
	private Date m_birth;

	@Column(name = "m_gender", nullable = false)
	private int m_gender;
	
	@Column(name = "m_email", length = 50, nullable = false, unique = true)
	private String m_email;

	@Column(name = "m_pw", length = 100, nullable = false)
	private String m_pw;

	@Column(name = "m_phone", length = 100, nullable = false, unique = true)
	private String m_phone;

	@Column(name = "m_addr", length = 100, nullable = false)
	private String m_addr;

	@Column(name = "dog_breed", length = 100)
	private String dog_breed;

	@Column(name = "dog_name", length = 100)
	private String dog_name;

	@Column(name = "dog_birth")
	private Date dog_birth;

	@Column(name = "dog_notice", length = 1000)
	private String dog_notice;

	@Column(name = "m_state", nullable = false)
	private boolean m_state;

	@Column(name = "m_agree", nullable = false)
	private boolean m_agree;

	public void changeState(boolean m_state) {
		this.m_state = m_state;
	}

	@ElementCollection(fetch = FetchType.LAZY)
	@Builder.Default
	private List<MemberRole> memberRoleList = new ArrayList<>();

	public void addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
	}

	public void clearRole() {
		memberRoleList.clear();
	}
}
