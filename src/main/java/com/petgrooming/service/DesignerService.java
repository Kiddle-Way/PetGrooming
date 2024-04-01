package com.petgrooming.service;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.domain.Designer;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

@Transactional
public interface DesignerService { 
	
	//목록데이터처리, PageRequestDTO 파라미터 처리, PageResponseDTO 타입 리턴타입지정
	PageResponseDTO<DesignerDTO> getList(PageRequestDTO pageRequestDTO);
	
	//중복 코드를 줄이고 각 메서드에서 페이지 응답을 변환
	PageResponseDTO<DesignerDTO> convertToPageResponseDTO(Page<Designer> page, PageRequestDTO pageRequestDTO);
	
	//등록기능선언
	Long register(DesignerDTO designerDTO);
	
	//서비스 조회	
	DesignerDTO get(Long dno);
	
	//수정기능
	void modify(DesignerDTO designerDTO); 
	
	//삭제기능
	void remove(Long dno); 

	//검색 기능
	   PageResponseDTO<DesignerDTO> search(String keyword, Long state, Long gender , PageRequestDTO pageRequestDTO);
	
	//복직, 퇴사 상태 변경
	void updateState(Long dno, Long state);
	
//	//executeQuery
//	PageResponseDTO<DesignerDTO> executeQuery(String query, Map<String, Object> params, PageRequestDTO pageRequestDTO);
	

}
