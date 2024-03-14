package com.petgrooming.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaDTO {
	private Long f_num;
	private String f_title;
	private String f_content;
}
