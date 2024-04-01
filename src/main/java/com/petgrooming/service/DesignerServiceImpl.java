package com.petgrooming.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.DesignerImage;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.DesignerRepository;

import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자자동주입
public class DesignerServiceImpl implements DesignerService {

	private final DesignerRepository designerRepository;

	private EntityManager entityManager;

	// 리스트
	@Override
	public PageResponseDTO<DesignerDTO> getList(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("dno").descending());
		Page<Designer> result = designerRepository.selectList(pageable);
		return convertToPageResponseDTO(result, pageRequestDTO);
	}

	@Override
	public Long register(DesignerDTO designerDTO) {
		Designer designer = dtoToEntity(designerDTO);
		Designer result = designerRepository.save(designer);
		return result.getDno();
	}

	// 디자이너DTO(DesignerDTO)를 받아서 이를 엔티티 객체(Designer)로 변환하고, 이를 데이터베이스에 저장하는 역할
	private Designer dtoToEntity(DesignerDTO designerDTO) {
		Designer designer = Designer.builder().dno(designerDTO.getDno()).dname(designerDTO.getDname())
				.dbirth(designerDTO.getDbirth()).dgender(designerDTO.getDgender()).dphone(designerDTO.getDphone())
				.demail(designerDTO.getDemail()).dh_date(designerDTO.getDh_date()).dstate(designerDTO.getDstate())
				.dintro(designerDTO.getDintro()).dattach(designerDTO.getDattach()).build();

		// 업로드처리가 끝난 파일들의 이름 리스트
		List<String> uploadFileNames = designerDTO.getUploadFileNames();
		if (uploadFileNames == null) {
			return designer;
		}

		uploadFileNames.stream().forEach(uploadName -> {
			designer.addImageString(uploadName);
		});
		return designer;
	}

	// 해당 디자이너의 정보를 가져오는 역할
	@Override
	public DesignerDTO get(Long dno) {
		java.util.Optional<Designer> result = designerRepository.selectOne(dno);
		Designer designer = result.orElseThrow();
		DesignerDTO designerDTO = entityToDTO(designer);

		return designerDTO;
	}

	// 단일 디자이너(Designer) 엔티티 객체를 디자이너DTO(DesignerDTO)로 변환하는 데 사용
	private DesignerDTO entityToDTO(Designer designer) {
		DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname())
				.dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone())
				.demail(designer.getDemail()).dh_date(designer.getDh_date()).dstate(designer.getDstate())
				.dintro(designer.getDintro()).dattach(designer.getDattach()).build();

		List<DesignerImage> imageList = designer.getImageList();
		if (imageList == null || imageList.size() == 0) {

			return designerDTO;
		}

		List<String> fileNameList = imageList.stream().map(designerImage -> designerImage.getFileName()).toList();
		designerDTO.setUploadFileNames(fileNameList);
		return designerDTO;
	}

	// 수정
	@Override
	public void modify(DesignerDTO designerDTO) {
		Optional<Designer> result = designerRepository.findById(designerDTO.getDno());

		Designer designer = result.orElseThrow();

		designer.changeDname(designerDTO.getDname());
		designer.changeDbirth(designerDTO.getDbirth());
		designer.changeDgender(designerDTO.getDgender());
		designer.changeDphone(designerDTO.getDphone());
		designer.changeDemail(designerDTO.getDemail());
		designer.changeDh_date(designerDTO.getDh_date());
		designer.changeDstate(designerDTO.getDstate());
		designer.changeDintro(designerDTO.getDintro());
		designer.changeDattach(designerDTO.getDattach());

		// upload File -- clear first
		designer.clearList();

		List<String> uploadFileNames = designerDTO.getUploadFileNames();

		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				designer.addImageString(uploadName);
			});
		}

		designerRepository.save(designer);
	}

	// 삭제
	@Override
	public void remove(Long dno) {
		designerRepository.updateToDelete(dno, true);
	}
	
	  @Override
	   public PageResponseDTO<DesignerDTO> search(String keyword, Long state, Long gender, PageRequestDTO pageRequestDTO) {

	      Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
	            Sort.by("dno").descending());

	      Page<Designer> page;

	      page = designerRepository.search(keyword, state, gender, pageable);

	      List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
	         DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname())
	               .dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone())
	               .demail(designer.getDemail()).dh_date(designer.getDh_date()).dstate(designer.getDstate()).build();
	         return designerDTO;
	      }).collect(Collectors.toList());

	      PageResponseDTO<DesignerDTO> pageResponseDTO = PageResponseDTO.<DesignerDTO>builder().dtoList(dtoList)
	            .pageRequestDTO(pageRequestDTO).totalCount(page.getTotalElements()).build();

	      return pageResponseDTO;
	   }



	// 중복 코드를 줄이고 각 메서드에서 페이지 응답을 변환
	public PageResponseDTO<DesignerDTO> convertToPageResponseDTO(Page<Designer> page, PageRequestDTO pageRequestDTO) {
		List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
			DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname())
					.dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone())
					.demail(designer.getDemail()).dh_date(designer.getDh_date()).dstate(designer.getDstate()).build();
			return designerDTO;
		}).collect(Collectors.toList());

		long totalCount = page.getTotalElements();

		return PageResponseDTO.<DesignerDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	// 복직,퇴사 메서드
	@Override
	public void updateState(Long dno, Long state) {
		try {
			Optional<Designer> result = designerRepository.findById(dno);
			Designer designer = result.orElseThrow(() -> new NoSuchElementException("디자이너를 찾을 수 없습니다. ID: " + dno));

			// 복직 처리 등 원하는 동작 수행
			// designer.setState(State.근무); // 복직 상태로 변경

			designerRepository.updateState(dno, state); // 변경 사항 저장
		} catch (NoSuchElementException e) {
			// 디자이너를 찾을 수 없는 경우 처리
			System.err.println("디자이너를 찾을 수 없습니다. ID: " + dno);
			e.printStackTrace();
		} catch (Exception e) {
			// 그 외 예외 처리
			System.err.println("오류가 발생했습니다.");
			e.printStackTrace();
		}
	}

}
