package com.petgrooming.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "guide")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Guide {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GUIDE_SEQ_GEN")
	private Long p_i_num;
	private String p_i_content;
	@Column(nullable = false, columnDefinition = "number(1,0) default 0")
	private Long p_i_attach_size;
	
	@ElementCollection
	@Builder.Default
	private List<GuideImage> imageList = new ArrayList<>();

	public void changeP_i_content(String content) {
		this.p_i_content = content;
	}
	
	public void changeP_i_attach_size(Long attach_size) {
		this.p_i_attach_size = attach_size;
	}

	public void addImage(GuideImage image) {
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		GuideImage productImage = GuideImage.builder().fileName(fileName).build();
		addImage(productImage);
	}

	public void clearList() {
		this.imageList.clear();
	}
}