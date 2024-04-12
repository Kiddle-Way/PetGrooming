package com.petgrooming.service;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

public interface DesignerService {
	// 디자이너 검색
	PageResponseDTO<DesignerDTO> search(String keyword, Boolean state, Boolean gender, PageRequestDTO pageRequestDTO);

	// 디자이너 등록
	Long register(DesignerDTO DesignerDTO);

	// 디자이너 불러오기
	DesignerDTO get(Long d_num);

	// 디자이너 수정
	void modify(DesignerDTO DesignerDTO);

	// 디자이너 상태 전환
	void updateState(Long d_num, boolean d_state);

	// 디자이너 리스트 불러오기
	PageResponseDTO<DesignerDTO> getlist(PageRequestDTO pageRequestDTO);

}
