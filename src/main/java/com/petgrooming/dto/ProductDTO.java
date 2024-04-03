package com.petgrooming.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	// 상품 번호
	private Long p_num;
	// 상품 타입
	private String p_type;
	// 상품 이름
	private String p_name;
	// 상품 가격
	private int p_price;
}
