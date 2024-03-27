package com.petgrooming.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Reserve;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {

	// 취소요청 안한리스트
	@Query("select r from Reserve r where r.r_delete_request = false ")
	Page<Reserve> selectList(Pageable pageable);

	// 취소요청 리스트
	@Query("select r from Reserve r where r.r_delete_request = true ")
	Page<Reserve> selectRequestList(Pageable pageable);

	// 취소요청
	@Modifying
	@Query("update Reserve r set r.r_delFlag = :flag where r.r_num = :r_num")
	void updateToDelete(@Param("r_num") Long pno, @Param("flag") boolean flag);

	// 취소승인
	@Modifying
	@Query("update Reserve r set r.r_delete_request = :flag_request where r.r_num = :r_num")
	void updateToDelete_request(@Param("r_num") Long pno, @Param("flag_request") boolean flag_request);
	
	// 내 예약 확인
	@Query("SELECT r FROM Reserve r WHERE r.m_num.m_num = :m_num")
	Page<Reserve> selectReserveByMemberNumber(@Param("m_num") Long m_num, Pageable pageable);

} 