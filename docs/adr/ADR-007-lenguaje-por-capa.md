# ADR-007 · Lenguaje por capa

- **Estado:** aceptada
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2)
- **Revisar:** si el coste de mantener dos ecosistemas (Python y TypeScript) resulta mayor de lo previsto.

## Contexto

El [ADR-006](ADR-006-estructura-del-sistema.md) fija las capas: ingesta, almacenamiento, librería de cálculos y API en un backend, y el frontend aparte. Falta decidir el lenguaje de cada capa. El backend ya está en marcha en Python, con FastAPI ([ADR-002](ADR-002-framework-api.md)).

## Opciones consideradas

**Ingesta, librería de cálculos y API**

| Opción | Descripción |
| --- | --- |
| A | **Python** |
| B | **Go** |
| C | **Java** |
| D | **TypeScript en el servidor** |

**Frontend**

| Opción | Descripción |
| --- | --- |
| E | **TypeScript** |
| F | **JavaScript sin tipos** |
| G | **Frameworks de interfaz en Python** del tipo Streamlit o Dash |

## Criterios

Para el backend:

- ecosistema de datos;
- soporte de la IA;
- experiencia previa de Pablo;
- que ya está en marcha.

| Opción | Valoración |
| --- | --- |
| A · Python | Cumple los cuatro criterios |
| B · Go | Ecosistema de datos pobre |
| C · Java | Más pesado para un proyecto pequeño |
| D · TypeScript en el servidor | Peor en datos |

Para el frontend:

| Opción | Valoración |
| --- | --- |
| E · TypeScript | Comprueba los tipos antes de ejecutar |
| F · JavaScript sin tipos | No comprueba nada antes de ejecutar |
| G · Streamlit, Dash y similares | La página se genera en el servidor mezclada con el código Python, así que no hay un contrato obligatorio entre cálculo y pantalla. Necesitan un servidor siempre encendido. Dan menos control de diseño, accesibilidad y seguridad para una web pública. Son buenos para paneles internos y prototipos |

## Decisión

| Capa | Lenguaje |
| --- | --- |
| Ingesta, librería de cálculos y API | **Python** |
| Almacén | **SQL**: lo impone la base de datos ([ADR-009](ADR-009-base-de-datos.md)) |
| Frontend | **TypeScript** |

Motivos:

1. Python cumple los criterios del backend: ecosistema de datos, soporte de la IA, experiencia previa de Pablo y que ya está en marcha.
2. TypeScript comprueba los tipos antes de ejecutar, a diferencia de JavaScript sin tipos.
3. Con un frontend separado que solo habla con la API, el contrato OpenAPI es obligatorio entre cálculo y pantalla ([ADR-006](ADR-006-estructura-del-sistema.md)); con Streamlit o Dash no lo sería.

## Consecuencias

**Coste aceptado:**

- otro ecosistema (npm, ESLint, compilación);
- otro trabajo en la integración continua;
- otra cadena de dependencias que auditar;
- más tiempo de revisión para Pablo.

**Obligación:** la regla de tipos de `CLAUDE.md` («Tipos siempre») se aplica también al frontend. La comprobación de tipos de TypeScript forma parte de la integración continua cuando exista el frontend.
