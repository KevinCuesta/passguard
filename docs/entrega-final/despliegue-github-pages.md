# Preparación de GitHub Pages

El proyecto es estático (Vite/React) y puede servirse en GitHub Pages sin backend ni credenciales de publicación. El workflow `.github/workflows/pages.yml` compila en GitHub Actions y publica el artefacto `dist` cuando se actualiza `main`, o cuando se inicia manualmente desde la pestaña **Actions**. El deploy utiliza las acciones oficiales de Pages y los permisos mínimos `pages: write` e `id-token: write` en el job de despliegue. [Documentación de workflows personalizados de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Activación inicial por el propietario del repositorio

1. Publicar los commits de `main` desde el equipo del proyecto.
2. En GitHub, abrir **Settings → Pages → Build and deployment**.
3. Elegir **Source: GitHub Actions** y guardar.
4. Abrir la pestaña **Actions** y revisar el workflow `Deploy PassGuard to GitHub Pages` disparado por el push. El job `build` debe finalizar y luego `deploy` debe aparecer como completado.
5. Abrir la URL que el job de despliegue muestra como `page_url`. La URL prevista para este repositorio es <https://kevincuesta.github.io/passguard/>.
6. Comprobar la carga de CSS y JS, y probar evaluación/generación. La consulta HIBP requerirá internet y se iniciará solo con el botón.

**Estado al preparar este documento:** pendiente del push, de seleccionar GitHub Actions como source en Settings y de una ejecución exitosa del workflow. La URL es prevista; no se afirma que esté publicada o accesible todavía.

La configuración local se comprobó construyendo con `GITHUB_PAGES=true` y verificando que `dist/index.html` apunte a `/passguard/assets/`; luego se compiló sin la variable y se confirmó la ruta local `/assets/`. No se realizó una publicación remota.

## Configuración de rutas

Vite usa `/` localmente y activa `/passguard/` cuando `GITHUB_PAGES=true`. El workflow define esa variable solo en el paso de build estático. Por eso `npm run dev` conserva su ruta habitual `http://localhost:5173/`. Para reproducir el artefacto de Pages localmente en PowerShell:

```powershell
$env:GITHUB_PAGES = 'true'
npm run build
Remove-Item Env:GITHUB_PAGES
npm run preview -- --host 127.0.0.1
```

El preview debe servirse bajo `/passguard/` para probar las rutas de producción; `npm run dev` usa `/` y no requiere esta variable.

## Seguridad y operación

- No se guardan secretos ni tokens en el código. El workflow usa `GITHUB_TOKEN` administrado por GitHub con permisos limitados al despliegue.
- No se instala ni incorpora backend. La aplicación solo consulta HIBP cuando una persona lo solicita.
- No desplegar mediante una rama `gh-pages` manual; el artefacto se publica con el environment `github-pages`.
- Para diagnosticar un 404, confirmar la configuración **Source: GitHub Actions**, revisar que el workflow de `main` pasó, que el build generó assets bajo la ruta base `/passguard/` y abrir el `page_url` del job.
- Para guías vigentes sobre permisos, artifact y deploy consultar [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
