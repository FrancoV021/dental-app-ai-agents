package com.dental.controller;

import com.dental.dto.ProfessionalDTO;
import com.dental.entity.User;
import com.dental.service.ProfessionalService;
import com.dental.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/professionals")
public class ProfessionalController {

    private final ProfessionalService professionalService;
    private final UserService userService;

    public ProfessionalController(ProfessionalService professionalService, UserService userService) {
        this.professionalService = professionalService;
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PROFESSIONAL', 'PATIENT')")
    public ResponseEntity<List<ProfessionalDTO>> findAll() {
        return ResponseEntity.ok(professionalService.findAll());
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('PROFESSIONAL')")
    public ResponseEntity<ProfessionalDTO> findCurrentProfessional(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(professionalService.findDTOByUserId(user.getId()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<ProfessionalDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(professionalService.findDTOById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProfessionalDTO> create(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(professionalService.create(
                request.get("email"),
                request.get("password"),
                request.get("name"),
                request.get("specialty"),
                request.get("licenseNumber"),
                request.get("phone")
        ));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<ProfessionalDTO> update(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(professionalService.update(id,
                request.get("specialty"),
                request.get("licenseNumber"),
                request.get("phone")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        professionalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
