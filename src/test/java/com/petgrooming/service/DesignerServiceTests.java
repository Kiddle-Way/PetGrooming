package com.petgrooming.service;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class DesignerServiceTests {
	@Autowired
	private DesignerService designerService;

//	//조회
//	@Test
//	public void testRead() {
//		// 실제 존재하는 번호로 테스트(DB 에서 확인)
//		Long dno = 9L;
//		DesignerDTO designerDTO = designerService.get(dno);
//		log.info(designerDTO);
//		log.info(designerDTO.getUploadFileNames());
//	}
//}

//	@Test
//	public void testList() {
//		// 1 page, 10 size
//		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().build();
//		PageResponseDTO<DesignerDTO> result = designerService.getList(pageRequestDTO);
//		result.getDtoList().forEach(dto -> log.info(dto));
//
//	}

//	//목록처리 테스트
//	@Test
//	public void testList() {
//		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2).size(10).build();
//
//		PageResponseDTO<DesignerDTO> response = designerService.list(pageRequestDTO);
//		log.info(response);
//
//	}

//	@Test
//	public void testGet() { 
//	Long dno = 101L;
//	DesignerDTO designerDTO = designerService.get(dno); 
//	log.info(designerDTO);
//	}
//	
	@Test
	public void testRegister() {
		DesignerDTO designerDTO = DesignerDTO.builder()
				.dname("groom")
				.dbirth(LocalDate.of(2003, 11, 20))
				.dphone("01012348575")
				.demail("groom@gomm.com")
				.dh_date(LocalDate.of(2024, 11, 20))
				.dstate(0)
				.dintro("짱잘함")
				.dattach("gromm.tex")
				.build();
		
		long dno = designerService.register(designerDTO);
		log.info("DNO: " + dno);
	}
}

	
