package com.agendapp.user_service.repository;

import com.agendapp.user_service.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Long> {
}