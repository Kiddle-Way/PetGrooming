package com.petgrooming.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.petgrooming.domain.Reserve;
import java.util.List;

public interface ReserveRepository extends JpaRepository<Reserve, Long> {

	//  예약 내역 전체리스트
	@Query("select r from Reserve r")
	Page<Reserve> allList(Pageable pageable);

	// 지난 예약 내역 조회
	@Query("SELECT r FROM Reserve r WHERE r.r_date < CURRENT_DATE")
	Page<Reserve> pastList(Pageable pageable);

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

	// 전체 매출
	@Query("select sum(r.r_total_price) from Reserve r ")
	Long getTotalPrice();

	// 연도별 총매출
	@Query("SELECT YEAR(r.r_date), SUM(r.r_total_price) FROM Reserve r GROUP BY YEAR(r.r_date)")
	List<Object[]> getTotalPriceByAllYears();

	// 연도별 월매출
	@Query("SELECT SUM(r.r_total_price) FROM Reserve r WHERE YEAR(r.r_date) = :year AND MONTH(r.r_date) = :month")
	Long getTotalPriceByMonth(@Param("year") int year, @Param("month") int month);

	// 주간매출
	@Query("SELECT SUM(r.r_total_price) FROM Reserve r WHERE YEAR(r.r_date) = :year AND WEEK(r.r_date) = :week")
	Long getTotalPriceByWeek(@Param("year") int year, @Param("week") int week);

	// 총 예약 건수
	@Query("SELECT COUNT(r) FROM Reserve r ")
	Long getTotalCount();

	// 연도별 예약 건수
	@Query("SELECT YEAR(r.r_date), COUNT(*) FROM Reserve r GROUP BY YEAR(r.r_date)")
	List<Object[]> getTotalCountByAllYears();

	// 월별 예약 건수
	@Query("SELECT COUNT(r) FROM Reserve r WHERE YEAR(r.r_date) = :year AND MONTH(r.r_date) = :month")
	Long getTotalCountByMonth(@Param("year") int year, @Param("month") int month);

	// 상품별 예약 건수
	@Query("SELECT " +
			"CASE " +
			"   WHEN r.allProduct LIKE '%목욕%' AND r.allProduct NOT LIKE '%위생%' THEN '목욕' " +
			"   WHEN r.allProduct LIKE '%위생%' AND r.allProduct NOT LIKE '%목욕%' THEN '위생' " +
			"   WHEN r.allProduct LIKE '%목욕➕위생%' THEN '목욕➕위생' " +
			"   WHEN r.allProduct LIKE '%클리핑%' THEN '클리핑' " +
			"   WHEN r.allProduct LIKE '%스포팅%' THEN '스포팅' " +
			"   WHEN r.allProduct LIKE '%가위컷%' THEN '가위컷' " +
			"END AS product_category, " +
			"COUNT(r) AS reservation_count " +
			"FROM Reserve r " +
			"GROUP BY " +
			"CASE " +
			"   WHEN r.allProduct LIKE '%목욕%' AND r.allProduct NOT LIKE '%위생%' THEN '목욕' " +
			"   WHEN r.allProduct LIKE '%위생%' AND r.allProduct NOT LIKE '%목욕%' THEN '위생' " +
			"   WHEN r.allProduct LIKE '%목욕➕위생%' THEN '목욕➕위생' " +
			"   WHEN r.allProduct LIKE '%클리핑%' THEN '클리핑' " +
			"   WHEN r.allProduct LIKE '%스포팅%' THEN '스포팅' " +
			"   WHEN r.allProduct LIKE '%가위컷%' THEN '가위컷' " +
			"END " +
			"ORDER BY reservation_count DESC")
	List<Object[]> countReserveByProduct();

	// 견종별 예약 건수
	@Query("SELECT r.r_breed, COUNT(r) FROM Reserve r GROUP BY r.r_breed")
	List<Object[]> countReserveByBreed();
}