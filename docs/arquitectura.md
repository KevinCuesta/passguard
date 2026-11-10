# Arquitectura inicial

## Estado

Documento preliminar de la Fase 1. Describe la versión actual y se actualizará al añadir el mejorador, la consulta de filtraciones y las pruebas.

## Vista general

PassGuard es una aplicación de página única que se ejecuta en el navegador. No existe servidor de aplicación ni almacenamiento persistente.

```text
App (estado de página, presentación e interacción)
 ├── passwordEvaluator.ts ── zxcvbn-ts + diccionarios comunes y español
 └── passwordGenerator.ts ── Web Crypto API
```

## Flujo de evaluación

La contraseña ingresada se conserva en estado React y se entrega al servicio local `evaluatePassword`. zxcvbn-ts produce una puntuación, coincidencias de patrones y sugerencias. El componente muestra un resumen; no guarda la entrada ni hace solicitudes de red.

## Flujo del generador

El usuario configura la longitud y los conjuntos habilitados. El servicio valida el rango (8–64), compone el alfabeto y obtiene cada índice mediante `crypto.getRandomValues` con rechazo de los valores fuera del múltiplo más alto del alfabeto. Esto evita el sesgo que resultaría de aplicar módulo directamente sobre un byte. El cálculo teórico usa `N^L`.

## Privacidad y límites

Los datos viven solo mientras existe la página. El portapapeles se modifica únicamente tras pulsar Copiar. La evaluación es heurística y las combinaciones describen supuestos de selección aleatoria; ninguno constituye una garantía sobre cuentas reales. Las siguientes fases deberán documentar explícitamente el flujo de minimización para HIBP.
