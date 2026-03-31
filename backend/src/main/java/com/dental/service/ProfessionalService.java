package com.dental.service;

import com.dental.dto.ProfessionalDTO;
import com.dental.entity.Professional;
import com.dental.entity.User;
import com.dental.repository.ProfessionalRepository;
import com.dental.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessionalService {

    private final ProfessionalRepository professionalRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfessionalService(ProfessionalRepository professionalRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.professionalRepository = professionalRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<ProfessionalDTO> findAll() {
        return professionalRepository.findAll().stream()
                .map(ProfessionalDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Professional findById(Long id) {
        return professionalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professional not found"));
    }

    public ProfessionalDTO findDTOById(Long id) {
        return ProfessionalDTO.fromEntity(findById(id));
    }

    public Professional findByUserId(Long userId) {
        return professionalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));
    }

    public ProfessionalDTO findDTOByUserId(Long userId) {
        return ProfessionalDTO.fromEntity(findByUserId(userId));
    }

    @Transactional
    public ProfessionalDTO create(String email, String password, String name, String specialty, String licenseNumber, String phone) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        if (professionalRepository.existsByLicenseNumber(licenseNumber)) {
            throw new RuntimeException("License number already exists");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .role(User.Role.PROFESSIONAL)
                .build();
        user = userRepository.save(user);

        Professional professional = Professional.builder()
                .user(user)
                .specialty(specialty)
                .licenseNumber(licenseNumber)
                .phone(phone)
                .build();
        professional = professionalRepository.save(professional);

        return ProfessionalDTO.fromEntity(professional);
    }

    @Transactional
    public ProfessionalDTO update(Long id, String specialty, String licenseNumber, String phone) {
        Professional professional = findById(id);
        if (specialty != null) professional.setSpecialty(specialty);
        if (licenseNumber != null) professional.setLicenseNumber(licenseNumber);
        if (phone != null) professional.setPhone(phone);
        return ProfessionalDTO.fromEntity(professionalRepository.save(professional));
    }

    @Transactional
    public void delete(Long id) {
        Professional professional = findById(id);
        User user = professional.getUser();
        professionalRepository.delete(professional);
        userRepository.delete(user);
    }
}
