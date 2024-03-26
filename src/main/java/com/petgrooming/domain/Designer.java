package com.petgrooming.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@SequenceGenerator(name = "DESIGNER_SEQ_GEN", sequenceName = "DESIGNER_SEQ", initialValue = 1, allocationSize = 1)
@Table(name = "tbl_design")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Designer {

	//
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DESIGNER_SEQ_GEN")
	private Long dno; // PK

	private String dname; // 이름
	private LocalDate dbirth; // 생년월일
	private int dgender; // 성별 남자 = 0, 여자 = 1
	private String demail; // 이메일
	private String dphone; // 연락처
	private LocalDate dh_date; // 입사일
	private int dstate; // 퇴사상태 퇴사 = 1, 근무 = 0 / 기본값 0
	private String dintro; // 소개
	private String dattach; // 첨부파일명
	
	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	private boolean delFlag;

	public void changeDel(boolean delFlag) {
		this.delFlag = delFlag;
	}

	// Image의 목록을 가지고 관리하는 기능 작성
	@ElementCollection
	@Builder.Default
	private List<DesignerImage> imageList = new ArrayList<>();

	// 수정가능한 값
	public void changeDname(String dname) {
		this.dname = dname;
	}

	public void changeDbirth(LocalDate dbirth) {
		this.dbirth = dbirth;
	}

	public void changeDgender(int dgender) {
		this.dgender = dgender;
	}

	public void changeDemail(String demail) {
		this.demail = demail;
	}

	public void changeDphone(String dphone) {
		this.dphone = dphone;
	}

	public void changeDh_date(LocalDate dh_date) {
		this.dh_date = dh_date;
	}

	public void changeDstate(int dstate) {
		this.dstate = dstate;
	}

	public void changeDintro(String dintro) {
		this.dintro = dintro;
	}

	public void changeDattach(String dattach) {
		this.dattach = dattach;
	}

	public void addImage(DesignerImage image) {
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		DesignerImage designerImage = DesignerImage.builder().fileName(fileName).build();
		addImage(designerImage);
	}

	public void clearList() {
		this.imageList.clear();
	}
}
