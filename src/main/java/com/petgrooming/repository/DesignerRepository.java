package com.petgrooming.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Designer;

public interface DesignerRepository extends JpaRepository<Designer, Long> {
	// 디자이너 검색
	@Query("SELECT d FROM Designer d WHERE (:keyword IS NULL OR d.d_name LIKE %:keyword%) AND (:state IS NULL OR d.d_state = :state) AND (:gender IS NULL OR d.d_gender = :gender)")
	Page<Designer> search(@Param("keyword") String keyword, @Param("state") Boolean state,
			@Param("gender") Boolean gender, Pageable pageable);

	// 디자이너 정보(한명) 불러오기
	@EntityGraph(attributePaths = "imageList")
	@Query("select d from Designer d where d.d_num = :d_num")
	Optional<Designer> selectOne(@Param("d_num") Long d_num);

	// 디자이너 상태 변환
	@Modifying
	@Query("update Designer d set d.d_state = :d_state where d.d_num = :d_num")
	void updateToState(@Param("d_num") Long d_num, @Param("d_state") Boolean d_state);

	// 디자이너 리스트 불러오기
	@EntityGraph(attributePaths = "imageList")
	@Query("SELECT d FROM Designer d")
	Page<Designer> selectList(Pageable pageable);
}
