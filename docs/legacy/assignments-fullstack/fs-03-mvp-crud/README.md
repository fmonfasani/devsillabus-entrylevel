# FS-03 — MVP CRUD

> 📌 **Status:** borrador. Ajusta los requisitos con el equipo académico antes de lanzar la cohorte.

Construye un MVP end-to-end que permita a usuarios crear, leer, actualizar y eliminar registros de un dominio definido con el cliente interno.

## Requisitos mínimos
- API REST (`/api/v1/*`) con rutas protegidas y validación de entradas.
- Persistencia con migraciones versionadas y datos seed.
- Frontend consumiendo la API con estados de carga/errores.
- Pruebas unitarias e integración ejecutadas en CI.
- Dashboard inicial con métricas de disponibilidad (uptime), latencia p95 y tasa de errores.

## Entregables
- Repositorio con README (setup, scripts y arquitectura).
- Tablero de métricas compartido + definición de SLIs/SLOs.
- Runbook para caída de base de datos y plantilla de postmortem completada con un incidente simulado.

## Rúbrica (resumen)
| Criterio | % |
| --- | --- |
| Correctitud funcional | 35 |
| Calidad técnica (arquitectura, testing, CI/CD) | 35 |
| Observabilidad & operaciones | 20 |
| Comunicación & demo | 10 |

## Recursos
- Starter kit con Express, Prisma y Vitest.
- Colección Postman para pruebas manuales.
- Plantillas de runbook/postmortem (`docs/saas-devops-course/templates/runbooks/`).
