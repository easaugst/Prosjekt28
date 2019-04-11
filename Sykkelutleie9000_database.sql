-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 11, 2019 at 11:58 AM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g_idri1005_28`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bestilling`
--

CREATE TABLE `Bestilling` (
  `bestillingsid` int(5) UNSIGNED ZEROFILL NOT NULL,
  `kundenr` int(5) NOT NULL,
  `ansattnr` int(4) NOT NULL,
  `status` varchar(25) COLLATE latin1_danish_ci NOT NULL DEFAULT 'Aktiv',
  `utleiested` varchar(25) COLLATE latin1_danish_ci DEFAULT NULL,
  `utleietype` varchar(22) COLLATE latin1_danish_ci NOT NULL,
  `kontant` varchar(7) COLLATE latin1_danish_ci NOT NULL,
  `btid` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ftid` datetime NOT NULL,
  `ttid` datetime NOT NULL,
  `gruppe` varchar(6) COLLATE latin1_danish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FastAnsatt`
--

CREATE TABLE `FastAnsatt` (
  `ansattnr` int(3) NOT NULL,
  `tlfnr` int(8) NOT NULL,
  `epost` varchar(30) COLLATE latin1_danish_ci NOT NULL,
  `fnavn` varchar(15) COLLATE latin1_danish_ci NOT NULL,
  `enavn` varchar(15) COLLATE latin1_danish_ci NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `utleienavn` varchar(50) COLLATE latin1_danish_ci DEFAULT NULL,
  `stilling` varchar(20) COLLATE latin1_danish_ci DEFAULT NULL,
  `pwd` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL DEFAULT 'sykkel'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Kunde`
--

CREATE TABLE `Kunde` (
  `kundenr` int(5) UNSIGNED ZEROFILL NOT NULL,
  `fnavn` varchar(50) COLLATE latin1_danish_ci NOT NULL,
  `enavn` varchar(50) COLLATE latin1_danish_ci NOT NULL,
  `epost` varchar(50) COLLATE latin1_danish_ci NOT NULL,
  `tlf` int(8) NOT NULL,
  `rtid` datetime DEFAULT CURRENT_TIMESTAMP,
  `fdag` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Lokasjon`
--

CREATE TABLE `Lokasjon` (
  `postnr` int(4) NOT NULL,
  `poststed` varchar(20) COLLATE latin1_danish_ci NOT NULL,
  `adresse` varchar(50) COLLATE latin1_danish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Pris`
--

CREATE TABLE `Pris` (
  `type` int(4) NOT NULL,
  `dagspris` int(5) NOT NULL,
  `time` int(4) DEFAULT NULL,
  `tredagers` int(4) DEFAULT NULL,
  `uke` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Sykkel`
--

CREATE TABLE `Sykkel` (
  `regnr` int(4) UNSIGNED ZEROFILL NOT NULL,
  `sykkeltypeid` int(1) NOT NULL,
  `befinnelse` varchar(20) COLLATE latin1_danish_ci NOT NULL,
  `status` varchar(20) COLLATE latin1_danish_ci NOT NULL,
  `gir` int(2) DEFAULT NULL,
  `ramme` varchar(25) COLLATE latin1_danish_ci DEFAULT NULL,
  `hjul` int(11) DEFAULT NULL,
  `beskrivelse` varchar(50) COLLATE latin1_danish_ci NOT NULL,
  `bestillingsid` int(5) DEFAULT NULL,
  `utleienavn` varchar(20) COLLATE latin1_danish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ubestilling`
--

CREATE TABLE `Ubestilling` (
  `ubid` int(4) UNSIGNED ZEROFILL NOT NULL,
  `regnr` int(5) DEFAULT NULL,
  `utstyrsid` int(5) DEFAULT NULL,
  `detaljer` varchar(50) COLLATE latin1_danish_ci DEFAULT NULL,
  `bestillingsid` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Utleiested`
--

CREATE TABLE `Utleiested` (
  `utleienavn` varchar(20) COLLATE latin1_danish_ci NOT NULL,
  `postnr` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Utleietype`
--

CREATE TABLE `Utleietype` (
  `utid` int(11) NOT NULL,
  `utnavn` varchar(30) COLLATE latin1_danish_ci NOT NULL,
  `bagasjebrett` tinyint(1) DEFAULT NULL,
  `Kategori` varchar(20) COLLATE latin1_danish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Utstyr`
--

CREATE TABLE `Utstyr` (
  `utstyrsid` int(3) UNSIGNED ZEROFILL NOT NULL,
  `utstyrstypeid` int(2) DEFAULT NULL,
  `ustatus` varchar(50) COLLATE latin1_danish_ci DEFAULT NULL,
  `ubefinnelse` varchar(30) COLLATE latin1_danish_ci DEFAULT NULL,
  `utsutleienavn` varchar(30) COLLATE latin1_danish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_danish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Bestilling`
--
ALTER TABLE `Bestilling`
  ADD PRIMARY KEY (`bestillingsid`);

--
-- Indexes for table `FastAnsatt`
--
ALTER TABLE `FastAnsatt`
  ADD PRIMARY KEY (`ansattnr`);

--
-- Indexes for table `Kunde`
--
ALTER TABLE `Kunde`
  ADD PRIMARY KEY (`kundenr`);

--
-- Indexes for table `Lokasjon`
--
ALTER TABLE `Lokasjon`
  ADD PRIMARY KEY (`postnr`);

--
-- Indexes for table `Pris`
--
ALTER TABLE `Pris`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `Sykkel`
--
ALTER TABLE `Sykkel`
  ADD PRIMARY KEY (`regnr`);

--
-- Indexes for table `Ubestilling`
--
ALTER TABLE `Ubestilling`
  ADD PRIMARY KEY (`ubid`);

--
-- Indexes for table `Utleiested`
--
ALTER TABLE `Utleiested`
  ADD PRIMARY KEY (`utleienavn`),
  ADD KEY `postnr` (`postnr`);

--
-- Indexes for table `Utleietype`
--
ALTER TABLE `Utleietype`
  ADD PRIMARY KEY (`utid`);

--
-- Indexes for table `Utstyr`
--
ALTER TABLE `Utstyr`
  ADD PRIMARY KEY (`utstyrsid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Bestilling`
--
ALTER TABLE `Bestilling`
  MODIFY `bestillingsid` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FastAnsatt`
--
ALTER TABLE `FastAnsatt`
  MODIFY `ansattnr` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Kunde`
--
ALTER TABLE `Kunde`
  MODIFY `kundenr` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Sykkel`
--
ALTER TABLE `Sykkel`
  MODIFY `regnr` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Ubestilling`
--
ALTER TABLE `Ubestilling`
  MODIFY `ubid` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Utstyr`
--
ALTER TABLE `Utstyr`
  MODIFY `utstyrsid` int(3) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Utleiested`
--
ALTER TABLE `Utleiested`
  ADD CONSTRAINT `Utleiested_ibfk_1` FOREIGN KEY (`postnr`) REFERENCES `Lokasjon` (`postnr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
