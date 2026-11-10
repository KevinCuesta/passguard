# Arquitectura de PassGuard

## Estado

PassGuard es una aplicación de página única en React + TypeScript + Vite. No hay backend ni base de datos. El evaluador, generador y mejorador funcionan en el navegador. Solo el chequeo manual de filtraciones requiere conexión a Have I Been Pwned (HIBP).

## Componentes y servicios

```text
App (estado efímero, interfaz y acciones explícitas)
 ├── passwordTypes.ts ── tipos y evaluación vacía
 ├── passwordEvaluator.ts ── zxcvbn-ts + diccionarios comunes y español (importación diferida)
 ├── passwordGenerator.ts ── Web Crypto API + muestreo por rechazo
 ├── passwordImprover.ts ── evaluator + generator, sin reutilizar el texto original
 └── breachChecker.ts ── SHA-1 local ── HTTPS: prefijo de 5 caracteres ── HIBP
                                                     └─ sufijo comparado localmente
```

## Evaluación y mejorador

La contraseña ingresada vive en estado React y se analiza con zxcvbn-ts. El mejorador reutiliza esa evaluación para mostrar debilidades, pero genera una contraseña independiente con el generador criptográfico existente. Busca una alternativa cuya evaluación sea alta y compara la puntuación y la longitud de ambas. No concatena ni modifica la contraseña original. Si el usuario cambia la entrada, se descarta el resultado anterior.

El evaluador se importa de forma dinámica al recibir una entrada para reducir el JavaScript inicial. La interfaz anuncia el estado de carga y un fallo de importación mediante texto y roles accesibles. El servicio de evaluación y sus diccionarios quedan separados del estado de UI.

## Generador

El usuario configura la longitud y los conjuntos habilitados. `passwordGenerator.ts` valida el rango (8–64), compone el alfabeto y obtiene cada índice mediante `crypto.getRandomValues` con rechazo de los valores fuera del múltiplo más alto del alfabeto. El cálculo teórico usa `N^L`; presupone selecciones independientes y uniformes.

## Consulta de filtraciones

La consulta solo empieza al pulsar el botón. `breachChecker.ts` codifica la contraseña como UTF-8, calcula SHA-1 con `crypto.subtle.digest` y solicita `https://api.pwnedpasswords.com/range/{prefijo}` con los primeros cinco caracteres. HIBP devuelve hashes que comparten ese prefijo; PassGuard compara el sufijo restante localmente y descarta las filas de relleno con conteo cero. La petición activa `Add-Padding`, no envía la contraseña ni el hash completo y desactiva caché y referer.

Las respuestas y contraseñas permanecen en memoria de la página. Los errores de conexión se presentan en el estado del verificador; no bloquean los otros servicios. Una respuesta sin coincidencia solo significa que no se encontró el hash en el conjunto consultado.

## Límites

zxcvbn-ts es una estimación heurística. HIBP es un servicio externo con un corpus que puede no incluir todas las filtraciones. SHA-1 aquí solo sirve como formato de búsqueda para la API; no se usa como hash de almacenamiento. La aplicación no implementa autenticación de cuentas ni almacenamiento de credenciales.
