# Runbook — Cola BullMQ atrasada

## Señales
- Alerta `queue_backlog > 1000`
- Dashboard muestra latencia de jobs > 2m

## Pasos
1. Revisar estado de workers:
   ```bash
   kubectl get pods -n saas -l app=queue-worker
   ```
2. Escalar workers:
   ```bash
   kubectl scale deployment queue-worker --replicas=4 -n saas
   ```
3. Revisar logs de fallos:
   ```bash
   kubectl logs deployment/queue-worker -n saas --tail=100
   ```
4. Identificar jobs bloqueados con bull-board (`https://queue.example.com`).
5. Reintentar jobs fallidos críticos.

## Prevención
- Ajustar concurrencia en BullMQ.
- Configurar alertas sobre `queue_wait_duration_seconds`.
