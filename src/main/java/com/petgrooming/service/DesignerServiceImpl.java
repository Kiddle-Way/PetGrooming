package com.petgrooming.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.DesignerImage;
import com.petgrooming.domain.Product;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.DesignerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자자동주입
public class DesignerServiceImpl implements DesignerService {

	private final DesignerRepository designerRepository;

	// 페이징
	@Override
	public PageResponseDTO<DesignerDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList........");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, // 1 페이지가 0이므로 주의
				pageRequestDTO.getSize(), Sort.by("dno").descending());

		Page<Object[]> result = designerRepository.selectList(pageable);

		List<DesignerDTO> dtoList = result.get().map(arr -> {

			Designer designer = (Designer) arr[0];
			DesignerImage designerImage = (DesignerImage) arr[1];

			DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname()).dgender(designer.getDgender())
					.dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone()).demail(designer.getDemail())
					.dh_date(designer.getDh_date()).dstate(designer.getDstate()).dintro(designer.getDintro())
					.dattach(designer.getDattach()).build();

			String imageStr = designerImage.getFileName();
			designerDTO.setUploadFileNames(List.of(imageStr));

			return designerDTO;

		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<DesignerDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public Long register(DesignerDTO designerDTO) {
		Designer designer = dtoToEntity(designerDTO);
		Designer result = designerRepository.save(designer);
		return result.getDno();
	}

	private Designer dtoToEntity(DesignerDTO designerDTO) {
		Designer designer = Designer.builder().dno(designerDTO.getDno()).dname(designerDTO.getDname())
				.dbirth(designerDTO.getDbirth()).dgender(designerDTO.getDgender()).dphone(designerDTO.getDphone()).demail(designerDTO.getDemail())
				.dh_date(designerDTO.getDh_date()).dstate(designerDTO.getDstate()).dintro(designerDTO.getDintro())
				.dattach(designerDTO.getDattach()).build();

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

	@Override
	public DesignerDTO get(Long dno) {
		java.util.Optional<Designer> result = designerRepository.selectOne(dno);
		Designer designer = result.orElseThrow();
		DesignerDTO designerDTO = entityToDTO(designer);

		return designerDTO;
	}

	private DesignerDTO entityToDTO(Designer designer) {
		DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname())
				.dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone()).demail(designer.getDemail())
				.dh_date(designer.getDh_date()).dstate(designer.getDstate()).dintro(designer.getDintro())
				.dattach(designer.getDattach()).build();

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
	
	@Override
	public void remove(Long dno) {
		designerRepository.updateToDelete(dno, true);
	}
	
	
	 // 상품 검색
    @Override
    public PageResponseDTO<DesignerDTO> search(String keyword, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());

        Page<Designer> result = designerRepository.findByDnameContaining(keyword, pageable);

        List<DesignerDTO> dtoList = result.getContent().stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<DesignerDTO> responseDTO = PageResponseDTO.<DesignerDTO>withAll().dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
        return responseDTO;
    }

}


