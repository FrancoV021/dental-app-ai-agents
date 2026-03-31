package com.dental.controller;

import com.dental.dto.AppointmentDTO;
import com.dental.entity.User;
import com.dental.service.AppointmentService;
import com.dental.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;

    public AppointmentController(AppointmentService appointmentService, UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PATIENT') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<AppointmentDTO>> findAll(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(appointmentService.findByUser(user));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PATIENT') or hasRole('PROFESSIONAL')")
    public ResponseEntity<AppointmentDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.findDTOById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('PATIENT')")
    public ResponseEntity<AppointmentDTO> create(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(appointmentService.create(
                Long.parseLong(request.get("patientId")),
                Long.parseLong(request.get("professionalId")),
                LocalDate.parse(request.get("appointmentDate")),
                LocalTime.parse(request.get("appointmentTime")),
                request.get("notes")
        ));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<AppointmentDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, request.get("status")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
