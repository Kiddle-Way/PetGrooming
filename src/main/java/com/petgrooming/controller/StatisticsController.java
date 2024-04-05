package com.petgrooming.controller;

import com.petgrooming.dto.ReserveDTO;
import com.petgrooming.service.ReserveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.YearMonth;
import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class StatisticsController {

	private final ReserveService reserveService;

	// 전체 매출
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/totalSales")
	public ResponseEntity<Long> getTotalSales() {
		Long totalSales = reserveService.getTotalPrice();
		return ResponseEntity.ok(totalSales);
	}

	// 연도별 총매출
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/yearSales")
	public ResponseEntity<List<Object[]>> getTotalPriceByAllYears() {
		List<Object[]> totalPriceByAllYears = reserveService.getTotalPriceByAllYears();
		return ResponseEntity.ok(totalPriceByAllYears);
	}

	// 연도별 월매출
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/monthlySales")
	public ResponseEntity<Long> getDailySales(@RequestParam("year") int year, @RequestParam("month") int month) {
		// YearMonth 객체를 생성하여 해당 월의 매출을 가져옵니다.
		YearMonth yearMonth = YearMonth.of(year, month);
		Long dailySales = reserveService.getTotalPriceByMonth(year, month);
		return ResponseEntity.ok(dailySales);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	// 주간매출
	@GetMapping("/weeklySales")
	public ResponseEntity<Long> getWeeklySales(@RequestParam("year") int year, @RequestParam("week") int week) {
		Long weeklySales = reserveService.getTotalPriceByWeek(year, week);
		return ResponseEntity.ok(weeklySales);
	}

	// 총 예약 건수
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/totalReserve")
	public ResponseEntity<Long> getTotalReserve() {
		Long totalReserve = reserveService.getTotalCount();
		return ResponseEntity.ok(totalReserve);
	}

	// 연도별 예약 건수
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/yearReserve")
	public ResponseEntity<List<Object[]>> getTotalCountByAllYears() {
		List<Object[]> totalCountByAllYears = reserveService.getTotalCountByAllYears();
		return ResponseEntity.ok(totalCountByAllYears);
	}

	// 월별 예약 건수
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/monthlyReserve")
	public ResponseEntity<Long> getMonthlyReserve(@RequestParam("year") int year, @RequestParam("month") int month) {
		Long monthlyReserve = reserveService.getTotalCountByMonth(year, month);
		return ResponseEntity.ok(monthlyReserve);
	}

	// 상품별 예약 건수
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/reserveProduct")
	public List<Object[]> countReserveByProduct() {
		return reserveService.countReserveByProduct();
	}

	// 견종별 예약 건수
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping("/reserveBreed")
	public List<Object[]> countReserveByBreed() {
		return reserveService.countReserveByBreed();
	}
}