# Guion de sustentación — PassGuard (5 minutos)

**Distribución para exposición:** organización oral sugerida; no representa ni asigna autoría del código. Utilizar únicamente entradas sintéticas. Si se consulta HIBP en vivo, explicar antes que se envía el prefijo de cinco caracteres del SHA-1.

## Kevin Santiago Cuesta Hernandez — 1 min 35 s

**0:00–0:25 — Presentación**<br>
“Buenos días. Somos Kevin Santiago Cuesta Hernandez, Dayana Sofia Mendes Perafan y Andrea Catalina Cortes. Presentamos PassGuard, una aplicación académica para aprender sobre evaluación, generación y exposición de contraseñas. No es un gestor de credenciales ni un sistema de autenticación.”

**0:25–0:55 — Problema y objetivos**<br>
“Las secuencias y contraseñas reutilizadas pueden ser fáciles de adivinar o aparecer en filtraciones. Las reglas de mayúsculas y símbolos por sí solas no expresan qué tan predecible es una clave. Nuestro objetivo es mostrar patrones, generar alternativas aleatorias y permitir una consulta de exposición sin enviar la contraseña completa.”

**0:55–1:35 — Tecnología y arquitectura**<br>
“PassGuard es una SPA hecha con React, TypeScript y Vite. No tiene backend ni base de datos: la evaluación, generación y mejora ocurren en el navegador. El servicio externo HIBP solo se consulta al pulsar un botón. zxcvbn-ts evalúa patrones; Web Crypto API genera bytes aleatorios. El flujo y los límites están documentados en el informe.”

## Dayana Sofia Mendes Perafan — 1 min 45 s

**1:35–2:05 — Evaluador**<br>
“En el evaluador ingresaré el texto sintético `abc123`. PassGuard reconoce patrones conocidos, informa una puntuación orientativa y presenta sugerencias. No almacena ni envía esta entrada para el análisis; tampoco debemos interpretar la puntuación como una garantía.”

**2:05–2:45 — Generador**<br>
“En el generador mantendré la longitud de 16 caracteres y las clases configuradas. Al pulsar generar, la aplicación usa `crypto.getRandomValues`. Para evitar que el módulo favorezca ciertos caracteres, descarta valores de la cola incompleta. El número mostrado es el espacio teórico del generador con selección uniforme.”

**2:45–3:20 — Mejorador**<br>
“Para mejorar, PassGuard evalúa la entrada y produce una alternativa nueva e independiente; no le agrega símbolos o números a la contraseña original. Compara las puntuaciones y deja que la persona decida si copia el valor.”

**Plan alternativo de demo:** si el navegador no permite portapapeles, explicar el mensaje de permiso y mostrar la alternativa sin copiar. Si falla la carga del evaluador, continuar con las pruebas automatizadas y explicar la importación diferida.

## Andrea Catalina Cortes — 1 min 40 s

**3:20–3:55 — Consulta de filtraciones**<br>
“La consulta no se inicia al escribir; requiere el botón. El navegador calcula SHA-1, envía los primeros cinco caracteres a Pwned Passwords y busca el sufijo dentro de la respuesta. Si coincide, la interfaz informa el conteo. Si no aparece, advierte que eso no prueba que nunca se haya filtrado.”

**3:55–4:25 — Privacidad y estándares**<br>
“El proyecto no guarda contraseñas. SHA-1 no se usa para almacenamiento: solo para ajustarse al protocolo de rango HIBP. Argon2id, AES, MFA, FIDO2 y passkeys se explican como contexto académico; no están implementados. NIST y OWASP ayudan a explicar prácticas actuales, pero PassGuard no reemplaza un verificador.”

**4:25–5:00 — Resultados y conclusión**<br>
“La suite final aprobó 36 pruebas en seis archivos, con 98,71% de cobertura de líneas en los servicios; el build compila y npm audit reportó cero vulnerabilidades. La advertencia pendiente es el diccionario de español de 839,20 kB, aunque se carga bajo demanda. No completamos una auditoría visual mult navegador: dejamos una matriz manual para capturas, contraste y lectores de pantalla. Concluimos que PassGuard es una demostración didáctica de minimización de datos y estimación local, con límites claros.”

## Demostración sintética y alternativa sin conexión

1. Usar `abc123` para mostrar un patrón débil. No emplear una contraseña personal o reutilizada.
2. Generar una clave nueva de 16 caracteres y mostrar el cálculo teórico.
3. Escribir una frase sintética desechable y generar la alternativa; mostrar la comparación.
4. Consultar HIBP solo después de explicar la petición. No se requiere realizar una consulta real durante la exposición.
5. Si falla Internet, mostrar el estado de error y la prueba UI de respuesta positiva/negativa simulada. Declarar explícitamente que el mock no es una respuesta real del servicio.
6. Mostrar la salida de `npm run test` y la matriz de cobertura/resultados.

## Preguntas probables y respuestas

**¿Qué tipo de cifrado utiliza?** PassGuard no cifra contraseñas ni almacena información. Usa Web Crypto para generar aleatoriedad y SHA-1 únicamente para la consulta de rango HIBP.

**¿Por qué se utiliza SHA-1?** Es el formato de consulta soportado por Pwned Passwords. El navegador calcula el hash completo localmente y solo envía su prefijo de cinco caracteres; SHA-1 no se utiliza como protección de almacenamiento.

**¿Por qué Argon2id no está implementado?** No almacenamos ni verificamos cuentas. Argon2id sirve como referencia para proteger verificadores de contraseñas en un sistema que sí necesite guardarlos; añadirlo aquí no tendría una función real.

**¿Cuántas combinaciones puede generar?** Para alfabeto de tamaño `C` y longitud `L`, el espacio uniforme ideal es `Ω = C^L`, con entropía `H = L log₂(C)`. El valor depende de los controles elegidos y no describe las elecciones humanas.

**¿Cómo se mide la fortaleza?** zxcvbn-ts reconoce palabras, repeticiones, secuencias y patrones para estimar dificultad de adivinación. No es una garantía ni una auditoría integral.

**¿Qué estándares utiliza?** Se toman NIST SP 800-63B-4 y guías OWASP como referencias para explicar longitud, listas de bloqueo, hashing y MFA. No afirmamos certificación NIST u OWASP.

**¿Cómo protege las contraseñas?** Evaluación y generación locales, sin almacenamiento web; consulta externa explícita con prefijo de hash. Un navegador/dispositivo comprometido y metadatos de red quedan fuera del alcance.

**¿Qué ocurre si la contraseña fue filtrada?** La UI informa que se encontró y muestra el conteo que devolvió la API; la persona debe cambiar esa clave en el servicio donde la use y no reutilizarla. PassGuard no cambia credenciales automáticamente.

**¿Qué diferencia existe entre hashing y cifrado?** El cifrado es reversible con una clave; el hashing es una transformación unidireccional. Para almacenamiento de contraseñas se usa hashing adaptativo como Argon2id, no cifrado reversible.

**¿Qué son MFA, FIDO2 y passkeys?** MFA combina factores distintos; FIDO2/WebAuthn habilita autenticación con claves vinculadas al origen; passkeys son credenciales de clave pública. Son conceptos documentados, no funciones incluidas.

**¿Qué pruebas realizaron?** 36 pruebas Vitest con respuestas HIBP simuladas; 98,71% de cobertura de líneas en servicios; lint, build y npm audit. La matriz manual de navegadores/contraste está pendiente.

**¿Qué limitaciones tiene el proyecto?** Puntaje heurístico, servicio HIBP externo, diccionario grande de español, dependencia de Web Crypto/clipboard del navegador y ausencia de auditoría WCAG, pruebas mult navegador o estudio de usuarios.
