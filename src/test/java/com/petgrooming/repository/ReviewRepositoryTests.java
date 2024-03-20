package com.petgrooming.repository;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.petgrooming.domain.Member;
import com.petgrooming.domain.Review;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ReviewRepositoryTests {
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void testInsert() {
        for (int i = 0; i < 200; i++) {
            // 회원 조회
            Member member = memberRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

            // 리뷰 생성
            Review review = Review.builder()
                    .v_num((long) (i + 1)) // 각 리뷰마다 고유한 번호를 부여
                    .m_num(member)
                    .v_title("리뷰 제목 " + i)
                    .v_pw(1234L) // 임의의 비밀번호 설정
                    .v_content("리뷰 내용 " + i)
                    .build();

            // 리뷰 저장
            reviewRepository.save(review);
        }
        log.info("200개의 리뷰가 저장되었습니다.");
    }
}