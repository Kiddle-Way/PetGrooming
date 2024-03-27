package com.petgrooming.domain;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class DesignerSpecification {

	public static Specification<Designer> searchByGenderAndState(Gender gender, State state, String keyword) {
		return (root, query, criteriaBuilder) -> {
			Predicate predicate = criteriaBuilder.conjunction();

			if (gender != null) {
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("gender"), gender));
			}

			if (state != null) {
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("state"), state));
			}

			if (keyword != null && !keyword.isEmpty()) {
				String keywordLike = "%" + keyword + "%";
				predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
						criteriaBuilder.like(criteriaBuilder.upper(root.get("dno")), keywordLike.toUpperCase()),
						criteriaBuilder.like(criteriaBuilder.upper(root.get("dname")), keywordLike.toUpperCase())));
			}

			return predicate;
		};
	}

}