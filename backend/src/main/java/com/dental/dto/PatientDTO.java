package com.dental.dto;

import com.dental.entity.Patient;
import java.time.LocalDate;

public class PatientDTO {
    private Long id;
    private Long userId;
    private String email;
    private String name;
    private String dni;
    private String phone;
    private String address;
    private LocalDate birthDate;

    public PatientDTO() {}

    public PatientDTO(Long id, Long userId, String email, String name, String dni, String phone, String address, LocalDate birthDate) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.dni = dni;
        this.phone = phone;
        this.address = address;
        this.birthDate = birthDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public static PatientDTO fromEntity(Patient patient) {
        return new PatientDTO(
                patient.getId(),
                patient.getUser().getId(),
                patient.getUser().getEmail(),
                patient.getUser().getName(),
                patient.getDni(),
                patient.getPhone(),
                patient.getAddress(),
                patient.getBirthDate()
        );
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long userId;
        private String email;
        private String name;
        private String dni;
        private String phone;
        private String address;
        private LocalDate birthDate;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder dni(String dni) { this.dni = dni; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder birthDate(LocalDate birthDate) { this.birthDate = birthDate; return this; }
        public PatientDTO build() { return new PatientDTO(id, userId, email, name, dni, phone, address, birthDate); }
    }
}
