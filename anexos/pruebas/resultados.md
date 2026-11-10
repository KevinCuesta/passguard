# Resultados de validación

**Fecha de corte:** 10 de noviembre de 2026. **Entorno:** Windows, Node.js 24 del runtime disponible y npm. La versión de Node usada supera el requisito declarado de Node 20.

| Comando | Resultado observado |
|---|---|
| `npm install` | Correcto; dependencias al día, 159 paquetes auditados por npm; 0 vulnerabilidades reportadas. npm mostró un aviso de política de scripts pendientes de aprobación para `esbuild` (no impidió la instalación). |
| `npm run test:coverage` | 6 archivos aprobados; 31 pruebas aprobadas; 0 fallidas. Servicios: 98.82% statements, 98.33% branches, 100% functions, 98.71% lines. Umbrales configurados: 80%. |
| `npm run lint` | Correcto, sin hallazgos después de retirar una actualización redundante de estado en un efecto React. |
| `npm run build` | Correcto: TypeScript y Vite finalizaron. JS inicial: 243.86 kB minificado / 76.11 kB gzip. |
| Advertencia de build | Vite mantiene advertencia para el chunk `zxcvbn-spanish-dictionary` de 839.20 kB. Se descarga de forma diferida al necesitar evaluación; no se elevó el umbral de advertencia. |
| `npm audit` | 0 vulnerabilidades en la última auditoría completa tras `npm install`. No se ejecutó `npm audit fix`. |
| `npm run dev -- --host 127.0.0.1` | Vite quedó listo en `http://127.0.0.1:5174/` porque el puerto 5173 ya estaba ocupado. Se comprobó respuesta HTTP 200 y título `PassGuard — Seguridad de contraseñas`; el proceso iniciado para la verificación se cerró después. |

## Tamaño de bundle reportado por Vite

| Artefacto | Minificado | Gzip |
|---|---:|---:|
| `index` JS | 243.86 kB | 76.11 kB |
| `zxcvbn-engine` | 33.82 kB | 11.49 kB |
| Diccionario común | 427.68 kB | 221.80 kB |
| Diccionario español | 839.20 kB | 389.33 kB |
| CSS de entrada | 17.40 kB | 4.76 kB |

La advertencia se conserva como hallazgo. Aunque el bundle inicial se redujo con imports dinámicos y chunks separados, el primer análisis de una contraseña aún debe descargar los diccionarios necesarios.

## Interpretación

Son verificaciones de desarrollo reproducibles, no certificación, prueba de penetración ni auditoría externa. Las pruebas HIBP usan respuestas simuladas. La prueba HTTP confirma que el servidor Vite responde; no sustituye una prueba completa de interfaz en todos los navegadores. No se capturaron imágenes del navegador en esta ejecución.
