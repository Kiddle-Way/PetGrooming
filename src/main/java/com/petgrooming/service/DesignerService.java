package com.petgrooming.service;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;

public interface DesignerService { 
	
	//목록데이터처리, PageRequestDTO 파라미터 처리, PageResponseDTO 타입 리턴타입지정
	PageResponseDTO<DesignerDTO> getList(PageRequestDTO pageRequestDTO);
	//등록기능선언
	Long register(DesignerDTO designerDTO);
	//서비스 조회	
	DesignerDTO get(Long dno);
	//수정기능
	void modify(DesignerDTO designerDTO); 
	
	//삭제기능
	void remove(Long dno); 
	
	//검색 기능
    PageResponseDTO<DesignerDTO> search(String keyword, PageRequestDTO pageRequestDTO);
}
