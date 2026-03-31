package com.dental.repository;

import com.dental.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    @Query("SELECT a FROM Appointment a WHERE a.patient.user.id = :userId")
    List<Appointment> findByPatientUserId(@Param("userId") Long userId);
    
    @Query("SELECT a FROM Appointment a WHERE a.professional.user.id = :userId AND a.appointmentDate = :date")
    List<Appointment> findByProfessionalUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    List<Appointment> findByProfessionalId(Long professionalId);
    
    List<Appointment> findByPatientId(Long patientId);
    
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate = :date")
    List<Appointment> findByDate(@Param("date") LocalDate date);
}
