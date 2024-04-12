
/*
 * package com.petgrooming.service;
 * 
 * import java.time.LocalDateTime; import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.dto.InquiryDTO; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryServiceTests {
 * 
 * @Autowired private InquiryService inquiryService;
 * 
 * @Test public void testRegister() { LocalDateTime now = LocalDateTime.now();
 * InquiryDTO inquiryDTO =
 * InquiryDTO.builder().i_title("서비스 테스트").i_content("tester").i_reg(now).build(
 * ); Long i_num = inquiryService.register(inquiryDTO); log.info("I_NUM: " +
 * i_num); } }
 */

/*
 * package com.petgrooming.service;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.dto.InquiryDTO; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryServiceTests {
 * 
 * @Autowired private InquiryService inquiryService;
 * 
 * @Test public void testGet() { Long i_num = 102L; InquiryDTO inquiryDTO =
 * inquiryService.get(i_num); log.info(inquiryDTO); } }
 */

/*
 * package com.petgrooming.service;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.dto.InquiryPageRequestDTO; import
 * com.petgrooming.dto.InquiryPageResponseDTO; import
 * com.petgrooming.dto.InquiryDTO; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryServiceTests {
 * 
 * @Autowired
 * 
 * private InquiryService inquiryService;
 * 
 * @Test public void testList() { InquiryPageRequestDTO pageRequestDTO =
 * InquiryPageRequestDTO.builder().page(2).size(10).build();
 * 
 * InquiryPageResponseDTO<InquiryDTO> response =
 * inquiryService.list(pageRequestDTO); log.info(response); } }
 */

package com.petgrooming.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.dto.InquiryPageRequestDTO;
import com.petgrooming.dto.InquiryPageResponseDTO;
import com.petgrooming.dto.InquiryDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest

@Log4j2
public class InquiryServiceTests {

	@Autowired
	private InquiryService inquiryService;

	@Test
	public void testGet() {
		InquiryPageRequestDTO inquiryPageRequestDTO = InquiryPageRequestDTO.builder().build();
		InquiryPageResponseDTO<InquiryDTO> result = inquiryService.getList(inquiryPageRequestDTO);
		result.getDtoList().forEach(dto -> log.info(dto));
	}
}
