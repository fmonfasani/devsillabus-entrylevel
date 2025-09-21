---
title: DEVOPS · N2 Pro · Automatizaciones con n8n
---

## Objetivos
- Diseñar flujos de automatización que integren servicios cloud, APIs internas y herramientas de soporte.
- Gestionar despliegues de n8n autoalojado con autenticación segura, almacenamiento persistente y escalabilidad básica.
- Implementar pruebas y versionado de workflows para garantizar reproducibilidad y trazabilidad.
- Integrar automatizaciones con pipelines DevOps existentes para acelerar tiempos de entrega.

## Proyectos
### Proyecto 1 · Portal de automatizaciones
- Despliega n8n en contenedores (Docker Compose o Kubernetes) con certificados TLS y usuarios gestionados.
- Crea un workflow que sincronice incidencias desde un formulario web hacia Jira/GitHub Issues, notificando en Slack.
- Documenta el flujo con diagramas, variables sensibles y procedimientos de rollback.

### Proyecto 2 · Automatización de releases
- Construye un workflow que dispare pipelines CI/CD según etiquetas en repositorios Git.
- Incluye pasos de validación (pruebas automatizadas, revisión de artefactos) antes de promover a producción.
- Añade métricas y logs del workflow para auditar tiempos de ejecución y errores.

## Checklists
### Checklist de seguridad y cumplimiento
- [ ] Accesos autenticados mediante SSO o credenciales rotadas periódicamente.
- [ ] Variables sensibles almacenadas en vaults o secretos cifrados.
- [ ] Auditorías programadas para revisar ejecutores, webhooks y tokens activos.

### Checklist de calidad del workflow
- [ ] Workflows documentados y versionados (JSON exportado en repositorio).
- [ ] Tests unitarios o de integración que verifiquen nodos críticos utilizando el modo de pruebas de n8n.
- [ ] Alertas configuradas para fallos de ejecución y reintentos controlados.

## Rúbricas
- **Arquitectura del despliegue (30%)**: alta disponibilidad básica, backups y políticas de actualización.
- **Valor de negocio (40%)**: automatizaciones reducen tiempos de ciclo y eliminan tareas manuales críticas.
- **Gobernanza (30%)**: control de acceso, versionado y auditoría documentados.

## Runbooks
### Runbook · Workflow fallido
1. Revisa el historial de ejecuciones en n8n y descarga los logs detallados.
2. Identifica el nodo que falló, valida credenciales y repite la ejecución en modo manual con datos de prueba.
3. Ajusta la lógica, agrega validaciones previas y vuelve a desplegar el workflow actualizado.
4. Comunica la resolución y actualiza la documentación de dependencias externas.

### Runbook · Degradación del servicio n8n
1. Verifica uso de CPU/memoria del contenedor o pod y escala horizontalmente si supera umbrales.
2. Revisa conexiones de base de datos y almacenamiento; ejecuta migraciones pendientes si aplica.
3. Aísla integraciones con mayor latencia y aplica circuit breakers o colas intermedias.
4. Ejecuta un plan de contingencia trasladando workflows críticos a un entorno secundario o modo manual.
