# Criterios de calidad

- **Funcionalidad:** evaluación local zxcvbn-ts, generación, mejorador y consulta manual de filtraciones.
- **Seguridad:** aleatoriedad con Web Crypto API; muestreo sin sesgo de módulo; ninguna contraseña persistida o enviada; HIBP recibe solo el prefijo de cinco caracteres y sus respuestas se comparan localmente.
- **Usabilidad:** interfaz en español, errores comprensibles, estados de carga y resultados, diseño adaptable y controles de copiar explícitos.
- **Accesibilidad:** etiquetas asociadas, estados anunciados con ARIA, foco visible, acciones disponibles por teclado y contraste de controles.
- **Mantenibilidad:** responsabilidades de evaluación, generación, mejora y HIBP separadas en servicios TypeScript.
- **Pruebas:** mocks para la API externa; cobertura de entradas vacías, puntuación, salida del generador, configuración inválida y errores de red/HTTP. Ejecutar `npm run test` y `npm run build` antes de cambios de entrega; registrar los resultados reales.

La interfaz usa una contraseña de factor único como entrada de ejemplo, pero no es un verificador de cuentas. La longitud de su generador no sustituye una política de autenticación NIST.
