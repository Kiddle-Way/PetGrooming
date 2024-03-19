package com.petgrooming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.petgrooming.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	@Modifying
	@Query("Update Member m set m.m_num = :state where m.m_num = :m_num")
	void updateToDelete(@Param("m_num") Long m_num, @Param("state") boolean state);

	@EntityGraph(attributePaths = { "memberRoleList" })
	@Query("select m from Member m where m.m_email = :m_email")
	Member getWithRoles(@Param("m_email") String m_email);

	@Query("SELECT m FROM Member m WHERE m.m_email = :m_email AND m.m_pw = :m_pw")
	Optional<Member> login(@Param("m_email") String m_email, @Param("m_pw") String m_pw);
}
