package com.dental.dto;

public class LoginResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String name;
    private String role;

    public LoginResponse() {}

    public LoginResponse(String token, String type, Long id, String email, String name, String role) {
        this.token = token;
        this.type = type;
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String email;
        private String name;
        private String role;

        public Builder token(String token) { this.token = token; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder id(Long id) { this.id = id; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public LoginResponse build() { return new LoginResponse(token, type, id, email, name, role); }
    }
}
