---
title: 02 — DOM, eventos, accesibilidad y errores
nav_order: 3
---
# 02 — DOM, eventos, accesibilidad y manejo de errores

## DOM
- El **Document Object Model** representa la página como un árbol de nodos.
- Permite leer y modificar elementos con JavaScript (`document.querySelector`, `element.textContent`, etc.).

## Eventos
- Responden a interacciones como `click`, `input` o `submit`.
- Se registran con `addEventListener` y pueden cancelarse con `preventDefault`.
- Delegar eventos en contenedores mejora rendimiento y limpieza de código.

## Accesibilidad
- Usa etiquetas semánticas (`<header>`, `<nav>`, `<button>`) para ayudar a lectores de pantalla.
- Asegura contraste de colores y soporte de teclado (`tabindex`, `aria-label`).
- Prueba con herramientas como **Lighthouse** o **axe**.

## Manejo de errores
- Envuelve código riesgoso con `try/catch`.
- Emite mensajes claros para el usuario y registra detalles técnicos (console o servicios externos).
- Usa `window.onerror` o `unhandledrejection` para capturar errores globales.
