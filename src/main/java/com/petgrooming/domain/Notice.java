package com.petgrooming.domain;

import java.time.LocalDate;

import java.util.List;
import java.util.ArrayList;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@SequenceGenerator(name = "NOTICE_SEQ_GEN", sequenceName = "NOTICE_SEQ", initialValue = 1, allocationSize = 1)
@Table(name = "notice_tbl")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
	// 공지사항 번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_SEQ_GEN")
	private Long n_num;
	
	// 공지사항 말머리
	@Column(nullable = false, length = 100)
	private String n_head;

	// 공지사항 제목
	@Column(nullable = false, length = 100)
	private String n_title;

	// 공지사항 내용
	@Column(nullable = false, length = 2000)
	private String n_content;

	// 공지사항 작성시간
	@CreationTimestamp
	@Column(nullable = false)
	private LocalDate n_reg;

	// 삭제처리
	private boolean delFlag;

	// 삭제시 값변경
	public void changeDel(boolean delFlag) {
		this.delFlag = delFlag;
	}

	// 이미지 목록
	@ElementCollection
	@Builder.Default
	private List<NoticeImage> imageList = new ArrayList<>();

	// 말머리 수정 메서드
	public void changeHead(String n_head) {
		this.n_head = n_head;
	}
	
	// 제목 수정 메서드
	public void changeTitle(String n_title) {
		this.n_title = n_title;
	}

	// 내용 수정 메서드
	public void changeContent(String n_content) {
		this.n_content = n_content;
	}

	
	public void addImage(NoticeImage image) {
	    // 이미지의 순서를 설정하여 이미지 객체에 할당
	    image.setOrd(this.imageList.size());
	    imageList.add(image);
	}

	// 파일 이름을 받아 새 이미지 객체를 생성하고 이미지 리스트에 추가하는 메서드
	public void addImageString(String fileName) {
	    NoticeImage noticeImage = NoticeImage.builder().fileName(fileName).build();
	    addImage(noticeImage);
	}

	// 이미지 항목 지우는 메서드
	public void clearList() {
		this.imageList.clear();
	}

}
