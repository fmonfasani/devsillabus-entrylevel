# DevSyllabus - Sistema de Gestión de Cursos

Sistema completo de gestión de cursos técnicos con Next.js 14, autenticación, progreso automático y dashboard administrativo.

> ℹ️ **Material histórico**: Las guías de cohorts anteriores (por ejemplo, `artefacto-subdominios`, `assignments-fullstack`, `assignment-01-hello-api`) ahora viven en [`docs/legacy/`](docs/legacy/). Consulta esa carpeta para acceder a los manuales originales o descargarlos de forma independiente.

## 🚀 Características

### Para Administradores
- **Dashboard completo** con métricas y analytics
- **Gestión de cursos** por tipo (FullStack/DevOps) y nivel (Entry/Bootcamp/Mid/Senior)
- **Capítulos semanales** con contenido teórico y práctico
- **Sistema de desbloqueo automático** basado en progreso
- **Seguimiento de estudiantes** en tiempo real
- **Evaluaciones y puntuaciones** con requisitos mínimos

### Para Estudiantes
- **Progreso secuencial** - los capítulos se desbloquean automáticamente
- **Múltiples tipos de contenido**: videos, documentos, labs, quizzes
- **Evaluaciones teóricas y prácticas** con intentos limitados
- **Seguimiento de progreso** individual por capítulo
- **Certificación** al completar cursos

### Técnicas
- **Next.js 14** con App Router
- **Prisma ORM** con PostgreSQL
- **NextAuth.js** para autenticación
- **Tailwind CSS** para UI
- **TypeScript** para type safety
- **Sistema de roles** (Admin/Instructor/Student)

## 📋 Tipos de Cursos Soportados

### Por Especialidad
- **Full Stack**: JavaScript, Node.js, React, bases de datos
- **DevOps**: Docker, Kubernetes, CI/CD, cloud

### Por Nivel
- **Entry Level**: 12 semanas, fundamentos
- **Bootcamp**: 16 semanas, intensivo
- **Mid Level**: 14 semanas, intermedio
- **Senior**: 18+ semanas, avanzado

## 🛠 Instalación Rápida

### Prerequisitos
- Node.js 18+
- PostgreSQL (local o cloud como Neon/Vercel Postgres)
- Git

### Setup Automático
```bash
# Clonar el repositorio
git clone <tu-repo>
cd devsyllabus-app

# Ejecutar setup automático
npm run setup
```

El script te guiará para:
1. Instalar dependencias
2. Configurar `.env.local`
3. Ejecutar migraciones
4. Poblar con datos de ejemplo

### Setup Manual
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# 3. Configurar base de datos
npm run setup:db

# 4. Iniciar desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno (.env.local)
```env
# Base de datos
DATABASE_URL="postgresql://user:password@host:5432/db"
DATABASE_PROVIDER=postgresql

# Autenticación
NEXTAUTH_SECRET="tu-secreto-nextauth"

# Admin inicial
ADMIN_EMAIL="admin@tudominio.com"
ADMIN_PASSWORD="contraseña-segura"
```

### Base de Datos
El sistema soporta PostgreSQL por defecto. Para desarrollo local con SQLite:
```env
DATABASE_PROVIDER=sqlite
DATABASE_URL="file:./dev.db"
```

## 🎯 Uso del Sistema

### Como Administrador

1. **Acceder al dashboard**: `/admin`
2. **Crear curso nuevo**:
   - Definir tipo (FullStack/DevOps) y nivel
   - Configurar duración y fechas
   - Activar/desactivar

3. **Gestionar capítulos**:
   - Contenido teórico (Markdown soportado)
   - Requisitos prácticos (labs, proyectos)
   - Puntuaciones mínimas para avanzar
   - Fechas de desbloqueo

4. **Seguimiento de estudiantes**:
   - Progreso individual por capítulo
   - Puntuaciones en evaluaciones
   - Tiempo de actividad

### Como Estudiante

1. **Inscripción**: El admin inscribe estudiantes
2. **Progreso secuencial**:
   - Capítulo 1 disponible al inscribirse
   - Capítulos siguientes se desbloquean automáticamente
   - Requisitos: aprobar teoría Y práctica del capítulo anterior

3. **Evaluaciones**:
   - Teoría: quizzes, exámenes conceptuales
   - Práctica: labs, proyectos, GitHub Classroom
   - Intentos limitados por evaluación

## 📊 Sistema de Progreso

### Estados de Capítulo
- **🔒 LOCKED**: No disponible aún
- **▶️ AVAILABLE**: Disponible para iniciar
- **🔄 IN_PROGRESS**: En progreso
- **✅ COMPLETED**: Completado exitosamente

### Criterios de Desbloqueo
1. **Capítulo anterior completado**
2. **Puntuación mínima teoría** (default: 80%)
3. **Puntuación mínima práctica** (default: 80%)
4. **Fecha de desbloqueo** (si está configurada)

### Algoritmo de Progreso
```typescript
function canUnlockChapter(user, chapter) {
  // Primer capítulo siempre disponible
  if (chapter.weekNumber === 1) return true;
  
  const previousChapter = getPreviousChapter(chapter);
  const progress = getUserProgress(user, previousChapter);
  
  return progress.status === 'COMPLETED' &&
         progress.theoryScore >= previousChapter.minScoreTheory &&
         progress.practiceScore >= previousChapter.minScorePractice;
}
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales
- **User**: Usuarios con roles (admin/instructor/student)
- **Course**: Cursos con tipo y nivel
- **Chapter**: Capítulos semanales
- **ChapterProgress**: Progreso individual por capítulo
- **Enrollment**: Inscripciones a cursos
- **Assessment**: Evaluaciones (quiz/lab/project)
- **AssessmentAttempt**: Intentos de evaluación

### Relaciones Clave
```
User 1:N Enrollment N:1 Course
Course 1:N Chapter 1:N ChapterProgress N:1 User
Chapter 1:N Assessment 1:N AssessmentAttempt N:1 User
```

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# 1. Conectar base de datos (Neon/Vercel Postgres)
# 2. Configurar variables de entorno en Vercel
# 3. Deploy
vercel --prod
```

### Docker
```bash
# Build
docker build -t devsyllabus .

# Run con base de datos externa
docker run -e DATABASE_URL="..." -p 3000:3000 devsyllabus
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (protected)/
│   │   ├── admin/          # Dashboard administrativo
│   │   └── dashboard/      # Dashboard de estudiantes
│   ├── (public)/
│   │   └── login/          # Página de login
│   └── api/
│       └── admin/          # APIs administrativas
├── components/
│   ├── CourseDashboard.tsx    # Dashboard principal
│   ├── CreateCourseModal.tsx  # Modal crear curso
│   └── CreateChapterModal.tsx # Modal crear capítulo
├── lib/
│   ├── prisma.ts           # Cliente Prisma
│   └── progressService.ts  # Lógica de progreso
├── auth.ts                 # Configuración NextAuth
└── middleware.ts           # Protección de rutas

prisma/
├── schema.prisma          # Esquema de base de datos
├── migrations/           # Migraciones
└── seed.ts              # Datos de ejemplo
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo
npm run build           # Build producción
npm run start           # Servidor producción

# Base de datos
npm run prisma:generate # Generar cliente
npm run prisma:migrate  # Ejecutar migraciones
npm run prisma:reset    # Resetear base de datos
npm run prisma:studio   # Abrir Prisma Studio
npm run seed           # Poblar con datos ejemplo

# Setup
npm run setup          # Setup automático completo
npm run setup:db       # Solo setup base de datos
```

## 🎓 Cursos de Ejemplo Incluidos

### Full Stack Entry Level (12 semanas)
1. **Fundamentos + Docker + English**
2. **JavaScript Avanzado & Testing**  
3. **Node.js & APIs REST**
4. **Bases de Datos & ORM**
5. **React Fundamentals**
6. **State Management**
7. **Authentication & Authorization**
8. **Testing & Deployment**
9. **Performance & Security**
10. **Project Week 1**
11. **Project Week 2**
12. **Final Presentation**

### DevOps Bootcamp (16 semanas)
1. **DevOps Fundamentals & Linux**
2. **Docker Deep Dive**
3. **Kubernetes Basics**
4. **CI/CD Pipelines**
5. **Infrastructure as Code**
6. **Monitoring & Logging**
7. **Cloud Platforms (AWS/GCP)**
8. **Security & Compliance**
9. **Microservices Architecture**
10. **Container Orchestration**
11. **Advanced Kubernetes**
12. **GitOps & Automation**
13. **Site Reliability Engineering**
14. **Capstone Project 1**
15. **Capstone Project 2**
16. **Industry Presentation**

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](tu-repo/issues)
- **Documentación**: [Wiki del proyecto](tu-repo/wiki)
- **Email**: admin@tudominio.com

## 🔮 Roadmap

- [ ] **Gamificación**: badges, leaderboards, streaks
- [ ] **Videollamadas integradas**: Jitsi/Zoom en capítulos
- [ ] **Marketplace de cursos**: instructores pueden crear contenido
- [ ] **Mobile app**: React Native companion
- [ ] **AI Assistant**: chatbot para soporte 24/7
- [ ] **Advanced Analytics**: ML para predecir abandono
- [ ] **Integración GitHub Classroom**: auto-grading de labs
- [ ] **Certificaciones blockchain**: NFT certificates
- [ ] **Internacionalización**: múltiples idiomas
- [ ] **API pública**: headless CMS para partners