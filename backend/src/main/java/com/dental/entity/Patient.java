package com.dental.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, unique = true)
    private String dni;

    private String phone;

    private String address;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    public Patient() {}

    public Patient(Long id, User user, String dni, String phone, String address, LocalDate birthDate) {
        this.id = id;
        this.user = user;
        this.dni = dni;
        this.phone = phone;
        this.address = address;
        this.birthDate = birthDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private User user;
        private String dni;
        private String phone;
        private String address;
        private LocalDate birthDate;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder dni(String dni) { this.dni = dni; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder birthDate(LocalDate birthDate) { this.birthDate = birthDate; return this; }
        public Patient build() { return new Patient(id, user, dni, phone, address, birthDate); }
    }
}
