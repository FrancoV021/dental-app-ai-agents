package com.dental.service;

import com.dental.dto.AppointmentDTO;
import com.dental.entity.Appointment;
import com.dental.entity.Patient;
import com.dental.entity.Professional;
import com.dental.entity.User;
import com.dental.repository.AppointmentRepository;
import com.dental.repository.PatientRepository;
import com.dental.repository.ProfessionalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final ProfessionalRepository professionalRepository;
    private final UserService userService;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository,
                             ProfessionalRepository professionalRepository, UserService userService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.professionalRepository = professionalRepository;
        this.userService = userService;
    }

    public List<AppointmentDTO> findAll() {
        return appointmentRepository.findAll().stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public AppointmentDTO findDTOById(Long id) {
        return AppointmentDTO.fromEntity(findById(id));
    }

    public List<AppointmentDTO> findByUser(User user) {
        List<Appointment> appointments;
        
        switch (user.getRole()) {
            case ADMIN:
                appointments = appointmentRepository.findAll();
                break;
            case PATIENT:
                appointments = appointmentRepository.findByPatientUserId(user.getId());
                break;
            case PROFESSIONAL:
                appointments = appointmentRepository.findByProfessionalUserIdAndDate(user.getId(), LocalDate.now());
                break;
            default:
                throw new RuntimeException("Invalid role");
        }
        
        return appointments.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public AppointmentDTO create(Long patientId, Long professionalId, LocalDate appointmentDate, 
                                  java.time.LocalTime appointmentTime, String notes) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        Professional professional = professionalRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .professional(professional)
                .appointmentDate(appointmentDate)
                .appointmentTime(appointmentTime)
                .status(Appointment.Status.PENDING)
                .notes(notes)
                .build();

        return AppointmentDTO.fromEntity(appointmentRepository.save(appointment));
    }

    @Transactional
    public AppointmentDTO updateStatus(Long id, String status) {
        Appointment appointment = findById(id);
        appointment.setStatus(Appointment.Status.valueOf(status.toUpperCase()));
        return AppointmentDTO.fromEntity(appointmentRepository.save(appointment));
    }

    @Transactional
    public void delete(Long id) {
        Appointment appointment = findById(id);
        appointment.setStatus(Appointment.Status.CANCELLED);
        appointmentRepository.save(appointment);
    }
}
