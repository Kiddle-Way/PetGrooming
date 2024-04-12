package com.petgrooming.repository;

import java.util.Optional;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.domain.Notice;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class NoticeRepositoryTests {
	@Autowired
	private NoticeRepository noticeRepository;

	@Commit
	@Transactional
	@Test
	public void testRead() {
		Long n_num = 53L;
		noticeRepository.updateToDelete(n_num, true);
	}
}