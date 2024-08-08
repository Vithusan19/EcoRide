-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2024 at 07:34 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecoRide`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_booking`
--

CREATE TABLE `tb_booking` (
  `BookingID` int(11) NOT NULL,
  `RideID` int(11) NOT NULL,
  `PassengerID` int(11) NOT NULL,
  `status` varchar(18) NOT NULL DEFAULT 'waiting',
  `seats` int(11) NOT NULL,
  `driverId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_message`
--

CREATE TABLE `tb_message` (
  `messageID` int(11) NOT NULL,
  `message` varchar(900) DEFAULT NULL,
  `emailAdress` varchar(100) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_message`
--

INSERT INTO `tb_message` (`messageID`, `message`, `emailAdress`, `name`, `date`) VALUES
(154, 'Hi EcoRide Team,\r\n\r\nI\'m interested in your carpooling services. Can you provide details on the registration process, safety measures, fare calculation, and ride matching? Additionally, what support is available during emergencies? Thank you for your assistance.', 'vithusanrajah19@gmail.com', 'V.Vithusan', '2024-08-04'),
(155, 'hello', 'vithusanrajah19@gmail.com', 'Vithusan', '2024-08-04'),
(156, 'hello admin', 'vithusanrajah19@gmail.com', 'vithusan', '2024-08-04'),
(157, 'hello', 'vithu0919@gmail.com', 'vithu', '2024-08-04');

-- --------------------------------------------------------

--
-- Table structure for table `tb_ride`
--

CREATE TABLE `tb_ride` (
  `rideID` int(11) NOT NULL,
  `vehicleNo` varchar(50) DEFAULT NULL,
  `vehicleModel` varchar(100) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `airCondition` varchar(10) DEFAULT NULL,
  `departurePoint` varchar(100) DEFAULT NULL,
  `destinationPoint` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `seatCost` decimal(10,2) DEFAULT NULL,
  `departureTime` time DEFAULT NULL,
  `destinationTime` time DEFAULT NULL,
  `Ridegender` varchar(10) DEFAULT NULL,
  `route` text DEFAULT NULL,
  `preferences` text DEFAULT NULL,
  `publishedDate` date NOT NULL,
  `publishedTime` time NOT NULL,
  `driverID` int(11) DEFAULT NULL,
  `BookingSeats` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_ride`
--

INSERT INTO `tb_ride` (`rideID`, `vehicleNo`, `vehicleModel`, `seats`, `airCondition`, `departurePoint`, `destinationPoint`, `date`, `seatCost`, `departureTime`, `destinationTime`, `Ridegender`, `route`, `preferences`, `publishedDate`, `publishedTime`, `driverID`, `BookingSeats`) VALUES
(47, 'CAR1235', 'BMW', 4, 'true', 'Badulla', 'Colombo', '2024-08-30', 1997.00, '20:30:00', '04:30:00', 'male', 'Badulla->Rathnapura->Negambo->Colombo', 'no smoking', '2024-08-04', '17:00:45', 58, 0),
(48, 'CAR1235', 'BMW', 3, 'false', 'Jaffna', 'Colombo', '2024-08-30', 2997.00, '22:33:00', '04:36:00', 'male', 'Jaffna->Vavuniya->Negambo->Colombo', 'No smoking', '2024-08-04', '17:01:54', 58, 0),
(49, 'CAR1897', 'Axio', 3, 'true', 'Galle', 'Kandy', '2024-08-28', 4500.00, '20:33:00', '05:40:00', 'any', 'Galle->Colombo->Badulla->Kandy', 'No pet & No smoking', '2024-08-04', '17:04:36', 59, 0),
(53, 'CAR2354', 'Audi', 5, 'true', 'Kandy', 'Jaffna', '2024-08-21', 4500.00, '07:15:00', '23:14:00', 'any', 'Kandy->Vavuniya->jaffna', 'No smoking', '2024-08-04', '21:39:49', 60, 8),
(54, 'CAR1909', 'BMW', 4, 'false', 'Jaffna', 'Kandy', '2024-08-30', 5.00, '07:17:00', '05:15:00', 'male', 'Jaffna->Vavuniya->Kandy', 'No smoking', '2024-08-04', '21:41:22', 60, 0),
(55, 'CAR1235', 'Audi', 5, 'false', 'Sangaththani', 'Jaffna', '2024-08-23', 500.00, '14:37:00', '15:38:00', 'any', 'Chavakachcheri->Jaffna', 'No smoking', '2024-08-05', '07:03:36', 58, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `User_ID` int(11) NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `userrole` varchar(10) NOT NULL DEFAULT 'passenger',
  `Email` varchar(30) NOT NULL,
  `PhoneNo` varchar(18) NOT NULL,
  `NicNo` varchar(15) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `rating` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`User_ID`, `UserName`, `Name`, `userrole`, `Email`, `PhoneNo`, `NicNo`, `Gender`, `Password`, `otp`, `rating`) VALUES
(44, 'admin', 'Admin', 'admin', 'Vithu0919@hmail.com', '0763915184', '200026303685', 'Male', '$2y$10$NHpw.BEtQLz84viY0pp/auZTNbDLEukKHKlOJ3MkxURjWRHLQGT8e', NULL, 0),
(58, 'cst21019', 'Shoumiya', 'driver', 'cst21019@std.uwu.ac.lk', '0763915184', '20014567897', 'Male', '$2y$10$PKh8IHUnys.j74ZKBwnlnOwc9K6lQq.MzZqjUenLhzVLE/kmcP/Zu', NULL, 0),
(59, 'cst21013', 'Abiraj', 'driver', 'cst21013@std.uwu.ac.lk', '0763915184', '200026303685', 'Male', '$2y$10$V8xWGNOYbTaWPTTJJmfDZ.JYFMXcVGw19S.ErbPHAtCUTZLQulGF6', NULL, 0),
(60, 'nithu', 'Nithusan', 'driver', 'cst21012@std.uwu.ac.lk', '0763915184', '200026303685', 'Male', '$2y$10$w4iLiTKlwbO8nwioxbXtQ.nO35.yuHYnvz1x3B0pnr0Aqh8Sv6mi6', NULL, 0),
(73, 'xxxx', 'xxxx', 'passenger', 'vithu0919@gmail.com', '12233445', 'dsfgfedfgdfg', 'Male', '$2y$10$4GN2LpOOfBek41sBTOOWMuWGvIuqFseBvZLpXJIsZT5kJk0cFdyKu', NULL, 0),
(74, 'demod', 'DemoDriver', 'passenger', 'cst21012@std.uwu.ac.lk', '0763915184', '200026303685', 'Male', '$2y$10$EsORjou/nZ0/2STJwzm7ruFHNOcpBcdkeRIgPfFKbBWg//sq2BFGu', NULL, 0),
(75, 'demop', 'DemoPassenger', 'passenger', 'vithu0919@gmail.com', '0763915184', '200123456789', 'Male', '$2y$10$J7T5VKFIuF4kfFz50c9oSuf7GIafhnWEFrzMK.TTM8.h4bjmNz2Ra', NULL, 0),
(76, 'unwanted', 'unwanted', 'passenger', 'vithusanrajah19@gmail.com', '0763915184', '200123456789', 'Female', '$2y$10$FLLKaTPYrNfce15NtYCRSeVTq3wmj.aUUSxQ1D42J.GGA.u1lC7XC', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_booking`
--
ALTER TABLE `tb_booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `RideID` (`RideID`),
  ADD KEY `PassengerID` (`PassengerID`),
  ADD KEY `fk_driverId` (`driverId`);

--
-- Indexes for table `tb_message`
--
ALTER TABLE `tb_message`
  ADD PRIMARY KEY (`messageID`);

--
-- Indexes for table `tb_ride`
--
ALTER TABLE `tb_ride`
  ADD PRIMARY KEY (`rideID`),
  ADD KEY `driverID` (`driverID`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_booking`
--
ALTER TABLE `tb_booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tb_message`
--
ALTER TABLE `tb_message`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `tb_ride`
--
ALTER TABLE `tb_ride`
  MODIFY `rideID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_booking`
--
ALTER TABLE `tb_booking`
  ADD CONSTRAINT `fk_driverId` FOREIGN KEY (`driverId`) REFERENCES `tb_user` (`User_ID`),
  ADD CONSTRAINT `tb_booking_ibfk_1` FOREIGN KEY (`RideID`) REFERENCES `tb_ride` (`rideID`),
  ADD CONSTRAINT `tb_booking_ibfk_2` FOREIGN KEY (`PassengerID`) REFERENCES `tb_user` (`User_ID`);

--
-- Constraints for table `tb_ride`
--
ALTER TABLE `tb_ride`
  ADD CONSTRAINT `tb_ride_ibfk_1` FOREIGN KEY (`driverID`) REFERENCES `tb_user` (`User_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
