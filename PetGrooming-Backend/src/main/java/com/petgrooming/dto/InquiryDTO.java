package com.petgrooming.dto;

import java.time.LocalDateTime;
import java.util.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import com.petgrooming.domain.Member;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InquiryDTO {

	// 문의 번호
	private Long i_num;
	// 문의 회원번호
	private Member m_num;
	// 문의글 비밀번호
	private Long i_pw;
	// 문의글 제목
	private String i_title;
	// 문의글 내용
	private String i_content;
	// 문의글 등록 날짜
	private LocalDateTime i_reg;
	// 문의글 답글
	private String i_a_content;

	// 문의글 첨부파일
	@Builder.Default
	private List<MultipartFile> i_files = new ArrayList<>();

	@Builder.Default
	private List<String> i_uploadFileNames = new ArrayList<>();
}