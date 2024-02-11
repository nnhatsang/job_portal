-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: job_portal_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `administrator` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Full_Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `User_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `User_ID` (`User_ID`),
  CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'nnhatsang','nhatsang@gmail.com',0,1);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Full_Name` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `City_ID` int(11) DEFAULT NULL,
  `Avatar` varchar(300) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Degree` varchar(45) DEFAULT NULL,
  `Major` varchar(45) DEFAULT NULL,
  `Sex` varchar(45) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  KEY `User_ID` (`User_ID`),
  KEY `City_ID` (`City_ID`),
  CONSTRAINT `candidate_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`),
  CONSTRAINT `candidate_ibfk_2` FOREIGN KEY (`City_ID`) REFERENCES `city` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (2,'ddddd','nhatsang@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,0),(3,'ddddd','nhatsang1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,0),(4,'tesst11','tesst11@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,0),(5,'caoduy','caoduuy@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,0),(6,'thanhtruc','thanhtruc@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,11,0);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_company`
--

DROP TABLE IF EXISTS `candidate_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate_company` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Candidate_ID` int(11) DEFAULT NULL,
  `Company_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Candidate_ID` (`Candidate_ID`),
  KEY `Company_ID` (`Company_ID`),
  CONSTRAINT `candidate_company_ibfk_1` FOREIGN KEY (`Candidate_ID`) REFERENCES `candidate` (`ID`),
  CONSTRAINT `candidate_company_ibfk_2` FOREIGN KEY (`Company_ID`) REFERENCES `company` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_company`
--

LOCK TABLES `candidate_company` WRITE;
/*!40000 ALTER TABLE `candidate_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `candidate_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate_job`
--

DROP TABLE IF EXISTS `candidate_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `candidate_job` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Candidate_ID` int(11) DEFAULT NULL,
  `Job_ID` int(11) DEFAULT NULL,
  `CV_ID` int(11) DEFAULT NULL,
  `AppliedDate` date DEFAULT NULL,
  `IsLiked` tinyint(1) DEFAULT '0',
  `IsApplied` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Candidate_ID` (`Candidate_ID`),
  KEY `Job_ID` (`Job_ID`),
  KEY `CV_ID` (`CV_ID`),
  CONSTRAINT `candidate_job_ibfk_1` FOREIGN KEY (`Candidate_ID`) REFERENCES `candidate` (`ID`),
  CONSTRAINT `candidate_job_ibfk_2` FOREIGN KEY (`Job_ID`) REFERENCES `job` (`ID`),
  CONSTRAINT `candidate_job_ibfk_3` FOREIGN KEY (`CV_ID`) REFERENCES `curriculum_vitae` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate_job`
--

LOCK TABLES `candidate_job` WRITE;
/*!40000 ALTER TABLE `candidate_job` DISABLE KEYS */;
INSERT INTO `candidate_job` VALUES (4,3,2,3,'2024-02-11',1,0),(12,3,2,2,'2024-02-11',1,0);
/*!40000 ALTER TABLE `candidate_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `city` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Hà Nội'),(2,'Hồ Chí Minh'),(3,'Đà Nẵng');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Candidate_ID` int(11) DEFAULT NULL,
  `Company_ID` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Assessment` varchar(300) DEFAULT NULL,
  `CreatedDate` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Candidate_ID` (`Candidate_ID`),
  KEY `Company_ID` (`Company_ID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`Candidate_ID`) REFERENCES `candidate` (`ID`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`Company_ID`) REFERENCES `company` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (16,3,1,4,'hay','2024-02-08'),(17,3,1,4,'hay','2024-02-08'),(18,3,1,4,'hay','2024-02-09'),(19,5,2,3,'tedst1','2024-02-11'),(20,5,2,3,'tedst2','2024-02-11');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `City_ID` int(11) DEFAULT NULL,
  `Avatar` varchar(300) NOT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Ischecked` tinyint(1) NOT NULL DEFAULT '0',
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `User_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `User_ID` (`User_ID`),
  KEY `City_ID` (`City_ID`),
  CONSTRAINT `company_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`),
  CONSTRAINT `company_ibfk_2` FOREIGN KEY (`City_ID`) REFERENCES `city` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'SamSung Inc Thái nguyên','Tầng 7 - Tòa nhà DOJI Tower - Số 5 Lê Duẩn - Ba Đình',2,'https://res.cloudinary.com/hm-findingjob/image/upload/v1659538960/%E1%BA%A3nh%20c%E1%BB%A7a%20project%20finding%20job/ogimage_mqr8if.jpg','Công Ty Cổ Phần Kỹ Thuật Số SBC (Sao Băng) – Nhà bán lẻ máy in phun, máy in vải, vật tư ngành in ấn hàng đầu tại Việt Nam – chuyên phân phối máy in cao cấp của Mỹ, Nhật Bản , Đài Loan, Trung Quốc trong ngành Quảng cáo, xây dựng, kiến trúc, dệt may,…Công Ty Cổ Phần Kỹ Thuật Số SBC (Sao Băng) – Nhà bán lẻ máy in phun, máy in vải, vật tư ngành in ấn hàng đầu tại Việt Nam – chuyên phân phối máy in cao cấp của Mỹ, Nhật Bản , Đài Loan, Trung Quốc trong ngành Quảng cáo, xây dựng, kiến trúc, dệt may,…','anhminh1234@gmail.com',1,0,1),(2,'mgm technology partners Vietnam','Tầng 4 - Tòa nhà DOJI Tower - Số 5 Lê Duẩn - Ba Đình',2,'https://res.cloudinary.com/hm-findingjob/image/upload/v1659538762/%E1%BA%A3nh%20c%E1%BB%A7a%20project%20finding%20job/mgm-technology-partners-vietnam-logo_sw8wbv.png','Phấn đấu , nỗ lực , thành công','quanghieulk122@gmail.com',1,0,2),(3,'MB BANK','Tầng 9 - Tòa nhà DOJI Tower - Số 5 Lê Duẩn - Ba Đình',1,'https://res.cloudinary.com/hm-findingjob/image/upload/v1661758333/%E1%BA%A3nh%20c%E1%BB%A7a%20project%20finding%20job/Logo_20MB_20he_20mau_20RGB_2001_fjcsmr.png','Công Ty Cổ Phần Kỹ Thuật Số SBC (Sao Băng) – Nhà bán lẻ máy in phun, máy in vải, vật tư ngành in ấn hàng đầu tại Việt Nam – chuyên phân phối máy in cao cấp của Mỹ, Nhật Bản , Đài Loan, Trung Quốc trong ngành Quảng cáo, xây dựng, kiến trúc, dệt may,…','sang@gmail.com',1,0,1);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_vitae`
--

DROP TABLE IF EXISTS `curriculum_vitae`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `curriculum_vitae` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CareerGoals` varchar(500) DEFAULT NULL,
  `DegreeDetail` varchar(500) DEFAULT NULL,
  `ExperienceDetail` varchar(500) DEFAULT NULL,
  `Skill` varchar(100) DEFAULT NULL,
  `ForeignLanguage` varchar(200) DEFAULT NULL,
  `Candidate_ID` int(11) DEFAULT NULL,
  `CV_Link` varchar(100) DEFAULT NULL,
  `Is_Deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `Candidate_ID` (`Candidate_ID`),
  CONSTRAINT `curriculum_vitae_ibfk_1` FOREIGN KEY (`Candidate_ID`) REFERENCES `candidate` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_vitae`
--

LOCK TABLES `curriculum_vitae` WRITE;
/*!40000 ALTER TABLE `curriculum_vitae` DISABLE KEYS */;
INSERT INTO `curriculum_vitae` VALUES (1,'1','1','11','1','1',3,'1',0),(2,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(3,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(4,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(5,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(6,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(7,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(8,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(9,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(10,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(11,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(12,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(13,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(14,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(15,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(16,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(17,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(18,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(19,'YourCareerGoals','YourDegreeDetail',NULL,NULL,NULL,2,NULL,0),(20,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(21,NULL,NULL,NULL,NULL,NULL,3,NULL,0),(22,NULL,NULL,NULL,NULL,NULL,5,NULL,0);
/*!40000 ALTER TABLE `curriculum_vitae` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `job` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Company_ID` int(11) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `SalaryFrom` decimal(20,0) DEFAULT NULL,
  `SalaryTo` decimal(20,0) DEFAULT NULL,
  `AgeFrom` int(11) DEFAULT NULL,
  `AgeTo` int(11) DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `CreateDate` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `IsChecked` tinyint(1) DEFAULT '0',
  `DegreeRequired` varchar(200) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `SexRequired` varchar(100) DEFAULT NULL,
  `ProbationaryPriod` int(11) DEFAULT NULL,
  `Benefit` varchar(500) DEFAULT NULL,
  `Position` varchar(100) DEFAULT NULL,
  `Type` varchar(100) DEFAULT NULL,
  `City_ID` int(11) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `ExperienceRequired` int(11) DEFAULT NULL,
  `JobRequired` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Company_ID` (`Company_ID`),
  KEY `City_ID` (`City_ID`),
  CONSTRAINT `job_ibfk_1` FOREIGN KEY (`Company_ID`) REFERENCES `company` (`ID`),
  CONSTRAINT `job_ibfk_2` FOREIGN KEY (`City_ID`) REFERENCES `city` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,1,'Chuyên viên Content digital marketing 1','-Phối hợp với phòng Marketing để lên kế hoạch content chi tiết cho Fanpages của công ty. Xây dựng nội dung – viết bài chăm sóc Fanpage, website…',15,20,20,23,'2024-12-12','2024-01-20',1,1,'Đại học',0,'all',2,'Thưởng lương tháng 13','Intern','Full time',1,'Tầng 9 Cnter town , Quận 1',12,'Work from 9AM to 6PM'),(2,3,'Chuyên viên Content digital marketing 2 ','-Phối hợp với phòng Marketing để lên kế hoạch content chi tiết cho Fanpages của công ty. Xây dựng nội dung – viết bài chăm sóc Fanpage, website…',12,18,27,24,'2024-12-19','2024-01-20',3,1,'Cao Học',0,'all',3,'Thưởng lương tháng 13','Fresher','Nhân viên chính thức',2,'Tầng 9 Cnter town , Quận 1',3,'Work from 9AM to 6PM'),(3,3,'Chuyên viên Content digital marketing 2 ','-Phối hợp với phòng Marketing để lên kế hoạch content chi tiết cho Fanpages của công ty. Xây dựng nội dung – viết bài chăm sóc Fanpage, website…',42,18,27,24,'2024-12-19','2024-01-20',3,1,'Cao Học',0,'all',3,'Thưởng lương tháng 13','Fresher','Nhân viên chính thức',2,'Tầng 9 Cnter town , Quận 1',3,'Work from 9AM to 6PM');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_major`
--

DROP TABLE IF EXISTS `job_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `job_major` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Job_ID` int(11) DEFAULT NULL,
  `Major_ID` int(11) DEFAULT NULL,
  `Point` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Job_ID` (`Job_ID`),
  KEY `Major_ID` (`Major_ID`),
  CONSTRAINT `job_major_ibfk_1` FOREIGN KEY (`Job_ID`) REFERENCES `job` (`ID`),
  CONSTRAINT `job_major_ibfk_2` FOREIGN KEY (`Major_ID`) REFERENCES `major` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_major`
--

LOCK TABLES `job_major` WRITE;
/*!40000 ALTER TABLE `job_major` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `major` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(3,'Candidate'),(2,'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `RegisterDate` date DEFAULT NULL,
  `UserRole_ID` int(11) DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `UserRole_ID` (`UserRole_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`UserRole_ID`) REFERENCES `role` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ADMIN','$2a$10$mvp39XVap64nUs1uHrhDZ.R6euukbZuZlM9HYI5XJR2vjzxYux3Em',NULL,1,0,NULL),(2,'tesst1','$2b$10$etQJdgaylUwhCSCx0i/kNOMpm1wErzsnY6kmygM3hG2RljwgtevOu','2024-02-04',3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcwNzIxNzIzOCwiZXhwIjoxNzA3MzAzNjM4fQ.yw2svN1fxnuNdL0OO1QeZ0CQQyzO2SggskQuYJcR_WI'),(7,'nhatsang','$argon2id$v=19$m=65536,t=3,p=4$d6LvZ6+ibMFGinYvaZou5A$q5Leqjestq1G2mD2MvVU5X9jLB7x9EZ6TSMM90/YRE8','2024-02-07',2,0,NULL),(8,'nhatsang1','$argon2id$v=19$m=65536,t=3,p=4$9LFedieSYCXqxKqnwtkFJw$KJMzfXPrc0gE3c5Nt/PMVXzzNwnhWuG/+TBw7ODunGU','2024-02-07',3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsInVzZXJJZCI6OCwidXNlcm5hbWUiOiJuaGF0c2FuZzEiLCJjYW5kaWRhdGVJRCI6MywiaWF0IjoxNzA3NjQ3OTkzLCJleHAiOjE3OTQwNDc5OTN9.niMVfRN2OYnafx10oWoo0lZAKoChMcVUXPmrZwfwru0'),(9,'tesst11','$argon2id$v=19$m=65536,t=3,p=4$NvgRDUZ+q2xHrPb46eULXA$rBuXGFoyqRmLZNuD2AN+bvlwx2yxxoYkxvYB/vcw1jc','2024-02-09',3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsInVzZXJJZCI6OSwidXNlcm5hbWUiOiJ0ZXNzdDExIiwiY2FuZGlkYXRlSUQiOjQsImlhdCI6MTcwNzQ3NzAzMywiZXhwIjoxNzkzODc3MDMzfQ.10rJOMeLwJ5yAjh-JtQ0AZjV3C1oIClQXjfQoXulFIw'),(10,'caoduy','$argon2id$v=19$m=65536,t=3,p=4$BZDm8fMJ0Kw5J25mjCMvrg$xKN3R21OGcEKVJpBpSP3DWmaKT1CuJZgy60jTI5+2F0','2024-02-11',3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsInVzZXJJZCI6MTAsInVzZXJuYW1lIjoiY2FvZHV5IiwiY2FuZGlkYXRlSUQiOjUsImlhdCI6MTcwNzY0NzUwMSwiZXhwIjoxNzk0MDQ3NTAxfQ.mlA8oRdKH48eMhuY7-oSrzqdA4kqkhdqeDFe4ZpKwEw'),(11,'thanhtruc','$argon2id$v=19$m=65536,t=3,p=4$LTtk9Wwxj3jhYpa80dxZgA$JPSUVqXEnGvIEDRNW88lIiC9O4HCaVVHqFLycflcHa4','2024-02-11',3,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsInVzZXJJZCI6MTEsInVzZXJuYW1lIjoidGhhbmh0cnVjIiwiY2FuZGlkYXRlSUQiOjYsImlhdCI6MTcwNzY0NzkzMywiZXhwIjoxNzk0MDQ3OTMzfQ.s8LUHKYs9BznnfwRXEXLON8czjp5EtLS5HGD_4UMKGQ');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 17:47:30
