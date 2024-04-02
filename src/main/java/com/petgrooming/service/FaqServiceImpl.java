package com.petgrooming.service;

import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Faq;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.FaqDTO;
import com.petgrooming.repository.FaqRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class FaqServiceImpl implements FaqService {

	private final ModelMapper modelMapper;
	private final FaqRepository faqRepository;

	// 등록
	@Override
	public Long register(FaqDTO faqDTO) {
		log.info("-----------");

		Faq faq = modelMapper.map(faqDTO, Faq.class);
		Faq savedFaq = faqRepository.save(faq);

		return savedFaq.getF_num();
	}

	// 정보불러오기
	@Override
	public FaqDTO read(Long f_num) {
		java.util.Optional<Faq> result = faqRepository.findById(f_num);

		Faq faq = result.orElseThrow();
		FaqDTO dto = modelMapper.map(faq, FaqDTO.class);

		return dto;
	}

	// 수정
	@Override
	public void modify(FaqDTO faqDTO) {
		Optional<Faq> result = faqRepository.findById(faqDTO.getF_num());

		Faq faq = result.orElseThrow();

		faq.changeTitle(faqDTO.getF_title());
		faq.changeContent(faqDTO.getF_content());

		faqRepository.save(faq);
	}

	// 삭제
	@Override
	public void remove(Long f_num) {
		faqRepository.deleteById(f_num);
	}

	// 리스트 불러오기
	@Override
	public PageResponseDTO<FaqDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
		Page<Faq> result = faqRepository.findAll(pageable);

		List<FaqDTO> dtoList = result.getContent().stream().map(faq -> modelMapper.map(faq, FaqDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<FaqDTO> responseDTO = PageResponseDTO.<FaqDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	// 제목 검색
	@Override
	public PageResponseDTO<FaqDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());

		Page<Faq> result = faqRepository.searchTitleList(pageable, searchTitle);

		List<FaqDTO> dtoList = result.getContent().stream().map(faq -> modelMapper.map(faq, FaqDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<FaqDTO> responseDTO = PageResponseDTO.<FaqDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	// 내용 검색
	@Override
	public PageResponseDTO<FaqDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());

		Page<Faq> result = faqRepository.searchContentList(pageable, searchContent);

		List<FaqDTO> dtoList = result.getContent().stream().map(faq -> modelMapper.map(faq, FaqDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<FaqDTO> responseDTO = PageResponseDTO.<FaqDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

}
