package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReviewDTO;

@Transactional
public interface ReviewService {
	// 리뷰 리스트 불러오기
	PageResponseDTO<ReviewDTO> getList(PageRequestDTO pageRequestDTO);

	// 리뷰 제목 검색
	PageResponseDTO<ReviewDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle);

	// 리뷰 내용 검색
	PageResponseDTO<ReviewDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent);

	// 리뷰 등록
	Long register(ReviewDTO reviewDTO);

	// 리뷰 정보 불러오기
	ReviewDTO get(Long v_num);

	// 리뷰 수정
	void modify(ReviewDTO reviewDTO);

	// 리뷰 상태 전환 요청
	void remove(Long v_num);

}
