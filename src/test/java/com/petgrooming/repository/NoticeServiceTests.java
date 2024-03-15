package com.petgrooming.repository;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.dto.NoticeDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.service.NoticeService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class NoticeServiceTests {
	@Autowired
	private NoticeService noticeService;

	@Test
	public void testList() {
		Long n_num = 1002L;

		NoticeDTO noticeDTO = noticeService.get(n_num);

		log.info(noticeDTO);
		log.info(noticeDTO.getUploadFileNames());
	}
}
