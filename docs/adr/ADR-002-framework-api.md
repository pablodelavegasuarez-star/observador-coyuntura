# ADR-002 · Framework de la API

- **Estado:** provisional, revisar en la semana 5
- **Fecha:** 2026-11-18
- **Decide:** Pablo
- **Revisar:** en la semana 5, cuando la API tenga endpoints reales y se prepare la migración a Cloud Run (ver [ADR-001](ADR-001-despliegue.md)).

## Contexto

La API es la única puerta de entrada a los cálculos del observatorio: el frontend no calcula nada y pide los resultados a la API a través de su contrato OpenAPI. En la semana 1 la API solo expone `GET /health`, pero el framework que se elija ahora condiciona cómo se describirán y validarán todos los endpoints futuros (indicadores, escenarios y simulador).

Según el [ADR-001](ADR-001-despliegue.md), la API no guarda estado propio y toda su configuración va en variables de entorno, así que el framework no necesita sesiones, plantillas ni base de datos integrada.

## Opciones consideradas

| Opción | Descripción |
| --- | --- |
| A | **FastAPI** (sobre Starlette y Pydantic), servido con Uvicorn |
| B | **Flask**, con extensiones para validación y OpenAPI |
| C | **Biblioteca estándar** de Python (`http.server`), sin framework |

## Criterios

| Criterio | FastAPI | Flask | Biblioteca estándar |
| --- | --- | --- | --- |
| Contrato OpenAPI automático | Sí, se genera desde las anotaciones de tipo; incluye `/docs` interactivo | No de serie; requiere extensiones de terceros (p. ej. flask-smorest, apispec) | No; habría que escribirlo y mantenerlo a mano |
| Validación de entradas | Integrada mediante Pydantic y las anotaciones de tipo | No de serie; requiere extensiones o código propio | Todo a mano |
| Madurez | Alta y muy extendido, aunque más joven que Flask y con cambios de versión frecuentes | Muy alta; más de una década en producción | Máxima estabilidad, pero no está pensada para producción |
| Coste de cambiar | Moderado: la lógica de cálculo vive fuera de la API, así que solo se reescribiría la capa fina de endpoints | Similar | Bajo para entrar, alto para crecer: cada endpoint nuevo exige más código propio |

## Decisión

**Opción A: FastAPI**, servida con Uvicorn.

Motivos:
1. El contrato OpenAPI se genera solo a partir del código, de modo que el frontend y la API no pueden desalinearse sin que se note.
2. La validación de entradas sale de las mismas anotaciones de tipo que ya exige el proyecto: un único mecanismo para tipos, validación y documentación.
3. Las alternativas exigirían elegir y mantener varias piezas adicionales (Flask) o escribir a mano lo que FastAPI ya resuelve (biblioteca estándar).

## Consecuencias

- **Dependencias de producción:** `fastapi` y `uvicorn`, sin extras. FastAPI arrastra Starlette y Pydantic.
- **Aceptamos:** FastAPI publica versiones con frecuencia y aún no tiene versión 1.0, así que las actualizaciones pueden traer cambios incompatibles. El fichero `uv.lock` fija las versiones exactas y las actualizaciones se harán de forma deliberada.
- **Obligación de diseño:** la lógica de cálculo no importa nada de FastAPI. La API es una capa fina que llama a la capa de cálculos; eso mantiene bajo el coste de cambiar de framework.
- **Comprobación de tipos provisional:** se adopta **mypy en modo estricto** de forma provisional hasta el ADR de la semana 2 (mypy frente a pyright).
- **Decisión pendiente, estructura de carpetas:** la estructura `backend/src/observatorio/api/` y `backend/tests/` es provisional hasta el ADR de la semana 2, que fijará la estructura de carpetas y los nombres de las capas.
