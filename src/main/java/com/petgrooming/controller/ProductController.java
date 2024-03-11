package com.petgrooming.controller;

import com.petgrooming.dto.PageRequestDTO;
import com.petgrooming.dto.PageResponseDTO;
import com.petgrooming.dto.ProductDTO;
import com.petgrooming.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService service;


    @GetMapping("/{p_num}")
    public ProductDTO get(@PathVariable(name = "p_num") Long p_num) {
        return service.get(p_num);
    }

    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        log.info(pageRequestDTO);
        return service.list(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String, Long> register(@RequestBody ProductDTO productDTO) {
        log.info("ProductDTO : " + productDTO);
        Long p_num = service.register(productDTO);

        return Map.of("P_NUM", p_num);
    }

    @PutMapping("/{p_num}")
    public Map<String, String> modify(@PathVariable(name = "p_num") Long p_num, @RequestBody ProductDTO productDTO) {
        productDTO.setP_num(p_num);
        service.modify(productDTO);

        return Map.of("result", "success");
    }

    @DeleteMapping("/{p_num}")
    public Map<String, String> remove(@PathVariable(name = "p_num") Long p_num) {
        log.info("remove" + p_num);
        service.remove(p_num);

        return Map.of("result", "success");
    }

    @GetMapping("/search")
    public PageResponseDTO<ProductDTO> search(@RequestParam String keyword, PageRequestDTO pageRequestDTO) {
        return service.search(keyword, pageRequestDTO);
    }

    @GetMapping("/sortPrice")
    public PageResponseDTO<ProductDTO> sortPrice(PageRequestDTO pageRequestDTO, @RequestParam(required = false) Sort.Direction sortDirection) {
        pageRequestDTO.setSortDirection(sortDirection);
        return service.sortPrice(pageRequestDTO);
    }

    @GetMapping("/sortP_num")
    public PageResponseDTO<ProductDTO> sortP_num(PageRequestDTO pageRequestDTO, @RequestParam(required = false) Sort.Direction sortDirection) {
        pageRequestDTO.setSortDirection(sortDirection);
        return service.sortP_num(pageRequestDTO);
    }
}
