package com.petgrooming.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Reserve;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReserveDTO;
import com.petgrooming.repository.ReserveRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자 자동 주입
public class ReserveServiceImpl implements ReserveService {
	// 자동주입 대상은 final 로
	private final ModelMapper modelMapper;
	private final ReserveRepository reserveRepository;

	@Override
	public PageResponseDTO<ReserveDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("r_num").descending());

		Page<Reserve> result = reserveRepository.selectList(pageable);

		List<ReserveDTO> dtoList = result.getContent().stream()
				.map(reserve -> modelMapper.map(reserve, ReserveDTO.class)).collect(Collectors.toList());
		long totalCount = result.getTotalElements();

		PageResponseDTO<ReserveDTO> responseDTO = PageResponseDTO.<ReserveDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	@Override
	public PageResponseDTO<ReserveDTO> getRequestList(PageRequestDTO pageRequestDTO) {
		log.info("getList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("r_num").descending());

		Page<Reserve> result = reserveRepository.selectRequestList(pageable);

		List<ReserveDTO> dtoList = result.getContent().stream()
				.map(reserve -> modelMapper.map(reserve, ReserveDTO.class)).collect(Collectors.toList());
		long totalCount = result.getTotalElements();

		PageResponseDTO<ReserveDTO> responseDTO = PageResponseDTO.<ReserveDTO>withAll().dtoList(dtoList)
				.pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();

		return responseDTO;
	}

	@Override
	public Long register(ReserveDTO reserveDTO) {
		Reserve reserve = dtoToEntity(reserveDTO);
		Reserve savedReserve = reserveRepository.save(reserve);
		return savedReserve.getR_num();
	}

	private Reserve dtoToEntity(ReserveDTO reserveDTO) {
		Reserve reserve = Reserve.builder().d_num(reserveDTO.getD_num()).allProduct(reserveDTO.getAllProduct())
				.m_num(reserveDTO.getM_num()).r_date(reserveDTO.getR_date()).a_t_num(reserveDTO.getA_t_num())
				.r_total_price(reserveDTO.getR_total_price()).r_breed(reserveDTO.getR_breed())
				.r_dog_name(reserveDTO.getR_dog_name()).r_dog_notice(reserveDTO.getR_dog_notice()).build();
		return reserve;
	}

	@Override
	public ReserveDTO get(Long r_num) {
		java.util.Optional<Reserve> result = reserveRepository.findById(r_num);
		Reserve reserve = result.orElseThrow();
		ReserveDTO dto = modelMapper.map(reserve, ReserveDTO.class);
		return dto;
	}

	@Override
	public void removeRequest(Long r_num) {
		reserveRepository.updateToDelete_request(r_num, true);
	}

	@Override
	public void remove(Long r_num) {
		reserveRepository.updateToDelete(r_num, true);
	}
	
	// 내 예약 확인
	@Override
	public PageResponseDTO<ReserveDTO> findReserveByMemberNumber(Long m_num, PageRequestDTO pageRequestDTO) {
	    log.info("Finding reservations for member: {}", m_num);

	    Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
	            Sort.by("r_num").descending());

	    Page<Reserve> result = reserveRepository.selectReserveByMemberNumber(m_num, pageable);

	    List<ReserveDTO> dtoList = result.getContent().stream()
	            .map(reserve -> modelMapper.map(reserve, ReserveDTO.class))
	            .collect(Collectors.toList());

	    long totalCount = result.getTotalElements();

	    return PageResponseDTO.<ReserveDTO>withAll()
	            .dtoList(dtoList)
	            .pageRequestDTO(pageRequestDTO)
	            .totalCount(totalCount)
	            .build();
	}

}