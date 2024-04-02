package com.petgrooming.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DesignerImage {

	private String fileName; // 파일이름
	private int ord; // 순서

	public void setOrd(int ord) {
		this.ord = ord;
	}
}
