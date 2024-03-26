package com.petgrooming.dto;

import lombok.*;


import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

import com.petgrooming.domain.Member;


import com.petgrooming.domain.Member;


import com.petgrooming.domain.Member;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
	private Long v_num;
	private Member m_num;
	private Long v_pw;
	private String v_title;
	private String v_content;
	private LocalDateTime v_date;
	private String v_c_content;
	private Long v_rating;
	
	@Builder.Default
	private List<MultipartFile> v_files = new ArrayList<>();

	@Builder.Default
	private List<String> v_uploadFileNames = new ArrayList<>();
}
