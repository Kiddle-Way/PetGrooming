package com.petgrooming.security;

import java.util.stream.Collectors;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.petgrooming.domain.Member;
import com.petgrooming.dto.MemberDTO;
import com.petgrooming.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

//사용자 인증을 위한 사용자 정보 조회 서비스 클래스입니다.
@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("----------------loadUserByUsername-------------------------");

		Member member = memberRepository.getWithRoles(username);
		if (member == null) {
			throw new UsernameNotFoundException("Not Found");
		}
		MemberDTO memberDTO = new MemberDTO(member.getM_num(), member.getM_name(), member.getM_birth(),
				member.getM_gender(), member.getM_email(), member.getM_pw(), member.getM_phone(), member.getM_addr(),
				member.getDog_breed(), member.getDog_name(), member.getDog_birth(), member.getDog_notice(),
				member.isM_state(), member.isM_agree(),
				member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));
		log.info(memberDTO);
		return memberDTO;
	}
}