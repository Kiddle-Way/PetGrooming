package com.petgrooming.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class InquiryPageResponseDTO<E> {

	private List<E> dtoList;
	private List<Integer> pageNumList;
	private InquiryPageRequestDTO inquiryPageRequestDTO;
	private boolean prev;
	private boolean next;
	private int totalCount;
	private int prevPage;
	private int nextPage;
	private int totalPage;
	private int current;
	private int goToFirstPage;
	private int goToLastPage;

	@Builder(builderMethodName = "withAll")
	public InquiryPageResponseDTO(List<E> dtoList, InquiryPageRequestDTO inquiryPageRequestDTO, long totalCount) {

		this.dtoList = dtoList;
		this.inquiryPageRequestDTO = inquiryPageRequestDTO;
		this.totalCount = (int) totalCount;

		int end = (int) (Math.ceil(inquiryPageRequestDTO.getPage() / 10.0)) * 10;
		int start = end - 9;
		int last = (int) (Math.ceil((totalCount / (double) inquiryPageRequestDTO.getSize())));

		end = end > last ? last : end;

		this.prev = start > 1;
		this.next = totalCount > end * inquiryPageRequestDTO.getSize();
		this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

		if (prev) {
			this.prevPage = start - 1;
		}
		if (next) {
			this.nextPage = end + 1;
		}
		this.totalPage = this.pageNumList.size();
		this.current = inquiryPageRequestDTO.getPage();
		this.goToFirstPage = 1;
		this.goToLastPage = last;
	}
}