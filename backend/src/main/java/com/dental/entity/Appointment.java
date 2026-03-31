package com.dental.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professional_id", nullable = false)
    private Professional professional;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Appointment() {}

    public Appointment(Long id, Patient patient, Professional professional, LocalDate appointmentDate, 
                       LocalTime appointmentTime, Status status, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.patient = patient;
        this.professional = professional;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public Professional getProfessional() { return professional; }
    public void setProfessional(Professional professional) { this.professional = professional; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }
    public LocalTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Patient patient;
        private Professional professional;
        private LocalDate appointmentDate;
        private LocalTime appointmentTime;
        private Status status;
        private String notes;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder patient(Patient patient) { this.patient = patient; return this; }
        public Builder professional(Professional professional) { this.professional = professional; return this; }
        public Builder appointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; return this; }
        public Builder appointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; return this; }
        public Builder status(Status status) { this.status = status; return this; }
        public Builder notes(String notes) { this.notes = notes; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Appointment build() { return new Appointment(id, patient, professional, appointmentDate, appointmentTime, status, notes, createdAt); }
    }

    public enum Status {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
}
