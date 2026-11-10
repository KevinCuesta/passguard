# Marco teórico — borrador de Fase 1

PassGuard utiliza zxcvbn-ts como estimador heurístico de contraseñas. El estimador reconoce palabras frecuentes, secuencias, repeticiones y patrones de teclado; su puntuación orienta al usuario, pero no constituye una prueba ni una garantía de seguridad.

La guía NIST SP 800-63B-4 y las recomendaciones de OWASP serán el marco para las etapas siguientes. El criterio de diseño es promover longitud y unicidad y evitar requisitos arbitrarios de composición como único indicador. La expansión del marco, incluyendo hashing, cifrado, MFA y passkeys, queda pendiente para Fase 3.

Fuentes iniciales: NIST SP 800-63B-4 (<https://pages.nist.gov/800-63-4/sp800-63b.html>), OWASP Authentication Cheat Sheet (<https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html>) y zxcvbn-ts (<https://github.com/zxcvbn-ts/zxcvbn>).
