package com.petgrooming.dto;

import lombok.*;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuideDTO {
	private Long p_i_num;
	private String p_i_content;
	private Long p_i_attach_size;
	
	@Builder.Default
	private List<MultipartFile> p_i_files = new ArrayList<>();
	
	@Builder.Default
	private List<String> p_i_uploadFileNames = new ArrayList<>();
}
