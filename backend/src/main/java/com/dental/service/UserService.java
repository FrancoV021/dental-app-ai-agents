package com.dental.service;

import com.dental.dto.UserDTO;
import com.dental.entity.User;
import com.dental.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User createUser(String email, String password, String name, User.Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        User user = User.builder()
                .email(email)
                .password(password)
                .name(name)
                .role(role)
                .build();
        return userRepository.save(user);
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public UserDTO findDTOById(Long id) {
        return UserDTO.fromEntity(findById(id));
    }

    @Transactional
    public UserDTO update(Long id, String name, String email) {
        User user = findById(id);
        if (name != null) user.setName(name);
        if (email != null) user.setEmail(email);
        return UserDTO.fromEntity(userRepository.save(user));
    }

    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
