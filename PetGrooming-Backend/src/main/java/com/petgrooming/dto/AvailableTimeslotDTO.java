package com.petgrooming.dto;

import java.time.LocalDate;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.ReserveTime;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvailableTimeslotDTO {

	// 예약시간 번호
	private Long a_t_num;
	// 예약시간 날짜
	private LocalDate a_t_date;
	// 예약 시간
	private ReserveTime time;
	// 예약 가능 확인
	private boolean isAvailable;
	// 디자이너 번호
	private Designer d_num;

}
