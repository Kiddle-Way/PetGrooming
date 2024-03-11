package com.petgrooming.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
	private Long v_num;
	private Long m_num;
	private Long v_pw;
	private String v_title;
	private String v_content;
	private LocalDateTime v_date;
	
	@Builder.Default
	private List<MultipartFile> v_files = new ArrayList<>();
	
	@Builder.Default
	private List<String> v_uploadFileNames = new ArrayList<>();
}
