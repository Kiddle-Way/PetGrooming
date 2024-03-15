package com.petgrooming.repository;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.domain.Guide;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class GuideRepositoryTests {
	@Autowired
	GuideRepository productRepository;

	@Test
	public void testUpdate() {
		Long pno = 10L;
		Guide product = productRepository.selectOne(pno).get();
		product.changeP_i_content("10 번 상품");
		product.changeP_i_attach_size(0L);
// 첨부파일 수정
		product.clearList();
		product.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE1.jpg");
		product.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE2.jpg");
		product.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE3.jpg");
		productRepository.save(product);
	}
}