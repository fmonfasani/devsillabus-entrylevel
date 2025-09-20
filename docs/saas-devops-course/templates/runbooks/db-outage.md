# Runbook — Caída de PostgreSQL

## Señales
- Alertas `postgres_up == 0` en Prometheus
- Errores 500 en API con código `DB_UNAVAILABLE`

## Pasos
1. Validar alerta en Grafana (dashboard "SaaS Overview").
2. Conectar al pod/statefulset:
   ```bash
   kubectl get pods -n database
   kubectl describe pod postgres-0 -n database
   ```
3. Revisar logs:
   ```bash
   kubectl logs postgres-0 -n database --tail=200
   ```
4. Si el pod no arranca, verificar PVC:
   ```bash
   kubectl describe pvc data-postgres-0 -n database
   ```
5. Restaurar desde snapshot más reciente si hay corrupción.
6. Comunicar estado en canal #incident y actualizar ticket.

## Rollback/Recuperación
- Escalar réplicas: `kubectl scale statefulset postgres --replicas=2 -n database`
- Restaurar backup con `pg_restore`.

## Post-incident
- Crear postmortem (plantilla `postmortem-template.md`).
