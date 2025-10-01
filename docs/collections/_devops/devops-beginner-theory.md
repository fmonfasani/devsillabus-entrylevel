---
title: DevOps Beginner Self-Paced · Teoría completa
---

# DevOps Beginner Self-Paced · Teoría completa
{: .no_toc }

<details open markdown="block">
  <summary>Tabla de contenidos</summary>
  {: .text-delta }
- [Panorama general](#panorama-general)
- [Module 1 · IT & Networking Fundamentals](#module-1-it-networking-fundamentals)
- [Module 2 · Version Control & Automation](#module-2-version-control-automation)
- [Module 3 · Continuous Integration & Testing](#module-3-continuous-integration-testing)
- [Module 4 · Infrastructure as Code](#module-4-infrastructure-as-code)
- [Module 5 · Observability & Incident Response](#module-5-observability-incident-response)
- [Module 6 · Security & Reliability Foundations](#module-6-security-reliability-foundations)
- [Apéndices](#apendices)
</details>

## Panorama general
{: #panorama-general }

- Duración estimada: 12 semanas (6 módulos, 2 semanas por módulo).
- Requisito previo: familiaridad básica con sistemas operativos, Git y programación en al menos un lenguaje scripting.
- Formato: sesiones autoestudio apoyadas en laboratorios reproducibles, runbooks y glosarios colaborativos.

> 💡 Este track se alinea con los objetivos del nivel `N0` de DevOps e introduce prácticas que se escalan a roles SRE y Platform Engineering.

## Module 1 · IT & Networking Fundamentals
{: #module-1-it-networking-fundamentals }

### Semana 1 · Arquitectura de sistemas operativos

#### Conceptos clave
- Tipos de kernel, procesos, hilos y manejo de memoria en Linux.
- Administración de usuarios, permisos POSIX y políticas de sudo.
- Monitoreo de recursos con herramientas nativas (`top`, `htop`, `vmstat`).

#### Laboratorio guiado
- Provisiona una máquina virtual ligera en tu equipo o en la nube.
- Configura `tmux` y `ssh` para trabajar en sesiones persistentes.
- Documenta los comandos utilizados en un archivo `SETUP.md` dentro del repositorio personal.

```
sudo apt update && sudo apt install -y tmux htop
sudo usermod -aG sudo $USER
newgrp sudo
```

> 📘 Registra capturas de `uname -a`, `lsb_release -a` y la salida de `free -h` para validar el estado inicial del entorno.

#### Glosario

| Término | Definición |
| --- | --- |
| Kernel monolítico | Núcleo que integra drivers y servicios en un solo binario, como el de Linux. |
| Context switch | Cambio de ejecución entre hilos o procesos gestionado por el kernel. |
| cgroup | Mecanismo de Linux para limitar y aislar recursos (CPU, memoria, I/O) por proceso. |

### Semana 2 · Fundamentos de redes

#### Conceptos clave
- Modelo OSI vs. TCP/IP y puertos bien conocidos.
- Subnetting, CIDR y tablas de ruteo básicas.
- Herramientas de diagnóstico (`ping`, `traceroute`, `ss`).

#### Laboratorio guiado
- Configura reglas de firewall con `ufw` o `iptables` para restringir tráfico entrante.
- Implementa un script que comprueba la latencia hacia servicios críticos cada 5 minutos.
- Publica un informe corto con recomendaciones de endurecimiento de red.

```
#!/usr/bin/env bash
HOSTS="1.1.1.1 8.8.8.8"
for host in $HOSTS; do
  rtt=$(ping -c 3 "$host" | awk -F'/' 'END{print $5}')
  echo "$(date -Is) latency to $host: ${rtt}ms" >> latency.log
done
```

> ✅ Antes de finalizar la semana, asegura que el script se ejecute con `cron` y que los logs estén versionados.

#### Glosario

| Término | Definición |
| --- | --- |
| CIDR | Representación compacta de rangos de direcciones IP (por ejemplo, `10.0.0.0/24`). |
| MTU | Maximum Transmission Unit; tamaño máximo del paquete que puede transmitirse en una red. |
| Handshake TCP | Proceso de tres pasos (`SYN`, `SYN-ACK`, `ACK`) para establecer conexiones confiables. |

## Module 2 · Version Control & Automation
{: #module-2-version-control-automation }

### Semana 3 · Flujo Git para equipos DevOps

#### Conceptos clave
- Estrategias trunk-based vs. GitFlow adaptadas a infraestructura.
- Uso de submódulos y repositorios monorepo para IaC.
- Convenciones de mensajes de commit y etiquetas semánticas.

#### Laboratorio guiado
- Estructura un repositorio que contenga `infra/`, `apps/` y `runbooks/`.
- Configura ganchos (`pre-commit`) para validar formato YAML y JSON.
- Automatiza plantillas de issues para incidentes y cambios planificados.

> 🧭 Incluye un archivo `CONTRIBUTING.md` que detalle políticas de revisión y aprobación de cambios.

#### Glosario

| Término | Definición |
| --- | --- |
| Trunk-based development | Estrategia donde el trabajo se integra de forma continua en la rama principal. |
| Pre-commit hook | Script que se ejecuta antes de crear un commit para validar o modificar archivos. |
| Semantic versioning | Sistema `MAJOR.MINOR.PATCH` para versionar artefactos de software e infraestructura. |

### Semana 4 · Automatización con scripting

#### Conceptos clave
- Patrones de scripting idempotente en Bash y Python.
- Manejo seguro de variables de entorno y secretos.
- Diseño de utilidades reutilizables (librerías internas de CLI).

#### Laboratorio guiado
- Escribe un CLI en Python que despliegue y valide servicios locales con `docker compose`.
- Integra linters (`shellcheck`, `black`, `flake8`) dentro de un pipeline local.
- Documenta comandos frecuentes en `docs/automation-playbook.md`.

```
python -m venv .venv
source .venv/bin/activate
pip install black flake8 shellcheck-py docker
```

> 🛡️ Almacena secretos en un archivo `.env.example` y explica cómo rotarlos sin exponerlos en Git.

#### Glosario

| Término | Definición |
| --- | --- |
| Idempotencia | Propiedad que asegura que ejecutar un script múltiples veces produce el mismo resultado. |
| Shebang | Línea inicial (`#!/usr/bin/env bash`) que define el intérprete del script. |
| Virtual environment | Entorno aislado de Python que separa dependencias por proyecto. |

## Module 3 · Continuous Integration & Testing
{: #module-3-continuous-integration-testing }

### Semana 5 · Pipelines CI esenciales

#### Conceptos clave
- Diferencias entre pipelines declarativos y scriptados.
- Matrices de build y estrategias de caching.
- Integración de análisis estático y pruebas unitarias en CI.

#### Laboratorio guiado
- Configura un pipeline en GitHub Actions con jobs paralelos para backend y frontend.
- Publica artefactos (`.tar.gz`, imágenes Docker) en GitHub Packages.
- Implementa notificaciones de estado hacia Slack o Microsoft Teams.

```
name: ci
on:
  push:
    branches: [ "main" ]
  pull_request:

jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

> 🚦 Utiliza ambientes efímeros (`preview environments`) para validar cambios de infraestructura antes de fusionar.

#### Glosario

| Término | Definición |
| --- | --- |
| Artifact repository | Servicio para almacenar binarios generados por el pipeline. |
| Matrix build | Configuración que ejecuta un job múltiples veces con variaciones de variables (versiones, SO, etc.). |
| Status check | Validación obligatoria que debe aprobarse antes de fusionar un pull request. |

### Semana 6 · Testing automatizado en pipelines

#### Conceptos clave
- Pirámide de pruebas: unitarias, integración y end-to-end.
- Pruebas de infraestructura (`terratest`, `kitchen`, `inspec`).
- Uso de contenedores y servicios mock para aislar dependencias.

#### Laboratorio guiado
- Construye pruebas de contrato para servicios REST usando `pact` o `schemathesis`.
- Automatiza pruebas de resiliencia con inyección de fallos controlados.
- Documenta criterios de aceptación en un archivo `TESTING.md`.

> 🧪 Define métricas de cobertura y tiempos máximos de ejecución para evitar pipelines lentos.

#### Glosario

| Término | Definición |
| --- | --- |
| Terratest | Framework en Go para probar IaC y despliegues de infraestructura. |
| Chaos engineering | Disciplina que introduce fallas para validar la resiliencia del sistema. |
| Contrato de API | Especificación formal que define entradas, salidas y códigos de estado de un servicio. |

## Module 4 · Infrastructure as Code
{: #module-4-infrastructure-as-code }

### Semana 7 · Bases de Terraform y proveedores cloud

#### Conceptos clave
- Ciclo `plan → apply → destroy` y manejo de estado remoto.
- Variables, outputs y módulos reutilizables.
- Gestión de credenciales y `workspaces` para múltiples entornos.

#### Laboratorio guiado
- Provisiona redes y servicios básicos en AWS, Azure o GCP.
- Usa `terraform fmt` y `terraform validate` dentro del pipeline CI.
- Implementa políticas de guardia con `terraform cloud` o `OPA`.

> 🌱 Comienza con recursos gratuitos y limita el alcance usando etiquetas y límites de cuota.

#### Glosario

| Término | Definición |
| --- | --- |
| Backend de estado | Ubicación donde Terraform guarda el archivo de estado (S3, GCS, Terraform Cloud). |
| Workspace | Separación lógica de estados para gestionar múltiples entornos con la misma configuración. |
| Plan de ejecución | Salida que muestra las acciones que Terraform realizará antes de aplicar cambios. |

### Semana 8 · Configuración con Ansible y contenedores

#### Conceptos clave
- Diferencias entre configuración declarativa y procedimental.
- Inventarios dinámicos y `ansible-vault` para secretos.
- Plantillas Jinja2 para generar archivos de configuración.

#### Laboratorio guiado
- Escribe playbooks que configuren un clúster pequeño de servidores y contenedores.
- Integra Ansible con Docker o Podman para configurar servicios internos.
- Genera reportes de cumplimiento usando `ansible-lint` y `molecule`.

```
ansible-playbook -i inventory.yml site.yml --ask-vault-pass
```

> 🔄 Versiona los playbooks junto a documentación de rollback y dependencias de paquetes.

#### Glosario

| Término | Definición |
| --- | --- |
| Playbook | Conjunto de tareas Ansible definidas en YAML que se ejecutan contra un inventario. |
| Inventory | Archivo o script que define los hosts y grupos objetivo de una ejecución Ansible. |
| Molecule | Herramienta para probar roles y playbooks de Ansible en entornos aislados. |

## Module 5 · Observability & Incident Response
{: #module-5-observability-incident-response }

### Semana 9 · Métricas, logs y trazas

#### Conceptos clave
- Pilares de observabilidad y correlación de señales.
- Exporters Prometheus, agentes de logs y OpenTelemetry.
- Diseño de dashboards accionables.

#### Laboratorio guiado
- Implementa un stack `Prometheus + Loki + Tempo + Grafana` en contenedores.
- Define dashboards que incorporen métricas de negocio y sistemas.
- Configura alertas con umbrales dinámicos y receptores múltiples.

> 📊 Asegura que cada panel incluya contexto de negocio (SLO, usuarios afectados) y enlaces a runbooks.

#### Glosario

| Término | Definición |
| --- | --- |
| SLI | Indicador de nivel de servicio usado para medir el cumplimiento de SLO. |
| OpenTelemetry | Conjunto de APIs, SDKs y agentes para recolectar métricas, logs y trazas. |
| Cardinalidad | Número de combinaciones posibles en etiquetas de métricas; debe limitarse para evitar costos. |

### Semana 10 · Gestión de incidentes

#### Conceptos clave
- Ciclo de vida de incidentes: detección, respuesta, resolución, postmortem.
- Roles on-call y política de escalamiento.
- Automatización de runbooks y sala de guerra virtual.

#### Laboratorio guiado
- Simula un incidente de disponibilidad y ejecuta un role-play de respuesta.
- Redacta un postmortem sin culpables con acciones correctivas.
- Configura plantillas de comunicación para stakeholders técnicos y de negocio.

> 🧯 Define métricas de MTTA y MTTR y grábalas en un panel compartido.

#### Glosario

| Término | Definición |
| --- | --- |
| MTTA | Mean Time To Acknowledge; tiempo promedio para reconocer un incidente. |
| MTTR | Mean Time To Resolve; tiempo promedio para restablecer el servicio. |
| Postmortem blameless | Documento que analiza incidentes sin culpar individuos, enfocándose en mejoras sistémicas. |

## Module 6 · Security & Reliability Foundations
{: #module-6-security-reliability-foundations }

### Semana 11 · Seguridad práctica para DevOps

#### Conceptos clave
- Principio de menor privilegio y segmentación de accesos.
- Gestión de secretos (`vault`, `secrets manager`, `sops`).
- Escaneo de vulnerabilidades en imágenes y dependencias.

#### Laboratorio guiado
- Integra escáneres (`trivy`, `grype`, `npm audit`) al pipeline CI/CD.
- Implementa rotación automática de claves API y credenciales.
- Elabora una política de manejo de secretos versionada en `SECURITY.md`.

> 🔐 Nunca publiques secretos reales; usa ejemplos y documentación clara para el equipo.

#### Glosario

| Término | Definición |
| --- | --- |
| RBAC | Control de acceso basado en roles para limitar acciones por usuario o servicio. |
| Secret scanning | Proceso automatizado para detectar credenciales expuestas en repositorios. |
| SBOM | Software Bill of Materials; inventario de componentes de una aplicación o servicio. |

### Semana 12 · Fiabilidad y optimización continua

#### Conceptos clave
- Diseño para resiliencia: redundancia activa-activa y tolerancia a fallas.
- Gestión de capacidad y coste en la nube.
- Mejora continua basada en indicadores (`error budget`, `capacity plan`).

#### Laboratorio guiado
- Diseña ejercicios de `game day` para validar planes de recuperación.
- Calcula presupuestos de error por servicio y define experimentos de mejora.
- Presenta un roadmap trimestral con iniciativas de fiabilidad priorizadas.

> 🗂️ Mantén los resultados en una carpeta `reports/` con plantillas reutilizables.

#### Glosario

| Término | Definición |
| --- | --- |
| Error budget | Cantidad de tiempo permitido de indisponibilidad según los SLO definidos. |
| Game day | Ejercicio planificado para practicar respuestas a incidentes simulados. |
| Capacity planning | Proceso para estimar recursos necesarios y optimizar costos sin perder rendimiento. |

## Apéndices
{: #apendices }

### Recursos recomendados
- [DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/)
- [Google SRE Workbook](https://sre.google/workbook/)
- [Awesome DevOps](https://github.com/akullpp/awesome-devops)

### Formato sugerido para runbooks

```
# Resumen
- Servicio afectado
- Impacto observable

# Diagnóstico
- Comandos de verificación
- Métricas relevantes

# Mitigación
- Acciones inmediatas
- Procedimiento de rollback

# Prevención
- Acciones follow-up
- Propietario y fecha objetivo
```

> 📝 Cada runbook debe incluir responsables, ventanas de mantenimiento y un enlace a los dashboards asociados.
