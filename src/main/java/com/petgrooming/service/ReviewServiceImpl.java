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

import com.petgrooming.domain.Review;
import com.petgrooming.domain.ReviewImage;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReviewDTO;
import com.petgrooming.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {
	private final ReviewRepository reviewRepository;

	@Override
	public PageResponseDTO<ReviewDTO> getList(PageRequestDTO pageRequestDTO) {
		log.info("getList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("v_num").descending());

		Page<Review> result = reviewRepository.selectList(pageable);

		List<ReviewDTO> dtoList = result.getContent().stream().map(review -> {
			ReviewDTO reviewDTO = ReviewDTO.builder().v_num(review.getV_num()).m_num(review.getM_num())
					.v_pw(review.getV_pw()).v_title(review.getV_title()).v_content(review.getV_content())
					.v_content(review.getV_c_content()).build();

			return reviewDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return PageResponseDTO.<ReviewDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public PageResponseDTO<ReviewDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle) {
		log.info("getSearchTitleList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("v_num").descending());

		Page<Review> result = reviewRepository.searchTitleList(pageable, searchTitle);

		List<ReviewDTO> dtoList = result.getContent().stream().map(review -> {
			ReviewDTO reviewDTO = ReviewDTO.builder().v_num(review.getV_num()).m_num(review.getM_num())
					.v_pw(review.getV_pw()).v_title(review.getV_title()).v_content(review.getV_content())
					.v_c_content(review.getV_c_content()).build();
			return reviewDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return PageResponseDTO.<ReviewDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public PageResponseDTO<ReviewDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent) {
		log.info("getSearchContentList..............");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("v_num").descending());

		Page<Review> result = reviewRepository.searchContentList(pageable, searchContent);

		List<ReviewDTO> dtoList = result.getContent().stream().map(review -> {
			ReviewDTO reviewDTO = ReviewDTO.builder().v_num(review.getV_num()).m_num(review.getM_num())
					.v_pw(review.getV_pw()).v_title(review.getV_title()).v_content(review.getV_content())
					.v_c_content(review.getV_c_content()).build();
			return reviewDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();
		return PageResponseDTO.<ReviewDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	@Override
	public Long register(ReviewDTO reviewDTO) {
		Review review = dtoToEntity(reviewDTO);
		Review result = reviewRepository.save(review);
		return result.getV_num();
	}

	private Review dtoToEntity(ReviewDTO reviewDTO) {
		Review review = Review.builder().v_num(reviewDTO.getV_num()).m_num(reviewDTO.getM_num())
				.v_pw(reviewDTO.getV_pw()).v_title(reviewDTO.getV_title()).v_content(reviewDTO.getV_content())
				.v_c_content(reviewDTO.getV_c_content()).build();

		List<String> uploadFileNames = reviewDTO.getV_uploadFileNames();
		if (uploadFileNames == null) {
			return review;
		}
		uploadFileNames.stream().forEach(uploadName -> {
			review.addImageString(uploadName);
		});
		return review;
	}

	@Override
	public ReviewDTO get(Long v_num) {
		java.util.Optional<Review> result = reviewRepository.selectOne(v_num);
		Review review = result.orElseThrow();
		ReviewDTO reviewDTO = entityToDTO(review);
		return reviewDTO;
	}

	private ReviewDTO entityToDTO(Review review) {
		ReviewDTO reviewDTO = ReviewDTO.builder().v_num(review.getV_num()).m_num(review.getM_num())
				.v_pw(review.getV_pw()).v_title(review.getV_title()).v_content(review.getV_content())
				.v_c_content(review.getV_c_content()).build();

		List<ReviewImage> imageList = review.getImageList();

		if (imageList == null || imageList.size() == 0) {
			return reviewDTO;
		}
		List<String> fileNameList = imageList.stream().map(reviewImage -> reviewImage.getFileName()).toList();
		reviewDTO.setV_uploadFileNames(fileNameList);
		return reviewDTO;
	}

	@Override
	public void modify(ReviewDTO reviewDTO) {

		Optional<Review> result = reviewRepository.findById(reviewDTO.getV_num());
		Review review = result.orElseThrow();

		review.changeV_pw(reviewDTO.getV_pw());
		review.changeV_title(reviewDTO.getV_title());
		review.changeV_content(reviewDTO.getV_content());
		review.changeV_c_content(reviewDTO.getV_c_content());

		review.clearList();
		List<String> uploadFileNames = reviewDTO.getV_uploadFileNames();
		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				review.addImageString(uploadName);
			});
		}
		reviewRepository.save(review);
	}

	@Override
	public void remove(Long pno) {
		reviewRepository.updateToDelete(pno, true);
	}

}