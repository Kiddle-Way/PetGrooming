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

	@Query("SELECT p, pi FROM Notice p LEFT JOIN p.imageList pi ON pi.ord = 0 WHERE p.delFlag = false")
	Page<Object[]> selectList(Pageable pageable);

	@Query("SELECT i FROM Notice i ORDER BY i.n_num DESC")
	Page<Notice> findAllOrderByNnumDesc(Pageable pageable);
}
