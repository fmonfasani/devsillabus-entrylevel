# Runbook — Pico de Rate Limit

## Señales
- Métrica `rate_limit_blocked_total` > 100 en 5m
- Usuarios reportan errores 429

## Pasos
1. Verificar métrica en Grafana panel "Queue Backlog".
2. Revisar logs de API:
   ```bash
   kubectl logs deploy/saas-api -n saas | grep 429 | tail -n 50
   ```
3. Identificar IP/tenant agresor en Redis:
   ```bash
   redis-cli --tls -h $REDIS_HOST ZREVRANGE ratelimit:* 0 10 WITHSCORES
   ```
4. Si es ataque, bloquear IP en Cloudflare WAF.
5. Ajustar temporalmente límites (variables env) y redeploy via ArgoCD si corresponde.

## Mitigación temporal
- Habilitar modo "under attack" en Cloudflare.
- Añadir captcha en onboarding.

## Post-incident
- Analizar logs, agregar regla definitiva en WAF.
