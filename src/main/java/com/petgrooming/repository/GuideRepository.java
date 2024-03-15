package com.petgrooming.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Guide;

public interface GuideRepository extends JpaRepository<Guide, Long> {
	@EntityGraph(attributePaths = "imageList")
	@Query("select g from Guide g where g.p_i_num = :p_i_num")
	Optional<Guide> selectOne(@Param("p_i_num") Long p_i_num);
	
	@Query("select g, gi from Guide g left join g.imageList gi where gi.ord = 0")
	Page<Object[]> selectList(Pageable pageable);
}