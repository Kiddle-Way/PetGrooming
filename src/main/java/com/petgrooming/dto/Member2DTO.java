package com.petgrooming.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member2DTO {
	private Long m_num;
	private String m_name;
	private Date m_birth;
	private int m_gender;
	private String m_email;
	private String m_pw;
	private String m_phone;
	private String m_addr;
	private String dog_breed;
	private String dog_name;
	private Date dog_birth;
	private String dog_notice;
	private boolean m_state;
	private boolean m_agree;

	private List<String> roleNames = new ArrayList<>();
}
