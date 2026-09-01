package com.agendapp.user_service.repository;

import com.agendapp.user_service.entity.OfferedService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfferedServiceRepository
        extends JpaRepository<OfferedService, Long> {
}