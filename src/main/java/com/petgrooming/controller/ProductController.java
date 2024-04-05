package com.petgrooming.controller;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;
import com.petgrooming.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/product")
public class ProductController {
	private final ProductService service;

	// 정보 불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/{p_num}")
	public ProductDTO get(@PathVariable(name = "p_num") Long p_num) {
		return service.get(p_num);
	}

	// 리스트 불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/list")
	public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
		log.info(pageRequestDTO);
		return service.list(pageRequestDTO);
	}

	// 등록
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PostMapping("/")
	public Map<String, Long> register(@RequestBody ProductDTO productDTO) {
		log.info("ProductDTO : " + productDTO);
		Long p_num = service.register(productDTO);

		return Map.of("P_NUM", p_num);
	}

	// 수정
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@PutMapping("/{p_num}")
	public Map<String, String> modify(@PathVariable(name = "p_num") Long p_num, @RequestBody ProductDTO productDTO) {
		productDTO.setP_num(p_num);
		service.modify(productDTO);

		return Map.of("result", "success");
	}

	// 상태 전환
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@DeleteMapping("/{p_num}")
	public Map<String, String> remove(@PathVariable(name = "p_num") Long p_num) {
		log.info("remove" + p_num);
		service.remove(p_num);

		return Map.of("result", "success");
	}

	// 검색
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/search")
	public PageResponseDTO<ProductDTO> search(@RequestParam String keyword, PageRequestDTO pageRequestDTO) {
		return service.search(keyword, pageRequestDTO);
	}

	// 필수 상품 카테고리 리스트불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/essentialproductscategory")
	public List<ProductDTO> findEssentialProductsCategory() {
		return service.findEssentialProductsCategory();
	}

	// 필수상품 리스트 불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/essentialproducts/{p_name}")
	public List<ProductDTO> findEssentialProducts(@PathVariable(name = "p_name") String p_name) {
		try {
			String decodedName = URLDecoder.decode(p_name, "UTF-8");
			String encodedName = decodedName.replaceAll("\\+", "%2B");
			return service.findEssentialProducts(encodedName);
		} catch (UnsupportedEncodingException e) {
			// 디코딩 중 발생한 예외 처리
			e.printStackTrace();
			return Collections.emptyList(); // 예외 발생 시 빈 리스트 반환 또는 예외 처리
		}
	}

	// 추가상품리스트 불러오기
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')") // 회원만 접근 가능
	@GetMapping("/additionalproducts")
	public List<ProductDTO> listAdditionalProducts() {
		return service.listAdditionalProducts();
	}
}
