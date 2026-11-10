# Criterios de calidad y resultados

**Corte de validación:** 10 de noviembre de 2026. Resultados reproducibles en el repositorio local; no equivalen a una auditoría de seguridad certificada ni a un estudio con usuarios.

| Criterio | Descripción | Indicador verificable | Método | Resultado real | Estado |
|---|---|---|---|---|---|
| Funcionalidad | Evaluación, generación, mejora y consulta de exposición | Casos automatizados de servicios y UI | `npm run test` | 31 pruebas aprobadas en 6 archivos; cubre los flujos críticos y errores simulados de HIBP | aprobado |
| Seguridad | Generación mediante aleatoriedad del navegador y consulta por rango | Uso de `crypto.getRandomValues`; HIBP recibe prefijo de 5 caracteres; sin contraseña completa en red | Inspección de servicios, pruebas con mocks y búsqueda estática | Generador usa rechazo para evitar sesgo de módulo; HIBP calcula SHA-1 localmente, usa `Add-Padding` y compara el sufijo local | aprobado |
| Privacidad | No persistir ni registrar las entradas | Ausencia de llamadas a almacenamiento web y logging de contraseña | Búsqueda estática en `src/` y prueba de interfaz | Sin referencias a `localStorage`, `sessionStorage` ni `console.log/info/error` en `src/`; prueba confirma que no se escriben valores en los storages | aprobado |
| Usabilidad | Mensajes y controles comprensibles | Etiquetas, errores, estados de carga y operación en móvil | Inspección de código y pruebas UI | Etiqueta del campo y estados de HIBP probados; diseño CSS adaptable. No se hizo sesión formal con usuarios | aprobado |
| Mantenibilidad | Separación de lógica y tipado | Servicios TypeScript separados y lint limpio | Revisión de estructura, `npm run lint`, `npm run build` | Evaluador, generador, mejorador y verificador separados; lint sin hallazgos y compilación correcta | aprobado |
| Rendimiento | Reducir JavaScript inicial | Tamaño minificado de entrada y carga diferida de diccionarios | `npm run build` y revisión de artefactos | Entrada JS 243.86 kB / 76.11 kB gzip; evaluator e idiomas se descargan bajo demanda. Queda chunk español de 839.20 kB con advertencia de Vite | pendiente |
| Compatibilidad | Ejecución en navegadores de escritorio y móvil | Matriz real de navegadores y disponibilidad de Web Crypto/clipboard | Prueba manual por navegador | Solo se validó compilación en el entorno local; no se ejecutó matriz de navegadores | pendiente |
| Accesibilidad | Etiquetas, lectura de estados y uso por teclado | Pruebas con lector de pantalla, contraste y navegación completa | Inspección de HTML/CSS; pruebas automáticas básicas | Campo etiquetado y estados con roles ARIA observados; no se ejecutó auditoría WCAG ni pruebas con lector de pantalla | pendiente |
| Documentación | Instrucciones técnicas y académicas enlazadas | Secciones solicitadas, autores, referencias y límites explícitos | Revisión documental | README, manual, arquitectura, marco teórico, informe académico y anexos preparados; datos institucionales quedan marcados como pendientes | aprobado |
| Pruebas | Suite determinista, cobertura y ausencia de red real | 80% mínimo configurado; no depender de internet | `npm run test:coverage` | 31/31 aprobadas; statements 98.82%, branches 98.33%, functions 100%, lines 98.71% | aprobado |

## Límites de interpretación

- “Aprobado” significa que el indicador declarado fue comprobado con el método descrito, no que PassGuard esté libre de vulnerabilidades.
- HIBP es un tercero. El prefijo de hash sigue siendo una consulta externa y la privacidad se reduce, pero no se elimina todo metadato de red.
- `zxcvbn-ts` ofrece una estimación heurística; no certifica resistencia frente a atacantes ni cubre malware, phishing o reutilización entre sitios.
- La cobertura mide líneas/ramas ejecutadas por las pruebas, no calidad exhaustiva ni seguridad.
- El chunk de diccionario español sigue generando la advertencia >500 kB; se mantiene visible, no se aumenta el límite para silenciarla.

## Reproducción

```bash
npm run test:coverage
npm run lint
npm run build
npm audit
```

Los resultados de esta ejecución también se registran en [anexos/pruebas/resultados.md](../anexos/pruebas/resultados.md).
