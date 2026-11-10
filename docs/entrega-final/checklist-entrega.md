# Checklist de entrega final

Estados: **completado** = existe evidencia local o pública descrita; **pendiente** = requiere una acción manual o no se pudo comprobar; **no aplicable** = fuera del alcance.

| Elemento | Estado | Evidencia / acción |
|---|---|---|
| Código fuente completo | completado | Repositorio local; Fase 4 se entrega en commits locales pendientes de push |
| Repositorio público | completado | El repositorio `KevinCuesta/passguard` es visible como público en GitHub: <https://github.com/KevinCuesta/passguard> |
| Aplicación funcional en entorno local | completado | Vite respondió HTTP 200; 36 pruebas automatizadas verifican funciones clave. Completar inspección visual manual. |
| Compilación aprobada | completado | `npm run build`; también compilación con base `/passguard/` verificada localmente |
| Pruebas automatizadas | completado | 36/36 aprobadas; cobertura de servicios 98.71% de líneas |
| Lint y revisión de dependencias | completado | `npm run lint` limpio; `npm audit` reportó 0 vulnerabilidades |
| Revisión básica de seguridad | completado | [Registro](../../anexos/pruebas/revision-seguridad.md); no es pentest ni certificación |
| Documento académico | completado | [Informe académico base](../proyecto-de-aula/informe-academico.md), editable en Markdown |
| Plantilla institucional, institución y docente | pendiente | Obtener formato y datos oficiales; completar antes de entregar |
| Bibliografía y anexos | completado | Referencias, matriz de casos, resultados y guía de exportación |
| Capturas auténticas de interfaz | pendiente | Tomar las capturas de [índice de evidencias](../../anexos/evidencias/indice-evidencias.md) usando datos sintéticos |
| Evidencia de consulta HIBP positiva/negativa | completado | Pruebas automatizadas con respuestas mock; no afirmar que son consultas reales. Captura manual opcional. |
| Guion de sustentación | completado | [Guion de cinco minutos](../presentacion/guion-sustentacion.md) |
| Estructura de diapositivas | completado | [Siete diapositivas sugeridas](../presentacion/estructura-diapositivas.md) |
| Manual de usuario | completado | [docs/manual-usuario.md](../manual-usuario.md) |
| Matriz manual de navegadores/accesibilidad | pendiente | Completar navegador/es, móvil, teclado, lector de pantalla y contraste documentados en [matriz](../../anexos/pruebas/matriz-validacion-manual.md) |
| Workflow de GitHub Pages | completado | `.github/workflows/pages.yml`, ruta base probada localmente |
| Activar GitHub Pages con source Actions | pendiente | En Settings → Pages, elegir GitHub Actions después de publicar commits |
| Workflow remoto verde | pendiente | Comprobar `build` y `deploy` en GitHub Actions después del push |
| URL pública de la aplicación | pendiente | URL prevista: <https://kevincuesta.github.io/passguard/>. Compartir solo tras verificarla luego del deploy |
| Backend y base de datos | no aplicable | Decisión de arquitectura: no almacenar contraseñas ni añadir backend |

## Antes de entregar

- Completar los pendientes manuales, no convertirlos en “completados” sin evidencia.
- Revisar que la demostración no muestre claves personales ni deje valores en el portapapeles.
- Esperar al workflow verde y probar el enlace de Pages desde una ventana nueva/dispositivo móvil.
- Exportar el informe en el formato solicitado por la institución; conservar también el Markdown fuente.
