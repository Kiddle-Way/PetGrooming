package com.petgrooming.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.security.access.prepost.PreAuthorize; 

import com.petgrooming.dto.InquiryPageRequestDTO;
import com.petgrooming.dto.InquiryPageResponseDTO;
import com.petgrooming.dto.InquiryDTO;
import com.petgrooming.service.InquiryService;
import com.petgrooming.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/inquiry")
public class InquiryController {
	private final InquiryService inquiryService;
	private final CustomFileUtil fileUtil;

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(InquiryDTO inquiryDTO) {
		log.info("rgister: " + inquiryDTO);
		List<MultipartFile> files = inquiryDTO.getI_files();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		inquiryDTO.setI_uploadFileNames(uploadFileNames);
		log.info(uploadFileNames);

		Long i_num = inquiryService.register(inquiryDTO);
		return Map.of("result", i_num);
	}

	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")  //회원만 접근 가능
	@GetMapping("/list")
	public InquiryPageResponseDTO<InquiryDTO> list(InquiryPageRequestDTO inquiryPageRequestDTO) {
		log.info("list............." + inquiryPageRequestDTO);
		return inquiryService.getList(inquiryPageRequestDTO);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/list/searchtitle/{searchTitle}")
	public InquiryPageResponseDTO<InquiryDTO> searchTitlelist(InquiryPageRequestDTO inquiryPageRequestDTO, @PathVariable("searchTitle") String searchTitle) {
		log.info("list............." + inquiryPageRequestDTO);
		return inquiryService.getSearchTitleList(inquiryPageRequestDTO, searchTitle);
	}
		
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/list/searchcontent/{searchContent}")
	public InquiryPageResponseDTO<InquiryDTO> searchContentlist(InquiryPageRequestDTO inquiryPageRequestDTO, @PathVariable("searchContent") String searchContent) {
		log.info("list............." + inquiryPageRequestDTO);
		return inquiryService.getSearchContentList(inquiryPageRequestDTO, searchContent);
	}


	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@GetMapping("/{i_num}")
	public InquiryDTO read(@PathVariable(name = "i_num") Long i_num) {
		return inquiryService.get(i_num);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@PutMapping("/{i_num}")
	public Map<String, String> modify(@PathVariable(name = "i_num") Long i_num, InquiryDTO inquiryDTO) {
		inquiryDTO.setI_num(i_num);
		InquiryDTO oldinquiryDTO = inquiryService.get(i_num);

		List<String> oldFileNames = oldinquiryDTO.getI_uploadFileNames();

		List<MultipartFile> files = inquiryDTO.getI_files();

		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		List<String> uploadedFileNames = inquiryDTO.getI_uploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		inquiryService.modify(inquiryDTO);
		if (oldFileNames != null && oldFileNames.size() > 0) {

			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}
		return Map.of("RESULT", "SUCCESS");
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") //회원만 접근 가능
	@DeleteMapping("/{i_num}")
	public Map<String, String> remove(@PathVariable("i_num") Long i_num) {

		List<String> oldFileNames = inquiryService.get(i_num).getI_uploadFileNames();
		inquiryService.remove(i_num);
		fileUtil.deleteFiles(oldFileNames);
		return Map.of("RESULT", "SUCCESS");
	}
}