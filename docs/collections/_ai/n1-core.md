---
title: "N1 · Core — LangChain RAG"
layout: default
parent: AI Automation
nav_order: 1
---

# N1 · Core — LangChain RAG

## Objetivo
Implementar un pipeline de Retrieval Augmented Generation que indexe el dataset FAQ y responda consultas de soporte con grounding explícito.

## Contenido clave
1. **Ingesta**: limpieza de fuentes y chunking (`RecursiveCharacterTextSplitter`).
2. **Embeddings**: `text-embedding-3-large` + almacenaje en vector store (Chroma / PGVector).
3. **Cadena**: `ConversationalRetrievalChain` con `RunnableWithFallback`.
4. **Evaluación rápida**: prompts de smoke-test y logging de citas.

## Proyecto
Crear un servicio `POST /support/answer` que reciba `question`, recupere contexto de `ai-support-faq.jsonl`, cite fragmentos y devuelva respuesta estructurada.

- Dataset base: [`ai-support-faq.jsonl`](../../saas-devops-course/templates/datasets/ai-support-faq.jsonl)
- Ejemplo de benchmark: [`rag-eval-benchmark.jsonl`](../../saas-devops-course/templates/datasets/rag-eval-benchmark.jsonl)
- Configura almacenamiento local (Chroma) para desarrollo y Documenta paso a producción.

## Checklist
- [ ] Pipeline de ingesta reproducible (`scripts/ingest.ts`).
- [ ] Metadatos guardan `source` y `chunk_id`.
- [ ] Respuesta incluye `answer`, `sources[]`, `confidence`.
- [ ] Logs contienen latencia de retrieval y tokens totales.

## Recursos
- [LangChain RAG Tutorial](https://python.langchain.com/docs/use_cases/question_answering/).
- [Chroma docs](https://docs.trychroma.com/).
- Dashboard sugerido: [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json) (panel de latencia/accuracy).
