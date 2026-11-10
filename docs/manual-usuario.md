# Manual de usuario

1. Abre PassGuard en el navegador.
2. En **Evalúa una contraseña**, ingresa una contraseña de prueba. El análisis se actualiza localmente; usa el botón del ojo para mostrar u ocultar la entrada.
3. Lee el nivel, la longitud, los patrones y las sugerencias. La puntuación es orientativa.
4. Pulsa **Crear alternativa segura** para generar una nueva contraseña aleatoria. Compara las puntuaciones y copia la alternativa si deseas conservarla. Al cambiar el texto original, la comparación anterior se borra.
5. Para buscar una posible exposición, pulsa **Comprobar con Pwned Passwords**. Esta acción requiere conexión. PassGuard calcula SHA-1 localmente, envía solo cinco caracteres del hash y compara el resto en el navegador.
6. Si la consulta dice que no aparece, recuerda que eso no garantiza que sea segura ni que nunca haya sido filtrada. Si la red falla, inténtalo más tarde; el evaluador y generador siguen disponibles.
7. En **Generación**, ajusta longitud y conjuntos, pulsa **Generar contraseña** y usa **Copiar** explícitamente. Trata el portapapeles como información sensible.

PassGuard no persiste contraseñas. Al cerrar o recargar la pestaña, el estado en memoria desaparece.
