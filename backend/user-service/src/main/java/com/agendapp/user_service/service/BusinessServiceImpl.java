package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.BusinessRequestDTO;
import com.agendapp.user_service.dto.BusinessResponseDTO;
import com.agendapp.user_service.entity.Business;
import com.agendapp.user_service.repository.BusinessRepository;
import org.springframework.stereotype.Service;
import com.agendapp.user_service.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class BusinessServiceImpl implements IBusinessService {

    private final BusinessRepository businessRepository;

    public BusinessServiceImpl(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @Override
    public List<BusinessResponseDTO> findAll() {
        return businessRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public BusinessResponseDTO save(BusinessRequestDTO businessRequestDTO) {

        Business business = new Business();
        business.setName(businessRequestDTO.getName());

        Business savedBusiness = businessRepository.save(business);

        return toResponseDTO(savedBusiness);
    }

    private BusinessResponseDTO toResponseDTO(Business business) {
        return new BusinessResponseDTO(
                business.getId(),
                business.getName()
        );
    }

    @Override
    public BusinessResponseDTO findById(Long id) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Business not found with id: " + id
                        )
                );

        return toResponseDTO(business);
    }

    @Override
    public BusinessResponseDTO update(
            Long id,
            BusinessRequestDTO businessRequestDTO
    ) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Business not found with id: " + id
                        )
                );

        business.setName(businessRequestDTO.getName());

        Business updatedBusiness = businessRepository.save(business);

        return toResponseDTO(updatedBusiness);
    }

    @Override
    public void delete(Long id) {

        Business business = businessRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Business not found with id: " + id
                        )
                );

        businessRepository.delete(business);
    }
}