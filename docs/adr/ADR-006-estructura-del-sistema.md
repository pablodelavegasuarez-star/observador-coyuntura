# ADR-006 · Estructura del sistema

- **Estado:** aceptada. Sustituye a la estructura provisional del [ADR-002](ADR-002-framework-api.md). La consecuencia sobre integración continua queda modificada por el [ADR-011](ADR-011-frontend-npm-node-ci.md): la CI ejecuta siempre las comprobaciones del backend y del frontend.
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2)
- **Revisar:** si el volumen de datos o el número de personas que trabajan en el proyecto crece lo bastante como para justificar desplegar piezas por separado.

## Contexto

El observador tiene cinco partes: ingesta de datos (Eurostat, INE y Banco de España), almacenamiento, cálculos (transformaciones, comparación histórica y semáforo), API y frontend. El [ADR-002](ADR-002-framework-api.md) dejó como provisional la estructura `backend/src/observatorio/api/` y `backend/tests/`, a la espera de este ADR.

Hay que decidir tres cosas:

1. Cuántas piezas desplegables tiene el sistema.
2. Cuántos repositorios hay.
3. Cómo se organizan las capas del backend y qué puede depender de qué.

Lo construye una persona, con un volumen de datos pequeño (series mensuales y trimestrales desde 2000; ver la [especificación del cuadro](../datos/especificacion-cuadro.md)).

## Opciones consideradas

**Piezas desplegables**

| Opción | Descripción |
| --- | --- |
| A | **Monolito modular**: un único backend desplegable con la ingesta, la librería de cálculos y la API como módulos, y el frontend aparte |
| B | **Microservicios**: ingesta, cálculos y API como servicios separados que se comunican por red |

**Repositorios**

| Opción | Descripción |
| --- | --- |
| C | **Monorepo**: `backend/` y `frontend/` en este repositorio |
| D | **Dos repositorios**: uno para el backend y otro para el frontend |

## Criterios

| Criterio | A · Monolito modular | B · Microservicios |
| --- | --- | --- |
| Complejidad de redes | Las capas se llaman como funciones dentro del mismo proceso | Cada llamada entre servicios pasa por la red |
| Fallos parciales | El backend funciona o no funciona entero | Un servicio puede caer mientras los demás siguen, y hay que gestionarlo |
| Despliegues | Uno | Varios, coordinados cuando cambia una interfaz entre servicios |
| Ajuste a una persona y a este volumen | Alto | La complejidad no compensa |

| Criterio | C · Monorepo | D · Dos repositorios |
| --- | --- | --- |
| Cambio del contrato OpenAPI entre API y frontend | Un solo PR con los dos lados | Dos PR coordinados |
| Integración continua | Tiene que distinguir qué parte cambia | Cada repositorio tiene la suya |

## Decisión

**Opción A, monolito modular**, y **opción C, monorepo**.

### Capas del backend

Dentro del paquete `observatorio`:

| Módulo | Responsabilidad |
| --- | --- |
| `ingestion/` | Ingesta de datos: un módulo por fuente |
| `storage/` | Acceso a la base de datos |
| `analytics/` | Librería pura: recibe series y devuelve resultados |
| `api/` | API (ya existe) |

### Regla de dependencias

- `analytics` no importa nada de `ingestion`, `storage` ni `api`.
- `api` depende de `analytics` y de `storage`.
- `ingestion` depende de `storage`.
- El frontend solo habla con la API, a través de su contrato OpenAPI.

Motivos:

1. **Microservicios descartados:** la complejidad de redes, los fallos parciales y los despliegues coordinados no compensan para una persona y este volumen de datos.
2. **Dos repositorios descartados:** un cambio de contrato entre la API y el frontend exigiría dos PR coordinados.
3. La regla de dependencias mantiene la capa de cálculos pura, como ya exigían los principios de arquitectura de `CLAUDE.md`: se prueba sola, sin base de datos ni API.

## Consecuencias

- **Sustituye** a la estructura provisional del [ADR-002](ADR-002-framework-api.md).
- **Integración continua:** con el monorepo, la CI debe ejecutar solo las comprobaciones de la parte que cambia. Se resuelve al montar la CI del frontend.
- **Pendiente de decisión de Pablo:** cómo comprobar automáticamente la regla de dependencias en la CI. Este ADR no elige herramienta.
- **Estado actual del repositorio:** hoy solo existen `backend/` y el módulo `api/`. Las carpetas `frontend/`, `ingestion/`, `storage/` y `analytics/` se crearán cuando se construya cada parte; este ADR no las crea.
