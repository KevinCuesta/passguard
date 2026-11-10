# PassGuard: evaluación privada y generación de contraseñas

**Proyecto de aula — Seguridad de la Información**<br>
**Programa:** Ingeniería de Sistemas<br>
**Fecha de entrega:** 17 de noviembre de 2026<br>
**Institución y docente:** pendientes de confirmar<br>
**Integrantes:** Kevin Santiago Cuesta Hernandez; Dayana Sofia Mendes Perafan; Andrea Catalina Cortes.

> Documento base en Markdown. Debe adaptarse a la plantilla institucional cuando el equipo disponga de ella. Los resultados corresponden a pruebas de software realizadas en el entorno de desarrollo y no a una evaluación con participantes.

## 1. Introducción

Las contraseñas siguen siendo un mecanismo extendido de autenticación, aunque las elecciones predecibles y la reutilización facilitan ataques de diccionario, fuerza bruta y credential stuffing. PassGuard es una aplicación web educativa que ayuda a observar patrones de adivinación, crear una alternativa aleatoria y consultar de forma voluntaria si una contraseña figura en el corpus Pwned Passwords. La evaluación y generación se ejecutan en el navegador; no existe servidor propio ni base de datos.

## 2. Planteamiento del problema

Las reglas simples de composición no explican por sí solas cuán predecible es una contraseña. A la vez, para recordar claves, algunas personas recurren a secuencias comunes o reutilizan valores. Una herramienta de aprendizaje debe explicar el resultado sin afirmar seguridad absoluta y limitar lo compartido cuando se consulta un conjunto externo de contraseñas expuestas.

## 3. Justificación

El proyecto integra estimación heurística, aleatoriedad criptográfica, minimización de datos, hashing y consulta con k-anonymity en un producto demostrable. Su arquitectura sin backend reduce la cantidad de datos bajo control del proyecto y permite observar con claridad cuándo se realiza una petición de red y qué parte del hash se transmite. La consulta externa aún implica comunicación con HIBP y no elimina todos los metadatos de red.

## 4. Objetivo general

Construir una aplicación educativa que evalúe contraseñas localmente, genere alternativas con aleatoriedad criptográfica y permita consultar exposiciones conocidas mediante una petición de rango que no revele la contraseña ni su hash completo.

## 5. Objetivos específicos

- Estimar patrones conocidos con zxcvbn-ts y presentar recomendaciones en español.
- Generar contraseñas de longitud configurable utilizando Web Crypto API y muestreo sin sesgo de módulo.
- Proponer una alternativa independiente y comparar las evaluaciones de entrada y salida.
- Consultar Pwned Passwords solo después de una acción explícita, calculando SHA-1 localmente y comparando la respuesta en el navegador.
- Validar módulos con pruebas automatizadas y documentar límites, decisiones de privacidad y referencias verificables.

## 6. Alcance y limitaciones

El alcance incluye una SPA local, un evaluador, generador, mejorador, comprobación manual HIBP y documentación. Las contraseñas de entrada y la alternativa se mantienen en memoria de React mientras la pestaña vive. No hay backend, cuentas, almacenamiento, sincronización ni autenticación. La consulta HIBP requiere conexión y envía un prefijo de cinco caracteres del SHA-1; el prefijo también es información consultada por un tercero.

El resultado de zxcvbn-ts es heurístico y no mide phishing, keylogging, malware, reutilización entre servicios ni la seguridad del dispositivo. La ausencia de un resultado en HIBP no prueba que una contraseña nunca se haya expuesto. No se realizó estudio de usabilidad con personas ni auditoría formal de WCAG o penetración.

## 7. Marco teórico

### 7.1 Contraseñas y ataques

Una contraseña es un secreto memorizado que permite demostrar conocimiento. Los ataques de diccionario prueban palabras y variantes priorizadas; la fuerza bruta explora un espacio de candidatos; los ataques basados en reglas combinan ambos. Patrones como secuencias, repeticiones, palabras comunes y sustituciones previsibles hacen que el espacio efectivo de búsqueda sea menor que el alfabeto teórico. La reutilización también habilita credential stuffing: probar credenciales expuestas en otros servicios.

La longitud suele aumentar el costo de adivinar, pero una cadena larga construida con una frase común no equivale necesariamente a una elección aleatoria. NIST recomienda que los verificadores comparen secretos nuevos con una lista de valores comunes, esperados o comprometidos y no impongan reglas de composición obligatorias; su mínimo de 15 caracteres aplica a contraseñas usadas como factor único de autenticación, no es una certificación para la contraseña que se analiza en esta herramienta ([NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)).

### 7.2 Combinaciones y entropía

Para un generador uniforme e independiente, el número teórico de cadenas de longitud `L` sobre un alfabeto de tamaño `C` es `Ω = C^L` (la expresión a veces se escribe `N = C^L`, donde `N` representa ese número de combinaciones). La entropía ideal asociada es `H = log₂(Ω) = L log₂(C)` bits. Este cálculo supone que cada carácter se selecciona de forma independiente y con distribución uniforme, como intenta el generador de PassGuard. No describe contraseñas elegidas por personas: sus elecciones siguen patrones y distribuciones no uniformes. La puntuación de zxcvbn-ts estima adivinabilidad mediante patrones conocidos y es un indicador diferente de la entropía teórica.

### 7.3 Cifrado y hashing

El cifrado transforma datos mediante una clave y permite recuperarlos mediante la operación inversa. El cifrado simétrico usa una misma clave secreta para cifrar y descifrar; AES es un estándar de bloque simétrico definido por NIST. El cifrado asimétrico usa un par de claves relacionadas, normalmente una pública y otra privada. PassGuard no cifra ni guarda contraseñas.

El hashing transforma una entrada en un resumen; no está diseñado para recuperar la entrada. SHA-1 se usa en PassGuard exclusivamente para consultar la API de rango de Pwned Passwords; no se usa para almacenar contraseñas ni autenticar usuarios. OWASP recomienda hashing adaptativo y deliberadamente costoso —por ejemplo Argon2id, con sal única— para almacenar verificadores de contraseñas. Como PassGuard no guarda credenciales, Argon2id se explica como referente y no está implementado ([OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [RFC 9106](https://www.rfc-editor.org/rfc/rfc9106)).

### 7.4 Generación segura

`crypto.getRandomValues()` de Web Crypto obtiene bytes aleatorios adecuados para usos criptográficos en el navegador. PassGuard mapea bytes a índices mediante rechazo: descarta los valores fuera del mayor múltiplo de la longitud del alfabeto que cabe en 256. Esto evita que un operador módulo favorezca algunos caracteres. La calidad de la operación depende de la implementación segura del navegador y del entorno donde se ejecuta.

### 7.5 MFA, llaves físicas y passkeys

Los factores de autenticación suelen clasificarse como algo que se sabe (contraseña o PIN), algo que se posee (teléfono o llave de seguridad) y algo que se es (biometría procesada por un autenticador). MFA combina factores de categorías distintas; sumar dos secretos de conocimiento no crea por sí solo MFA. Una llave física puede realizar autenticación criptográfica resistente al phishing. FIDO2/WebAuthn y las passkeys permiten credenciales basadas en pares de claves vinculados al origen. Estos mecanismos se describen como contexto académico: PassGuard no implementa cuentas, MFA, FIDO2 ni passkeys ([OWASP MFA Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html), [FIDO Alliance](https://fidoalliance.org/passkeys/)).

### 7.6 Contraseñas vulnerables: publicaciones 2025–2026

NordPass publica su lista “Top 200” de 2025 con NordStellar e investigadores independientes. La metodología declarada analizó filtraciones públicas recientes y repositorios de la dark web entre septiembre de 2024 y septiembre de 2025, agrupó resultados por país en 44 países e indica que no adquirió ni compró datos personales. En la clasificación mundial que presenta, `123456` ocupa el primer lugar. Es un análisis de datos expuestos, no una encuesta representativa de todas las contraseñas ni un censo global de usuarios ([NordPass, metodología y resultados 2025](https://nordpass.com/most-common-passwords-list/)).

Verizon reporta que credenciales comprometidas fueron vector de acceso inicial en 22% de las brechas revisadas por su 2025 DBIR; en un subanálisis de datos de infección por infostealers, la mediana fue que solo 49% de las contraseñas de cada usuario fueran distintas entre servicios. Las poblaciones y métricas son específicas del informe ([Verizon, análisis adicional 2025](https://www.verizon.com/business/resources/articles/credential-stuffing-attacks-2025-dbir-research/)). En el DBIR 2026, una figura analiza 7.345 cuentas escaneadas: la mediana de cuentas con contraseña comprometida fue 4%; el informe señala que en ese conjunto los usuarios tenían más de cuatro veces más probabilidad de usar una contraseña comprometida que una clasificada como débil. Son datos organizacionales observados por Verizon, no prevalencia universal ([Verizon 2026 DBIR, sección “Passwords”](https://www.verizon.com/business/resources/T343/reports/2026-dbir-data-breach-investigations-report.pdf)).

## 8. Metodología de desarrollo

Se siguió una implementación incremental: base React/TypeScript/Vite, incorporación del mejorador y la consulta de exposición, ampliación de pruebas y revisión de seguridad/calidad, y elaboración de documentación. Las pruebas de red usan mocks para que la suite sea reproducible sin conectividad. La cobertura se mide con provider v8 en los servicios. No se presentan resultados de entrevistas, encuestas ni pruebas con usuarios porque no se realizaron.

## 9. Tecnologías utilizadas

- React y TypeScript para interfaz y lógica tipada.
- Vite para servidor de desarrollo y compilación.
- zxcvbn-ts y diccionarios común y español para patrones de adivinación.
- Web Crypto API para generación criptográfica y SHA-1 de consulta.
- Vitest, Testing Library, user-event y jsdom para pruebas.
- CSS propio con diseño adaptable.

## 10. Arquitectura del sistema

La aplicación es una SPA; `src/App.tsx` coordina estado efímero y acciones del usuario. `src/services/` separa evaluación, tipos, generación, mejoramiento y consulta HIBP. El evaluador se carga dinámicamente para aplazar el peso de sus diccionarios. Solo `breachChecker.ts` realiza una petición externa, iniciada manualmente. No hay servidor propio, API propia, base de datos ni almacenamiento web. El detalle de flujo está en [docs/arquitectura.md](../arquitectura.md).

## 11. Descripción de módulos

- **Evaluación:** recibe texto y devuelve puntuación, patrones, debilidades y recomendaciones de zxcvbn-ts.
- **Generación:** valida longitud de 8 a 64 y alfabeto seleccionado; obtiene caracteres por Web Crypto y rechazo uniforme.
- **Mejorador:** evalúa el original, genera una contraseña independiente y devuelve ambas evaluaciones para comparación; no incorpora fragmentos del original.
- **Filtraciones:** calcula SHA-1 local, consulta el rango del prefijo de cinco caracteres y compara sufijos localmente.
- **Interfaz:** muestra estados, sugerencias, controles de visibilidad y copia explícita al portapapeles.

## 12. Mecanismos de seguridad implementados

No se persisten entradas en `localStorage` ni `sessionStorage`; no se envían al evaluador, generador o mejorador. El generador usa Web Crypto y rechazo de valores sesgados. La consulta HIBP ocurre tras una acción explícita y solicita solo un prefijo SHA-1 de cinco caracteres, con `Add-Padding`; la comparación se queda en el navegador. Las respuestas HTTP, conexión, resumen y lectura del cuerpo presentan mensajes genéricos sin reflejar la contraseña. `.gitignore` excluye archivos `.env` y builds. Estas medidas reducen exposición, pero no garantizan invulnerabilidad: una extensión maliciosa, un dispositivo comprometido o metadatos de tráfico quedan fuera del control de la aplicación.

## 13. Plan de pruebas

La matriz caso a caso se encuentra en [anexos/pruebas/matriz-casos.md](../../anexos/pruebas/matriz-casos.md). Incluye entradas vacías y predecibles, secuencias, repetición, caracteres especiales, generación segura, configuración inválida, independencia del mejorador y respuestas HIBP positivas, negativas y erróneas. La prueba de UI comprueba el estado de carga/error del servicio y la ausencia de escrituras en almacenamiento web.

## 14. Resultados verificables

En la ejecución documentada el 10 de noviembre de 2026, `npm run test:coverage` aprobó 31 pruebas en 6 archivos: 98.82% statements, 98.33% branches, 100% functions y 98.71% lines en servicios. `npm run lint` terminó sin hallazgos. `npm run build` completó correctamente y produjo un JS inicial de 243.86 kB minificado (76.11 kB gzip). Vite emitió una advertencia por el chunk español de 839.20 kB, que se carga de forma diferida. `npm audit` y la ejecución de servidor de desarrollo se registran en [resultados de validación](../../anexos/pruebas/resultados.md) después de su ejecución final.

## 15. Criterios de calidad

La matriz con descripción, indicador, método, resultado y estado se encuentra en [docs/criterios-calidad.md](../criterios-calidad.md). Compatibilidad entre navegadores, contraste medido y lector de pantalla permanecen pendientes; no se marcan como aprobados sin evidencia.

## 16. Conclusiones

PassGuard demuestra una arquitectura cliente que mantiene en el navegador el análisis, la generación y la comparación. El uso de Web Crypto y la búsqueda de rango limita la exposición intencional de datos; las pruebas automatizadas respaldan el comportamiento técnico comprobado. La puntuación heurística y la respuesta de HIBP tienen alcances limitados, por lo que la aplicación se presenta como recurso educativo y no como servicio de autenticación o garantía de seguridad. El equipo debe revisar la demostración, completar metadatos institucionales y adjuntar capturas reales antes de la entrega.

## 17. Referencias bibliográficas

La lista en formato bibliográfico y las referencias técnicas están en [anexos/referencias.md](../../anexos/referencias.md). Las fuentes estadísticas y normativas se enlazan junto a sus afirmaciones para conservar contexto y metodología.

## 18. Anexos

- [Matriz de casos de prueba](../../anexos/pruebas/matriz-casos.md).
- [Resultados de ejecución](../../anexos/pruebas/resultados.md).
- [Registro de revisión de seguridad](../../anexos/pruebas/revision-seguridad.md).
- [Guía para capturas reales](../../anexos/evidencias/guia-capturas.md).

## 19. Evidencias pendientes del equipo

Las pruebas automatizadas y la compilación tienen resultados reproducibles en el repositorio; no se adjuntan imágenes fabricadas. El equipo debe capturar la aplicación ejecutándose en su navegador y conservar las imágenes sin incluir contraseñas reales. La guía enumera pantallas y condiciones para esas evidencias.
