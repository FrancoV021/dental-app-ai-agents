package com.dental.service;

import com.dental.config.JwtTokenProvider;
import com.dental.dto.LoginRequest;
import com.dental.dto.LoginResponse;
import com.dental.entity.Patient;
import com.dental.entity.User;
import com.dental.repository.PatientRepository;
import com.dental.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider,
                       UserRepository userRepository, PatientRepository patientRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public LoginResponse register(String email, String password, String name, String dni, String phone, String address) {
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
        patientRepository.save(patient);

        String token = tokenProvider.generateToken(user.getEmail());

        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
    }
}
