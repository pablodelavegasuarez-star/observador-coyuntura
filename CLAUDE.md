# CLAUDE.md · Reglas del taller

## Contexto

Este repositorio es un proyecto de aprendizaje: un observador de coyuntura para seguir una posible recesión en España. Reúne indicadores adelantados y coincidentes de fuentes oficiales (Eurostat, INE y Banco de España), los compara con las crisis de 2008, 2011-2013 y 2020, los resume en un semáforo de señales y ofrece un panel personal con usuario. Lo construye Pablo, consultor de negocio sin experiencia en desarrollo. El objetivo es que él entienda el proceso de desarrollo y tenga criterio técnico, no que el código se escriba lo más rápido posible.

## Reglas de trabajo

1. **Plan antes que código.** Antes de modificar archivos, explica en pocas líneas qué vas a cambiar, en qué archivos y por qué. Espera mi aprobación.
2. **Cambios pequeños.** Un cambio por paso, que se pueda revisar en unos minutos.
3. **Explica lo que haces.** Tras cada cambio, resume qué hace en lenguaje de negocio y qué concepto técnico aplica. Céntrate en conceptos, decisiones y riesgos, no en sintaxis. Usa el término en inglés y en español la primera vez.
4. **Las tecnologías no se eligen solas.** No añadas lenguajes, frameworks, herramientas ni dependencias sin proponerlo antes, con alternativas y criterios. Las decisiones aprobadas se registran en `docs/adr/`.
5. **Git con aprobación.** Puedes ejecutar comandos de Git, pero antes de cada uno dime qué hace y qué cambia, y espera mi aprobación. Avísame expresamente si un comando reescribe historia compartida o puede perder trabajo (por ejemplo `push --force`, `reset --hard`, `--amend` sobre commits ya subidos, borrar ramas). Nunca hagas commits directos en `main`: todo entra por pull request.
6. **Pruebas siempre.** Toda funcionalidad nueva lleva pruebas. Si cambias un cálculo, primero escribe o actualiza la prueba que lo cubre.
7. **Tipos siempre.** Todo el código lleva anotaciones de tipo, y la comprobación de tipos forma parte de la integración continua.
8. **Nunca debilites la cadena de calidad** para que algo pase: no desactives pruebas, comprobaciones de tipos, reglas del linter, pasos de la integración continua ni avisos de seguridad sin explicármelo y sin mi aprobación.
9. **Cuando algo falle, no lo arregles directamente.** Dame primero una pista para que lo diagnostique yo. Si te pido la solución, entonces sí.
10. **Secretos fuera del código.** Contraseñas, claves y cadenas de conexión van en variables de entorno (fichero `.env`, nunca versionado), nunca en el repositorio ni en el chat.
11. **Indicadores con metodología oficial.** Cada indicador y cada regla del semáforo siguen la metodología oficial de su fuente (Eurostat, INE, Banco de España), citada. Si no estás seguro, dilo y no lo inventes.
12. **Datos ficticios.** Nunca uses datos personales reales en pruebas ni ejemplos.
13. **Idioma.** Código, nombres y mensajes de commit en inglés. Documentación (README, ADR, metodología) en español. Conmigo hablas en español.
14. **Pregunta antes de suponer.** Si falta un dato, una regla o una decisión, pregúntame o márcalo como pendiente. No rellenes huecos por tu cuenta.
15. **Verificar antes de afirmar.** Antes de afirmar cómo funciona una herramienta o un servicio, compruébalo en su documentación oficial y cita la página. Si no está documentado, dilo.
16. **GitHub Actions seguras.** Las acciones se fijan por el hash completo del commit, con la versión en un comentario, y cada workflow declara los permisos mínimos que necesita.
17. **Mínimo privilegio.** Todo token, clave o acceso se crea con el alcance y la duración mínimos que requiere la tarea.
18. **Nada provisional.** No se toman atajos para ver un resultado antes: cada pieza se construye como en la versión final.

## Arquitectura

Las capas, las carpetas y la regla de dependencias están fijadas en el [ADR-006](docs/adr/ADR-006-estructura-del-sistema.md): monolito modular y monorepo (`backend/` y `frontend/`). El paquete `observatorio` tiene cuatro módulos: `ingestion/`, `storage/`, `analytics/` y `api/`. La base de datos es PostgreSQL en todos los entornos, también en local ([ADR-009](docs/adr/ADR-009-base-de-datos.md)). Principios que rigen:

- Separación por capas: ingesta de datos, almacenamiento, cálculos (transformaciones, comparación histórica y semáforo), API y frontend.
- Regla de dependencias (ADR-006): `analytics` no importa nada de `ingestion`, `storage` ni `api`; `api` depende de `analytics` y `storage`; `ingestion` depende de `storage`.
- La capa de cálculos (`analytics`) es pura: no depende de la API, la base de datos ni la interfaz, y se prueba sola.
- El frontend no calcula nada: pide resultados a la API a través de su contrato OpenAPI.
- La API no guarda estado propio; toda la configuración va en variables de entorno (ver `docs/adr/`).

## Comandos habituales

### Backend

Se ejecutan desde la carpeta `backend/`. `uv run` usa siempre el entorno y las versiones fijadas en `uv.lock`.

| Para qué | Comando |
| --- | --- |
| Instalar o sincronizar dependencias | `uv sync` |
| Linter (revisión de estilo y errores) | `uv run ruff check .` |
| Comprobar el formato | `uv run ruff format --check .` |
| Aplicar el formato | `uv run ruff format .` |
| Comprobación de tipos | `uv run mypy` |
| Pruebas | `uv run pytest` |
| Auditoría de vulnerabilidades | `uv run pip-audit` |
| Arrancar la API en local | `uv run uvicorn observatorio.api.main:app --reload` |

Con la API arrancada: <http://127.0.0.1:8000/health> y documentación interactiva en <http://127.0.0.1:8000/docs>.

### Frontend

Se ejecutan desde la carpeta `frontend/`, con Node 26 (fijado en `frontend/.node-version`) y npm 11.10 o posterior. `frontend/.npmrc` aplica la cuarentena de 7 días y desactiva los scripts de instalación ([ADR-011](docs/adr/ADR-011-frontend-npm-node-ci.md)).

| Para qué | Comando |
| --- | --- |
| Instalar exactamente lo que fija `package-lock.json` | `npm ci` |
| Añadir una dependencia (pasa por la cuarentena) | `npm install <paquete>` (o `--save-dev`) |
| Linter (ESLint) | `npm run lint` |
| Comprobar el formato (Prettier) | `npm run format:check` |
| Aplicar el formato | `npm run format` |
| Comprobación de tipos (TypeScript) | `npm run typecheck` |
| Pruebas (Vitest) | `npm test` |
| Compilación del sitio estático (en `dist/`) | `npm run build` |
| Auditoría de vulnerabilidades | `npm audit --audit-level=low` |
| Arrancar el frontend en local | `npm run dev` |
| Servir en local la compilación de `dist/` | `npm run preview` |

Con el frontend arrancado: <http://localhost:5173>.

GitHub CLI (`gh` 2.103.3, desde la raíz del repositorio): `gh pr create`, `gh pr checks <número>` y `gh run view <id> --log-failed`. Usa un token limitado a este repositorio (pull requests y lectura de Actions) que caduca el 2027-02-16; los `git push` siguen usando las credenciales de Git.

(Se completará en la semana 2.)
