package com.agendapp.appointment_service.controller;

import com.agendapp.appointment_service.dto.AppointmentRequestDTO;
import com.agendapp.appointment_service.dto.AppointmentResponseDTO;
import com.agendapp.appointment_service.enums.AppointmentStatus;
import com.agendapp.appointment_service.service.IAppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final IAppointmentService appointmentService;

    public AppointmentController(IAppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<AppointmentResponseDTO> findAll() {
        return appointmentService.findAll();
    }

    @GetMapping("/{id}")
    public AppointmentResponseDTO findById(@PathVariable Long id) {
        return appointmentService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponseDTO save(
            @Valid @RequestBody AppointmentRequestDTO dto
    ) {
        return appointmentService.save(dto);
    }

    @PatchMapping("/{id}/status")
    public AppointmentResponseDTO updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status
    ) {
        return appointmentService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        appointmentService.delete(id);
    }
}