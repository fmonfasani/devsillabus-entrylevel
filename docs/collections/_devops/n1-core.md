---
title: DEVOPS · N1 Core · Monitorización y Observabilidad
---

## Objetivos
- Diseñar paneles de observabilidad que combinen métricas de infraestructura, aplicación y experiencia de usuario.
- Instrumentar servicios con exporters y agentes para recolectar métricas y logs estructurados.
- Configurar alertas accionables basadas en objetivos de nivel de servicio (SLO) y umbrales dinámicos.
- Integrar monitoreo en pipelines CI/CD para detectar regresiones de performance.

## Proyectos
### Proyecto 1 · Stack Prometheus + Grafana
- Despliega Prometheus, Alertmanager y Grafana utilizando Docker Compose o Helm Charts.
- Crea dashboards que muestren métricas clave (CPU, memoria, latencia de peticiones, tasa de errores) con anotaciones de despliegue.
- Define reglas de alerta con notificaciones en Slack o correo electrónico y documenta los playbooks asociados.

### Proyecto 2 · Trazas distribuidas básicas
- Instrumenta una API con OpenTelemetry y envía trazas a Jaeger u otro backend compatible.
- Documenta cómo se correlacionan trazas, métricas y logs en un incidente de latencia simulado.
- Entrega un informe con mejoras propuestas para reducir el MTTR.

## Checklists
### Checklist de instrumentación
- [ ] Exporters configurados y autenticados correctamente.
- [ ] Dashboards versionados como código (`jsonnet`, `grafonnet` o dashboards JSON en repositorio).
- [ ] Alertas con canales de notificación probados y documentados.

### Checklist de operación
- [ ] Backups de configuraciones y dashboards almacenados en control de versiones.
- [ ] Validación de retención de datos y uso de almacenamiento según el presupuesto definido.
- [ ] Revisión periódica de falsos positivos y actualización de umbrales.

## Rúbricas
- **Cobertura de monitoreo (35%)**: porcentaje de servicios críticos con métricas, logs y trazas integradas.
- **Accionabilidad de alertas (35%)**: claridad del mensaje, severidad adecuada y runbook asociado.
- **Automatización y versionado (30%)**: configuraciones declarativas y pipelines de despliegue reproducibles.

## Runbooks
### Runbook · Dashboard sin datos
1. Verifica que Prometheus pueda alcanzar los targets (`/targets`) y revisa estados `DOWN`.
2. Comprueba credenciales y certificados de los exporters afectados.
3. Revisa los logs de scraping y ajusta intervalos de recolección si hay saturación de red.
4. Actualiza el dashboard para mostrar mensajes de estado y documenta los cambios.

### Runbook · Tormenta de alertas
1. Confirma si el evento corresponde a una caída real revisando múltiples fuentes (logs, métricas, usuarios).
2. Ajusta temporalmente el `inhibit` o `silence` en Alertmanager mientras investigas la causa raíz.
3. Analiza la tendencia histórica y redefine umbrales o ventanas de evaluación.
4. Programa una retrospectiva para mejorar el diseño de alertas y registrar aprendizajes.
