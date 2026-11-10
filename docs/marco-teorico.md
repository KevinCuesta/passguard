# Marco teórico

## Contraseñas y estimación

Las contraseñas largas y únicas reducen la reutilización y el éxito de la adivinación. NIST SP 800-63B-4 establece 15 caracteres mínimos para una contraseña de factor único y desaconseja imponer reglas de composición de tipos de caracteres; también requiere cotejar contraseñas nuevas contra una lista de valores comunes, esperados o comprometidos. Estas disposiciones aplican a verificadores de autenticación; PassGuard es una herramienta educativa y no autentica usuarios. zxcvbn-ts reconoce palabras, secuencias, repeticiones y patrones de teclado para dar una estimación, no una garantía.

## Verificación de exposición

Have I Been Pwned Pwned Passwords ofrece una búsqueda por rangos con k-anonymity. El cliente calcula un hash SHA-1, transmite su prefijo de cinco caracteres y compara localmente el sufijo con la respuesta. PassGuard inicia la consulta solo a solicitud del usuario, activa el relleno de respuesta y nunca envía la contraseña ni el hash completo. SHA-1 se usa aquí únicamente para compatibilidad con ese protocolo; no es apropiado para almacenar verificadores de contraseña.

## Cifrado, hashing y referencias conceptuales

El cifrado es reversible con una clave y sirve para confidencialidad de datos recuperables. AES es un cifrador simétrico estandarizado; una aplicación puede usarlo para datos que deban recuperarse, no para guardar directamente contraseñas de autenticación. El hashing es una operación unidireccional. Para almacenar verificadores de contraseñas, OWASP recomienda algoritmos adaptativos y lentos, como Argon2id, con una sal única; PassGuard no implementa almacenamiento ni hashing de contraseñas. Argon2id es una referencia conceptual, no una dependencia de la aplicación.

## MFA, FIDO2 y passkeys

La autenticación multifactor (MFA) combina factores distintos y puede reducir el impacto de una contraseña robada; no elimina todos los riesgos. FIDO2/WebAuthn y las passkeys usan pares de claves criptográficas para autenticación resistente al phishing. Se presentan como tecnologías relacionadas, no se implementan en esta versión.

## Estadísticas publicadas en 2025 y 2026

- El análisis adicional de Verizon 2025 DBIR informa que las credenciales comprometidas fueron vector de acceso inicial en 22% de las brechas revisadas; en el análisis de datos de infección por infostealers, la mediana de contraseñas de cada usuario que eran distintas entre servicios fue 49%. Son métricas de muestras diferentes del estudio, no una estimación de todas las personas en internet.
- Verizon 2026 DBIR reporta, en una muestra de 7.345 cuentas escaneadas en organizaciones, una mediana de 4% de cuentas con contraseñas comprometidas. El informe también dice que, en su conjunto de datos, los usuarios tenían más de cuatro veces más probabilidad de usar una contraseña ya comprometida que una contraseña débil. Estas cifras describen los datos observados por Verizon y no prevalencia poblacional universal.

Los años de publicación no son el periodo exacto de observación de todos los datos. Antes de presentar estadísticas en la interfaz, deben conservarse el año, la población, el tamaño de muestra disponible y la definición de cada métrica.

## Referencias

Ver [anexos/referencias.md](../anexos/referencias.md) para la bibliografía y los enlaces a normas, documentación técnica y estudios citados.
