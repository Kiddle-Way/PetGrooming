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

import com.petgrooming.domain.Guide;
import com.petgrooming.domain.GuideImage;
import com.petgrooming.dto.GuideDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.GuideRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class GuideServiceImpl implements GuideService {
	private final GuideRepository guideRepository;

	@Override
	public PageResponseDTO<GuideDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("p_i_num").descending());

		Page<Object[]> result = guideRepository.selectList(pageable);

		List<GuideDTO> dtoList = result.get().map(arr -> {
			Guide guide = (Guide) arr[0];
			GuideImage guideImage = (GuideImage) arr[1];

			GuideDTO guideDTO = GuideDTO.builder().p_i_num(guide.getP_i_num()).p_i_content(guide.getP_i_content())
					.p_i_attach_size(guide.getP_i_attach_size()).build();
			String imageStr = guideImage.getFileName();
			guideDTO.setP_i_uploadFileNames(List.of(imageStr));

			return guideDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<GuideDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public Long register(GuideDTO guideDTO) {
		Guide guide = dtoToEntity(guideDTO);
		Guide result = guideRepository.save(guide);
		return result.getP_i_num();
	}

	private Guide dtoToEntity(GuideDTO guideDTO) {
		Guide guide = Guide.builder().p_i_num(guideDTO.getP_i_num()).p_i_content(guideDTO.getP_i_content())
				.p_i_attach_size(guideDTO.getP_i_attach_size()).build();
		// 업로드 처리가 끝난 파일들의 이름 리스트
		List<String> p_i_uploadFileNames = guideDTO.getP_i_uploadFileNames();
		if (p_i_uploadFileNames == null) {
			return guide;
		}
		p_i_uploadFileNames.stream().forEach(uploadName -> {
			guide.addImageString(uploadName);
		});
		return guide;
	}

	@Override
	public GuideDTO get(Long pno) {
		java.util.Optional<Guide> result = guideRepository.selectOne(pno);
		Guide guide = result.orElseThrow();
		GuideDTO guideDTO = entityToDTO(guide);
		return guideDTO;
	}

	private GuideDTO entityToDTO(Guide guide) {
		GuideDTO guideDTO = GuideDTO.builder().p_i_num(guide.getP_i_num()).p_i_content(guide.getP_i_content())
				.p_i_attach_size(guide.getP_i_attach_size()).build();
		List<GuideImage> imageList = guide.getImageList();
		if (imageList == null || imageList.size() == 0) {
			return guideDTO;
		}
		List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
		guideDTO.setP_i_uploadFileNames(fileNameList);
		return guideDTO;
	}

	@Override
	public void modify(GuideDTO guideDTO) {
		Optional<Guide> result = guideRepository.findById(guideDTO.getP_i_num());

		Guide guide = result.orElseThrow();

		guide.changeP_i_content(guideDTO.getP_i_content());
		guide.changeP_i_attach_size(guideDTO.getP_i_attach_size());

		guide.clearList();
		List<String> uploadFileNames = guideDTO.getP_i_uploadFileNames();
		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				guide.addImageString(uploadName);
			});
		}
		guideRepository.save(guide);
	}

	@Override
	public void remove(Long p_i_num) {
		guideRepository.deleteById(p_i_num);
	}

}
