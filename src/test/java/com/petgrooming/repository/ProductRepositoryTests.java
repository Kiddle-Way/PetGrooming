package com.petgrooming.repository;

import com.petgrooming.domain.Product;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {
    @Autowired
    private ProductRepository productRepository;

    // 데이터 추가 테스트
    @Test
    public void testInsert() {
        Product product = Product.builder().p_type("추가상품").p_name("얼굴컷").p_price(5000).build();
        productRepository.save(product);
        Product product1 = Product.builder().p_type("추가상품").p_name("스파").p_price(20000).build();
        productRepository.save(product1);
    }

	/*
	 * // 데이터 조회 테스트
	 * 
	 * @Test public void testRead() { Long p_num = 1L; java.util.Optional<Product>
	 * result = productRepository.findById(p_num); Product product =
	 * result.orElseThrow(); log.info(product); }
	 * 
	 * // 데이터 수정 테스트
	 * 
	 * @Test public void testModify() { Long p_num = 1L; java.util.Optional<Product>
	 * result = productRepository.findById(p_num); Product product =
	 * result.orElseThrow(); product.changeP_type("추가상품");
	 * product.changeP_name("스파"); product.changeP_price(10000);
	 * productRepository.save(product); }
	 * 
	 * // 데이터 삭제 테스트
	 * 
	 * @Test public void testDelete() { Long p_num = 21L;
	 * productRepository.deleteById(p_num); }
	 */

/*    @Test
    public void testPaging() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> result = productRepository.findAllOrderByPnumDesc(pageable);
        log.info(result.getTotalElements());
        result.getContent().stream().forEach(product -> log.info(product));
    }*/
}
