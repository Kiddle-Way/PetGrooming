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
	private Long r_num;
	private Designer d_num;
	private Member m_num;
	private String allProduct;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate r_date;

	private AvailableTimeslot a_t_num;

	private Long r_total_price;
	private String r_breed;
	private String r_dog_name;
	private String r_dog_notice;
	private boolean r_delete_request;// 취소 요청
	private boolean r_delFlag;
}
