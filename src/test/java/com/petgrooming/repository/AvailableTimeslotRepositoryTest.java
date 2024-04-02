package com.petgrooming.repository;

import com.petgrooming.domain.AvailableTimeslot;
import com.petgrooming.domain.Designer;
import com.petgrooming.domain.ReserveTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class AvailableTimeslotRepositoryTest {

	@Autowired
	private AvailableTimeslotRepository availableTimeslotRepository;

	@Autowired
	private DesignerRepository designerRepository;

	@Test
	public void addOneYearOfData1() {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
			Designer designer = designerRepository.findById(1L).orElse(null);
			List<AvailableTimeslot> timeslots = new ArrayList<>();
			while (currentDate.isBefore(endDate)) {
				for (ReserveTime time : ReserveTime.values()) {
					AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
					timeslots.add(timeslot);
				}
				currentDate = currentDate.plusDays(1);
			}
			availableTimeslotRepository.saveAll(timeslots);
		
	}	
	@Test
	public void addOneYearOfData2() {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
			Designer designer = designerRepository.findById(2L).orElse(null);
			List<AvailableTimeslot> timeslots = new ArrayList<>();
			while (currentDate.isBefore(endDate)) {
				for (ReserveTime time : ReserveTime.values()) {
					AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
					timeslots.add(timeslot);
				}
				currentDate = currentDate.plusDays(1);
			}
			availableTimeslotRepository.saveAll(timeslots);
		
	}
	@Test
	public void addOneYearOfData3() {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
			Designer designer = designerRepository.findById(3L).orElse(null);
			List<AvailableTimeslot> timeslots = new ArrayList<>();
			while (currentDate.isBefore(endDate)) {
				for (ReserveTime time : ReserveTime.values()) {
					AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
					timeslots.add(timeslot);
				}
				currentDate = currentDate.plusDays(1);
			}
			availableTimeslotRepository.saveAll(timeslots);
		
	}
	@Test
	public void addOneYearOfData4() {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
			Designer designer = designerRepository.findById(4L).orElse(null);
			List<AvailableTimeslot> timeslots = new ArrayList<>();
			while (currentDate.isBefore(endDate)) {
				for (ReserveTime time : ReserveTime.values()) {
					AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
					timeslots.add(timeslot);
				}
				currentDate = currentDate.plusDays(1);
			}
			availableTimeslotRepository.saveAll(timeslots);
		
	}
	@Test
	public void addOneYearOfData5() {
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = currentDate.plusYears(1);
			Designer designer = designerRepository.findById(5L).orElse(null);
			List<AvailableTimeslot> timeslots = new ArrayList<>();
			while (currentDate.isBefore(endDate)) {
				for (ReserveTime time : ReserveTime.values()) {
					AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true, designer);
					timeslots.add(timeslot);
				}
				currentDate = currentDate.plusDays(1);
			}
			availableTimeslotRepository.saveAll(timeslots);
		
	}
}
