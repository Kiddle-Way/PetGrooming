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

public interface DesignerRepository extends JpaRepository<Designer, Long>{
	
	
	@EntityGraph(attributePaths = "imageList")
	@Query("select d from Designer d where d.dno = :dno") 
	Optional<Designer> selectOne(@Param("dno") Long dno);
	
	//수정,삭제
	@Modifying
	@Query("update Designer d set d.delFlag = :flag where d.dno = :dno") 
	void updateToDelete(@Param("dno") Long dno, @Param("flag") boolean flag);

	//목록척리
	@Query("select d, di  from Designer d left join d.imageList di  where di.ord = 0 and d.delFlag = false ")
			Page<Object[]> selectList(Pageable pageable);
}
