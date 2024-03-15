package com.petgrooming.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ReserveDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReserveServiceTests {
	@Autowired
	private ReserveService reserveService;

	@Test
	public void testGet() {
		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();
		PageResponseDTO<ReserveDTO> result =
		reserveService.getList(pageRequestDTO);
		result.getDtoList().forEach(dto -> log.info(dto));
	}
}