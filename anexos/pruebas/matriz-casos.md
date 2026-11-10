# Matriz de casos de prueba

Los casos se ejecutan con Vitest. Todas las entradas son sintéticas y la red de Have I Been Pwned se reemplaza por mocks.

| ID | Módulo | Caso / entrada | Resultado esperado | Resultado observado |
|---|---|---|---|---|
| EV-01 | Evaluador | Entrada vacía | Estado “Sin evaluar”, longitud cero | Aprobado |
| EV-02 | Evaluador | Cadena de un carácter | Puntuación débil | Aprobado |
| EV-03 | Evaluador | Palabra común sintética (`pass` + `word`) | Detecta baja fortaleza | Aprobado |
| EV-04 | Evaluador | 16 caracteres repetidos | Identifica patrón `repeat` y baja puntuación | Aprobado |
| EV-05 | Evaluador | Secuencia `abcdef123456` y símbolos Unicode/especiales | Detecta secuencia; maneja caracteres especiales | Aprobado |
| EV-06 | Evaluador | Contraseña producida aleatoriamente de 24 caracteres | Puntuación al menos 3 | Aprobado |
| EV-07 | Evaluador | Misma entrada dos veces | Resultado determinista | Aprobado |
| GE-01 | Generador | Configuración predeterminada de 16 | Longitud solicitada | Aprobado |
| GE-02 | Generador | Longitud 19 | Longitud exacta | Aprobado |
| GE-03 | Generador | Solo dígitos seleccionados | Todos los caracteres son dígitos | Aprobado |
| GE-04 | Generador | Generar sin `Math.random` | No llamar `Math.random()` | Aprobado |
| GE-05 | Generador | Longitud 7 o alfabeto vacío | Rechazar configuración | Aprobado |
| GE-06 | Generador | `10^4` combinaciones y opciones inválidas | Cálculo BigInt y errores de dominio | Aprobado |
| GE-07 | Generador | Alfabeto de 24 símbolos y byte 253 en cola incompleta | Rechazar byte sesgado y volver a muestrear | Aprobado |
| IM-01 | Mejorador | Vacío y espacios | Error controlado | Aprobado |
| IM-02 | Mejorador | Entrada sintética | Alternativa distinta, evaluaciones antes/después y score requerido | Aprobado |
| IM-03 | Mejorador | Entrada sintética | La alternativa no es idéntica a la entrada original | Aprobado |
| IM-04 | Mejorador | Candidatos débiles repetidos | Termina tras 8 intentos | Aprobado |
| IM-05 | Mejorador | Generador devuelve exactamente entrada | No la acepta; termina tras 8 intentos | Aprobado |
| BR-01 | HIBP | Coincidencia simulada con sufijo y conteo positivo | Encontrada y conteo local | Aprobado |
| BR-02 | HIBP | Sufijo diferente | No encontrada | Aprobado |
| BR-03 | HIBP | Cuerpo vacío y fila de padding con conteo cero | No encontrada | Aprobado |
| BR-04 | HIBP | Entrada vacía | Rechazo sin petición | Aprobado |
| BR-05 | HIBP | HTTP 503 | Error genérico controlado | Aprobado |
| BR-06 | HIBP | Fetch rechaza por desconexión | Mensaje de conexión controlado | Aprobado |
| BR-07 | HIBP | `crypto.subtle.digest` falla | Error genérico y sin petición | Aprobado |
| BR-08 | HIBP | Falla lectura del cuerpo | Error genérico controlado | Aprobado |
| BR-09 | HIBP | Web Crypto no disponible | Error y sin petición | Aprobado |
| UI-01 | Interfaz | Escribir valor y no pulsar el verificador | No inicia consulta; click muestra carga y resultado | Aprobado |
| UI-02 | Interfaz | Error simulado de HIBP | Anuncia alerta accesible | Aprobado |
| UI-03 | Privacidad UI | Escribir valor sintético | No llama a `localStorage.setItem` ni `sessionStorage.setItem` | Aprobado |
| UI-04 | HIBP UI | Respuesta simulada sin coincidencia | Mensaje de no coincidencia y advertencia visible | Aprobado |
| UI-05 | Formulario | Activar botón mostrar/ocultar | Cambia tipo del campo y nombre accesible | Aprobado |
| UI-06 | Teclado | Pulsar Tab al iniciar | Foco en enlace para saltar al contenido | Aprobado |
| UI-07 | Generador y portapapeles | Generar longitud predeterminada y pulsar copiar | 16 caracteres; no copia hasta acción explícita; resultado de copia anunciado | Aprobado |
| UI-08 | Portapapeles | Denegar permiso de copia en mock | Mensaje comprensible y sin fallo de UI | Aprobado |

**Resumen actualizado:** 36 casos aprobados, 0 fallidos, en 6 archivos de prueba. La cobertura se refiere a servicios TypeScript, no al porcentaje de componentes UI cubiertos. La suite no prueba distribución estadística con muestreo masivo: el caso GE-07 comprueba directamente que la cola incompleta se rechaza.

La ausencia de reutilización de fragmentos se sostiene por la inspección de implementación del mejorador, que llama a un generador independiente con opciones fijas; la prueba automatizada por sí sola verifica que no se acepta la contraseña original completa, no una búsqueda exhaustiva de subcadenas.
