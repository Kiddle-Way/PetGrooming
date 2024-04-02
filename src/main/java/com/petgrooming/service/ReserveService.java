package com.petgrooming.service;

import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReserveDTO;

import java.util.Date;
import java.util.List;

@Transactional
public interface ReserveService {

	// 예약 내역 전체리스트
	PageResponseDTO<ReserveDTO> allList(PageRequestDTO pageRequestDTO);

	// 지난 예약 내역 리스트
	PageResponseDTO<ReserveDTO> pastList(PageRequestDTO pageRequestDTO);

	// 예약 리스트 불러오기
	PageResponseDTO<ReserveDTO> getList(PageRequestDTO pageRequestDTO);

	// 예약 취소요청 리스트 불러오기
	PageResponseDTO<ReserveDTO> getRequestList(PageRequestDTO pageRequestDTO);

	// 예약 등록
	Long register(ReserveDTO reserveDTO);

	// 예약 정보 불러오기
	ReserveDTO get(Long tno);

	// 예약 취소 요청
	void removeRequest(Long r_num);

	// 예약 취소 승인
	void remove(Long r_num);

	// 내 예약 확인
	PageResponseDTO<ReserveDTO> findReserveByMemberNumber(Long m_num, PageRequestDTO pageRequestDTO);

	// 전체 매출
	Long getTotalPrice();

	// 연도별 총매출
	List<Object[]> getTotalPriceByAllYears();

	// 연도별 월매출
	Long getTotalPriceByMonth(int year, int month);

	// 주간매출
	Long getTotalPriceByWeek(int year, int week);

	// 총 예약 건수
	Long getTotalCount();

	// 연도별 예약 건수
	List<Object[]> getTotalCountByAllYears();

	// 월별 예약 건수
	Long getTotalCountByMonth(int year, int month);

	// 상품별 예약 건수
	List<Object[]> countReserveByProduct();

	// 견종별 예약 건수
	List<Object[]> countReserveByBreed();
}
