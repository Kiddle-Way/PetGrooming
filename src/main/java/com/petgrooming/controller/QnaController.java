package com.petgrooming.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("/{f_num}")
	public QnaDTO get(@PathVariable(name = "f_num") Long f_num) {
		return qnaService.get(f_num);
	}

	@GetMapping("/list")
	public PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return qnaService.list(pageRequestDTO);
	}
}
