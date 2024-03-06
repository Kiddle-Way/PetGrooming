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

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReviewDTO;
import com.petgrooming.service.ReviewService;
import com.petgrooming.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/review")
public class ReviewController {
	private final ReviewService reviewService;
	private final CustomFileUtil fileUtil;

	@PostMapping("/")
	public Map<String, Long> register(ReviewDTO reviewDTO) {
		log.info("rgister: " + reviewDTO);
		List<MultipartFile> files = reviewDTO.getV_files();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		reviewDTO.setV_uploadFileNames(uploadFileNames);
		log.info(uploadFileNames);

		Long v_num = reviewService.register(reviewDTO);
		return Map.of("result", v_num);
	}

	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	@GetMapping("/list")
	public PageResponseDTO<ReviewDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list............." + pageRequestDTO);
		return reviewService.getList(pageRequestDTO);
	}

	@GetMapping("/{v_num}")
	public ReviewDTO read(@PathVariable(name = "v_num") Long v_num) {
		return reviewService.get(v_num);
	}

	@PutMapping("/{v_num}")
	public Map<String, String> modify(@PathVariable(name = "v_num") Long v_num, ReviewDTO reviewDTO) {
		reviewDTO.setV_num(v_num);
		ReviewDTO oldreviewDTO = reviewService.get(v_num);

		List<String> oldFileNames = oldreviewDTO.getV_uploadFileNames();

		List<MultipartFile> files = reviewDTO.getV_files();

		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		List<String> uploadedFileNames = reviewDTO.getV_uploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		reviewService.modify(reviewDTO);
		if (oldFileNames != null && oldFileNames.size() > 0) {

			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}
		return Map.of("RESULT", "SUCCESS");
	}

	@DeleteMapping("/{v_num}")
	public Map<String, String> remove(@PathVariable("v_num") Long v_num) {

		List<String> oldFileNames = reviewService.get(v_num).getV_uploadFileNames();
		reviewService.remove(v_num);
		fileUtil.deleteFiles(oldFileNames);
		return Map.of("RESULT", "SUCCESS");
	}
}