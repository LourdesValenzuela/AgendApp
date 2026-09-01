package com.agendapp.user_service.dto;

public class BusinessResponseDTO {

    private Long id;
    private String name;

    public BusinessResponseDTO() {
    }

    public BusinessResponseDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}