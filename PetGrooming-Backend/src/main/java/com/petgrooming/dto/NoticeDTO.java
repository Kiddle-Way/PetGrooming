package com.petgrooming.dto;

import java.time.LocalDate;

import lombok.*;
import java.util.*;

import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {

	// 공지사항 번호
	private Long n_num;
	// 공지사항 유형
	private String n_head;
	// 공지사항 제목
	private String n_title;
	// 공지사항 내용
	private String n_content;
	// 공지사항 등록 날짜
	private LocalDate n_reg;

	// 공지사항 첨부파일
	@Builder.Default
	private List<MultipartFile> files = new ArrayList<>();

	@Builder.Default
	private List<String> uploadFileNames = new ArrayList<>();

}
