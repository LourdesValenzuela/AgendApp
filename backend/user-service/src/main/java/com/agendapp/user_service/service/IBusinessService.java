package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.BusinessRequestDTO;
import com.agendapp.user_service.dto.BusinessResponseDTO;

import java.util.List;

public interface IBusinessService {

    List<BusinessResponseDTO> findAll();

    BusinessResponseDTO save(BusinessRequestDTO businessRequestDTO);

    BusinessResponseDTO findById(Long id);

    BusinessResponseDTO update(Long id, BusinessRequestDTO businessRequestDTO);

    void delete(Long id);
}