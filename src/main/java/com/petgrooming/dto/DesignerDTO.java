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
	
	private Long dno; // PK

	private String dname; // 이름

	private int  dgender; // 성별 남자 = 0, 여자 = 1
	private String demail; // 이메일
	private String dphone; // 연락처

	private int dstate; // 퇴사상태 퇴사 = 1, 근무 = 0 / 기본값 0
	private String dintro; // 소개
	private String dattach;  // 첨부파일명
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dbirth; // 생년월일  //사용할때 : 예)LocalDate.of(1996,1,26)
	
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dh_date; // 입사일
	
	
	//여러개 첨부파일을 의미하는 리스트
	@Builder.Default
	private List<MultipartFile> files = new ArrayList<>(); 
	
	@Builder.Default
	private List<String> uploadFileNames = new ArrayList<>();

}
