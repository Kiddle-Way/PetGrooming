package com.petgrooming.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.Gender;
import com.petgrooming.domain.Review;
import com.petgrooming.domain.State;

public interface DesignerRepository extends JpaRepository<Designer, Long> {

	@EntityGraph(attributePaths = "imageList")
	@Query("SELECT d FROM Designer d WHERE d.dno = :dno")
	Optional<Designer> selectOne(@Param("dno") Long dno);

	// 수정,삭제
	@Modifying
	@Query("UPDATE Designer d set d.delFlag = :flag WHERE d.dno = :dno")
	void updateToDelete(@Param("dno") Long dno, @Param("flag") boolean flag);

	@Query("SELECT d FROM Designer d WHERE d.delFlag = false")
	Page<Designer> selectList(Pageable pageable);

	// 성별에 따른 디자이너 목록 조회 쿼리 메서드 추가
	@Query("SELECT d FROM Designer d WHERE d.dgender =:dgender")
	Page<Designer> findByDgendersOrderByDnoDesc(int dgender, Pageable pageable);

	// 근무 상태에 따른 디자이너 목록 조회 쿼리 메서드 추가
	@Query("SELECT d FROM Designer d WHERE d.dstate = :dstate")
	Page<Designer> findByDstateOrderByDnoDesc(int dstate, Pageable pageable);

	// 검색 기능 - 성별, 근무 상태, 키워드를 고려하여 검색하는 쿼리 메서드
	@Query("SELECT d FROM Designer d " + "WHERE (:gender IS NULL OR d.dgender = :gender) "
			+ "AND (:state IS NULL OR d.dstate = :state) "
			+ "AND (:keyword IS NULL OR d.dname LIKE CONCAT('%', :keyword, '%'))")
	Page<Designer> findByGenderAndStateAndDname(@Param("gender") Gender gender, @Param("state") State state,
			@Param("keyword") String keyword, Pageable pageable);

	// 퇴사 또는 복직 처리
	@Modifying
	@Query("UPDATE Designer d SET d.dstate = :state WHERE d.dno = :dno")
	void updateState(@Param("dno") Long dno, @Param("state") Long state);

	// 선명
	@Query("SELECT d FROM Designer d WHERE (:keyword IS NULL OR d.dname LIKE %:keyword%) AND (:state IS NULL OR d.dstate = :state) AND (:gender IS NULL OR d.dgender = :gender)")
	Page<Designer> search(@Param("keyword") String keyword, @Param("state") Long state,
			@Param("gender") Long gender, Pageable pageable);
}
