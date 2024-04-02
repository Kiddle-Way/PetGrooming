package com.petgrooming.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;
import java.util.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DesignerDTO {

	private Long d_num; // PK

	private String d_name; // 이름

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate d_birth; // 생년월일
	
	private boolean d_gender; // 성별 남자 = 0, 여자 = 1
	private String d_email; // 이메일
	private String d_phone; // 연락처

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate d_h_date; // 입사일

	private boolean d_state; // 퇴사상태 퇴사 = 1, 근무 = 0 / 기본값 0
	private String d_intro; // 소개
	
	// 여러개 첨부파일을 의미하는 리스트
	@Builder.Default
	private List<MultipartFile> d_files = new ArrayList<>();

	@Builder.Default
	private List<String> d_uploadFileNames = new ArrayList<>();

}
