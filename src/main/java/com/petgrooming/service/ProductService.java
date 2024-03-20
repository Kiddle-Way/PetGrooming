package com.petgrooming.service;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;

import java.util.List;

import org.springframework.data.domain.Sort;

public interface ProductService {
    // 등록 기능
    Long register(ProductDTO productDTO);

    // 조회 기능
    ProductDTO get(Long p_num);

    // 수정 기능
    void modify(ProductDTO productDTO);

    // 삭제 기능
    void remove(Long p_num);

    // 목록 구현
    PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO);

    //검색 기능
    PageResponseDTO<ProductDTO> search(String keyword, PageRequestDTO pageRequestDTO);

    // 필수상품 목록 조회
    List<ProductDTO> listEssentialProducts();

    // 추가상품 목록 조회
    List<ProductDTO> listAdditionalProducts();
}
