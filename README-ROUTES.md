# README-ROUTES.md

| Ruta | Roles | Descripción |
|------|-------|-------------|
| `/admin` | ADMIN | Panel principal para crear cursos y agregar recursos/evaluaciones |
| `/admin/courses` | ADMIN | Lista de cursos |
| `/admin/courses/[id]` | ADMIN | Detalle de un curso |
| `/admin/courses/[id]/chapters` | ADMIN | Capítulos del curso con accesos para agregar recursos o evaluaciones |
| `/dashboard` | STUDENT, ADMIN | Dashboard de estudiante con sus cursos inscritos |
| `/courses/[slug]` | Inscritos o ADMIN | Vista de un curso específico |

## API

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/courses` | GET | Lista cursos |
| `/api/courses/[id]/chapters` | GET | Capítulos de un curso |
| `/api/admin/courses` | POST | Crea un curso (opcionalmente genera semanas 0..10) |
| `/api/admin/chapters/[id]/resources` | POST | Crea recurso para un capítulo |
| `/api/admin/chapters/[id]/assessments` | POST | Crea evaluación para un capítulo |
