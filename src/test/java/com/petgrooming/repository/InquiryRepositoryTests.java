
/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest;
 * 
 * import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryRepositoryTests {
 * 
 * @Autowired private InquiryRepository inquiryRepository;
 * 
 * @Test public void test1() { log.info("------------------------");
 * log.info(inquiryRepository); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import java.time.LocalDateTime;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.domain.Inquiry;
 * 
 * import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryRepositoryTests {
 * 
 * @Autowired private InquiryRepository inquiryRepository;
 * 
 * @Test public void testInsert() { for (int i = 1; i <= 100; i++) { Inquiry
 * inquiry = Inquiry.builder().i_title("Title..." + i).i_content("content...")
 * .i_reg(LocalDateTime.of(2023, 12, 31, 0, 0)).build();
 * 
 * inquiryRepository.save(inquiry); } } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.domain.Inquiry; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryRepositoryTests {
 * 
 * @Autowired private InquiryRepository inquiryRepository;
 * 
 * @Test public void testRead() { // 존재하는 번호로 확인 Long i_num = 33L;
 * java.util.Optional<Inquiry> result = inquiryRepository.findById(i_num);
 * Inquiry inquiry = result.orElseThrow(); log.info(inquiry); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import java.time.LocalDateTime; import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.domain.Inquiry; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryRepositoryTests {
 * 
 * @Autowired private InquiryRepository inquiryRepository;
 * 
 * @Test public void testModify() { Long i_num = 33L;
 * java.util.Optional<Inquiry> result = inquiryRepository.findById(i_num);
 * Inquiry inquiry = result.orElseThrow(); inquiry.changeI_pw(1234L);
 * inquiry.changeI_title("Modified 33...");
 * inquiry.changeI_content("Modified Content..."); inquiry.changeDel(true);
 * inquiryRepository.save(inquiry); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest;
 * 
 * @SpringBootTest public class InquiryRepositoryTests {
 * 
 * @Autowired private InquiryRepository inquiryRepository;
 * 
 * @Test public void testDelete() { Long i_num = 1L;
 * inquiryRepository.deleteById(i_num); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * org.springframework.transaction.annotation.Transactional; import
 * org.springframework.test.annotation.Commit; import
 * lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class InquiryRepositoryTests {
 * 
 * @Autowired InquiryRepository inquiryRepository;
 * 
 * @Commit
 * 
 * @Transactional
 * 
 * @Test public void testDelte() { Long i_num = 2L;
 * inquiryRepository.updateToDelete(i_num, true); } }
 */