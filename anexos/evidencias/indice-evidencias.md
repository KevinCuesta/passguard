# Índice de evidencias de funcionamiento

No se adjuntan capturas gráficas: la automatización de navegador no pudo inicializarse. Este índice vincula cada requisito con evidencia existente y distingue los artefactos automatizados de las capturas pendientes.

| # | Requisito | Evidencia disponible | Estado |
|---:|---|---|---|
| 1 | Pantalla inicial | Servidor local HTTP 200 registrado en [resultados](../pruebas/resultados.md); captura de pantalla pendiente | Parcial |
| 2 | Evaluación débil | Casos de evaluador EV-02 a EV-05 en [matriz](../pruebas/matriz-casos.md); captura visual pendiente | Parcial |
| 3 | Evaluación robusta | Caso EV-06 evalúa una generación aleatoria; captura visual pendiente | Parcial |
| 4 | Generación | GE-01–GE-07 y UI-07; build/lógica real ejecutados, captura pendiente | Parcial |
| 5 | Mejora | IM-01–IM-05 en la matriz; captura visual pendiente | Parcial |
| 6 | Consulta positiva | BR-01 y UI-01 prueban respuesta **mock**, no una consulta real | Completado como evidencia de test; captura pendiente |
| 7 | Consulta sin coincidencias | BR-02/03 y UI-04 prueban respuesta **mock**; no implica que una contraseña real nunca se filtró | Completado como evidencia de test; captura pendiente |
| 8 | Pantalla móvil | Requiere captura del navegador a 360 × 800 y 390 × 844 | Pendiente |
| 9 | Suite de pruebas | Resultado reproducible 36/36 y cobertura en [resultados](../pruebas/resultados.md) | Completado en texto; captura terminal opcional |
| 10 | Compilación | Artefactos y tamaños en [resultados](../pruebas/resultados.md); no se conserva screenshot terminal | Completado en texto |

Para obtener imágenes, seguir [guía de capturas](guia-capturas.md). Usar solo entradas sintéticas; rotular toda respuesta HIBP simulada como mock.
