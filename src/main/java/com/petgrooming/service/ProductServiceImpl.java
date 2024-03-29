package com.petgrooming.service;

import com.petgrooming.domain.Product;
import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;
import com.petgrooming.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    // 상품 등록
    @Override
    public Long register(ProductDTO productDTO) {
        log.info("---------------");
        Product product = modelMapper.map(productDTO, Product.class);
        Product savedProduct = productRepository.save(product);

        return savedProduct.getP_num();
    }

    // 번호로 상품 조회
    @Override
    public ProductDTO get(Long p_num) {
        java.util.Optional<Product> result = productRepository.findById(p_num);

        Product product = result.orElseThrow();
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);
        return dto;
    }

    // 상품 수정
    @Override
    public void modify(ProductDTO productDTO) {
        Optional<Product> result = productRepository.findById(productDTO.getP_num());

        Product product = result.orElseThrow();

        product.changeP_type(productDTO.getP_type());
        product.changeP_name(productDTO.getP_name());
        product.changeP_price(productDTO.getP_price());

        productRepository.save(product);
    }

    // 상품 삭제
    @Override
    public void remove(Long p_num) {
        productRepository.deleteById(p_num);
    }

    // 전체 상품 목록
    @Override
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("p_num").descending());

        Page<Product> result = productRepository.findAllOrderByPnumDesc(pageable);

        List<ProductDTO> dtoList = result.getContent().stream().map(product -> modelMapper.map(product, ProductDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<ProductDTO> responseDTO = PageResponseDTO.<ProductDTO>withAll().dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
        return responseDTO;
    }

    // 상품 검색
    @Override
    public PageResponseDTO<ProductDTO> search(String keyword, PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(), Sort.by("p_num").descending());

        Page<Product> result = productRepository.findByP_nameContaining(keyword, pageable);

        List<ProductDTO> dtoList = result.getContent().stream().map(product -> modelMapper.map(product, ProductDTO.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<ProductDTO> responseDTO = PageResponseDTO.<ProductDTO>withAll().dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
        return responseDTO;
    }
    
    @Override
    public List<ProductDTO> findEssentialProductsCategory() {
        // 필수상품 카테고리 조회
        List<Product> products = productRepository.findEssentialProductsCategory();

        // 조회 결과를 ProductDTO로 변환
        List<ProductDTO> dtoList = products.stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<ProductDTO> findEssentialProducts(String p_name) {
        // 필수상품 조회
        List<Product> products = productRepository.findEssentialProducts(p_name);

        // 조회 결과를 ProductDTO로 변환
        List<ProductDTO> dtoList = products.stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<ProductDTO> listAdditionalProducts() {
        // 추가상품 조회
        List<Product> products = productRepository.findAdditionalProducts();

        // 조회 결과를 ProductDTO로 변환
        List<ProductDTO> dtoList = products.stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

        return dtoList;
    }
}
