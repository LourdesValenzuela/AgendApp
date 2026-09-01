package com.agendapp.user_service.controller;

import com.agendapp.user_service.dto.OfferedServiceRequestDTO;
import com.agendapp.user_service.dto.OfferedServiceResponseDTO;
import com.agendapp.user_service.service.IOfferedService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class OfferedServiceController {

    private final IOfferedService offeredService;

    public OfferedServiceController(IOfferedService offeredService) {
        this.offeredService = offeredService;
    }

    @GetMapping
    public List<OfferedServiceResponseDTO> findAll() {
        return offeredService.findAll();
    }

    @GetMapping("/{id}")
    public OfferedServiceResponseDTO findById(
            @PathVariable Long id
    ) {
        return offeredService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OfferedServiceResponseDTO save(
            @Valid @RequestBody OfferedServiceRequestDTO dto
    ) {
        return offeredService.save(dto);
    }

    @PutMapping("/{id}")
    public OfferedServiceResponseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody OfferedServiceRequestDTO dto
    ) {
        return offeredService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        offeredService.delete(id);
    }
}