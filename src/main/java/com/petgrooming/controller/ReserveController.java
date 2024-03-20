package com.petgrooming.controller;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/{r_num}")
	public ReserveDTO get(@PathVariable(name = "r_num") Long r_num) {
		return service.get(r_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/list")// 취소요청안한 리스트
	public PageResponseDTO<ReserveDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.getList(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/requestlist")// 취소요청한 리스트
	public PageResponseDTO<ReserveDTO> requestList(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.getRequestList(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@PostMapping("/")//등록
	public Map<String, Long> register(@RequestBody ReserveDTO reserveDTO) {
		log.info("ReserveDTO: " + reserveDTO);
		Long r_num = service.register(reserveDTO);
		return Map.of("r_num", r_num);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@DeleteMapping("/request/{r_num}")//취소 요청
	public Map<String, String> removeRequest(@PathVariable("r_num") Long r_num) {

		service.removeRequest(r_num);

		return Map.of("RESULT", "SUCCESS");
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@DeleteMapping("/{r_num}")//취소 확정
	public Map<String, String> remove(@PathVariable("r_num") Long r_num) {

		service.remove(r_num);

		return Map.of("RESULT", "SUCCESS");
	}

}
