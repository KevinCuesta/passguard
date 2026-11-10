# PassGuard

PassGuard es un proyecto académico de Ingeniería de Sistemas para explorar la fortaleza de contraseñas y generar claves aleatorias desde el navegador. Esta primera entrega implementa la Fase 1: evaluación local con zxcvbn-ts y un generador basado en Web Crypto API.

## Objetivos

- Analizar patrones de adivinación conocidos en una contraseña de prueba.
- Explicar el resultado en español con recomendaciones entendibles.
- Generar contraseñas criptográficamente aleatorias sin transmitirlas.
- Comunicar los límites del análisis y las decisiones de privacidad.

## Tecnologías

- React, TypeScript y Vite.
- `@zxcvbn-ts/core`, diccionarios comunes y español de España.
- Web Crypto API (`crypto.getRandomValues`) para el generador.
- Vitest está instalado para la fase de pruebas; la batería automatizada se implementará en la Fase 3.
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

## Funcionalidades disponibles en Fase 1

- Evaluación en español con puntuación, nivel, longitud, patrones reconocidos y sugerencias de zxcvbn-ts.
- Mostrar u ocultar el campo de evaluación.
- Generación de contraseñas de 8 a 64 caracteres (16 por defecto) con selección de alfabeto.
- Muestreo por rechazo con Web Crypto API para evitar sesgo de módulo.
- Conteo teórico de combinaciones como `N^L`, donde `N` es el tamaño del alfabeto seleccionado y `L` la longitud.
- Copia explícita al portapapeles y explicación de privacidad visible.

El conteo de combinaciones supone que cada posición se elige de forma independiente y uniforme del alfabeto. Describe el espacio teórico del generador bajo ese modelo; no mide la seguridad real de una contraseña creada por una persona.

## Estructura

```text
src/
  components/            # Componentes reutilizables (se ampliará en siguientes fases)
  services/
    passwordEvaluator.ts
    passwordGenerator.ts
  styles/                # Estilos globales/componentes (se ampliará en siguientes fases)
  App.tsx
  main.tsx
tests/                   # Casos automatizados pendientes para Fase 3
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

## Validación

La comprobación de compilación se hace con `npm run build`. Los casos unitarios y verificables se desarrollarán en Fase 3; todavía no se afirma que exista una batería de pruebas ejecutada.

## Limitaciones de esta fase

- El mejorador de contraseñas, la consulta manual de Have I Been Pwned, el material educativo ampliado y la batería de pruebas están planificados para fases siguientes.
- El paquete de idioma disponible para español es `language-es-es`; la interfaz está en español latinoamericano, pero algunos textos de retroalimentación de zxcvbn-ts provienen del diccionario español de España.
- La compilación actual avisa que el paquete JavaScript principal supera 500 kB (aprox. 1.54 MB sin comprimir); los diccionarios de zxcvbn-ts representan la mayor parte del tamaño y pueden dividirse bajo demanda en una iteración posterior.
- La aplicación no guarda contraseñas en almacenamiento web ni las manda a servicios externos. La contraseña de evaluación vive en memoria mientras la página está abierta; se elimina al recargar o cerrar la pestaña.
- El botón copiar requiere permiso de portapapeles del navegador y un contexto seguro como localhost o HTTPS.

## Equipo

Equipo de tres integrantes. Nombres e institución: **pendientes de confirmar**.

## Referencias iniciales

- NIST SP 800-63B-4: <https://pages.nist.gov/800-63-4/sp800-63b.html>
- OWASP Authentication Cheat Sheet: <https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html>
- zxcvbn-ts: <https://github.com/zxcvbn-ts/zxcvbn>
- MDN Web Crypto API: <https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues>

Las fuentes y su aplicación al marco teórico se desarrollarán en la Fase 3.
