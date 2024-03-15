
/*
 * package com.petgrooming.repository;
 * 
 * import com.petgrooming.domain.Member;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.junit.jupiter.api.extension.ExtendWith; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * org.springframework.test.context.junit.jupiter.SpringExtension;
 * 
 * import java.util.Date;
 * 
 * import static org.junit.jupiter.api.Assertions.assertNotNull;
 * 
 * @SpringBootTest public class MemberRepositoryTests {
 * 
 * @Autowired private MemberRepository memberRepository;
 * 
 * @Test public void testinsert() { Member member =
 * Member.builder().m_name("john").m_birth(new Date()).m_gender(0)
 * .m_email("john@petgrooming.com").m_pw("john1234").m_phone("01012345678").
 * m_addr("usa")
 * .dog_breed("Labrador Retriever").dog_name("biki").dog_birth(null).dog_notice(
 * null).m_state(false) .m_agree(false).build();
 * 
 * memberRepository.save(member);
 * 
 * } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.domain.Member; import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class MemberRepositoryTests {
 * 
 * @Autowired private MemberRepository memberRepository;
 * 
 * @Test public void testRead() { // 존재하는 번호로 확인 Long m_num = 1L;
 * java.util.Optional<Member> result = memberRepository.findById(m_num); Member
 * member = result.orElseThrow(); log.info(member); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import java.util.Date;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * com.petgrooming.domain.Member; import com.petgrooming.domain.Member.Gender;
 * import lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class MemberRepositoryTests {
 * 
 * @Autowired private MemberRepository memberRepository;
 * 
 * @Test public void testModify() { Long m_num = 1L; java.util.Optional<Member>
 * result = memberRepository.findById(m_num); Member member =
 * result.orElseThrow(); member.setM_name("hong"); member.setM_birth(new
 * Date()); member.setM_gender(1); member.setM_pw("hong1234");
 * member.setM_phone("01087654321"); member.setM_addr("서울특별시 금천구");
 * member.setDog_breed(null); member.setDog_birth(new Date());
 * member.setDog_notice(null); member.setM_state(false);
 * member.setM_agree(true);
 * 
 * memberRepository.save(member); } }
 */

/*
 * package com.petgrooming.repository;
 * 
 * import org.junit.jupiter.api.Test; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.boot.test.context.SpringBootTest; import
 * org.springframework.transaction.annotation.Transactional; import
 * org.springframework.test.annotation.Commit; import
 * lombok.extern.log4j.Log4j2;
 * 
 * @SpringBootTest
 * 
 * @Log4j2 public class MemberRepositoryTests {
 * 
 * @Autowired MemberRepository memberRepository;
 * 
 * @Commit
 * 
 * @Transactional
 * 
 * @Test public void testDelte() { Long i_num = 1L;
 * memberRepository.updateToDelete(i_num, true); } }
 */

package com.petgrooming.repository;

import lombok.extern.log4j.Log4j2;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.petgrooming.domain.Member;
import com.petgrooming.domain.MemberRole;
import com.petgrooming.repository.MemberRepository;

@SpringBootTest

@Log4j2
public class MemberRepositoryTests {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	public void testInsertMemberWithRole() {
		Member newMember = Member.builder().m_email("new_member@example.com").m_name("New Member").m_birth(new Date())
				.m_gender(1).m_pw(passwordEncoder.encode("password")).m_phone("123-456-7890").m_addr("New Address")
				.dog_name("Dog Name").dog_breed("Dog Breed").dog_birth(new Date()).dog_notice("Dog Notice")
				.m_state(true).m_agree(true).build();

		MemberRole userRole = MemberRole.USER;
		newMember.addRole(userRole);
		Member savedMember = memberRepository.save(newMember);
		log.info("-----------------");
		log.info("Inserted Member: " + savedMember);
	}
}
