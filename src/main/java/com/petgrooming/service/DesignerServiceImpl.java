package com.petgrooming.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.petgrooming.domain.Designer;
import com.petgrooming.domain.DesignerImage;
import com.petgrooming.dto.DesignerDTO;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.repository.DesignerRepository;
import com.petgrooming.domain.Gender;
import com.petgrooming.domain.State;
import com.petgrooming.domain.DesignerSpecification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // 생성자자동주입
public class DesignerServiceImpl implements DesignerService {

	private final DesignerRepository designerRepository;

	//리스트
	@Override
    public PageResponseDTO<DesignerDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());
        Page<Designer> result = designerRepository.selectList(pageable);
        return convertToPageResponseDTO(result, pageRequestDTO);
    }
	
	
	

//    @Override
//    public PageResponseDTO<DesignerDTO> search(Specification<Designer> spec, String keyword, PageRequestDTO pageRequestDTO) {
//        log.info("search list............." + pageRequestDTO);
//
//        // Combine the specification with keyword search
//        Specification<Designer> combinedSpec = Specification.where(spec);
//        if (keyword != null && !keyword.isEmpty()) {
//            combinedSpec = combinedSpec.and((root, query, criteriaBuilder) ->
//                    criteriaBuilder.or(
//                            criteriaBuilder.like(criteriaBuilder.upper(root.get("dno")), "%" + keyword.toUpperCase() + "%"),
//                            criteriaBuilder.like(criteriaBuilder.upper(root.get("dname")), "%" + keyword.toUpperCase() + "%")
//                    ));
//        }
//
//        // Perform search using the combined specification
//        Page<Designer> page = designerRepository.findAll(combinedSpec, PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize()));
//
//        // Convert the result to DTO
//        List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
//            // Map Designer entity to DesignerDTO
//            // Example:
//            DesignerDTO designerDTO = new DesignerDTO();
//            designerDTO.setDno(designer.getDno());
//            designerDTO.setDname(designer.getDname());
//            // Set other properties
//            return designerDTO;
//        }).collect(Collectors.toList());
//
//        // Build and return the PageResponseDTO
//        return PageResponseDTO.<DesignerDTO>builder()
//                .dtoList(dtoList)
//                .pageRequestDTO(pageRequestDTO)
//                .totalCount(page.getTotalElements())
//                .build();
//    }

	
	//검색
	@Override
	public PageResponseDTO<DesignerDTO> search(Gender gender, State state, String keyword, PageRequestDTO pageRequestDTO) {
	    Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());
	    Page<Designer> page;

	    if (gender != null && state != null) {
	        page = designerRepository.findByGenderAndStateAndDname(gender, state, keyword, pageable);
	    } else {
	        page = designerRepository.findByGenderAndStateAndDname(null, null, keyword, pageable);
	    }

	    List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
            DesignerDTO designerDTO = DesignerDTO.builder()
                    .dno(designer.getDno())
                    .dname(designer.getDname())
                    .dbirth(designer.getDbirth())
                    .dgender(designer.getDgender())
                    .dphone(designer.getDphone())
                    .demail(designer.getDemail())
                    .dh_date(designer.getDh_date())
                    .dstate(designer.getDstate())
                    .build();
            return designerDTO;
        }).collect(Collectors.toList());

	    PageResponseDTO<DesignerDTO> pageResponseDTO = PageResponseDTO.<DesignerDTO>builder()
	            .dtoList(dtoList)
	            .pageRequestDTO(pageRequestDTO)
	            .totalCount(page.getTotalElements())
	            .build();

	    return pageResponseDTO;
	}

	

	//성별셀렉박스리스트
    @Override
    public PageResponseDTO<DesignerDTO> getSearchGenderList(int searchGender, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());
        Page<Designer> result = designerRepository.findByDgendersOrderByDnoDesc(searchGender, pageable);
        return convertToPageResponseDTO(result, pageRequestDTO);
    }

    
    //근무형태셀렉박스리스트
    @Override
    public PageResponseDTO<DesignerDTO> getSearchStateList(int searchState, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());
        Page<Designer> result = designerRepository.findByDstateOrderByDnoDesc(searchState, pageable);
        return convertToPageResponseDTO(result, pageRequestDTO);
    }

   //검색리스트
//   @Override
//   public PageResponseDTO<DesignerDTO> search(Gender gender, State state, String keyword, PageRequestDTO pageRequestDTO) {
//       Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("dno").descending());
//       Page<Designer> result = designerRepository.(gender, state, keyword, pageable);
//       return convertToPageResponseDTO(result, pageRequestDTO);
//
//}
    


    // 중복 코드를 줄이고 각 메서드에서 페이지 응답을 변환
    public PageResponseDTO<DesignerDTO> convertToPageResponseDTO(Page<Designer> page, PageRequestDTO pageRequestDTO) {
        List<DesignerDTO> dtoList = page.getContent().stream().map(designer -> {
            DesignerDTO designerDTO = DesignerDTO.builder()
                    .dno(designer.getDno())
                    .dname(designer.getDname())
                    .dbirth(designer.getDbirth())
                    .dgender(designer.getDgender())
                    .dphone(designer.getDphone())
                    .demail(designer.getDemail())
                    .dh_date(designer.getDh_date())
                    .dstate(designer.getDstate())
                    .build();
            return designerDTO;
        }).collect(Collectors.toList());

        long totalCount = page.getTotalElements();

        return PageResponseDTO.<DesignerDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }
 // 복직 메서드
    @Override
    public void rehireDesigner(Long dno) {
        try {
            Optional<Designer> result = designerRepository.findById(dno);
            Designer designer = result.orElseThrow(() -> new NoSuchElementException("디자이너를 찾을 수 없습니다. ID: " + dno));

            // 복직 처리 등 원하는 동작 수행
            //designer.setState(State.근무); // 복직 상태로 변경

            designerRepository.save(designer); // 변경 사항 저장
        } catch (NoSuchElementException e) {
            // 디자이너를 찾을 수 없는 경우 처리
            System.err.println("디자이너를 찾을 수 없습니다. ID: " + dno);
            e.printStackTrace();
        } catch (Exception e) {
            // 그 외 예외 처리
            System.err.println("오류가 발생했습니다.");
            e.printStackTrace();
        }
    }

    // 퇴직 메서드
    @Override
    public void fireDesigner(Long dno) {
        try {
            Optional<Designer> result = designerRepository.findById(dno);
            Designer designer = result.orElseThrow(() -> new NoSuchElementException("디자이너를 찾을 수 없습니다. ID: " + dno));

            // 퇴사 처리 등 원하는 동작 수행
            //designer.setState(State.퇴사); // 퇴사 상태로 변경

            designerRepository.save(designer); // 변경 사항 저장
        } catch (NoSuchElementException e) {
            // 디자이너를 찾을 수 없는 경우 처리
            System.err.println("디자이너를 찾을 수 없습니다. ID: " + dno);
            e.printStackTrace();
        } catch (Exception e) {
            // 그 외 예외 처리
            System.err.println("오류가 발생했습니다.");
            e.printStackTrace();
        }
    }
    
    
    
 // 복직, 퇴직
// 	@Override
// 	public void rehireDesigner(DesignerDTO designerDTO) {
// 	    try {
// 	        Optional<Designer> result = designerRepository.findById(designerDTO.getDno());
// 	        Designer designer = result.orElseThrow(() -> new NoSuchElementException("디자이너를 찾을 수 없습니다. ID: " + designerDTO.getDno()));
//
// 	        designer.changeDstate(designerDTO.getDstate());
//
// 	        // upload File -- clear first
// 	        designer.clearList();
//
// 	        List<String> uploadFileNames = designerDTO.getUploadFileNames();
//
// 	        if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
// 	            uploadFileNames.forEach(uploadName -> {
// 	                designer.addImageString(uploadName);
// 	            });
// 	        }
//
// 	        designerRepository.save(designer);
// 	    } catch (NoSuchElementException e) {
// 	        // 디자이너를 찾을 수 없는 경우 처리
// 	        System.err.println("디자이너를 찾을 수 없습니다. ID: " + designerDTO.getDno());
// 	        e.printStackTrace();
// 	    } catch (Exception e) {
// 	        // 그 외 예외 처리
// 	        System.err.println("오류가 발생했습니다.");
// 	        e.printStackTrace();
// 	    }
// 	}
    
//    //복직
//    public void rehireDesigner (DesignerDTO designerDTO){
//		Optional<Designer> result = designerRepository.findById(designerDTO.getDno());
//		designerRepository.save(designer);
//		}
//
//    //퇴사
//    public void fireDesigner(DesignerDTO designerDTO);{
//		Optional<Designer> result = designerRepository.findById(designerDTO.getDno());
//		designerRepository.save(designer);
//		}
	
	

	@Override
	public Long register(DesignerDTO designerDTO) {
		Designer designer = dtoToEntity(designerDTO);
		Designer result = designerRepository.save(designer);
		return result.getDno();
	}

	private Designer dtoToEntity(DesignerDTO designerDTO) {
		Designer designer = Designer.builder().dno(designerDTO.getDno()).dname(designerDTO.getDname())
				.dbirth(designerDTO.getDbirth()).dgender(designerDTO.getDgender()).dphone(designerDTO.getDphone())
				.demail(designerDTO.getDemail()).dh_date(designerDTO.getDh_date()).dstate(designerDTO.getDstate())
				.dintro(designerDTO.getDintro()).dattach(designerDTO.getDattach()).build();

		// 업로드처리가 끝난 파일들의 이름 리스트
		List<String> uploadFileNames = designerDTO.getUploadFileNames();
		if (uploadFileNames == null) {
			return designer;
		}

		uploadFileNames.stream().forEach(uploadName -> {
			designer.addImageString(uploadName);
		});
		return designer;
	}

	@Override
	public DesignerDTO get(Long dno) {
		java.util.Optional<Designer> result = designerRepository.selectOne(dno);
		Designer designer = result.orElseThrow();
		DesignerDTO designerDTO = entityToDTO(designer);

		return designerDTO;
	}

	private DesignerDTO entityToDTO(Designer designer) {
		DesignerDTO designerDTO = DesignerDTO.builder().dno(designer.getDno()).dname(designer.getDname())
				.dbirth(designer.getDbirth()).dgender(designer.getDgender()).dphone(designer.getDphone())
				.demail(designer.getDemail()).dh_date(designer.getDh_date()).dstate(designer.getDstate())
				.dintro(designer.getDintro()).dattach(designer.getDattach()).build();

		List<DesignerImage> imageList = designer.getImageList();
		if (imageList == null || imageList.size() == 0) {

			return designerDTO;
		}

		List<String> fileNameList = imageList.stream().map(designerImage -> designerImage.getFileName()).toList();
		designerDTO.setUploadFileNames(fileNameList);
		return designerDTO;
	}

	// 수정
	@Override
	public void modify(DesignerDTO designerDTO) {
		Optional<Designer> result = designerRepository.findById(designerDTO.getDno());

		Designer designer = result.orElseThrow();

		designer.changeDname(designerDTO.getDname());
		designer.changeDbirth(designerDTO.getDbirth());
		designer.changeDgender(designerDTO.getDgender());
		designer.changeDphone(designerDTO.getDphone());
		designer.changeDemail(designerDTO.getDemail());
		designer.changeDh_date(designerDTO.getDh_date());
		designer.changeDstate(designerDTO.getDstate());
		designer.changeDintro(designerDTO.getDintro());
		designer.changeDattach(designerDTO.getDattach());

		// upload File -- clear first
		designer.clearList();

		List<String> uploadFileNames = designerDTO.getUploadFileNames();

		if (uploadFileNames != null && uploadFileNames.size() > 0) {
			uploadFileNames.stream().forEach(uploadName -> {
				designer.addImageString(uploadName);
			});
		}

		designerRepository.save(designer);
	}

	@Override
	public void remove(Long dno) {
		designerRepository.updateToDelete(dno, true);
	}



}
