---
title: "N2 · Pro — MVP CRUD"
layout: default
parent: Full Stack
nav_order: 3
---

# N2 · Pro — MVP CRUD
{: .no_toc }

Este nivel integra frontend y backend para entregar un MVP funcional respaldado por pruebas, base de datos y métricas básicas de salud.

<details open markdown="block">
  <summary>Tabla de contenidos</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## 🎯 Objetivos de nivel

- Diseñar dominios sencillos y modelarlos en APIs RESTful con control de estados y errores.
- Implementar un backend Node.js/Express (o framework equivalente) con persistencia (SQL/NoSQL) y seed data.
- Automatizar pruebas unitarias + de integración y despliegues con CI/CD.
- Instrumentar el MVP con métricas básicas (health checks, logs estructurados y SLIs iniciales).

## 🧭 Módulos

### M2.1 · Diseño de producto & arquitectura
- User stories, alcance del MVP y definición de entidades.
- Diagramas C4 + contratos de API (`/api/v1/*`).
- Historias técnicas para deuda y tareas de infraestructura.

### M2.2 · Backend CRUD + persistencia
- Express/Fastify, controladores y repositorios.
- Bases de datos: migraciones, seed scripts y tests con fixtures.
- Gestión de autenticación ligera (tokens temporales) y rate limiting.

### M2.3 · Entrega continua & observabilidad inicial
- Pipelines CI/CD (build → test → deploy) con entornos staging.
- Instrumentación: logs JSON, contadores de errores y tiempos de respuesta.
- Definición de SLIs/SLOs iniciales y alertas básicas.

## 🛠️ Artefactos y rúbricas

| Código | Artefacto | Qué evaluamos | Recursos |
| --- | --- | --- | --- |
| FS-03 | [MVP CRUD](/legacy/assignments-fullstack/fs-03-mvp-crud/) | Diseño de dominio, API REST, persistencia y pruebas. | Brief del producto, postman collection y template de README. |
| Ops | Dashboard + SLIs/SLOs | Métricas de disponibilidad, latencia y error budget. | Plantilla de métricas en Notion/Google Sheets. |
| Docs | Runbook de incidentes | Procedimientos claros ante fallas críticas. | Plantillas de runbook y postmortem. |

### Runbooks recomendados
- [Runbook — Caída de PostgreSQL](/saas-devops-course/templates/runbooks/db-outage/)
- [Runbook — Plantilla de postmortem](/saas-devops-course/templates/runbooks/postmortem-template/)

Incluye al menos un runbook y un checklist de despliegue dentro del repositorio del MVP.
