package com.petgrooming.service;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.QnaDTO;

public interface QnaService {
	Long register(QnaDTO qnaDTO);

	QnaDTO get(Long f_num);

	void modify(QnaDTO qnaDTO);

	void remove(Long f_num);

	PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO);
}
