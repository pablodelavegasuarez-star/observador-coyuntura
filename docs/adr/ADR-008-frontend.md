# ADR-008 · Frontend

- **Estado:** aceptada
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2; alojamiento y librería de gráficos elegidos el 2026-11-24 a partir de los anexos A y B)
- **Revisar:** al construir el frontend en el bloque 6, al crear el sitio en Render (ver Consecuencias) o si el consumo de la cuota compartida con el backend se acerca al límite.

## Contexto

El frontend se escribe en TypeScript ([ADR-007](ADR-007-lenguaje-por-capa.md)), vive en `frontend/` dentro de este repositorio y solo habla con la API a través de su contrato OpenAPI ([ADR-006](ADR-006-estructura-del-sistema.md)). No calcula nada.

Pablo pagará el backend unos meses cuando quiera enseñar la aplicación. Hasta entonces, el backend está en el plan gratuito de Render, que se duerme tras 15 minutos sin uso ([ADR-001](ADR-001-despliegue.md)).

## Opciones consideradas

**Modelo de sitio**

| Opción | Descripción |
| --- | --- |
| A | **Sitio estático**: el alojamiento solo sirve ficheros; React se ejecuta en el navegador y pide los datos a la API |
| B | Páginas generadas en un servidor |

**Librería de interfaz y herramienta de compilación**

| Opción | Descripción |
| --- | --- |
| C | **React** con **Vite** |
| D | Vue |
| E | Svelte |
| F | Sin framework |
| G | Next.js |

## Criterios

Para la librería de interfaz: ecosistema y soporte de la IA.

| Opción | Valoración |
| --- | --- |
| C · React + Vite | Mayor ecosistema y soporte de la IA |
| D · Vue, E · Svelte | Menos ecosistema |
| F · Sin framework | Acabaría reinventándolo |
| G · Next.js | Su valor principal es generar páginas en un servidor, que este sitio no necesita |

## Decisión

1. **Sitio estático** (opción A): el alojamiento solo sirve ficheros; React se ejecuta en el navegador y pide los datos a la API.
2. **React** como librería de interfaz y **Vite** como herramienta de compilación (opción C).
3. **Alojamiento: Render Static Sites** (comparación en el anexo A). Motivos:
   - es el mismo proveedor que el backend;
   - el sitio estático es gratis;
   - la suspensión por inactividad solo está documentada para los servicios web, no para los sitios estáticos;
   - permite configurar cabeceras de seguridad, necesarias en el bloque 8;
   - crea una copia de prueba con su propia URL para cada PR.

   Alternativas descartadas:
   - **Cloudflare Pages:** la propia Cloudflare recomienda empezar los proyectos nuevos con Workers. Queda como **plan B**.
   - **Netlify:** los créditos gratuitos se agotan rápido.
   - **GitHub Pages:** las cabeceras de seguridad no están documentadas.
4. **Librería de gráficos: Recharts** (comparación en el anexo B). Motivos:
   - está hecha para React;
   - dibuja las franjas de las recesiones con `ReferenceArea`;
   - la accesibilidad viene activada por defecto;
   - incluye los tipos;
   - licencia MIT.

   Alternativas descartadas:
   - **ECharts:** la accesibilidad viene desactivada por defecto.
   - **Chart.js:** necesita un complemento para las franjas y dibuja en `canvas`, que los lectores de pantalla no leen.
   - **Plotly:** pesa mucho.
   - **D3:** de demasiado bajo nivel.

## Consecuencias

- Como el sitio es estático, cualquier alojamiento de ficheros sirve. La elección del alojamiento no condiciona el código, y por eso Cloudflare Pages sirve como plan B.
- El frontend tendrá su propia cadena de dependencias (npm) que auditar ([ADR-007](ADR-007-lenguaje-por-capa.md)).
- **1. Despliegue solo tras pasar la CI: pendiente de comprobar.** La documentación de Render describe la opción «After CI Checks Pass» para los despliegues en general: «Render triggers a deploy *only after* all of your repo's CI checks pass» ([Render · Deploying on Render](https://render.com/docs/deploys)). No dice expresamente que esté disponible para un sitio estático. Se comprobará en el panel de Render al crear el sitio. Si no lo está, se decidirá entonces entre desplegar a mano tras la CI o pasar a Cloudflare Pages.
- **2. Cuota compartida con el backend.** El espacio de trabajo es del plan Hobby, que no tiene cuota mensual: «The Hobby plan does not have a monthly fee, so you only pay for usage» ([Render · Platform features by plan](https://render.com/docs/platform-features-by-plan)). Los sitios estáticos consumen la misma cuota que el backend: «Static sites count against your workspace's monthly included amounts of outbound bandwidth and pipeline minutes» ([Render · Static Sites](https://render.com/docs/static-sites)).
  - **Ancho de banda:** el plan Hobby incluye 5 GB al mes. El exceso cuesta «$0.15 per GB for traffic sent over the public internet» ([Render · Outbound bandwidth](https://render.com/docs/outbound-bandwidth)). La misma página añade: «Always confirm the latest pricing on the pricing page». La página de precios no se pudo leer porque carga los datos de forma dinámica.
  - **Minutos de compilación:** el plan Hobby incluye 500 al mes ([Render · Build pipeline](https://render.com/docs/build-pipeline)). El precio del exceso **no está documentado** en esa página: solo dice que se compra «a supplementary amount of minutes for your current tier». **Pendiente de verificar.**
  - **Con tarjeta registrada:**
    - Ancho de banda: «If you've linked a payment method, Render bills you for each additional GB of bandwidth» ([Render · Outbound bandwidth](https://render.com/docs/outbound-bandwidth), FAQ).
    - Minutos: «you automatically purchase a supplementary amount of minutes for your current tier, unless: You've reached your monthly spend limit, or You haven't added a payment method» ([Render · Build pipeline](https://render.com/docs/build-pipeline)). Para los minutos existe un límite de gasto mensual configurable (misma página).
  - **Sin tarjeta registrada, según la documentación:**
    - Ancho de banda: «Render spins down your workspace's services until the start of the next month» ([Render · Outbound bandwidth](https://render.com/docs/outbound-bandwidth), FAQ). La página del plan gratuito dice «Render instead suspends all of your Free services for the remainder of the month» ([Render · Deploy for Free](https://render.com/docs/free)).
    - Minutos: «Render stops running pipeline tasks (including service builds!) for the remainder of the current month» ([Render · Build pipeline](https://render.com/docs/build-pipeline)). Según la página del plan gratuito, los servicios siguen activos con su última compilación.
    - **Pendiente de verificar:** si esa suspensión por ancho de banda afecta también al sitio estático. Las páginas hablan de los servicios del espacio de trabajo y de los servicios gratuitos, sin nombrar los sitios estáticos.
  - **Pendiente de verificar:** qué hace Render si el cobro del exceso falla. No se ha encontrado en las páginas leídas.
- **3. Límite de gasto:** Pablo limitará el gasto con una tarjeta de saldo limitado.
- **4. Peso de Recharts: pendiente de medir** con la primera compilación del frontend.
- **Copias de prueba por PR:** Render las crea también para los sitios estáticos, cada una con su propia URL `onrender.com`, y son gratis si el sitio es gratuito: «If your base service is a free static site, its PR previews are also free». Vienen desactivadas por defecto («By default, Render does *not* create PR previews») y hay que activarlas al crear el sitio ([Render · Service previews](https://render.com/docs/service-previews)).

## Seguimiento · 2026-11-24: creación del sitio en Render

Hechos comprobados por Pablo el 2026-11-24 en el panel y en el registro de Render. El registro no es público, así que se citan sus líneas.

### Configuración del sitio

| Ajuste | Valor |
| --- | --- |
| Nombre | `observador-coyuntura` |
| URL | <https://observador-coyuntura.onrender.com> |
| Rama | `main` |
| Root Directory | `frontend/` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |
| Variables de entorno | `SKIP_INSTALL_DEPS=true` (ver más abajo) |

### Condición 1 (despliegue solo tras pasar la CI): resuelta

La opción «After CI Checks Pass» aparece en el formulario de creación de un sitio estático y está seleccionada. No hace falta desplegar a mano ni pasar a Cloudflare Pages.

### Una sola instalación de dependencias

- **Instalación automática de Render:** antes del comando de compilación, Render instala por su cuenta las dependencias del sitio estático (el registro muestra «Installing dependencies with npm...»). La documentación lo describe así: «By default, Render automatically attempts to detect and install your static site's dependencies» ([Render · Static Sites](https://render.com/docs/static-sites), «Dependency installation»).
- **Se desactiva con `SKIP_INSTALL_DEPS=true`.** La misma página indica añadir esa variable con el valor `true` para incluir después la instalación propia en el comando de compilación. La lista de variables de Render la describe como «Set this to `true` to skip running `yarn`/`npm install` during build» ([Render · Default Environment Variables](https://render.com/docs/environment-variables), «Optional environment variables», Node.js).
- **Motivo:** que solo haya una instalación, el `npm ci` del comando de compilación, que instala exactamente lo que fija `package-lock.json` ([ADR-011](ADR-011-frontend-npm-node-ci.md)).
- **Comprobado:** tras el cambio, el registro solo muestra la instalación del comando de compilación.
- **No documentado:** la línea literal «Installing dependencies with npm...» no aparece en las páginas leídas.

### Caché de compilación

- Render descarga una caché entre compilaciones (registro: «Downloaded and extracted 74 MiB cache»). La documentación la menciona de forma general para los servicios, con la opción «Clear build cache & deploy», que evita reutilizar «any artifacts generated during a previous build» ([Render · Deploys](https://render.com/docs/deploys)). No describe una caché propia de los sitios estáticos.
- **No afecta al resultado:** `npm ci` borra `node_modules` antes de instalar y comprueba cada paquete contra el hash de integridad del lockfile.

### Reproducibilidad

La compilación es idéntica en local y en Render: el mismo fichero `index-gz4drcWc.js`, de 219,67 kB.

### Copias de prueba por PR

- **Activadas en modo Manual:** solo se crea una copia si el PR lleva la etiqueta `render-preview` o el título incluye «[render preview]».
- **Motivo:** compilar solo cuando Pablo lo pide, para no gastar la cuota compartida con el backend (consecuencia 2).
- **Pendiente:** la documentación de Render no dice si crea copias para PR que vienen de un fork, y cualquiera que abra un PR puede escribir el disparador en el título.
  - **Riesgo bajo hoy:** el sitio no tiene secretos en sus variables de entorno.
  - **Revisar** cuando el frontend tenga variables sensibles.

## Anexo A · Alojamiento del sitio estático

**Opción elegida: Render Static Sites** (ver Decisión). La comparación se conserva como registro.

Comparación de Render Static Sites con alternativas gratuitas. Fuentes consultadas el 2026-11-24. «No documentado» significa que las páginas oficiales leídas no lo dicen; no es una confirmación de que no exista.

| Criterio | Render Static Sites | GitHub Pages | Cloudflare Pages | Netlify |
| --- | --- | --- | --- | --- |
| **Plan gratuito y límites** | Gratis: «Static sites are fast and free to deploy». Consumen el ancho de banda y los minutos de compilación incluidos en el espacio de trabajo [R1]: en el plan Hobby, 5 GB al mes [R6] y 500 minutos al mes [R7] (cifras añadidas el 2026-11-24 al elegir el alojamiento; ver Consecuencias) | Gratis en repositorios públicos [G1]. Sitio de 1 GB como máximo, límite *blando* de 100 GB de ancho de banda al mes y de 10 compilaciones por hora («does not apply if you build and publish your site with a custom GitHub Actions workflow») [G2] | 500 compilaciones al mes, 20 000 ficheros y 25 MiB por fichero [C1]. Las peticiones a ficheros estáticos son «free and unlimited» [C2] | 300 créditos al mes con límite duro, sin recarga [N1]. Cada despliegue a producción cuesta 15 créditos y cada GB de ancho de banda, 20 [N2]. Cálculo propio: unos 15 GB al mes sin despliegues, o 20 despliegues sin tráfico |
| **Despliegue solo tras pasar la CI** | Opción «After CI Checks Pass»: «Render triggers a deploy *only after* all of your repo's CI checks pass» [R2]. La página es general; que valga para sitios estáticos no está dicho expresamente (pendiente) | Publicación desde un workflow de Actions con `actions/upload-pages-artifact` y `actions/deploy-pages` [G3]. Que el despliegue espere a las pruebas depende del orden de los jobs del propio workflow; la página no lo describe | Subida directa desde la CI con Wrangler (`pages deploy`) [C3]. Las compilaciones automáticas desde Git se lanzan con cada push, sin esperar a la CI [C1] | Despliegue desde la CI con `netlify deploy --prod`, que no compila: la CI debe compilar antes [N3]. Se pueden detener las compilaciones automáticas: «stop builds while you use a continuous integration tool to run validations» [N4] |
| **Dominio propio** | Sí, gratis y con TLS incluido: «TLS certificates are always included for free» [R1]. Dominios incluidos por plan: Hobby 2; el número para un espacio de trabajo sin plan no figura [R3] | Sí [G4], con HTTPS mediante certificado de Let's Encrypt y la opción «Enforce HTTPS» [G5] | Sí; un dominio raíz exige gestionar su DNS en Cloudflare [C4] | Sí, con HTTPS gratuito: «Netlify offers free HTTPS on all sites» [N5] |
| **Cabeceras de seguridad** | Sí, configuradas en el panel de Render, por ruta [R4] | No documentado en las páginas leídas (pendiente) | Sí, fichero `_headers`, con un ejemplo de `Content-Security-Policy` [C5] | Sí, fichero `_headers` o `netlify.toml` [N6] |
| **¿Se duerme?** | No documentado para sitios estáticos. La suspensión a los 15 minutos solo se documenta para los servicios web gratuitos [R5] | No documentado | No documentado | No documentado |
| **Otros** | El backend ya está en Render: un solo proveedor | Uso no permitido para un negocio en línea o SaaS [G2] | Cloudflare recomienda empezar los proyectos nuevos con Workers: «Start new projects with Workers» [C6] | Al agotar los créditos, sin recarga automática, los proyectos dejan de estar activos; el detalle no se ha verificado (pendiente) [N1] |

Fuentes:

- [R1] <https://render.com/docs/static-sites>
- [R2] <https://render.com/docs/deploys>
- [R3] <https://render.com/docs/custom-domains>
- [R4] <https://render.com/docs/static-site-headers>
- [R5] <https://render.com/docs/free>
- [R6] <https://render.com/docs/outbound-bandwidth>
- [R7] <https://render.com/docs/build-pipeline>
- [G1] <https://docs.github.com/en/get-started/learning-about-github/githubs-plans>
- [G2] <https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits>
- [G3] <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- [G4] <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>
- [G5] <https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https>
- [C1] <https://developers.cloudflare.com/pages/platform/limits/>
- [C2] <https://developers.cloudflare.com/pages/functions/pricing/>
- [C3] <https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/>
- [C4] <https://developers.cloudflare.com/pages/configuration/custom-domains/>
- [C5] <https://developers.cloudflare.com/pages/configuration/headers/>
- [C6] <https://developers.cloudflare.com/pages/>
- [N1] <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/>
- [N2] <https://www.netlify.com/pricing/>
- [N3] <https://docs.netlify.com/deploy/create-deploys/>
- [N4] <https://docs.netlify.com/build/configure-builds/stop-or-activate-builds/>
- [N5] <https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/>
- [N6] <https://docs.netlify.com/routing/headers/>

## Anexo B · Librería de gráficos

**Opción elegida: Recharts** (ver Decisión). La comparación se conserva como registro.

Comparación de Recharts, ECharts, Chart.js y Plotly. Fuentes consultadas el 2026-11-24. El criterio de franjas se refiere a dibujar los periodos de recesión ([especificación del cuadro, §6](../datos/especificacion-cuadro.md)) sobre una serie temporal.

| Criterio | Recharts | ECharts | Chart.js | Plotly.js |
| --- | --- | --- | --- | --- |
| **Franjas de periodos sobre una serie temporal** | Incluido: `ReferenceArea`, «Draws a rectangular area on the chart to highlight a specific range»; `x1` y `x2` usan valores del eje, no píxeles [RC1] | Incluido: `markArea`, «Used to mark an area in chart. For example, mark a time interval» [EC1] | No incluido en el núcleo (no documentado en las páginas leídas). Requiere el plugin `chartjs-plugin-annotation` (organización chartjs, MIT): «Box annotations are used to draw rectangles on the chart area» [CJ1] | Incluido: formas `rect` con `xref: 'x'` e `yref: 'paper'`; ejemplo oficial «Highlighting Time Series Regions with Rectangle Shapes» [PL1] |
| **Tipos de TypeScript** | Incluidos en el paquete: «We ship the type definition directly in the main npm package» [RC2] | Incluidos: el `package.json` del paquete declara `"types"` [EC2], y el manual ofrece tipos como `EChartsOption` [EC3] | Incluidos: «Chart.js comes with built-in TypeScript typings» [CJ2] | Incluidos desde la v4: «Since v4, Plotly.js ships its own TypeScript type definitions» [PL2] |
| **Peso** | No publicado por la fuente (pendiente: medir con una compilación de prueba) | No publicado; admite importar solo los módulos necesarios para reducir el tamaño [EC3] | No publicado (pendiente) | Publicado: paquete completo de 1,49 MB minificado y comprimido; paquete parcial `basic` de 403 kB [PL3] |
| **Accesibilidad** | Propiedad `accessibilityLayer` («Turn on accessibility support for keyboard-only and screen reader users», activada por defecto), `role` y `tabIndex` [RC3]. Dibuja en SVG | Módulo `aria`, desactivado por defecto: genera una descripción automática del gráfico y patrones (*decals*) para distinguir datos sin depender del color [EC4]. Dibuja en Canvas o SVG | Dibuja en `canvas`: «the `canvas` content will not be accessible to screen readers»; la accesibilidad se añade a mano con atributos ARIA o contenido alternativo [CJ3] | No documentado en las páginas leídas (pendiente). Dibuja la mayoría de gráficos en SVG [PL4] |
| **Licencia abierta** | MIT [RC4] | Apache 2.0 [EC5] | MIT [CJ4]; el plugin de anotaciones, MIT [CJ1] | MIT [PL5] |

D3 queda descartada por ser de demasiado bajo nivel.

Fuentes:

- [RC1] <https://recharts.github.io/en-US/api/ReferenceArea>
- [RC2] <https://recharts.github.io/en-US/guide/typescript/>
- [RC3] <https://recharts.github.io/en-US/api/LineChart/>
- [RC4] <https://github.com/recharts/recharts/blob/main/LICENSE>
- [EC1] Documentación de opciones de ECharts, `markArea`: fuente en <https://github.com/apache/echarts-doc/blob/master/en/option/partial/mark-area.md>; página publicada en <https://echarts.apache.org/en/option.html#series-line.markArea>
- [EC2] <https://github.com/apache/echarts/blob/master/package.json>
- [EC3] <https://echarts.apache.org/handbook/en/basics/import/>
- [EC4] <https://echarts.apache.org/handbook/en/best-practices/aria/>
- [EC5] <https://github.com/apache/echarts/blob/master/LICENSE>
- [CJ1] <https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/box.html> y <https://github.com/chartjs/chartjs-plugin-annotation>
- [CJ2] <https://www.chartjs.org/docs/latest/>
- [CJ3] <https://www.chartjs.org/docs/latest/general/accessibility.html>
- [CJ4] <https://github.com/chartjs/Chart.js/blob/master/LICENSE.md>
- [PL1] <https://plotly.com/javascript/shapes/>
- [PL2] <https://plotly.com/javascript/guides/typescript/>
- [PL3] <https://github.com/plotly/plotly.js/blob/master/dist/README.md>
- [PL4] <https://plotly.com/javascript/>
- [PL5] <https://github.com/plotly/plotly.js>
