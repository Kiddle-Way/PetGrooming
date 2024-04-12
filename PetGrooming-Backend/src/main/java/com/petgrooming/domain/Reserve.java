package com.petgrooming.domain;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reserve")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reserve {
	// 예약번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RESERVE_SEQ_GEN")
	private Long r_num;

	// 예약 디자이너 번호
	@ManyToOne(optional = false)
	@JoinColumn(name = "d_num", referencedColumnName = "d_num")
	private Designer d_num;

	// 예약 회원 번호
	@ManyToOne(optional = false)
	@JoinColumn(name = "m_num", referencedColumnName = "m_num")
	private Member m_num;

	// 예약 상품 이름(필수상품, 추가상품 전부 저장)
	private String allProduct;

	// 예약날짜
	@Column(nullable = false)
	private LocalDate r_date;

	// 예약시간
	@ManyToOne(optional = false)
	@JoinColumn(name = "a_t_num", referencedColumnName = "a_t_num")
	private AvailableTimeslot a_t_num;

	// 총가격
	private Long r_total_price;
	// 견종
	private String r_breed;
	// 견 이름
	private String r_dog_name;
	// 견 주의사항
	private String r_dog_notice;
	private boolean r_delete_request;// 취소 요청
	// 취소 확정
	private boolean r_delFlag;

	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	public void changeDel(boolean delFlag) {
		this.r_delFlag = delFlag;
	}

	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	public void changeDel_request(boolean delete_request) {
		this.r_delete_request = delete_request;
	}
}
