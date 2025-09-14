// src/lib/progressService.ts
import prisma from '@/lib/prisma';
import { ProgressStatus } from '@prisma/client';

export class ProgressService {
  /**
   * Inicializa el progreso de un usuario cuando se inscribe a un curso
   */
  static async initializeUserProgress(userId: number, courseId: number) {
    try {
      // Obtener todos los capítulos del curso
      const chapters = await prisma.chapter.findMany({
        where: { courseId },
        orderBy: { weekNumber: 'asc' }
      });

      // Crear progreso inicial para cada capítulo
      const progressData = chapters.map((chapter, index) => ({
        userId,
        chapterId: chapter.id,
        status: index === 0 ? ProgressStatus.AVAILABLE : ProgressStatus.LOCKED
      }));

      await prisma.chapterProgress.createMany({
        data: progressData,
        skipDuplicates: true
      });

      return true;
    } catch (error) {
      console.error('Error initializing user progress:', error);
      throw error;
    }
  }

  /**
   * Evalúa si un capítulo debe desbloquearse basado en el progreso del usuario
   */
  static async evaluateChapterUnlock(userId: number, chapterId: number) {
    try {
      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
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

      if (!chapter) return false;

      // Si es el primer capítulo, debe estar disponible
      if (chapter.weekNumber === 1) {
        await this.updateChapterStatus(userId, chapterId, ProgressStatus.AVAILABLE);
        return true;
      }

      // Verificar fecha de desbloqueo si existe
      if (chapter.unlockDate && new Date() < chapter.unlockDate) {
        return false;
      }

      // Encontrar el capítulo anterior
      const previousChapter = chapter.course.chapters.find(
        c => c.weekNumber === chapter.weekNumber - 1
      );

      if (!previousChapter) return false;

      // Verificar si el capítulo anterior está completado
      const previousProgress = await prisma.chapterProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId: previousChapter.id
          }
        }
      });

      if (!previousProgress || previousProgress.status !== ProgressStatus.COMPLETED) {
        return false;
      }

      // Verificar puntuaciones mínimas del capítulo anterior
      const meetsTheoryRequirement = !previousProgress.theoryScore || 
        previousProgress.theoryScore >= previousChapter.minScoreTheory;
      
      const meetsPracticeRequirement = !previousProgress.practiceScore || 
        previousProgress.practiceScore >= previousChapter.minScorePractice;

      if (meetsTheoryRequirement && meetsPracticeRequirement) {
        await this.updateChapterStatus(userId, chapterId, ProgressStatus.AVAILABLE);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error evaluating chapter unlock:', error);
      throw error;
    }
  }

  /**
   * Actualiza el estado de un capítulo para un usuario
   */
  static async updateChapterStatus(
    userId: number, 
    chapterId: number, 
    status: ProgressStatus,
    scores?: { theoryScore?: number; practiceScore?: number }
  ) {
    try {
      const updateData: any = {
        status,
        lastAccessed: new Date()
      };

      if (status === ProgressStatus.IN_PROGRESS && !updateData.startedAt) {
        updateData.startedAt = new Date();
      }

      if (status === ProgressStatus.COMPLETED) {
        updateData.completedAt = new Date();
      }

      if (scores) {
        if (scores.theoryScore !== undefined) {
          updateData.theoryScore = scores.theoryScore;
        }
        if (scores.practiceScore !== undefined) {
          updateData.practiceScore = scores.practiceScore;
        }
      }

      const progress = await prisma.chapterProgress.upsert({
        where: {
          userId_chapterId: {
            userId,
            chapterId
          }
        },
        update: updateData,
        create: {
          userId,
          chapterId,
          ...updateData
        }
      });

      // Si se completó el capítulo, evaluar desbloqueo del siguiente
      if (status === ProgressStatus.COMPLETED) {
        await this.unlockNextChapter(userId, chapterId);
      }

      return progress;
    } catch (error) {
      console.error('Error updating chapter status:', error);
      throw error;
    }
  }

  /**
   * Desbloquea el siguiente capítulo si cumple los requisitos
   */
  static async unlockNextChapter(userId: number, currentChapterId: number) {
    try {
      const currentChapter = await prisma.chapter.findUnique({
        where: { id: currentChapterId },
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

      if (!currentChapter) return;

      // Encontrar el siguiente capítulo
      const nextChapter = currentChapter.course.chapters.find(
        c => c.weekNumber === currentChapter.weekNumber + 1
      );

      if (!nextChapter) return;

      // Evaluar si se puede desbloquear
      await this.evaluateChapterUnlock(userId, nextChapter.id);
    } catch (error) {
      console.error('Error unlocking next chapter:', error);
      throw error;
    }
  }

  /**
   * Obtiene el progreso completo de un usuario en un curso
   */
  static async getUserCourseProgress(userId: number, courseId: number) {
    try {
      const progress = await prisma.chapterProgress.findMany({
        where: {
          userId,
          chapter: {
            courseId
          }
        },
        include: {
          chapter: {
            include: {
              resources: {
                orderBy: { orderIndex: 'asc' }
              },
              assessments: true
            }
          }
        },
        orderBy: {
          chapter: {
            weekNumber: 'asc'
          }
        }
      });

      return progress;
    } catch (error) {
      console.error('Error getting user course progress:', error);
      throw error;
    }
  }

  /**
   * Calcula estadísticas de progreso para un curso
   */
  static async getCourseProgressStats(courseId: number) {
    try {
      const [totalChapters, enrollments] = await Promise.all([
        prisma.chapter.count({ where: { courseId } }),
        prisma.enrollment.findMany({
          where: { courseId, isActive: true },
          select: { userId: true }
        })
      ]);

      if (enrollments.length === 0) {
        return {
          totalStudents: 0,
          averageProgress: 0,
          completionRate: 0
        };
      }

      const progressStats = await Promise.all(
        enrollments.map(async (enrollment) => {
          const completedChapters = await prisma.chapterProgress.count({
            where: {
              userId: enrollment.userId,
              status: ProgressStatus.COMPLETED,
              chapter: { courseId }
            }
          });

          return {
            userId: enrollment.userId,
            progress: totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0,
            completed: completedChapters === totalChapters
          };
        })
      );

      const averageProgress = progressStats.reduce((sum, stat) => sum + stat.progress, 0) / progressStats.length;
      const completionRate = (progressStats.filter(stat => stat.completed).length / progressStats.length) * 100;

      return {
        totalStudents: enrollments.length,
        averageProgress: Math.round(averageProgress),
        completionRate: Math.round(completionRate)
      };
    } catch (error) {
      console.error('Error getting course progress stats:', error);
      throw error;
    }
  }

  /**
   * Verifica si un usuario puede acceder a un capítulo específico
   */
  static async canAccessChapter(userId: number, chapterId: number): Promise<boolean> {
    try {
      const progress = await prisma.chapterProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId
          }
        }
      });

      return progress?.status !== ProgressStatus.LOCKED;
    } catch (error) {
      console.error('Error checking chapter access:', error);
      return false;
    }
  }

  /**
   * Procesa el resultado de una evaluación y actualiza el progreso
   */
  static async processAssessmentResult(
    userId: number,
    assessmentId: number,
    score: number,
    isTheoryAssessment: boolean = true
  ) {
    try {
      const assessment = await prisma.assessment.findUnique({
        where: { id: assessmentId },
        include: {
          chapter: true
        }
      });

      if (!assessment) throw new Error('Assessment not found');

      const currentProgress = await prisma.chapterProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId: assessment.chapterId
          }
        }
      });

      if (!currentProgress) throw new Error('Chapter progress not found');

      // Actualizar puntuación
      const scoreUpdate = isTheoryAssessment 
        ? { theoryScore: score }
        : { practiceScore: score };

      const updatedProgress = await this.updateChapterStatus(
        userId,
        assessment.chapterId,
        currentProgress.status,
        scoreUpdate
      );

      // Verificar si el capítulo se puede marcar como completado
      const theoryScore = isTheoryAssessment ? score : (updatedProgress.theoryScore || 0);
      const practiceScore = !isTheoryAssessment ? score : (updatedProgress.practiceScore || 0);

      const meetsTheoryRequirement = theoryScore >= assessment.chapter.minScoreTheory;
      const meetsPracticeRequirement = practiceScore >= assessment.chapter.minScorePractice;

      if (meetsTheoryRequirement && meetsPracticeRequirement) {
        await this.updateChapterStatus(
          userId,
          assessment.chapterId,
          ProgressStatus.COMPLETED
        );
      }

      return updatedProgress;
    } catch (error) {
      console.error('Error processing assessment result:', error);
      throw error;
    }
  }

  /**
   * Obtiene un resumen del progreso de todos los cursos para el dashboard
   */
  static async getDashboardStats() {
    try {
      const [
        totalUsers,
        totalCourses,
        totalEnrollments,
        completedEnrollments,
        recentActivity
      ] = await Promise.all([
        prisma.user.count({ where: { role: 'STUDENT' } }),
        prisma.course.count({ where: { isActive: true } }),
        prisma.enrollment.count({ where: { isActive: true } }),
        prisma.enrollment.count({ 
          where: { 
            isActive: true,
            completedAt: { not: null }
          }
        }),
        prisma.chapterProgress.findMany({
          where: {
            lastAccessed: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Última semana
            }
          },
          include: {
            user: {
              select: { name: true, email: true }
            },
            chapter: {
              select: { title: true, course: { select: { name: true } } }
            }
          },
          orderBy: { lastAccessed: 'desc' },
          take: 10
        })
      ]);

      return {
        totalUsers,
        totalCourses,
        totalEnrollments,
        completedEnrollments,
        completionRate: totalEnrollments > 0 
          ? Math.round((completedEnrollments / totalEnrollments) * 100)
          : 0,
        recentActivity
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      throw error;
    }
  }
}