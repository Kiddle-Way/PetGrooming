package com.petgrooming.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.annotation.Commit;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReviewRepositoryTests {
	@Autowired
	ReviewRepository reviewRepository;

	@Commit
	@Transactional
	@Test
	public void testDelte() {
		Long v_num = 2L;
		reviewRepository.updateToDelete(v_num, true);
	}
}