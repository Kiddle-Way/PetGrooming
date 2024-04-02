package com.petgrooming.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "FAQ_SEQ_GEN", sequenceName = "FAQ_SEQ", initialValue = 1, allocationSize = 1)
@Table(name = "FAQ_TBL")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Faq {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FAQ_SEQ_GEN")
	private Long f_num;

	@Column(nullable = false, length = 100)
	private String f_title;

	@Column(nullable = false, length = 2000)
	private String f_content;

	public void changeTitle(String f_title) {
		this.f_title = f_title;
	}

	public void changeContent(String f_content) {
		this.f_content = f_content;
	}
}
