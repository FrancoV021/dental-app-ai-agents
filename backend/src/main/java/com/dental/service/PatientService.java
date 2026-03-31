package com.dental.service;

import com.dental.dto.PatientDTO;
import com.dental.entity.Patient;
import com.dental.entity.User;
import com.dental.repository.PatientRepository;
import com.dental.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<PatientDTO> findAll() {
        return patientRepository.findAll().stream()
                .map(PatientDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Patient findById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public PatientDTO findDTOById(Long id) {
        return PatientDTO.fromEntity(findById(id));
    }

    public Patient findByUserId(Long userId) {
        return patientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public PatientDTO findDTOByUserId(Long userId) {
        return PatientDTO.fromEntity(findByUserId(userId));
    }

    @Transactional
    public PatientDTO create(String email, String password, String name, String dni, String phone, String address) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        if (patientRepository.existsByDni(dni)) {
            throw new RuntimeException("DNI already exists");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .role(User.Role.PATIENT)
                .build();
        user = userRepository.save(user);

        Patient patient = Patient.builder()
                .user(user)
                .dni(dni)
                .phone(phone)
                .address(address)
                .build();
        patient = patientRepository.save(patient);

        return PatientDTO.fromEntity(patient);
    }

    @Transactional
    public PatientDTO update(Long id, String dni, String phone, String address) {
        Patient patient = findById(id);
        if (dni != null) patient.setDni(dni);
        if (phone != null) patient.setPhone(phone);
        if (address != null) patient.setAddress(address);
        return PatientDTO.fromEntity(patientRepository.save(patient));
    }

    @Transactional
    public void delete(Long id) {
        Patient patient = findById(id);
        User user = patient.getUser();
        patientRepository.delete(patient);
        userRepository.delete(user);
    }
}
