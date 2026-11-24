# ADR-008 · Frontend

- **Estado:** aceptada en el modelo de sitio estático, la librería de interfaz y la herramienta de compilación. **Pendiente de decisión de Pablo** en el alojamiento y en la librería de gráficos.
- **Fecha:** 2026-11-24
- **Decide:** Pablo (sesión de tutor B del bloque 2)
- **Revisar:** cuando Pablo elija el alojamiento y la librería de gráficos (se completa este ADR), y al construir el frontend en el bloque 6.

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
3. **Alojamiento: pendiente de decisión de Pablo.** Comparación en el anexo A.
4. **Librería de gráficos: pendiente de decisión de Pablo.** Comparación en el anexo B. D3 queda descartada por ser de demasiado bajo nivel.

## Consecuencias

- Como el sitio es estático, cualquier alojamiento de ficheros sirve. La elección del anexo A no condiciona el código.
- El frontend tendrá su propia cadena de dependencias (npm) que auditar ([ADR-007](ADR-007-lenguaje-por-capa.md)).
- **Pendiente de decisión de Pablo:** alojamiento (anexo A) y librería de gráficos (anexo B).

## Anexo A · Alojamiento del sitio estático

Comparación de Render Static Sites con alternativas gratuitas. Fuentes consultadas el 2026-11-24. «No documentado» significa que las páginas oficiales leídas no lo dicen; no es una confirmación de que no exista.

| Criterio | Render Static Sites | GitHub Pages | Cloudflare Pages | Netlify |
| --- | --- | --- | --- | --- |
| **Plan gratuito y límites** | Gratis: «Static sites are fast and free to deploy». Consumen el ancho de banda y los minutos de compilación incluidos en el espacio de trabajo; la cantidad no figura en las páginas leídas (pendiente) [R1] | Gratis en repositorios públicos [G1]. Sitio de 1 GB como máximo, límite *blando* de 100 GB de ancho de banda al mes y de 10 compilaciones por hora («does not apply if you build and publish your site with a custom GitHub Actions workflow») [G2] | 500 compilaciones al mes, 20 000 ficheros y 25 MiB por fichero [C1]. Las peticiones a ficheros estáticos son «free and unlimited» [C2] | 300 créditos al mes con límite duro, sin recarga [N1]. Cada despliegue a producción cuesta 15 créditos y cada GB de ancho de banda, 20 [N2]. Cálculo propio: unos 15 GB al mes sin despliegues, o 20 despliegues sin tráfico |
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
