package com.petgrooming.repository;

import java.util.Arrays;

import java.time.LocalDate;
import java.util.Date;

import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
//import org.springframework.test.annotation.Commit;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.petgrooming.domain.Designer;

import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.service.DesignerService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class DesignerRepositoryTests {

	@Autowired
	
	private DesignerService designerService;

	@Test
	public void testRegister() {
		DesignerDTO designerDTO = DesignerDTO.builder().dname("디자이").dgender(0).dbirth(LocalDate.of(1996,1,26))
				.dphone("010-2546-4512").demail("de@gab.nam").dh_date(LocalDate.of(2024,1,26)).dstate(0).dintro("디자이 잘해")
				.dattach("디자이.jpg").build();

		designerDTO.setUploadFileNames(

				java.util.List.of(UUID.randomUUID() + "_" + "Test1.jpg", UUID.randomUUID() + "_" + "Test2.jpg"));

		designerService.register(designerDTO);
	}

}

//	//이미지 포함된 목록
//	@Test
//	public void testList() {
//	// org.springframework.data.domain 패키지
//	Pageable pageable = PageRequest.of(0, 10, Sort.by("dno").descending()); 
//	Page<Object[]> result = designerRepository.selectList(pageable);
//	// java.util
//	result.getContent().forEach(arr -> log.info(Arrays.toString(arr))); 
//	}
//	

//	//이미지 수정
//	@Test
//	public void testUpdate() {
//		Long dno = 10L;
//		Designer designer = designerRepository.selectOne(dno).get();
//		designer.changeDname("구르밍 i");
//		designer.changeDattach("파일i");
//		designer.changeDemail("test i@naem.net");
//		designer.changeDphone("010-5124-154");
//		designer.changeDintro("소개ii");
//
//		// 첨부파일 수정
//		designer.clearList();
//		designer.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE1.jpg");
//		designer.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE2.jpg");
//		designer.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE3.jpg");
//		designer.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE2.jpg");
//		designer.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE3.jpg");
//		
//		designerRepository.save(designer);
//	}

//	@Commit
//	@Transactional 
//	@Test
//	public void testDelte() { 
//	Long dno = 2L;
//	designerRepository.updateToDelete(dno, true); 
//	}

//	@Test
//	public void testRead2() {
//		Long dno = 1L;
//		Optional<Designer> result = designerRepository.selectOne(dno);
//		Designer designer = result.orElseThrow();
//		log.info(designer);
//		log.info(designer.getImageList());
//	}

////디자이너 조회테스트
//	@Transactional
//	@Test
//	public void testRead() {
//		Long dno = 1L;
//		Optional<Designer> result = designerRepository.findById(dno);
//		Designer designer = result.orElseThrow();
//		log.info(designer); // --------- 1
//		log.info(designer.getImageList()); // ---------------------2
//	}

//	//디자이너 등록테스트
//	@Test
//	public void testInsert() {
//		for (int i = 0; i < 10; i++) {
//			Designer designer = Designer.builder().dname("구르밍" + i).dattach("파일" + i).demail("test" + i + "naem.net").dphone("010-5124-154" + i).dintro("소개" + i).build();
//			// 2 개의 이미지 파일 추가
//			designer.addImageString(UUID.randomUUID().toString() + "-" + "mini.jpg");
//			designer.addImageString(UUID.randomUUID().toString() + "-" + "bob_3.jpg");
//			designerRepository.save(designer);
//			log.info("-------------------");
//		}
//	}

//	@Test
//	//페이징
//		public void testPaging() {
//			Pageable pageable = PageRequest.of(0, 10, Sort.by("dno").descending());
//			Page<Designer> result = designerRepository.findAll(pageable);
//			log.info(result.getTotalElements());
//			result.getContent().stream().forEach(designer -> log.info(designer));
//		