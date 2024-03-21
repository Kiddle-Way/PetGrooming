package com.petgrooming.repository;

import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
	@EntityGraph(attributePaths = {"imageList", "m_num"})
	@Query("select i from Inquiry i join fetch i.m_num where i.i_num = :i_num")
	Optional<Inquiry> selectOne(@Param("i_num") Long i_num);

	@Modifying
	@Query("update Inquiry i set i.i_delFlag = :flag where i.i_num = :i_num")
	void updateToDelete(@Param("i_num") Long pno, @Param("flag") boolean flag);

	@Query("select i from Inquiry i where i.i_delFlag = false ")
	Page<Inquiry> selectList(Pageable pageable);
}