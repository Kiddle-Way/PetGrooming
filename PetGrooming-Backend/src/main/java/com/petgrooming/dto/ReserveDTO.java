package com.petgrooming.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.petgrooming.domain.AvailableTimeslot;
import com.petgrooming.domain.Designer;
import com.petgrooming.domain.Member;
import com.petgrooming.domain.Product;
import com.petgrooming.domain.ReserveTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReserveDTO {
	// 예약 번호
	private Long r_num;
	// 예약 디자이너 번호
	private Designer d_num;
	// 예약 회원 번호
	private Member m_num;

	// 예약 상품 정보
	private String allProduct;

	// 예약 날짜
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate r_date;

	// 예약 시간
	private AvailableTimeslot a_t_num;
	// 예약 총가격
	private Long r_total_price;
	// 예약 견종
	private String r_breed;
	// 예약 견이름
	private String r_dog_name;
	// 예약 견주의사항
	private String r_dog_notice;
	private boolean r_delete_request;// 취소 요청
	private boolean r_delFlag; // 취소 확정
}
