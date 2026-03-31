package com.dental.controller;

import com.dental.dto.LoginRequest;
import com.dental.dto.LoginResponse;
import com.dental.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(authService.register(
                request.get("email"),
                request.get("password"),
                request.get("name"),
                request.get("dni"),
                request.get("phone"),
                request.get("address")
        ));
    }
}
