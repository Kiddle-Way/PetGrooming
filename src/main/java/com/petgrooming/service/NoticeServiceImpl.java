package com.petgrooming.service;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.petgrooming.domain.Notice;
import com.petgrooming.domain.NoticeImage;
import com.petgrooming.dto.NoticeDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.NoticeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;

	// 등록
	@Override
	public Long register(NoticeDTO noticeDTO) {
		log.info("-----------");

		Notice notice = dtoToEntity(noticeDTO);
		Notice result = noticeRepository.save(notice);

		return result.getN_num();
	}

	// DesignerDTO 데이터 전송 객체를 Designer 엔티티 객체로 변환
	private Notice dtoToEntity(NoticeDTO noticeDTO) {
		Notice notice = Notice.builder().n_num(noticeDTO.getN_num()).n_head(noticeDTO.getN_head())
				.n_title(noticeDTO.getN_title()).n_content(noticeDTO.getN_content()).n_reg(noticeDTO.getN_reg())
				.build();

		List<String> uploadFileNames = noticeDTO.getUploadFileNames();
		if (uploadFileNames == null) {
			return notice;
		}
		uploadFileNames.stream().forEach(uploadName -> {
			notice.addImageString(uploadName);
		});
		return notice;
	}

	// 정보 불러오기
	@Override
	public NoticeDTO get(Long n_num) {
		java.util.Optional<Notice> result = noticeRepository.selectOne(n_num);

		Notice notice = result.orElseThrow();
		NoticeDTO noticeDTO = entityToDTO(notice);
		return noticeDTO;
	}

	// Designer 엔티티 객체를 DesignerDTO 데이터 전송 객체로 변환
	private NoticeDTO entityToDTO(Notice notice) {
		NoticeDTO noticeDTO = NoticeDTO.builder().n_num(notice.getN_num()).n_head(notice.getN_head())
				.n_title(notice.getN_title()).n_content(notice.getN_content()).n_reg(notice.getN_reg()).build();

		List<NoticeImage> imageList = notice.getImageList();

		if (imageList == null || imageList.size() == 0) {
			return noticeDTO;
		}
		List<String> fileNameList = imageList.stream().map(noticeImage -> noticeImage.getFileName()).toList();
		noticeDTO.setUploadFileNames(fileNameList);
		return noticeDTO;
	}

	// 수정
	@Override
	public void modify(NoticeDTO noticeDTO) {
		Optional<Notice> result = noticeRepository.findById(noticeDTO.getN_num());

		Notice notice = result.orElseThrow();

		notice.changeHead(noticeDTO.getN_head());
		notice.changeTitle(noticeDTO.getN_title());
		notice.changeContent(noticeDTO.getN_content());

		notice.clearList();

		List<String> uploadFileNames = noticeDTO.getUploadFileNames();

		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				notice.addImageString(uploadName);
			});
		}

		noticeRepository.save(notice);
	}

	// 상태 전환
	@Override
	public void remove(Long n_num) {
		noticeRepository.updateToDelete(n_num, true);
	}

	// 리스트 불러오기
	@Override
	public PageResponseDTO<NoticeDTO> getlist(PageRequestDTO pageRequestDTO) {

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("n_num").descending());

		Page<Notice> result = noticeRepository.selectList(pageable);

		List<NoticeDTO> dtoList = result.getContent().stream().map(notice -> {
			NoticeDTO noticeDTO = NoticeDTO.builder().n_num(notice.getN_num()).n_head(notice.getN_head())
					.n_title(notice.getN_title()).n_content(notice.getN_content()).n_reg(notice.getN_reg()).build();

			return noticeDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<NoticeDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	// 제목검색
	@Override
	public PageResponseDTO<NoticeDTO> getSearchTitleList(PageRequestDTO pageRequestDTO, String searchTitle) {

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("n_num").descending());

		Page<Notice> result = noticeRepository.searchTitleList(pageable, searchTitle);

		List<NoticeDTO> dtoList = result.getContent().stream().map(notice -> {
			NoticeDTO noticeDTO = NoticeDTO.builder().n_num(notice.getN_num()).n_head(notice.getN_head())
					.n_title(notice.getN_title()).n_content(notice.getN_content()).n_reg(notice.getN_reg()).build();

			return noticeDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<NoticeDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

	// 내용 검색
	@Override
	public PageResponseDTO<NoticeDTO> getSearchContentList(PageRequestDTO pageRequestDTO, String searchContent) {

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("n_num").descending());

		Page<Notice> result = noticeRepository.searchContentList(pageable, searchContent);

		List<NoticeDTO> dtoList = result.getContent().stream().map(notice -> {
			NoticeDTO noticeDTO = NoticeDTO.builder().n_num(notice.getN_num()).n_head(notice.getN_head())
					.n_title(notice.getN_title()).n_content(notice.getN_content()).n_reg(notice.getN_reg()).build();

			return noticeDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<NoticeDTO>withAll().dtoList(dtoList).totalCount(totalCount)
				.pageRequestDTO(pageRequestDTO).build();
	}

}
