package com.agendapp.user_service.controller;

import com.agendapp.user_service.dto.ClientRequestDTO;
import com.agendapp.user_service.dto.ClientResponseDTO;
import com.agendapp.user_service.service.IClientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final IClientService clientService;

    public ClientController(IClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<ClientResponseDTO> findAll() {
        return clientService.findAll();
    }

    @GetMapping("/{id}")
    public ClientResponseDTO findById(@PathVariable Long id) {
        return clientService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClientResponseDTO save(
            @Valid @RequestBody ClientRequestDTO dto
    ) {
        return clientService.save(dto);
    }

    @PutMapping("/{id}")
    public ClientResponseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody ClientRequestDTO dto
    ) {
        return clientService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clientService.delete(id);
    }
}