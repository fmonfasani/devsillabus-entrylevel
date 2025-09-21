---
title: DEVOPS · N3 Expert · Incident Response
---

## Objetivos
- Diseñar y coordinar procesos de respuesta a incidentes alineados con objetivos de continuidad operativa.
- Liderar simulacros y postmortems que generen acciones concretas de mejora continua.
- Automatizar la orquestación de incidentes con runbooks inteligentes y herramientas de gestión centralizada.
- Comunicar de forma efectiva el estado de un incidente a stakeholders técnicos y de negocio.

## Proyectos
### Proyecto 1 · Programa de respuesta a incidentes
- Redacta políticas de severidad, clasificación de incidentes y matriz RACI para el equipo DevOps.
- Configura una sala de guerra virtual (Slack/Teams) con bots que documenten cronología y responsables.
- Implementa un tablero en herramientas como Jira Service Management o Linear para gestionar el ciclo completo.

### Proyecto 2 · GameDay de resiliencia
- Diseña un escenario de caos (fallo de base de datos, degradación de CDN o fuga de credenciales) y ejecútalo en un entorno controlado.
- Documenta hipótesis, métricas de éxito, recursos necesarios y mecanismos de reversión.
- Analiza resultados, genera un informe ejecutivo y define acciones priorizadas con responsables y fechas.

## Checklists
### Checklist de preparación de incidentes
- [ ] Playbooks documentados y accesibles con responsables actualizados.
- [ ] Herramientas de comunicación (chat, videollamada, status page) probadas trimestralmente.
- [ ] Auditorías de permisos y accesos de emergencia completadas.

### Checklist durante el incidente
- [ ] Declaración formal del incidente con hora, impacto y severidad.
- [ ] Registro cronológico de acciones, decisiones y responsables.
- [ ] Actualizaciones periódicas a stakeholders internos y externos según SLA de comunicación.

## Rúbricas
- **Preparación (30%)**: existencia de políticas, entrenamientos y métricas de madurez.
- **Ejecución (40%)**: tiempos de detección, respuesta y recuperación medidos contra SLO/SLA.
- **Aprendizaje (30%)**: calidad de postmortems, seguimiento de acciones y difusión de aprendizajes.

## Runbooks
### Runbook · Declaración y coordinación de incidentes
1. Evalúa impacto inicial y determina severidad basándote en la matriz definida.
2. Activa el canal de comunicación y asigna roles: líder, escriba, responsable técnico y enlace de negocio.
3. Recolecta métricas clave (latencia, errores, usuarios afectados) y comparte actualizaciones cada 15 minutos.
4. Decide la estrategia de mitigación (rollback, feature flag, escalamiento) y documenta cada paso.

### Runbook · Postmortem efectivo
1. Agenda la reunión dentro de las 48 horas posteriores al cierre del incidente.
2. Recopila logs, métricas y decisiones tomadas para reconstruir la línea de tiempo.
3. Identifica causas raíz mediante análisis de los 5 porqués o árboles de fallos.
4. Define acciones correctivas con dueños y fechas; registra aprendizajes en el repositorio de conocimiento.
