package com.agendapp.appointment_service.service;
import java.time.LocalDate;
import com.agendapp.appointment_service.dto.AppointmentRequestDTO;
import com.agendapp.appointment_service.dto.AppointmentResponseDTO;
import com.agendapp.appointment_service.entity.Appointment;
import com.agendapp.appointment_service.enums.AppointmentStatus;
import com.agendapp.appointment_service.exception.ResourceNotFoundException;
import com.agendapp.appointment_service.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements IAppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public List<AppointmentResponseDTO> findAll() {
        return appointmentRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Override
    public AppointmentResponseDTO findById(Long id) {
        return toResponseDTO(findEntityById(id));
    }

    @Override
    public AppointmentResponseDTO save(AppointmentRequestDTO dto) {

        boolean occupied = appointmentRepository
                .existsByServiceIdAndDateAndStartTimeAndStatusNot(
                        dto.getServiceId(),
                        dto.getDate(),
                        dto.getStartTime(),
                        AppointmentStatus.CANCELLED
                );

        if (occupied) {
            throw new IllegalArgumentException("Time slot is already occupied");
        }

        Appointment appointment = new Appointment();

        appointment.setClientId(dto.getClientId());
        appointment.setServiceId(dto.getServiceId());
        appointment.setDate(dto.getDate());
        appointment.setStartTime(dto.getStartTime());
        appointment.setEndTime(dto.getEndTime());
        appointment.setStatus(AppointmentStatus.PENDING);

        return toResponseDTO(
                appointmentRepository.save(appointment)
        );
    }

    @Override
    public AppointmentResponseDTO updateStatus(
            Long id,
            AppointmentStatus status
    ) {
        Appointment appointment = findEntityById(id);

        appointment.setStatus(status);

        return toResponseDTO(
                appointmentRepository.save(appointment)
        );
    }

    @Override
    public void delete(Long id) {
        Appointment appointment = findEntityById(id);
        appointmentRepository.delete(appointment);
    }

    private Appointment findEntityById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id
                        )
                );
    }

    private AppointmentResponseDTO toResponseDTO(Appointment appointment) {
        return new AppointmentResponseDTO(
                appointment.getId(),
                appointment.getClientId(),
                appointment.getServiceId(),
                appointment.getDate(),
                appointment.getStartTime(),
                appointment.getEndTime(),
                appointment.getStatus()
        );
    }

    @Override
    public List<AppointmentResponseDTO> findByServiceAndDate(
            Long serviceId,
            LocalDate date
    ) {
        return appointmentRepository
                .findByServiceIdAndDateAndStatusNot(
                        serviceId,
                        date,
                        AppointmentStatus.CANCELLED
                )
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }
}