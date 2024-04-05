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
		Product product2 = Product.builder().p_type("필수상품").p_name("01 목욕 ~4kg").p_price(20000).build();
		productRepository.save(product2);
		Product product3 = Product.builder().p_type("필수상품").p_name("02 목욕 5~8kg").p_price(30000).build();
		productRepository.save(product3);
		Product product4 = Product.builder().p_type("필수상품").p_name("03 목욕 9~12kg").p_price(40000).build();
		productRepository.save(product4);
		Product product5 = Product.builder().p_type("필수상품").p_name("04 목욕 13~15kg").p_price(50000).build();
		productRepository.save(product5);
		Product product6 = Product.builder().p_type("필수상품").p_name("01 위생 ~4kg").p_price(15000).build();
		productRepository.save(product6);
		Product product7 = Product.builder().p_type("필수상품").p_name("02 위생 5~8kg").p_price(20000).build();
		productRepository.save(product7);
		Product product8 = Product.builder().p_type("필수상품").p_name("03 위생 9~12kg").p_price(35000).build();
		productRepository.save(product8);
		Product product9 = Product.builder().p_type("필수상품").p_name("04 위생 13~15kg").p_price(40000).build();
		productRepository.save(product9);
		Product product10 = Product.builder().p_type("필수상품").p_name("01 목욕➕위생 ~4kg").p_price(30000).build();
		productRepository.save(product10);
		Product product11 = Product.builder().p_type("필수상품").p_name("02 목욕➕위생 5~8kg").p_price(45000).build();
		productRepository.save(product11);
		Product product12 = Product.builder().p_type("필수상품").p_name("03 목욕➕위생 9~12kg").p_price(70000).build();
		productRepository.save(product12);
		Product product13 = Product.builder().p_type("필수상품").p_name("04 목욕➕위생 13~15kg").p_price(85000).build();
		productRepository.save(product13);
		Product product14 = Product.builder().p_type("필수상품").p_name("01 클리핑 ~4kg").p_price(20000).build();
		productRepository.save(product14);
		Product product15 = Product.builder().p_type("필수상품").p_name("02 클리핑 5~8kg").p_price(30000).build();
		productRepository.save(product15);
		Product product16 = Product.builder().p_type("필수상품").p_name("03 클리핑 9~12kg").p_price(40000).build();
		productRepository.save(product16);
		Product product17 = Product.builder().p_type("필수상품").p_name("04 클리핑 13~15kg").p_price(50000).build();
		productRepository.save(product17);
		Product product18 = Product.builder().p_type("필수상품").p_name("01 가위컷 ~4kg").p_price(75000).build();
		productRepository.save(product18);
		Product product19 = Product.builder().p_type("필수상품").p_name("02 가위컷 5~8kg").p_price(90000).build();
		productRepository.save(product19);
		Product product20 = Product.builder().p_type("필수상품").p_name("03 가위컷 9~12kg").p_price(110000).build();
		productRepository.save(product20);
		Product product21 = Product.builder().p_type("필수상품").p_name("04 가위컷 13~15kg").p_price(130000).build();
		productRepository.save(product21);
		Product product22 = Product.builder().p_type("필수상품").p_name("01 스포팅 ~4kg").p_price(70000).build();
		productRepository.save(product22);
		Product product23 = Product.builder().p_type("필수상품").p_name("02 스포팅 5~8kg").p_price(80000).build();
		productRepository.save(product23);
		Product product24 = Product.builder().p_type("필수상품").p_name("03 스포팅 9~12kg").p_price(100000).build();
		productRepository.save(product24);
		Product product25 = Product.builder().p_type("필수상품").p_name("04 스포팅 13~15kg").p_price(120000).build();
		productRepository.save(product25);
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

	/*
	 * @Test public void testPaging() { Pageable pageable = PageRequest.of(0, 10);
	 * Page<Product> result = productRepository.findAllOrderByPnumDesc(pageable);
	 * log.info(result.getTotalElements());
	 * result.getContent().stream().forEach(product -> log.info(product)); }
	 */
}
