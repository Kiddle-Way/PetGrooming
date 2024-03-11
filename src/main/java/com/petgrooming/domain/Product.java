package com.petgrooming.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@SequenceGenerator(name = "PRODUCT_SEQ_GEN", sequenceName = "PRODUCT_SEQ", initialValue = 1, allocationSize = 1)
@Table(name = "product_tbl")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCT_SEQ_GEN")
    private Long p_num; // 상품 번호
    private String p_type; // 상품 유형
    private String p_name; // 상품 이름
    private int p_price; // 상품 가격

    public void changeP_type(String p_type) {
        this.p_type = p_type;
    }

    public void changeP_name(String p_name) {
        this.p_name = p_name;
    }

    public void changeP_price(int p_price) {
        this.p_price = p_price;
    }
}
