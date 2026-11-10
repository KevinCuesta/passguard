# PassGuard

PassGuard es un proyecto académico de Ingeniería de Sistemas para evaluar contraseñas, generar alternativas aleatorias y consultar contraseñas filtradas. El análisis y la generación ocurren localmente; la consulta de filtraciones solo se realiza cuando el usuario la solicita y comparte únicamente un prefijo de hash.

## Objetivos

- Analizar patrones de adivinación conocidos en una contraseña de prueba.
- Explicar el resultado en español con recomendaciones entendibles.
- Generar contraseñas criptográficamente aleatorias sin transmitirlas.
- Comunicar los límites del análisis y las decisiones de privacidad.

## Tecnologías

- React, TypeScript y Vite.
- `@zxcvbn-ts/core`, diccionarios comunes y español de España.
- Web Crypto API (`crypto.getRandomValues`) para el generador.
- Vitest para pruebas unitarias de servicios.
- CSS propio, adaptable a escritorio y móvil.

## Instalación y ejecución

Requisitos: Node.js 20+ y npm. Desde la carpeta del repositorio:

```bash
npm install
npm run dev
```

Vite imprime la dirección local en la terminal (habitualmente `http://localhost:5173`). Para crear una compilación de producción:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Evaluación en español con puntuación, nivel, longitud, patrones reconocidos y sugerencias de zxcvbn-ts.
- Mostrar u ocultar el campo de evaluación.
- Generación de contraseñas de 8 a 64 caracteres (16 por defecto) con selección de alfabeto.
- Muestreo por rechazo con Web Crypto API para evitar sesgo de módulo.
- Conteo teórico de combinaciones como `N^L`, donde `N` es el tamaño del alfabeto seleccionado y `L` la longitud.
- Copia explícita al portapapeles y explicación de privacidad visible.
- Mejorador que genera una alternativa nueva con Web Crypto, identifica las debilidades del original y compara las evaluaciones sin reutilizar fragmentos.
- Consulta manual de Pwned Passwords: SHA-1 local, envío de los primeros cinco caracteres y comparación del sufijo en el navegador.
- Estados visibles de carga, error, coincidencia y ausencia de coincidencia para la consulta externa.

El conteo de combinaciones supone que cada posición se elige de forma independiente y uniforme del alfabeto. Describe el espacio teórico del generador bajo ese modelo; no mide la seguridad real de una contraseña creada por una persona.

## Estructura

```text
src/
  components/            # Componentes reutilizables (se ampliará en siguientes fases)
  services/
    passwordEvaluator.ts
    passwordGenerator.ts
    passwordImprover.ts
    breachChecker.ts
  styles/                # Estilos globales/componentes (se ampliará en siguientes fases)
  App.tsx
  main.tsx
tests/                   # Pruebas unitarias de los servicios
docs/
  proyecto-de-aula/
  marco-teorico.md
  arquitectura.md
  manual-usuario.md
  criterios-calidad.md
anexos/
  referencias.md
  evidencias/
  pruebas/
```

## Pruebas y validación

Ejecuta los casos unitarios con `npm run test` y comprueba tipos y compilación de producción con `npm run build`. La suite cubre evaluación, generación, mejorador y respuestas simuladas de la API. Las solicitudes de HIBP en las pruebas se simulan; no dependen de la disponibilidad del servicio.

## Privacidad y limitaciones

- El mejorador y la evaluación son heurísticos: su puntuación no garantiza que una contraseña sea segura.
- La consulta de Have I Been Pwned no se ejecuta al escribir. Al pulsar el botón, el navegador calcula el SHA-1 y envía únicamente los primeros cinco caracteres; el hash completo y la contraseña no se transmiten. La búsqueda usa el servicio externo HIBP y requiere conexión.
- Que una contraseña no aparezca en los datos consultados no demuestra que nunca haya sido expuesta ni que sea segura.
- El paquete de idioma disponible para español es `language-es-es`; la interfaz está en español latinoamericano, pero algunos textos de retroalimentación de zxcvbn-ts provienen del diccionario español de España.
- La compilación actual avisa que el paquete JavaScript principal supera 500 kB (aprox. 1.54 MB sin comprimir); los diccionarios de zxcvbn-ts representan la mayor parte del tamaño y pueden dividirse bajo demanda en una iteración posterior.
- La aplicación no guarda contraseñas en almacenamiento web ni las incluye en solicitudes. Las contraseñas de evaluación y mejora viven en memoria mientras la página está abierta; se eliminan al recargar o cerrar la pestaña.
- El botón copiar requiere permiso de portapapeles del navegador y un contexto seguro como localhost o HTTPS.

## Equipo

Integrantes:

- Kevin Santiago Cuesta Hernandez
- Dayana Sofia Mendes Perafan
- Andrea Catalina Cortes

Institución y docente: **pendientes de confirmar**.

## Referencias

- NIST SP 800-63B-4: <https://pages.nist.gov/800-63-4/sp800-63b.html>
- OWASP Authentication Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html>
- OWASP Password Storage Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html>
- Have I Been Pwned, Pwned Passwords API: <https://haveibeenpwned.com/API/v3#PwnedPasswords>
- Verizon 2025 DBIR, análisis de credential stuffing: <https://www.verizon.com/business/resources/articles/credential-stuffing-attacks-2025-dbir-research/>
- Verizon 2026 DBIR: <https://www.verizon.com/business/resources/T343/reports/2026-dbir-data-breach-investigations-report.pdf>
- FIDO Alliance, Passkeys: <https://fidoalliance.org/passkeys/>
- zxcvbn-ts: <https://github.com/zxcvbn-ts/zxcvbn>
- MDN Web Crypto API: <https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues>
