package com.petgrooming.service;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

public interface DesignerService {
	PageResponseDTO<DesignerDTO> search(String keyword, Boolean state, Boolean gender, PageRequestDTO pageRequestDTO);
	
	Long register(DesignerDTO DesignerDTO);
	
	DesignerDTO get(Long d_num);
	
	void modify(DesignerDTO DesignerDTO);

	void updateState(Long d_num, boolean d_state);

	PageResponseDTO<DesignerDTO> getlist(PageRequestDTO pageRequestDTO);
	
	
}
