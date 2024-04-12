package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.NoticeDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReviewDTO;

@Transactional
public interface NoticeService {
	// 공지사항 등록
	Long register(NoticeDTO noticeDTO);

	// 공지사항 정보 불러오기
	NoticeDTO get(Long t_num);

	// 공지사항 수정
	void modify(NoticeDTO noticeDTO);

	// 공지사항 상태 전환
	void remove(Long n_num);

	// 공지사항 리스트 불러오기
	PageResponseDTO<NoticeDTO> getlist(PageRequestDTO pageRequestDTO);

	// 공지사항 제목 검색
	PageResponseDTO<NoticeDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle);

	// 공지사항 내용 검색
	PageResponseDTO<NoticeDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent);

}
