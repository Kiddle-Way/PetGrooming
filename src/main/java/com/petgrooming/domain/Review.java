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
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REVIEW_SEQ_GEN")
	private Long v_num;
	private Long m_num;
	private Long v_pw;
	private String v_title;
	private String v_content;
	private boolean v_delFlag;

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