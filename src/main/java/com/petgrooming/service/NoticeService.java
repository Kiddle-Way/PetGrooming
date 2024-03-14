package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.NoticeDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

@Transactional
public interface NoticeService {
	Long register(NoticeDTO noticeDTO);

	NoticeDTO get(Long t_num);

	void modify(NoticeDTO noticeDTO);

	void remove(Long n_num);

	PageResponseDTO<NoticeDTO> getlist(PageRequestDTO pageRequestDTO);
}
