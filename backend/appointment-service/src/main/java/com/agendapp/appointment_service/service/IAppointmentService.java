package com.agendapp.appointment_service.service;

import com.agendapp.appointment_service.dto.AppointmentRequestDTO;
import com.agendapp.appointment_service.dto.AppointmentResponseDTO;
import com.agendapp.appointment_service.enums.AppointmentStatus;
import java.time.LocalDate;
import java.util.List;

public interface IAppointmentService {

    List<AppointmentResponseDTO> findAll();

    AppointmentResponseDTO findById(Long id);

    AppointmentResponseDTO save(AppointmentRequestDTO dto);

    AppointmentResponseDTO updateStatus(Long id, AppointmentStatus status);

    void delete(Long id);

    List<AppointmentResponseDTO> findByServiceAndDate(
            Long serviceId,
            LocalDate date
    );
}