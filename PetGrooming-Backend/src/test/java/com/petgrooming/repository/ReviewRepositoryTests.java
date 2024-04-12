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
            Member member = memberRepository.findById(2L)
                    .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

            // 리뷰 생성
            Review review = Review.builder()
                    .m_num(member)
                    .v_title("더미 데이터")
                    .v_pw(1234L) // 임의의 비밀번호 설정
                    .v_rating(4L)
                    .v_content("더미 데이터")
                    .build();

            // 리뷰 저장
            reviewRepository.save(review);
        }
        log.info("200개의 리뷰가 저장되었습니다.");
    }
}