// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { config as env } from 'dotenv';


env({ path: '.env' });

// Cast PrismaClient to any to avoid type errors if types are out of sync
const prisma = new PrismaClient() as any;

async function upsertChapter(data: any) {
  const existing = await prisma.chapter.findFirst({
    where: { courseId: data.courseId, weekNumber: data.weekNumber },
  });
  if (existing) return prisma.chapter.update({ where: { id: existing.id }, data });
  return prisma.chapter.create({ data });
}

async function upsertChapterResource(data: any) {
  const existing = await prisma.chapterResource.findFirst({
    where: { chapterId: data.chapterId, orderIndex: data.orderIndex },
  });
  if (existing) return prisma.chapterResource.update({ where: { id: existing.id }, data });
  return prisma.chapterResource.create({ data });
}

async function upsertEnrollment(data: any) {
  const existing = await prisma.enrollment.findFirst({
    where: { userId: data.userId, courseId: data.courseId },
  });
  if (existing) return existing;
  return prisma.enrollment.create({ data });
}

async function upsertChapterProgress(data: any) {
  const existing = await prisma.chapterProgress.findFirst({
    where: { userId: data.userId, chapterId: data.chapterId },
  });
  if (existing) return prisma.chapterProgress.update({ where: { id: existing.id }, data });
  return prisma.chapterProgress.create({ data });
}


async function main() {
  console.log('🌱 Starting seed process...');

  // --- Admin ---
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  }
  const passwordHash = await hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },

    // Cast update to any to avoid type errors if generated types are outdated
    update: { role: 'ADMIN' } as any,
    create: {
      email: adminEmail,
      name: 'Admin',
      passwordHash,
      role: 'ADMIN'
    } as any


  });
  console.log('✅ Admin user created/updated');

  // --- Students ---
  const studentUsers = [
    { email: 'juan.perez@example.com', name: 'Juan Pérez' },
    { email: 'maria.garcia@example.com', name: 'María García' },
    { email: 'carlos.lopez@example.com', name: 'Carlos López' },
    { email: 'ana.martinez@example.com', name: 'Ana Martínez' },
    { email: 'pedro.rodriguez@example.com', name: 'Pedro Rodríguez' },
  ];

  const students = [];
  for (const u of studentUsers) {
    const h = await hash('student123', 12);
    const s = await prisma.user.upsert({
      where: { email: u.email },
      update: {},

      create: {
        email: userData.email,
        name: userData.name,
        passwordHash: studentHash,
        role: 'STUDENT'
      } as any

    });
    students.push(s);
  }
  console.log(`✅ Created ${students.length} student users`);

  // --- Courses ---
  const coursesData = [
    {
      name: 'Full Stack Entry Level',
      slug: 'fs-entry-level',
      description:
        'Curso introductorio para desarrollo full stack con JavaScript, Node.js, React y bases de datos.',
      type: 'FULLSTACK',
      level: 'ENTRY_LEVEL',
      durationWeeks: 12,
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-12-20'),
      isActive: true,
    },
    {
      name: 'DevOps Bootcamp',
      slug: 'devops-bootcamp',
      description:
        'Bootcamp intensivo de DevOps con Docker, Kubernetes, CI/CD y cloud computing.',
      type: 'DEVOPS',
      level: 'BOOTCAMP',
      durationWeeks: 16,
      startDate: new Date('2024-09-15'),
      endDate: new Date('2025-01-15'),
      isActive: true,
    },
    {
      name: 'Full Stack Mid Level',
      slug: 'fs-mid-level',
      description:
        'Curso intermedio con arquitecturas avanzadas, microservicios y patrones de diseño.',
      type: 'FULLSTACK',
      level: 'MID_LEVEL',
      durationWeeks: 14,
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-02-15'),
      isActive: true,
    },
    {
      name: 'Senior DevOps',
      slug: 'devops-senior',
      description:
        'Programa avanzado para DevOps seniors con focus en escalabilidad y arquitectura cloud.',
      type: 'DEVOPS',
      level: 'SENIOR',
      durationWeeks: 18,
      startDate: null,
      endDate: null,
      isActive: false,
    },
  ];

  const createdCourses = [];
  for (const c of coursesData) {
    const course = await prisma.course.upsert({

      where: { slug: courseData.slug },
      update: courseData as any,
      create: courseData as any

    });
    createdCourses.push(course);
  }
  console.log(`✅ Created ${createdCourses.length} courses`);

  // --- Chapters (FS Entry Level) ---
  const fsEntryLevel = createdCourses.find((c) => c.slug === 'fs-entry-level');
  if (fsEntryLevel) {
    const chapters = [
      {
        courseId: fsEntryLevel.id,
        weekNumber: 1,
        title: 'Fundamentos + Docker 101 + English: Standup',
        description: 'Introducción a desarrollo web, Git, CLI y Docker básico',
        theoreticalContent: `
# Módulo 01 — Fundamentos + Docker 101 + English: Standup
## Objetivos
- Repasar CLI, Git, Node.js básico
- Contenedores: conceptos y \`docker run\` / \`docker compose\`
- Inglés técnico: vocab de standup y reporting
## Contenido
1. **CLI & Git**: init, clone, add/commit/push, branching
2. **JS/Node**: funciones puras, npm scripts, testing con Jest
3. **Docker 101**: Imagen vs contenedor, \`Dockerfile\` mínimo, puertos, volúmenes
4. **English**: Daily standup: yesterday / today / blockers
        `,
        practicalRequirements: `
## Labs
- **Hello API**: GET /health -> { ok: true }
- Tests unitarios con Jest deben pasar
- Dockerizar la aplicación
- Daily standup en inglés (3 líneas)
        `,
        minScoreTheory: 80,
        minScorePractice: 85,
        unlockDate: new Date('2024-10-01'),
        isPublished: true,
      },
      {
        courseId: fsEntryLevel.id,
        weekNumber: 2,
        title: 'JavaScript Avanzado & Testing',
        description: 'ES6+, async/await, testing avanzado y debugging',
        theoreticalContent: `
# Módulo 02 — JavaScript Avanzado & Testing
## Objetivos
- Dominar ES6+ features
- Async/await y Promises
- Testing con Jest y coverage
- Debugging efectivo
## Contenido
1. **ES6+**: destructuring, spread/rest, modules
2. **Async**: Promises, async/await, error handling
3. **Testing**: unit tests, integration tests, mocking
4. **Debugging**: console, debugger, VS Code tools
        `,
        practicalRequirements: `
## Labs
- Refactor Hello API con ES6+
- Implementar middleware de logging
- Tests con 90%+ coverage
- Debug session práctica
        `,
        minScoreTheory: 80,
        minScorePractice: 85,
        unlockDate: new Date('2024-10-08'),
        isPublished: true,
      },
      {
        courseId: fsEntryLevel.id,
        weekNumber: 3,
        title: 'Node.js & APIs REST',
        description: 'Express avanzado, middleware, validation y documentación',
        theoreticalContent: `
# Módulo 03 — Node.js & APIs REST
## Objetivos
- Express middleware y routing avanzado
- Validación y sanitización de datos
- Documentación de APIs
- Error handling patterns
## Contenido
1. **Express**: middleware, routing, static files
2. **Validation**: Joi, express-validator
3. **Documentation**: OpenAPI/Swagger
4. **Security**: helmet, CORS, rate limiting
        `,
        practicalRequirements: `
## Labs
- API REST completa con CRUD
- Validación de schemas
- Documentación Swagger
- Tests de integración
        `,
        minScoreTheory: 80,
        minScorePractice: 85,
        unlockDate: new Date('2024-10-15'),
        isPublished: true,
      },
      {
        courseId: fsEntryLevel.id,
        weekNumber: 4,
        title: 'Bases de Datos & ORM',
        description: 'PostgreSQL, Prisma ORM, migraciones y queries',
        theoreticalContent: `
# Módulo 04 — Bases de Datos & ORM
## Objetivos
- Diseño de bases de datos relacionales
- Prisma ORM y migraciones
- Queries eficientes y relaciones
- Transacciones y performance
## Contenido
1. **PostgreSQL**: setup, psql, queries básicas
2. **Prisma**: schema, generate, migrate
3. **Relations**: 1:1, 1:N, N:M
4. **Performance**: indexing, query optimization
        `,
        practicalRequirements: `
## Labs
- Diseñar schema para blog
- Implementar CRUD con Prisma
- Migraciones y seeds
- Queries complejas con joins
        `,
        minScoreTheory: 80,
        minScorePractice: 85,
        unlockDate: new Date('2024-10-22'),
        isPublished: false,
      },
    ];

    for (const ch of chapters) await upsertChapter(ch);
    console.log(`✅ Created ${chapters.length} chapters for ${fsEntryLevel.name}`);
  }

  // --- DESPUÉS de `console.log(\`✅ Created ${createdCourses.length} courses\`);` ---

// Enrolar al admin en dos cursos para que vea algo en el dashboard
const adminCourses = ["fs-entry-level", "devops-bootcamp"];
for (const slug of adminCourses) {
  const course = createdCourses.find(c => c.slug === slug);
  if (course) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: admin.id,
          courseId: course.id,
        },
      },
      update: {},
      create: {
        userId: admin.id,
        courseId: course.id,
      },
    });
  }
}


  // --- Chapters (DevOps Bootcamp) ---
  const devopsBootcamp = createdCourses.find((c) => c.slug === 'devops-bootcamp');
  if (devopsBootcamp) {
    const devopsChapters = [
      {
        courseId: devopsBootcamp.id,
        weekNumber: 1,
        title: 'DevOps Fundamentals & Linux',
        description: 'Introducción a DevOps, Linux command line y shell scripting',
        theoreticalContent: 'Linux basics, shell scripting, DevOps culture',
        practicalRequirements: 'Shell scripts, Linux administration tasks',
        minScoreTheory: 85,
        minScorePractice: 80,
        unlockDate: new Date('2024-09-15'),
        isPublished: true,
      },
      {
        courseId: devopsBootcamp.id,
        weekNumber: 2,
        title: 'Docker Deep Dive',
        description: 'Docker avanzado, multi-stage builds, docker-compose',
        theoreticalContent: 'Docker architecture, images, containers, networking',
        practicalRequirements: 'Dockerize complex applications, docker-compose stacks',
        minScoreTheory: 85,
        minScorePractice: 80,
        unlockDate: new Date('2024-09-22'),
        isPublished: true,
      },
    ];

    for (const ch of devopsChapters) await upsertChapter(ch);
    console.log(`✅ Created ${devopsChapters.length} chapters for ${devopsBootcamp.name}`);
  }

  // --- Enrollments ---
  const fs = createdCourses.find((c) => c.slug === 'fs-entry-level');
  const devops = createdCourses.find((c) => c.slug === 'devops-bootcamp');

  const enrollmentData = [
    { userId: students[0]?.id, courseId: fs?.id },
    { userId: students[1]?.id, courseId: fs?.id },
    { userId: students[2]?.id, courseId: fs?.id },
    { userId: students[1]?.id, courseId: devops?.id },
    { userId: students[3]?.id, courseId: devops?.id },
  ].filter((e) => e.userId && e.courseId) as { userId: number; courseId: number }[];

  for (const e of enrollmentData) await upsertEnrollment(e);
  console.log(`✅ Created ${enrollmentData.length} enrollments`);

  // --- Initial progress ---
  const enrollments = await prisma.enrollment.findMany({
    include: { course: { include: { chapters: { orderBy: { weekNumber: 'asc' } } } } },
  });

  for (const enr of enrollments) {
    for (const ch of enr.course.chapters) {
      const isFirst = ch.weekNumber === 1;
      await upsertChapterProgress({
        userId: enr.userId,
        chapterId: ch.id,
        status: isFirst ? 'AVAILABLE' : 'LOCKED',
      });
    }
  }
  console.log('✅ Created initial chapter progress for enrolled students');

  // --- Sample progress ---
  const sampleProgress = [
    {
      userId: students[0]?.id,
      updates: [
        { weekNumber: 1, status: 'COMPLETED', theoryScore: 90, practiceScore: 85 },
        { weekNumber: 2, status: 'IN_PROGRESS', theoryScore: 75, practiceScore: null },
      ],
    },
    {
      userId: students[1]?.id,
      updates: [
        { weekNumber: 1, status: 'COMPLETED', theoryScore: 95, practiceScore: 90 },
        { weekNumber: 2, status: 'COMPLETED', theoryScore: 88, practiceScore: 92 },
        { weekNumber: 3, status: 'AVAILABLE', theoryScore: null, practiceScore: null },
      ],
    },
  ].filter((p) => p.userId);

  for (const sp of sampleProgress as any[]) {
    const enr = await prisma.enrollment.findFirst({
      where: { userId: sp.userId!, course: { slug: 'fs-entry-level' } },
      include: { course: { include: { chapters: true } } },
    });


    if (userEnrollment) {
      for (const update of studentProgress.updates) {
        const chapter = userEnrollment.course.chapters.find((c: any) => c.weekNumber === update.weekNumber);
        if (chapter) {
          await prisma.chapterProgress.upsert({
            where: {
              userId_chapterId: {
                userId: studentProgress.userId,
                chapterId: chapter.id
              }
            },
            update: {
              status: update.status,
              theoryScore: update.theoryScore,
              practiceScore: update.practiceScore,
              startedAt: new Date(Date.now() - (7 - update.weekNumber) * 24 * 60 * 60 * 1000),
              completedAt: update.status === 'COMPLETED' ? new Date() : null,
              lastAccessed: new Date()
            },
            create: {
              userId: studentProgress.userId,
              chapterId: chapter.id,
              status: update.status,
              theoryScore: update.theoryScore,
              practiceScore: update.practiceScore,
              startedAt: new Date(Date.now() - (7 - update.weekNumber) * 24 * 60 * 60 * 1000),
              completedAt: update.status === 'COMPLETED' ? new Date() : null,
              lastAccessed: new Date()
            }
          });
        }
      }

    }
  }
  console.log('✅ Updated sample student progress');

  // --- Resources & Assessments for chapter 1 ---
  const chapter1 = await prisma.chapter.findFirst({
    where: { course: { slug: 'fs-entry-level' }, weekNumber: 1 },
  });

  if (chapter1) {
    const resources = [
      {
        chapterId: chapter1.id,
        type: 'VIDEO',
        title: 'Introducción a Git y CLI',
        url: 'https://www.youtube.com/watch?v=example1',
        orderIndex: 1,
        isRequired: true,
      },
      {
        chapterId: chapter1.id,
        type: 'DOCUMENT',
        title: 'Guía de Docker para principiantes',
        content: 'Contenido del documento sobre Docker...',
        orderIndex: 2,
        isRequired: true,
      },
      {
        chapterId: chapter1.id,
        type: 'LAB',
        title: 'Lab: Hello API con Express',
        url: 'https://github.com/classroom/assignment-01-hello-api',
        orderIndex: 3,
        isRequired: true,
      },
      {
        chapterId: chapter1.id,
        type: 'EXTERNAL_LINK',
        title: 'AI Speaking Coach',
        url: '/ai-speaking.html',
        orderIndex: 4,
        isRequired: false,
      },
    ];

    for (const r of resources) await upsertChapterResource(r);
    console.log(`✅ Created ${resources.length} resources for chapter 1`);

    await prisma.assessment.createMany({
      data: [
        {
          chapterId: chapter1.id,
          type: 'QUIZ',
          title: 'Quiz: Fundamentos',
          instructions: 'Responde las preguntas sobre Git, CLI y Docker',
          maxAttempts: 3,
          timeLimitMinutes: 30,
          passingScore: 80,
        },
        {
          chapterId: chapter1.id,
          type: 'LAB',
          title: 'Lab: Hello API',
          instructions: 'Implementa una API REST básica con endpoint /health',
          maxAttempts: 5,
          timeLimitMinutes: null,
          passingScore: 85,
        },
      ],
      skipDuplicates: true,
    });
    console.log('✅ Created assessments');
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
