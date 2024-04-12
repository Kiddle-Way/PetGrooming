package com.petgrooming.service;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.FaqDTO;
import com.petgrooming.dto.ReviewDTO;

public interface FaqService {
	// 등록
	Long register(FaqDTO faqDTO);

	// 정보 불러오기
	FaqDTO get(Long f_num);

	// 수정
	void modify(FaqDTO faqDTO);

	// 삭제
	void remove(Long f_num);

	// 리스트 불러오기
	PageResponseDTO<FaqDTO> list(PageRequestDTO pageRequestDTO);

	// 제목 검색
	PageResponseDTO<FaqDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle);

	// 내용 검색
	PageResponseDTO<FaqDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent);
}
