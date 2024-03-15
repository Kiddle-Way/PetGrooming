package com.petgrooming.dto;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
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
	private Long d_num;
	private Long p_num;
	private Long m_num;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate r_date;

	private ReserveTime r_time;

	private Long r_total_price;
	private String r_breed;
	private String r_dog_name;
	private String r_dog_notice;
}
