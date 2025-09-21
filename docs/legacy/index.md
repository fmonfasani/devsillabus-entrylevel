---
title: Material histórico
nav_order: 90
---

# Material histórico

Esta carpeta conserva guías y material histórico de cohorts anteriores. Todo el contenido se movió fuera de la raíz de la app para mantener limpio el código productivo, pero sigue estando disponible para consulta.

## Accesos rápidos

- [Artefacto: Subdominios](./artefacto-subdominios/)
- [Assignments Fullstack](./assignments-fullstack/)
- [Assignment 01 · Hello API](./assignment-01-hello-api/)

## Cómo clonar o descargar solo el material histórico

Si necesitas trabajar únicamente con estos recursos históricos, puedes clonar este repositorio y copiar la carpeta `docs/legacy/` (material histórico):

```bash
git clone <tu-fork-o-repo>
cd devsillabus-entrylevel
cp -R docs/legacy ~/material-historico-devsyllabus
```

También puedes utilizar `git sparse-checkout` para traer solo esta carpeta:

```bash
git clone <tu-fork-o-repo>
cd devsillabus-entrylevel
git sparse-checkout init --cone
git sparse-checkout set docs/legacy
```

> Consejo: si la organización decide mover el material histórico a un repositorio independiente en el futuro, este archivo debe actualizarse con la URL correspondiente.
