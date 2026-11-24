# ADR-010 · Comprobación de tipos en Python

- **Estado:** aceptada. Sustituye a la parte de tipos del [ADR-002](ADR-002-framework-api.md).
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2)
- **Revisar:** si aparece un problema concreto que mypy no resuelva y otro comprobador sí.

## Contexto

El [ADR-002](ADR-002-framework-api.md) adoptó **mypy en modo estricto** de forma provisional, a la espera de comparar mypy con pyright. Hoy mypy ya funciona en la integración continua: `strict = true` en `backend/pyproject.toml` y el paso `uv run mypy` del job `backend-checks` ([ADR-004](ADR-004-integracion-continua.md)).

El editor de Python de VS Code usa otro comprobador por debajo:

- «Pylance is the default language server for Python in VS Code» y «Pylance is based on Microsoft's Pyright static type checking tool» ([VS Code · Editing Python](https://code.visualstudio.com/docs/python/editing), consultada el 2026-11-24).
- El repositorio de Pylance lo confirma: «you can contribute to Pyright to make improvements to the core typing engine that powers the Pylance experience» ([pylance-release](https://github.com/microsoft/pylance-release), consultada el 2026-11-24).

## Opciones consideradas

| Opción | Descripción |
| --- | --- |
| A | **mypy en modo estricto**, en la integración continua (ya está) |
| B | **pyright** |

## Criterios

Si cambiar resuelve algún problema actual, y el coste del cambio.

## Decisión

**Opción A: mypy en modo estricto**, en la integración continua.

Motivo: pyright se descarta porque cambiar no resuelve ningún problema actual.

## Consecuencias

- **Aceptamos:** el editor de VS Code (Pylance, basado en pyright) puede discrepar de mypy en casos límite. **Manda la integración continua.**
- La documentación oficial de pyright reconoce estas diferencias en [Differences Between Pyright and Mypy](https://github.com/microsoft/pyright/blob/main/docs/mypy-comparison.md) (consultada el 2026-11-24). Según esa página, el estándar de tipado de Python, PEP 484, deja muchos comportamientos sin definir de forma intencionada: «PEP 484 spells out many type checking behaviors, it intentionally leaves many other behaviors undefined. This approach has allowed different type checkers to innovate and differentiate».
- **Nota, no es una decisión:** Microsoft publica la extensión «Mypy Type Checker» para VS Code («Type checking support for Python files using Mypy», [Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.mypy-type-checker), consultada el 2026-11-24). Según esa página, la extensión trae su propia versión de mypy, que no tiene por qué coincidir con la fijada en `uv.lock`. Instalarla o no queda **pendiente de decisión de Pablo**.
