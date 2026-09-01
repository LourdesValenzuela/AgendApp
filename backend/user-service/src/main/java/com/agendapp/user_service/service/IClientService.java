package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.ClientRequestDTO;
import com.agendapp.user_service.dto.ClientResponseDTO;

import java.util.List;

public interface IClientService {

    List<ClientResponseDTO> findAll();

    ClientResponseDTO findById(Long id);

    ClientResponseDTO save(ClientRequestDTO dto);

    ClientResponseDTO update(Long id, ClientRequestDTO dto);

    void delete(Long id);
}