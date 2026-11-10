# Matriz manual de navegador, interfaz y accesibilidad

Esta matriz está preparada para la prueba presencial de Fase 4. **Pendiente de ejecución por el equipo:** el navegador compartido no pudo inicializarse en el entorno de validación, y una respuesta HTTP local no demuestra comportamiento visual. No se afirma compatibilidad total ni conformidad WCAG.

Registrar versión exacta del navegador, sistema, tamaño del viewport, fecha, persona que prueba y observaciones. Probar con datos sintéticos. Marcar una casilla solo después de ejecutar el paso.

| ID | Entorno / criterio | Procedimiento | Resultado esperado | Estado/evidencia |
|---|---|---|---|---|
| NV-01 | Escritorio, Chrome/Edge actual | Abrir URL y recorrer evaluación, generador, privacidad | Sin solapamientos, texto recortado ni desplazamiento horizontal | Pendiente |
| NV-02 | Escritorio, Firefox actual | Repetir flujo completo; generar y copiar | Controles y Web Crypto funcionan; copia muestra estado | Pendiente |
| NV-03 | Escritorio, Safari actual (si disponible) | Evaluar, generar y copiar en HTTPS o localhost | Sin errores de compatibilidad; clipboard respeta permisos | Pendiente |
| NV-04 | Móvil, viewport 360 × 800 | Abrir página; recorrer tarjetas y generar | Columna única legible, sin scroll horizontal | Pendiente |
| NV-05 | Móvil, viewport 390 × 844 | Evaluar y consultar HIBP | Campo y botones caben; carga, resultado y error se entienden | Pendiente |
| NV-06 | Teclado | Recorrer con Tab/Shift+Tab; activar botones y casillas con Enter/Espacio | Orden lógico, indicador visible, sin trampa de foco; saltar al contenido funciona | Pendiente |
| NV-07 | Lector de pantalla | Revisar nombres de campo/botones, nivel y resultados de estado | Los nombres y cambios se anuncian de forma comprensible | Pendiente |
| NV-08 | Contraste | Medir texto normal/pequeño, botones, foco e indicadores con herramienta WCAG | Texto normal ≥4.5:1; texto grande ≥3:1; controles/foco ≥3:1 cuando aplique | Pendiente |
| NV-09 | Red desconectada | Desconectar y probar evaluación, generación y verificador | Funciones locales siguen disponibles; HIBP comunica fallo sin bloquear el resto | Pendiente |
| NV-10 | Red / HIBP | Ejecutar consulta de prueba o revisar caso simulado claramente rotulado | Si es real, avisar envío del prefijo; si es mock, identificarlo como simulación | Pendiente |

## Alcance comprobado automáticamente

Vitest sí comprueba etiqueta del campo, nombres accesibles de visibilidad, foco inicial en el enlace “Saltar al contenido”, estado de carga de HIBP, resultado positivo/negativo y mensajes de error. No emula tamaño visual, navegadores distintos, lector de pantalla ni medición de contraste. La matriz de casos automatizados está en [matriz-casos.md](matriz-casos.md).
