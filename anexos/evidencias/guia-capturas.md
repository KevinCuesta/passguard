# Guía para capturas de evidencias

No se adjuntan capturas en esta entrega; no se generaron imágenes de interfaz durante la validación. Tomarlas con la aplicación real en `npm run dev`, sin datos personales ni contraseñas reales. Utilizar entradas sintéticas visibles solo durante la demostración; evitar guardarlas en el portapapeles o en nombres de archivo.

1. **Inicio y privacidad:** pantalla completa con PassGuard abierto y sección de evaluación vacía; debe verse la explicación de análisis local.
2. **Evaluación:** usar una cadena artificial como `muestra-ejemplo-para-clase`, mostrar el nivel y recomendaciones; ocultar el valor si no hace falta demostrar visibilidad.
3. **Mejorador:** con una entrada sintética, mostrar la comparación de puntuaciones y una alternativa generada. No conservar la captura si el equipo la considera credencial reutilizable; usar exclusivamente texto desechable.
4. **Generador:** mostrar longitud y conjuntos seleccionados antes de generar, y una salida nueva. Evitar que el portapapeles quede visible en otras aplicaciones.
5. **Consulta HIBP:** para evidenciar el estado visual, usar una respuesta de prueba de ambiente controlado o una entrada sintética. Si se ejecuta una consulta real, informar que el prefijo hash se envía a HIBP y registrar la fecha; nunca capturar contraseñas personales.
6. **Diseño móvil:** captura de ventana estrecha donde se vean controles sin recorte horizontal.
7. **Pruebas:** opcionalmente adjuntar la salida terminal de `npm run test:coverage` mostrando resumen y fecha, sin rutas o datos sensibles del equipo.

Guardar imágenes reales en esta carpeta con nombres como `01-inicio.png`, `02-evaluacion.png`, etc. Añadir fecha, navegador y tamaño de viewport a la memoria académica. No usar mocks de interfaz como si fueran capturas de producción ni editar resultados para aparentar una ejecución.
