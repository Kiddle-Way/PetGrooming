package com.petgrooming.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.petgrooming.dto.NoticeDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.service.NoticeService;
import com.petgrooming.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/notice")
public class NoticeController {
	private final NoticeService service;
	private final CustomFileUtil fileUtil;

	// 공지사항 읽기
	@GetMapping("/{n_num}")
	public NoticeDTO get(@PathVariable(name = "n_num") Long n_num) {
		return service.get(n_num);
	}

	// 공지사항 리스트
	@GetMapping("/list")
	public PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list........" + pageRequestDTO);

		return service.getlist(pageRequestDTO);
	}

	// 공지사항 제목검색
	@GetMapping("/list/searchtitle/{searchTitle}")
	public PageResponseDTO<NoticeDTO> searchTitlelist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchTitle") String searchTitle) {
		log.info("list........" + pageRequestDTO);

		return service.getSearchTitleList(pageRequestDTO, searchTitle);
	}

	// 공지사항 내용검색
	@GetMapping("/list/searchcontent/{searchContent}")
	public PageResponseDTO<NoticeDTO> searchContentlist(PageRequestDTO pageRequestDTO,
			@PathVariable("searchContent") String searchContent) {
		log.info("list........" + pageRequestDTO);

		return service.getSearchContentList(pageRequestDTO, searchContent);
	}

	// 공지사항 등록
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(NoticeDTO noticeDTO) {
		log.info("register: " + noticeDTO);

		List<MultipartFile> files = noticeDTO.getFiles();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		noticeDTO.setUploadFileNames(uploadFileNames);
		log.info(uploadFileNames);

		Long n_num = service.register(noticeDTO);

		return Map.of("RESULT", n_num);
	}
	
	//이미지 읽기
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	// 공지사항 수정
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PutMapping("/{n_num}")
	public Map<String, String> modify(@PathVariable(name = "n_num") Long n_num, NoticeDTO noticeDTO) {
		noticeDTO.setN_num(n_num);

		NoticeDTO oldNoticeDTO = service.get(n_num);

		List<String> oldFileNames = oldNoticeDTO.getUploadFileNames();
		List<MultipartFile> files = noticeDTO.getFiles();

		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		List<String> uploadedFileNames = noticeDTO.getUploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		service.modify(noticeDTO);

		if (oldFileNames != null && oldFileNames.size() > 0) {
			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}

		return Map.of("RESULT", "SUCCESS");
	}

	// 공지사항 삭제
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/{n_num}")
	public Map<String, String> remove(@PathVariable(name = "n_num") Long n_num) {
		List<String> oldFileNames = service.get(n_num).getUploadFileNames();

		service.remove(n_num);
		fileUtil.deleteFiles(oldFileNames);

		return Map.of("RESULT", "SUCCESS");
	}

}
