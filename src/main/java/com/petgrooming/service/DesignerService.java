package com.petgrooming.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.DesignerSpecification;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.domain.Gender;
import com.petgrooming.domain.State;

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
	PageResponseDTO<DesignerDTO> search(Gender gender, State state, String dname, PageRequestDTO pageRequestDTO);

	//근무형태

	PageResponseDTO<DesignerDTO> getSearchStateList(int searchState, PageRequestDTO pageRequestDTO);

	//성별 검색
	PageResponseDTO<DesignerDTO> getSearchGenderList(int searchGender, PageRequestDTO pageRequestDTO);
	
	
	//복직, 퇴사 상태 변경
	void updateState(Long dno, Long state);
}
