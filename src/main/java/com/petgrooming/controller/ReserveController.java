package com.petgrooming.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReserveDTO;
import com.petgrooming.service.ReserveService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/reserve")
public class ReserveController {
	private final ReserveService service;

	// 예약 내역 전체리스트
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/allList")
	public PageResponseDTO<ReserveDTO> allList(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.allList(pageRequestDTO);
	}

	// 지난 예약 내역 리스트
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/pastList")
	public PageResponseDTO<ReserveDTO> pastList(PageRequestDTO pageRequestDTO) {
		return service.pastList(pageRequestDTO);
	}

	// 정보 불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/{r_num}")
	public ReserveDTO get(@PathVariable(name = "r_num") Long r_num) {
		return service.get(r_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list") // 취소요청안한 리스트
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.getList(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/requestlist") // 취소요청한 리스트
	public PageResponseDTO<ReserveDTO> requestList(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.getRequestList(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/") // 등록
	public Map<String, Long> register(@RequestBody ReserveDTO reserveDTO) {
		log.info("ReserveDTO: " + reserveDTO);
		Long r_num = service.register(reserveDTO);
		return Map.of("r_num", r_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/request/{r_num}") // 취소 요청
	public Map<String, String> removeRequest(@PathVariable("r_num") Long r_num) {

		service.removeRequest(r_num);

		return Map.of("RESULT", "SUCCESS");
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/{r_num}") // 취소 확정
	public Map<String, String> remove(@PathVariable("r_num") Long r_num) {

		service.remove(r_num);

		return Map.of("RESULT", "SUCCESS");
	}

	// 내 예약 확인
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/my-reservations")
	public PageResponseDTO<ReserveDTO> getMyReservations(@RequestParam("m_num") Long m_num,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		PageRequestDTO pageRequestDTO = new PageRequestDTO(page, size);
		return service.findReserveByMemberNumber(m_num, pageRequestDTO);
	}

}
