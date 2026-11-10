# Proyecto de aula — PassGuard

## Datos generales

- Programa: Ingeniería de Sistemas.
- Asignatura: Seguridad de la Información.
- Nombre: PassGuard — Evaluador y generador inteligente de contraseñas seguras.
- Fecha límite: 17 de noviembre de 2026.
- Institución y docente: **pendientes de confirmar**.
- Integrantes:
  - Kevin Santiago Cuesta Hernandez
  - Dayana Sofia Mendes Perafan
  - Andrea Catalina Cortes

## Problema

Las contraseñas comunes, reutilizadas o ya expuestas pueden facilitar la adivinación y el acceso no autorizado. A la vez, una regla de mezcla de caracteres no mide por sí sola la facilidad de adivinación. Se necesita una herramienta didáctica que explique patrones, permita crear alternativas aleatorias y dé acceso voluntario a una consulta de exposición con divulgación limitada.

## Justificación

El proyecto relaciona conceptos de evaluación heurística, aleatoriedad criptográfica, privacidad, hashing, filtraciones y autenticación moderna en una aplicación demostrable. La interfaz hace explícitos los límites del estimador y los datos que se comparten con un servicio externo.

## Objetivos

### General

Construir una aplicación web educativa que evalúe contraseñas localmente, genere alternativas criptográficamente aleatorias y permita consultar exposiciones conocidas sin enviar la contraseña completa.

### Específicos

- Estimar la fortaleza mediante zxcvbn-ts y explicar patrones y recomendaciones en español.
- Generar claves con `crypto.getRandomValues()` y muestreo sin sesgo de módulo.
- Proponer una alternativa independiente y comparar las evaluaciones de entrada y salida.
- Implementar una consulta HIBP iniciada por el usuario con SHA-1 local, prefijo de cinco caracteres y comparación local del sufijo.
- Documentar la privacidad, las limitaciones y referencias sobre estándares y tecnologías relacionadas.

## Alcance

Incluye una SPA React + TypeScript + Vite sin backend ni base de datos. Los valores se mantienen en memoria de la pestaña. HIBP es el único servicio externo y solo se contacta cuando se pulsa el botón de consulta. PassGuard no administra cuentas, autentica usuarios ni guarda hashes para verificación.

## Metodología

El desarrollo se organiza en cuatro etapas: (1) estructura inicial, evaluación y generación; (2) mejorador y consulta de contraseñas comprometidas; (3) pruebas y documentación; (4) revisión de entrega, evidencias y demostración. Se valida cada bloque con pruebas de servicios, mocks de dependencias externas y compilación TypeScript/Vite. No se reporta un estudio con participantes.

## Diseño y calidad

La arquitectura y los flujos de datos están descritos en [docs/arquitectura.md](../arquitectura.md). Los criterios de calidad y seguridad se registran en [docs/criterios-calidad.md](../criterios-calidad.md). La suite automatizada está en `tests/` y se ejecuta con `npm run test`; la compilación se verifica con `npm run build`.

## Resultados y conclusiones

El resultado implementado es una aplicación funcional con evaluación, generación, mejora y consulta manual HIBP. Los resultados de las pruebas de software son evidencia de comportamiento de código, no de efectividad en usuarios reales. Las conclusiones académicas finales quedan **pendientes de la revisión y demostración del equipo**.

## Referencias

Consultar [anexos/referencias.md](../../anexos/referencias.md).
