package com.petgrooming.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FaqDTO {
	// 자주묻는질문 번호
	private Long f_num;
	// 제목
	private String f_title;
	// 내용
	private String f_content;
}