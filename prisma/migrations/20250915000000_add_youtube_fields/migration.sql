ALTER TABLE "ChapterResource" ADD COLUMN "videoId" TEXT;
ALTER TABLE "ChapterResource" ADD COLUMN "thumbnail" TEXT;
ALTER TABLE "ChapterResource" ADD COLUMN "embedUrl" TEXT;
ALTER TABLE "ChapterResource" ADD COLUMN "isYouTube" BOOLEAN NOT NULL DEFAULT false;
