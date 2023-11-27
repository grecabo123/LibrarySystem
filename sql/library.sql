-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 27, 2023 at 04:16 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_08_18_133452_create_tbl_contact_table', 1),
(6, '2023_08_22_123832_create_tbl_logs_table', 1),
(7, '2023_08_22_140201_create_tbl_reports_table', 1),
(8, '2023_11_11_201119_create_tbl_department_table', 1),
(9, '2023_11_12_033416_create_tbl_course_table', 2),
(10, '2023_11_12_044921_create_tbl_school_year_table', 3),
(11, '2023_11_12_055356_create_tbl_document_table', 4),
(12, '2023_11_12_055554_create_tbl_documentinfo_table', 5),
(13, '2014_10_12_000000_create_users_table', 6),
(14, '2023_11_19_085014_create_tbl_visit_table', 7),
(15, '2023_11_19_085339_create_tbl_count_table', 8),
(16, '2023_11_21_145406_create_tbl_announcement_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(13, 'App\\Models\\User', 2, 'hannakaye.redondo@nmsc.edu.ph_User', '7987fd3bb26049b573a68972db83739312f8a050e7b4df43f16f3bb3a2f8e65f', '[\"server:user\"]', '2023-11-19 05:33:25', '2023-11-18 22:14:29', '2023-11-19 05:33:25'),
(15, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '639284520fe44808fe52b15271ac49d53868203aed68afbd5e65f930553acdf7', '[\"server:admin\"]', '2023-11-19 06:10:15', '2023-11-19 05:56:25', '2023-11-19 06:10:15'),
(16, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '512b977291f845fe6ddeb34df90c3b005f0c0356aae14707d72a8d504fc07c84', '[\"server:admin\"]', NULL, '2023-11-21 03:34:10', '2023-11-21 03:34:10'),
(17, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '2e988c11b603c512e3890fe2f593786ddeafb244f7d499e8193039dec7349bff', '[\"server:admin\"]', '2023-11-22 07:48:37', '2023-11-21 03:34:22', '2023-11-22 07:48:37'),
(18, 'App\\Models\\User', 2, 'hannakaye.redondo@nmsc.edu.ph_User', 'a3f9efdde4b2947ab10b43e669c9929d35b9826e652f4b32b4c141b511f5f20d', '[\"server:user\"]', '2023-11-21 05:54:05', '2023-11-21 04:46:17', '2023-11-21 05:54:05'),
(19, 'App\\Models\\User', 2, 'hannakaye.redondo@nmsc.edu.ph_User', '61cd3b8e6460ce2bb704fe94c0360062cc09c083b98176919383302bc5a695b1', '[\"server:user\"]', '2023-11-22 08:09:45', '2023-11-22 05:41:17', '2023-11-22 08:09:45'),
(20, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '5bf5d8da19348fae8ebd77e9cb59b4d849ef3ab383fe9eb757ed18a5276be703', '[\"server:admin\"]', '2023-11-24 07:40:13', '2023-11-24 07:40:05', '2023-11-24 07:40:13'),
(21, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', 'dee67bfe74c0dc95c2af3050537ac3faafc5195039f96d3e8154880b550ed221', '[\"server:admin\"]', '2023-11-24 07:40:17', '2023-11-24 07:40:12', '2023-11-24 07:40:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

DROP TABLE IF EXISTS `tbl_announcement`;
CREATE TABLE IF NOT EXISTS `tbl_announcement` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_annoucment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_announcement`
--

INSERT INTO `tbl_announcement` (`id`, `date_annoucment`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Nov 22 2023', 'Reminder:\n\nNo Open on dawdwa', '2023-11-21 07:12:43', '2023-11-21 07:12:43'),
(2, 'Nov 22 2023', 'awhdoiawdaiwdawd', '2023-11-21 07:13:25', '2023-11-21 07:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_author`
--

DROP TABLE IF EXISTS `tbl_author`;
CREATE TABLE IF NOT EXISTS `tbl_author` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_user_fk` bigint(20) UNSIGNED NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_fk` (`document_fk`),
  KEY `author_user_fk` (`author_user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_author`
--

INSERT INTO `tbl_author` (`id`, `author_user_fk`, `author`, `document_fk`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, 1, NULL, NULL),
(2, 2, NULL, 2, NULL, NULL),
(3, 2, NULL, 3, NULL, NULL),
(4, 3, NULL, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contact`
--

DROP TABLE IF EXISTS `tbl_contact`;
CREATE TABLE IF NOT EXISTS `tbl_contact` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `home_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_contact_contact_user_fk_foreign` (`contact_user_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_count`
--

DROP TABLE IF EXISTS `tbl_count`;
CREATE TABLE IF NOT EXISTS `tbl_count` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `document_access_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visit_count` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_count`
--

INSERT INTO `tbl_count` (`id`, `document_access_code`, `visit_count`, `created_at`, `updated_at`) VALUES
(1, '561463a3f1f8a25b1ff3d10a237d4f35', 1, '2023-11-19 01:20:58', '2023-11-19 01:20:58'),
(2, '3906a54ce4f98c032d3c36d746230c45', 1, '2023-11-19 01:31:44', '2023-11-19 01:31:44'),
(3, '3906a54ce4f98c032d3c36d746230c45', 1, '2023-11-19 01:32:37', '2023-11-19 01:32:37'),
(4, '21b6106cff66445848b215687fe4a9b4', 1, '2023-11-19 05:26:15', '2023-11-19 05:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

DROP TABLE IF EXISTS `tbl_course`;
CREATE TABLE IF NOT EXISTS `tbl_course` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CourseName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_course` int(11) NOT NULL DEFAULT '0',
  `department_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_course_department_fk_foreign` (`department_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`id`, `CourseName`, `status_course`, `department_fk`, `created_at`, `updated_at`) VALUES
(1, 'Bachelor of Science in Information Technology - BSIT', 1, 4, '2023-11-17 08:28:50', '2023-11-17 08:28:50'),
(2, 'Bachelor of Science in Information System - BSIS', 1, 4, '2023-11-17 08:29:11', '2023-11-17 08:29:11'),
(3, 'Bachelor of Science in Communication Technology - BSCT', 1, 4, '2023-11-17 08:29:36', '2023-11-17 08:29:36'),
(4, 'Bachelor of Science in Animation and Multimedia Arts - BSAM', 1, 4, '2023-11-17 08:29:58', '2023-11-17 08:29:58'),
(5, 'Bachelor of Science in Industrial Technology with majors in Automotive Technology', 1, 2, '2023-11-18 17:40:40', '2023-11-18 17:40:40'),
(6, 'Bachelor of Engineering Technology with majors in Electrical Engineering Technology', 1, 2, '2023-11-18 18:01:35', '2023-11-18 18:01:35'),
(7, 'Bachelor of Science in Agriculture with majors in Crop Science', 1, 3, '2023-11-19 05:21:56', '2023-11-19 05:21:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

DROP TABLE IF EXISTS `tbl_department`;
CREATE TABLE IF NOT EXISTS `tbl_department` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`id`, `department`, `department_code`, `color_code`, `created_at`, `updated_at`) VALUES
(1, 'SCHOOL OF BUSINESS ADMINISTRATION AND MANAGEMENT', 'SBAM', '#ad3ead', '2023-11-17 08:21:50', '2023-11-17 08:21:50'),
(2, 'SCHOOL OF ENGINEERING AND TECHNOLOGY', 'SET', '#fa9f37', '2023-11-17 08:22:58', '2023-11-17 08:22:58'),
(3, 'SCHOOL OF AGRICULTURE AND ENVIRONMENTAL SCIENCE', 'SAES', '#29ba3c', '2023-11-17 08:26:13', '2023-11-17 08:26:13'),
(4, 'SCHOOL OF INFORMATION AND COMMUNICATION TECHNOLOGY', 'SICT', '#535954', '2023-11-17 08:28:14', '2023-11-17 08:28:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_document`
--

DROP TABLE IF EXISTS `tbl_document`;
CREATE TABLE IF NOT EXISTS `tbl_document` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uniquecode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_published` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active_docu` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_document`
--

INSERT INTO `tbl_document` (`id`, `title`, `uniquecode`, `description`, `year_published`, `keywords`, `is_active_docu`, `created_at`, `updated_at`) VALUES
(1, '5G Technology', '561463a3f1f8a25b1ff3d10a237d4f35', '5G is almost around the corner. 5G as a buzzword has been knocking on our doors for some time\r\nnow sans a lot of action on the ground. However, that’s about to change as the Department of\r\nTelecom (DOT) recently approved applications from Telecom Service Providers (TSPs) to conduct\r\ntrials for the use and application of 5G technology. While field trials begin here in India, 5G as\r\na technology has been commercially available in just over 50 countries such as France, South\r\nKorea, the US, etc. for a few years and there are valuable lessons that we can take from launches,\r\nsuccesses, and failures in these markets. Indian operators could learn from their counterparts’\r\nexperience and avoid or rather not repeat the same mistake which their counterparts might have\r\nmade.\r\nLet’s take the case of 5G in France that has been commercially available since November 2020.\r\nA recent study done by us showed that there exists a gap in the quality of experience delivered by\r\nTSPs on 5G. The study was the first of its kind, measured experience on real devices placed in\r\nactual customer locations across nine major French cities. It revealed that while the incumbent\r\noperator provided average speeds of 146 Mbps, the newer operator is left far behind at 28 Mbps,\r\nwhich is a speed one would expect on 4G. These discrepancies between operators could be a result\r\nof different deployment strategies.\r\nSuch discrepancies can be problematic as they finally impact end customers. And in today’s time\r\nwhen the nation is grappling a devastating second wave of the Covid-19 pandemic, providing\r\nseamless digital experience so that digital applications ranging from education and work to\r\nentertainment and dining can continue remotel', '2021', '5G,New Technology,Support', 1, '2023-11-18 23:28:24', '2023-11-18 23:28:24'),
(2, '5G Technology and Future of Architecture', '3906a54ce4f98c032d3c36d746230c45', 'Architecture is the true expression of people’s lives within a framework of different aspects, including socio-economic, cultural,\r\ntraditional, spiritual, and technological. Throughout history, technology has a significant impact on the development of architectural\r\nforms and structures. Nowadays, the progress of advanced technology began to reach an unprecedented level in the age of the\r\ninternet and its related technologies. Since the appearance of the wireless connectivity, architecture, and urban design began to take\r\nanother dimension in the design process to adopt the new technology and integrated it within its envelope. At the beginning of the\r\n21st century, new approaches began to take place in the city, such as the Internet of Things (IoT) and, more recently, the 4G and\r\n5G wireless technology. However, the effectiveness of these advanced technologies depends on both the wireless signal coverage\r\nand the deployment of their equipment. In this context, these technologies impose a new challenge for architects, urban designers,\r\nand the construction industry to embrace them within the concept of the smart city. This study focuses on the analysis of 5G\r\ntechnology and highlighting its advantages and disadvantages, which impact the visual appearance and aesthetics of both buildings\r\nand the city. The study also intends to explore the various possible solutions to overcome the predicament of the wireless signal.', '2023', '5g,Smart City,Building Materials,Urban Design', 0, '2023-11-19 00:33:08', '2023-11-19 00:33:08'),
(3, 'Example Project', '21b6106cff66445848b215687fe4a9b4', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit at animi eius minima unde nulla sapiente. Laboriosam hic eius consequuntur maxime odit explicabo eos animi maiores, non aspernatur temporibus magnam cum ducimus mollitia? Porro, reiciendis pariatur facilis voluptatum laudantium saepe et hic unde cupiditate! Aliquam iure voluptas perspiciatis quaerat?', '2024', 'Crops,Coconut,grass,soil', 0, '2023-11-19 05:25:42', '2023-11-19 05:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_documentinfo`
--

DROP TABLE IF EXISTS `tbl_documentinfo`;
CREATE TABLE IF NOT EXISTS `tbl_documentinfo` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `adviser` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department_fk` bigint(20) UNSIGNED NOT NULL,
  `course_fk` bigint(20) UNSIGNED NOT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docu_fk` bigint(20) UNSIGNED NOT NULL,
  `year_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_documentinfo_department_fk_foreign` (`department_fk`),
  KEY `tbl_documentinfo_course_fk_foreign` (`course_fk`),
  KEY `tbl_documentinfo_docu_fk_foreign` (`docu_fk`),
  KEY `tbl_documentinfo_year_fk_foreign` (`year_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_documentinfo`
--

INSERT INTO `tbl_documentinfo` (`id`, `adviser`, `department_fk`, `course_fk`, `file`, `docu_fk`, `year_fk`, `created_at`, `updated_at`) VALUES
(1, NULL, 4, 1, 'Uploads/Files/5G Technology.pdf', 1, 2, '2023-11-18 23:28:24', '2023-11-18 23:28:24'),
(2, NULL, 2, 6, 'Uploads/Files/5G Technology and Future of Architecture.pdf', 2, 2, '2023-11-19 00:33:08', '2023-11-19 00:33:08'),
(3, NULL, 3, 7, 'Uploads/Files/Example Project.pdf', 3, 2, '2023-11-19 05:25:42', '2023-11-19 05:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

DROP TABLE IF EXISTS `tbl_logs`;
CREATE TABLE IF NOT EXISTS `tbl_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_logs_user_logs_fk_foreign` (`user_logs_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_logs`
--

INSERT INTO `tbl_logs` (`id`, `activity`, `user_logs_fk`, `created_at`, `updated_at`) VALUES
(1, 'SCHOOL OF BUSINESS ADMINISTRATION AND MANAGEMENT', 1, '2023-11-17 08:21:50', '2023-11-17 08:21:50'),
(2, 'SCHOOL OF ENGINEERING AND TECHNOLOGY', 1, '2023-11-17 08:22:58', '2023-11-17 08:22:58'),
(3, 'SCHOOL OF AGRICULTURE AND ENVIRONMENTAL SCIENCE', 1, '2023-11-17 08:26:13', '2023-11-17 08:26:13'),
(4, 'SCHOOL OF INFORMATION AND COMMUNICATION TECHNOLOGY', 1, '2023-11-17 08:28:14', '2023-11-17 08:28:14'),
(5, 'Uploading 5G Technology', 1, '2023-11-18 23:28:24', '2023-11-18 23:28:24'),
(6, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:31:45', '2023-11-18 23:31:45'),
(7, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:40:15', '2023-11-18 23:40:15'),
(8, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:40:39', '2023-11-18 23:40:39'),
(9, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:41:32', '2023-11-18 23:41:32'),
(10, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:48:50', '2023-11-18 23:48:50'),
(11, 'Search 5g Using SearchEngine', 2, '2023-11-18 23:49:50', '2023-11-18 23:49:50'),
(12, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:11:28', '2023-11-19 00:11:28'),
(13, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:13:22', '2023-11-19 00:13:22'),
(14, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:13:52', '2023-11-19 00:13:52'),
(15, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:14:17', '2023-11-19 00:14:17'),
(16, 'Uploading 5G Technology and Future of Architecture', 1, '2023-11-19 00:33:08', '2023-11-19 00:33:08'),
(17, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:55:45', '2023-11-19 00:55:45'),
(18, 'Search 5g Using SearchEngine', 2, '2023-11-19 00:56:07', '2023-11-19 00:56:07'),
(19, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:03:17', '2023-11-19 01:03:17'),
(20, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:05:37', '2023-11-19 01:05:37'),
(21, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:06:06', '2023-11-19 01:06:06'),
(22, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:07:16', '2023-11-19 01:07:16'),
(23, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:11:40', '2023-11-19 01:11:40'),
(24, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:12:35', '2023-11-19 01:12:35'),
(25, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:13:17', '2023-11-19 01:13:17'),
(26, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:14:26', '2023-11-19 01:14:26'),
(27, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:15:09', '2023-11-19 01:15:09'),
(28, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:15:47', '2023-11-19 01:15:47'),
(29, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:16:09', '2023-11-19 01:16:09'),
(30, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:16:32', '2023-11-19 01:16:32'),
(31, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:16:57', '2023-11-19 01:16:57'),
(32, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:17:39', '2023-11-19 01:17:39'),
(33, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:18:14', '2023-11-19 01:18:14'),
(34, 'Search 5g Using SearchEngine', 2, '2023-11-19 01:20:55', '2023-11-19 01:20:55'),
(35, 'Uploading Example Project', 1, '2023-11-19 05:25:42', '2023-11-19 05:25:42'),
(36, 'Search crops Using SearchEngine', 2, '2023-11-19 05:26:03', '2023-11-19 05:26:03'),
(37, 'Search 5g Using SearchEngine', 2, '2023-11-19 05:29:04', '2023-11-19 05:29:04'),
(38, 'Search 5g Using SearchEngine', 2, '2023-11-19 05:35:04', '2023-11-19 05:35:04'),
(39, 'Search 5g Using SearchEngine', 2, '2023-11-21 04:46:22', '2023-11-21 04:46:22'),
(40, 'Posted an Announcement', 1, '2023-11-21 07:12:43', '2023-11-21 07:12:43'),
(41, 'Posted an Announcement', 1, '2023-11-21 07:13:25', '2023-11-21 07:13:25'),
(42, 'Search 5g Using SearchEngine', 2, '2023-11-22 05:49:37', '2023-11-22 05:49:37'),
(43, 'Search 5g Using SearchEngine', 2, '2023-11-22 05:50:46', '2023-11-22 05:50:46'),
(44, 'Search 5g Using SearchEngine', 2, '2023-11-22 05:56:53', '2023-11-22 05:56:53'),
(45, 'Search 5g Using SearchEngine', 2, '2023-11-22 07:51:30', '2023-11-22 07:51:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reports`
--

DROP TABLE IF EXISTS `tbl_reports`;
CREATE TABLE IF NOT EXISTS `tbl_reports` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `messagecode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_msg` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_report_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_reports_user_report_fk_foreign` (`user_report_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_school_year`
--

DROP TABLE IF EXISTS `tbl_school_year`;
CREATE TABLE IF NOT EXISTS `tbl_school_year` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `SchoolYear` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_status` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_school_year`
--

INSERT INTO `tbl_school_year` (`id`, `SchoolYear`, `year_status`, `created_at`, `updated_at`) VALUES
(1, '2023-2024', 1, '2023-11-11 21:18:06', '2023-11-11 21:18:06'),
(2, '2024-2025', 0, '2023-11-12 05:00:44', '2023-11-12 05:00:44');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_visit`
--

DROP TABLE IF EXISTS `tbl_visit`;
CREATE TABLE IF NOT EXISTS `tbl_visit` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `document_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IP` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_visit_user_fk_foreign` (`user_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_visit`
--

INSERT INTO `tbl_visit` (`id`, `document_code`, `IP`, `user_fk`, `created_at`, `updated_at`) VALUES
(1, '561463a3f1f8a25b1ff3d10a237d4f35', '49.145.106.109', 2, '2023-11-19 01:20:58', '2023-11-19 01:20:58'),
(2, '3906a54ce4f98c032d3c36d746230c45', '49.145.106.100', 2, '2023-11-19 01:31:44', '2023-11-19 01:31:44'),
(3, '3906a54ce4f98c032d3c36d746230c45', '49.145.106.109', 2, '2023-11-18 01:32:37', '2023-11-19 01:32:37'),
(4, '21b6106cff66445848b215687fe4a9b4', '49.145.106.109', 2, '2023-11-19 05:26:15', '2023-11-19 05:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(4) NOT NULL,
  `department_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `course_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `birthdate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `department_fk` (`department_fk`),
  KEY `course_fk` (`course_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `first_name`, `middle_name`, `last_name`, `student_no`, `email`, `role`, `department_fk`, `course_fk`, `status`, `birthdate`, `email_verified_at`, `password`, `secret`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Library', ' ', ' ', '202323321', 'admin@gmail.com', 1, 1, 2, 1, NULL, NULL, '$2y$10$qsFKTQZmw6Fx.7teuFIwMuxdqPYb7gbdOHVJcNNdPNRl7vo1LLHAq', 'hackfb123', NULL, NULL, NULL),
(2, 'Georgie Mordeno Recabo', 'Georgie', 'Mordeno', 'Recabo', '2020-00649', 'hannakaye.redondo@nmsc.edu.ph', 2, 4, 4, 1, NULL, NULL, '$2y$10$Eyut9cJyhYxkeWK2XJ.zjufYjcBdTclEWCDCFIJvMjr/s9CcmOsmK', '2020-00649', NULL, '2023-11-18 18:26:46', '2023-11-18 18:26:46'),
(3, 'Dennis Estor Pitogo', 'Dennis', 'Estor', 'Pitogo', '2020-00377', 'dennis.pitogo@nmsc.edu.ph', 2, 4, 1, 1, NULL, NULL, '$2y$10$4/YPKrL/JrP62xso7ONYbO5hxT.nxbeLpvBlYMc47/HUTOswNTkSu', '2020-00377', NULL, '2023-11-19 05:17:09', '2023-11-19 05:17:09');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_author`
--
ALTER TABLE `tbl_author`
  ADD CONSTRAINT `tbl_author_ibfk_1` FOREIGN KEY (`document_fk`) REFERENCES `tbl_document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_author_ibfk_2` FOREIGN KEY (`author_user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_contact`
--
ALTER TABLE `tbl_contact`
  ADD CONSTRAINT `tbl_contact_contact_user_fk_foreign` FOREIGN KEY (`contact_user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD CONSTRAINT `tbl_course_department_fk_foreign` FOREIGN KEY (`department_fk`) REFERENCES `tbl_department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_documentinfo`
--
ALTER TABLE `tbl_documentinfo`
  ADD CONSTRAINT `tbl_documentinfo_course_fk_foreign` FOREIGN KEY (`course_fk`) REFERENCES `tbl_course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_documentinfo_department_fk_foreign` FOREIGN KEY (`department_fk`) REFERENCES `tbl_department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_documentinfo_docu_fk_foreign` FOREIGN KEY (`docu_fk`) REFERENCES `tbl_document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_documentinfo_year_fk_foreign` FOREIGN KEY (`year_fk`) REFERENCES `tbl_school_year` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD CONSTRAINT `tbl_logs_user_logs_fk_foreign` FOREIGN KEY (`user_logs_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_reports`
--
ALTER TABLE `tbl_reports`
  ADD CONSTRAINT `tbl_reports_user_report_fk_foreign` FOREIGN KEY (`user_report_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_visit`
--
ALTER TABLE `tbl_visit`
  ADD CONSTRAINT `tbl_visit_user_fk_foreign` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department_fk`) REFERENCES `tbl_department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`course_fk`) REFERENCES `tbl_course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
