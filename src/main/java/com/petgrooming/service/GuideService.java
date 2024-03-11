package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;
import com.petgrooming.dto.GuideDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

@Transactional
public interface GuideService {
	PageResponseDTO<GuideDTO> getList(PageRequestDTO pageRequestDTO);

	Long register(GuideDTO guideDTO);
	
	GuideDTO get(Long p_i_num);

	void modify(GuideDTO guideDTO);
	
	void remove(Long p_i_num);
}
