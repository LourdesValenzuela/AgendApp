package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.OfferedServiceRequestDTO;
import com.agendapp.user_service.dto.OfferedServiceResponseDTO;

import java.util.List;

public interface IOfferedService {

    List<OfferedServiceResponseDTO> findAll();

    OfferedServiceResponseDTO findById(Long id);

    OfferedServiceResponseDTO save(OfferedServiceRequestDTO dto);

    OfferedServiceResponseDTO update(
            Long id,
            OfferedServiceRequestDTO dto
    );

    void delete(Long id);
}