package com.petgrooming.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
	@EntityGraph(attributePaths = "imageList")
	@Query("select p from Notice p where p.n_num = :n_num")
	Optional<Notice> selectOne(@Param("n_num") Long n_num);

	@Modifying
	@Query("update Notice p set p.delFlag = :flag where p.n_num = :n_num")
	void updateToDelete(@Param("n_num") Long n_num, @Param("flag") boolean flag);

	@Query("SELECT p FROM Notice p WHERE p.delFlag = false")
	Page<Notice> selectList(Pageable pageable);

	@Query("SELECT p FROM Notice p WHERE p.delFlag = false AND p.n_title LIKE %:searchTitle%")
	Page<Notice> searchTitleList(Pageable pageable, @Param("searchTitle") String searchTitle);

	@Query("SELECT p FROM Notice p WHERE p.delFlag = false AND p.n_content LIKE %:searchContent%")
	Page<Notice> searchContentList(Pageable pageable, @Param("searchContent") String searchContent);

	
}
