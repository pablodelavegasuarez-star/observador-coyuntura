# ADR-004 · Plataforma de integración continua

- **Estado:** aceptada
- **Fecha:** 2026-11-18
- **Decide:** Pablo
- **Revisar:** si se agotan los minutos gratuitos, si el repositorio deja de estar en GitHub o en la migración a Cloud Run (semana 5, ver [ADR-001](ADR-001-despliegue.md)).

## Contexto

Todo cambio debe pasar por la cadena completa: rama → integración continua → despliegue ([ADR-001](ADR-001-despliegue.md)). Hace falta un servicio que ejecute automáticamente ruff, mypy, pytest y pip-audit en cada pull request y en cada push a `main`, y cuyo resultado pueda exigirse en la protección de `main` para que nada se fusione en rojo.

El temario propone GitHub Actions, pero es solo una propuesta: la decisión se evalúa aquí como cualquier otra.

## Opciones consideradas

| Opción | Descripción |
| --- | --- |
| A | **GitHub Actions** |
| B | **GitLab CI** (implica alojar el repositorio en GitLab o duplicarlo allí) |
| C | **Servicio externo** de integración continua conectado a GitHub (p. ej. CircleCI) |
| D | **Sin integración continua**: comprobaciones solo en local (por ejemplo, con *hooks* de Git) |

## Criterios

| Criterio | A · GitHub Actions | B · GitLab CI | C · Servicio externo | D · Solo local |
| --- | --- | --- | --- | --- |
| Integración con el repositorio y la protección de `main` | Nativa: el resultado aparece en el pull request y se exige como comprobación obligatoria | Requiere mover o duplicar el repositorio | Buena, mediante una aplicación de terceros con acceso al repositorio | No hay resultado que exigir: depende de que cada persona lo ejecute |
| Coste | Gratuito en repositorios públicos | Plan gratuito con minutos limitados | Plan gratuito con minutos limitados | 0 € |
| Valor de aprendizaje para un entorno empresarial | Muy extendido | Muy extendido | Menos habitual | Bajo |
| Seguridad | Permisos del token configurables por workflow; acciones fijables por hash | Comparable | Un tercero más con acceso al código | Sin garantía de que las comprobaciones se ejecuten |
| Coste de cambiar | Bajo: los pasos son comandos de uv; solo cambia la sintaxis del YAML | Bajo | Bajo | — |

## Decisión

**Opción A: GitHub Actions**, con un único workflow (`.github/workflows/ci.yml`) y un único job llamado `backend-checks`.

Motivos:
1. El repositorio ya está en GitHub: el resultado aparece en el propio pull request y se puede exigir en la protección de `main` sin añadir otro proveedor.
2. Es gratuito para un repositorio público y es la opción más extendida.
3. Los pasos son los mismos comandos de uv que se ejecutan en local, así que cambiar de plataforma solo exigiría reescribir el YAML.

## Consecuencias

- **Nombre estable:** el job se llama `backend-checks` y se exigirá como comprobación obligatoria en `main`. Cambiarle el nombre bloquearía los pull requests hasta actualizar la protección.
- **Mínimo privilegio:** el token del workflow solo tiene permiso de lectura del contenido (`contents: read`), y `actions/checkout` no deja las credenciales guardadas (`persist-credentials: false`).
- **Acciones de terceros fijadas por hash de commit** (`actions/checkout`, `astral-sh/setup-uv`), con la versión en un comentario. Actualizarlas es un cambio deliberado que pasa por pull request.
- **Misma versión de uv que en local** (0.13.9), fijada en el workflow. Si se actualiza uv en local, hay que actualizarla también en el workflow.
- **Instalación reproducible:** `uv sync --locked` instala exactamente lo que fija `uv.lock` y falla si el lock no está al día con `pyproject.toml`.
- **Todas las comprobaciones se ejecutan** aunque falle una, para ver todos los errores a la vez, pero solo si la instalación de dependencias ha ido bien. Cualquier comprobación que falle marca el job en rojo.
- **Sin caché** de dependencias por ahora: la instalación con uv es rápida y así ninguna ejecución hereda estado de otra. Se puede activar más adelante si el tiempo de ejecución lo justifica.
- **Dependencia de GitHub:** si GitHub Actions no está disponible, no se puede fusionar en `main` mientras la comprobación sea obligatoria.
