---
title: "N2 · Pro — Offline Evaluation"
layout: default
parent: AI Automation
nav_order: 2
---

# N2 · Pro — Offline Evaluation

## Objetivo
Diseñar un pipeline de evaluación offline que mida calidad, grounding y regresiones de costos antes de desplegar cambios.

## Contenido clave
1. **Benchmarks**: construcción y versionado de conjuntos `question → reference`.
2. **Métricas**: exact match, semantic similarity (embeddings) y penalizaciones por alucinación.
3. **Automatización**: integración en CI (GitHub Actions) y reportes en dashboards.
4. **Observabilidad**: exportar métricas a Prometheus y visualizar en Grafana.

## Proyecto
Extender el servicio RAG con un comando `npm run eval` que procese [`rag-eval-benchmark.jsonl`](../../saas-devops-course/templates/datasets/rag-eval-benchmark.jsonl), genere métricas y las exponga vía `/metrics`.

- Usa LangChain `RunEvalChain` o scripts propios para comparar `answer` vs `reference`.
- Exporta métricas `rag_offline_eval_accuracy` y `rag_response_latency_bucket`.
- Configura dashboard [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json) para monitorear accuracy/latencia.

## Checklist
- [ ] Benchmark versionado y documentado.
- [ ] Comando de evaluación falla en CI si accuracy < 0.75.
- [ ] Métricas expuestas en `/metrics` con namespace `rag_`.
- [ ] Dashboard actualizado con panels de accuracy/latencia.

## Recursos
- [Evaluación generativa con LangChain](https://python.langchain.com/docs/guides/evaluation/).
- [Prometheus + OpenAI blog](https://openai.com/blog/evaluating-gpts).
- Ejemplo de dashboard: [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json).
