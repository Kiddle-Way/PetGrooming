package com.petgrooming.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

import com.petgrooming.domain.Member;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
	// 리뷰 번호
	private Long v_num;
	// 리뷰 작성 회원 번호
	private Member m_num;
	// 리뷰 비밀번호
	private Long v_pw;
	// 리뷰 제목
	private String v_title;
	// 리뷰 내용
	private String v_content;
	// 리뷰 날짜
	private LocalDateTime v_date;
	// 리뷰 답글 내용
	private String v_c_content;
	// 리뷰 별점
	private Long v_rating;

	// 리뷰 첨부파일
	@Builder.Default
	private List<MultipartFile> v_files = new ArrayList<>();

	@Builder.Default
	private List<String> v_uploadFileNames = new ArrayList<>();
}
