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
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RESERVE_SEQ_GEN")
	private Long r_num;

	@ManyToOne(optional = false)
    @JoinColumn(name = "d_num", referencedColumnName = "dno")
	private Designer d_num;
	
	@ManyToOne(optional = false)
    @JoinColumn(name = "m_num", referencedColumnName = "m_num")
	private Member m_num;

	private String allProduct;
	
	@Column(nullable = false)
	private LocalDate r_date;

	@ManyToOne(optional = false)
	@JoinColumn(name = "a_t_num", referencedColumnName = "a_t_num")
	private AvailableTimeslot a_t_num;

	private Long r_total_price;
	private String r_breed;
	private String r_dog_name;
	private String r_dog_notice;
	private boolean r_delete_request;// 취소 요청
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
