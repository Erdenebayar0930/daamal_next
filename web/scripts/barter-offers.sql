-- daamal.org-ийн холбоо барих формоор ирсэн бартерын санал.
-- Идемпотент: олон удаа ажиллуулж болно.

CREATE TABLE IF NOT EXISTS barter_offers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  email       text        NOT NULL,
  industry    text        NOT NULL DEFAULT '',
  offer       text        NOT NULL,
  -- Spam мөрдөхөд
  ip          text        NOT NULL DEFAULT '',
  user_agent  text        NOT NULL DEFAULT '',
  -- Мэдэгдлийн имэйл амжилттай явсан хугацаа; NULL бол яваагүй
  emailed_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Шинэ саналуудыг эрэмбэлж уншихад
CREATE INDEX IF NOT EXISTS barter_offers_created_idx
  ON barter_offers (created_at DESC);
