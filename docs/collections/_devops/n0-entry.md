---
title: DEVOPS · N0 Entry · Docker 101
---

## Objetivos
- Comprender los conceptos fundamentales de contenedores y su diferencia frente a máquinas virtuales.
- Empaquetar aplicaciones simples en imágenes Docker reproducibles y versionadas.
- Ejecutar y depurar contenedores individuales con comandos básicos (`run`, `exec`, `logs`).
- Documentar buenas prácticas de naming, etiquetado y limpieza de imágenes.

## Proyectos
### Proyecto 1 · Hola Docker
- Inicializa un repositorio con una aplicación "Hello World" (Node.js o Python) y crea un `Dockerfile` mínimo.
- Publica la imagen en Docker Hub utilizando etiquetas semánticas y documentación en el README.
- Entrega un registro de comandos usados y capturas de `docker images` y `docker ps` demostrando el flujo end-to-end.

### Proyecto 2 · Stack local con Docker Compose
- Define un `docker-compose.yml` que combine aplicación web + base de datos ligera (PostgreSQL o MongoDB).
- Configura variables de entorno mediante archivos `.env` y valida la persistencia de datos en volúmenes nombrados.
- Automatiza la verificación con un script que ejecute pruebas básicas contra la API o base de datos.

## Checklists
### Checklist de preparación
- [ ] Instalar Docker Desktop o Docker Engine y validar `docker info`.
- [ ] Crear cuenta en Docker Hub u otro registry compatible.
- [ ] Configurar un archivo `.dockerignore` coherente con el stack elegido.

### Checklist de entrega
- [ ] `Dockerfile` sigue convenciones de capas mínimas y usa una imagen base oficial.
- [ ] El repositorio incluye instrucciones de ejecución local reproducibles.
- [ ] Se adjuntan logs que demuestran el ciclo build → run → push sin errores.

## Rúbricas
- **Comprensión técnica (40%)**: explicas por qué cada instrucción del `Dockerfile` es necesaria y cómo afecta al tamaño final.
- **Buenas prácticas (30%)**: uso de `.dockerignore`, etiquetado consistente y limpieza de imágenes después de las pruebas.
- **Documentación (30%)**: README con pasos, prerequisitos y tabla de variables de entorno.

## Runbooks
### Runbook · Fallos en la construcción de la imagen
1. Ejecuta `docker build --no-cache` para aislar problemas de caché.
2. Revisa la etapa exacta del error leyendo el `Dockerfile` y simplificando comandos complejos.
3. Valida dependencias internas usando contenedores multi-stage o imágenes base alternativas.
4. Documenta la causa raíz y la corrección implementada en el README del proyecto.

### Runbook · Contenedor no arranca
1. Reproduce el fallo con `docker run --rm -it` para obtener logs interactivos.
2. Inspecciona variables de entorno y puertos publicados con `docker inspect`.
3. Comprueba permisos de volúmenes y rutas montadas; ajusta el usuario del contenedor si es necesario.
4. Implementa un chequeo de salud (`HEALTHCHECK`) y actualiza la guía operativa con acciones de recuperación.
