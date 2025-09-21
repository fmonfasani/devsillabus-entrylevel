---
title: AI Automation
layout: default
has_children: true
nav_order: 3
---

# Especialidad · AI Automation

Recorrido para construir asistentes y automatizaciones sobre la API de OpenAI, desde el primer `hello world` hasta orquestaciones multiagente operando en producción.

## ¿Qué cubrimos?
- **N0 · Entry**: primeros pasos con la OpenAI API y buenas prácticas de productivización.
- **N1 · Core**: Retrieval Augmented Generation (RAG) con LangChain y datasets curados para soporte.
- **N2 · Pro**: evaluación offline y observabilidad para modelos generativos.
- **N3 · Expert**: automatizaciones multiagente coordinadas con colas y workers resilientes.

## Artefactos clave
- 📚 Dataset base FAQ: [`ai-support-faq.jsonl`](../../saas-devops-course/templates/datasets/ai-support-faq.jsonl)
- 🧪 Benchmark offline: [`rag-eval-benchmark.jsonl`](../../saas-devops-course/templates/datasets/rag-eval-benchmark.jsonl)
- 📊 Dashboard de calidad: [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json)
- ⚙️ Worker de jobs: [`bullmq.worker.ts`](../../saas-devops-course/templates/apps-api/src/queues/bullmq.worker.ts)

> Usa el dataset base para prototipar, el benchmark para medir regresiones y el dashboard/worker como plantillas al desplegar.
