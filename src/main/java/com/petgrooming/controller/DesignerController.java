package com.petgrooming.controller;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.service.DesignerService;
import com.petgrooming.util.CustomFileUtil;
import com.petgrooming.domain.Designer;
import com.petgrooming.domain.DesignerSpecification;
import com.petgrooming.domain.Gender;
import com.petgrooming.domain.State;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/designer")
public class DesignerController {
	private final DesignerService designerService; // DesignerService 주입
	private final CustomFileUtil fileUtil;

	@PostMapping("/")
	public Map<String, Long> register(DesignerDTO designerDTO) {
		// DesignerDTO를 받아 처리하는 로직입니다.
	log.info("register: " + designerDTO);

		List<MultipartFile> files = designerDTO.getFiles();

		List<String> uploadFileNames = fileUtil.saveFiles(files);
		designerDTO.setUploadFileNames(uploadFileNames);
		log.info(uploadFileNames);

	
		Long dno = designerService.register(designerDTO);
		return Map.of("result", dno);
	}

	//이미지 보기
	//여기 회원만 보기 달기 금지
	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	@GetMapping("/list")
	public PageResponseDTO<DesignerDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list............." + pageRequestDTO);
		return designerService.getList(pageRequestDTO);
	}

//조회
	@GetMapping("/{dno}")
	public DesignerDTO get(@PathVariable(name = "dno") Long dno) {
		return designerService.get(dno);
	}

	// 수정
	@PutMapping("/{dno}")
	public Map<String, String> modify(@PathVariable(name = "dno") Long dno, DesignerDTO designerDTO) {
		designerDTO.setDno(dno);
		DesignerDTO oldDesignerDTO = designerService.get(dno);

		// 기존의 파일들(데이터베이스에 존재하는 파일들-수정 과정에서 삭제 되었을 수 있음)
		List<String> oldFileNames = oldDesignerDTO.getUploadFileNames();

		// 새로 업로드 해야 하는 파일
		List<MultipartFile> files = designerDTO.getFiles();
		// 새로 업로드 되어 만들어진 파일 이름
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);
		// 화면에서 변화없이 계속 유지된 파일
		List<String> uploadedFileNames = designerDTO.getUploadFileNames();
		// 유지되는 파일들 + 새로 업로드 된 파일 이름들이 저장해야 하는 파일 목록이 됨
		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}
		// 수정작업
		designerService.modify(designerDTO);

		if (oldFileNames != null && oldFileNames.size() > 0) {
			// 지워야하는 파일목록찾기
			// 예전 파일 중에서 지워져야 하는 파일 이름
			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
			// 실제 파일 삭제
			fileUtil.deleteFiles(removeFiles);
		}
		return Map.of("RESULT", "SUCCESS");
	}

	// 삭제
	@DeleteMapping("/{dno}")
	public Map<String, String> remove(@PathVariable(name = "dno") Long dno) {

		// 삭제해야 할 파일들 알아내기
		List<String> oldFileNames = designerService.get(dno).getUploadFileNames();

		designerService.remove(dno);
		fileUtil.deleteFiles(oldFileNames);

		return Map.of("RESULT", "SUCCESS");
	}
	
//	@GetMapping("/list/searchTerm/{searchTerm}")
//	public PageResponseDTO<DesignerDTO> search(@RequestParam(required = false) Gender gender,
//	        @RequestParam(required = false) State state,
//	        @RequestParam(required = false) String keyword,
//	        PageRequestDTO pageRequestDTO) {
//	    log.info("search list............." + pageRequestDTO);
//
//	    Specification<Designer> spec = DesignerSpecification.searchByGenderAndState(gender, state, keyword);
//	    return designerService.search(spec, keyword, pageRequestDTO);
//	}
	

	
	//검색
	@GetMapping("/list/searchTerm/{keyword}")
	public PageResponseDTO<DesignerDTO> search(@RequestParam(required = false) Gender gender,
	        @RequestParam(required = false) State state,
	        @RequestParam(required = false) String keyword,
	        PageRequestDTO pageRequestDTO) {
	    log.info("search list............." + pageRequestDTO);
	     
	    return designerService.search(gender, state, keyword, pageRequestDTO);
        }
        
	
	//성별검색
	@GetMapping("/list/searchGender/{searchGender}")
	public PageResponseDTO<DesignerDTO> getSearchGenderList(@PathVariable int searchGender, PageRequestDTO pageRequestDTO) {
	    log.info("searchGender list............." + pageRequestDTO);
	    int genderValue = searchGender == 0 ? 0 : 1; // 성별값으로 변환
	    PageResponseDTO<DesignerDTO> result = designerService.getSearchGenderList(genderValue, pageRequestDTO);
	    return result;
	}
	
	
	//근무형태
		@GetMapping("/list/searchState/{searchState}")
		public PageResponseDTO<DesignerDTO> getSearchStateList(int searchState, PageRequestDTO pageRequestDTO) {
		    log.info("searchState list............." + pageRequestDTO);
		    int stateValue = searchState == 0 ? 0 : 1; // 상태값으로 변환
		    PageResponseDTO<DesignerDTO> result = designerService.getSearchStateList(stateValue, pageRequestDTO);
		    return result;
		}
		
		// 퇴직 또는 복직 처리 엔드포인트
		@PutMapping("/{dno}/state")
		@CrossOrigin(origins = "http://localhost:3000")
		public ResponseEntity<Void> updateDesignerState(@PathVariable(name = "dno") Long dno, @RequestParam(name = "action") String action) {
		    if ("rehire".equals(action)) {
		        designerService.rehireDesigner(dno); // 복직 처리
		        log.info("dno");
		    } else if ("fire".equals(action)) {
		        designerService.fireDesigner(dno); // 퇴사 처리
		        log.info("dno");
		    } else {
		        return ResponseEntity.badRequest().build(); // 잘못된 동작 요청 시 에러 응답

		    }
		    return ResponseEntity.ok().build();
		}
		
	    
	}
		
		
//		// 복직 처리 엔드포인트
//	    @GetMapping("/list/{dno}/rehire")
//	    public ResponseEntity<Void> rehireDesigner(@PathVariable(name = "dno") Long dno) {
//	        designerService.updateToState(dno, false); // 복직 처리
//	        return ResponseEntity.ok().build();
//	    }
////
//	    // 퇴사 처리 엔드포인트
//	    @GetMapping("/list/{dno}/fire")
//	    public ResponseEntity<Void> fireDesigner(@PathVariable(name = "dno") Long dno) {
//	        designerService.updateToState(dno, true); // 퇴사 처리
//	        return ResponseEntity.ok().build();
//	    }
		
	
	

//	//근무형태
//	@GetMapping("/list/searchState/{searchState}")
//	public PageResponseDTO<DesignerDTO> getSearchStateList(@PathVariable String searchState, PageRequestDTO pageRequestDTO) {
//	    log.info("list............." + pageRequestDTO);
//	    return designerService.getSearchStateList(pageRequestDTO, searchState);
//	}

