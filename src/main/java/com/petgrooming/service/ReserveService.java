package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReserveDTO;

@Transactional
public interface ReserveService {
	PageResponseDTO<ReserveDTO> getList(PageRequestDTO pageRequestDTO);
	
	PageResponseDTO<ReserveDTO> getRequestList(PageRequestDTO pageRequestDTO);
	
	Long register(ReserveDTO reserveDTO);

	ReserveDTO get(Long tno);

	void removeRequest(Long r_num);

	void remove(Long r_num);
	
	// 내 예약 확인
	 PageResponseDTO<ReserveDTO> findReserveByMemberNumber(Long m_num, PageRequestDTO pageRequestDTO);
}
