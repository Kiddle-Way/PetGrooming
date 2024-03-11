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

import com.petgrooming.dto.GuideDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.service.GuideService;
import com.petgrooming.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/guides")
public class GuideController {
	private final GuideService guideService;
	private final CustomFileUtil fileUtil;

	@PostMapping("/")
	public Map<String, Long> register(GuideDTO guideDTO) {
		log.info("rgister: " + guideDTO);
		List<MultipartFile> p_i_files = guideDTO.getP_i_files();
		List<String> p_i_uploadFileNames = fileUtil.saveFiles(p_i_files);
		guideDTO.setP_i_uploadFileNames(p_i_uploadFileNames);
		log.info(p_i_uploadFileNames);


		Long p_i_num = guideService.register(guideDTO);
		return Map.of("result", p_i_num);
	}

	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	@GetMapping("/list")
	public PageResponseDTO<GuideDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list............." + pageRequestDTO);
		return guideService.getList(pageRequestDTO);
	}

	@GetMapping("/{p_i_num}")
	public GuideDTO read(@PathVariable(name = "p_i_num") Long p_i_num) {
		return guideService.get(p_i_num);
	}

	@PutMapping("/{p_i_num}")
	public Map<String, String> modify(@PathVariable(name = "p_i_num") Long p_i_num, GuideDTO guideDTO) {
		guideDTO.setP_i_num(p_i_num);
		GuideDTO oldGuideDTO = guideService.get(p_i_num);

		List<String> oldFileNames = oldGuideDTO.getP_i_uploadFileNames();

		List<MultipartFile> files = guideDTO.getP_i_files();

		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		List<String> uploadedFileNames = guideDTO.getP_i_uploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		guideService.modify(guideDTO);
		if (oldFileNames != null && oldFileNames.size() > 0) {

			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}
		return Map.of("RESULT", "SUCCESS");
	}

	@DeleteMapping("/{p_i_num}")
	public Map<String, String> remove(@PathVariable("p_i_num") Long p_i_num) {
		
		List<String> oldFileNames = guideService.get(p_i_num).getP_i_uploadFileNames();
		guideService.remove(p_i_num);
		fileUtil.deleteFiles(oldFileNames);

		return Map.of("RESULT", "SUCCESS");
	}
}
