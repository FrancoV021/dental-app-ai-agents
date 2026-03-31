package com.dental.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "professionals")
public class Professional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String specialty;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    private String phone;

    public Professional() {}

    public Professional(Long id, User user, String specialty, String licenseNumber, String phone) {
        this.id = id;
        this.user = user;
        this.specialty = specialty;
        this.licenseNumber = licenseNumber;
        this.phone = phone;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private String specialty;
        private String licenseNumber;
        private String phone;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder specialty(String specialty) { this.specialty = specialty; return this; }
        public Builder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Professional build() { return new Professional(id, user, specialty, licenseNumber, phone); }
    }
}
