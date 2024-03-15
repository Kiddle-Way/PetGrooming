package com.petgrooming.repository;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.petgrooming.domain.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 글 번호 내림차순 정렬
    @Query("SELECT i FROM Product i ORDER BY i.p_num DESC")
    Page<Product> findAllOrderByPnumDesc(Pageable pageable);

    // 검색 기능
    @Query("SELECT i FROM Product i WHERE i.p_name LIKE %:keyword% OR i.p_type LIKE %:keyword% OR CAST(i.p_price AS string) LIKE %:keyword%")
    Page<Product> findByP_nameContaining(String keyword, Pageable pageable);

    // 가격 순으로 정렬
    @Query("SELECT i FROM Product i ORDER BY i.p_price")
    Page<Product> findAllOrderByP_price(Pageable pageable);

    // 상품 번호순으로 정렬
    @Query("SELECT i FROM Product i ORDER BY i.p_num")
    Page<Product> findAllOrderByP_num(Pageable pageable);
}
