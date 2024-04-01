package com.petgrooming.repository;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.petgrooming.domain.Designer;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;

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

	//검색
	 @Query("SELECT d FROM Designer d WHERE (:keyword IS NULL OR d.dname LIKE %:keyword%) AND (:state IS NULL OR d.dstate = :state) AND (:gender IS NULL OR d.dgender = :gender)")
	   Page<Designer> search(@Param("keyword") String keyword, @Param("state") Long state,
	         @Param("gender") Long gender, Pageable pageable);
	
	

	// 퇴사 또는 복직 처리
	@Transactional
	@Modifying
	@Query("UPDATE Designer d SET d.dstate = :state WHERE d.dno = :dno")
	void updateState(@Param("dno") Long dno, @Param("state") Long dstate);

//	 
//	//executeQuery
//		PageResponseDTO<DesignerDTO> executeQuery(String query, Map<String, Object> params, PageRequestDTO pageRequestDTO);

}
