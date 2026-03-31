package com.dental.controller;

import com.dental.dto.PatientDTO;
import com.dental.entity.User;
import com.dental.service.PatientService;
import com.dental.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;
    private final UserService userService;

    public PatientController(PatientService patientService, UserService userService) {
        this.patientService = patientService;
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PatientDTO>> findAll() {
        return ResponseEntity.ok(patientService.findAll());
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PatientDTO> findCurrentPatient(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(patientService.findDTOByUserId(user.getId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PatientDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.findDTOById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PatientDTO> create(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(patientService.create(
                request.get("email"),
                request.get("password"),
                request.get("name"),
                request.get("dni"),
                request.get("phone"),
                request.get("address")
        ));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PATIENT')")
    public ResponseEntity<PatientDTO> update(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(patientService.update(id, 
                request.get("dni"), 
                request.get("phone"), 
                request.get("address")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
