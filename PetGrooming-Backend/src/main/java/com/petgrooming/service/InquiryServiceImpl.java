package com.petgrooming.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.domain.Inquiry;
import com.petgrooming.domain.InquiryImage;
import com.petgrooming.dto.InquiryPageRequestDTO;
import com.petgrooming.dto.InquiryPageResponseDTO;
import com.petgrooming.dto.InquiryDTO;
import com.petgrooming.repository.InquiryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class InquiryServiceImpl implements InquiryService {
	private final InquiryRepository inquiryRepository;

	// 리스트 불러오기
	@Override
	public InquiryPageResponseDTO<InquiryDTO> getList(InquiryPageRequestDTO inquiryPageRequestDTO) {
		log.info("getList..............");

		Pageable pageable = PageRequest.of(inquiryPageRequestDTO.getPage() - 1, inquiryPageRequestDTO.getSize(),
				Sort.by("i_num").descending());

		Page<Inquiry> result = inquiryRepository.selectList(pageable);

		List<InquiryDTO> dtoList = result.getContent().stream().map(inquiry -> {
			InquiryDTO inquiryDTO = InquiryDTO.builder().i_num(inquiry.getI_num()).m_num(inquiry.getM_num())
					.i_pw(inquiry.getI_pw()).i_title(inquiry.getI_title()).i_content(inquiry.getI_content())
					.i_a_content(inquiry.getI_a_content()).i_reg(inquiry.getI_reg()).build();

			return inquiryDTO;
		}).collect(Collectors.toList());
		long totalCount = result.getTotalElements();
		return InquiryPageResponseDTO.<InquiryDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.inquiryPageRequestDTO(inquiryPageRequestDTO).build();
	}

	// 제목 검색
	@Override
	public InquiryPageResponseDTO<InquiryDTO> getSearchTitleList(InquiryPageRequestDTO inquiryPageRequestDTO,
			String searchTitle) {
		log.info("getSearchTitleList..............");

		Pageable pageable = PageRequest.of(inquiryPageRequestDTO.getPage() - 1, inquiryPageRequestDTO.getSize(),
				Sort.by("i_num").descending());

		Page<Inquiry> result = inquiryRepository.searchTitleList(pageable, searchTitle);

		List<InquiryDTO> dtoList = result.getContent().stream().map(inquiry -> {
			InquiryDTO inquiryDTO = InquiryDTO.builder().i_num(inquiry.getI_num()).m_num(inquiry.getM_num())
					.i_pw(inquiry.getI_pw()).i_title(inquiry.getI_title()).i_content(inquiry.getI_content())
					.i_a_content(inquiry.getI_a_content()).i_reg(inquiry.getI_reg()).build();
			return inquiryDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return InquiryPageResponseDTO.<InquiryDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.inquiryPageRequestDTO(inquiryPageRequestDTO).build();
	}

	// 내용 검색
	@Override
	public InquiryPageResponseDTO<InquiryDTO> getSearchContentList(InquiryPageRequestDTO inquiryPageRequestDTO,
			String searchContent) {
		log.info("getSearchContentList..............");

		Pageable pageable = PageRequest.of(inquiryPageRequestDTO.getPage() - 1, inquiryPageRequestDTO.getSize(),
				Sort.by("i_num").descending());

		Page<Inquiry> result = inquiryRepository.searchContentList(pageable, searchContent);

		List<InquiryDTO> dtoList = result.getContent().stream().map(inquiry -> {
			InquiryDTO inquiryDTO = InquiryDTO.builder().i_num(inquiry.getI_num()).m_num(inquiry.getM_num())
					.i_pw(inquiry.getI_pw()).i_title(inquiry.getI_title()).i_content(inquiry.getI_content())
					.i_a_content(inquiry.getI_a_content()).i_reg(inquiry.getI_reg()).build();
			return inquiryDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return InquiryPageResponseDTO.<InquiryDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.inquiryPageRequestDTO(inquiryPageRequestDTO).build();
	}

	// 등록
	@Override
	public Long register(InquiryDTO inquiryDTO) {
		Inquiry inquiry = dtoToEntity(inquiryDTO);
		Inquiry result = inquiryRepository.save(inquiry);
		return result.getI_num();
	}

	// DesignerDTO 데이터 전송 객체를 Designer 엔티티 객체로 변환
	private Inquiry dtoToEntity(InquiryDTO inquiryDTO) {
		Inquiry inquiry = Inquiry.builder().i_num(inquiryDTO.getI_num()).m_num(inquiryDTO.getM_num())
				.i_pw(inquiryDTO.getI_pw()).i_title(inquiryDTO.getI_title()).i_content(inquiryDTO.getI_content())
				.i_a_content(inquiryDTO.getI_a_content()).build();

		List<String> uploadFileNames = inquiryDTO.getI_uploadFileNames();
		if (uploadFileNames == null) {
			return inquiry;
		}
		uploadFileNames.stream().forEach(uploadName -> {
			inquiry.addImageString(uploadName);
		});
		return inquiry;
	}

	// 정보 불러오기
	@Override
	public InquiryDTO get(Long i_num) {
		java.util.Optional<Inquiry> result = inquiryRepository.selectOne(i_num);
		Inquiry inquiry = result.orElseThrow();
		InquiryDTO inquiryDTO = entityToDTO(inquiry);
		return inquiryDTO;
	}

	// Designer 엔티티 객체를 DesignerDTO 데이터 전송 객체로 변환
	private InquiryDTO entityToDTO(Inquiry inquiry) {
		InquiryDTO inquiryDTO = InquiryDTO.builder().i_num(inquiry.getI_num()).m_num(inquiry.getM_num())
				.i_pw(inquiry.getI_pw()).i_title(inquiry.getI_title()).i_content(inquiry.getI_content())
				.i_a_content(inquiry.getI_a_content()).i_reg(inquiry.getI_reg()).build();

		List<InquiryImage> imageList = inquiry.getImageList();

		if (imageList == null || imageList.size() == 0) {
			return inquiryDTO;
		}
		List<String> fileNameList = imageList.stream().map(inquiryImage -> inquiryImage.getFileName()).toList();
		inquiryDTO.setI_uploadFileNames(fileNameList);
		return inquiryDTO;
	}

	// 수정 하기
	@Override
	public void modify(InquiryDTO inquiryDTO) {

		Optional<Inquiry> result = inquiryRepository.findById(inquiryDTO.getI_num());
		Inquiry inquiry = result.orElseThrow();

		inquiry.changeI_pw(inquiryDTO.getI_pw());
		inquiry.changeI_title(inquiryDTO.getI_title());
		inquiry.changeI_content(inquiryDTO.getI_content());
		inquiry.changeI_a_content(inquiryDTO.getI_a_content());

		inquiry.clearList();
		List<String> uploadFileNames = inquiryDTO.getI_uploadFileNames();
		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				inquiry.addImageString(uploadName);
			});
		}
		inquiryRepository.save(inquiry);
	}

	// 상태 전환
	@Override
	public void remove(Long pno) {
		inquiryRepository.updateToDelete(pno, true);
	}

}