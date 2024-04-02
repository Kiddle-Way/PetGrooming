package com.petgrooming.service;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.FaqDTO;
import com.petgrooming.dto.ReviewDTO;

public interface FaqService {
	Long register(FaqDTO faqDTO);

	FaqDTO get(Long f_num);

	void modify(FaqDTO faqDTO);

	void remove(Long f_num);

	PageResponseDTO<FaqDTO> list(PageRequestDTO pageRequestDTO);
	
	PageResponseDTO<FaqDTO> getSearchTitleList(PageRequestDTO pageRequestDTO,String searchTitle);
	
	PageResponseDTO<FaqDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent);
}
