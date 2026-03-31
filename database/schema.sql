-- Dental-App Database Schema
-- MySQL 8.0

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'PATIENT', 'PROFESSIONAL') NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Patients table (1:1 with users)
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    dni VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    birth_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_dni (dni)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Professionals table (1:1 with users)
CREATE TABLE IF NOT EXISTS professionals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    specialty VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_license (license_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Appointments table (N:1 with patients and professionals)
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    professional_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE,
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_professional_id (professional_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin user initial (password: admin123 BCrypt encoded)
INSERT INTO users (email, password, role, name) 
VALUES ('admin@dental.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 'Administrator');
