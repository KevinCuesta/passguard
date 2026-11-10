# Criterios de calidad — iniciales

- **Funcionalidad:** análisis con zxcvbn-ts y generación de longitud seleccionable.
- **Seguridad:** aleatoriedad con Web Crypto API; rechazo de sesgo de módulo; sin persistencia, analítica o envío remoto de contraseñas.
- **Usabilidad:** contenido en español, estados visibles, mensajes comprensibles y flujo adaptable a móvil.
- **Accesibilidad:** etiquetas de formulario, navegación por teclado, foco visible y estado del análisis anunciado.
- **Mantenibilidad:** lógica de evaluación y generación separada en servicios TypeScript.
- **Verificación:** la compilación se comprobará en Fase 1. Pruebas automatizadas y evidencias reproducibles están pendientes para Fase 3.
