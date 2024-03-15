package com.petgrooming.repository;

//Test 1. 더미 데이터 추가

//import java.time.LocalDate;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.petgrooming.domain.Reserve;
//import com.petgrooming.domain.ReserveTime;
//
//import lombok.extern.log4j.Log4j2;
//
//@SpringBootTest
//@Log4j2
//public class ReserveRepositoryTests {
//	@Autowired
//	private ReserveRepository reserveRepository;
//
//	@Test
//	public void testInsert() {
//		for (int i = 1; i <= 25; i++) {
//			Reserve reserve = Reserve.builder().d_num(i + 1L).p_num(i + 1L).m_num(i + 1L)
//					.r_date(LocalDate.of(2024, 03, 05)).r_time(ReserveTime.TIME_1).r_total_price(100000L + i)
//					.r_breed("견종" + i).r_dog_name("견명" + i).r_dog_notice("특이사항" + i).build();
//			reserveRepository.save(reserve);
//		}
//	}
//}

//TEST 2.데이터 조회
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.petgrooming.domain.Reserve;
//
//import lombok.extern.log4j.Log4j2;
//
//@SpringBootTest
//@Log4j2
//public class ReserveRepositoryTests {
//	@Autowired
//	private ReserveRepository reserveRepository;
//
//	@Test
//	public void testRead() {
//// 존재하는 번호로 확인
//		Long tno = 20L;
//		java.util.Optional<Reserve> result = reserveRepository.findById(tno);
//		Reserve reserve = result.orElseThrow();
//		log.info(reserve);
//	}
//}

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.domain.Reserve;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReserveRepositoryTests {
	@Autowired
	private ReserveRepository reserveRepository;

	@Test
	public void testModify() {
		Long tno = 20L;

		java.util.Optional<Reserve> result = reserveRepository.findById(tno);

		Reserve reserve = result.orElseThrow();
		reserve.changeDel(true);

		reserveRepository.save(reserve);
	}
}