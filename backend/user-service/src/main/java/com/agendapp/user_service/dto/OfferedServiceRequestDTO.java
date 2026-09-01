package com.agendapp.user_service.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class OfferedServiceRequestDTO {

    @NotNull(message = "Business id is required")
    private Long businessId;

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be zero or greater")
    private BigDecimal price;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be greater than zero")
    private Integer duration;

    private String imageUrl;

    public OfferedServiceRequestDTO() {
    }

    public Long getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}