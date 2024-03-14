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
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTICE_SEQ_GEN")
	private Long n_num;
	
	@Column(nullable = false, length = 100)
	private String n_head;

	@Column(nullable = false, length = 100)
	private String n_title;

	@Column(nullable = false, length = 2000)
	private String n_content;

	@CreationTimestamp
	@Column(nullable = false)
	private LocalDate n_reg;

	private boolean delFlag;

	public void changeDel(boolean delFlag) {
		this.delFlag = delFlag;
	}

	@ElementCollection
	@Builder.Default
	private List<NoticeImage> imageList = new ArrayList<>();

	public void changeHead(String n_head) {
		this.n_head = n_head;
	}
	
	public void changeTitle(String n_title) {
		this.n_title = n_title;
	}

	public void changeContent(String n_content) {
		this.n_content = n_content;
	}

	public void addImage(NoticeImage image) {
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		NoticeImage noticeImage = NoticeImage.builder().fileName(fileName).build();
		addImage(noticeImage);
	}

	public void clearList() {
		this.imageList.clear();
	}

}
