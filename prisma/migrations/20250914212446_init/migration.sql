-- Migración para el sistema de cursos
-- Archivo: prisma/migrations/add_course_system/migration.sql

-- Enum para tipos de curso
CREATE TYPE "CourseType" AS ENUM ('FULLSTACK', 'DEVOPS');

-- Enum para niveles de curso
CREATE TYPE "CourseLevel" AS ENUM ('ENTRY_LEVEL', 'BOOTCAMP', 'MID_LEVEL', 'SENIOR');

-- Enum para estado de progreso
CREATE TYPE "ProgressStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED');

-- Tabla de cursos
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" "CourseType" NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "duration_weeks" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- Tabla de capítulos/semanas
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "week_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "unlock_date" TIMESTAMP(3),
    "theoretical_content" TEXT,
    "practical_requirements" TEXT,
    "min_score_theory" INTEGER NOT NULL DEFAULT 80,
    "min_score_practice" INTEGER NOT NULL DEFAULT 80,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- Tabla de recursos por capítulo
CREATE TABLE "ChapterResource" (
    "id" SERIAL NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL, -- 'VIDEO', 'DOCUMENT', 'QUIZ', 'LAB', 'EXTERNAL_LINK'
    "title" TEXT NOT NULL,
    "url" TEXT,
    "content" TEXT,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChapterResource_pkey" PRIMARY KEY ("id")
);

-- Tabla de inscripciones de usuarios a cursos
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- Tabla de progreso de capítulos
CREATE TABLE "ChapterProgress" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'LOCKED',
    "theory_score" INTEGER,
    "practice_score" INTEGER,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "last_accessed" TIMESTAMP(3),

    CONSTRAINT "ChapterProgress_pkey" PRIMARY KEY ("id")
);

-- Tabla de evaluaciones/quizzes
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL, -- 'QUIZ', 'LAB', 'PROJECT'
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "max_attempts" INTEGER DEFAULT 3,
    "time_limit_minutes" INTEGER,
    "passing_score" INTEGER NOT NULL DEFAULT 80,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- Tabla de intentos de evaluación
CREATE TABLE "AssessmentAttempt" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "assessment_id" INTEGER NOT NULL,
    "score" INTEGER,
    "answers" JSONB,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMP(3),
    "attempt_number" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "AssessmentAttempt_pkey" PRIMARY KEY ("id")
);

-- Agregar role a la tabla User
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'STUDENT';
-- Posibles valores: 'ADMIN', 'INSTRUCTOR', 'STUDENT'

-- Crear índices únicos
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE UNIQUE INDEX "Enrollment_user_course_key" ON "Enrollment"("user_id", "course_id");
CREATE UNIQUE INDEX "ChapterProgress_user_chapter_key" ON "ChapterProgress"("user_id", "chapter_id");

-- Crear índices para performance
CREATE INDEX "Chapter_course_id_week_number_idx" ON "Chapter"("course_id", "week_number");
CREATE INDEX "ChapterResource_chapter_id_order_idx" ON "ChapterResource"("chapter_id", "order_index");
CREATE INDEX "ChapterProgress_user_id_idx" ON "ChapterProgress"("user_id");
CREATE INDEX "AssessmentAttempt_user_assessment_idx" ON "AssessmentAttempt"("user_id", "assessment_id");

-- Foreign Keys
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChapterResource" ADD CONSTRAINT "ChapterResource_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChapterProgress" ADD CONSTRAINT "ChapterProgress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChapterProgress" ADD CONSTRAINT "ChapterProgress_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;