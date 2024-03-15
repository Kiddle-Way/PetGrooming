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

	private Long n_num;
	private String n_head;
	private String n_title;
	private String n_content;
	private LocalDate n_reg;
	
	@Builder.Default
	private List<MultipartFile> files = new ArrayList<>();

	@Builder.Default
	private List<String> uploadFileNames = new ArrayList<>();
	
}
