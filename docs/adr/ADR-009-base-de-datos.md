# ADR-009 · Base de datos

- **Estado:** aceptada. Sustituye a la propuesta del temario (SQLite en local).
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2)
- **Revisar:** en el bloque 3, al elegir la herramienta de acceso a datos y de migraciones, o si Neon cambia la versión por defecto o las condiciones de su plan gratuito.

## Contexto

La producción usa PostgreSQL en Neon ([ADR-001](ADR-001-despliegue.md)). El temario propone SQLite en local. Falta decidir qué base de datos se usa en local y en la integración continua.

Datos verificados que condicionan la decisión:

- **El disco del plan gratuito de Render no conserva ficheros.** «Like all Render services, Free web services have an ephemeral filesystem. This means that any changes to your web service's filesystem (uploaded images, local SQLite databases, etc.) are lost every time the service redeploys, restarts, or spins down». Además, «Paid services can preserve local filesystem changes by attaching a persistent disk, but Free web services cannot» ([Render · Deploy for Free](https://render.com/docs/free), consultada el 2026-11-24).
- **Versiones de Neon.** «Neon currently supports Postgres 14, 15, 16, 17, 18, and 19» y «Postgres 18 is the default version for new projects» ([Neon · Postgres version policy](https://neon.com/docs/postgresql/postgres-version-policy), consultada el 2026-11-24, página actualizada el 2026-11-20).
- **PostgreSQL en Windows.** La página oficial ofrece el «Interactive installer by EDB», «certified by EDB for all supported Postgres versions» ([PostgreSQL · Windows installers](https://www.postgresql.org/download/windows/), consultada el 2026-11-24).
- **PostgreSQL temporal en la CI.** GitHub Actions permite levantar PostgreSQL como contenedor de servicio de un job: «All services must run in a container, so each service requires that you specify the container `image`» y «You must use a Linux environment when using service containers or container jobs» ([GitHub Docs · Creating PostgreSQL service containers](https://docs.github.com/en/actions/use-cases-and-examples/using-containerized-services/creating-postgresql-service-containers), consultada el 2026-11-24). El job actual `backend-checks` ya usa Linux (`ubuntu-24.04`).

## Opciones consideradas

| Opción | Local | Integración continua | Producción |
| --- | --- | --- | --- |
| A | **PostgreSQL** instalado en Windows | PostgreSQL temporal | Neon |
| B | SQLite | SQLite o PostgreSQL | Neon (PostgreSQL) |
| C | SQLite | SQLite | SQLite |
| D | Rama de Neon | — | Neon |

## Criterios

| Criterio | A · PostgreSQL en todos | B · SQLite en local | C · SQLite en producción | D · Rama de Neon en local |
| --- | --- | --- | --- | --- |
| Paridad entre entornos (*dev/prod parity*) | Total | Baja: SQLite y PostgreSQL se comportan distinto, sobre todo con las fechas | — | Total |
| Viabilidad en producción | Sí | Sí | **No**: el disco del plan gratuito de Render se borra en cada despliegue, reinicio o suspensión | Sí |
| Dependencia externa para trabajar en local | Ninguna | Ninguna | Ninguna | Internet y Neon, con los límites del plan gratuito |
| Riesgo para los datos reales | Bajo | Bajo | — | **Alto**: si el `.env` apunta por error a producción, las pruebas pueden borrar datos reales |

## Decisión

**Opción A: PostgreSQL en todos los entornos.**

| Entorno | Base de datos |
| --- | --- |
| Local | PostgreSQL instalado en Windows |
| Integración continua | PostgreSQL temporal para las pruebas |
| Producción | Neon ([ADR-001](ADR-001-despliegue.md)) |

Motivos:

1. **Paridad entre entornos.** SQLite y PostgreSQL se comportan distinto, sobre todo con las fechas, y este proyecto trabaja casi solo con series temporales.
2. **SQLite en local con PostgreSQL en producción, descartado:** riesgo de diferencias que solo aparecerían en producción.
3. **SQLite en producción, descartado:** el disco del plan gratuito de Render no conserva ficheros entre despliegues (verificado arriba).
4. **Rama de Neon para local, descartada:** depende de Internet y de Neon, tiene los límites del plan gratuito y, sobre todo, existe el riesgo de que el `.env` apunte por error a producción y las pruebas borren datos reales.

## Consecuencias

- **La versión principal de PostgreSQL** en local y en la CI debe coincidir con la de Neon.
  - **Pendiente de verificar:** la versión del proyecto de Neon de este observador. Neon indica dos formas de consultarla: «run the following query […]: `SELECT version();`» y «Your Postgres major version is also displayed in the Postgres panel on your project's Overview page» ([Neon · Postgres version policy](https://neon.com/docs/postgresql/postgres-version-policy)). No se ha consultado porque exige las credenciales del proyecto. La versión por defecto hoy (18) no prueba cuál se eligió al crearlo.
  - Neon advierte que cambiar de versión principal no se hace en el mismo proyecto: «Upgrading to a newer major version requires creating a new Neon project […] and migrating your data» (misma página).
- **Pendiente para el bloque 3, sin decidir:**
  - la herramienta de acceso a datos;
  - la herramienta de migraciones de esquema.
- **Instalación en local:** PostgreSQL en Windows es una instalación fuera del proyecto, como poppler. Se hará cuando empiece el bloque 3 y no se registra como dependencia del repositorio.
- **Integración continua:** las pruebas que usen la base de datos necesitarán un PostgreSQL temporal en el workflow. Cambiar `ci.yml` queda para cuando existan esas pruebas.
