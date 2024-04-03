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
import com.petgrooming.domain.Review;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
	// 문의글(하나) 정보 불러오기
	@EntityGraph(attributePaths = { "imageList", "m_num" })
	@Query("select i from Inquiry i join fetch i.m_num where i.i_num = :i_num")
	Optional<Inquiry> selectOne(@Param("i_num") Long i_num);

	// 문의글 상태 전환
	@Modifying
	@Query("update Inquiry i set i.i_delFlag = :flag where i.i_num = :i_num")
	void updateToDelete(@Param("i_num") Long pno, @Param("flag") boolean flag);

	// 문의글 리스트불러오기
	@Query("select i from Inquiry i where i.i_delFlag = false ")
	Page<Inquiry> selectList(Pageable pageable);

	// 문의글 제목 검색
	@Query("SELECT i FROM Inquiry i WHERE i.i_delFlag = false AND i.i_title LIKE %:searchTitle%")
	Page<Inquiry> searchTitleList(Pageable pageable, @Param("searchTitle") String searchTitle);

	// 문의글 내용 검색
	@Query("SELECT i FROM Inquiry i WHERE i.i_delFlag = false AND i.i_content LIKE %:searchContent%")
	Page<Inquiry> searchContentList(Pageable pageable, @Param("searchContent") String searchContent);
}