---
title: "N0 · Entry — OpenAI API Foundations"
layout: default
parent: AI Automation
nav_order: 0
---

# N0 · Entry — OpenAI API Foundations

## Objetivo
Levantar un servicio mínimo que consuma la API de OpenAI con buenas prácticas de autenticación, manejo de tokens y observabilidad básica.

## Contenido clave
1. **Modelos y pricing**: elegir entre `gpt-4o`, `gpt-4o-mini` y `text-embedding-3-large` según caso de uso.
2. **Autenticación segura**: `.env`, `dotenv`, rotación de claves y límites de cuota.
3. **Llamadas esenciales**: Chat Completions, Embeddings y Structured Outputs.
4. **Instrumentación**: logging estructurado y métricas simples para monitorear latencia/costo.

## Proyecto
Construir un microservicio `POST /assist` que acepte `prompt` y `context`, llame a `gpt-4o-mini` y devuelva respuesta y tokens usados.

- Reutiliza el template base [`apps-api`](../../saas-devops-course/templates/apps-api/src/main.ts) para exponer el endpoint.
- Añade trazas mínimas siguiendo el ejemplo de logger (`console` + request id).

## Checklist
- [ ] Variables de entorno cargadas desde `.env` (sin claves en git).
- [ ] Endpoint responde en < 3s para prompts cortos.
- [ ] Registro de `usage.total_tokens` en logs.
- [ ] Documentación `README` con ejemplos de `curl` y límite diario sugerido.

## Recursos
- [Documentación oficial OpenAI](https://platform.openai.com/docs/api-reference/introduction).
- [Guía de Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).
- Dashboard recomendado: [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json) (usarlo desde este nivel para monitorear latencia).
