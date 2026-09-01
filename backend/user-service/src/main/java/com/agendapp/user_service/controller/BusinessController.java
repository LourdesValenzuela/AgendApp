package com.agendapp.user_service.controller;

import com.agendapp.user_service.dto.BusinessRequestDTO;
import com.agendapp.user_service.dto.BusinessResponseDTO;
import com.agendapp.user_service.service.IBusinessService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
public class BusinessController {

    private final IBusinessService businessService;

    public BusinessController(IBusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public List<BusinessResponseDTO> findAll() {
        return businessService.findAll();
    }

    @GetMapping("/{id}")
    public BusinessResponseDTO findById(@PathVariable Long id) {
        return businessService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BusinessResponseDTO save(
            @Valid @RequestBody BusinessRequestDTO businessRequestDTO
    ) {
        return businessService.save(businessRequestDTO);
    }

    @PutMapping("/{id}")
    public BusinessResponseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody BusinessRequestDTO businessRequestDTO
    ) {
        return businessService.update(id, businessRequestDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        businessService.delete(id);
    }
}