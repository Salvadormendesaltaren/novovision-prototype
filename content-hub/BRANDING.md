# Branding Quick Swap

Este proyecto ya separa la marca visual de la lógica.

## Qué cambiar para replicar el hub con otro look and feel

1. Edita `src/styles/brand.css`
- Variables de color (`:root`)
- Tipografías (`@font-face`)

2. Sustituye assets de marca
- Logos e isotipos en `public/`

3. Sustituye contenido
- Archivos en `src/data/`

## Qué NO tocar

- Componentes en `src/components/`
- Páginas en `src/pages/` (salvo textos hardcodeados puntuales)
- Lógica de navegación/scroll/estructura

## Verificación rápida

```bash
npm install
npm run dev
npm run build
```

