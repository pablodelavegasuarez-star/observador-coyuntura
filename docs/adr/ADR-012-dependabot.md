# ADR-012 · Dependabot para mantener las dependencias

- **Estado:** aceptada
- **Fecha:** 2026-11-24
- **Decide:** Pablo
- **Revisar:** tras el primer PR de Dependabot de cada ecosistema (ver «Pendiente»), cuando el frontend tenga variables sensibles o si los PR mensuales resultan demasiado grandes para revisarlos.

## Contexto

El proyecto tiene tres cadenas de dependencias:

- Python con uv, en `backend/` ([ADR-002](ADR-002-framework-api.md));
- npm, en `frontend/` ([ADR-011](ADR-011-frontend-npm-node-ci.md));
- las acciones de GitHub de los workflows, fijadas por hash de commit con la versión en un comentario ([ADR-004](ADR-004-integracion-continua.md)).

Las tres tienen el lockfile o el hash fijados, así que nada se actualiza solo. Sin un mecanismo, las versiones envejecen y los parches de seguridad solo llegan si alguien los busca. Las dos cuarentenas de 7 días (`exclude-newer` en el [ADR-003](ADR-003-cuarentena-dependencias.md) y `min-release-age` en el [ADR-011](ADR-011-frontend-npm-node-ci.md)) protegen frente a versiones recién publicadas, pero no proponen actualizaciones.

## Opciones consideradas

| Opción | Descripción |
| --- | --- |
| A | **Dependabot**, integrado en GitHub y configurado con `.github/dependabot.yml` |
| B | **Renovate**, como aplicación alojada (Mend Renovate) o en una instancia propia ([Renovate · Running Renovate](https://docs.renovatebot.com/getting-started/running/)) |
| C | **Actualizar a mano**, revisando las versiones periódicamente |

## Criterios

| Criterio | A · Dependabot | B · Renovate | C · A mano |
| --- | --- | --- | --- |
| Herramientas y terceros | Ninguno nuevo: es parte de GitHub | Una aplicación de un tercero con acceso al repositorio, o una instancia propia que hay que alojar y mantener actualizada | Ninguno |
| Ecosistemas del proyecto | `uv`, `npm` y `github-actions` ([Dependabot options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference)) | uv (`uv.lock`), npm y GitHub Actions, también fijadas por hash con comentario ([pep621](https://docs.renovatebot.com/modules/manager/pep621/), [npm](https://docs.renovatebot.com/modules/manager/npm/), [github-actions](https://docs.renovatebot.com/modules/manager/github-actions/)) | Todos, con esfuerzo |
| Espera coherente con la cuarentena | `cooldown` para las actualizaciones de versión | `minimumReleaseAge` ([configuration options](https://docs.renovatebot.com/configuration-options/#minimumreleaseage)) | Depende de la disciplina |
| Avisos de seguridad | Alertas y actualizaciones de seguridad nativas de GitHub | Tiene alertas de vulnerabilidades; no se ha verificado cómo interactúan con `minimumReleaseAge` | Ninguno automático |
| Flexibilidad de configuración | Suficiente para este proyecto | Mayor | — |
| Valor de aprendizaje | Muy extendido en GitHub | Muy extendido | Bajo |
| Esfuerzo continuo | Revisar un PR al mes por ecosistema | Igual que A | Alto y fácil de olvidar |

## Decisión

**Opción A: Dependabot**, configurado en `.github/dependabot.yml`:

- **Ecosistemas:** `uv` en `/backend`, `npm` en `/frontend` y `github-actions` en `/`. Para las acciones, la documentación indica usar `/`: Dependabot busca en `/.github/workflows`.
- **Frecuencia mensual** (`schedule.interval: monthly`).
- **Un solo PR por ecosistema:** un grupo con `patterns: ["*"]`. Sin `applies-to`, el grupo solo se aplica a las actualizaciones de versión: «When undefined, defaults to version updates».
- **`cooldown.default-days: 7`** en los tres ecosistemas, coherente con `exclude-newer` (ADR-003) y `min-release-age` (ADR-011).

Motivos:

1. No añade ningún tercero ni ninguna infraestructura: es parte de GitHub, como la CI ([ADR-004](ADR-004-integracion-continua.md)).
2. Cubre los tres ecosistemas y admite una espera de 7 días como la de las cuarentenas.
3. Renovate es más flexible, pero esa flexibilidad no hace falta hoy, y su versión alojada es una aplicación de terceros con acceso al repositorio.
4. Actualizar a mano depende de acordarse y no avisa de las vulnerabilidades.

## Relación con el procedimiento de excepción del ADR-003

**El cooldown no retrasa las actualizaciones de seguridad.** La documentación lo dice dos veces: «The `cooldown` option is only available for *version* updates, not *security* updates», y del cooldown de 3 días que se aplica por defecto, «This default cooldown does not apply to security updates» ([Dependabot options reference](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference), `cooldown`).

Por tanto, un PR de seguridad puede proponer una versión con menos de 7 días. En npm saltaría `min-release-age` sin dejar rastro en `.npmrc`. En uv, `exclude-newer` podría impedir resolverla.

**Decisión de Pablo:** un PR de seguridad de Dependabot cuenta como **solicitud de excepción** del procedimiento del [ADR-003](ADR-003-cuarentena-dependencias.md):

1. **Decide Pablo.** Ningún PR de seguridad se fusiona sin su aprobación explícita.
2. **Si lo aprueba, se añade al mismo PR la exención solo para el paquete afectado**, con un comentario que indique el identificador de la vulnerabilidad, la fecha y la versión:
   - backend: `exclude-newer-package` en `backend/pyproject.toml`;
   - frontend: `min-release-age-exclude` en `frontend/.npmrc` ([ADR-011](ADR-011-frontend-npm-node-ci.md)).
3. **Se retira** en un PR nuevo cuando la versión supera los 7 días de antigüedad.

Así, el procedimiento es el mismo venga el parche de Dependabot o de una revisión manual.

**Las actualizaciones de seguridad agrupadas quedan desactivadas**, por coherencia con lo anterior: cada excepción se decide paquete a paquete.

## Consecuencias

- **Un PR al mes por ecosistema**, como máximo tres. Cada uno pasa la CI completa y la revisión de Pablo, como cualquier otro PR.
- **Los PR de Dependabot se ejecutan con permisos reducidos:** GitHub los trata como si vinieran de un fork, con un `GITHUB_TOKEN` de solo lectura y sin acceso a los secretos de Actions ([Troubleshooting Dependabot on GitHub Actions](https://docs.github.com/en/code-security/dependabot/troubleshooting-dependabot/troubleshooting-dependabot-on-github-actions)). El workflow ya solo pide `contents: read`.
- **Acciones fijadas por hash:**
  - Dependabot las actualiza y mantiene el comentario de versión si está en la misma línea: «Dependabot updates the version documentation of GitHub Actions when the comment is on the same line» ([Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)).
  - **No reciben alertas de seguridad:** Dependabot «will not create alerts for actions pinned to SHA values» (misma página). Sin alertas no hay actualizaciones de seguridad, así que las acciones solo se actualizan con el PR mensual de versión.
  - Es un coste asumido de fijar por hash (ADR-004).
- **Lo que Dependabot no actualiza:**
  - la versión de uv fijada en el workflow (0.13.9, ADR-004);
  - la línea de Node de `frontend/.node-version` (ADR-011).

  Siguen siendo cambios manuales y deliberados.
- **Los PR de Dependabot no compilan copia de prueba en Render:** las copias están en modo Manual ([ADR-008](ADR-008-frontend.md), «Seguimiento»).
- **Revisión del lockfile:** los locks que genere Dependabot se revisan en el PR, como cualquier otro cambio del lock (ADR-011).
- **Alertas y actualizaciones de seguridad:** se activan en los ajustes del repositorio, no en este fichero. Las activa Pablo.

## Pendiente

- **Compatibilidad del `uv.lock` de Dependabot.** La tabla de ecosistemas de GitHub indica uv «v0.11», y el proyecto usa uv 0.13.9. Si el uv de Dependabot genera un `uv.lock` incompatible, la CI lo detecta porque `uv sync --locked` falla. Se comprobará en el primer PR de Dependabot del backend.
- **Configuración del proyecto al regenerar los locks.** No se ha verificado en la documentación de GitHub si Dependabot respeta `exclude-newer` (`backend/pyproject.toml`), `min-release-age` ni `ignore-scripts` (`frontend/.npmrc`). El `cooldown` cubre la espera en las actualizaciones de versión con independencia de ello. Se comprobará en el primer PR de cada ecosistema.
