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
import com.petgrooming.dto.FaqDTO;
import com.petgrooming.service.FaqService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/faq")
public class FaqController {
	private final FaqService faqService;

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/{f_num}")
	public FaqDTO get(@PathVariable(name = "f_num") Long f_num) {
		return faqService.get(f_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list")
	public PageResponseDTO<FaqDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return faqService.list(pageRequestDTO);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list/searchtitle/{searchTitle}")
	public PageResponseDTO<FaqDTO> searchTitlelist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchTitle") String searchTitle) {
		log.info("list............." + pageRequestDTO);
		return faqService.getSearchTitleList(pageRequestDTO, searchTitle);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list/searchcontent/{searchContent}")
	public PageResponseDTO<FaqDTO> searchContentlist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchContent") String searchContent) {
		log.info("list............." + pageRequestDTO);
		return faqService.getSearchContentList(pageRequestDTO, searchContent);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody FaqDTO faqDTO) {
		log.info("FaqDTO: " + faqDTO);
		Long f_num = faqService.register(faqDTO);

		return Map.of("F_NUM", f_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PutMapping("/{f_num}")
	public Map<String, String> modify(@PathVariable(name = "f_num") Long f_num, @RequestBody FaqDTO faqDTO) {
		faqDTO.setF_num(f_num);
		log.info("Modify: " + faqDTO);
		faqService.modify(faqDTO);

		return Map.of("RESULT", "SUCCESS");
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/{f_num}")
	public Map<String, String> remove(@PathVariable(name = "f_num") Long f_num) {
		log.info("Remove: " + f_num);
		faqService.remove(f_num);

		return Map.of("RESULT", "SUSSESS");
	}
}
