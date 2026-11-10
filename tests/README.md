# Pruebas de PassGuard

Suite ejecutable con Vitest mediante `npm run test`; para generar cobertura v8, ejecuta `npm run test:coverage`. La cobertura incluye `src/services/**/*.ts` y exige al menos 80% en líneas, funciones, ramas y sentencias.

Los módulos externos se sustituyen mediante mocks. Las pruebas no necesitan conectividad real ni usan contraseñas de personas. La matriz detallada y el último resultado están en [anexos/pruebas](../anexos/pruebas/).
