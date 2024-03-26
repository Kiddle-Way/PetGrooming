package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.InquiryPageRequestDTO;
import com.petgrooming.dto.InquiryPageResponseDTO;
import com.petgrooming.dto.InquiryDTO;


@Transactional
public interface InquiryService {
	InquiryPageResponseDTO<InquiryDTO> getList(InquiryPageRequestDTO inquirypageRequestDTO);
	
	InquiryPageResponseDTO<InquiryDTO> getSearchTitleList(InquiryPageRequestDTO inquiryPageRequestDTO, String searchTitle);

	InquiryPageResponseDTO<InquiryDTO> getSearchContentList(InquiryPageRequestDTO inquiryPageRequestDTO, String searchContent);

	Long register(InquiryDTO inquiryDTO);

	InquiryDTO get(Long i_num);

	void modify(InquiryDTO inquiryDTO);

	void remove(Long i_num);

}
