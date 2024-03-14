package com.petgrooming.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petgrooming.domain.Qna;

public interface QnaRepository extends JpaRepository<Qna, Long> {

}
