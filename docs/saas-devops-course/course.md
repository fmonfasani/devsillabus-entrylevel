# SaaS DevOps-first Full-Stack (Next.js + NestJS) — Curso Completo

## Portada y resumen ejecutivo
- **Título**: Construcción de una SaaS multi-tenant DevOps-first con Next.js, NestJS y Kubernetes
- **Duración sugerida**: 12 semanas (1 módulo por semana + proyecto final)
- **Modalidad**: 70% práctica, 30% teoría funcional
- **Público objetivo**: Ingenieros(as) full-stack y DevOps con experiencia previa en JavaScript/TypeScript y contenedores. Sistema base: Windows + WSL2.
- **Resultado esperado**: Entregar una plataforma SaaS multi-tenant con subdominios por organización, planes de pago globales, observabilidad end-to-end, despliegues automatizados y gobernanza de seguridad.
- **Highlights**: Monorepo pnpm/Turborepo, Next.js 14 (App Router), NestJS Fastify, PostgreSQL con RLS, Stripe + Mercado Pago, Redis/BullMQ, Terraform + Helm + ArgoCD, observabilidad completa con OpenTelemetry, Prometheus, Grafana, Loki y Sentry.

## Sílabus estructurado
### Objetivo general
Diseñar, construir, asegurar, observar y operar una SaaS multi-tenant con enfoque DevOps-first, desde el setup local hasta la entrega continua en Kubernetes.

### Prerrequisitos
- Dominio intermedio de TypeScript, Node.js y React.
- Conocimientos básicos de NestJS, SQL y Docker.
- Familiaridad con Git, GitHub y flujos de CI/CD.
- WSL2 activo con Ubuntu 22.04, Docker Desktop y acceso a una cuenta de GitHub, Stripe y proveedores cloud (Cloudflare, Neon/Supabase, Upstash, Resend, PostHog).

### Outcomes medibles
- Implementar un monorepo con Turborepo y pipelines pnpm para apps web/api y paquetes compartidos.
- Configurar Next.js 14 con App Router, Tailwind y shadcn/ui para UI multi-tenant.
- Desarrollar APIs REST seguras con NestJS + Fastify, DTO/Zod, Swagger y RLS en PostgreSQL.
- Integrar autenticación OAuth con Auth.js, RBAC multi-tenant y rate limiting en Redis.
- Orquestar pagos con Stripe y Mercado Pago (webhooks firmados y reconciliación).
- Desplegar observabilidad full-stack con OpenTelemetry, Loki, Prometheus, Grafana, Sentry y PostHog.
- Diseñar pipelines CI/CD en GitHub Actions con análisis de seguridad (Trivy) y despliegues a GHCR + ArgoCD.
- Implementar IaC con Terraform (Cloudflare, R2, Neon/Supabase) y despliegues en Kubernetes con Helm.
- Elaborar runbooks operativos, definir SLIs/SLOs y ejecutar postmortems.

## Mapa de módulos (M0–M12)
Para cada módulo: objetivo, DoD, teoría mínima, laboratorio guiado, checklist, tareas y rúbrica.

### M0 — Setup de entorno (WSL2 + Tooling)
- **Objetivo**: Preparar entorno Windows/WSL2 con Node LTS, pnpm, Docker Desktop, Git, kubectl, helm y Terraform.
- **DoD**: `pnpm -v`, `docker info`, `kubectl version --client` y `terraform version` exitosos desde WSL2.
- **Teoría mínima**:
  - Diferencias kernel Windows vs Linux (WSL2) y beneficios para Docker.
  - Networking base (localhost en WSL2, puertos publicados).
  - Referencias: [WSL2 docs](https://learn.microsoft.com/windows/wsl/), [Docker Desktop WSL2 integration](https://docs.docker.com/desktop/windows/wsl/).
- **Laboratorio**:
  1. Verificar versión Windows 11 y habilitar características: `wsl --install` (PowerShell admin).
  2. Instalar Ubuntu 22.04 como distro predeterminada.
  3. Desde Ubuntu:
     ```bash
     sudo apt update && sudo apt upgrade -y
     sudo apt install -y build-essential curl git unzip jq
     curl -fsSL https://get.pnpm.io/install.sh | sh -
     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt install -y nodejs
     corepack enable
     ```
  4. Instalar Docker Desktop (Windows GUI), activar integración con WSL2.
  5. Instalar kubectl, helm, terraform:
     ```bash
     curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
     sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
     curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
     curl -fsSL https://releases.hashicorp.com/terraform/1.6.6/terraform_1.6.6_linux_amd64.zip -o terraform.zip
     unzip terraform.zip
     sudo mv terraform /usr/local/bin/
     ```
  6. Instalar k3d para Kubernetes local:
     ```bash
     curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
     ```
  7. Validar herramientas (`pnpm -v`, `docker info`, `kubectl version --client`, `helm version`, `terraform version`).
- **Checklist**:
  - [ ] Docker Desktop corriendo y WSL integration habilitada.
  - [ ] Node LTS y pnpm activos en WSL2.
  - [ ] kubectl/helm/terraform en PATH.
- **Errores comunes**: conflicto Hyper-V, puertos ocupados, falta permisos exec en WSL (`chmod +x`).
- **Tarea**: Documentar con capturas y comandos la instalación en `docs/setup-report.md`.
  - **Rúbrica**: 40% comandos reproducibles, 30% troubleshooting, 30% verificación final.

### M1 — Monorepo con Turborepo
- **Objetivo**: Configurar monorepo pnpm + Turborepo con apps web/api y packages compartidos.
- **DoD**: `pnpm turbo run lint` y `pnpm dev` levantan web (3000) y api (3333) vía Docker Compose.
- **Teoría mínima**:
  - Estructura monorepo vs polyrepo.
  - Turborepo pipelines, cache remoto.
  - Convenciones de naming, path aliases.
  - Ref: [Turborepo docs](https://turbo.build/repo/docs).
- **Laboratorio**:
  1. Clonar repositorio base.
  2. Crear estructura inicial (`apps/web`, `apps/api`, `packages/ui`, `packages/config`).
  3. Configurar `pnpm-workspace.yaml`, `turbo.json`.
  4. Ejecutar `pnpm install`, `pnpm lint`.
  5. Integrar `docker-compose.yml` (ver plantilla `templates/docker-compose.yml`).
  6. Validar con `curl http://localhost:3333/health` y `curl http://localhost:3000`.
- **Checklist**:
  - [ ] Workspace detecta apps y packages.
  - [ ] Scripts `dev`, `build`, `lint` definidos.
  - [ ] Compose levanta servicios sin errores.
- **Errores comunes**: rutas relativas en TypeScript, versiones node mismatch, pnpm store path.
- **Tarea**: Añadir package `packages/eslint-config` reutilizable.
  - **Rúbrica**: 40% configuración funcional, 30% documentación, 30% lint verde.

### M2 — Next.js 14 + Tailwind + shadcn/ui
- **Objetivo**: Implementar landing multi-tenant y layout base con componentes shadcn/ui.
- **DoD**: App Router funcional, Tailwind configurado, landing disponible en `/` y dashboard placeholder `/app` protegido.
- **Teoría mínima**: Server Components, streaming, Tailwind config, `metadata` y headers.
- **Laboratorio**:
  1. Instalar dependencias `pnpm add -r next@14 react react-dom tailwindcss autoprefixer @shadcn/ui lucide-react`.
  2. Ejecutar `pnpm dlx shadcn-ui init` y generar componentes.
  3. Crear layout multi-tenant (ver `templates/apps-web/src/middleware.ts` para subdominios).
  4. Configurar `next.config.mjs` con `experimental.instrumentationHook`.
  5. Agregar página landing con CTA y sección pricing.
- **Checklist**: estilos consistentes, dark mode, lint sin errores, `pnpm web:test`.
- **Errores comunes**: importaciones incorrectas, conflicto CSS, fonts.
- **Tarea**: Diseñar componentes `PricingTable` y `OrgSwitcher` conectados a contexto.
  - **Rúbrica**: 35% UI responsive, 35% accesibilidad, 30% pruebas unitarias.

### M3 — NestJS + Fastify API
- **Objetivo**: Crear API REST modular con DTO/Zod, Swagger y manejo de errores.
- **DoD**: `/health`, `/v1/orgs`, `/v1/users` con validación Zod y respuestas tipadas.
- **Teoría mínima**: Pipes vs filters, OpenAPI, adapters Fastify, error envelopes.
- **Laboratorio**:
  1. `pnpm add -r @nestjs/core @nestjs/platform-fastify @nestjs/swagger zod @anatine/zod-nestjs fastify-swagger`.
  2. Configurar `main.ts` con FastifyAdapter y Swagger (ver plantilla `templates/apps-api/src/main.ts`).
  3. Crear módulos `OrgModule`, `UserModule` con controladores y services stub.
  4. Implementar filtro de excepciones HTTP estandarizado (`templates/apps-api/src/common/http-exception.filter.ts`).
  5. Documentar endpoints con Swagger (`/docs`).
- **Checklist**: `pnpm api:test`, `curl http://localhost:3333/health`, `pnpm lint`.
- **Errores comunes**: Decoradores DTO, pipes globales, CORS.
- **Tarea**: Añadir guardia `OrgContextGuard` para validar `x-org-id`.
  - **Rúbrica**: 40% tests, 30% documentación, 30% manejo errores.

### M4 — PostgreSQL + Drizzle + RLS
- **Objetivo**: Modelar esquema multi-tenant con RLS por `org_id`, migraciones y seeds.
- **DoD**: Tablas `organizations`, `users`, `subscriptions`, `audit_logs` con políticas RLS activas.
- **Teoría mínima**: RLS, multi-tenancy patrones, Drizzle migrations.
- **Laboratorio**:
  1. Ejecutar Neon o Supabase, obtener credenciales.
  2. Configurar Drizzle (plantillas en `templates/db/schema.sql`, `templates/db/policies.sql`).
  3. Correr migraciones `pnpm db:migrate` (usa script `drizzle-kit`).
  4. Sembrar datos `pnpm db:seed` (ver `templates/db/seed.ts`).
  5. Validar RLS: `psql` -> `SET role tenant_user; SELECT * FROM users;`.
- **Checklist**: RLS ON, policies testadas, seeds idempotentes.
- **Errores comunes**: Falta `ALTER TABLE ENABLE ROW LEVEL SECURITY`, seeds duplicados, roles sin permisos.
- **Tarea**: Crear vista materializada `org_metrics` y job de refresco.
  - **Rúbrica**: 40% SQL correcto, 30% scripts reproducibles, 30% validaciones.

### M5 — Auth.js + RBAC + Subdominios
- **Objetivo**: Integrar Auth.js con OAuth Google/GitHub, mapping `org_id` por subdominio y RBAC.
- **DoD**: Inicio de sesión funcional, roles `owner`, `admin`, `member`, `support` con scopes.
- **Teoría mínima**: OAuth flows, JWT, middleware Next.js, RLS + claims.
- **Laboratorio**:
  1. Configurar Auth.js (ver `templates/apps-web/src/auth/options.ts`).
  2. Middleware subdominios (`templates/apps-web/src/middleware.ts`).
  3. Implementar RBAC en API (`templates/apps-api/src/auth/rbac.guard.ts`).
  4. Probar con cuentas sandbox.
- **Checklist**: cookies HttpOnly, tokens firmados, RBAC tests.
- **Errores comunes**: callback URL mismatch, clock skew, subdominio local.
- **Tarea**: Agregar soporte "impersonate" para soporte.
  - **Rúbrica**: 30% seguridad, 40% funcionalidades, 30% pruebas.

### M6 — Pagos Stripe + Mercado Pago
- **Objetivo**: Gestionar planes, facturación, webhooks firmados y reconciliación multi-tenant.
- **DoD**: Endpoint `/billing/checkout` y webhooks `/webhooks/stripe`, `/webhooks/mercadopago` con verificación de firmas.
- **Teoría mínima**: Modelos de facturación, idempotencia, retries, compliance fiscal LATAM.
- **Laboratorio**:
  1. Configurar claves Stripe/MercadoPago en Doppler/SOPS.
  2. Crear productos y precios (API Stripe + CLI).
  3. Implementar endpoints (ver `templates/apps-api/src/payments/stripe.controller.ts` y `mercadopago.controller.ts`).
  4. Exponer webhooks via `stripe listen` + `ngrok`.
  5. Validar en DB: tablas `subscriptions`, `invoices`, `usage_records`.
- **Checklist**: Webhooks verificados, reintentos idempotentes, facturas generadas.
- **Errores comunes**: secret mismatch, timezone, currency.
- **Tarea**: Implementar trials y upgrade/downgrade.
  - **Rúbrica**: 40% flujos completos, 30% seguridad, 30% cobertura tests.

### M7 — Redis + BullMQ + Meilisearch
- **Objetivo**: Implementar colas para emails y tareas programadas, y búsqueda full-text.
- **DoD**: Cola `emailQueue` procesando jobs y índice `organizations` en Meilisearch sincronizado.
- **Teoría mínima**: Redis ephemeral vs durable, BullMQ repeatable jobs, search engines relevancia.
- **Laboratorio**:
  1. Configurar Upstash Redis (envs).
  2. Implementar rate limit en Redis (`templates/packages/rate-limit.ts`).
  3. Configurar BullMQ workers (`templates/apps-api/src/queues/bullmq.worker.ts`).
  4. Desplegar Meilisearch vía Docker Compose.
  5. Validar búsqueda con `curl http://localhost:7700/indexes/organizations/search`.
- **Checklist**: Jobs completados, dashboard BullMQ (bull-board), índices actualizados.
- **Errores comunes**: TTL insuficiente, concurrency, claves API Meili.
- **Tarea**: Crear cron `usageCollector` para métricas de consumo.
  - **Rúbrica**: 35% jobs confiables, 35% búsqueda, 30% monitoreo.

### M8 — Observabilidad integral
- **Objetivo**: Implementar OTel → Loki, Prometheus, Grafana, Sentry y PostHog.
- **DoD**: Métricas, logs y traces visibles en dashboards; alertas básicas configuradas.
- **Teoría mínima**: Instrumentación automática vs manual, SLIs/SLOs, tracing distribuido.
- **Laboratorio**:
  1. Configurar OTel collector (`templates/observability/otel-collector.yaml`).
  2. Actualizar Next.js y NestJS con SDK OTel.
  3. Configurar Prometheus (`templates/observability/prometheus.yml`) y Grafana (datasources/dashboards).
  4. Integrar Sentry y PostHog (front/back).
  5. Validar con `curl -s localhost:4318/v1/metrics` y dashboards.
- **Checklist**: dashboards cargados, alertas firing, Sentry recibe error simulado.
- **Errores comunes**: puertos bloqueados, certificado self-signed, tags faltantes.
- **Tarea**: Definir SLO de disponibilidad API 99.5% con PromQL.
  - **Rúbrica**: 40% visibilidad, 30% alertas, 30% documentación.

### M9 — Seguridad
- **Objetivo**: Endurecer seguridad con CSP, headers, rate limit, secretos y escaneo Trivy.
- **DoD**: Headers estrictos, rate limit activo, Trivy sin vulnerabilidades críticas.
- **Teoría mínima**: OWASP SaaS, SOPS + age, Zero Trust, dependency scanning.
- **Laboratorio**:
  1. Configurar headers (`templates/apps-web/src/lib/security-headers.ts`).
  2. Aplicar CSP en Next y Traefik (`templates/traefik/middleware.yaml`).
  3. Implementar Redis rate limit (`templates/packages/rate-limit.ts`).
  4. Integrar SOPS + age (`templates/security/sops.example.yaml`).
  5. Ejecutar `pnpm trivy:scan` (ver `templates/tests/trivy.sh`).
- **Checklist**: `security.txt`, reportes Trivy, secrets cifrados.
- **Errores comunes**: CSP bloqueando scripts, age key no cargada, falsos positivos.
- **Tarea**: Automatizar Dependabot y alertas Slack.
  - **Rúbrica**: 30% compliance, 40% automatización, 30% documentación.

### M10 — CI/CD + Docker Compose demo
- **Objetivo**: Automatizar pipelines CI/CD, publicar imágenes GHCR y demo Compose.
- **DoD**: GitHub Actions `ci.yml` y `cd.yml` verdes, imágenes push a GHCR, `docker-compose -f docker-compose.yml -f docker-compose.demo.override.yml up` operativo.
- **Teoría mínima**: buildx cache, matrix jobs, OIDC GitHub → cloud.
- **Laboratorio**:
  1. Configurar `templates/github-workflows/ci.yml` y `cd.yml`.
  2. Probar `pnpm lint`, `pnpm test`, `pnpm build` local.
  3. Ejecutar Compose demo.
  4. Validar deploy logs en GitHub.
- **Checklist**: Secrets GitHub OK, GHCR accesible, compose sin errores.
- **Errores comunes**: permisos GHCR, QEMU drivers, caching.
- **Tarea**: Añadir job canary deploy.
  - **Rúbrica**: 35% pipeline robusto, 35% entregable, 30% documentación.

### M11 — Terraform
- **Objetivo**: Proveer infraestructura mínima (Cloudflare DNS, R2, Neon/Supabase).
- **DoD**: `terraform apply` crea DNS, bucket R2 y DB.
- **Teoría mínima**: backend remoto, workspaces, módulos reutilizables.
- **Laboratorio**:
  1. Configurar backend remoto (Terraform Cloud o S3).
  2. Rellenar variables (`templates/terraform/variables.tf`).
  3. Ejecutar `terraform init`, `terraform plan`, `terraform apply`.
- **Checklist**: state remoto, outputs exportados, tags compliance.
- **Errores comunes**: credenciales, rate limit API Cloudflare.
- **Tarea**: Añadir módulo para Upstash Redis y Resend.
  - **Rúbrica**: 40% IaC reproducible, 30% seguridad state, 30% outputs útiles.

### M12 — Kubernetes + Helm + ArgoCD
- **Objetivo**: Desplegar SaaS en K3s/EKS/GKE usando Helm y GitOps (ArgoCD).
- **DoD**: Apps web y api corriendo en cluster, HPA activo, ArgoCD sync automático.
- **Teoría mínima**: charts Helm, controllers ArgoCD, Traefik IngressRoute, HPA + requests.
- **Laboratorio**:
  1. Crear cluster `k3d cluster create saas --agents 2`.
  2. Instalar ArgoCD (`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`).
  3. Configurar Traefik (`templates/traefik/traefik.yaml`).
  4. Empaquetar charts `helm dependency update`.
  5. Crear aplicaciones ArgoCD (`templates/argocd/web-app.yaml`, `api-app.yaml`).
  6. Validar `kubectl get pods`, `kubectl get hpa`, `argocd app sync`.
- **Checklist**: certs LE válidos, pods healthy, HPA escalando, logs en Loki.
- **Errores comunes**: ingress hostnames, secrets sync, ArgoCD permissions.
- **Tarea**: Configurar progressive delivery (blue/green) en Argo Rollouts (bonus).
  - **Rúbrica**: 40% despliegue estable, 30% GitOps, 30% observabilidad integrada.

## Proyecto final
- **Descripción**: SaaS multi-tenant funcional con subdominios (`tenant.example.com`), planes FREE/PRO, usage metering, feature flags y analítica en tiempo real.
- **Entregables**:
  1. URL demo pública (Cloudflare + Traefik + TLS).
  2. Repositorio monorepo en GitHub.
  3. Video (5 min) demostrando onboarding, switching tenant, pagos, observabilidad.
  4. Documentación: README, runbooks, postmortem ficticio.
- **Requerimientos técnicos**:
  - RLS activada y validada.
  - Stripe + Mercado Pago funcionando.
  - Feature flags (ej. config en PostgreSQL + LaunchDarkly opcional).
  - Métricas y logs visibles.
  - CI/CD verde (lint/test/build/scan/deploy).
- **Rúbrica detallada (100 pts)**:
  - Arquitectura & Código (25): estructura monorepo, patrones, clean code.
  - Seguridad & Cumplimiento (15): RLS, RBAC, rate limit, headers.
  - Observabilidad & Operación (15): dashboards, alertas, runbooks.
  - Pagos & Finanzas (15): checkout, webhooks, reconciliación.
  - Experiencia Usuario (10): UI multi-tenant, performance.
  - DevOps & CI/CD (10): pipelines confiables, despliegue reproducible.
  - Documentación & Video (10): claridad, guion.
  - Innovación/Extras (bonus 5): feature flags avanzados, ML scoring, etc.

## Estructura de repositorio (propuesta)
```text
saas-devops-first/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   ├── (dashboard)/
│   │   │   └── api/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── lib/
│   │   │   ├── components/
│   │   │   └── middleware/
│   │   ├── public/
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── api/
│       ├── src/
│       │   ├── main.ts
│       │   ├── modules/
│       │   ├── common/
│       │   ├── auth/
│       │   └── payments/
│       └── package.json
├── packages/
│   ├── config/
│   ├── ui/
│   ├── db/
│   └── utils/
├── infra/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   └── docker-compose.demo.override.yml
│   ├── terraform/
│   ├── helm/
│   │   ├── web/
│   │   └── api/
│   ├── argocd/
│   └── traefik/
├── observability/
│   ├── otel/
│   ├── loki/
│   ├── prom/
│   ├── grafana/
│   └── sentry/
├── scripts/
├── .github/workflows/
├── .env.example
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

## Plantillas y artefactos listos
Los archivos base se encuentran en `docs/saas-devops-course/templates/`. Sección siguiente detalla contenido clave.

### Docker Compose (desarrollo y demo)
- [`templates/docker-compose.yml`](templates/docker-compose.yml)
- [`templates/docker-compose.demo.override.yml`](templates/docker-compose.demo.override.yml)

### Variables de entorno
- `templates/env/apps-web.env.example`
- `templates/env/apps-api.env.example`
- `templates/env/database.env.example`
- `templates/env/redis.env.example`
- `templates/env/meilisearch.env.example`
- `templates/env/observability.env.example`
- `templates/env/.envrc`

### GitHub Actions
- `templates/github-workflows/ci.yml`
- `templates/github-workflows/cd.yml`

### Terraform
- `templates/terraform/main.tf`
- `templates/terraform/variables.tf`
- `templates/terraform/outputs.tf`

### Helm Charts
- `templates/helm/web/Chart.yaml`
- `templates/helm/web/values.yaml`
- `templates/helm/web/templates/{deployment,service,ingress,hpa}.yaml`
- `templates/helm/api/Chart.yaml`
- `templates/helm/api/values.yaml`
- `templates/helm/api/templates/{deployment,service,ingress,hpa}.yaml`

### ArgoCD
- `templates/argocd/web-app.yaml`
- `templates/argocd/api-app.yaml`

### Traefik
- `templates/traefik/traefik.yaml`
- `templates/traefik/middleware.yaml`

### Observabilidad
- `templates/observability/otel-collector.yaml`
- `templates/observability/loki-config.yaml`
- `templates/observability/promtail-config.yaml`
- `templates/observability/prometheus.yml`
- `templates/observability/grafana-datasources.yml`
- `templates/observability/grafana-dashboards/saas-overview.json`

### Dominio y multitenancy
- `templates/apps-web/src/middleware.ts`: middleware Next.js para subdominios.
- `templates/db/schema.sql` y `templates/db/policies.sql`: esquema y RLS.
- `templates/db/seed.ts`: seeds multi-tenant.
- `templates/db/drizzle.config.ts`: configuración Drizzle.

### Auth y seguridad
- `templates/apps-web/src/auth/options.ts`: Auth.js con OAuth.
- `templates/apps-api/src/auth/rbac.guard.ts`: RBAC/Scopes.
- `templates/packages/rate-limit.ts`: rate limit Redis sliding window.
- `templates/apps-web/src/lib/security-headers.ts`: headers/CSP.
- `templates/security/sops.example.yaml`: gestión de secretos con SOPS + age.

### Pagos
- `templates/apps-api/src/payments/stripe.controller.ts`
- `templates/apps-api/src/payments/mercadopago.controller.ts`
- `templates/apps-api/src/payments/billing.service.ts`

### Product analytics
- `templates/apps-web/src/lib/posthog.ts`
- `templates/apps-api/src/analytics/posthog.service.ts`

### Testing y calidad
- `templates/tests/vitest.config.ts`
- `templates/tests/playwright.config.ts`
- `templates/tests/k6-load-test.js`
- `templates/tests/trivy.sh`

### SRE y operación
- `templates/runbooks/db-outage.md`
- `templates/runbooks/rate-limit-spike.md`
- `templates/runbooks/queue-backlog.md`
- `templates/runbooks/postmortem-template.md`

## Dominio y multitenancy — detalles
1. **Middleware Next.js**: Detecta subdominio (`tenant.example.com`) y adjunta `org_id` a headers y cookies. Fallback `app.example.com` para marketing.
2. **Resolución org**: Tabla `organizations` con `custom_domain` y `subdomain`. Uso de cache Redis.
3. **Políticas RLS**:
   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation ON users
     USING (org_id = current_setting('app.current_org')::uuid);
   ```
   Se configura `SET app.current_org = 'uuid'` en cada request (middleware PG).
4. **Migrations/Seeds**: Drizzle define esquemas tipados. Seeds crean organizaciones, usuarios y planes base.
5. **Webhooks**: Stripe/Mercado Pago actualizan tablas `subscriptions` y `invoices` con `org_id` derivado del metadata webhook.

## Auth y seguridad — detalles clave
- Auth.js con adaptadores OAuth Google/GitHub, almacenamiento session en PostgreSQL (tabla `user_sessions`).
- JWT firmados con `NEXTAUTH_SECRET`. Claims incluyen `org_id`, `role`, `scopes`.
- RBAC basado en `role_permissions` y `scope_permissions` (tabla `permissions`).
- Rate limiting Redis (sliding window) por IP + org.
- Cabeceras: `Strict-Transport-Security`, `Content-Security-Policy`, `Permissions-Policy`, `X-Content-Type-Options`.
- Secrets gestionados con Doppler o SOPS (age key). Integración CI con `doppler run` o `sops -d`.
- Hash de contraseñas (para credenciales locales) con Argon2id.
- Escaneo contenedores con Trivy y dependencias con `pnpm audit --prod`.

## Pagos y planes
- Planes: `FREE`, `PRO`, `ENTERPRISE` (custom). Trials 14 días.
- Stripe: Checkout sessions, billing portal, usage metering (`reporting`).
- Mercado Pago: Suscripciones para LATAM, manejo de `preapproval` y `payments`.
- Webhooks con verificación de firmas, reintentos con `retry-after` y logs en Loki.
- Tablas: `subscriptions`, `subscription_items`, `invoices`, `usage_records`, `payment_events`.
- Controles: no permitir doble suscripción, prorrateo en upgrades.

## Product analytics
- Eventos clave: `tenant_created`, `user_invited`, `feature_used`, `billing_success`, `billing_failed`.
- PostHog funnels: Onboarding → Activación → Retención.
- Retención cohortes mensuales, dashboards en Grafana via PostHog exporter.

## Testing y calidad
- Unit tests (Vitest) para lógica de dominio, RBAC, rate limit.
- E2E (Playwright) para onboarding, login, checkout.
- Carga (k6) para API `/v1/orgs/:id/usage` y `/webhooks`.
- `pnpm test:unit`, `pnpm test:e2e`, `pnpm test:load` en CI. Falla = bloquea merge.

## SRE/Operación
- SLIs/SLOs sugeridos:
  - API availability ≥ 99.5% (5xx rate < 0.5%).
  - Latencia P95 < 300ms.
  - Tasa éxito colas ≥ 98%.
- Alertas Prometheus: `api_latency_p95 > 0.3` durante 5m, `queue_backlog > 1000`, `db_connections > 90%`.
- Runbooks (ver plantillas) con pasos, métricas y rollback.
- Postmortem template incluye timeline, impacto, causa raíz, acciones.

## Apéndices
### A. Problemas típicos en Windows/WSL2/Docker
- Docker Desktop no arranca → reiniciar `wsl --shutdown`, revisar `C:\ProgramData\DockerDesktop`.
- Puerto 80 ocupado → `netsh interface ipv4 show excludedportrange protocol=tcp`.
- File watcher limitado → `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf`.
- Sincronización hora → `sudo hwclock --hctosys`.

### B. Guía de networking, firewalls y TLS
- Puertos locales: web 3000, api 3333, db 5432, redis 6379, meili 7700, traefik 443/80, otel 4317/4318, prometheus 9090, grafana 3001, loki 3100.
- Configurar firewall Windows Defender: permitir Docker Desktop.
- TLS: Traefik con ACME DNS-01 Cloudflare. Certbot alternativo.
- Recomendado Cloudflare tunnel para demos.

### C. Glosario
- **RLS**: Row Level Security.
- **OTel**: OpenTelemetry.
- **HPA**: Horizontal Pod Autoscaler.
- **SOPS**: Secret OPerationS.
- **SLO**: Service Level Objective.
- **DoD**: Definition of Done.
- **RBAC**: Role-Based Access Control.

## Checklist previa a producción
1. [ ] Revisar `pnpm lint`, `pnpm test`, `pnpm build` verdes.
2. [ ] Contenedores escaneados (`pnpm trivy:scan`).
3. [ ] Secrets rotados y almacenados en Doppler/SOPS.
4. [ ] RLS probado con cuentas distintas.
5. [ ] Webhooks Stripe/Mercado Pago revalidados.
6. [ ] Observabilidad: dashboards, alertas, logs, traces.
7. [ ] Backups programados para PostgreSQL y R2.
8. [ ] Runbooks actualizados y accesibles.
9. [ ] Plan de DR (restore DB, failover Redis).
10. [ ] PostHog capturando eventos clave.
11. [ ] Terraform state bloqueado y versionado.
12. [ ] Documentación final en README + video demo.

## Lista de archivos generados
```
docs/saas-devops-course/course.md
docs/saas-devops-course/templates/docker-compose.yml
docs/saas-devops-course/templates/docker-compose.demo.override.yml
docs/saas-devops-course/templates/env/apps-web.env.example
docs/saas-devops-course/templates/env/apps-api.env.example
docs/saas-devops-course/templates/env/database.env.example
docs/saas-devops-course/templates/env/redis.env.example
docs/saas-devops-course/templates/env/meilisearch.env.example
docs/saas-devops-course/templates/env/observability.env.example
docs/saas-devops-course/templates/env/.envrc
docs/saas-devops-course/templates/github-workflows/ci.yml
docs/saas-devops-course/templates/github-workflows/cd.yml
docs/saas-devops-course/templates/terraform/main.tf
docs/saas-devops-course/templates/terraform/variables.tf
docs/saas-devops-course/templates/terraform/outputs.tf
docs/saas-devops-course/templates/helm/web/Chart.yaml
docs/saas-devops-course/templates/helm/web/values.yaml
docs/saas-devops-course/templates/helm/web/templates/deployment.yaml
docs/saas-devops-course/templates/helm/web/templates/service.yaml
docs/saas-devops-course/templates/helm/web/templates/ingress.yaml
docs/saas-devops-course/templates/helm/web/templates/hpa.yaml
docs/saas-devops-course/templates/helm/api/Chart.yaml
docs/saas-devops-course/templates/helm/api/values.yaml
docs/saas-devops-course/templates/helm/api/templates/deployment.yaml
docs/saas-devops-course/templates/helm/api/templates/service.yaml
docs/saas-devops-course/templates/helm/api/templates/ingress.yaml
docs/saas-devops-course/templates/helm/api/templates/hpa.yaml
docs/saas-devops-course/templates/argocd/web-app.yaml
docs/saas-devops-course/templates/argocd/api-app.yaml
docs/saas-devops-course/templates/traefik/traefik.yaml
docs/saas-devops-course/templates/traefik/middleware.yaml
docs/saas-devops-course/templates/observability/otel-collector.yaml
docs/saas-devops-course/templates/observability/loki-config.yaml
docs/saas-devops-course/templates/observability/promtail-config.yaml
docs/saas-devops-course/templates/observability/prometheus.yml
docs/saas-devops-course/templates/observability/grafana-datasources.yml
docs/saas-devops-course/templates/observability/grafana-dashboards/saas-overview.json
docs/saas-devops-course/templates/db/schema.sql
docs/saas-devops-course/templates/db/policies.sql
docs/saas-devops-course/templates/db/seed.ts
docs/saas-devops-course/templates/db/drizzle.config.ts
docs/saas-devops-course/templates/apps-web/src/middleware.ts
docs/saas-devops-course/templates/apps-web/src/auth/options.ts
docs/saas-devops-course/templates/apps-web/src/lib/posthog.ts
docs/saas-devops-course/templates/apps-web/src/lib/security-headers.ts
docs/saas-devops-course/templates/apps-api/src/main.ts
docs/saas-devops-course/templates/apps-api/src/common/http-exception.filter.ts
docs/saas-devops-course/templates/apps-api/src/auth/rbac.guard.ts
docs/saas-devops-course/templates/apps-api/src/analytics/posthog.service.ts
docs/saas-devops-course/templates/apps-api/src/payments/stripe.controller.ts
docs/saas-devops-course/templates/apps-api/src/payments/mercadopago.controller.ts
docs/saas-devops-course/templates/apps-api/src/payments/billing.service.ts
docs/saas-devops-course/templates/apps-api/src/queues/bullmq.worker.ts
docs/saas-devops-course/templates/packages/rate-limit.ts
docs/saas-devops-course/templates/security/sops.example.yaml
docs/saas-devops-course/templates/tests/vitest.config.ts
docs/saas-devops-course/templates/tests/playwright.config.ts
docs/saas-devops-course/templates/tests/k6-load-test.js
docs/saas-devops-course/templates/tests/trivy.sh
docs/saas-devops-course/templates/runbooks/db-outage.md
docs/saas-devops-course/templates/runbooks/rate-limit-spike.md
docs/saas-devops-course/templates/runbooks/queue-backlog.md
docs/saas-devops-course/templates/runbooks/postmortem-template.md
```
