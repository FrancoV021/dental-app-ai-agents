package com.dental.controller;

import com.dental.dto.UserDTO;
import com.dental.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findDTOById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.update(id, request.get("name"), request.get("email")));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
