package com.agendapp.user_service.service;

import com.agendapp.user_service.dto.OfferedServiceRequestDTO;
import com.agendapp.user_service.dto.OfferedServiceResponseDTO;
import com.agendapp.user_service.entity.Business;
import com.agendapp.user_service.entity.OfferedService;
import com.agendapp.user_service.exception.ResourceNotFoundException;
import com.agendapp.user_service.repository.BusinessRepository;
import com.agendapp.user_service.repository.OfferedServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferedServiceImpl implements IOfferedService {

    private final OfferedServiceRepository offeredServiceRepository;
    private final BusinessRepository businessRepository;

    public OfferedServiceImpl(
            OfferedServiceRepository offeredServiceRepository,
            BusinessRepository businessRepository
    ) {
        this.offeredServiceRepository = offeredServiceRepository;
        this.businessRepository = businessRepository;
    }

    @Override
    public List<OfferedServiceResponseDTO> findAll() {
        return offeredServiceRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public OfferedServiceResponseDTO findById(Long id) {
        return toResponseDTO(findEntityById(id));
    }

    @Override
    public OfferedServiceResponseDTO save(
            OfferedServiceRequestDTO dto
    ) {
        Business business = findBusiness(dto.getBusinessId());

        OfferedService service = new OfferedService();

        service.setBusiness(business);
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());

        return toResponseDTO(
                offeredServiceRepository.save(service)
        );
    }

    @Override
    public OfferedServiceResponseDTO update(
            Long id,
            OfferedServiceRequestDTO dto
    ) {
        OfferedService service = findEntityById(id);
        Business business = findBusiness(dto.getBusinessId());

        service.setBusiness(business);
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setPrice(dto.getPrice());
        service.setDuration(dto.getDuration());

        return toResponseDTO(
                offeredServiceRepository.save(service)
        );
    }

    @Override
    public void delete(Long id) {
        OfferedService service = findEntityById(id);
        offeredServiceRepository.delete(service);
    }

    private OfferedService findEntityById(Long id) {
        return offeredServiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service not found with id: " + id
                        )
                );
    }

    private Business findBusiness(Long businessId) {
        return businessRepository.findById(businessId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Business not found with id: " + businessId
                        )
                );
    }

    private OfferedServiceResponseDTO toResponseDTO(
            OfferedService service
    ) {
        return new OfferedServiceResponseDTO(
                service.getId(),
                service.getBusiness().getId(),
                service.getName(),
                service.getDescription(),
                service.getPrice(),
                service.getDuration()
        );
    }
}