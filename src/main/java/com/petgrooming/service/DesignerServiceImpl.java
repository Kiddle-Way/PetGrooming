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

	
	//검색
	@Override
	public PageResponseDTO<DesignerDTO> search(String keyword, Boolean state, Boolean gender,
			PageRequestDTO pageRequestDTO) {

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("d_num").descending());

		Page<Designer> page;

		page = designerRepository.search(keyword, state, gender, pageable);

		List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
			DesignerDTO designerDTO = DesignerDTO.builder().d_num(designer.getD_num()).d_name(designer.getD_name())
					.d_birth(designer.getD_birth()).d_gender(designer.isD_gender()).d_phone(designer.getD_phone())
					.d_email(designer.getD_email()).d_h_date(designer.getD_h_date()).d_state(designer.isD_state())
					.d_intro(designer.getD_intro()).build();
			return designerDTO;
		}).collect(Collectors.toList());

		PageResponseDTO<DesignerDTO> pageResponseDTO = PageResponseDTO.<DesignerDTO>builder().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(page.getTotalElements()).build();

		return pageResponseDTO;
	}

	private DesignerDTO entityToDTO(Designer designer) {
		DesignerDTO designerDTO = DesignerDTO.builder().d_num(designer.getD_num()).d_name(designer.getD_name())
				.d_birth(designer.getD_birth()).d_gender(designer.isD_gender()).d_phone(designer.getD_phone())
				.d_email(designer.getD_email()).d_h_date(designer.getD_h_date()).d_state(designer.isD_state())
				.d_intro(designer.getD_intro()).build();

		List<DesignerImage> imageList = designer.getImageList();

		if (imageList == null || imageList.size() == 0) {
			return designerDTO;
		}
		List<String> fileNameList = imageList.stream().map(noticeImage -> noticeImage.getFileName()).toList();
		designerDTO.setD_uploadFileNames(fileNameList);
		return designerDTO;
	}

	private Designer dtoToEntity(DesignerDTO designerDTO) {
		Designer designer = Designer.builder().d_num(designerDTO.getD_num()).d_name(designerDTO.getD_name())
				.d_birth(designerDTO.getD_birth()).d_gender(designerDTO.isD_gender()).d_phone(designerDTO.getD_phone())
				.d_email(designerDTO.getD_email()).d_h_date(designerDTO.getD_h_date()).d_state(designerDTO.isD_state())
				.d_intro(designerDTO.getD_intro()).build();

		List<String> uploadFileNames = designerDTO.getD_uploadFileNames();
		if (uploadFileNames == null) {
			return designer;
		}
		uploadFileNames.stream().forEach(uploadName -> {
			designer.addImageString(uploadName);
		});
		return designer;
	}

	@Override
	public Long register(DesignerDTO designerDTO) {
		log.info("-----------");

		Designer designer = dtoToEntity(designerDTO);
		Designer result = designerRepository.save(designer);

		return result.getD_num();
	}

	@Override
	public DesignerDTO get(Long d_num) {
		java.util.Optional<Designer> result = designerRepository.selectOne(d_num);

		Designer designer = result.orElseThrow();
		DesignerDTO designerDTO = entityToDTO(designer);
		return designerDTO;
	}

	
	//수정
	@Override
	public void modify(DesignerDTO designerDTO) {
		Optional<Designer> result = designerRepository.findById(designerDTO.getD_num());

		Designer designer = result.orElseThrow();

		designer.changeDname(designerDTO.getD_name());
		designer.changeDbirth(designerDTO.getD_birth());
		designer.changeDgender(designerDTO.isD_gender());
		designer.changeDemail(designerDTO.getD_email());
		designer.changeDphone(designerDTO.getD_phone());
		designer.changeD_h_date(designerDTO.getD_h_date());
		designer.changeDintro(designerDTO.getD_intro());

		designer.clearList();

		List<String> uploadFileNames = designerDTO.getD_uploadFileNames();

		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				designer.addImageString(uploadName);
			});
		}

		designerRepository.save(designer);
	}

	//퇴사,복직
	@Override
	public void updateState(Long d_num, boolean d_state) {
		designerRepository.updateToState(d_num, d_state);
	}

	//조회
	@Override
	public PageResponseDTO<DesignerDTO> getlist(PageRequestDTO pageRequestDTO) {

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("d_num").descending());

		Page<Designer> result = designerRepository.selectList(pageable);

		List<DesignerDTO> dtoList = result.getContent().stream().map(designer -> {
			DesignerDTO designerDTO = DesignerDTO.builder().d_num(designer.getD_num()).d_name(designer.getD_name())
					.d_birth(designer.getD_birth()).d_gender(designer.isD_gender()).d_phone(designer.getD_phone())
					.d_email(designer.getD_email()).d_h_date(designer.getD_h_date()).d_state(designer.isD_state())
					.d_intro(designer.getD_intro()).build();
			
			List<DesignerImage> imageList = designer.getImageList();

			if (imageList == null || imageList.size() == 0) {
				return designerDTO;
			}
			List<String> fileNameList = imageList.stream().map(noticeImage -> noticeImage.getFileName()).toList();
			designerDTO.setD_uploadFileNames(fileNameList);
			
			return designerDTO;
		}).collect(Collectors.toList());

		PageResponseDTO<DesignerDTO> pageResponseDTO = PageResponseDTO.<DesignerDTO>builder().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(result.getTotalElements()).build();

		return pageResponseDTO;
	}
}