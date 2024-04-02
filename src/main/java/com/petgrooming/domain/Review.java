package com.petgrooming.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "review")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	// 리뷰 번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REVIEW_SEQ_GEN")
	private Long v_num;

	// 회원 번호
	@ManyToOne(optional = false)
	@JoinColumn(name = "m_num", referencedColumnName = "m_num")
	private Member m_num;

	// 리뷰비밀번호
	private Long v_pw;
	// 리뷰 제목
	private String v_title;
	// 리뷰 내용
	private String v_content;
	// 리뷰 삭제
	private boolean v_delFlag;

	// 별점
	private Long v_rating;

	@Column(nullable = false, columnDefinition = "VARCHAR2(2000) default '답변 미작성'")
	private String v_c_content;

	@Column(columnDefinition = "number(1,0) default 0")
	public void changeDel(boolean delFlag) {
		this.v_delFlag = delFlag;
	}

	@Column(nullable = false)
	@Builder.Default
	private LocalDateTime v_date = LocalDateTime.now();

	@ElementCollection
	@Builder.Default
	private List<ReviewImage> imageList = new ArrayList<>();

	@PrePersist
	public void prePersist() {
		this.v_c_content = this.v_c_content == null ? "답변 미작성" : this.v_c_content;
	}

	public void changeV_pw(Long pw) {
		this.v_pw = pw;
	}

	public void changeV_title(String title) {
		this.v_title = title;
	}

	public void changeV_content(String content) {
		this.v_content = content;
	}

	public void changeV_rating(Long v_rating) {
		this.v_rating = v_rating;
	}

	public void changeV_c_content(String v_c_content) {
		this.v_c_content = v_c_content;
	}

	public void addImage(ReviewImage image) {
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		ReviewImage reviewImage = ReviewImage.builder().fileName(fileName).build();
		addImage(reviewImage);
	}

	public void clearList() {
		this.imageList.clear();
	}

}