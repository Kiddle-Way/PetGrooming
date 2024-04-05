package com.petgrooming.controller;

import java.util.Map;

import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
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

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.AvailableTimeslotRepository;
import com.petgrooming.repository.DesignerRepository;
import com.petgrooming.service.DesignerService;
import com.petgrooming.util.CustomFileUtil;
import com.petgrooming.domain.AvailableTimeslot;
import com.petgrooming.domain.Designer;
import com.petgrooming.domain.ReserveTime;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/designer")
public class DesignerController {
	private final DesignerRepository designerrepository;
	private final AvailableTimeslotRepository availableTimeslotRepository;
	private final DesignerService service; // DesignerService 주입
	private final CustomFileUtil fileUtil;

	
	//조회
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/{d_num}")
	public DesignerDTO read(@PathVariable(name = "d_num") Long d_num) {
		return service.get(d_num);
	}

	// getlist
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list")
	public PageResponseDTO<DesignerDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list........" + pageRequestDTO);

		return service.getlist(pageRequestDTO);
	}

	//추가
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(DesignerDTO designerDTO) {
		log.info("register: " + designerDTO);

		List<MultipartFile> files = designerDTO.getD_files();
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		designerDTO.setD_uploadFileNames(uploadFileNames);
		log.info(uploadFileNames);

		Long d_num = service.register(designerDTO);
		addAvailableTimeslotsForDesigner(d_num);

		return Map.of("RESULT", d_num);
	}

	//이미지조회
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	//수정
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PutMapping("/{d_num}")
	public Map<String, String> modify(@PathVariable(name = "d_num") Long d_num, DesignerDTO designerDTO) {
		designerDTO.setD_num(d_num);

		DesignerDTO oldDesignerDTO = service.get(d_num);

		List<String> oldFileNames = oldDesignerDTO.getD_uploadFileNames();
		List<MultipartFile> files = designerDTO.getD_files();

		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		List<String> uploadedFileNames = designerDTO.getD_uploadFileNames();

		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		service.modify(designerDTO);

		if (oldFileNames != null && oldFileNames.size() > 0) {
			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}

		return Map.of("RESULT", "SUCCESS");
	}
	
	//근무상태
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PutMapping("/{d_num}/{state}")
	public ResponseEntity<Void> updateDesignerState(@PathVariable Long d_num, @PathVariable boolean state) {
		service.updateState(d_num, state);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	// 디자이너 사용가능한 시간대
	private void addAvailableTimeslotsForDesigner(Long d_num) {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
		Designer designer = designerrepository.findById(d_num).orElse(null);
		List<AvailableTimeslot> timeslots = new ArrayList<>();
		while (currentDate.isBefore(endDate)) {
			for (ReserveTime time : ReserveTime.values()) {
				AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
				timeslots.add(timeslot);
			}
			currentDate = currentDate.plusDays(1);
		}
		availableTimeslotRepository.saveAll(timeslots);
	}

	// 검색
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/list/search/g{gender}/s{state}/k{keyword}")
	public PageResponseDTO<DesignerDTO> searchDesigners(@PathVariable(name = "gender", required = false) Boolean gender,
			@PathVariable(name = "state", required = false) Boolean state, @PathVariable("keyword") String keyword,
			PageRequestDTO pageRequestDTO) {
		return service.search(keyword, state, gender, pageRequestDTO);
	}

}