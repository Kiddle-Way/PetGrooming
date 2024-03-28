package com.petgrooming.service;

import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Qna;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.QnaDTO;
import com.petgrooming.repository.QnaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

	private final ModelMapper modelMapper;
	private final QnaRepository qnaRepository;

	@Override
	public Long register(QnaDTO qnaDTO) {
		log.info("-----------");

		Qna qna = modelMapper.map(qnaDTO, Qna.class);
		Qna savedQna = qnaRepository.save(qna);

		return savedQna.getF_num();
	}

	@Override
	public QnaDTO get(Long f_num) {
		java.util.Optional<Qna> result = qnaRepository.findById(f_num);

		Qna qna = result.orElseThrow();
		QnaDTO dto = modelMapper.map(qna, QnaDTO.class);

		return dto;
	}

	@Override
	public void modify(QnaDTO qnaDTO) {
		Optional<Qna> result = qnaRepository.findById(qnaDTO.getF_num());

		Qna qna = result.orElseThrow();

		qna.changeTitle(qnaDTO.getF_title());
		qna.changeContent(qnaDTO.getF_content());

		qnaRepository.save(qna);
	}

	@Override
	public void remove(Long f_num) {
		qnaRepository.deleteById(f_num);
	}

	@Override
	public PageResponseDTO<QnaDTO> list(PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());
		Page<Qna> result = qnaRepository.findAll(pageable);

		List<QnaDTO> dtoList = result.getContent().stream().map(qna -> modelMapper.map(qna, QnaDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<QnaDTO> responseDTO = PageResponseDTO.<QnaDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	@Override
	public PageResponseDTO<QnaDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());

		Page<Qna> result = qnaRepository.searchTitleList(pageable, searchTitle);

		List<QnaDTO> dtoList = result.getContent().stream().map(qna -> modelMapper.map(qna, QnaDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<QnaDTO> responseDTO = PageResponseDTO.<QnaDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	@Override
	public PageResponseDTO<QnaDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize());

		Page<Qna> result = qnaRepository.searchContentList(pageable, searchContent);

		List<QnaDTO> dtoList = result.getContent().stream().map(qna -> modelMapper.map(qna, QnaDTO.class))
				.collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		PageResponseDTO<QnaDTO> responseDTO = PageResponseDTO.<QnaDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

}
