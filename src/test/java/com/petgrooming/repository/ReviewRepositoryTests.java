package com.petgrooming.repository;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.domain.Review;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReviewRepositoryTests {
	@Autowired
	ReviewRepository reviewRepository;

	@Test
	public void testInsert() {
		for (int i = 0; i < 200; i++) {
			Review review = Review.builder().v_num(i + 1L).m_num(i + 1L).v_title("리뷰제목 " + (i + 1)).v_pw(1000L + i)
					.v_content("리뷰내용" + (i + 1)).build();
			review.addImageString(UUID.randomUUID().toString() + "-" + "IMAGE" + i + ".jpg");
			reviewRepository.save(review);
			log.info("-------------------");
		}
	}
}