# Marco teórico

## Contraseñas y patrones de adivinación

Una contraseña es un secreto que la persona conoce y presenta para autenticarse. Un ataque de diccionario prueba candidatos frecuentes y variantes; la fuerza bruta explora sistemáticamente posibilidades; ataques híbridos añaden reglas a palabras o patrones. Secuencias, repeticiones, fechas, nombres y sustituciones conocidas pueden hacer una cadena aparentemente compleja más predecible. La reutilización expone otras cuentas a credential stuffing tras una filtración.

La longitud aporta posibilidades si los caracteres se generan al azar, pero la forma de elegirlos también importa. NIST SP 800-63B-4 requiere al menos 15 caracteres para contraseñas usadas como único factor en un verificador, permite longitudes máximas de al menos 64 y prohíbe requisitos de composición obligatorios. También requiere comparar nuevas contraseñas con una lista de valores comunes, esperados o comprometidos. Son requisitos para verificadores de autenticación; PassGuard es una herramienta didáctica, no ese tipo de sistema ([NIST, sección de autenticadores](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/)).

## Combinaciones y entropía

El espacio teórico para cadenas de longitud `L` sobre un alfabeto de `C` caracteres es `Ω = C^L`. La fórmula solicitada suele expresarse también como `N = C^L`, donde `N` designa el total de combinaciones. Para elecciones independientes y uniformes, la entropía ideal es `H = log₂(Ω) = L · log₂(C)` bits. El supuesto de uniformidad se aproxima en el generador de PassGuard mediante Web Crypto API y rechazo de bytes sesgados. No es válido atribuir esa misma entropía a una contraseña humana sin modelar sus elecciones.

La estimación de zxcvbn-ts combina patrones y diccionarios para aproximar la facilidad de adivinación. Es una heurística, no una medición exacta ni una garantía. No cubre ataques como phishing, keylogging, robo del dispositivo o reutilización en otros servicios.

## Cifrado y funciones hash

El cifrado es reversible si se dispone de la clave adecuada. En cifrado simétrico se usa una clave compartida para cifrar/descifrar; AES es un estándar de cifrado simétrico de bloque. En cifrado asimétrico se emplea un par de claves pública/privada. PassGuard no cifra ni almacena las entradas.

Un hash produce un resumen de longitud fija y no está diseñado para revertirlo. PassGuard calcula SHA-1 únicamente para el protocolo de consulta de rango de Have I Been Pwned: envía los cinco primeros caracteres del hash y compara la parte restante localmente. No lo usa para almacenar, autenticar ni proteger credenciales. OWASP recomienda para almacenamiento de verificadores una función deliberadamente costosa y adaptativa, como Argon2id, con una sal única; PassGuard no implementa dicho almacenamiento ([OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [RFC 9106](https://www.rfc-editor.org/rfc/rfc9106)).

## Aleatoriedad criptográfica

Web Crypto API provee `crypto.getRandomValues()` para bytes aleatorios criptográficamente adecuados en el contexto del navegador. El servicio generador transforma bytes en índices del alfabeto mediante rechazo de la fracción de valores que no completa un múltiplo exacto. Así se evita el sesgo que tendría aplicar módulo a todo el rango de byte. Esta propiedad depende del navegador y del equipo donde corre la aplicación.

## Autenticación multifactor, llaves y passkeys

Los factores habituales corresponden a algo que se sabe (por ejemplo, contraseña o PIN), algo que se posee (teléfono o llave física) y algo que se es (rasgo biométrico medido por un autenticador). MFA requiere combinar categorías distintas. Una llave de seguridad física puede demostrar posesión mediante criptografía y un canal vinculado al origen. FIDO2/WebAuthn y passkeys usan un par de claves en lugar de enviar una contraseña compartida, y ofrecen resistencia al phishing por su vínculo con el sitio. Se documentan como referencia; PassGuard no implementa login, MFA, llaves físicas ni passkeys ([OWASP MFA](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html), [FIDO Alliance](https://fidoalliance.org/passkeys/)).

## Datos de contraseñas vulnerables publicados en 2025 y 2026

La lista Top 200 de NordPass para 2025 indica que `123456` se ubicó primero. Su metodología, declarada con NordStellar e investigadores independientes, analiza filtraciones públicas recientes y repositorios de la dark web de septiembre de 2024 a septiembre de 2025, organiza los resultados por país en 44 países y declara no haber comprado ni adquirido datos personales. Es un análisis estadístico de material expuesto, no muestra aleatoria de todas las personas ni todas las contraseñas ([NordPass, metodología 2025](https://nordpass.com/most-common-passwords-list/)).

Verizon señala que credenciales comprometidas fueron el vector inicial en 22% de las brechas revisadas en su 2025 DBIR; un subanálisis de infecciones por infostealer encontró una mediana de 49% de contraseñas distintas entre servicios por usuario. En 2026, el DBIR analiza `n=7.345` cuentas escaneadas y reporta mediana de 4% con contraseña comprometida, además de que en esa muestra los usuarios fueron más de cuatro veces más propensos a usar una contraseña comprometida que una débil. Es importante conservar métricas, muestras y contexto: no son prevalencia universal ([Verizon 2025](https://www.verizon.com/business/resources/articles/credential-stuffing-attacks-2025-dbir-research/); [Verizon 2026 DBIR](https://www.verizon.com/business/resources/T343/reports/2026-dbir-data-breach-investigations-report.pdf)).

## Implementación real frente a referencias conceptuales

| Mecanismo | En PassGuard | Solo referencia conceptual |
|---|---|---|
| Web Crypto `getRandomValues` | Sí, generador | — |
| SHA-1 | Sí, solo consulta por rango HIBP | — |
| AES | No | Ejemplo de cifrado simétrico |
| Cifrado asimétrico | No | Concepto para intercambio/autenticación criptográfica |
| Argon2id | No | Referencia de hash de contraseñas con almacenamiento |
| MFA / llaves FIDO2 / passkeys | No | Conceptos para autenticación moderna |
| Backend/base de datos | No | Fuera del alcance para minimizar tratamiento de credenciales |

Bibliografía enlazada completa: [anexos/referencias.md](../anexos/referencias.md).
