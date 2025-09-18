# Cómo publicar tu subdominio
Tu sitio quedará en `https://<tu-usuario>.devsyllabus.com`.

## Pasos
1. Hacé **fork** del repo.
2. Creá tu carpeta: `public/sites/<tu-usuario>/`.
3. Dentro, crea `index.html` (puede ser el ejemplo de abajo).
4. Abrí un **Pull Request**. Al aprobarse/mergearse, queda online.

## Reglas
- Nombre de carpeta: solo **a–z, 0–9 y guiones** (`-`).
- Debe existir `index.html` en tu carpeta.

## HTML mínimo
```html
<!doctype html><meta charset="utf-8">
<title><tu-usuario></title>
<h1>Hola, soy &lt;tu-usuario&gt;</h1>
<p>Mi primer deploy en subdominio propio.</p>
```
