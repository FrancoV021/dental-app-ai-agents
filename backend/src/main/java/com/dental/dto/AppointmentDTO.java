package com.dental.dto;

import com.dental.entity.Appointment;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private String patientName;
    private String patientDni;
    private Long professionalId;
    private String professionalName;
    private String specialty;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String status;
    private String notes;
    private LocalDateTime createdAt;

    public AppointmentDTO() {}

    public AppointmentDTO(Long id, Long patientId, String patientName, String patientDni, Long professionalId, 
                          String professionalName, String specialty, LocalDate appointmentDate, LocalTime appointmentTime,
                          String status, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientDni = patientDni;
        this.professionalId = professionalId;
        this.professionalName = professionalName;
        this.specialty = specialty;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public String getPatientDni() { return patientDni; }
    public void setPatientDni(String patientDni) { this.patientDni = patientDni; }
    public Long getProfessionalId() { return professionalId; }
    public void setProfessionalId(Long professionalId) { this.professionalId = professionalId; }
    public String getProfessionalName() { return professionalName; }
    public void setProfessionalName(String professionalName) { this.professionalName = professionalName; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }
    public LocalTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static AppointmentDTO fromEntity(Appointment appointment) {
        return new AppointmentDTO(
                appointment.getId(),
                appointment.getPatient().getId(),
                appointment.getPatient().getUser().getName(),
                appointment.getPatient().getDni(),
                appointment.getProfessional().getId(),
                appointment.getProfessional().getUser().getName(),
                appointment.getProfessional().getSpecialty(),
                appointment.getAppointmentDate(),
                appointment.getAppointmentTime(),
                appointment.getStatus().name(),
                appointment.getNotes(),
                appointment.getCreatedAt()
        );
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long patientId;
        private String patientName;
        private String patientDni;
        private Long professionalId;
        private String professionalName;
        private String specialty;
        private LocalDate appointmentDate;
        private LocalTime appointmentTime;
        private String status;
        private String notes;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder patientId(Long patientId) { this.patientId = patientId; return this; }
        public Builder patientName(String patientName) { this.patientName = patientName; return this; }
        public Builder patientDni(String patientDni) { this.patientDni = patientDni; return this; }
        public Builder professionalId(Long professionalId) { this.professionalId = professionalId; return this; }
        public Builder professionalName(String professionalName) { this.professionalName = professionalName; return this; }
        public Builder specialty(String specialty) { this.specialty = specialty; return this; }
        public Builder appointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; return this; }
        public Builder appointmentTime(LocalTime appointmentTime) { this.appointmentTime = appointmentTime; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder notes(String notes) { this.notes = notes; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public AppointmentDTO build() { return new AppointmentDTO(id, patientId, patientName, patientDni, professionalId, professionalName, specialty, appointmentDate, appointmentTime, status, notes, createdAt); }
    }
}
