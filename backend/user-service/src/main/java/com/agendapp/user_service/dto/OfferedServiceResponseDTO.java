package com.agendapp.user_service.dto;

import java.math.BigDecimal;

public class OfferedServiceResponseDTO {

    private Long id;
    private Long businessId;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private String imageUrl;

    public OfferedServiceResponseDTO() {
    }

    public OfferedServiceResponseDTO(
            Long id,
            Long businessId,
            String name,
            String description,
            BigDecimal price,
            Integer duration,
            String imageUrl
    ) {
        this.id = id;
        this.businessId = businessId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public Long getBusinessId() {
        return businessId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}