# Instrucciones para agentes de desarrollo

## Contexto

PassGuard es un proyecto universitario para seguridad de la información. La versión inicial es una SPA React + TypeScript + Vite, sin backend ni base de datos. La interfaz se escribe en español.

## Organización

- `src/App.tsx`: composición de interfaz y estado efímero de la página.
- `src/services/passwordEvaluator.ts`: adaptación de zxcvbn-ts, diccionarios y formato del resultado.
- `src/services/passwordGenerator.ts`: selección criptográfica uniforme, validación de opciones y conteo de combinaciones.
- `src/components/`: controles reutilizables que se extraigan cuando haya una necesidad concreta.
- `src/styles/`: hojas de estilo separadas si el tamaño de la interfaz lo amerita.
- `tests/`: pruebas unitarias de servicios y casos de integración aislados.
- `docs/` y `anexos/`: documentación académica, fuentes y evidencias.

## Convenciones

- TypeScript estricto; nombres y mensajes en español cuando se dirigen al usuario.
- Mantener reglas de negocio en `services/` y evitar acoplarlas al DOM.
- Preferir controles HTML accesibles, etiquetas, foco visible y estados anunciados con ARIA.
- CSS propio y adaptable. No incorporar una dependencia visual sin una necesidad concreta.
- No incluir contraseñas reales en código, pruebas, capturas ni documentación.

## Criterios de seguridad

- No persistir contraseñas en `localStorage`, `sessionStorage`, cookies, archivos o bases de datos.
- No escribir contraseñas ni hashes de contraseña en consola, telemetría o analítica.
- No enviar contraseñas completas a servicios remotos. Toda consulta externa futura debe ser iniciada por el usuario y minimizar datos.
- Usar Web Crypto API para generación y operaciones criptográficas del navegador; no crear algoritmos propios.
- El muestreo de caracteres debe evitar sesgo de módulo. No reutilizar partes de la contraseña original al proponer una alternativa.
- No añadir backend sin autorización explícita.
- Explicar que el resultado heurístico y la entropía teórica no equivalen a una garantía de seguridad.

## Comandos

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
npm run build
npm run test
```

`npm run test` se activará junto con los casos de Vitest en la Fase 3. No declarar que una validación pasó si no se ejecutó y observó su resultado.

## Trabajo por etapas

Seguir las fases acordadas en la solicitud del usuario. La Fase 1 cubre evaluación y generación básicas. El mejorador y la consulta HIBP pertenecen a Fase 2; pruebas y documentación académica completas, a Fase 3; evidencias y entrega, a Fase 4.
