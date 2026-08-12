-- daamal.org-ийн холбоо барих формоор ирсэн бартерын санал (MariaDB / MySQL).
-- Идемпотент: олон удаа ажиллуулж болно.
--
-- utf8mb4 нь заавал — utf8 (3 байт) нь кирилл болон эможийг бүрэн барьдаггүй.

CREATE TABLE IF NOT EXISTS barter_offers (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(200) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  industry    VARCHAR(200) NOT NULL DEFAULT '',
  `offer`     TEXT         NOT NULL,
  -- Spam мөрдөхөд
  ip          VARCHAR(64)  NOT NULL DEFAULT '',
  user_agent  VARCHAR(300) NOT NULL DEFAULT '',
  -- Мэдэгдлийн имэйл амжилттай явсан хугацаа (UTC); NULL бол яваагүй
  emailed_at  DATETIME     NULL DEFAULT NULL,
  created_at  DATETIME     NOT NULL DEFAULT UTC_TIMESTAMP(),
  PRIMARY KEY (id),
  -- Шинэ саналуудыг эрэмбэлж уншихад
  KEY barter_offers_created_idx (created_at)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
