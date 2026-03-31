package com.dental.dto;

import com.dental.entity.Professional;

public class ProfessionalDTO {
    private Long id;
    private Long userId;
    private String email;
    private String name;
    private String specialty;
    private String licenseNumber;
    private String phone;

    public ProfessionalDTO() {}

    public ProfessionalDTO(Long id, Long userId, String email, String name, String specialty, String licenseNumber, String phone) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.specialty = specialty;
        this.licenseNumber = licenseNumber;
        this.phone = phone;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public static ProfessionalDTO fromEntity(Professional professional) {
        return new ProfessionalDTO(
                professional.getId(),
                professional.getUser().getId(),
                professional.getUser().getEmail(),
                professional.getUser().getName(),
                professional.getSpecialty(),
                professional.getLicenseNumber(),
                professional.getPhone()
        );
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long userId;
        private String email;
        private String name;
        private String specialty;
        private String licenseNumber;
        private String phone;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder specialty(String specialty) { this.specialty = specialty; return this; }
        public Builder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public ProfessionalDTO build() { return new ProfessionalDTO(id, userId, email, name, specialty, licenseNumber, phone); }
    }
}
