package com.petgrooming.service;

import com.petgrooming.domain.Product;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class ProductServiceTests {
    @Autowired
    private ProductService productService;

    // 등록 테스트
    @Test
    public void TestRegister() {
        ProductDTO productDTO = ProductDTO.builder()
                .p_type("필수상품")
                .p_name("목욕_4kg")
                .p_price(15000)
                .build();

        Long p_num = productService.register(productDTO);
        log.info("P_NUM" + p_num);
    }

    @Test
    // 조회 테스트
    public void testGet() {
        Long p_num = 21L;
        ProductDTO productDTO = productService.get(p_num);
        log.info(productDTO);
    }

    // 목록 테스트
    @Test
    public void testList() {
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder()
                .page(2)
                .size(10)
                .build();
        PageResponseDTO<ProductDTO> response = productService.list(pageRequestDTO);
        log.info(response);
    }

}
