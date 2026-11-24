# Observador de coyuntura

Observador de la coyuntura económica en España para seguir una posible recesión:

- **Indicadores adelantados y coincidentes** de fuentes oficiales: Eurostat, INE y Banco de España.
- **Comparación histórica** con las crisis de 2008, 2011-2013 y 2020.
- **Semáforo de señales** que resume lo que dicen los indicadores.
- **Panel personal** con usuario.

## Estado

En construcción. Es un proyecto de aprendizaje y todavía no tiene funcionalidades disponibles.

## API publicada

La API está desplegada en Render, en el plan gratuito (ver [ADR-001](docs/adr/ADR-001-despliegue.md)):

- Estado del servicio: <https://observatorio-pensiones-api.onrender.com/health>
- Documentación interactiva: <https://observatorio-pensiones-api.onrender.com/docs>

La URL conserva el nombre anterior del proyecto (ver [ADR-005](docs/adr/ADR-005-cambio-de-producto.md)).

> **Aviso:** en el plan gratuito, el servicio se duerme tras 15 minutos sin recibir visitas y tarda alrededor de un minuto en despertar. Si la primera carga tarda, espera y vuelve a cargar la página.

## Frontend publicado

El frontend está publicado como sitio estático en Render (ver [ADR-008](docs/adr/ADR-008-frontend.md)): <https://observador-coyuntura.onrender.com>

## Frontend en local

El frontend es un sitio estático en TypeScript con React y Vite ([ADR-008](docs/adr/ADR-008-frontend.md)). Necesita Node 26 y npm 11.10 o posterior ([ADR-011](docs/adr/ADR-011-frontend-npm-node-ci.md)). Desde la carpeta `frontend/`:

| Para qué | Comando |
| --- | --- |
| Instalar las dependencias | `npm ci` |
| Arrancar en local (<http://localhost:5173>) | `npm run dev` |
| Linter, formato y tipos | `npm run lint`, `npm run format:check` y `npm run typecheck` |
| Pruebas | `npm test` |
| Compilar el sitio (en `dist/`) | `npm run build` |
| Auditoría de vulnerabilidades | `npm audit --audit-level=low` |

## Aviso

Este proyecto tiene fines divulgativos y de aprendizaje. No es asesoramiento financiero, fiscal ni jurídico.

## Licencia

Distribuido bajo licencia MIT. Consulta el fichero [LICENSE](LICENSE).
