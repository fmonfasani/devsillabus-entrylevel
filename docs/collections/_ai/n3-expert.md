---
title: "N3 · Expert — Multi-Agent Orchestration"
layout: default
parent: AI Automation
nav_order: 3
---

# N3 · Expert — Multi-Agent Orchestration

## Objetivo
Orquestar agentes especializados (ingesta, razonamiento, acciones) que colaboren a través de colas y workers robustos listos para producción.

## Contenido clave
1. **Arquitecturas multiagente**: supervisor + workers, herramientas y memoria compartida.
2. **Coordinación**: LangGraph / AutoGen, flujos basados en eventos y persistencia de estado.
3. **Ejecución asíncrona**: BullMQ para programar y monitorear tareas.
4. **Dashboards operativos**: bull-board, métricas de throughput y alertas.

## Proyecto
Diseñar un playbook de soporte que combine agentes de clasificación, redacción y escalamiento humano.

- Define un `OrchestratorAgent` que enrute tareas y delegue en agentes LangChain especializados.
- Encola trabajos en BullMQ usando [`bullmq.worker.ts`](../../saas-devops-course/templates/apps-api/src/queues/bullmq.worker.ts) como plantilla.
- Publica métricas en Grafana (usa [`rag-quality.json`](../../saas-devops-course/templates/observability/grafana-dashboards/rag-quality.json) como base para throughput/SLAs).

## Checklist
- [ ] Workflow mapea cada tipo de ticket a un agente responsable.
- [ ] Jobs persistidos en Redis con reintentos exponenciales.
- [ ] Dashboard bull-board desplegado y documentado.
- [ ] Runbook para fallas de agentes y backoff manual.

## Recursos
- [LangGraph Quickstart](https://langchain-ai.github.io/langgraph/).
- [AutoGen Multi-Agent Chat](https://microsoft.github.io/autogen/docs/Examples/agentchat_conversation/).
- [BullMQ Docs](https://docs.bullmq.io/).
