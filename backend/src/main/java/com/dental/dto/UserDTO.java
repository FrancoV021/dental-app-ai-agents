package com.dental.dto;

import com.dental.entity.User;
import java.time.LocalDateTime;

public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private User.Role role;
    private LocalDateTime createdAt;

    public UserDTO() {}

    public UserDTO(Long id, String email, String name, User.Role role, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static UserDTO fromEntity(User user) {
        return new UserDTO(user.getId(), user.getEmail(), user.getName(), user.getRole(), user.getCreatedAt());
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String email;
        private String name;
        private User.Role role;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder role(User.Role role) { this.role = role; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public UserDTO build() { return new UserDTO(id, email, name, role, createdAt); }
    }
}
