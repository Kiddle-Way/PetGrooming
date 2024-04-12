package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.InquiryPageRequestDTO;
import com.petgrooming.dto.InquiryPageResponseDTO;
import com.petgrooming.dto.InquiryDTO;

@Transactional
public interface InquiryService {
	// 문의 리스트 불러오기
	InquiryPageResponseDTO<InquiryDTO> getList(InquiryPageRequestDTO inquirypageRequestDTO);

	// 문의 제목 검색
	InquiryPageResponseDTO<InquiryDTO> getSearchTitleList(InquiryPageRequestDTO inquiryPageRequestDTO,
			String searchTitle);

	// 문의 내용 검색
	InquiryPageResponseDTO<InquiryDTO> getSearchContentList(InquiryPageRequestDTO inquiryPageRequestDTO,
			String searchContent);

	// 문의 등록
	Long register(InquiryDTO inquiryDTO);

	// 문의 정보(하나) 불러오기
	InquiryDTO get(Long i_num);

	// 문의 수정
	void modify(InquiryDTO inquiryDTO);

	// 문의 상태 전환
	void remove(Long i_num);

}
