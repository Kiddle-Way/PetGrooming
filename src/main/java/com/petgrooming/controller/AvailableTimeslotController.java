package com.petgrooming.controller;

import com.petgrooming.dto.AvailableTimeslotDTO;
import com.petgrooming.service.AvailableTimeslotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/availabletime")
public class AvailableTimeslotController {

	private final AvailableTimeslotService availableTimeslotService;

	// ex)http://localhost:8080/api/availabletime/list?date=2024-03-19
	@GetMapping("/list")
	public List<AvailableTimeslotDTO> listAvailableTime(@RequestParam("date") String dateString) {
		LocalDate date = LocalDate.parse(dateString);
		return availableTimeslotService.listAvailableTime(date);
	}

	// 타임슬롯을 예약 가능하게 만드는 엔드포인트
	@GetMapping("/makeAvailable")
	public void makeAvailable(@RequestParam("a_t_num") Long a_t_num) {
		availableTimeslotService.makeAvailable(a_t_num);
	}
	
	// 타임슬롯을 예약 불가능하게 만드는 엔드포인트
	//ex)http://localhost:8080/api/availabletime/makeUnavailable?a_t_num=1080
	@GetMapping("/makeUnavailable")
	public void makeUnavailable(@RequestParam("a_t_num") Long a_t_num) {
		availableTimeslotService.makeUnavailable(a_t_num);
	}
}

