package com.petgrooming.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.*;

@Entity
@Table(name = "available_timeslots")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AvailableTimeslot {

	// 디자이너별 가능시간 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long a_t_num;

	// 날짜
	@Column(nullable = false)
	private LocalDate a_t_date;

	// 시간
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ReserveTime time;

	// 예약유무
	@Column(nullable = false)
	private boolean isAvailable;

	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	public void changeDel(boolean delFlag) {
		this.isAvailable = delFlag;
	}

	// 디자이너 번호
	@ManyToOne(optional = false)
	@JoinColumn(name = "d_num", referencedColumnName = "d_num")
	private Designer d_num;

	public AvailableTimeslot(LocalDate a_t_date, ReserveTime time, boolean isAvailable, Designer d_num) {
		this.a_t_date = a_t_date;
		this.time = time;
		this.isAvailable = isAvailable;
		this.d_num = d_num;
	}
}