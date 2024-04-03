package com.petgrooming.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "designer")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Designer {

	// 디자이너 번호
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DESIGNER_SEQ_GEN")
	private Long d_num; // PK

	private String d_name; // 이름
	private LocalDate d_birth; // 생년월일

	@Column(columnDefinition = "number(1,0)")
	private boolean d_gender; // 성별 남자 = 0, 여자 = 1
	private String d_email; // 이메일
	private String d_phone; // 연락처
	private LocalDate d_h_date; // 입사일

	@Column(columnDefinition = "number(1,0) default 0")
	private boolean d_state; // 퇴사상태 근무 = 0, 퇴사 = 1

	private String d_intro; // 소개

	@ElementCollection
	@Builder.Default
	private List<DesignerImage> imageList = new ArrayList<>();

	// 수정가능한 값
	public void changeDname(String d_name) {
		this.d_name = d_name;
	}

	public void changeDbirth(LocalDate d_birth) {
		this.d_birth = d_birth;
	}

	public void changeDgender(boolean d_gender) {
		this.d_gender = d_gender;
	}

	public void changeDemail(String d_email) {
		this.d_email = d_email;
	}

	public void changeDphone(String d_phone) {
		this.d_phone = d_phone;
	}

	public void changeD_h_date(LocalDate d_h_date) {
		this.d_h_date = d_h_date;
	}

	public void changeDstate(boolean d_state) {
		this.d_state = d_state;
	}

	public void changeDintro(String d_intro) {
		this.d_intro = d_intro;
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
