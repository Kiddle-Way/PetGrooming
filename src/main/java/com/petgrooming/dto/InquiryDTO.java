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

	private Long i_num;
	private Member m_num;
	private Long i_pw;
	private String i_title;
	private String i_content;
	private LocalDateTime i_reg;

	@Builder.Default
	private List<MultipartFile> i_files = new ArrayList<>();

	@Builder.Default
	private List<String> i_uploadFileNames = new ArrayList<>();
}