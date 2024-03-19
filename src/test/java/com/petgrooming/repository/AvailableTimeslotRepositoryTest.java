package com.petgrooming.repository;

import com.petgrooming.domain.AvailableTimeslot;
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

    @Test
    public void addOneYearOfData() {
        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = currentDate.plusYears(1);

        List<AvailableTimeslot> timeslots = new ArrayList<>();
        while (currentDate.isBefore(endDate)) {
            for (ReserveTime time : ReserveTime.values()) {
                AvailableTimeslot timeslot = new AvailableTimeslot(null, currentDate, time, true);
                timeslots.add(timeslot);
            }
            currentDate = currentDate.plusDays(1);
        }

        availableTimeslotRepository.saveAll(timeslots);
    }
}
