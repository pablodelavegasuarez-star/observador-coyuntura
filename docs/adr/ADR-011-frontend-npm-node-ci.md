# ADR-011 · Frontend: npm, versión de Node, cuarentena e integración continua del monorepo

- **Estado:** aceptada. Modifica la consecuencia sobre integración continua del [ADR-006](ADR-006-estructura-del-sistema.md).
- **Fecha:** 2026-11-24
- **Decide:** Pablo
- **Revisar:** cuando la CI tarde lo bastante como para molestar (ver «Estrategia de CI»), al crear el sitio en Render ([ADR-008](ADR-008-frontend.md)) o cuando `typescript-eslint` admita TypeScript 7.

## Contexto

El frontend se escribe en TypeScript con React y Vite, como sitio estático ([ADR-007](ADR-007-lenguaje-por-capa.md), [ADR-008](ADR-008-frontend.md)), dentro de este monorepo ([ADR-006](ADR-006-estructura-del-sistema.md)). Antes de crear su esqueleto había que decidir:

1. El gestor de paquetes.
2. La versión de Node y dónde se fija.
3. Cómo se aplica la cuarentena de dependencias del [ADR-003](ADR-003-cuarentena-dependencias.md) al ecosistema npm.
4. Qué hacer con los scripts de instalación de los paquetes.
5. Qué herramientas forman las puertas de calidad del frontend.
6. Cómo ejecuta la CI las comprobaciones de las dos partes del monorepo.

## Opciones consideradas y criterios

### 1. Gestor de paquetes

| Opción | A favor | En contra |
| --- | --- | --- |
| **A · npm** | Viene con Node: ninguna herramienta más. Tiene cuarentena (`min-release-age`) desde npm 11.10 | Más lento que pnpm; no es lo que importa con un frontend pequeño |
| B · pnpm | Instalación más rápida y estricta | **Una herramienta más** que instalar, fijar y mantener en local y en la CI |

Criterio: el menor número de herramientas que cumpla los requisitos (lockfile exacto, cuarentena y auditoría).

### 2. Versión de Node

- **LTS vigente:** Node 26 «Lithium», en *Active LTS* desde el 2026-10-28, mantenimiento desde el 2027-10-20 y fin de vida el 2029-04-30 ([nodejs/Release · schedule.json](https://raw.githubusercontent.com/nodejs/Release/main/schedule.json); [nodejs.org · Previous releases](https://nodejs.org/en/about/previous-releases)).
- **Última versión al decidir:** 26.13.1 (2026-11-10), que trae npm 11.20.0 ([nodejs.org/dist/index.json](https://nodejs.org/dist/index.json)). Es posterior a 11.10, así que admite `min-release-age`.
- **Exacta o solo la línea:** se fija solo la línea (`26`), como `backend/.python-version` fija `3.13`, para que entren los parches sin un PR. La versión exacta habría dado más reproducibilidad a cambio de un PR por cada parche de seguridad de Node.

### 3. Herramientas de comprobación

| Puerta | Elegida | Alternativas | Criterio |
| --- | --- | --- | --- |
| Tipos | `tsc -b` (TypeScript) en modo estricto | — | Es el comprobador oficial del lenguaje |
| Linter | ESLint + `typescript-eslint` + reglas de *hooks* de React | Biome, oxlint | Es lo que trae la plantilla oficial de Vite, el de mayor ecosistema y el único con las reglas oficiales de *hooks* de React |
| Formato | Prettier (`--check`) | Biome, sin formateador | Simétrico con `ruff format` en el backend |
| Pruebas | Vitest + Testing Library + jsdom | Jest | Vitest reutiliza la configuración de Vite; Jest necesita una transformación de TypeScript aparte |
| Compilación | `vite build` | — | La fija el [ADR-008](ADR-008-frontend.md) |
| Auditoría | `npm audit --audit-level=low` | OSV-Scanner, umbral `high` | Falla con cualquier vulnerabilidad, también de desarrollo, coherente con `pip-audit`. Las dependencias de desarrollo se ejecutan en local y en la CI, así que también cuentan |

### 4. Estrategia de CI del monorepo

| Opción | A favor | En contra |
| --- | --- | --- |
| **A · Ejecutar siempre backend y frontend** | Sencillo; los dos checks requeridos se ejecutan en todos los PR | Gasta minutos en la parte que no cambia |
| B · Filtrar por rutas a nivel de workflow (`paths`) | Solo se ejecuta lo que cambia | Un check requerido que no se ejecuta deja el PR bloqueado esperándolo |
| C · Filtrar por rutas dentro del job | Solo se ejecuta lo que cambia, y el check informa igualmente | Más complejidad en el YAML que no compensa con dos partes pequeñas |

## Decisión

1. **npm** como gestor de paquetes. pnpm se descarta por ser una herramienta más.
2. **Node 26** (línea LTS vigente), fijado en `frontend/.node-version`. Lo usan:
   - en local, la instalación con winget (`OpenJS.NodeJS.LTS`), comprobando el SHA256 del instalador contra el `SHASUMS256.txt` de nodejs.org;
   - en la CI, `actions/setup-node` con `node-version-file`.
3. **Cuarentena de 7 días** en `frontend/.npmrc`, coherente con el [ADR-003](ADR-003-cuarentena-dependencias.md):

   ```ini
   min-release-age=7
   ignore-scripts=true
   ```

   `min-release-age` «will build the npm tree such that only versions that were available more than the given number of days ago will be installed» ([npm · config](https://docs.npmjs.com/cli/v11/using-npm/config)).
4. **Scripts de instalación desactivados** (`ignore-scripts=true`; ver Consecuencias).
5. **Herramientas:** las de la tabla del punto 3. La configuración de ESLint es `eslint.config.js` con `// @ts-check`, y TypeScript la comprueba mediante `allowJs` y `checkJs` en `tsconfig.node.json` (ver Consecuencias).
6. **CI, opción A:** un job `frontend-checks` en el mismo workflow, junto a `backend-checks`. Se ejecuta en todos los PR, toquen lo que toquen.
   - Motivo: con dos partes pequeñas, filtrar por rutas no compensa su complejidad, y el filtro a nivel de workflow dejaría bloqueados los PR por checks requeridos que nunca se ejecutan.
   - Se pasará a ejecutar solo la parte que cambia cuando la CI tarde lo bastante como para molestar.
   - El job sigue las mismas reglas que `backend-checks` ([ADR-004](ADR-004-integracion-continua.md)):
     - nombre estable;
     - acciones fijadas por hash;
     - `persist-credentials: false`;
     - permisos `contents: read`;
     - instalación exacta (`npm ci`);
     - sin caché (`package-manager-cache: false`);
     - todas las comprobaciones se ejecutan aunque falle una, siempre que la instalación haya ido bien.

## Consecuencias

### Cuarentena (comprobado el 2026-11-24)

- **Funciona al resolver versiones.** Al instalar las dependencias del esqueleto, quedaron fuera `typescript-eslint` 8.74.0 (publicada hacía 1 día; se instaló la 8.73.0) y `vitest` 5.1.1 (hacía 6,4 días; se instaló la 5.1.0).
- **No se aplica a lo que ya fija el lockfile.** Es el equivalente de «el lock no caduca» del ADR-003. Prueba en un proyecto aparte:
  1. Se generó un `package-lock.json` sin cuarentena con `typescript-eslint` 8.74.0 (1 día).
  2. Con `min-release-age=7`, `npm ci` instaló la 8.74.0 sin error.
  3. `npm install` sin argumentos dejó el lock intacto.

  La documentación de `npm ci` no menciona la cuarentena ([npm · npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)).
  - **Consecuencia:** la protección está en el momento de generar el lock. Un `package-lock.json` creado sin la cuarentena, por ejemplo desde otra carpeta o por una herramienta automática, la saltaría sin que la CI lo detectase. Por eso los cambios del lockfile se revisan en el PR.
  - **Pendiente de decisión de Pablo:** si se añade a la CI una comprobación de la antigüedad de las versiones del lock.
- **La cuarentena solo vale dentro de `frontend/`:** `frontend/.npmrc` solo se aplica cuando npm se ejecuta desde esa carpeta.
- **Excepciones:** `min-release-age-exclude` permite eximir paquetes concretos, el equivalente de `exclude-newer-package`. Para un parche de seguridad urgente se sigue el procedimiento del [ADR-003](ADR-003-cuarentena-dependencias.md): decide Pablo, solo para el paquete afectado, con un comentario en `.npmrc` y retirada a los 7 días.
- **`npm audit fix`:** si la cuarentena impide instalar la versión corregida, npm deja la vulnerable, avisa y termina con error ([npm · config](https://docs.npmjs.com/cli/v11/using-npm/config), `min-release-age`).
- **Pendiente:** no se ha podido confirmar en la documentación ni en el registro de cambios qué versión de npm introdujo `min-release-age`. El requisito «npm 11.10 o posterior» procede de la decisión de Pablo. La npm usada (11.20.0) lo incluye.

### Scripts de instalación

- **Riesgo:** cualquier paquete del árbol, aunque sea indirecto, puede declarar `preinstall`, `install` o `postinstall`, y npm lo ejecuta con los permisos de quien instala, en local y en la CI. Basta con instalar, ni siquiera hay que usar el paquete. Ni la cuarentena (versiones nuevas) ni la auditoría (vulnerabilidades ya conocidas) lo cubren del todo.
- **Coste comprobado el 2026-11-24: ninguno hoy.**
  - El único paquete del árbol con script de instalación es `fsevents` 2.3.3, exclusivo de macOS, que no se instala en Windows ni en Linux.
  - Vite 8 compila con Rolldown, que trae el binario de cada plataforma como dependencia opcional, sin script.
  - Con los scripts desactivados pasaron todas las comprobaciones: tipos, linter, formato, pruebas, compilación y auditoría.
- **Coste futuro:** si una dependencia nueva necesita su script, fallará al usarse. Se decidirá entonces con Pablo; no se reactivan los scripts de forma general.
- Los scripts del propio proyecto (`npm run`, `npm test`) sí se ejecutan, pero no sus `pre*` y `post*`. El proyecto no usa ninguno.

### Herramientas

- **TypeScript 6.0, no 7.** `typescript-eslint` 8.73 solo admite TypeScript `>=4.8.4 <6.1.0`, así que se instaló la 6.0.3 aunque la 7.0.2 lleva más de 4 meses publicada. Se subirá cuando `typescript-eslint` la admita.
- **Configuración de ESLint en JavaScript comprobado.** ESLint solo carga una configuración en TypeScript sobre Node con la dependencia opcional `jiti` o con una opción experimental (`unstable_native_nodejs_ts_config`) ([ESLint · Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)). Se eligió `eslint.config.js` con `// @ts-check`: sin dependencia nueva, sin opción experimental, y TypeScript sigue comprobando sus tipos.
- **Las puertas detectan fallos.** Se comprobó introduciendo un fallo a propósito en cada una: error de tipos en el código y en `eslint.config.js`, variable sin usar con `any`, título cambiado y formato roto. Todas fallaron y volvieron a verde al quitarlo.
- **Peso de la compilación** del esqueleto: 219,7 kB de JavaScript (68,6 kB comprimido con gzip), React incluido. Servirá de referencia para medir Recharts ([ADR-008](ADR-008-frontend.md), consecuencia 4).

### Integración continua

- **Nuevo check requerido** `frontend-checks`: Pablo lo añade a la protección de `main`. Renombrarlo bloquearía los PR hasta actualizar la protección.
- **`actions/setup-node` v7.1.0** (`949feb2413d6458794dcd2491c4babbbce0c15c1`), publicada el 2026-10-08, con más de 7 días al fijarla, con la misma lógica que el ADR-003 ([release v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0)). La caché automática de npm se desactiva expresamente con `package-manager-cache: false` ([README de setup-node](https://github.com/actions/setup-node)).
- **Node en la CI y en local:** la CI instala la última 26.x disponible en cada ejecución. En local la versión se actualiza a mano con winget. Pueden diferir en el parche, nunca en la línea.
- **Coste de la opción A:** cada PR consume los minutos de los dos jobs, aunque solo cambie una parte.

### Pendiente

- **Render:** cómo elige la versión de Node al compilar el sitio estático (si lee `.node-version`, `engines` de `package.json` o una variable de entorno), y si aplica `frontend/.npmrc`, la cuarentena y `ignore-scripts`. Se comprobará al crear el sitio ([ADR-008](ADR-008-frontend.md)).
- **Comprobación de la antigüedad del lock en la CI:** ver «Cuarentena».

## Seguimiento · 2026-11-24

### Render: versión de Node (resuelto)

Comprobado por Pablo al crear el sitio estático ([ADR-008](ADR-008-frontend.md), «Seguimiento»). Render lee `frontend/.node-version`. Línea del registro:

> Using Node.js version 26.13.1 via /opt/render/project/src/frontend/.node-version

Es el mismo mecanismo que la CI (`node-version-file`): las tres partes (local, CI y Render) usan la línea 26. La página [Render · Node version](https://render.com/docs/node-version) incluye `.node-version` entre las formas de fijar la versión.

### Render: `frontend/.npmrc` (sigue pendiente)

No hay evidencia directa en el registro de que Render aplique `frontend/.npmrc` (`min-release-age` e `ignore-scripts`), y las páginas de Render leídas no mencionan `.npmrc`.

- **Hoy el efecto es limitado:** Render solo ejecuta `npm ci`, que instala lo que fija el lockfile, y la cuarentena no se aplica a lo ya fijado (ver «Cuarentena»).
- **Lo que no está comprobado** es `ignore-scripts` en Render. El único paquete del árbol con script de instalación, `fsevents`, es exclusivo de macOS y no se instala en Linux.

### Comprobación de la antigüedad del lock en la CI: no, por ahora

**Decide Pablo (2026-11-24):** no se añade a la CI. Motivos:

1. El lock solo se genera desde `frontend/`, con la cuarentena activa.
2. Dependabot tendrá su propia espera de 7 días ([ADR-012](ADR-012-dependabot.md)).
3. Cada cambio del lock se revisa en el PR.

**Revisar** si otra herramienta empieza a generar locks.
