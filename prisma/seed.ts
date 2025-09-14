// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from "bcryptjs";
import { config as env } from "dotenv";
env({ path: ".env" });
env({ path: "prisma/.env" });

// Cast PrismaClient to any to avoid type errors if types are out of sync
const prisma = new PrismaClient() as any;

async function main() {
  console.log('🌱 Starting seed process...');

  // Crear usuario admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set');
  }

  const passwordHash = await hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
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

  // Crear usuarios estudiantes de ejemplo
  const studentUsers = [
    { email: 'juan.perez@example.com', name: 'Juan Pérez' },
    { email: 'maria.garcia@example.com', name: 'María García' },
    { email: 'carlos.lopez@example.com', name: 'Carlos López' },
    { email: 'ana.martinez@example.com', name: 'Ana Martínez' },
    { email: 'pedro.rodriguez@example.com', name: 'Pedro Rodríguez' }
  ];

  const students = [];
  for (const userData of studentUsers) {
    const studentHash = await hash('student123', 12);
    const student = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        name: userData.name,
        passwordHash: studentHash,
        role: 'STUDENT'
      } as any
    });
    students.push(student);
  }

  console.log(`✅ Created ${students.length} student users`);

  // Crear cursos
  const courses = [
    {
      name: 'Full Stack Entry Level',
      slug: 'fs-entry-level',
      description: 'Curso introductorio para desarrollo full stack con JavaScript, Node.js, React y bases de datos.',
      type: 'FULLSTACK',
      level: 'ENTRY_LEVEL',
      durationWeeks: 12,
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-12-20'),
      isActive: true
    },
    {
      name: 'DevOps Bootcamp',
      slug: 'devops-bootcamp',
      description: 'Bootcamp intensivo de DevOps con Docker, Kubernetes, CI/CD y cloud computing.',
      type: 'DEVOPS',
      level: 'BOOTCAMP',
      durationWeeks: 16,
      startDate: new Date('2024-09-15'),
      endDate: new Date('2025-01-15'),
      isActive: true
    },
    {
      name: 'Full Stack Mid Level',
      slug: 'fs-mid-level',
      description: 'Curso intermedio con arquitecturas avanzadas, microservicios y patrones de diseño.',
      type: 'FULLSTACK',
      level: 'MID_LEVEL',
      durationWeeks: 14,
      startDate: new Date('2024-11-01'),
      endDate: new Date('2025-02-15'),
      isActive: true
    },
    {
      name: 'Senior DevOps',
      slug: 'devops-senior',
      description: 'Programa avanzado para DevOps seniors con focus en escalabilidad y arquitectura cloud.',
      type: 'DEVOPS',
      level: 'SENIOR',
      durationWeeks: 18,
      startDate: null,
      endDate: null,
      isActive: false
    }
  ];

  const createdCourses = [];
  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: courseData,
      create: courseData
    });
    createdCourses.push(course);
  }

  console.log(`✅ Created ${createdCourses.length} courses`);

  // Crear capítulos para el curso Full Stack Entry Level
  const fsEntryLevel = createdCourses.find(c => c.slug === 'fs-entry-level');
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
        isPublished: true
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
        isPublished: true
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
        isPublished: true
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
        isPublished: false
      }
    ];

    for (const chapterData of chapters) {
      await prisma.chapter.upsert({
        where: {
          courseId_weekNumber: {
            courseId: chapterData.courseId,
            weekNumber: chapterData.weekNumber
          }
        },
        update: chapterData,
        create: chapterData
      });
    }

    console.log(`✅ Created ${chapters.length} chapters for ${fsEntryLevel.name}`);
  }

  // Crear capítulos para DevOps Bootcamp
  const devopsBootcamp = createdCourses.find(c => c.slug === 'devops-bootcamp');
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
        isPublished: true
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
        isPublished: true
      }
    ];

    for (const chapterData of devopsChapters) {
      await prisma.chapter.upsert({
        where: {
          courseId_weekNumber: {
            courseId: chapterData.courseId,
            weekNumber: chapterData.weekNumber
          }
        },
        update: chapterData,
        create: chapterData
      });
    }

    console.log(`✅ Created ${devopsChapters.length} chapters for ${devopsBootcamp.name}`);
  }

  // Inscribir estudiantes a cursos
  const enrollmentData = [
    { userId: students[0].id, courseId: fsEntryLevel?.id },
    { userId: students[1].id, courseId: fsEntryLevel?.id },
    { userId: students[2].id, courseId: fsEntryLevel?.id },
    { userId: students[1].id, courseId: devopsBootcamp?.id },
    { userId: students[3].id, courseId: devopsBootcamp?.id },
  ];

  for (const enrollment of enrollmentData) {
    if (enrollment.courseId) {
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: enrollment.userId,
            courseId: enrollment.courseId
          }
        },
        update: {},
        create: enrollment
      });
    }
  }

  console.log(`✅ Created ${enrollmentData.length} enrollments`);

  // Crear progreso inicial para estudiantes inscritos
  const enrollments = await prisma.enrollment.findMany({
    include: {
      course: {
        include: {
          chapters: {
            orderBy: { weekNumber: 'asc' }
          }
        }
      }
    }
  });

  for (const enrollment of enrollments) {
    for (const chapter of enrollment.course.chapters) {
      const isFirstChapter = chapter.weekNumber === 1;
      
      await prisma.chapterProgress.upsert({
        where: {
          userId_chapterId: {
            userId: enrollment.userId,
            chapterId: chapter.id
          }
        },
        update: {},
        create: {
          userId: enrollment.userId,
          chapterId: chapter.id,
          status: isFirstChapter ? 'AVAILABLE' : 'LOCKED'
        }
      });
    }
  }

  console.log('✅ Created initial chapter progress for enrolled students');

  // Crear algunos progreso de ejemplo (estudiantes que han avanzado)
  const sampleProgress = [
    {
      userId: students[0].id, // Juan Pérez
      updates: [
        { weekNumber: 1, status: 'COMPLETED', theoryScore: 90, practiceScore: 85 },
        { weekNumber: 2, status: 'IN_PROGRESS', theoryScore: 75, practiceScore: null }
      ]
    },
    {
      userId: students[1].id, // María García  
      updates: [
        { weekNumber: 1, status: 'COMPLETED', theoryScore: 95, practiceScore: 90 },
        { weekNumber: 2, status: 'COMPLETED', theoryScore: 88, practiceScore: 92 },
        { weekNumber: 3, status: 'AVAILABLE', theoryScore: null, practiceScore: null }
      ]
    }
  ];

  for (const studentProgress of sampleProgress) {
    const userEnrollment = await prisma.enrollment.findFirst({
      where: { 
        userId: studentProgress.userId,
        course: { slug: 'fs-entry-level' }
      },
      include: {
        course: {
          include: { chapters: true }
        }
      }
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

  // Crear recursos de ejemplo para algunos capítulos
  const chapter1 = await prisma.chapter.findFirst({
    where: {
      course: { slug: 'fs-entry-level' },
      weekNumber: 1
    }
  });

  if (chapter1) {
    const resources = [
      {
        chapterId: chapter1.id,
        type: 'VIDEO',
        title: 'Introducción a Git y CLI',
        url: 'https://www.youtube.com/watch?v=example1',
        orderIndex: 1,
        isRequired: true
      },
      {
        chapterId: chapter1.id,
        type: 'DOCUMENT',
        title: 'Guía de Docker para principiantes',
        content: 'Contenido del documento sobre Docker...',
        orderIndex: 2,
        isRequired: true
      },
      {
        chapterId: chapter1.id,
        type: 'LAB',
        title: 'Lab: Hello API con Express',
        url: 'https://github.com/classroom/assignment-01-hello-api',
        orderIndex: 3,
        isRequired: true
      },
      {
        chapterId: chapter1.id,
        type: 'EXTERNAL_LINK',
        title: 'AI Speaking Coach',
        url: '/ai-speaking.html',
        orderIndex: 4,
        isRequired: false
      }
    ];

    for (const resource of resources) {
      await prisma.chapterResource.upsert({
        where: {
          chapterId_orderIndex: {
            chapterId: resource.chapterId,
            orderIndex: resource.orderIndex
          }
        },
        update: resource,
        create: resource
      });
    }

    console.log(`✅ Created ${resources.length} resources for chapter 1`);
  }

  // Crear evaluaciones de ejemplo
  if (chapter1) {
    const assessments = [
      {
        chapterId: chapter1.id,
        type: 'QUIZ',
        title: 'Quiz: Fundamentos',
        instructions: 'Responde las preguntas sobre Git, CLI y Docker',
        maxAttempts: 3,
        timeLimitMinutes: 30,
        passingScore: 80
      },
      {
        chapterId: chapter1.id,
        type: 'LAB',
        title: 'Lab: Hello API',
        instructions: 'Implementa una API REST básica con endpoint /health',
        maxAttempts: 5,
        timeLimitMinutes: null,
        passingScore: 85
      }
    ];

    for (const assessment of assessments) {
      await prisma.assessment.create({
        data: assessment
      });
    }

    console.log(`✅ Created ${assessments.length} assessments`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());