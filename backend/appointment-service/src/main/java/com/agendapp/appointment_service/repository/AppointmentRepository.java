package com.agendapp.appointment_service.repository;

import com.agendapp.appointment_service.entity.Appointment;
import com.agendapp.appointment_service.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.time.LocalTime;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByServiceIdAndDateAndStartTimeAndStatusNot(
            Long serviceId,
            LocalDate date,
            LocalTime startTime,
            AppointmentStatus status
    );

    List<Appointment> findByServiceIdAndDateAndStatusNot(
            Long serviceId,
            LocalDate date,
            AppointmentStatus status
    );
}