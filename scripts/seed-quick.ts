import { PrismaClient, CourseType, CourseLevel } from "@prisma/client";

const prisma = new PrismaClient();

// ⚠️ Cambia este mail por el que usás para loguearte
const USER_EMAIL = process.env.SEED_EMAIL ?? "admin@devsyllabus.com";

async function main() {
  const user = await prisma.user.findUnique({ where: { email: USER_EMAIL } });
  if (!user) throw new Error(`No existe el usuario ${USER_EMAIL}`);

  const course = await prisma.course.upsert({
    where: { slug: "fullstack-entry" },
    update: {},
    create: {
      name: "Fullstack · Entry",
      slug: "fullstack-entry",
      description: "Programa Entry de 11 semanas",
      type: CourseType.FULLSTACK,
      level: CourseLevel.ENTRY_LEVEL,
      durationWeeks: 11,
      chapters: {
        create: Array.from({ length: 11 }, (_, i) => ({
          weekNumber: i,
          title: `Week ${i} — Título`,
          minScoreTheory: 70,
          minScorePractice: 70,
          isPublished: i === 0,
        })),
      },
    },
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    update: {},
    create: { userId: user.id, courseId: course.id },
  });

  console.log("Seed OK:", { user: user.email, course: course.slug });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
