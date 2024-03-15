package com.petgrooming.service;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.dto.GuideDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class GuideServiceTests {
	@Autowired
	GuideService guideService;
	@Test
	public void testRead() {
	// 실제 존재하는 번호로 테스트(DB 에서 확인)
	Long pno = 9L;
	GuideDTO guideDTO = guideService.get(pno);
	log.info(guideDTO);
	log.info(guideDTO.getP_i_uploadFileNames());
	}
}