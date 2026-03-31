package com.dental.repository;

import com.dental.entity.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
    Optional<Professional> findByUserId(Long userId);
    Optional<Professional> findByLicenseNumber(String licenseNumber);
    boolean existsByLicenseNumber(String licenseNumber);
}
