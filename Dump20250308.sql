CREATE DATABASE  IF NOT EXISTS `contest_system_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `contest_system_db`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: contest_system_db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apiuri`
--

DROP TABLE IF EXISTS `apiuri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apiuri` (
  `uriid` int NOT NULL AUTO_INCREMENT,
  `uri` varchar(100) NOT NULL,
  `auth_required` tinyint DEFAULT NULL,
  PRIMARY KEY (`uriid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apiuri`
--

LOCK TABLES `apiuri` WRITE;
/*!40000 ALTER TABLE `apiuri` DISABLE KEYS */;
INSERT INTO `apiuri` VALUES (8,'/api/auth/register',0),(9,'/api/auth/login',0),(10,'/api/contest/list',0),(11,'/api/contest/create',1),(12,'/api/contest/details',1),(13,'/api/contest/join',1),(14,'/api/contest/submit',1),(15,'/api/contest/leaderboard',1),(16,'/api/user/details',1);
/*!40000 ALTER TABLE `apiuri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appsettings`
--

DROP TABLE IF EXISTS `appsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appsettings` (
  `key` longtext,
  `value` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appsettings`
--

LOCK TABLES `appsettings` WRITE;
/*!40000 ALTER TABLE `appsettings` DISABLE KEYS */;
INSERT INTO `appsettings` VALUES ('APP_KEY','GcaGnYaKhT'),('APP_SECRET','wKNGbQ8y7c');
/*!40000 ALTER TABLE `appsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_participants`
--

DROP TABLE IF EXISTS `contest_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contest_participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `contest_id` int NOT NULL,
  `score` int DEFAULT '0',
  `submitted_at` datetime DEFAULT NULL,
  `joined_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `contest_id` (`contest_id`),
  CONSTRAINT `contest_participants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `contest_participants_ibfk_2` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_participants`
--

LOCK TABLES `contest_participants` WRITE;
/*!40000 ALTER TABLE `contest_participants` DISABLE KEYS */;
INSERT INTO `contest_participants` VALUES (1,15,9,0,NULL,'2025-03-07 17:11:22',NULL),(2,15,8,0,NULL,'2025-03-07 17:16:39',NULL),(4,15,10,0,NULL,'2025-03-08 02:13:08','2025-03-08 02:15:33'),(5,15,11,0,NULL,'2025-03-08 02:18:56','2025-03-08 02:24:07'),(6,15,12,2,NULL,'2025-03-08 03:37:53','2025-03-08 03:42:57');
/*!40000 ALTER TABLE `contest_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reference` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `contest_type` enum('normal','vip') NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `prize` varchar(255) DEFAULT NULL,
  `isActive` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_UNIQUE` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
INSERT INTO `contests` VALUES (1,'40efe5de-facf-11ef-94ed-f48e38f9d74e','Spring Championship','A seasonal competition for top players.','normal','2025-04-01 10:00:00','2025-04-07 23:59:59','$5000 Cash Prize',1,16,'2025-03-06 21:09:12.000000',NULL),(2,'546ceaa6-facf-11ef-94ed-f48e38f9d74e','Winter Championship','A seasonal competition for top players.','normal','2025-05-01 10:00:00','2025-05-07 23:59:59','$10000 Cash Prize',1,16,'2025-03-06 21:09:45.000000',NULL),(3,'5fcc0b86-facf-11ef-94ed-f48e38f9d74e','Summer Championship','A seasonal competition for top players.','normal','2025-08-01 10:00:00','2025-08-07 23:59:59','$15000 Cash Prize',1,16,'2025-03-06 21:10:04.000000',NULL),(4,'ae978e2d-fad8-11ef-94ed-f48e38f9d74e','Math Challenge Updated','Updated math skills test','vip','2025-03-11 14:00:00','2025-03-11 16:00:00','$150 Gift Card',1,16,'2025-03-06 06:30:00.000000','2025-03-06 08:30:00.000000'),(5,'4bc73248-fada-11ef-94ed-f48e38f9d74e','Math Challenge','Test your math skills','normal','2025-03-10 10:00:00','2025-03-10 12:00:00','$100 Gift Card',1,16,'2025-03-06 06:30:00.000000',NULL),(6,'82ae12d8-fadc-11ef-94ed-f48e38f9d74e','Math Challenge','Test your math skills','normal','2025-03-10 10:00:00','2025-03-10 12:00:00','$100 Gift Card',1,16,'2025-03-06 06:30:00.000000',NULL),(7,'b71c58ae-fae8-11ef-94ed-f48e38f9d74e','Beauty Challenge','Test your Beauty skills','normal','2025-03-10 10:00:00','2025-03-10 12:00:00','664.67 Gift Card',1,17,'2025-03-06 22:41:22.000000',NULL),(8,'2c477d30-fae9-11ef-94ed-f48e38f9d74e','Clothing Challenge','Test your Shoes skills','normal','2025-03-10 10:00:00','2025-03-10 12:00:00','413.91 Gift Card',1,17,'2025-03-06 22:44:42.000000',NULL),(9,'372e052a-fae9-11ef-94ed-f48e38f9d74e','Tools Challenge','Test your Movies skills','normal','2025-03-10 10:00:00','2025-03-10 12:00:00','81.27 Gift Card',1,17,'2025-03-06 22:45:03.000000',NULL),(10,'27999239-fba1-11ef-94ed-f48e38f9d74e','Toys Challenge','Test your Movies skills','normal','2025-03-01 10:00:00','2025-03-10 12:00:00','509.24 Gift Card',1,17,'2025-03-07 20:41:44.000000',NULL),(11,'1889f5e3-fba2-11ef-94ed-f48e38f9d74e','Clothing Challenge','Test your Shoes skills','normal','2025-03-01 10:00:00','2025-03-10 12:00:00','848.33 Gift Card',1,17,'2025-03-07 20:48:28.000000',NULL),(12,'0f892af9-fbad-11ef-94ed-f48e38f9d74e','Sports Challenge','Test your Beauty skills','normal','2025-03-01 10:00:00','2025-03-10 12:00:00','931.36 Gift Card',1,17,'2025-03-07 22:06:58.000000',NULL);
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaderboard`
--

DROP TABLE IF EXISTS `leaderboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contest_id` int NOT NULL,
  `user_id` int NOT NULL,
  `score` int NOT NULL,
  `rank` int NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contest_id` (`contest_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `leaderboard_ibfk_1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`),
  CONSTRAINT `leaderboard_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaderboard`
--

LOCK TABLES `leaderboard` WRITE;
/*!40000 ALTER TABLE `leaderboard` DISABLE KEYS */;
INSERT INTO `leaderboard` VALUES (1,12,15,2,1,'2025-03-08 03:42:57');
/*!40000 ALTER TABLE `leaderboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `option_text` varchar(255) NOT NULL,
  `is_correct` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,5,'3',0),(2,5,'4',1),(3,5,'5',0),(4,6,'1',0),(5,6,'2',1),(6,6,'3',0),(7,6,'4',1),(8,8,'3',0),(9,8,'4',1),(10,8,'5',0),(11,9,'1',0),(12,9,'2',1),(13,9,'3',0),(14,9,'4',1),(15,10,'True',1),(16,10,'False',0),(17,11,'backing up',0),(18,11,'synthesizing',1),(19,11,'connecting',0),(20,12,'True',1),(21,12,'False',0),(22,13,'hacking',0),(23,13,'parsing',1),(24,13,'calculating',0),(25,14,'True',1),(26,14,'False',0),(27,15,'backing up',0),(28,15,'backing up',1),(29,15,'compressing',0),(30,16,'True',1),(31,16,'False',0),(32,17,'parsing',0),(33,17,'calculating',1),(34,17,'quantifying',0),(35,18,'True',1),(36,18,'False',0),(37,19,'backing up',0),(38,19,'quantifying',1),(39,19,'programming',0),(40,20,'True',1),(41,20,'False',0),(42,21,'compressing',0),(43,21,'backing up',1),(44,21,'synthesizing',0),(45,22,'True',1),(46,22,'False',0);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prizes_won`
--

DROP TABLE IF EXISTS `prizes_won`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prizes_won` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `contest_id` int NOT NULL,
  `prize` varchar(255) NOT NULL,
  `awarded_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `contest_id` (`contest_id`),
  CONSTRAINT `prizes_won_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `prizes_won_ibfk_2` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prizes_won`
--

LOCK TABLES `prizes_won` WRITE;
/*!40000 ALTER TABLE `prizes_won` DISABLE KEYS */;
/*!40000 ALTER TABLE `prizes_won` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reference` varchar(45) NOT NULL,
  `contest_id` int NOT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('single','multiple','true_false') DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_UNIQUE` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (3,'d1d0784d-fad8-11ef-94ed-f48e38f9d74e',4,'What is 3 + 3?','single','2025-03-06 08:30:00.000000'),(4,'d1d092b3-fad8-11ef-94ed-f48e38f9d74e',4,'Is 7 a prime number?','true_false','2025-03-06 08:30:00.000000'),(5,'4bc83780-fada-11ef-94ed-f48e38f9d74e',5,'What is 2 + 2?','single','2025-03-06 06:30:00.000000'),(6,'4bc87428-fada-11ef-94ed-f48e38f9d74e',5,'Which numbers are even?','multiple','2025-03-06 06:30:00.000000'),(7,'4bc8a886-fada-11ef-94ed-f48e38f9d74e',5,'Is 5 a prime number?','true_false','2025-03-06 06:30:00.000000'),(8,'82af3ce1-fadc-11ef-94ed-f48e38f9d74e',6,'What is 2 + 2?','single','2025-03-06 06:30:00.000000'),(9,'82af926a-fadc-11ef-94ed-f48e38f9d74e',6,'Which numbers are even?','multiple','2025-03-06 06:30:00.000000'),(10,'82afc2cb-fadc-11ef-94ed-f48e38f9d74e',6,'Is 5 a prime number?','true_false','2025-03-06 06:30:00.000000'),(11,'b71d6f23-fae8-11ef-94ed-f48e38f9d74e',7,'What is enable?','single','2025-03-06 22:41:22.000000'),(12,'b71d9902-fae8-11ef-94ed-f48e38f9d74e',7,'Is 596 a prime number?','true_false','2025-03-06 22:41:22.000000'),(13,'2c487891-fae9-11ef-94ed-f48e38f9d74e',8,'What is leverage?','single','2025-03-06 22:44:42.000000'),(14,'2c48994a-fae9-11ef-94ed-f48e38f9d74e',8,'Is 335 a prime number?','true_false','2025-03-06 22:44:42.000000'),(15,'372f05b6-fae9-11ef-94ed-f48e38f9d74e',9,'What is envisioneer?','single','2025-03-06 22:45:03.000000'),(16,'372f3421-fae9-11ef-94ed-f48e38f9d74e',9,'Is 587 a prime number?','true_false','2025-03-06 22:45:03.000000'),(17,'279aaeef-fba1-11ef-94ed-f48e38f9d74e',10,'What is morph?','single','2025-03-07 20:41:44.000000'),(18,'279b44e2-fba1-11ef-94ed-f48e38f9d74e',10,'Is 463 a prime number?','true_false','2025-03-07 20:41:44.000000'),(19,'188aec11-fba2-11ef-94ed-f48e38f9d74e',11,'What is harness?','single','2025-03-07 20:48:28.000000'),(20,'188b0ab2-fba2-11ef-94ed-f48e38f9d74e',11,'Is 154 a prime number?','true_false','2025-03-07 20:48:28.000000'),(21,'0f8ae51d-fbad-11ef-94ed-f48e38f9d74e',12,'What is whiteboard?','single','2025-03-07 22:06:58.000000'),(22,'0f8b6e60-fbad-11ef-94ed-f48e38f9d74e',12,'Is 314 a prime number?','true_false','2025-03-07 22:06:58.000000');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contest_id` int NOT NULL,
  `user_id` int NOT NULL,
  `question_id` int NOT NULL,
  `option_id` int NOT NULL,
  `submitted_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contest_id` (`contest_id`,`user_id`,`question_id`),
  KEY `user_id` (`user_id`),
  KEY `question_id` (`question_id`),
  KEY `option_id` (`option_id`),
  CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`),
  CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `user_answers_ibfk_4` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
INSERT INTO `user_answers` VALUES (1,10,15,17,33,'2025-03-08 02:15:33'),(2,11,15,19,38,'2025-03-08 02:22:01'),(3,11,15,20,40,'2025-03-08 02:24:07'),(4,12,15,21,43,'2025-03-08 03:42:35'),(5,12,15,22,45,'2025-03-08 03:42:57');
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userloginlog`
--

DROP TABLE IF EXISTS `userloginlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userloginlog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `token` longtext,
  `role` enum('admin','vip','normal','guest') DEFAULT NULL,
  `inTime` varchar(45) DEFAULT NULL,
  `outTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userloginlog`
--

LOCK TABLES `userloginlog` WRITE;
/*!40000 ALTER TABLE `userloginlog` DISABLE KEYS */;
INSERT INTO `userloginlog` VALUES (1,15,'7674a2b6-fac0-11ef-94ed-f48e38f9d74e','normal','2025-03-06 23:23:10','2025-03-06 23:23:40'),(2,15,'850fd78a-fac0-11ef-94ed-f48e38f9d74e','normal','2025-03-06 23:23:40','2025-03-06 23:23:51'),(3,15,'8ac2a1fc-fac0-11ef-94ed-f48e38f9d74e','normal','2025-03-06 23:23:51','2025-03-06 23:24:33'),(4,15,'a2a6a321-fac0-11ef-94ed-f48e38f9d74e','normal','2025-03-06 23:24:33',NULL),(5,17,'a16a954d-fae8-11ef-94ed-f48e38f9d74e','admin','2025-03-07 04:10:41','2025-03-08 14:20:21'),(6,18,'a2fa575a-fc04-11ef-94ed-f48e38f9d74e','admin','2025-03-08 14:03:51',NULL),(7,19,'bf4c22b3-fc04-11ef-94ed-f48e38f9d74e','admin','2025-03-08 14:04:39',NULL),(8,17,'f1136852-fc06-11ef-94ed-f48e38f9d74e','admin','2025-03-08 14:20:21','2025-03-08 14:23:45'),(9,17,'6abc6746-fc07-11ef-94ed-f48e38f9d74e','admin','2025-03-08 14:23:45','2025-03-08 15:58:31'),(10,20,'3733538e-fc09-11ef-94ed-f48e38f9d74e','admin','2025-03-08 14:36:38',NULL),(11,17,'a79284b4-fc14-11ef-94ed-f48e38f9d74e','admin','2025-03-08 15:58:31',NULL);
/*!40000 ALTER TABLE `userloginlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reference` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','vip','normal','guest') DEFAULT 'guest',
  `isActive` tinyint DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference_UNIQUE` (`reference`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'98f3ec4b-fab6-11ef-94ed-f48e38f9d74e','Katie Schowalter','Kayley_Mraz26@yahoo.com','$2b$10$2HMID.Av/NQGUEnPDh0utu9lPTB9m1q1g/t2ZMeaYeHYUxpDJ1DZa','vip',1,'2025-03-06 12:45:18.000000',NULL),(2,'98f4dc93-fab6-11ef-94ed-f48e38f9d74e','Rufus Ledner','Lyda.Veum@hotmail.com','$2b$10$/0BVHCX0yyhhNAqL1E9m8eHVe8UxFwTHSbxd2COy18PCwni.hNNjO','vip',1,'2025-03-06 12:48:01.000000',NULL),(3,'98f4e3ba-fab6-11ef-94ed-f48e38f9d74e','Sylvester Haag','Soledad.Stark85@yahoo.com','$2b$10$9bJwTOgZAk9LpVPcQCRRFOLZennzWiAGsNdxxSl2549EDKmQ1mEG2','normal',1,'2025-03-06 12:49:02.000000',NULL),(4,'98f4e833-fab6-11ef-94ed-f48e38f9d74e','Mercedes Ziemann','Mason_Marquardt@yahoo.com','$2b$10$7LamKtJc1WTe7RiJAEALMOdYugEsjUWvEC5oMFCzImL5K0VcKKnVO','normal',1,'2025-03-06 16:20:46.000000',NULL),(5,'98f4f1e0-fab6-11ef-94ed-f48e38f9d74e','Geoffrey Casper','Lupe_Rodriguez33@gmail.com','$2b$10$NGMeXlBxkp51il0qjnyOduPUvvnkgIqj0O1CpYLVHapaLpN1HtFya','normal',1,'2025-03-06 16:21:37.000000',NULL),(6,'98f4f5f4-fab6-11ef-94ed-f48e38f9d74e','Woodrow Reichel','Ted_Hyatt34@gmail.com','$2b$10$zZaNcr9ywmh7/1ue3uwMdu1O6LUA2eY.mTO.tfjngmFOg.zCm9rEC','normal',1,'2025-03-06 16:24:59.000000',NULL),(7,'98f4f98b-fab6-11ef-94ed-f48e38f9d74e','Ralph Russel','Kyle35@hotmail.com','$2b$10$kbjKvRdnoukQORsY9unyb.oKS6NKNNZ9OSR3CzO2pd9ohrwLriE5W','normal',1,'2025-03-06 16:26:27.000000',NULL),(8,'98f50cff-fab6-11ef-94ed-f48e38f9d74e','Luke Hauck','Lura_Lockman18@gmail.com','$2b$10$Og/0hwY264SMGXVvf74kreouiT378uoEZUwoSpcqJX8p4rDEtIIUW','normal',1,'2025-03-06 16:26:41.000000',NULL),(9,'98f515a4-fab6-11ef-94ed-f48e38f9d74e','Mable Frami','Sven.Sawayn@hotmail.com','$2b$10$xHMali2TbyIWURasTaOKje.TsXSLnUsPsuxom3rNGqUYzDUih5gCi','normal',1,'2025-03-06 16:28:17.000000',NULL),(10,'98f5213e-fab6-11ef-94ed-f48e38f9d74e','Gina Bogan','Hannah_Greenholt@yahoo.com','$2b$10$G/y48Qe3QyEQE7k95Z3aOODN6H8WhA2VSoEpvPvRq2e65whbsjHkW','normal',1,'2025-03-06 16:28:42.000000',NULL),(11,'98f52a10-fab6-11ef-94ed-f48e38f9d74e','Monique Balistreri','Forrest_Greenholt93@yahoo.com','$2b$10$/FNaDzbETJ2MIdHbsR6Y.ed9/x6mMaIaklkEm29lm/t5nc/NoZQOG','normal',1,'2025-03-06 16:29:28.000000',NULL),(13,'98f53212-fab6-11ef-94ed-f48e38f9d74e','Testrian Braz','test_Greenholt93@yahoo.com','adsadasdadasdas','normal',1,'2025-03-06 16:29:31.000000',NULL),(14,'98f53a38-fab6-11ef-94ed-f48e38f9d74e','Marianna Belucci','Marianna72@gmail.com','$2b$10$Au52s541Q1/ZmumwYRwnTu78wOpBBecfNu.CLKmzWoJkLPtSn38C6','normal',1,'2025-03-06 16:37:30.000000',NULL),(15,'4745322d-fabf-11ef-94ed-f48e38f9d74e','Colleen Cole','Dante_Donnelly78@gmail.com','$2b$10$nT3093EFDGg.9GdhVVWmCuyN8uo1AAVRvCq9MawWISVQW76Shx.QK','normal',1,'2025-03-06 17:44:47.000000',NULL),(16,'f571c9e7-face-11ef-94ed-f48e38f9d74e','Mr. Julian Wiza','Enrico_Osinski@hotmail.com','$2b$10$MnzTJwXGe9SCuWTW5MJpK.choRs0Tps/kLg77.5lIXMaFFBT.g3ay','admin',1,'2025-03-06 19:37:01.000000',NULL),(17,'77ffad24-fae8-11ef-94ed-f48e38f9d74e','Tracy Blanda','Jaylin22@gmail.com','$2b$10$gmfpw1Q4Hu4pRmc1ijiyGuZ2vRwcZIiCe023f8LNIAwZXnziuOIcy','admin',1,'2025-03-06 22:39:36.000000',NULL),(18,'98ba63e7-fc04-11ef-94ed-f48e38f9d74e','Qalandar Sayed','qalsays.55@gmail.com','$2b$10$CMdbZRhTH5002YRsja1wQuGPpTBJ.NAZ.EU3NdpvzqQWIn6qbTWIe','admin',1,'2025-03-08 08:33:34.000000',NULL),(19,'b5bdfe0d-fc04-11ef-94ed-f48e38f9d74e','Halima Shaikh','halima@gmail.com','$2b$10$J32hfW4ffLNQcB23mqn2v.cWoOZiHTfT9O6gBrClBeRDPyTiSLRoO','admin',1,'2025-03-08 08:34:23.000000',NULL),(20,'2e9058ef-fc09-11ef-94ed-f48e38f9d74e','Kiran','kiran@gmail.com','$2b$10$c.OBkzhj7658CIRuGBDG..ovWux.GY8Qk7wjeaifMAKb9qBuj.o3a','admin',1,'2025-03-08 09:06:23.000000',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'contest_system_db'
--

--
-- Dumping routines for database 'contest_system_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_calculate_score_and_update_leaderboard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_calculate_score_and_update_leaderboard`(
    IN p_contest_id INT,
    IN p_user_id INT,
    IN p_current_timestamp DATETIME,
    OUT p_score INT
)
BEGIN
    DECLARE v_question_id INT;
    DECLARE v_correct_options INT;
    DECLARE v_user_selected INT;
    DECLARE v_user_correct INT;
    DECLARE done INT DEFAULT 0;

    DECLARE question_cursor CURSOR FOR
        SELECT DISTINCT q.id
        FROM questions q
        WHERE q.contest_id = p_contest_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    SET p_score = 0;

    OPEN question_cursor;

    question_loop: LOOP
        FETCH question_cursor INTO v_question_id;
        IF done THEN
            LEAVE question_loop;
        END IF;

        SELECT COUNT(*)
        INTO v_correct_options
        FROM options
        WHERE question_id = v_question_id AND is_correct = 1;

        SELECT COUNT(*)
        INTO v_user_selected
        FROM user_answers
        WHERE contest_id = p_contest_id
          AND user_id = p_user_id
          AND question_id = v_question_id;

        SELECT COUNT(*)
        INTO v_user_correct
        FROM user_answers ua
        JOIN options o ON ua.option_id = o.id
        WHERE ua.contest_id = p_contest_id
          AND ua.user_id = p_user_id
          AND ua.question_id = v_question_id
          AND o.is_correct = 1;

        IF EXISTS (SELECT 1 FROM questions WHERE id = v_question_id AND question_type = 'multiple') THEN
            IF v_user_selected = v_correct_options AND v_user_correct = v_correct_options THEN
                SET p_score = p_score + 1;
            END IF;
        ELSEIF v_user_correct = 1 THEN
            SET p_score = p_score + 1;
        END IF;
    END LOOP;

    CLOSE question_cursor;

    UPDATE contest_participants
    SET score = p_score,
        completed_at = p_current_timestamp
    WHERE contest_id = p_contest_id
      AND user_id = p_user_id;

    INSERT INTO leaderboard (contest_id, user_id, score, `rank`, updated_at)
    VALUES (p_contest_id, p_user_id, p_score, 0, p_current_timestamp)
    ON DUPLICATE KEY UPDATE
        score = p_score,
        updated_at = p_current_timestamp;

    UPDATE leaderboard l
    JOIN (
        SELECT contest_id, user_id, score,
               ROW_NUMBER() OVER (ORDER BY score DESC) AS new_rank
        FROM leaderboard
        WHERE contest_id = p_contest_id
    ) r ON l.contest_id = r.contest_id AND l.user_id = r.user_id
    SET l.rank = r.new_rank
    WHERE l.contest_id = p_contest_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_fetch_contest_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_fetch_contest_list`(
IN paramUserRole INT
)
BEGIN
DECLARE varUserRoleAdmin INT default 1;

START TRANSACTION;

IF paramUserRole=varUserRoleAdmin THEN

		SELECT 
        id ID, 
		reference ContestRef,
		name as ContestName,
		description Description,
		contest_type ContestType,
		start_time StartTime,
		end_time EndTime,
		prize Prize,
        created_by CreatedBy,
        created_at CreatedAt,
        updated_at UpdatedAt
		FROM contests c
        ORDER BY c.Id DESC;
                   
ELSE
	SELECT id ID, 
    reference ContestRef,
    name as ContestName,
    description Description,
    contest_type ContestType,
    start_time StartTime,
    end_time EndTime,
    prize Prize
    FROM contests c
    WHERE isActive = 1 ORDER BY c.Id DESC;

END IF;


		  	                    
                   
           
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_fetch_user_login_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_fetch_user_login_details`(
IN paramEmail VARCHAR(255)
)
BEGIN

DECLARE varRole INT DEFAULT 0;
DECLARE varUserID INT DEFAULT 0; 
DECLARE varUserRef VARCHAR(45) DEFAULT NULL;
DECLARE varEmail VARCHAR(255) DEFAULT NULL; 


SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

	SELECT 
    id,
    reference,
    email,
    role
    INTO varUserID, varUserRef, varEmail, varRole
    FROM `users` 
    WHERE email = paramEmail and IsActive = 1;

    IF varUserID = 0 THEN 
 			ROLLBACK;
             
 			SIGNAL SQLSTATE '10005'
 			SET MESSAGE_TEXT = 'Invalid User';
    END IF;
    


	SELECT 
    id,
    reference,
    `password` as passwordHash,
    role
    FROM users u
    WHERE id=varUserID;
    
 
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_get_app_settings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_get_app_settings`()
BEGIN

SELECT * FROM appsettings;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_get_contest_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_get_contest_details`(
    IN paramContestRef varchar(45)
)
BEGIN
    DECLARE varContestID INT DEFAULT 0;

    SELECT id INTO varContestID
    FROM contests
    WHERE reference = paramContestRef;

    IF varContestID = 0 THEN
        SIGNAL SQLSTATE '10005'
        SET MESSAGE_TEXT = 'Invalid Contest Ref';
    END IF;

    SELECT 
        id,
        reference,
        name,
        description,
        contest_type AS contestType,
        start_time AS startTime,
        end_time AS endTime,
        prize,
        isActive,
        created_by AS createdBy,
        created_at AS createdAt,
        updated_at AS updatedAt
    FROM contests
    WHERE id = varContestID;

    SELECT 
        q.id AS questionId,
        q.reference AS questionRef,
        q.question_text AS questionText,
        q.question_type AS questionType,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', o.id,
                'text', o.option_text,
                'isCorrect', o.is_correct
            )
        ) AS options
    FROM questions q
    LEFT JOIN options o ON q.id = o.question_id
    WHERE q.contest_id = varContestID
    GROUP BY q.id, q.reference, q.question_text, q.question_type;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_get_contest_leaderboard` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_get_contest_leaderboard`(
    IN paramContestRef varchar(45)
)
BEGIN
    DECLARE varContestID INT DEFAULT 0;

    SELECT id INTO varContestID
    FROM contests
    WHERE reference = paramContestRef;

    IF varContestID = 0 THEN
        SIGNAL SQLSTATE '10005'
        SET MESSAGE_TEXT = 'Invalid Contest ID';
    END IF;

    SELECT 
        l.rank,
        l.user_id AS userId,
        u.reference AS userRef,
        u.name AS userName,
        l.score,
        l.updated_at AS updatedAt
    FROM leaderboard l
    JOIN users u ON l.user_id = u.id
    WHERE l.contest_id = varContestID
    ORDER BY l.rank ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_get_user_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_get_user_details`(
    IN paramUserRef VARCHAR(45)
)
BEGIN
    DECLARE varUserId INT DEFAULT 0;

    SELECT id INTO varUserId
    FROM users
    WHERE reference = paramUserRef;

    IF varUserId = 0 THEN
        SIGNAL SQLSTATE '10006'
        SET MESSAGE_TEXT = 'Invalid User Reference';
    END IF;

    SELECT 
        id AS userId,
        reference AS userRef,
        name,
        email,
        role,
        isActive,
        created_at AS createdAt,
        updated_at AS updatedAt
    FROM users
    WHERE id = varUserId;

    SELECT 
        c.id AS contestId,
        c.reference AS contestRef,
        c.name AS contestName,
        c.contest_type AS contestType,
        c.start_time AS startTime,
        c.end_time AS endTime,
        cp.joined_at AS joinedAt,
        cp.completed_at AS completedAt,
        cp.score,
        l.rank
    FROM contest_participants cp
    JOIN contests c ON cp.contest_id = c.id
    LEFT JOIN leaderboard l ON l.contest_id = c.id AND l.user_id = varUserId
    WHERE cp.user_id = varUserId;

    SELECT 
        c.id AS contestId,
        c.reference AS contestRef,
        q.id AS questionId,
        q.reference AS questionRef,
        q.question_text AS questionText,
        q.question_type AS questionType,
        o.id AS optionId,
        o.option_text AS optionText,
        o.is_correct AS isCorrect,
        ua.submitted_at AS submittedAt
    FROM user_answers ua
    JOIN contests c ON ua.contest_id = c.id
    JOIN questions q ON ua.question_id = q.id
    JOIN options o ON ua.option_id = o.id
    WHERE ua.user_id = varUserId
    ORDER BY ua.submitted_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_join_contest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_join_contest`(
    IN paramContestRef VARCHAR(45),
    IN paramUserRef VARCHAR(45),
    IN paramCurrentTimestamp DATETIME
)
BEGIN
    DECLARE varContestId INT DEFAULT 0;
    DECLARE varUserId INT DEFAULT 0;
    DECLARE varContestType ENUM('normal', 'vip') DEFAULT NULL;
    DECLARE varStartTime DATETIME DEFAULT NULL;
    DECLARE varEndTime DATETIME DEFAULT NULL;
    DECLARE varUserRole ENUM('admin', 'vip', 'normal', 'guest') DEFAULT NULL;

    SELECT id, contest_type, start_time, end_time 
    INTO varContestId, varContestType, varStartTime, varEndTime
    FROM contests
    WHERE reference = paramContestRef and isActive = 1;

    IF varContestId = 0 THEN
        SIGNAL SQLSTATE '10005'
        SET MESSAGE_TEXT = 'Invalid Contest Reference';
    END IF;

    IF paramCurrentTimestamp < varStartTime THEN
        SIGNAL SQLSTATE '10018'
        SET MESSAGE_TEXT = 'Contest has not yet started';
    END IF;

    IF paramCurrentTimestamp > varEndTime THEN
        SIGNAL SQLSTATE '10019'
        SET MESSAGE_TEXT = 'Contest has already ended';
    END IF;

    SELECT id, role INTO varUserId, varUserRole
    FROM users
    WHERE reference = paramUserRef;

    IF varUserId = 0 THEN
        SIGNAL SQLSTATE '10006'
        SET MESSAGE_TEXT = 'Invalid User Reference';
    END IF;

    IF varContestType = 'vip' AND varUserRole NOT IN ('vip', 'admin') THEN
        SIGNAL SQLSTATE '10020'
        SET MESSAGE_TEXT = 'Only VIP or Admin users can join VIP contests';
    END IF;

    IF EXISTS (
        SELECT 1 FROM contest_participants
        WHERE contest_id = varContestId AND user_id = varUserId
    ) THEN
        SIGNAL SQLSTATE '10015'
        SET MESSAGE_TEXT = 'User already joined this contest';
    END IF;

    INSERT INTO contest_participants (user_id, contest_id, joined_at)
    VALUES (varUserId, varContestId, paramCurrentTimestamp);

    SELECT reference, name, contest_type AS contestType, start_time AS startTime, end_time AS endTime
    FROM contests
    WHERE id = varContestId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_register_and_save_user_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_register_and_save_user_details`(
IN paramReference varchar(45),
IN paramName varchar(255),
IN paramEmail varchar(255),
IN paramPassword varchar(255),
IN paramRole  int,
IN paramIsActive  int,
IN paramCurrentTs timestamp
)
BEGIN
DECLARE varUserId INT default 0; 
DECLARE varNewReference varchar(45) default uuid(); 


SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    
	SELECT 
    Id
INTO varUserId FROM
    users
WHERE
    Reference = paramReference; 
    

   IF paramReference is not null and varUserId = 0 THEN
       	ROLLBACK;             
 			SIGNAL SQLSTATE '10005'
 			SET MESSAGE_TEXT = 'Invalid Reference';
       
       END IF;
   
   
  IF  varUserId>0 THEN
   
   UPDATE users SET
   name=paramName,
   email=paramEmail,
   isActive=paramIsActive,
   updated_at=paramCurrentTs
   WHERE Id=varUserId;
   
SELECT 
    *
FROM
    users
WHERE
    Id = varUserId; 
 
 ELSE
 
 INSERT INTO users(reference,name,email,password,role,isActive,created_at)values
 (varNewReference,paramName,paramEmail,paramPassword,paramRole,paramIsActive,paramCurrentTs);
 
 SELECT 
    *
FROM
    users
WHERE
    reference = varNewReference; 

       
       END IF;
       
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_save_contest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_save_contest`(
    paramContestJSON LONGTEXT
)
BEGIN
    DECLARE varContestRef VARCHAR(45) DEFAULT NULL;
    DECLARE varContestId INT DEFAULT 0;
    DECLARE varQuestionListIndex INT DEFAULT 0;
    DECLARE varQuestionListCount INT DEFAULT 0;
    DECLARE varOptionListIndex INT DEFAULT 0;
    DECLARE varOptionListCount INT DEFAULT 0;
    DECLARE varCorrectCount INT DEFAULT 0;
    DECLARE varNewReference VARCHAR(45) DEFAULT UUID();
    DECLARE varCreatedByRef VARCHAR(45) DEFAULT NULL;
    DECLARE varCreatedById INT DEFAULT 0;
    DECLARE varUserRole ENUM('admin', 'vip', 'normal', 'guest') DEFAULT NULL;
    DECLARE varQuestionId INT DEFAULT 0;
    DECLARE varQuestionType ENUM('single', 'multiple', 'true_false') DEFAULT NULL;

    -- Set transaction settings
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

    -- Extract contest reference and createdBy reference from JSON
    SET varContestRef = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.reference'));
    SET varCreatedByRef = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.createdBy'));

    -- Get user ID and role based on reference
    SELECT id, role INTO varCreatedById, varUserRole
    FROM users
    WHERE reference = varCreatedByRef;

    -- Check if user exists and is admin
    IF varCreatedById IS NULL THEN
        ROLLBACK;
        SIGNAL SQLSTATE '10006'
        SET MESSAGE_TEXT = 'Invalid User Reference';
    END IF;

    IF varUserRole != 'admin' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '10007'
        SET MESSAGE_TEXT = 'Only admins can create or update contests';
    END IF;

    -- Check if contest exists by reference
    IF varContestRef IS NOT NULL AND varContestRef <> 'null' THEN
        SELECT id INTO varContestId 
        FROM contests 
        WHERE reference = varContestRef;

        IF varContestId = 0 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '10005'
            SET MESSAGE_TEXT = 'Invalid Contest Reference';
        END IF;
    END IF;

    -- Start transaction
    START TRANSACTION;

    -- Create new contest if no existing ID
    IF varContestId = 0 THEN
        INSERT INTO contests (
            reference,
            name,
            description,
            contest_type,
            start_time,
            end_time,
            prize,
            isActive,
            created_by,
            created_at
        ) VALUES (
            varNewReference,
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.name')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.description')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.contestType')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.startTime')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.endTime')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.prize')),
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.isActive')),
            varCreatedById,
            JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.currentTimestamp'))
        );

        -- Get the newly created contest ID
        SELECT id INTO varContestId FROM contests WHERE reference = varNewReference;

        -- Insert questions and their options
        SET varQuestionListCount = JSON_LENGTH(paramContestJSON, '$.questions');
        WHILE varQuestionListIndex < varQuestionListCount DO
            SET varQuestionType = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].questionType')));

            -- Insert question
            INSERT INTO questions (
                reference,
                contest_id,
                question_text,
                question_type,
                created_at
            ) VALUES (
                UUID(),
                varContestId,
                JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].questionText'))),
                varQuestionType,
                JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.currentTimestamp'))
            );

            -- Get the newly inserted question ID
            SELECT LAST_INSERT_ID() INTO varQuestionId;

            -- Get option count
            SET varOptionListCount = JSON_LENGTH(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options'));

            -- Validation: All questions need at least 2 options
            IF varOptionListCount < 2 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10008'
                SET MESSAGE_TEXT = 'All questions must have at least 2 options';
            END IF;

            -- Count correct options
            SET varCorrectCount = 0;
            SET varOptionListIndex = 0;
            WHILE varOptionListIndex < varOptionListCount DO
                IF JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].isCorrect'))) = 1 THEN
                    SET varCorrectCount = varCorrectCount + 1;
                END IF;
                SET varOptionListIndex = varOptionListIndex + 1;
            END WHILE;

            -- Validation: At least one correct option
            IF varCorrectCount = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10009'
                SET MESSAGE_TEXT = 'Questions must have at least one correct option';
            END IF;

            -- Validation for single: Exactly one correct option
            IF varQuestionType = 'single' AND varCorrectCount > 1 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10010'
                SET MESSAGE_TEXT = 'Single-choice questions must have exactly one correct option';
            END IF;

            -- Validation for true_false: Exactly 2 options, exactly one correct
            IF varQuestionType = 'true_false' THEN
                IF varOptionListCount != 2 THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10011'
                    SET MESSAGE_TEXT = 'True/False questions must have exactly 2 options';
                END IF;
                IF varCorrectCount != 1 THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10012'
                    SET MESSAGE_TEXT = 'True/False questions must have exactly one correct option';
                END IF;
                -- Check option text is "True" and "False" (case-insensitive)
                IF NOT (
                    EXISTS (
                        SELECT 1
                        FROM JSON_TABLE(
                            JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options')),
                            '$[*]' COLUMNS (opt_text VARCHAR(255) PATH '$.text')
                        ) AS jt
                        WHERE UPPER(opt_text) = 'TRUE'
                    ) AND EXISTS (
                        SELECT 1
                        FROM JSON_TABLE(
                            JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options')),
                            '$[*]' COLUMNS (opt_text VARCHAR(255) PATH '$.text')
                        ) AS jt
                        WHERE UPPER(opt_text) = 'FALSE'
                    )
                ) THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10013'
                    SET MESSAGE_TEXT = 'True/False questions must have options "True" and "False"';
                END IF;
            END IF;

            -- Insert options
            SET varOptionListIndex = 0;
            WHILE varOptionListIndex < varOptionListCount DO
                INSERT INTO options (
                    question_id,
                    option_text,
                    is_correct
                ) VALUES (
                    varQuestionId,
                    JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].text'))),
                    JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].isCorrect')))
                );
                SET varOptionListIndex = varOptionListIndex + 1;
            END WHILE;

            SET varQuestionListIndex = varQuestionListIndex + 1;
        END WHILE;

        -- Return the created contest
        SELECT * FROM contests WHERE reference = varNewReference;

    -- Update existing contest
    ELSEIF varContestId > 0 THEN
        UPDATE contests 
        SET 
            name = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.name')),
            description = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.description')),
            contest_type = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.contestType')),
            start_time = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.startTime')),
            end_time = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.endTime')),
            prize = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.prize')),
            isActive = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.isActive')),
            updated_at = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.currentTimestamp'))
        WHERE id = varContestId;

        -- Delete old questions and options
        DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE contest_id = varContestId);
        DELETE FROM questions WHERE contest_id = varContestId;

        -- Insert new questions and options
        SET varQuestionListCount = JSON_LENGTH(paramContestJSON, '$.questions');
        WHILE varQuestionListIndex < varQuestionListCount DO
            SET varQuestionType = JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].questionType')));

            -- Insert question
            INSERT INTO questions (
                reference,
                contest_id,
                question_text,
                question_type,
                created_at
            ) VALUES (
                UUID(),
                varContestId,
                JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].questionText'))),
                varQuestionType,
                JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, '$.currentTimestamp'))
            );

            -- Get the newly inserted question ID
            SELECT LAST_INSERT_ID() INTO varQuestionId;

            -- Get option count
            SET varOptionListCount = JSON_LENGTH(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options'));

            -- Validation: All questions need at least 2 options
            IF varOptionListCount < 2 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10008'
                SET MESSAGE_TEXT = 'All questions must have at least 2 options';
            END IF;

            -- Count correct options
            SET varCorrectCount = 0;
            SET varOptionListIndex = 0;
            WHILE varOptionListIndex < varOptionListCount DO
                IF JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].isCorrect'))) = 1 THEN
                    SET varCorrectCount = varCorrectCount + 1;
                END IF;
                SET varOptionListIndex = varOptionListIndex + 1;
            END WHILE;

            -- Validation: At least one correct option
            IF varCorrectCount = 0 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10009'
                SET MESSAGE_TEXT = 'Questions must have at least one correct option';
            END IF;

            -- Validation for single: Exactly one correct option
            IF varQuestionType = 'single' AND varCorrectCount > 1 THEN
                ROLLBACK;
                SIGNAL SQLSTATE '10010'
                SET MESSAGE_TEXT = 'Single-choice questions must have exactly one correct option';
            END IF;

            -- Validation for true_false: Exactly 2 options, exactly one correct
            IF varQuestionType = 'true_false' THEN
                IF varOptionListCount != 2 THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10011'
                    SET MESSAGE_TEXT = 'True/False questions must have exactly 2 options';
                END IF;
                IF varCorrectCount != 1 THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10012'
                    SET MESSAGE_TEXT = 'True/False questions must have exactly one correct option';
                END IF;
                -- Check option text is "True" and "False"
                IF NOT (
                    EXISTS (
                        SELECT 1
                        FROM JSON_TABLE(
                            JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options')),
                            '$[*]' COLUMNS (opt_text VARCHAR(255) PATH '$.text')
                        ) AS jt
                        WHERE UPPER(opt_text) = 'TRUE'
                    ) AND EXISTS (
                        SELECT 1
                        FROM JSON_TABLE(
                            JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options')),
                            '$[*]' COLUMNS (opt_text VARCHAR(255) PATH '$.text')
                        ) AS jt
                        WHERE UPPER(opt_text) = 'FALSE'
                    )
                ) THEN
                    ROLLBACK;
                    SIGNAL SQLSTATE '10013'
                    SET MESSAGE_TEXT = 'True/False questions must have options "True" and "False"';
                END IF;
            END IF;

            -- Insert options
            SET varOptionListIndex = 0;
            WHILE varOptionListIndex < varOptionListCount DO
                INSERT INTO options (
                    question_id,
                    option_text,
                    is_correct
                ) VALUES (
                    varQuestionId,
                    JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].text'))),
                    JSON_UNQUOTE(JSON_EXTRACT(paramContestJSON, CONCAT('$.questions[', varQuestionListIndex, '].options[', varOptionListIndex, '].isCorrect')))
                );
                SET varOptionListIndex = varOptionListIndex + 1;
            END WHILE;

            SET varQuestionListIndex = varQuestionListIndex + 1;
        END WHILE;

        -- Return the updated contest
        SELECT * FROM contests WHERE id = varContestId;
    END IF;

    -- Commit transaction
    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_submit_contest_answers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_submit_contest_answers`(
    IN paramContestRef VARCHAR(45),
    IN paramUserRef VARCHAR(45),
    IN paramAnswersJSON LONGTEXT,
    IN paramFinalSubmission TINYINT,
    IN paramCurrentTimestamp DATETIME
)
BEGIN
    DECLARE varContestId INT DEFAULT 0;
    DECLARE varUserId INT DEFAULT 0;
    DECLARE varAnswerCount INT DEFAULT 0;
    DECLARE varIndex INT DEFAULT 0;
    DECLARE varQuestionId INT DEFAULT 0;
    DECLARE varOptionId INT DEFAULT 0;
    DECLARE varCompletedAt DATETIME DEFAULT NULL;
    DECLARE varScore INT DEFAULT 0;

    SELECT id INTO varContestId
    FROM contests
    WHERE reference = paramContestRef AND isActive = 1;

    IF varContestId = 0 THEN
        SIGNAL SQLSTATE '10005'
        SET MESSAGE_TEXT = 'Invalid or inactive Contest Reference';
    END IF;

    IF paramCurrentTimestamp < (SELECT start_time FROM contests WHERE id = varContestId) THEN
        SIGNAL SQLSTATE '10018'
        SET MESSAGE_TEXT = 'Contest has not yet started';
    END IF;

    IF paramCurrentTimestamp > (SELECT end_time FROM contests WHERE id = varContestId) THEN
        SIGNAL SQLSTATE '10019'
        SET MESSAGE_TEXT = 'Contest has already ended';
    END IF;

    SELECT id INTO varUserId
    FROM users
    WHERE reference = paramUserRef;

    IF varUserId = 0 THEN
        SIGNAL SQLSTATE '10006'
        SET MESSAGE_TEXT = 'Invalid User Reference';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM contest_participants
        WHERE contest_id = varContestId AND user_id = varUserId
    ) THEN
        SIGNAL SQLSTATE '10016'
        SET MESSAGE_TEXT = 'User has not joined this contest';
    END IF;

    SELECT completed_at INTO varCompletedAt
    FROM contest_participants
    WHERE contest_id = varContestId AND user_id = varUserId;

    IF varCompletedAt IS NOT NULL THEN
        SIGNAL SQLSTATE '10023'
        SET MESSAGE_TEXT = 'Contest submission is already finalized';
    END IF;

    SET varAnswerCount = JSON_LENGTH(paramAnswersJSON, '$');
    WHILE varIndex < varAnswerCount DO
        SET varQuestionId = JSON_UNQUOTE(JSON_EXTRACT(paramAnswersJSON, CONCAT('$[', varIndex, '].questionId')));
        SET varOptionId = JSON_UNQUOTE(JSON_EXTRACT(paramAnswersJSON, CONCAT('$[', varIndex, '].optionId')));

        IF NOT EXISTS (
            SELECT 1 FROM questions WHERE id = varQuestionId AND contest_id = varContestId
        ) THEN
            SIGNAL SQLSTATE '10021'
            SET MESSAGE_TEXT = 'Invalid question ID for this contest';
        END IF;

        -- Validate option belongs to question
        IF NOT EXISTS (
            SELECT 1 FROM options WHERE id = varOptionId AND question_id = varQuestionId
        ) THEN
            SIGNAL SQLSTATE '10022'
            SET MESSAGE_TEXT = 'Invalid option ID for this question';
        END IF;

        IF EXISTS (
            SELECT 1 FROM user_answers
            WHERE contest_id = varContestId AND user_id = varUserId AND question_id = varQuestionId
        ) THEN
            SIGNAL SQLSTATE '10024'
            SET MESSAGE_TEXT = 'Answer for this question has already been submitted and cannot be updated';
        END IF;

        INSERT INTO user_answers (contest_id, user_id, question_id, option_id, submitted_at)
        VALUES (varContestId, varUserId, varQuestionId, varOptionId, paramCurrentTimestamp);

        SET varIndex = varIndex + 1;
    END WHILE;

    IF paramFinalSubmission = 1 THEN
        CALL sp_calculate_score_and_update_leaderboard(varContestId, varUserId, paramCurrentTimestamp, varScore);
    END IF;

    SELECT 
        c.reference,
        c.name,
        (SELECT COUNT(*) FROM questions WHERE contest_id = varContestId) AS totalQuestions,
        (SELECT COUNT(*) FROM user_answers WHERE contest_id = varContestId AND user_id = varUserId) AS submittedAnswers,
        cp.completed_at IS NOT NULL AS isCompleted,
        IF(paramFinalSubmission = 1, varScore, NULL) AS score
    FROM contests c
    LEFT JOIN contest_participants cp ON cp.contest_id = c.id AND cp.user_id = varUserId
    WHERE c.id = varContestId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_user_login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_user_login`(
IN paramEmail VARCHAR(255),
IN paramCurrentTs VARCHAR(50)
)
BEGIN

DECLARE varUserRole INT(5) DEFAULT 0;
DECLARE varUserID INT(5) DEFAULT 0; 
DECLARE varEmail VARCHAR(255) DEFAULT NULL; 
DECLARE varUserRef VARCHAR(60) DEFAULT NULL; 
DECLARE varNewAuthToken VARCHAR(60) DEFAULT uuid();


SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

	SELECT 
    id,
    reference,
    email,
    role
    INTO varUserID, varUserRef, varEmail, varUserRole
    FROM `users` 
    WHERE email = paramEmail and IsActive = 1;

    IF varUserID = 0 THEN 
 			ROLLBACK;
             
 			SIGNAL SQLSTATE '10005'
 			SET MESSAGE_TEXT = 'Invalid User';
    END IF;
    
        
	UPDATE userloginlog
    SET outTime = paramCurrentTs
    WHERE userId = varUserID and role = varUserRole and outTime is null;
    
    INSERT INTO userloginlog (userId, token, role, inTime)
    value
    (
		varUserID,
        varNewAuthToken,
        varUserRole,
        paramCurrentTs
    );
    

	SELECT varNewAuthToken  AuthToken,
    varUserRef UserReference,
    varUserRole UserRole;
 
 

COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usp_validate_request` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_validate_request`(
IN paramApiuri VARCHAR(100),
IN paramAuthToken VARCHAR(50)
)
BEGIN

DECLARE varReqUserid INT DEFAULT 0;
DECLARE varReqUserType INT DEFAULT 0;
DECLARE varUserRoleAdmin INT DEFAULT 1;
DECLARE varUserRoleVIP INT DEFAULT 2;
DECLARE varUserRoleNormal INT DEFAULT 3;
DECLARE varUserRoleGuest INT DEFAULT 4;

DECLARE varApiUriID INT(5) DEFAULT 0;
DECLARE varAuthRequired INT(5) DEFAULT 0;
DECLARE varUserRef VARCHAR(50) DEFAULT null;

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
  
	SELECT uriid , auth_required
	INTO varApiUriID, varAuthRequired
    FROM apiuri
    WHERE 
    URI = paramApiuri;
            
     IF varApiUriID = 0 THEN 
 			ROLLBACK;
             
 			SIGNAL SQLSTATE '10001'
 			SET MESSAGE_TEXT = 'Invalid Request URL';
    
    
    ELSE
    IF varAuthRequired = 1 THEN
    
    
   SELECT userId, role
   INTO varReqUserid, varReqUserType
   FROM userloginlog 
   WHERE token = paramAuthToken and outTime is null;
	    
        
        IF varReqUserType =  varUserRoleAdmin OR varReqUserType =  varUserRoleVIP OR varReqUserType =  varUserRoleNormal OR varReqUserType =  varUserRoleGuest THEN
    
		SELECT reference 
		INTO varUserRef
        FROM users 
        WHERE id = varReqUserid;
		
        END IF;
    
   IF varReqUserid = 0 THEN 
 			ROLLBACK;
             
 			SIGNAL SQLSTATE '10002'
 			SET MESSAGE_TEXT = 'Invalid User Credentials';
    END IF; 
    
    END IF;
    SELECT varReqUserType as UserRole,
			varUserRef as UserRef,
            varReqUserid as UserID;
    END IF; 
	COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-08 17:40:32
