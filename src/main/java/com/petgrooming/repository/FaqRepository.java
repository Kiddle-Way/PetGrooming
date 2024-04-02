package com.petgrooming.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.petgrooming.domain.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {

	@Query("SELECT q from Faq q WHERE q.f_title LIKE %:searchTitle%")
	Page<Faq> searchTitleList(Pageable pageable, @Param("searchTitle") String searchTitle);

	@Query("SELECT q from Faq q WHERE q.f_content LIKE %:searchContent%")
	Page<Faq> searchContentList(Pageable pageable, @Param("searchContent") String searchContent);
}
