# Sommer · Guía de instalación Linux

Guía web interactiva en español para instalar CachyOS con Hyprland y el shell
II-P3DROVFX, basado en los dotfiles de end4 / illogical-impulse.

## Ver la guía

Abre [`index.html`](./index.html) en un navegador. No necesita dependencias ni un
servidor de aplicación.

## Publicar en GitHub Pages

El repositorio incluye un flujo de GitHub Actions que publica automáticamente
los archivos en GitHub Pages al hacer `push` a la rama `main`.

1. En GitHub abre **Settings > Pages**.
2. En **Build and deployment > Source**, selecciona **GitHub Actions**.
3. Envía los cambios a la rama `main`.
4. Espera a que termine el workflow **Deploy GitHub Pages**.

La URL pública aparecerá en **Settings > Pages** y también en el entorno
`github-pages` de la acción. El sitio puede ser abierto simultáneamente por
muchos usuarios sin autenticación ni servidor adicional.

## Progreso de los visitantes

Cada navegador guarda su propio progreso mediante `localStorage`. El avance no
se comparte entre usuarios ni entre navegadores; no se envían datos personales
al repositorio ni a GitHub.

El progreso se guarda localmente en el navegador. Los instaladores, requisitos y
enlaces de proyectos externos se documentan en la propia guía y pueden cambiar
con el tiempo; consulta siempre sus fuentes oficiales antes de instalar.
