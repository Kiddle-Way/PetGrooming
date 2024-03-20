package com.petgrooming.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "INQUIRY")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "INQUIRY_SEQ_GEN")
	// 사용할 전략을 시퀀스로 선택, 식별자 생성기를 설정해 놓은 INQUIRY_SEQ_GEN으로 설정
	private Long i_num;
	
	@ManyToOne(optional = false)
    @JoinColumn(name = "m_num", referencedColumnName = "m_num")
    private Member m_num;
	
	private Long i_pw;
	private String i_title;
	private String i_content;
	private boolean i_delFlag;

	@Column(nullable = false, columnDefinition = "VARCHAR2(2000) default '답변 미작성'")
	private String i_a_content;

	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	public void changeDel(boolean delflag) {
		this.i_delFlag = delflag;
	}

	@Column(nullable = false)
	@Builder.Default
	private LocalDateTime i_reg = LocalDateTime.now();

	@ElementCollection
	@Builder.Default
	private List<InquiryImage> imageList = new ArrayList<>();

	@PrePersist
	public void prePersist() {
		this.i_a_content = this.i_a_content == null ? "답변 미작성" : this.i_a_content;
	}

	public void changeI_pw(Long i_pw) {
		this.i_pw = i_pw;
	}

	public void changeI_title(String i_title) {
		this.i_title = i_title;
	}

	public void changeI_content(String i_content) {
		this.i_content = i_content;
	}

	public void changeI_a_content(String i_a_content) {
		this.i_a_content = i_a_content;
	}

	public void addImage(InquiryImage image) {
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		InquiryImage inquiryImage = InquiryImage.builder().fileName(fileName).build();
		addImage(inquiryImage);
	}

	public void clearList() {
		this.imageList.clear();
	}
}
