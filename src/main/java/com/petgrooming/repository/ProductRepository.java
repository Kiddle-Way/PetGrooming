package com.petgrooming.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.petgrooming.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	// 글 번호 내림차순 정렬
	@Query("SELECT i FROM Product i ORDER BY i.p_num DESC")
	Page<Product> findAllOrderByPnumDesc(Pageable pageable);

	// 검색 기능
	@Query("SELECT i FROM Product i WHERE i.p_name LIKE %:keyword% OR i.p_type LIKE %:keyword% OR CAST(i.p_price AS string) LIKE %:keyword%")
	Page<Product> findByP_nameContaining(String keyword, Pageable pageable);

	// 필수상품 목록 조회
    @Query("SELECT i FROM Product i WHERE i.p_type = '필수상품'")
    List<Product> findEssentialProducts();

    // 추가상품 목록 조회
    @Query("SELECT i FROM Product i WHERE i.p_type = '추가상품'")
    List<Product> findAdditionalProducts();
}
