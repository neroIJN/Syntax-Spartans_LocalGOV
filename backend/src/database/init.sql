-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS localgov_db;

-- Use the database
USE localgov_db;

-- Grant privileges to root user (optional, for development)
GRANT ALL PRIVILEGES ON localgov_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- The Users table will be created automatically by Sequelize when the application starts
-- This script is just for reference and manual database setup if needed

-- Sample data structure (Sequelize will handle this):
-- 
-- CREATE TABLE IF NOT EXISTS `users` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `firstName` varchar(50) NOT NULL,
--   `lastName` varchar(50) NOT NULL,
--   `email` varchar(100) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `nicNumber` varchar(12) NOT NULL,
--   `phoneNumber` varchar(15) NOT NULL,
--   `address` text,
--   `dateOfBirth` date NOT NULL,
--   `gender` enum('male','female','other') NOT NULL,
--   `userType` enum('citizen','officer') DEFAULT 'citizen',
--   `isEmailVerified` tinyint(1) DEFAULT '0',
--   `isActive` tinyint(1) DEFAULT '1',
--   `profilePicture` varchar(255) DEFAULT NULL,
--   `lastLogin` datetime DEFAULT NULL,
--   `passwordResetToken` varchar(255) DEFAULT NULL,
--   `passwordResetExpires` datetime DEFAULT NULL,
--   `emailVerificationToken` varchar(255) DEFAULT NULL,
--   `emailVerificationExpires` datetime DEFAULT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   `deletedAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `email` (`email`),
--   UNIQUE KEY `nicNumber` (`nicNumber`),
--   KEY `userType` (`userType`),
--   KEY `isActive` (`isActive`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
