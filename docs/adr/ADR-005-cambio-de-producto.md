# ADR-005 · Cambio de producto y nombre del repositorio

- **Estado:** aceptada
- **Fecha:** 2026-11-20
- **Decide:** Pablo
- **Revisar:** si se renombra el servicio de Render o si el nombre interno del paquete empieza a confundir.

## Contexto

El producto cambia: deja de ser un observatorio de pensiones y pasa a ser un observador de coyuntura para seguir una posible recesión en España, con indicadores adelantados y coincidentes de Eurostat, INE y Banco de España, comparación con las crisis de 2008, 2011-2012 y 2020, un semáforo de señales y un panel personal con usuario.

El 2026-11-20 el repositorio de GitHub se renombró de `observatorio-pensiones` a `observador-coyuntura`. Quedan tres nombres que podrían seguir el mismo camino: el paquete Python (`observatorio`), el servicio de Render y su URL pública (`observatorio-pensiones-api.onrender.com`).

Los ADR anteriores (001 a 004) se conservan como registro histórico: su contexto describe el producto de entonces y no se reescribe. Solo se corrigen enlaces que apuntaban al nombre antiguo del repositorio.

## Opciones consideradas

| Opción | Descripción |
| --- | --- |
| A | Renombrar solo lo visible: repositorio, documentación y textos públicos de la API (título y descripción) |
| B | Renombrar además el paquete Python |
| C | Renombrar además el servicio de Render |

## Criterios

Lo que ve un usuario, coste del cambio, riesgo de romper la integración continua o el despliegue, y certeza sobre el comportamiento de cada servicio.

## Decisión

**Opción A.**

Motivos:
1. El paquete `observatorio` es un nombre interno que los usuarios no ven, y sigue siendo correcto en sentido amplio. Renombrarlo obligaría a cambiar los `import`, las pruebas, `uv.lock` y, posiblemente, el comando de arranque configurado en Render (pendiente de verificar). El beneficio sería solo estético.
2. La documentación de Render no aclara si cambiar el nombre de un servicio cambia su subdominio `onrender.com`. Solo indica que, al crearlo, el subdominio incorpora el nombre: «Your service's `onrender.com` subdomain also incorporates this name» ([Render · Web Services](https://render.com/docs/web-services), consultada el 2026-11-20). Sin certeza, se mantiene la URL actual, que es estable y funciona.

## Consecuencias

- **Aceptamos:** el paquete Python (`observatorio`) y la URL pública de la API conservan el nombre anterior. El README lo explica.
- **Verificado (2026-11-20):** Render siguió desplegando automáticamente tras el renombrado del repositorio. Desplegó el `merge` del PR #8 (commit `c1689eb`), el primero posterior al renombrado. La documentación de Render no trata este caso; la comprobación se hizo en el propio servicio.
- **Obligación:** los textos visibles de la API (título en `/docs` y en el contrato OpenAPI) usan el nombre nuevo.
