package com.petgrooming.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.AvailableTimeslot;

public interface AvailableTimeslotRepository extends JpaRepository<AvailableTimeslot, Long> {
	@Query("SELECT a FROM AvailableTimeslot a WHERE a.a_t_date = :date AND a.isAvailable = true ORDER BY a.a_t_num ASC")
	List<AvailableTimeslot> findAvailableTimeslotsByDate(@Param("date") LocalDate date);

	@Modifying
	@Query("UPDATE AvailableTimeslot a SET a.isAvailable = true WHERE a.a_t_num = :a_t_num")
	void makeAvailableByATNum(@Param("a_t_num") Long a_t_num);

	@Modifying
	@Query("UPDATE AvailableTimeslot a SET a.isAvailable = false WHERE a.a_t_num = :a_t_num")
	void makeUnavailableByATNum(@Param("a_t_num") Long a_t_num);
}