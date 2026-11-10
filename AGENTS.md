# Instrucciones para agentes de desarrollo

## Contexto

PassGuard es un proyecto universitario para seguridad de la información. La versión inicial es una SPA React + TypeScript + Vite, sin backend ni base de datos. La interfaz se escribe en español.

## Organización

- `src/App.tsx`: composición de interfaz y estado efímero de la página.
- `src/services/passwordEvaluator.ts`: adaptación de zxcvbn-ts, diccionarios y formato del resultado.
- `src/services/passwordGenerator.ts`: selección criptográfica uniforme, validación de opciones y conteo de combinaciones.
- `src/services/passwordImprover.ts`: genera una alternativa independiente, la evalúa y entrega los resultados comparables.
- `src/services/breachChecker.ts`: consulta manual de HIBP mediante k-anonymity; calcula SHA-1 localmente y compara sufijos en el navegador.
- `src/components/`: controles reutilizables que se extraigan cuando haya una necesidad concreta.
- `src/styles/`: hojas de estilo separadas si el tamaño de la interfaz lo amerita.
- `tests/`: pruebas unitarias de servicios; simular respuestas externas con mocks.
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
- La consulta Pwned Passwords solo ocurre tras una acción explícita. SHA-1 se usa únicamente como formato de búsqueda en HIBP, nunca para almacenar o verificar contraseñas localmente. Enviar solo los primeros cinco caracteres del hash; nunca el hash completo.
- Para Pwned Passwords, comparar el sufijo recibido en memoria. Enviar `Add-Padding: true`, no almacenar respuestas y mostrar que no encontrar una coincidencia no garantiza seguridad.
- Si HIBP no está disponible, mostrar un error comprensible y mantener operativos el evaluador, el generador y el mejorador.
- Usar Web Crypto API para generación y operaciones criptográficas del navegador; no crear algoritmos propios.
- El muestreo de caracteres debe evitar sesgo de módulo. No reutilizar partes de la contraseña original al proponer una alternativa.
- Una alternativa debe generarse con aleatoriedad criptográfica independiente; el servicio no debe añadir cambios predecibles a la contraseña original.
- Mantener claves, contraseñas, hashes y credenciales fuera de consola, commits, capturas y ejemplos de documentación. En tests usar solo valores sintéticos y mockear las respuestas de red.
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

`npm run test` ejecuta Vitest. Ejecutar las pruebas afectadas y `npm run build` antes de cada commit funcional. No declarar que una validación pasó si no se ejecutó y observó su resultado.

## Trabajo por etapas

Seguir las fases acordadas en la solicitud del usuario. La Fase 1 cubre evaluación y generación básicas; la Fase 2 añade el mejorador y la consulta HIBP. La suite inicial de servicios está en `tests/`; ampliar la cobertura académica y preparar evidencias de demostración en las siguientes etapas. No presentar las estadísticas de los DBIR como prevalencia general: conservar siempre la población y la métrica del informe fuente.
