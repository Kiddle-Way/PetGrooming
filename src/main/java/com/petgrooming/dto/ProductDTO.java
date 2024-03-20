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
    private Long p_num;
    private String p_type;
    private String p_name;
    private int p_price;
}
