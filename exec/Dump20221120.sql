CREATE DATABASE  IF NOT EXISTS `naratmalssafy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `naratmalssafy`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k7d110.p.ssafy.io    Database: naratmalssafy
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `t_file`
--

DROP TABLE IF EXISTS `t_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_file` (
  `file_seq` bigint NOT NULL AUTO_INCREMENT,
  `file_original_name` varchar(45) NOT NULL,
  `file_saved_name` varchar(45) NOT NULL,
  `file_saved_path` varchar(100) NOT NULL,
  `woff_saved_path` varchar(100) NOT NULL,
  PRIMARY KEY (`file_seq`),
  UNIQUE KEY `file_original_name_UNIQUE` (`file_original_name`),
  UNIQUE KEY `file_saved_name_UNIQUE` (`file_saved_name`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_file`
--

LOCK TABLES `t_file` WRITE;
/*!40000 ALTER TABLE `t_file` DISABLE KEYS */;
INSERT INTO `t_file` VALUES (19,'ㅁㄹㅇㄴ.ttf','font_b97a78e304948cd25f0a5abe6a65b12dcf31cc5b','https://d1mo4ucdb98b4w.cloudfront.net/b97a78e304948cd25f0a5abe6a65b12dcf31cc5b.ttf','https://d1mo4ucdb98b4w.cloudfront.net/b97a78e304948cd25f0a5abe6a65b12dcf31cc5b.woff'),(20,'현탁이의 첫.ttf','font_797f280231a2e87c8e910c60a1116b59985b893e','https://d1mo4ucdb98b4w.cloudfront.net/797f280231a2e87c8e910c60a1116b59985b893e.ttf','https://d1mo4ucdb98b4w.cloudfront.net/797f280231a2e87c8e910c60a1116b59985b893e.woff'),(22,'민지민지.ttf','font_d559c2bacbe052bc1a3064b5cd08cca4f1cec747','https://d1mo4ucdb98b4w.cloudfront.net/d559c2bacbe052bc1a3064b5cd08cca4f1cec747.ttf','https://d1mo4ucdb98b4w.cloudfront.net/d559c2bacbe052bc1a3064b5cd08cca4f1cec747.woff'),(24,'다람쥐헌.ttf','font_57ff7b719af3df36d1ddc2bf6385c93b2385e6b2','https://d1mo4ucdb98b4w.cloudfront.net/57ff7b719af3df36d1ddc2bf6385c93b2385e6b2.ttf','https://d1mo4ucdb98b4w.cloudfront.net/57ff7b719af3df36d1ddc2bf6385c93b2385e6b2.woff'),(25,'민지좋아.ttf','font_b29cdcdb3251abde6cfce3892fec08b382f96a75','https://d1mo4ucdb98b4w.cloudfront.net/b29cdcdb3251abde6cfce3892fec08b382f96a75.ttf','https://d1mo4ucdb98b4w.cloudfront.net/b29cdcdb3251abde6cfce3892fec08b382f96a75.woff'),(26,'ㄻㅇㄴㄻㄴㅇ.ttf','font_0293eb7de25557374c4dcd032a1cd9edbe184ab7','https://d1mo4ucdb98b4w.cloudfront.net/0293eb7de25557374c4dcd032a1cd9edbe184ab7.ttf','https://d1mo4ucdb98b4w.cloudfront.net/0293eb7de25557374c4dcd032a1cd9edbe184ab7.woff'),(27,'경수경수.ttf','font_cf98b5491780e3023b9215faa23bf3cfd8a9890f','https://d1mo4ucdb98b4w.cloudfront.net/cf98b5491780e3023b9215faa23bf3cfd8a9890f.ttf','https://d1mo4ucdb98b4w.cloudfront.net/cf98b5491780e3023b9215faa23bf3cfd8a9890f.woff'),(28,'에라토스테네스의.ttf','font_29e673c549e444e1c8b695ceda6b9cab2c2bb758','https://d1mo4ucdb98b4w.cloudfront.net/29e673c549e444e1c8b695ceda6b9cab2c2bb758.ttf','https://d1mo4ucdb98b4w.cloudfront.net/29e673c549e444e1c8b695ceda6b9cab2c2bb758.woff'),(29,'다람쥐헌쳇바퀴에타는.ttf','font_41c3e0e142cb7ed8fd08fbb85d23125f9ab22f1c','https://d1mo4ucdb98b4w.cloudfront.net/41c3e0e142cb7ed8fd08fbb85d23125f9ab22f1c.ttf','https://d1mo4ucdb98b4w.cloudfront.net/41c3e0e142cb7ed8fd08fbb85d23125f9ab22f1c.woff'),(30,'현탁현탁.ttf','font_5532f49ca4a0f8db3827a423001187c9fdb94468','https://d1mo4ucdb98b4w.cloudfront.net/5532f49ca4a0f8db3827a423001187c9fdb94468.ttf','https://d1mo4ucdb98b4w.cloudfront.net/5532f49ca4a0f8db3827a423001187c9fdb94468.woff'),(31,'꽃소금.ttf','font_8fa6ecddfc223f36792a67644c1e9ea1a4a5a5d3','https://d1mo4ucdb98b4w.cloudfront.net/8fa6ecddfc223f36792a67644c1e9ea1a4a5a5d3.ttf','https://d1mo4ucdb98b4w.cloudfront.net/8fa6ecddfc223f36792a67644c1e9ea1a4a5a5d3.woff'),(32,'경북구미.ttf','font_6b2efffde6811348ae18c3d911dd89017a7dc68a','https://d1mo4ucdb98b4w.cloudfront.net/6b2efffde6811348ae18c3d911dd89017a7dc68a.ttf','https://d1mo4ucdb98b4w.cloudfront.net/6b2efffde6811348ae18c3d911dd89017a7dc68a.woff'),(33,'싸만코.ttf','font_a8d3a5569ea753759309001e2e953e9d700aefdc','https://d1mo4ucdb98b4w.cloudfront.net/a8d3a5569ea753759309001e2e953e9d700aefdc.ttf','https://d1mo4ucdb98b4w.cloudfront.net/a8d3a5569ea753759309001e2e953e9d700aefdc.woff'),(34,'수왕.ttf','font_673811051a4c426f5b5f9efadff374d12ac44398','https://d1mo4ucdb98b4w.cloudfront.net/673811051a4c426f5b5f9efadff374d12ac44398.ttf','https://d1mo4ucdb98b4w.cloudfront.net/673811051a4c426f5b5f9efadff374d12ac44398.woff'),(35,'수왕볼펜.ttf','font_b159e81a4236d8f1721b9dcae454f5a7fbb2cb4c','https://d1mo4ucdb98b4w.cloudfront.net/b159e81a4236d8f1721b9dcae454f5a7fbb2cb4c.ttf','https://d1mo4ucdb98b4w.cloudfront.net/b159e81a4236d8f1721b9dcae454f5a7fbb2cb4c.woff'),(36,'채민지민.ttf','font_706b6ef93193fca62053ce39e410a7e8036d3ee3','https://d1mo4ucdb98b4w.cloudfront.net/706b6ef93193fca62053ce39e410a7e8036d3ee3.ttf','https://d1mo4ucdb98b4w.cloudfront.net/706b6ef93193fca62053ce39e410a7e8036d3ee3.woff'),(37,'무량소수.ttf','font_7e1215a1a798bca7f02504430d7f687391c6c8fa','https://d1mo4ucdb98b4w.cloudfront.net/7e1215a1a798bca7f02504430d7f687391c6c8fa.ttf','https://d1mo4ucdb98b4w.cloudfront.net/7e1215a1a798bca7f02504430d7f687391c6c8fa.woff'),(38,'지홍 첫.ttf','font_4ee7189eafec8845b0dd2db56c9b6ac461b363c3','https://d1mo4ucdb98b4w.cloudfront.net/4ee7189eafec8845b0dd2db56c9b6ac461b363c3.ttf','https://d1mo4ucdb98b4w.cloudfront.net/4ee7189eafec8845b0dd2db56c9b6ac461b363c3.woff'),(39,'현탁현탁현탁.ttf','font_72b88fc7fdd6bdc4b3f815327a92afc46328f796','https://d1mo4ucdb98b4w.cloudfront.net/72b88fc7fdd6bdc4b3f815327a92afc46328f796.ttf','https://d1mo4ucdb98b4w.cloudfront.net/72b88fc7fdd6bdc4b3f815327a92afc46328f796.woff'),(40,'asdf.ttf','font_3da541559918a808c2402bba5012f6c60b27661c','https://d1mo4ucdb98b4w.cloudfront.net/3da541559918a808c2402bba5012f6c60b27661c.ttf','https://d1mo4ucdb98b4w.cloudfront.net/3da541559918a808c2402bba5012f6c60b27661c.woff'),(41,'한가조채임유.ttf','font_cbcf59e6b78c8ccf13db404325ac455f184c589d','https://d1mo4ucdb98b4w.cloudfront.net/cbcf59e6b78c8ccf13db404325ac455f184c589d.ttf','https://d1mo4ucdb98b4w.cloudfront.net/cbcf59e6b78c8ccf13db404325ac455f184c589d.woff'),(42,'체험단.ttf','font_9715ec30a36d77e176bb8645d77b9a861e79a5af','https://d1mo4ucdb98b4w.cloudfront.net/9715ec30a36d77e176bb8645d77b9a861e79a5af.ttf','https://d1mo4ucdb98b4w.cloudfront.net/9715ec30a36d77e176bb8645d77b9a861e79a5af.woff'),(43,'제규.ttf','font_a511759025c76561dbd30b16ee14abf9d1fa8ec2','https://d1mo4ucdb98b4w.cloudfront.net/a511759025c76561dbd30b16ee14abf9d1fa8ec2.ttf','https://d1mo4ucdb98b4w.cloudfront.net/a511759025c76561dbd30b16ee14abf9d1fa8ec2.woff'),(44,'원하시나요.ttf','font_b01c5d457907609623ff40655d4dd5f5aa6aba7e','https://d1mo4ucdb98b4w.cloudfront.net/b01c5d457907609623ff40655d4dd5f5aa6aba7e.ttf','https://d1mo4ucdb98b4w.cloudfront.net/b01c5d457907609623ff40655d4dd5f5aa6aba7e.woff'),(45,'다비드.ttf','font_88597346519fafd5e00cace0a003f7906d03bf9b','https://d1mo4ucdb98b4w.cloudfront.net/88597346519fafd5e00cace0a003f7906d03bf9b.ttf','https://d1mo4ucdb98b4w.cloudfront.net/88597346519fafd5e00cace0a003f7906d03bf9b.woff'),(46,'공돌호승.ttf','font_eca1df810353e1d47789d9077766a49a7ffe1a67','https://d1mo4ucdb98b4w.cloudfront.net/eca1df810353e1d47789d9077766a49a7ffe1a67.ttf','https://d1mo4ucdb98b4w.cloudfront.net/eca1df810353e1d47789d9077766a49a7ffe1a67.woff'),(47,'연지.ttf','font_3f8cd22bfbf1bec446e5372ff136421683e2b35b','https://d1mo4ucdb98b4w.cloudfront.net/3f8cd22bfbf1bec446e5372ff136421683e2b35b.ttf','https://d1mo4ucdb98b4w.cloudfront.net/3f8cd22bfbf1bec446e5372ff136421683e2b35b.woff'),(48,'우는아이.ttf','font_987e8c8ef4e88ba8690740047eeb9c2e94d554ce','https://d1mo4ucdb98b4w.cloudfront.net/987e8c8ef4e88ba8690740047eeb9c2e94d554ce.ttf','https://d1mo4ucdb98b4w.cloudfront.net/987e8c8ef4e88ba8690740047eeb9c2e94d554ce.woff'),(49,'야구하는 제규.ttf','font_fc66ae67e002106f6be759d5dc2c9558599c069f','https://d1mo4ucdb98b4w.cloudfront.net/fc66ae67e002106f6be759d5dc2c9558599c069f.ttf','https://d1mo4ucdb98b4w.cloudfront.net/fc66ae67e002106f6be759d5dc2c9558599c069f.woff'),(50,'야구하는 제규 2.ttf','font_a5f73ca41c31bc876c3c17a9730381a9e4f9f06a','https://d1mo4ucdb98b4w.cloudfront.net/a5f73ca41c31bc876c3c17a9730381a9e4f9f06a.ttf','https://d1mo4ucdb98b4w.cloudfront.net/a5f73ca41c31bc876c3c17a9730381a9e4f9f06a.woff'),(51,'야구하는 제규3.ttf','font_27dc4aa6ec0568118b526e997b4a443e98df5448','https://d1mo4ucdb98b4w.cloudfront.net/27dc4aa6ec0568118b526e997b4a443e98df5448.ttf','https://d1mo4ucdb98b4w.cloudfront.net/27dc4aa6ec0568118b526e997b4a443e98df5448.woff'),(52,'야구하는 제규 4.ttf','font_bd1e8bd2fcff1853159e2eab73f03352ff965650','https://d1mo4ucdb98b4w.cloudfront.net/bd1e8bd2fcff1853159e2eab73f03352ff965650.ttf','https://d1mo4ucdb98b4w.cloudfront.net/bd1e8bd2fcff1853159e2eab73f03352ff965650.woff'),(53,'왕왕.ttf','font_407a314fc705735f2d448bdea639634439f7870e','https://d1mo4ucdb98b4w.cloudfront.net/407a314fc705735f2d448bdea639634439f7870e.ttf','https://d1mo4ucdb98b4w.cloudfront.net/407a314fc705735f2d448bdea639634439f7870e.woff'),(54,'승운.ttf','font_fd11b1468852e0f23148414eac26334d641a3509','https://d1mo4ucdb98b4w.cloudfront.net/fd11b1468852e0f23148414eac26334d641a3509.ttf','https://d1mo4ucdb98b4w.cloudfront.net/fd11b1468852e0f23148414eac26334d641a3509.woff'),(55,'명범.ttf','font_257fa7f1c5a958c1008b0bd48a254a1db278bd9b','https://d1mo4ucdb98b4w.cloudfront.net/257fa7f1c5a958c1008b0bd48a254a1db278bd9b.ttf','https://d1mo4ucdb98b4w.cloudfront.net/257fa7f1c5a958c1008b0bd48a254a1db278bd9b.woff'),(56,'명범2.ttf','font_6d8207936fe1f0377239ecc266922d8de910a8f2','https://d1mo4ucdb98b4w.cloudfront.net/6d8207936fe1f0377239ecc266922d8de910a8f2.ttf','https://d1mo4ucdb98b4w.cloudfront.net/6d8207936fe1f0377239ecc266922d8de910a8f2.woff'),(57,'>_ㅇ체.ttf','font_900f01a15987c574d0c8df8cef6c8767945134c2','https://d1mo4ucdb98b4w.cloudfront.net/900f01a15987c574d0c8df8cef6c8767945134c2.ttf','https://d1mo4ucdb98b4w.cloudfront.net/900f01a15987c574d0c8df8cef6c8767945134c2.woff'),(58,'텀텀.ttf','font_ffd1cb8cc7dfb81aa8699d0f259d8df8f5d00846','https://d1mo4ucdb98b4w.cloudfront.net/ffd1cb8cc7dfb81aa8699d0f259d8df8f5d00846.ttf','https://d1mo4ucdb98b4w.cloudfront.net/ffd1cb8cc7dfb81aa8699d0f259d8df8f5d00846.woff'),(59,'내일 자체공강예정.ttf','font_02f07c36e7c0fe92f5fb2aab942836dc4d28d072','https://d1mo4ucdb98b4w.cloudfront.net/02f07c36e7c0fe92f5fb2aab942836dc4d28d072.ttf','https://d1mo4ucdb98b4w.cloudfront.net/02f07c36e7c0fe92f5fb2aab942836dc4d28d072.woff'),(60,'터멑.ttf','font_5daf2a116f4017dd9ba8684f6d6d01638cd59ebe','https://d1mo4ucdb98b4w.cloudfront.net/5daf2a116f4017dd9ba8684f6d6d01638cd59ebe.ttf','https://d1mo4ucdb98b4w.cloudfront.net/5daf2a116f4017dd9ba8684f6d6d01638cd59ebe.woff'),(61,'텀텀2.ttf','font_936158785765163e5145da95eb0827ed4512a920','https://d1mo4ucdb98b4w.cloudfront.net/936158785765163e5145da95eb0827ed4512a920.ttf','https://d1mo4ucdb98b4w.cloudfront.net/936158785765163e5145da95eb0827ed4512a920.woff'),(62,'명범3.ttf','font_b3710b03c4359c816010bd0188803b0f17fe1acf','https://d1mo4ucdb98b4w.cloudfront.net/b3710b03c4359c816010bd0188803b0f17fe1acf.ttf','https://d1mo4ucdb98b4w.cloudfront.net/b3710b03c4359c816010bd0188803b0f17fe1acf.woff'),(63,'여행.ttf','font_376b19ea5379bec92bae8f68fb67b784fe836ce4','https://d1mo4ucdb98b4w.cloudfront.net/376b19ea5379bec92bae8f68fb67b784fe836ce4.ttf','https://d1mo4ucdb98b4w.cloudfront.net/376b19ea5379bec92bae8f68fb67b784fe836ce4.woff'),(64,'퇴근하고싶어.ttf','font_f674fa72a025e6857ac2be085ff270c8b146db98','https://d1mo4ucdb98b4w.cloudfront.net/f674fa72a025e6857ac2be085ff270c8b146db98.ttf','https://d1mo4ucdb98b4w.cloudfront.net/f674fa72a025e6857ac2be085ff270c8b146db98.woff'),(65,'예솔.ttf','font_1c62ae7f920c8c773592d4393df77ac95ba6e3a0','https://d1mo4ucdb98b4w.cloudfront.net/1c62ae7f920c8c773592d4393df77ac95ba6e3a0.ttf','https://d1mo4ucdb98b4w.cloudfront.net/1c62ae7f920c8c773592d4393df77ac95ba6e3a0.woff'),(66,'코치날림.ttf','font_ed9863281cf6bcd216a3b8499ab346da71730fee','https://d1mo4ucdb98b4w.cloudfront.net/ed9863281cf6bcd216a3b8499ab346da71730fee.ttf','https://d1mo4ucdb98b4w.cloudfront.net/ed9863281cf6bcd216a3b8499ab346da71730fee.woff'),(67,'에러 잡아주세요.ttf','font_34d4be7ccbf7d81cd503183dc9e8bca7bcdadfd0','https://d1mo4ucdb98b4w.cloudfront.net/34d4be7ccbf7d81cd503183dc9e8bca7bcdadfd0.ttf','https://d1mo4ucdb98b4w.cloudfront.net/34d4be7ccbf7d81cd503183dc9e8bca7bcdadfd0.woff'),(68,'return 명범;.ttf','font_f10e904bae9a229344c6ff2832c79e890ce0692a','https://d1mo4ucdb98b4w.cloudfront.net/f10e904bae9a229344c6ff2832c79e890ce0692a.ttf','https://d1mo4ucdb98b4w.cloudfront.net/f10e904bae9a229344c6ff2832c79e890ce0692a.woff'),(69,'페퍼로니파인애플추가.ttf','font_e6af58cc78fcbecfa6944ca3cc9bd0d4a7dabfd1','https://d1mo4ucdb98b4w.cloudfront.net/e6af58cc78fcbecfa6944ca3cc9bd0d4a7dabfd1.ttf','https://d1mo4ucdb98b4w.cloudfront.net/e6af58cc78fcbecfa6944ca3cc9bd0d4a7dabfd1.woff'),(70,'유정코치또박.ttf','font_3fd6854b2cad44052addeadb6fd9fc498aefa91e','https://d1mo4ucdb98b4w.cloudfront.net/3fd6854b2cad44052addeadb6fd9fc498aefa91e.ttf','https://d1mo4ucdb98b4w.cloudfront.net/3fd6854b2cad44052addeadb6fd9fc498aefa91e.woff'),(71,'아름다울 미.ttf','font_d75370a1ab6ef022db51c7e80e1cf7dddd5dea82','https://d1mo4ucdb98b4w.cloudfront.net/d75370a1ab6ef022db51c7e80e1cf7dddd5dea82.ttf','https://d1mo4ucdb98b4w.cloudfront.net/d75370a1ab6ef022db51c7e80e1cf7dddd5dea82.woff'),(73,'뽀로로.ttf','font_06a140db50d05d36507925005b7fc0fa62927a9f','https://d1mo4ucdb98b4w.cloudfront.net/06a140db50d05d36507925005b7fc0fa62927a9f.ttf','https://d1mo4ucdb98b4w.cloudfront.net/06a140db50d05d36507925005b7fc0fa62927a9f.woff'),(76,'치맥조아.ttf','font_9d25cd4779782a2ce4b855fb2e29b0a5cfd3fa82','https://d1mo4ucdb98b4w.cloudfront.net/9d25cd4779782a2ce4b855fb2e29b0a5cfd3fa82.ttf','https://d1mo4ucdb98b4w.cloudfront.net/9d25cd4779782a2ce4b855fb2e29b0a5cfd3fa82.woff'),(77,'삼쏘맥조아.ttf','font_5f0cddab3ef8f2aa31aaa5e881f3f7f0f1e1ce8d','https://d1mo4ucdb98b4w.cloudfront.net/5f0cddab3ef8f2aa31aaa5e881f3f7f0f1e1ce8d.ttf','https://d1mo4ucdb98b4w.cloudfront.net/5f0cddab3ef8f2aa31aaa5e881f3f7f0f1e1ce8d.woff'),(78,'노래하던가수왕.ttf','font_fb4d6b98b90a407d0ef2dd5a6a95a64312ca480b','https://d1mo4ucdb98b4w.cloudfront.net/fb4d6b98b90a407d0ef2dd5a6a95a64312ca480b.ttf','https://d1mo4ucdb98b4w.cloudfront.net/fb4d6b98b90a407d0ef2dd5a6a95a64312ca480b.woff'),(79,'회쏘조아.ttf','font_c9f60b43ae3ff5b0042f802dc78ef12fef5bf98a','https://d1mo4ucdb98b4w.cloudfront.net/c9f60b43ae3ff5b0042f802dc78ef12fef5bf98a.ttf','https://d1mo4ucdb98b4w.cloudfront.net/c9f60b43ae3ff5b0042f802dc78ef12fef5bf98a.woff'),(80,'직장 잃은 딸기.ttf','font_29f2d4b095287f3d8818fe17157ccbd6bff12c79','https://d1mo4ucdb98b4w.cloudfront.net/29f2d4b095287f3d8818fe17157ccbd6bff12c79.ttf','https://d1mo4ucdb98b4w.cloudfront.net/29f2d4b095287f3d8818fe17157ccbd6bff12c79.woff'),(81,'나랏말싸피 어때.ttf','font_cad276758771a50e0ee6c94537cc2aca057324d7','https://d1mo4ucdb98b4w.cloudfront.net/cad276758771a50e0ee6c94537cc2aca057324d7.ttf','https://d1mo4ucdb98b4w.cloudfront.net/cad276758771a50e0ee6c94537cc2aca057324d7.woff'),(82,'수고했어.ttf','font_804eb167ae4bbaacaf7bf0a380d23c7512303bc9','https://d1mo4ucdb98b4w.cloudfront.net/804eb167ae4bbaacaf7bf0a380d23c7512303bc9.ttf','https://d1mo4ucdb98b4w.cloudfront.net/804eb167ae4bbaacaf7bf0a380d23c7512303bc9.woff');
/*!40000 ALTER TABLE `t_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_font`
--

DROP TABLE IF EXISTS `t_font`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_font` (
  `font_seq` bigint NOT NULL AUTO_INCREMENT,
  `font_name` varchar(45) NOT NULL,
  `font_description` varchar(45) DEFAULT NULL,
  `font_fav_count` bigint NOT NULL DEFAULT '0',
  `font_download_file` bigint DEFAULT NULL,
  `font_creater` bigint NOT NULL,
  `font_download_count` bigint NOT NULL DEFAULT '0',
  `font_reg_date` datetime NOT NULL,
  PRIMARY KEY (`font_seq`),
  UNIQUE KEY `font_name_UNIQUE` (`font_name`),
  KEY `fk_t_font_t_file1_idx` (`font_download_file`),
  KEY `font_creater` (`font_creater`),
  CONSTRAINT `fk_t_font_t_file1` FOREIGN KEY (`font_download_file`) REFERENCES `t_file` (`file_seq`),
  CONSTRAINT `t_font_ibfk_1` FOREIGN KEY (`font_creater`) REFERENCES `t_user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_font`
--

LOCK TABLES `t_font` WRITE;
/*!40000 ALTER TABLE `t_font` DISABLE KEYS */;
INSERT INTO `t_font` VALUES (97,'다람쥐헌','쳇바퀴에타고파',2,24,16,4,'2022-11-14 01:10:15'),(98,'민지좋아','민지는 민지가 좋아',4,25,15,1,'2022-11-14 01:29:41'),(100,'경수경수','경수가 만든 경수경수체',2,27,18,3,'2022-11-14 01:40:13'),(105,'경북구미','구미를 대표하는 글씨체로 성장하고 싶습니다!',2,32,17,27,'2022-11-14 05:41:42'),(108,'수왕볼펜','노래부르면서 볼펜으로 써봤습니다',2,35,19,1,'2022-11-14 06:53:41'),(111,'지홍 첫','지홍이의 첫 번째 폰트체ㅎㅎㅎㅎㅎㅎㅎㅎ 반갑습니다.',1,38,20,0,'2022-11-14 07:44:27'),(122,'야구하는 제규','야구하는 제규체',0,49,16,0,'2022-11-16 14:24:03'),(123,'야구하는 제규 2','야구하는 제규의 두 번째 폰트예요 많관부',0,50,16,0,'2022-11-16 14:41:24'),(124,'야구하는 제규3','날려쓰는 제규의 날려날려체',1,51,16,0,'2022-11-16 15:04:38'),(125,'야구하는 제규 4','띄어쓰기 2번 포함된 야구하는 제규체',0,52,16,0,'2022-11-16 15:16:03'),(126,'왕왕','왕왕이의 왕왕체',0,53,16,0,'2022-11-16 15:27:29'),(130,'수왕','수왕체입니다.',0,34,19,0,'2022-11-16 15:27:29'),(140,'원하시나요','원하나요 이 글씨체?',0,44,25,0,'2022-11-16 15:04:38'),(141,'승운','만들어져라 얍',0,54,26,4,'2022-11-16 17:32:19'),(142,'명범','범상하지않은명범이글씨체',0,55,16,0,'2022-11-16 17:43:32'),(143,'명범2','명범이의범상하지않은 명범체',0,56,16,0,'2022-11-16 17:58:58'),(144,'>_ㅇ체','> _ ㅇ 체',0,57,27,0,'2022-11-16 18:15:28'),(149,'명범3','명범이의 명범체',2,62,16,0,'2022-11-17 12:42:01'),(150,'여행','여행여행여행',0,63,16,0,'2022-11-17 13:27:17'),(151,'퇴근하고싶어','퇴근하고 싶습니다',1,64,30,2,'2022-11-17 13:34:30'),(152,'예솔','예솔체입니다!!',1,65,32,1,'2022-11-17 14:28:14'),(153,'코치날림','박유정 코치님이 날림으로 쓰신 글씨체',2,66,32,1,'2022-11-17 14:46:43'),(154,'에러 잡아주세요','에러 잡아주세요',0,67,32,0,'2022-11-17 14:55:32'),(155,'return 명범;','좀 더 귀여워진 글씨체',0,68,32,0,'2022-11-17 15:04:33'),(160,'에라토스테네스의','소수를 구할 때 사용하는 글씨체',0,28,16,0,'2022-11-14 01:40:13'),(161,'페퍼로니파인애플추가','페퍼로니피자에 파인애플추가 GMTGR!\r\n\r\n- 안팡식 -',0,69,30,1,'2022-11-17 15:12:14'),(162,'유정코치또박','유정코치님이 아주아주!! 또박하게 쓴 글씨체입니다',0,70,32,3,'2022-11-17 16:13:44'),(163,'아름다울 미','이 글씨체는 아주 아름답지',1,71,20,2,'2022-11-18 10:29:09'),(165,'뽀로로','노는게 제일 좋아~~!!!@!!!!!@!',0,73,18,1,'2022-11-18 18:30:02'),(167,'치맥조아','치킨에는 맥주!',0,76,18,2,'2022-11-18 21:07:30'),(168,'삼쏘맥조아','삼겹살에는 쏘맥!',0,77,18,4,'2022-11-18 21:25:15'),(169,'노래하던가수왕','내가 구미 캠퍼스의 가수왕?!',0,78,19,1,'2022-11-18 21:31:36'),(170,'회쏘조아','회에는 소주!',0,79,18,3,'2022-11-18 21:36:56'),(171,'직장 잃은 딸기','딸기 시럽~~ \r\n아이고 깔깔 부장님~~~!!!',0,80,18,0,'2022-11-19 01:07:14'),(172,'나랏말싸피 어때','마지막까지 화이팅',1,81,16,1,'2022-11-19 13:07:54'),(173,'수고했어','우리 모두 1년간 고생했어!\n훌륭한 개발자로 성장하길 바랄게!\n마지막 선물이야',0,82,20,0,'2022-11-19 20:54:29');
/*!40000 ALTER TABLE `t_font` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_font_download_history`
--

DROP TABLE IF EXISTS `t_font_download_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_font_download_history` (
  `font_download_history_seq` bigint NOT NULL AUTO_INCREMENT,
  `font_seq` bigint NOT NULL,
  `user_seq` bigint NOT NULL,
  PRIMARY KEY (`font_download_history_seq`),
  KEY `fk_t_font_download_history_t_font1_idx` (`font_seq`),
  KEY `fk_t_font_download_history_t_user1_idx` (`user_seq`),
  CONSTRAINT `fk_t_font_download_history_t_font1` FOREIGN KEY (`font_seq`) REFERENCES `t_font` (`font_seq`),
  CONSTRAINT `fk_t_font_download_history_t_user1` FOREIGN KEY (`user_seq`) REFERENCES `t_user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_font_download_history`
--

LOCK TABLES `t_font_download_history` WRITE;
/*!40000 ALTER TABLE `t_font_download_history` DISABLE KEYS */;
INSERT INTO `t_font_download_history` VALUES (10,97,16),(11,97,20),(12,97,18),(17,108,19),(19,105,17),(20,100,18),(21,141,26),(22,141,16),(24,151,30),(25,141,32),(26,152,32),(27,161,30),(28,153,32),(29,162,32),(30,162,20),(31,163,20),(32,141,19),(33,100,19),(34,165,18),(35,170,18),(36,168,16),(37,167,16),(38,168,18),(39,167,18),(40,168,20),(41,170,20),(42,170,16),(43,169,16),(44,98,16),(45,163,16),(46,151,16),(47,172,20);
/*!40000 ALTER TABLE `t_font_download_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_padlet_contents`
--

DROP TABLE IF EXISTS `t_padlet_contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_padlet_contents` (
  `padlet_contents_seq` bigint NOT NULL AUTO_INCREMENT,
  `padlet_contents_comments` varchar(500) NOT NULL,
  `padlet_contents_font_seq` bigint NOT NULL,
  `padlet_contents_writer` bigint NOT NULL,
  `padlet_contents_location` varchar(10) NOT NULL,
  `padlet_contents_title` varchar(50) DEFAULT NULL,
  `padlet_contents_color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`padlet_contents_seq`),
  KEY `fk_t_padlet_contents_t_font1_idx` (`padlet_contents_font_seq`),
  KEY `fk_t_padlet_contents_t_user1_idx` (`padlet_contents_writer`),
  CONSTRAINT `fk_t_padlet_contents_t_font1` FOREIGN KEY (`padlet_contents_font_seq`) REFERENCES `t_font` (`font_seq`),
  CONSTRAINT `fk_t_padlet_contents_t_user1` FOREIGN KEY (`padlet_contents_writer`) REFERENCES `t_user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_padlet_contents`
--

LOCK TABLES `t_padlet_contents` WRITE;
/*!40000 ALTER TABLE `t_padlet_contents` DISABLE KEYS */;
INSERT INTO `t_padlet_contents` VALUES (48,'좋아요 구미 즐거운 구미',98,15,'gumi','구미구미','green'),(49,'귀여운 승운이',154,32,'gumi','승운짱','red'),(50,'2명 선착순 1반 10팀 조경수에게 오세요~~~',100,18,'gumi','마카롱 드실 분','skyblue'),(53,'너무 고생했어 1년간...',111,20,'gumi','다들 너무 고생했어요 ㅠㅠ','gray'),(54,'고생많았어요~',172,16,'gumi','자율프로젝트 모두들','pink');
/*!40000 ALTER TABLE `t_padlet_contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user` (
  `user_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) NOT NULL,
  `user_nickname` varchar(15) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_location` varchar(10) NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (15,'chaemj97@naver.com','나는민지','채민지','구미'),(16,'anfidthtn@naver.com','콩','한제규','구미'),(17,'seoktak123@naver.com','연딱콩','임현탁','구미'),(18,'js9727@nate.com','왕눈이','조경수','구미'),(19,'kws04254@naver.com','가수왕','가수왕','구미'),(20,'jimdac@naver.com','지광이','유지홍','구미'),(21,'duswl258@naver.com','yj','최연지','구미'),(23,'spy03128@naver.com','공주','박지현','구미'),(24,'kimgusduf@naver.com','체험단','김현열','서울'),(25,'kofgb1234@naver.com','kofgb','이대희','구미'),(26,'thstmddns@kakao.com','닉네임','손승운','구미'),(27,'jewellove1023@gmail.com','닉네임2','이동민','구미'),(28,'maru_i@kakao.com','_','_','구미'),(29,'poll9999@naver.com','햄버거맞음','오정환','서울'),(30,'soultop7160@naver.com','진부해요','박승원','구미'),(31,'ii200400@naver.com','게으른너구리','임영선','구미'),(32,'mungmnb777@naver.com','명범짱','이명범','구미'),(33,'chop97@naver.com','구미_안광식_봉구는푸들이야','안광식','구미'),(34,'jyh6456@gmail.com','긱식이','정윤해','구미');
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user_font`
--

DROP TABLE IF EXISTS `t_user_font`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user_font` (
  `user_font_seq` bigint NOT NULL AUTO_INCREMENT,
  `user_seq` bigint NOT NULL,
  `font_seq` bigint NOT NULL,
  PRIMARY KEY (`user_font_seq`),
  KEY `fk_t_user_font_t_user_idx` (`user_seq`),
  KEY `fk_t_user_font_t_font1_idx` (`font_seq`),
  CONSTRAINT `fk_t_user_font_t_font1` FOREIGN KEY (`font_seq`) REFERENCES `t_font` (`font_seq`),
  CONSTRAINT `fk_t_user_font_t_user` FOREIGN KEY (`user_seq`) REFERENCES `t_user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user_font`
--

LOCK TABLES `t_user_font` WRITE;
/*!40000 ALTER TABLE `t_user_font` DISABLE KEYS */;
INSERT INTO `t_user_font` VALUES (41,20,97),(42,20,98),(43,17,100),(47,15,98),(49,20,108),(53,17,105),(54,17,108),(55,17,111),(56,17,98),(57,17,97),(58,29,124),(59,16,149),(60,32,149),(61,20,152),(62,20,153),(63,15,100),(64,18,98),(65,18,105),(66,32,153),(67,20,163),(68,20,151),(69,20,172);
/*!40000 ALTER TABLE `t_user_font` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_wait_create`
--

DROP TABLE IF EXISTS `t_wait_create`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_wait_create` (
  `wait_create_seq` bigint NOT NULL AUTO_INCREMENT,
  `wait_create_name` varchar(45) NOT NULL,
  `wait_create_state` int NOT NULL,
  `wait_create_user` bigint NOT NULL,
  `wait_create_description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`wait_create_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_wait_create`
--

LOCK TABLES `t_wait_create` WRITE;
/*!40000 ALTER TABLE `t_wait_create` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_wait_create` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 16:53:26
