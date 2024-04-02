package com.petgrooming.controller;

import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.QnaDTO;
import com.petgrooming.service.QnaService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/qna")
public class QnaController {
	private final QnaService qnaService;

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/{f_num}")
	public QnaDTO get(@PathVariable(name = "f_num") Long f_num) {
		return qnaService.get(f_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list")
	public PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return qnaService.list(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list/searchtitle/{searchTitle}")
	public PageResponseDTO<QnaDTO> searchTitlelist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchTitle") String searchTitle) {
		log.info("list............." + pageRequestDTO);
		return qnaService.getSearchTitleList(pageRequestDTO, searchTitle);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list/searchcontent/{searchContent}")
	public PageResponseDTO<QnaDTO> searchContentlist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchContent") String searchContent) {
		log.info("list............." + pageRequestDTO);
		return qnaService.getSearchContentList(pageRequestDTO, searchContent);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody QnaDTO qnaDTO) {
		log.info("QnaDTO: " + qnaDTO);
		Long f_num = qnaService.register(qnaDTO);

		return Map.of("F_NUM", f_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PutMapping("/{f_num}")
	public Map<String, String> modify(@PathVariable(name = "f_num") Long f_num, @RequestBody QnaDTO qnaDTO) {
		qnaDTO.setF_num(f_num);
		log.info("Modify: " + qnaDTO);
		qnaService.modify(qnaDTO);

		return Map.of("RESULT", "SUCCESS");
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/{f_num}")
	public Map<String, String> remove(@PathVariable(name = "f_num") Long f_num) {
		log.info("Remove: " + f_num);
		qnaService.remove(f_num);

		return Map.of("RESULT", "SUSSESS");
	}
}
