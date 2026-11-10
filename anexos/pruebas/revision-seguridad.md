# Registro de revisión básica de seguridad

**Fecha:** 10 de noviembre de 2026. Revisión manual del código y pruebas del repositorio, con referencias de NIST SP 800-63B-4 y OWASP. No es una auditoría de penetración ni una certificación.

| Área | Evidencia y comprobación | Resultado / riesgo residual |
|---|---|---|
| Persistencia | Búsqueda en `src/` de `localStorage`, `sessionStorage` y llamadas de consola; prueba UI espía ambos `setItem` | No hay escrituras de contraseñas en almacenamiento web en la aplicación revisada. Los valores viven en estado de página; herramientas/extensiones del navegador quedan fuera del alcance. |
| Salida de datos | `breachChecker.ts` solicita solo el prefijo de 5 caracteres del SHA-1 y compara el sufijo local; prueba valida URL, ausencia de contraseña/hash completo, `Add-Padding`, `no-store` y `no-referrer` | Compatible con búsqueda por rango documentada por HIBP. El prefijo y metadatos de red llegan a un tercero al pedir la consulta. |
| Hash | SHA-1 se calcula con `crypto.subtle.digest` solo para protocolo HIBP | SHA-1 no es almacenamiento seguro ni mecanismo de autenticación aquí. El código lo documenta. |
| Generación | `passwordGenerator.ts` usa `crypto.getRandomValues` y descarta la cola incompleta; tests comprueban ausencia de `Math.random` y rechazo de byte sesgado | Propiedad revisada a nivel de código y caso límite determinista. No se hizo análisis estadístico masivo del RNG del navegador. |
| Errores | Errores digest, red, HTTP y lectura del cuerpo se transforman en mensajes genéricos; casos simulados | No reflejan la contraseña ni mensajes internos del fetch. |
| Almacenamiento de servidor | Inspección del proyecto, arquitectura y llamadas de red | No hay backend ni base de datos. Única conexión funcional externa es la consulta iniciada por la persona hacia HIBP. |
| Secretos del repositorio | Inspección de `.gitignore`, búsqueda de archivos `.env*` y revisión de archivos a incluir | `.env` y `.env.*` están ignorados, con excepción explícita `.env.example`; no se encontraron archivos `.env` en el repositorio al revisar. Antes de publicar, revisar el diff staged de cada commit. |
| Dependencias | `npm install` y `npm audit` | 0 vulnerabilidades reportadas por npm en la auditoría observada. npm mostró aviso de scripts de instalación pendientes de aprobación para esbuild; la instalación se completó. |
| Privacidad de uso | La consulta de exposición requiere botón explícito; evaluación y generación son locales | No usar contraseñas reales en las capturas académicas. No se puede garantizar protección si el dispositivo o navegador está comprometido. |

## Medidas aplicadas en esta fase

- Ignorar `.env` y `.env.*` sin permitir secretos locales accidentales en Git.
- Cargar el evaluador pesado bajo demanda y anunciar carga/error en interfaz.
- No almacenar valores y agregar prueba que observa las llamadas a storage.
- Estandarizar errores del cálculo digest y lectura de respuesta.
- Mantener pruebas HIBP con mocks y sin dependencia de Internet.
- Evitar afirmar seguridad absoluta; documentar límites de estimación y de k-anonymity.

## Riesgos pendientes

- La consulta a HIBP filtra el prefijo de hash al servicio y revela metadatos de red.
- El estado de memoria puede ser accesible a software malicioso con control del navegador.
- La puntuación de zxcvbn no cubre phishing, keyloggers, reutilización o contexto específico de todas las cuentas.
- No se ejecutó un análisis dinámico, pruebas de penetración ni revisión profesional independiente.
- Falta medir accesibilidad WCAG y compatibilidad en una matriz de navegadores.
