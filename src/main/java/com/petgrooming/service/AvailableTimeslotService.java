package com.petgrooming.service;

import java.time.LocalDate;
import java.util.List;

import com.petgrooming.domain.Designer;
import com.petgrooming.dto.AvailableTimeslotDTO;

public interface AvailableTimeslotService {
	//예약 가능 출력
	List<AvailableTimeslotDTO> listAvailableTime(LocalDate date, Designer d_num);
	
	 // 타임슬롯을 예약 취소후 available 상태를 true로 수정
    void makeAvailable(Long a_t_num);
    
    // 타임슬롯을 예약 후 available 상태를 false로 수정
    void makeUnavailable(Long a_t_num);
}
