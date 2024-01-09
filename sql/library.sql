-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 09, 2024 at 08:38 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(16, '2023_11_21_145406_create_tbl_announcement_table', 9),
(17, '2023_12_04_105345_create_tbl_sample_table', 10),
(18, '2024_01_08_042356_create_tbl_history_table', 11),
(19, '2024_01_08_204311_create_tbl_authors_table', 12);

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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(24, 'App\\Models\\User', 3, 'dennis.pitogo@nmsc.edu.ph_User', 'bf3dde679dc398619edc582ab96e36e52c96e1ec110ebbd617e0bd91e0ba24a0', '[\"server:user\"]', '2023-12-02 22:47:58', '2023-12-02 10:39:59', '2023-12-02 22:47:58'),
(52, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '8e44d9d889a87c521afd925ce2790baf65b8ac7957b6eb1743822cd52265dc63', '[\"server:admin\"]', '2023-12-17 10:21:59', '2023-12-17 02:12:44', '2023-12-17 10:21:59'),
(58, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '351878a70a55f00c0e97cedcf144f88c00929e1935f4a557d6644c5752f7b8de', '[\"server:admin\"]', '2023-12-23 07:09:33', '2023-12-23 07:08:00', '2023-12-23 07:09:33'),
(59, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', 'a8aa7159e42e4c20fb8f3670f48228589382cacb5b568ea1c1ee99563d5781e9', '[\"server:admin\"]', '2023-12-23 08:14:58', '2023-12-23 07:29:08', '2023-12-23 08:14:58'),
(60, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', '455dd893eac2213bb41463589c2fd5cb04a53774f6c17224b2336179e7b7dd31', '[\"server:admin\"]', '2023-12-28 04:39:03', '2023-12-27 23:28:44', '2023-12-28 04:39:03'),
(63, 'App\\Models\\User', 1, 'admin@gmail.com_Admin', 'a3745fa2af77d15042acb0a11b34a6f309d3dedaab563f70e62905e9373f69db', '[\"server:admin\"]', '2024-01-08 21:53:35', '2024-01-07 12:23:59', '2024-01-08 21:53:35'),
(65, 'App\\Models\\User', 2, 'hannakaye.redondo@nmsc.edu.ph_User', '602e0206f2b74b5bf53d47e037ba0f9617538b58d94f8a9260690377ece6d527', '[\"server:user\"]', '2024-01-08 21:48:55', '2024-01-07 20:41:58', '2024-01-08 21:48:55');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

DROP TABLE IF EXISTS `tbl_announcement`;
CREATE TABLE IF NOT EXISTS `tbl_announcement` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_annoucment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_announcement`
--

INSERT INTO `tbl_announcement` (`id`, `title`, `date_annoucment`, `description`, `created_at`, `updated_at`) VALUES
(1, 'BSIT Event', 'Nov 22 2023', 'Reminder:\n\nNo Open on dawdwa', '2023-11-21 07:12:43', '2023-11-21 07:12:43'),
(2, 'Library Event', 'Nov 22 2023', 'awhdoiawdaiwdawd', '2023-11-21 07:13:25', '2023-11-21 07:13:25'),
(3, 'Visit', 'Dec 13 2023', 'lorem awdaw', '2023-12-04 09:56:12', '2023-12-04 09:56:12'),
(4, 'Example Annoucement', 'Dec 19 2023', 'Sample', '2023-12-10 04:37:36', '2023-12-10 04:37:36'),
(5, 'Christmas Party', 'Dec 25 2023', 'Holiday', '2023-12-23 07:09:14', '2023-12-23 07:09:14');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_author`
--

INSERT INTO `tbl_author` (`id`, `author_user_fk`, `author`, `document_fk`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, 1, NULL, NULL),
(2, 2, NULL, 2, NULL, NULL),
(3, 2, NULL, 3, NULL, NULL),
(4, 3, NULL, 3, NULL, NULL),
(5, 17, NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authors`
--

DROP TABLE IF EXISTS `tbl_authors`;
CREATE TABLE IF NOT EXISTS `tbl_authors` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_user_fk` bigint(20) UNSIGNED NOT NULL,
  `document_fk` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_authors_author_user_fk_foreign` (`author_user_fk`),
  KEY `tbl_authors_document_fk_foreign` (`document_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_count`
--

INSERT INTO `tbl_count` (`id`, `document_access_code`, `visit_count`, `created_at`, `updated_at`) VALUES
(1, '561463a3f1f8a25b1ff3d10a237d4f35', 1, '2023-11-19 01:20:58', '2023-11-19 01:20:58'),
(2, '3906a54ce4f98c032d3c36d746230c45', 1, '2023-11-19 01:31:44', '2023-11-19 01:31:44'),
(3, '3906a54ce4f98c032d3c36d746230c45', 1, '2023-11-19 01:32:37', '2023-11-19 01:32:37'),
(4, '21b6106cff66445848b215687fe4a9b4', 1, '2023-11-19 05:26:15', '2023-11-19 05:26:15'),
(5, '561463a3f1f8a25b1ff3d10a237d4f35', 1, '2023-12-02 10:40:21', '2023-12-02 10:40:21'),
(6, '3906a54ce4f98c032d3c36d746230c45', 1, '2023-12-11 10:51:02', '2023-12-11 10:51:02'),
(7, '21b6106cff66445848b215687fe4a9b4', 1, '2023-12-15 10:28:12', '2023-12-15 10:28:12'),
(8, '0bc6dfcfab87f358bf6705a3bd91fd3d', 1, '2023-12-17 10:21:17', '2023-12-17 10:21:17'),
(9, '561463a3f1f8a25b1ff3d10a237d4f35', 1, '2024-01-07 20:42:06', '2024-01-07 20:42:06');

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
(1, 'Bachelor of Science in Information - BSIT', 1, 4, '2023-11-17 08:28:50', '2023-12-04 08:35:33'),
(2, 'Bachelor of Science in Information System - BSIS', 1, 4, '2023-11-17 08:29:11', '2023-11-17 08:29:11'),
(3, 'Bachelor of Science in Communication Technology - BSCT', 1, 4, '2023-11-17 08:29:36', '2023-11-17 08:29:36'),
(4, 'Bachelor of Science in Animation and Multimedia Arts - BSAM', 1, 4, '2023-11-17 08:29:58', '2023-11-17 08:29:58'),
(5, 'Bachelor of Science in Industrial Technology with majors in Automotive Technology', 1, 4, '2023-11-18 17:40:40', '2023-12-10 04:45:06'),
(6, 'Bachelor of Engineering Technology with majors in Electrical Engineering Technology', 1, 2, '2023-11-18 18:01:35', '2023-11-18 18:01:35'),
(7, 'Bachelor of Science in Agriculture with majors in Crop Science', 1, 3, '2023-11-19 05:21:56', '2023-12-10 04:45:48');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`id`, `department`, `department_code`, `color_code`, `created_at`, `updated_at`) VALUES
(1, 'SCHOOL OF BUSINESS ADMINISTRATION AND MANAGEMENT', 'SBAM', '#ad3ead', '2023-11-17 08:21:50', '2023-11-17 08:21:50'),
(2, 'SCHOOL OF ENGINEERING AND TECHNOLOGY', 'SET', '#fa9f37', '2023-11-17 08:22:58', '2023-11-17 08:22:58'),
(3, 'SCHOOL OF AGRICULTURE AND ENVIRONMENTAL SCIENCE', 'SAES', '#29ba3c', '2023-11-17 08:26:13', '2023-11-17 08:26:13'),
(4, 'SCHOOL OF INFORMATION AND COMMUNICATION TECHNOLOGY', 'SICT', '#535954', '2023-11-17 08:28:14', '2023-11-17 08:28:14'),
(5, 'Computer Studies Program', 'CSP', '#cc46cc', '2023-12-10 04:50:58', '2023-12-10 04:50:58');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_document`
--

INSERT INTO `tbl_document` (`id`, `title`, `uniquecode`, `description`, `year_published`, `keywords`, `is_active_docu`, `created_at`, `updated_at`) VALUES
(1, '5G Technology', '561463a3f1f8a25b1ff3d10a237d4f35', '5G is almost around the corner. 5G as a buzzword has been knocking on our doors for some time\r\nnow sans a lot of action on the ground. However, that’s about to change as the Department of\r\nTelecom (DOT) recently approved applications from Telecom Service Providers (TSPs) to conduct\r\ntrials for the use and application of 5G technology. While field trials begin here in India, 5G as\r\na technology has been commercially available in just over 50 countries such as France, South\r\nKorea, the US, etc. for a few years and there are valuable lessons that we can take from launches,\r\nsuccesses, and failures in these markets. Indian operators could learn from their counterparts’\r\nexperience and avoid or rather not repeat the same mistake which their counterparts might have\r\nmade.\r\nLet’s take the case of 5G in France that has been commercially available since November 2020.\r\nA recent study done by us showed that there exists a gap in the quality of experience delivered by\r\nTSPs on 5G. The study was the first of its kind, measured experience on real devices placed in\r\nactual customer locations across nine major French cities. It revealed that while the incumbent\r\noperator provided average speeds of 146 Mbps, the newer operator is left far behind at 28 Mbps,\r\nwhich is a speed one would expect on 4G. These discrepancies between operators could be a result\r\nof different deployment strategies.\r\nSuch discrepancies can be problematic as they finally impact end customers. And in today’s time\r\nwhen the nation is grappling a devastating second wave of the Covid-19 pandemic, providing\r\nseamless digital experience so that digital applications ranging from education and work to\r\nentertainment and dining can continue remotel', '2021', '5G,New Technology,Support', 1, '2023-11-18 23:28:24', '2023-11-18 23:28:24'),
(2, '5G Technology and Future of Architecture', '3906a54ce4f98c032d3c36d746230c45', 'Architecture is the true expression of people’s lives within a framework of different aspects, including socio-economic, cultural,\r\ntraditional, spiritual, and technological. Throughout history, technology has a significant impact on the development of architectural\r\nforms and structures. Nowadays, the progress of advanced technology began to reach an unprecedented level in the age of the\r\ninternet and its related technologies. Since the appearance of the wireless connectivity, architecture, and urban design began to take\r\nanother dimension in the design process to adopt the new technology and integrated it within its envelope. At the beginning of the\r\n21st century, new approaches began to take place in the city, such as the Internet of Things (IoT) and, more recently, the 4G and\r\n5G wireless technology. However, the effectiveness of these advanced technologies depends on both the wireless signal coverage\r\nand the deployment of their equipment. In this context, these technologies impose a new challenge for architects, urban designers,\r\nand the construction industry to embrace them within the concept of the smart city. This study focuses on the analysis of 5G\r\ntechnology and highlighting its advantages and disadvantages, which impact the visual appearance and aesthetics of both buildings\r\nand the city. The study also intends to explore the various possible solutions to overcome the predicament of the wireless signal.', '2023', '5g,Smart City,Building Materials,Urban Design', 0, '2023-11-19 00:33:08', '2023-11-19 00:33:08'),
(3, 'Example Project', '21b6106cff66445848b215687fe4a9b4', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit at animi eius minima unde nulla sapiente. Laboriosam hic eius consequuntur maxime odit explicabo eos animi maiores, non aspernatur temporibus magnam cum ducimus mollitia? Porro, reiciendis pariatur facilis voluptatum laudantium saepe et hic unde cupiditate! Aliquam iure voluptas perspiciatis quaerat?', '2024', 'Crops,Coconut,grass,soil', 0, '2023-11-19 05:25:42', '2023-11-19 05:25:42'),
(4, 'Eye Contact Radiation', '0bc6dfcfab87f358bf6705a3bd91fd3d', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', '2021', 'Eye,monitor,technology', 0, '2023-12-17 10:19:37', '2023-12-17 10:19:37');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_documentinfo`
--

INSERT INTO `tbl_documentinfo` (`id`, `adviser`, `department_fk`, `course_fk`, `file`, `docu_fk`, `year_fk`, `created_at`, `updated_at`) VALUES
(1, NULL, 4, 1, 'Uploads/Files/5G Technology.pdf', 1, 2, '2023-11-18 23:28:24', '2023-11-18 23:28:24'),
(2, NULL, 2, 6, 'Uploads/Files/5G Technology and Future of Architecture.pdf', 2, 2, '2023-11-19 00:33:08', '2023-11-19 00:33:08'),
(3, NULL, 4, 7, 'Uploads/Files/Example Project.pdf', 3, 2, '2023-11-19 05:25:42', '2023-11-19 05:25:42'),
(4, NULL, 2, 6, 'Uploads/Files/Eye Contact Radiation.pdf', 4, 2, '2023-12-17 10:19:37', '2023-12-17 10:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_history`
--

DROP TABLE IF EXISTS `tbl_history`;
CREATE TABLE IF NOT EXISTS `tbl_history` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_history`
--

INSERT INTO `tbl_history` (`id`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hannakaye.redondo@nmsc.edu.ph', 1, '2024-01-07 20:35:53', '2024-01-07 20:35:53'),
(2, 'hannakaye.redondo@nmsc.edu.ph', 0, '2024-01-07 20:36:05', '2024-01-07 20:36:05'),
(3, 'hannakaye.redondo@nmsc.edu.ph', 1, '2024-01-07 20:41:58', '2024-01-07 20:41:58');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

DROP TABLE IF EXISTS `tbl_logs`;
CREATE TABLE IF NOT EXISTS `tbl_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_logs_user_logs_fk_foreign` (`user_logs_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(45, 'Search 5g Using SearchEngine', 2, '2023-11-22 07:51:30', '2023-11-22 07:51:30'),
(46, 'Search 5g Using SearchEngine', 3, '2023-12-02 10:40:14', '2023-12-02 10:40:14'),
(47, 'Search 5g Using SearchEngine', 2, '2023-12-04 01:31:20', '2023-12-04 01:31:20'),
(48, 'Search 5g Using SearchEngine', 2, '2023-12-04 02:35:57', '2023-12-04 02:35:57'),
(49, 'Craete an Announcement', 1, '2023-12-04 09:56:12', '2023-12-04 09:56:12'),
(50, 'Search 5g Using SearchEngine', 2, '2023-12-04 21:53:50', '2023-12-04 21:53:50'),
(51, 'Search 5g Using SearchEngine', 2, '2023-12-04 22:01:49', '2023-12-04 22:01:49'),
(52, 'Search 5g Using SearchEngine', 2, '2023-12-05 10:40:37', '2023-12-05 10:40:37'),
(53, 'Search 5g Using SearchEngine', 2, '2023-12-09 12:06:16', '2023-12-09 12:06:16'),
(54, 'Craete an Announcement', 1, '2023-12-10 04:37:36', '2023-12-10 04:37:36'),
(55, 'Search 5g Using SearchEngine', 2, '2023-12-10 04:49:14', '2023-12-10 04:49:14'),
(56, 'Create New Department Computer Studies Program', 1, '2023-12-10 04:50:58', '2023-12-10 04:50:58'),
(57, 'Search 5g Using SearchEngine', 2, '2023-12-10 22:26:20', '2023-12-10 22:26:20'),
(58, 'Search 5g Using SearchEngine', NULL, '2023-12-11 10:23:44', '2023-12-11 10:23:44'),
(59, 'Search 5g Using SearchEngine', 2, '2023-12-11 10:24:29', '2023-12-11 10:24:29'),
(60, 'Search 5g Using SearchEngine', NULL, '2023-12-11 10:26:20', '2023-12-11 10:26:20'),
(61, 'Search 5g Using SearchEngine', NULL, '2023-12-11 10:50:04', '2023-12-11 10:50:04'),
(62, 'Search 5g Using SearchEngine', NULL, '2023-12-11 10:51:23', '2023-12-11 10:51:23'),
(63, 'Search 5g Using SearchEngine', NULL, '2023-12-11 11:14:38', '2023-12-11 11:14:38'),
(64, 'Search 5g Using SearchEngine', NULL, '2023-12-11 12:19:55', '2023-12-11 12:19:55'),
(65, 'Search 5g Using SearchEngine', 2, '2023-12-14 12:38:15', '2023-12-14 12:38:15'),
(66, 'Search 5g Using SearchEngine', 2, '2023-12-14 12:48:27', '2023-12-14 12:48:27'),
(67, 'Search 5g Using SearchEngine', 2, '2023-12-14 12:50:11', '2023-12-14 12:50:11'),
(68, 'Search 5g Using SearchEngine', 2, '2023-12-14 12:51:24', '2023-12-14 12:51:24'),
(69, 'Search 5g Using SearchEngine', 4, '2023-12-15 02:09:57', '2023-12-15 02:09:57'),
(70, 'Search 5g Using SearchEngine', 4, '2023-12-15 10:24:06', '2023-12-15 10:24:06'),
(71, 'Search crops Using SearchEngine', 4, '2023-12-15 10:28:02', '2023-12-15 10:28:02'),
(72, 'Search 5g Using SearchEngine', 2, '2023-12-17 02:04:58', '2023-12-17 02:04:58'),
(73, 'Search 5g Using SearchEngine', 4, '2023-12-17 02:15:19', '2023-12-17 02:15:19'),
(74, 'Search 5g Using SearchEngine', 4, '2023-12-17 02:41:09', '2023-12-17 02:41:09'),
(75, 'Uploading Eye Contact Radiation', 1, '2023-12-17 10:19:37', '2023-12-17 10:19:37'),
(76, 'Search eye Using SearchEngine', 4, '2023-12-17 10:21:12', '2023-12-17 10:21:12'),
(77, 'Search eye Using SearchEngine', NULL, '2023-12-17 10:23:40', '2023-12-17 10:23:40'),
(78, 'Search 5g Using SearchEngine', 4, '2023-12-17 10:25:23', '2023-12-17 10:25:23'),
(79, 'Search 5g Using SearchEngine', 2, '2023-12-20 15:07:48', '2023-12-20 15:07:48'),
(80, 'Craete an Announcement', 1, '2023-12-23 07:09:14', '2023-12-23 07:09:14'),
(81, 'Search 5g Using SearchEngine', 2, '2023-12-27 23:41:53', '2023-12-27 23:41:53'),
(82, 'Search 5g Using SearchEngine', 2, '2023-12-28 00:15:38', '2023-12-28 00:15:38'),
(83, 'Search 5g Using SearchEngine', 2, '2024-01-07 20:42:03', '2024-01-07 20:42:03'),
(84, 'Search 5g Using SearchEngine', 2, '2024-01-08 13:39:52', '2024-01-08 13:39:52'),
(85, 'Search 5g Using SearchEngine', 2, '2024-01-08 20:04:19', '2024-01-08 20:04:19'),
(86, 'Search 5g Using SearchEngine', 1, '2024-01-09 12:12:59', '2024-01-09 12:12:59'),
(87, 'Search 5g Using SearchEngine', 1, '2024-01-09 12:13:06', '2024-01-09 12:13:06'),
(88, 'Search 5g Using SearchEngine', 1, '2024-01-09 12:20:05', '2024-01-09 12:20:05'),
(89, 'Search 5g Using SearchEngine', 4, '2024-01-09 12:29:46', '2024-01-09 12:29:46');

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
-- Table structure for table `tbl_sample`
--

DROP TABLE IF EXISTS `tbl_sample`;
CREATE TABLE IF NOT EXISTS `tbl_sample` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_visit`
--

INSERT INTO `tbl_visit` (`id`, `document_code`, `IP`, `user_fk`, `created_at`, `updated_at`) VALUES
(1, '561463a3f1f8a25b1ff3d10a237d4f35', '49.145.106.109', 2, '2023-11-19 01:20:58', '2023-11-19 01:20:58'),
(2, '3906a54ce4f98c032d3c36d746230c45', '49.145.106.100', 2, '2023-11-19 01:31:44', '2023-11-19 01:31:44'),
(3, '3906a54ce4f98c032d3c36d746230c45', '49.145.106.109', 2, '2023-11-18 01:32:37', '2023-11-19 01:32:37'),
(4, '21b6106cff66445848b215687fe4a9b4', '49.145.106.109', 2, '2023-11-19 05:26:15', '2023-11-19 05:26:15'),
(5, '561463a3f1f8a25b1ff3d10a237d4f35', '49.145.96.210', 3, '2023-12-02 10:40:21', '2023-12-02 10:40:21'),
(6, '3906a54ce4f98c032d3c36d746230c45', '49.145.96.210', 2, '2023-12-11 10:51:02', '2023-12-11 10:51:02'),
(7, '21b6106cff66445848b215687fe4a9b4', '49.145.96.210', 4, '2023-12-15 10:28:12', '2023-12-15 10:28:12'),
(8, '0bc6dfcfab87f358bf6705a3bd91fd3d', '49.145.96.210', 4, '2023-12-17 10:21:17', '2023-12-17 10:21:17'),
(9, '561463a3f1f8a25b1ff3d10a237d4f35', '49.145.109.119', 2, '2024-01-07 20:42:06', '2024-01-07 20:42:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint(4) NOT NULL,
  `department_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `course_fk` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `birthdate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `department_fk` (`department_fk`),
  KEY `course_fk` (`course_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `first_name`, `middle_name`, `last_name`, `student_no`, `email`, `role`, `department_fk`, `course_fk`, `status`, `birthdate`, `email_verified_at`, `password`, `secret`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Library', ' ', ' ', '202323321', 'admin@gmail.com', 1, 1, 2, 1, NULL, NULL, '$2y$10$qsFKTQZmw6Fx.7teuFIwMuxdqPYb7gbdOHVJcNNdPNRl7vo1LLHAq', 'hackfb123', NULL, NULL, '2023-12-09 11:51:07'),
(2, 'Georgie Mordeno Recabo', 'Georgie', 'Mordeno', 'Recabo', '2020-00649', 'hannakaye.redondo@nmsc.edu.ph', 2, 4, 4, 1, NULL, NULL, '$2y$10$Eyut9cJyhYxkeWK2XJ.zjufYjcBdTclEWCDCFIJvMjr/s9CcmOsmK', '2020-00649', NULL, '2023-11-18 18:26:46', '2023-11-18 18:26:46'),
(3, 'Dennis Estor Pitogo', 'Dennis', 'Estor', 'Pitogo', '2020-00377', 'dennis.pitogo@nmsc.edu.ph', 2, 4, 1, 1, NULL, NULL, '$2y$10$4/YPKrL/JrP62xso7ONYbO5hxT.nxbeLpvBlYMc47/HUTOswNTkSu', '2020-00377', NULL, '2023-11-19 05:17:09', '2023-11-19 05:17:09'),
(4, 'siahdasiodh eaiofh efihsef', 'siahdasiodh', 'eaiofh', 'efihsef', '23434', 'artamay1@gmail.com', 2, 4, 3, 1, NULL, NULL, '$2y$10$Pif/eSFB0PJpfuNUN20.fOy96ADUGlcnEKXLkMMOjNg3fqGx3JcA6', '2343440eb8fd1', NULL, '2023-12-01 23:47:00', '2023-12-09 11:49:06'),
(5, 'pofjada ejfeoifheifh ihefiseohf', 'pofjada', 'ejfeoifheifh', 'ihefiseohf', '21936', 'dwadaw12@gmail.com', 2, 2, 6, 1, NULL, NULL, '$2y$10$atLdWhEdzpR.0GTQRgKe.OuVBgERnDmdjtz5dW0eyxGDIuXg5F8zG', '21936aaaccdb1', NULL, '2023-12-01 23:49:10', '2023-12-01 23:49:10'),
(6, 'ifhseohf duwahdusief dwuiagdu', 'ifhseohf', 'duwahdusief', 'dwuiagdu', '7667', 'loamwd@gmail.com', 2, 3, 7, 1, NULL, NULL, '$2y$10$XXXW/PHYWaF9jxzjsdnCq.4IKurFi3SNoyIl4tKMU8KrE2u0FwERy', '7667ccc0d49c', NULL, '2023-12-01 23:50:54', '2023-12-10 04:36:07'),
(7, 'hjk fghj ghjk', 'hjk', 'fghj', 'ghjk', '45678', 'loadwa@gmail.com', 2, 4, 4, 1, NULL, NULL, '$2y$10$CGXAqnzI.g44ddj/XxPUFe6OAOeaXJSy8AeMqvBHnwpKXdnnqetHq', '456786f57f3d0', NULL, '2023-12-01 23:53:26', '2023-12-09 11:48:48'),
(8, 'Dennis hjk hjkl', 'Dennis', 'hjk', 'hjkl', '56789', 'dennis@gmail.com', 2, 4, 3, 1, NULL, NULL, '$2y$10$lp9eA6BNoyGIQq7MFMeHbuXBAFKiBe5Qc5PLGCa4BMB6XMqbJIBGu', '56789aeadd61b', NULL, '2023-12-01 23:55:27', '2023-12-01 23:55:27'),
(9, 'Sherilyn  Briones', 'Sherilyn', NULL, 'Briones', '2341', 'artamay13@gmail.com', 2, 2, 6, 1, NULL, NULL, '$2y$10$FywarUL6VfrqyOIYlid/vuo6BfD.WNed.ndvUyZtOiYvqIg7Q6AuS', '23414cf0e1d7', NULL, '2023-12-01 23:56:48', '2023-12-01 23:56:48'),
(10, 'Georgie  Recabo', 'Georgie', NULL, 'Recabo', '14100001017', 'artamay14@gmail.com', 2, 4, 3, 1, NULL, NULL, '$2y$10$V0XLbK5xijc470UtQDZXROhrFbrEbJ.m7N0/nirFTYHILbUDQasv6', '1410000101786415513', NULL, '2023-12-02 00:00:42', '2023-12-02 00:00:42'),
(11, 'Jonelo Rama Cajeta', 'Jonelo', 'Rama', 'Cajeta', '2020-00654', 'jonelocajeta@gmail.com', 2, 4, 1, 1, NULL, NULL, '$2y$10$VUW32VGtzfNPs7la3vprI.i8aanuL.TJi7v9gsLUv2sEpdbdLw0M2', '2020-00654808261f3', NULL, '2023-12-04 01:16:44', '2023-12-04 01:16:44'),
(12, 'Lucian Akeem Alexa', 'Lucian', 'Akeem', 'Alexa', '', 'rygetah@gmail.com', 2, NULL, NULL, 1, NULL, NULL, '$2y$10$6q3xXe13N59CPUJ0SDGk1e/7cu8fSpx.gTNgIPf2yE9L65FBXANZW', 'alexa123', NULL, '2023-12-05 09:52:37', '2023-12-09 11:50:36'),
(13, NULL, NULL, NULL, NULL, NULL, 'jepexuv12@mailinator.com', 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2023-12-14 12:01:10', '2023-12-14 12:01:10'),
(14, NULL, NULL, NULL, NULL, NULL, 'jepex321uv@mailinator.com', 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2023-12-14 12:02:29', '2023-12-14 12:02:29'),
(15, 'Reybert Badang', 'Reybert', NULL, 'Badang', NULL, NULL, 3, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2023-12-17 09:35:11', '2023-12-17 09:35:11'),
(16, 'Hazel la Lamq', 'Hazel la', NULL, 'Lamq', NULL, NULL, 3, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2023-12-17 09:36:11', '2023-12-17 09:36:11'),
(17, 'Georgie Mordeno Recabo', 'Georgie', 'Mordeno', 'Recabo', '3123123321', 'artamay1331@gmail.com', 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, '2024-01-08 12:10:48', '2024-01-08 12:33:20'),
(18, 'Georgie Mordeno Recabo', 'Georgie', 'Mordeno', 'Recabo', '3123123321', 'artamay_geo1331@gmail.com', 2, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, '2024-01-08 12:27:21', '2024-01-08 12:31:37');

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
-- Constraints for table `tbl_authors`
--
ALTER TABLE `tbl_authors`
  ADD CONSTRAINT `tbl_authors_author_user_fk_foreign` FOREIGN KEY (`author_user_fk`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_authors_document_fk_foreign` FOREIGN KEY (`document_fk`) REFERENCES `tbl_document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
