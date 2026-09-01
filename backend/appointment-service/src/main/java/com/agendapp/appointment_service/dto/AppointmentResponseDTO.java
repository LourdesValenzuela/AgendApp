package com.agendapp.appointment_service.dto;

import com.agendapp.appointment_service.enums.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentResponseDTO {

    private Long id;
    private Long clientId;
    private Long serviceId;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private AppointmentStatus status;

    public AppointmentResponseDTO(
            Long id,
            Long clientId,
            Long serviceId,
            LocalDate date,
            LocalTime startTime,
            LocalTime endTime,
            AppointmentStatus status
    ) {
        this.id = id;
        this.clientId = clientId;
        this.serviceId = serviceId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getClientId() {
        return clientId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }
}