# Inventario de fuentes de datos

- **Estado:** inventario exploratorio. Propone candidatos; no decide qué indicadores entran en el cuadro.
- **Fecha de verificación:** 2026-11-20 (todas las consultas de este documento se hicieron ese día salvo que se indique otra fecha).
- **Alcance:** España, frecuencia mensual o trimestral, datos desde 2000 o antes, gratuitos y descargables de forma automatizable.
- **Decisiones previas que lo condicionan:** la serie histórica empieza en enero de 2000; se prefiere la versión desestacionalizada; la ingesta será programada; cuando una fuente revisa un dato se sobrescribe y se guardan las fechas de captura y de revisión.

## 1. Tabla resumen

Leyenda de ajuste: **NSA** sin ajustar · **SA** desestacionalizada · **CA** corregida de calendario · **SCA** desestacionalizada y corregida de calendario · **TC** tendencia-ciclo.
⚠️ marca una característica que el usuario debe decidir o tener en cuenta (empieza después de 2000, solo serie original, cobertura distinta…).

| # | Indicador | Bloque | Clasificación | Organismo | Código | Period. | Datos España | Ajustes | Estado |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Tasa de paro | Mercado laboral | Retrasado | Eurostat | `une_rt_m` | M | 1986-04 → 2026-09 | NSA, SA, TC | Verificado |
| 2 | Empleo (contabilidad nacional) | Mercado laboral | Coincidente | Eurostat | `namq_10_pe` | T | 1995-T1 → 2026-T3 | NSA, SA, CA, SCA | Verificado |
| 3 | Expectativas de paro de los consumidores | Mercado laboral | Sin clasificar | Eurostat (encuestas CE) | `ei_bsco_m` | M | 1986-06 → 2026-10 | NSA, SA | Verificado |
| 4 | PIB en volumen | Actividad | Serie de referencia del ciclo | Eurostat | `namq_10_gdp` | T | 1995-T1 → 2026-T3 | NSA, SA, CA, SCA | Verificado |
| 5 | Producción industrial | Actividad | Coincidente | Eurostat | `sts_inpr_m` | M | 1992-01 → 2026-09 (SCA) | NSA, CA, SCA | Verificado |
| 6 | Producción de bienes de equipo | Actividad | Adelantado | Eurostat | `sts_inpr_m` | M | 1992-01 → 2026-09 (SCA) | NSA, CA, SCA | Verificado |
| 7 | Producción de la construcción | Actividad | Sin clasificar | Eurostat | `sts_copr_m` | M | ⚠️ 2005-01 → 2026-09 | NSA, CA, SCA | Verificado |
| 8 | Cifra de negocios de los servicios | Actividad | Sin clasificar | Eurostat | `sts_setu_m` | M | 2000-01 → 2026-08 | NSA, CA, SCA | Verificado |
| 9 | Indicador de sentimiento económico (ESI) | Confianza | Sin clasificar | Eurostat (encuestas CE) | `ei_bssi_m_r2` | M | 1987-04 → 2026-10 | NSA, SA | Verificado, con pendiente |
| 10 | Confianza industrial | Confianza | Sin clasificar | Eurostat (encuestas CE) | `ei_bssi_m_r2` | M | 1987-04 → 2026-10 | NSA, SA | Verificado |
| 11 | Confianza del consumidor | Confianza | Adelantado | Eurostat (encuestas CE) | `ei_bssi_m_r2` | M | 1986-06 → 2026-10 | NSA, SA | Verificado |
| 12 | Confianza de la construcción | Confianza | Sin clasificar | Eurostat (encuestas CE) | `ei_bssi_m_r2` | M | 1989-01 → 2026-10 | NSA, SA | Verificado |
| 13 | Cartera de pedidos de la industria | Confianza | Adelantado | Eurostat (encuestas CE) | `ei_bsin_m_r2` | M | 1987-04 → 2026-10 | NSA, SA | Verificado |
| 14 | Expectativas de producción de la industria | Confianza | Sin clasificar | Eurostat (encuestas CE) | `ei_bsin_m_r2` | M | 1987-04 → 2026-10 | NSA, SA | Verificado |
| 15 | Utilización de la capacidad productiva | Confianza | Adelantado | Eurostat (encuestas CE) | `ei_bsin_q_r2` | ⚠️ T | 1987-T2 → 2026-T4 | NSA, SA | Verificado |
| 16 | Expectativas de empleo en la construcción | Confianza | Adelantado | Eurostat (encuestas CE) | `ei_bsbu_m_r2` | M | 1989-01 → 2026-10 | NSA, SA | Verificado |
| 17 | Deuda de los hogares (% del PIB) | Crédito y financiero | Sin clasificar | Eurostat | `nasq_10_f_bs` | T | 1999-T1 → 2026-T2 | Sin ajuste (saldo) | Verificado |
| 18 | Deuda de las sociedades no financieras | Crédito y financiero | Sin clasificar | Eurostat | `nasq_10_f_bs` | T | 1999-T1 → 2026-T2 | Sin ajuste (saldo) | Verificado |
| 19 | Rendimiento del bono a 10 años | Crédito y financiero | Adelantado (invertido) | Eurostat (origen BCE) | `irt_lt_mcby_m` | M | 1980-01 → 2026-10 | Sin ajuste | Verificado, con pendiente |
| 20 | Financiación a hogares | Crédito y financiero | Sin clasificar | Banco de España | `BE_3_21.1` / `BE_3_21.3` | M | 1994-12 → 2026-09 | Sin ajuste | Verificado |
| 21 | Crédito nuevo para vivienda | Crédito y financiero | Sin clasificar | Banco de España | `BE_19_11.1` | M | ⚠️ 2003-01 → 2026-09 | Sin ajuste | Verificado |
| 22 | Ratio de créditos dudosos | Crédito y financiero | Sin clasificar | Banco de España | `BE_4_3.12` | M | 1980-12 → 2026-08 | Sin ajuste | Verificado ⚠️ cobertura |
| 23 | Índice General de la Bolsa de Madrid (IGBM) | Crédito y financiero | Adelantado | Banco de España (origen Bolsa de Madrid) | `BE_22_25.1` | M | 1985-01 → 2026-09 | Sin ajuste | Verificado, con pendiente |
| 24 | Ventas del comercio minorista (volumen) | Consumo | Sin clasificar | Eurostat | `sts_trtu_m` | M | 2000-01 → 2026-09 (SCA) | NSA, CA, SCA | Verificado |
| 25 | Consumo de los hogares (total y duraderos) | Consumo | Coincidente | Eurostat | `namq_10_fcs` | T | 1995-T1 → 2026-T3 | NSA, SA, CA, SCA | Verificado |
| 26 | Tasa de ahorro de los hogares | Consumo | Sin clasificar | Eurostat | `nasq_10_ki` | T | 1999-T1 → 2026-T2 | NSA, SCA | Verificado |
| 27 | Índice de precios de la vivienda | Vivienda | Sin clasificar | Eurostat | `prc_hpi_q` | T | ⚠️ 2005-T4 → 2026-T2 | ⚠️ Solo sin ajuste | Verificado |
| 28 | Permisos de construcción de viviendas | Vivienda | Sin clasificar | Eurostat | `sts_cobp_m` | M | 2000-01 → 2026-07 (SCA) | NSA, SCA | Verificado |
| 29 | Compraventa de viviendas | Vivienda | Sin clasificar | INE | `ETDP1826` | M | ⚠️ 2007-01 → 2026-09 | ⚠️ Solo serie original | Verificado |
| 30 | IPCA (inflación armonizada) | Precios | Sin clasificar | Eurostat | `prc_hicp_minr` | M | 1997-01 → 2026-10 | Sin ajuste | Verificado, con pendiente |

Recuento por clasificación: 7 adelantados, 3 coincidentes, 1 serie de referencia del ciclo, 1 retrasado y 18 sin clasificar.

## 2. Método de verificación

### 2.1 Cómo se verificó

- **Datos:** consultas reales a las API de cada organismo el 2026-11-20. El primer y el último dato salen de los datos devueltos, no de los metadatos.
- **Rupturas:** banderas de las observaciones (en Eurostat, `b` = ruptura de serie) y notas metodológicas oficiales. En ninguna serie española consultada de Eurostat aparece la bandera `b` desde 2000.
- **Retraso, calendario, ajustes y licencia:** fichas metodológicas oficiales (ESMS de Eurostat, metodologías del INE, catálogo y avisos del Banco de España).
- **Clasificación:** solo con una fuente explícita (§2.3). Si no la hay, «sin clasificar».
- **Herramientas:** `curl` y Python de la biblioteca estándar para leer las respuestas, y `pdftotext` (poppler 25.07.0, instalado en la máquina del autor, fuera del proyecto) para leer PDF. Ningún script ni dependencia quedó en el repositorio.

### 2.2 Datos comunes por organismo

| | Eurostat | INE | Banco de España |
|---|---|---|---|
| **Acceso** | API de estadísticas, JSON-stat: `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{conjunto}?geo=ES&…` ([documentación](https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/api-getting-started/api)) | API JSON Tempus3: `https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/{serie}` ([documentación](https://www.ine.es/dyngs/DAB/index.htm?cid=1099)) | API JSON: `https://app.bde.es/bierest/resources/srdatosapp/listaSeries?idioma=es&series={código}&rango=MAX` ([documentación](https://www.bde.es/webbe/es/estadisticas/recursos/api-estadisticas-bde.html)). También CSV por tabla y catálogo completo (`catalogo_be.csv`) |
| **Notas técnicas** | Cada observación lleva bandera (`p` provisional, `e` estimado, `d` definición distinta, `b` ruptura…) | Cada dato indica «Provisional» o «Definitivo»: útil para guardar la fecha de revisión | La respuesta viene comprimida (gzip) y las fechas en orden descendente. Sin marca de provisionalidad |
| **Calendario** | <https://ec.europa.eu/eurostat/news/release-calendar> | <https://www.ine.es/dynt3/Calendario/calenHTML.htm> | <https://www.bde.es/webbe/es/estadisticas/calendario/calendario-difusion-estadisticas.html> |
| **Licencia** | Reutilización autorizada, también comercial, citando la fuente (Decisión de la Comisión de 12-12-2011). **Excepción:** los datos «belonging to sources other than Eurostat» solo pueden reutilizarse con fines no comerciales ([copyright notice](https://ec.europa.eu/eurostat/web/main/help/copyright-notice)) | CC BY 4.0: citar la fuente y la fecha de la última actualización; no sugerir que el INE respalda el uso ([aviso legal](https://www.ine.es/dyngs/AYU/index.htm?cid=125)). ⚠️ El pie de página de la web dice «CC BY-SA 4.0»; prevalece el texto del aviso legal | Sin licencia abierta. Uso permitido si se reproduce fielmente, se cita al Banco de España como fuente y, si se hacen cálculos, se indica que la fuente es el Banco de España. Los enlaces a su web deben abrirse en ventana independiente ([aviso legal](https://www.bde.es/wbe/es/pie/aviso-legal/)) |

Encuestas de la Comisión Europea (DG ECFIN), difundidas por Eurostat: el contenido de la Comisión está bajo CC BY 4.0 salvo indicación contraria ([Commission legal notice](https://commission.europa.eu/legal-notice_en)). Se publican dos días hábiles antes del final del mes de referencia (ESMS `ei_bcs`, 8.1). En caso de cambio metodológico, los institutos colaboradores deben aportar series retrospectivas coherentes (ESMS `ei_bcs`, 15.2).

### 2.3 Fuentes de la clasificación

| Fuente | Qué clasifica | Referencia |
|---|---|---|
| OCDE · componentes del CLI de España | Adelantados: utilización de la capacidad (encuesta industrial), expectativas de empleo en la construcción, confianza del consumidor, precios de servicios sin vivienda (invertido), IGBM y matriculaciones | Metadatos de referencia del conjunto `DSD_STES@DF_CLI`, campo «Sector coverage»: `https://sdmx.oecd.org/public/rest/v2/data/dataflow/OECD.SDD.STES/DSD_STES@DF_CLI/4.1/ESP.*.*.*.*.*.*.*.*?attributes=msd&measures=none`. Coincide con el icono «i» del OECD Data Explorer |
| OCDE · serie de referencia | PIB como serie de referencia del ciclo desde abril de 2012 (antes, producción industrial) | Descripción del conjunto `DSD_STES@DF_CLI` y FAQ de la OCDE (pregunta 8) |
| The Conference Board · LEI y CEI de España | Adelantados: componente de bienes de equipo de la producción industrial, cartera de pedidos, rendimiento del bono a largo plazo (invertido), índice bursátil, M2 y colocaciones. Coincidentes: consumo final, producción industrial, importaciones reales, encuesta de ventas minoristas y empleo | <https://www.conference-board.org/topics/business-cycle-indicators/spain> (nota del 2026-11-11) |
| Eurostat · *Handbook on Cyclical Composite Indicators* (2017, KS-GQ-17-003) | Paro: «typically unemployment is lagging and persistent rather than coincident, particularly in Europe» (p. 77 del PDF). Coincidentes para España: consumo final de los hogares, producción industrial y encuesta de ventas minoristas (p. 89, tomados de la Conference Board) | <https://ec.europa.eu/eurostat/web/products-manuals-and-guidelines/-/ks-gq-17-003> |

## 3. Detalle por indicador

Formato de cada ficha: clasificación · organismo y códigos · periodicidad y fechas · discontinuidad · rupturas desde 2000 · retraso · calendario · ajustes · desgloses · unidad · acceso · licencia · estado. Cuando un dato es común al organismo se remite a §2.2.

### Mercado laboral

#### 1. Tasa de paro
- **Clasificación:** retrasado. Fuente: *Handbook on Cyclical Composite Indicators*, p. 77.
- **Organismo y códigos:** Eurostat · `une_rt_m` · serie de cabecera `M.SA.TOTAL.PC_ACT.T.ES`.
- **Periodicidad y fechas:** mensual · 1986-04 → 2026-09.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** ninguna bandera `b`. Eurostat ajusta las rupturas de la EPA en la serie mensual (ESMS `une_rt_m`, 15.2). Revisión, no ruptura: datos de 2021-01 a 2023-12 revisados por el Censo 2021, publicados el 3-5-2024 (ESMS, sección de revisiones). Bandera `d` (definición distinta) solo en 1995-12.
- **Metodología relevante:** para España, Eurostat combina la EPA trimestral con el paro registrado mensual mediante desagregación temporal de Denton; los últimos meses son previsiones hasta que se publica la EPA (ESMS, anexo técnico). Se revisa con frecuencia.
- **Retraso:** unos 31 días tras el mes de referencia (ESMS, 14.1).
- **Calendario:** Eurostat (§2.2).
- **Ajustes:** NSA, SA, TC.
- **Desgloses:** sexo (T, M, F); edad (TOTAL, Y_LT25, Y25-74). Ver §4.
- **Unidad:** % de la población activa (`PC_ACT`) o miles de personas (`THS_PER`).
- **Acceso:** API de Eurostat, JSON-stat.
- **Licencia:** Eurostat (§2.2).
- **Estado:** verificado · `…/data/une_rt_m?geo=ES` · 2026-11-20.

#### 2. Empleo (contabilidad nacional)
- **Clasificación:** coincidente. Fuente: Conference Board, componente «Employment» del CEI de España.
- **Organismo y códigos:** Eurostat · `namq_10_pe` · `na_item=EMP_DC` (empleo, concepto interior), `unit=THS_PER`.
- **Periodicidad y fechas:** trimestral · 1995-T1 → 2026-T3.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** ninguna bandera `b`. Bandera `p` (provisional) desde 2024-T1. Las cuentas siguen el SEC 2010; las rupturas, si existen, se señalan (ESMS `nama_10_pe`, 15.2).
- **Retraso:** los países deben enviar el empleo trimestral a t+2 meses (ESMS, 14.1). La fecha nacional es la de la contabilidad trimestral del INE: pendiente (§8).
- **Calendario:** Eurostat; nacional, INE (§2.2).
- **Ajustes:** NSA, SA, CA, SCA.
- **Desgloses:** asalariados y autónomos; concepto nacional e interior; población.
- **Unidad:** miles de personas o variaciones porcentuales.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/namq_10_pe?geo=ES&na_item=EMP_DC&unit=THS_PER` · 2026-11-20.

#### 3. Expectativas de paro de los consumidores
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat, a partir de las encuestas de la Comisión Europea · `ei_bsco_m` · `indic=BS-UE-NY`.
- **Periodicidad y fechas:** mensual · 1986-06 → 2026-10.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** ninguna bandera. Ver la nota sobre encuestas de §2.2. Pendiente: la Comisión publicó el 8-1-2026 una nota de «restauración de series coherentes de la encuesta de consumidores de España 2025» (§8).
- **Retraso:** se publica antes de terminar el mes de referencia (§2.2).
- **Calendario:** Eurostat y comunicado de la Comisión (§2.2).
- **Ajustes:** NSA, SA.
- **Desgloses:** el conjunto incluye 12 preguntas de la encuesta a consumidores.
- **Unidad:** saldo de respuestas.
- **Acceso:** API de Eurostat; alternativa: ficheros ZIP de la Comisión.
- **Licencia:** encuestas de la Comisión (§2.2). Pendiente de confirmar la excepción de «otras fuentes» de Eurostat (§8).
- **Estado:** verificado · `…/data/ei_bsco_m?geo=ES&indic=BS-UE-NY&s_adj=SA` · 2026-11-20.

### Actividad

#### 4. PIB en volumen
- **Clasificación:** serie de referencia del ciclo económico. Fuente: OCDE (el CLI apunta al PIB desde abril de 2012). Las fechas de recesión de la AEE se basan también en el PIB trimestral (§6).
- **Organismo y códigos:** Eurostat · `namq_10_gdp` · `na_item=B1GQ`, `unit=CLV20_MEUR` (volumen encadenado, referencia 2020) o `CLV_PCH_PRE` (variación trimestral).
- **Periodicidad y fechas:** trimestral · 1995-T1 → 2026-T3.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** ninguna bandera `b`. Bandera `p` desde 2024-T1. Revisiones de referencia del INE: pendiente (§8).
- **Retraso:** fijado por el programa de transmisión del SEC 2010 (ESMS, 14.1). Fecha nacional: pendiente (§8).
- **Calendario:** Eurostat; nacional, INE.
- **Ajustes:** NSA, SA, CA, SCA. España aplica corrección de calendario (ESMS, sección de ajuste estacional).
- **Desgloses:** 39 componentes de la oferta, la demanda y las rentas.
- **Unidad:** millones de euros encadenados, índices o %.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/namq_10_gdp?geo=ES&na_item=B1GQ&unit=CLV20_MEUR&s_adj=SCA` · 2026-11-20.

#### 5. Producción industrial
- **Clasificación:** coincidente. Fuentes: Conference Board (CEI de España) y *Handbook*, p. 89.
- **Organismo y códigos:** Eurostat, a partir del IPI del INE · `sts_inpr_m` · `nace_r2=B-D`, `unit=I21`.
- **Periodicidad y fechas:** mensual · NSA desde 1975-01; CA y SCA 1992-01 → 2026-09.
- **Discontinuidad:** no. ⚠️ Ruptura futura: el INE anuncia la primera publicación con CNAE-2025 en marzo de 2028 (página de la operación IPI del INE).
- **Rupturas desde 2000:** el INE cambia de base cada cinco años (2000, 2005, 2010, 2015 y 2021; manual metodológico base 2021, §6, <https://www.ine.es/daco/daco43/metoipi21.pdf>). Eurostat publica la serie enlazada en base 2021, enlazada por la fuente. Toda la serie SCA lleva la bandera `p` porque se reestima con cada actualización del ajuste estacional.
- **Retraso:** envío a Eurostat a t+1 mes y 10 días (ESMS `sts`, 14.1); el INE publicó septiembre de 2026 el 6-11-2026 (unos 37 días).
- **Calendario:** Eurostat; nacional, INE.
- **Ajustes:** NSA, CA, SCA.
- **Desgloses:** ramas CNAE y destino económico (bienes de equipo, intermedios, consumo y energía).
- **Unidad:** índice 2021 = 100 (también 2015 y 2010) o variaciones.
- **Acceso:** API de Eurostat; alternativa: API del INE (tablas 60280 y siguientes).
- **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/sts_inpr_m?geo=ES&nace_r2=B-D&unit=I21&s_adj=SCA` · 2026-11-20.

#### 6. Producción de bienes de equipo
- **Clasificación:** adelantado. Fuente: Conference Board, «Capital Equipment Component of Industrial Production» (LEI de España).
- **Organismo y códigos:** Eurostat · `sts_inpr_m` · `nace_r2=MIG_CAG`, `unit=I21`.
- **Periodicidad y fechas:** mensual · SCA 1992-01 → 2026-09.
- **Discontinuidad / rupturas / retraso / calendario / ajustes / unidad / acceso / licencia:** como el indicador 5.
- **Desgloses:** es en sí un desglose del IPI por destino económico.
- **Estado:** verificado · `…/data/sts_inpr_m?geo=ES&nace_r2=MIG_CAG&unit=I21&s_adj=SCA` · 2026-11-20.

#### 7. Producción de la construcción
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `sts_copr_m` · `nace_r2=F`, `unit=I21`.
- **Periodicidad y fechas:** mensual · ⚠️ **2005-01** → 2026-09 (empieza después de 2000).
- **Discontinuidad:** no. El índice de producción de la construcción del INE (IPCO) es reciente: tablas desde 2021 y 2025; no sustituye a esta serie para el periodo histórico.
- **Rupturas desde 2000:** ninguna bandera `b`. Comparabilidad general de las STS «muy buena desde el año 2000» (ESMS `sts`, 15.2).
- **Retraso:** envío a t+1 mes y 15 días (ESMS `sts`, 14.1).
- **Calendario:** Eurostat.
- **Ajustes:** NSA, CA, SCA.
- **Desgloses:** edificación, obra civil y actividades especializadas.
- **Unidad:** índice 2021 = 100.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/sts_copr_m?geo=ES&nace_r2=F&unit=I21` · 2026-11-20.

#### 8. Cifra de negocios de los servicios
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `sts_setu_m` · `nace_r2=H-N_X_K` (servicios de mercado sin comercio ni finanzas), `indic_bt=NETTUR`.
- **Periodicidad y fechas:** mensual · 2000-01 → 2026-08 (`G-N_X_K` hasta 2026-07).
- **Discontinuidad:** no. ⚠️ Es **nominal**: la serie en volumen (`VOL_SLS`) no existe para España, y la producción de servicios en volumen (`sts_sepr_m`) solo existe desde 2021-01.
- **Rupturas desde 2000:** ninguna bandera `b`. Serie SCA con la bandera `p`.
- **Retraso:** envío a t+2 meses (ESMS `sts`, 14.1).
- **Calendario:** Eurostat.
- **Ajustes:** NSA, CA, SCA.
- **Desgloses:** 43 agregados y ramas de servicios.
- **Unidad:** índice 2021 = 100.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/sts_setu_m?geo=ES&nace_r2=H-N_X_K&indic_bt=NETTUR&unit=I21&s_adj=SCA` · 2026-11-20.

### Confianza

Fichas comunes a los indicadores 9 a 16: encuestas armonizadas de la Comisión Europea difundidas por Eurostat. Institutos colaboradores en España: MINTUR (industria y construcción), INE (servicios y comercio) y GfK (consumidores) ([partner institutes](https://economy-finance.ec.europa.eu/economic-forecast-and-surveys/business-and-consumer-surveys/methodology-business-and-consumer-surveys/partner-institutes_en)). Retraso, calendario y licencia en §2.2. Sin banderas en ninguna serie consultada.

#### 9. Indicador de sentimiento económico (ESI)
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat / Comisión Europea · `ei_bssi_m_r2` · `indic=BS-ESI-I`.
- **Periodicidad y fechas:** mensual · 1987-04 → 2026-10.
- **Discontinuidad:** no, pero ⚠️ **dos de sus componentes sectoriales se interrumpen en 2024-09 para España**: la confianza del comercio minorista (`BS-RCI-BAL`, 1988-09 → 2024-09) y la de los servicios (`BS-SCI-BAL`, 1996-10 → 2024-09). No se ha encontrado la causa ni cómo se calcula desde entonces el ESI español (§8).
- **Rupturas desde 2000:** ninguna bandera.
- **Ajustes:** NSA, SA.
- **Desgloses:** confianzas sectoriales (indicadores 10 a 12).
- **Unidad:** índice (media de largo plazo = 100).
- **Acceso:** API de Eurostat; alternativa: `main_indicators_sa_nace2.zip` de la Comisión.
- **Estado:** verificado, con pendiente · `…/data/ei_bssi_m_r2?geo=ES&s_adj=SA` · 2026-11-20.

#### 10. Confianza industrial
- **Clasificación:** sin clasificar.
- **Códigos:** `ei_bssi_m_r2` · `indic=BS-ICI-BAL`.
- **Fechas:** 1987-04 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo · **Desgloses:** preguntas en `ei_bsin_m_r2`.
- **Estado:** verificado · 2026-11-20.

#### 11. Confianza del consumidor
- **Clasificación:** adelantado. Fuente: OCDE, componente del CLI de España («Consumer survey – confidence indicator sa»). Apoyo adicional y más débil: *Handbook*, p. 118.
- **Códigos:** `ei_bssi_m_r2` · `indic=BS-CSMCI-BAL`.
- **Fechas:** 1986-06 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo · **Desgloses:** preguntas en `ei_bsco_m`.
- **Pendiente:** nota de la Comisión «Restoration of consistent consumer survey time series for Spain 2025» (8-1-2026), sin leer (§8).
- **Estado:** verificado · 2026-11-20.

#### 12. Confianza de la construcción
- **Clasificación:** sin clasificar.
- **Códigos:** `ei_bssi_m_r2` · `indic=BS-CCI-BAL`.
- **Fechas:** 1989-01 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo · **Desgloses:** preguntas en `ei_bsbu_m_r2`.
- **Estado:** verificado · 2026-11-20.

#### 13. Cartera de pedidos de la industria
- **Clasificación:** adelantado. Fuente: Conference Board, «Order Books Survey» (LEI de España).
- **Códigos:** `ei_bsin_m_r2` · `indic=BS-IOB`, `unit=BAL`.
- **Fechas:** 1987-04 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo · **Desgloses:** también cartera de exportación (`BS-IEOB`).
- **Estado:** verificado · 2026-11-20.

#### 14. Expectativas de producción de la industria
- **Clasificación:** sin clasificar.
- **Códigos:** `ei_bsin_m_r2` · `indic=BS-IPE`.
- **Fechas:** 1987-04 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo.
- **Estado:** verificado · 2026-11-20.

#### 15. Utilización de la capacidad productiva
- **Clasificación:** adelantado. Fuente: OCDE, componente del CLI de España («Manufacturing survey – rate of capacity utilization sa»).
- **Códigos:** `ei_bsin_q_r2` · `indic=BS-ICU-PC`.
- **Fechas:** ⚠️ **trimestral** · 1987-T2 → 2026-T4. La encuesta se hace en el primer mes de cada trimestre (ESMS `ei_bcs`, 14.1), de ahí que ya haya dato de 2026-T4.
- **Ajustes:** NSA, SA · **Unidad:** % de la capacidad · **Desgloses:** el conjunto incluye factores que limitan la producción y nuevos pedidos.
- **Nota:** el INE publica también una utilización de la capacidad dentro de sus Indicadores de Confianza Empresarial, pero solo desde 2021 (tabla 47120).
- **Estado:** verificado · `…/data/ei_bsin_q_r2?geo=ES&indic=BS-ICU-PC` · 2026-11-20.

#### 16. Expectativas de empleo en la construcción
- **Clasificación:** adelantado. Fuente: OCDE, componente del CLI de España («Construction survey – employment: future tendency sa»).
- **Códigos:** `ei_bsbu_m_r2` · `indic=BS-CEME-BAL`.
- **Fechas:** 1989-01 → 2026-10 · **Ajustes:** NSA, SA · **Unidad:** saldo · **Desgloses:** el conjunto incluye actividad, cartera de pedidos, precios y factores limitativos.
- **Estado:** verificado · `…/data/ei_bsbu_m_r2?geo=ES&indic=BS-CEME-BAL` · 2026-11-20.

### Crédito y financiero

**Deuda de los hogares.** Se decidió mantener dos medidas complementarias:
- **A · saldo de deuda en % del PIB** (indicador 17). Mide la vulnerabilidad y es el concepto que usa el MIP.
- **B · crédito** (indicadores 20 y 21). Es mensual y más sensible al giro del ciclo.

#### 17. Deuda de los hogares (% del PIB)
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `nasq_10_f_bs` · `sector=S14_S15` (hogares e ISFLSH), `finpos=LIAB`, `na_item=F4` (préstamos). Valores representativos (`F3`) igual a 0 para España.
- **Periodicidad y fechas:** trimestral · `PC_GDP` 1999-T1 → 2026-T2; `MIO_EUR` 1998-T4 → 2026-T2.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** ninguna bandera `b`. La ratio sobre el PIB lleva la bandera `p` desde 2024-T1. Las rupturas, si existen, se señalan (ESMS `nasq_10_f`, 15.2).
- **Retraso:** el BCE publica los datos nacionales a t+108 días (ESMS `nasq_10_f`, 14.1).
- **Calendario:** Eurostat.
- **Ajustes:** sin ajuste (es un saldo).
- **Desgloses:** instrumento financiero, activo o pasivo, sector.
- **Unidad:** % del PIB o millones de euros.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat.
- **Nota:** el cuadro del MIP usa una medida anual y consolidada (`tipspd22`, valores representativos y préstamos), con un umbral del 55 % del PIB (§5.3).
- **Estado:** verificado · `…/data/nasq_10_f_bs?geo=ES&sector=S14_S15&finpos=LIAB&na_item=F4&unit=PC_GDP` · 2026-11-20.

#### 18. Deuda de las sociedades no financieras
- **Clasificación:** sin clasificar.
- **Códigos:** `nasq_10_f_bs` · `sector=S11`, `finpos=LIAB`, `na_item=F3` y `F4`.
- **Fechas:** `PC_GDP` 1999-T1 → 2026-T2 · resto de campos como el indicador 17.
- **Estado:** verificado · 2026-11-20.

#### 19. Rendimiento del bono a 10 años
- **Clasificación:** adelantado (con el signo invertido). Fuente: Conference Board, «Long Term Government Bond Yield (inverted)» (LEI de España).
- **Organismo y códigos:** Eurostat · `irt_lt_mcby_m` · `int_rt=MCBY` (rendimiento del criterio de convergencia de la UEM).
- **Periodicidad y fechas:** mensual · 1980-01 → 2026-10.
- **Discontinuidad:** no. **Rupturas desde 2000:** «data can be compared over time» (ESMS `irt_lt_mcby`, 15.2).
- **Retraso:** unos diez días tras el mes (ESMS, 14.1).
- **Calendario:** Eurostat y BCE (ESMS, 8.1).
- **Ajustes:** sin ajuste (media mensual publicada por la fuente).
- **Desgloses:** ninguno.
- **Unidad:** %.
- **Acceso:** API de Eurostat.
- **Licencia:** Eurostat, con la excepción de «otras fuentes»: el dato procede del BCE. Pendiente (§8).
- **Estado:** verificado, con pendiente de licencia · `…/data/irt_lt_mcby_m?geo=ES` · 2026-11-20.

#### 20. Financiación a hogares
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Banco de España · Boletín Estadístico, capítulo 3 (indicadores de liquidez y financiación, SEC 2010). Saldo `BE_3_21.1` (API: `DCF_M.N.ES.W0.S1M.S1.N.L.LE.FD.T._Z.XDC._T.M.V.N._T`); tasa interanual `BE_3_21.3` (API: `DCF_M.N.ES.W0.S1M.S1.N.L.LE.FD.T._Z.XDC._T.M.V.TVA._T`).
- **Periodicidad y fechas:** mensual · saldo 1994-12 → 2026-09; tasa 1995-12 → 2026-09.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** el catálogo no incluye notas para estas series. Pendiente de confirmar en la metodología del BdE (§8).
- **Retraso:** pendiente (calendario del BdE, §8). El dato de 2026-09 estaba disponible el 2026-11-20.
- **Calendario:** Banco de España.
- **Ajustes:** sin ajuste.
- **Desgloses:** préstamos para vivienda (`BE_3_21.4` a `.6`), consumo (`.7` a `.9`) y otros fines (`.10` a `.12`); préstamos del exterior (`BE_3_21.15`, desde 2012-12).
- **Unidad:** miles de euros; tasa en %.
- **Acceso:** API del BdE (§2.2).
- **Licencia:** Banco de España (§2.2).
- **Estado:** verificado · API `listaSeries` con ambos códigos, `rango=MAX` · 2026-11-20.

#### 21. Crédito nuevo para vivienda
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Banco de España · `BE_19_11.1` (API: `DN_1TI2TIE96`), importes totales estimados de nuevas operaciones de crédito para vivienda a hogares e ISFLSH.
- **Periodicidad y fechas:** mensual · ⚠️ **2003-01** → 2026-09.
- **Discontinuidad:** no. ⚠️ **Decisión registrada (opción a):** se usa el total desde 2003, que **incluye las renegociaciones**. Hasta 2014 la fuente no distingue el origen. Desde 2015-01 el BdE lo diferencia: renegociados `BE_19_11.2` (`DN_1TI2TIE97`) y sin renegociaciones `BE_19_11.3` (`DN_1TI2TIE98`). Estas dos series se guardan como desglose desde 2015; no se empalman.
- **Rupturas desde 2000:** sin notas en el catálogo; la diferenciación desde 2015 es un cambio de desglose, no de la serie total.
- **Retraso:** pendiente (§8). **Calendario:** Banco de España.
- **Ajustes:** sin ajuste.
- **Desgloses:** renegociados desde 2015; también existe el crédito nuevo al consumo (`BE_19_11.5`, desde 2003) y a otros fines (`BE_19_11.8`, desde 2003).
- **Unidad:** millones de euros.
- **Acceso:** API del BdE. **Licencia:** Banco de España.
- **Alternativa anotada:** la estadística de hipotecas del INE (HPT, apartado 7) cubre el mismo campo.
- **Estado:** verificado · API `listaSeries?series=DN_1TI2TIE96,DN_1TI2TIE98&rango=MAX` · 2026-11-20.

#### 22. Ratio de créditos dudosos
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Banco de España · `BE_4_3.12` (API: `D_BEEA2020`), «Entidades de crédito y EFC. Créditos a otros sectores residentes. Ratio de dudosidad».
- **Periodicidad y fechas:** mensual · 1980-12 → 2026-08.
- **⚠️ Cobertura:** «otros sectores residentes», es decir, **hogares y empresas juntos**. El BdE no publica una ratio solo de hogares. Publica los dudosos de hogares (`BE_4_13.17`, trimestral en la práctica, desde 1998-12) y el crédito a hogares (`BE_4_13.3`), pero calcular la ratio sería un cálculo propio, no la metodología oficial. Queda fuera.
- **Discontinuidad:** no. **Rupturas desde 2000:** sin notas en el catálogo; pendiente (§8).
- **Retraso:** pendiente (§8). **Calendario:** Banco de España.
- **Ajustes:** sin ajuste. **Desgloses:** entidades de depósito (`BE_4_53.12`) y EFC (`BE_4_83.13`).
- **Unidad:** % (la API indica el símbolo «%»; el catálogo CSV dice «Euros», una incoherencia del catálogo).
- **Acceso:** API del BdE. **Licencia:** Banco de España.
- **Estado:** verificado · API `listaSeries?series=D_BEEA2020&rango=MAX` · 2026-11-20.

#### 23. Índice General de la Bolsa de Madrid (IGBM)
- **Clasificación:** adelantado. Fuente: OCDE, componente del CLI de España («Share prices: IGBM general index»). La Conference Board incluye además un índice bursátil español en su LEI.
- **Organismo y códigos:** Banco de España · `BE_22_25.1` (API: `D_$G500JA0`). Fuente original según el catálogo: «BOLSA DE MADRID».
- **Periodicidad y fechas:** mensual · 1985-01 → 2026-09.
- **Discontinuidad:** no. **Rupturas desde 2000:** sin notas en el catálogo.
- **Retraso:** pendiente (§8). **Calendario:** Banco de España.
- **Ajustes:** sin ajuste. **Desgloses:** ninguno en esta serie.
- **Unidad:** índice, base 31-12-1985 = 100. Pendiente: si el valor mensual es una media o un cierre de mes.
- **Acceso:** API del BdE.
- **Licencia:** ⚠️ pendiente. El aviso legal del BdE cubre su web, pero el dato es de un tercero (Bolsa de Madrid) (§8).
- **Estado:** verificado, con pendiente de licencia · API `listaSeries?series=D_%24G500JA0&rango=MAX` · 2026-11-20.

### Consumo

#### 24. Ventas del comercio minorista (volumen)
- **Clasificación:** sin clasificar. La Conference Board y el *Handbook* clasifican como coincidente la *encuesta* de ventas minoristas, no este índice.
- **Organismo y códigos:** Eurostat, a partir del ICM del INE · `sts_trtu_m` · `nace_r2=G47`, `indic_bt=VOL_SLS`, `unit=I21`.
- **Periodicidad y fechas:** mensual · SCA 2000-01 → 2026-09 (sin carburantes, `G47_X_G473`, desde 1995-01).
- **Discontinuidad:** no. **Rupturas desde 2000:** ninguna bandera `b`; serie SCA con la bandera `p`.
- **Retraso:** envío a t+2 meses (ESMS `sts`, 14.1). **Calendario:** Eurostat; nacional, INE.
- **Ajustes:** NSA, CA, SCA.
- **Desgloses:** 38 ramas del comercio (alimentación, no alimentación, carburantes, venta por internet…).
- **Unidad:** índice 2021 = 100.
- **Acceso:** API de Eurostat. **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/sts_trtu_m?geo=ES&nace_r2=G47&indic_bt=VOL_SLS&unit=I21` · 2026-11-20.

#### 25. Consumo de los hogares (total y bienes duraderos)
- **Clasificación:** coincidente. Fuentes: Conference Board («Final Consumption Expenditure», CEI de España) y *Handbook*, p. 89.
- **Organismo y códigos:** Eurostat · `namq_10_fcs` · `na_item=P31_S14` (total) y `P311_S14` (duraderos), `unit=CLV20_MEUR`.
- **Periodicidad y fechas:** trimestral · 1995-T1 → 2026-T3.
- **Discontinuidad / rupturas / retraso / calendario / licencia:** como el indicador 4.
- **Ajustes:** NSA, SA, CA, SCA.
- **Desgloses:** duraderos, semiduraderos, no duraderos y servicios.
- **Unidad:** millones de euros encadenados (referencia 2020).
- **Acceso:** API de Eurostat.
- **Estado:** verificado · `…/data/namq_10_fcs?geo=ES&na_item=P31_S14&unit=CLV20_MEUR` · 2026-11-20.

#### 26. Tasa de ahorro de los hogares
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `nasq_10_ki` · `na_item=SRG_S14_S15`.
- **Periodicidad y fechas:** trimestral · 1999-T1 → 2026-T2.
- **Discontinuidad:** no. **Rupturas desde 2000:** las rupturas, si existen, se señalan (ESMS `nasq_10_nf_tr`, 15.2); no hay ninguna bandera.
- **Retraso:** datos nacionales en la base de Eurostat a unos 94, 110 y 120 días (ESMS, 14.1).
- **Calendario:** Eurostat.
- **Ajustes:** NSA, SCA.
- **Desgloses:** el conjunto incluye la renta disponible real per cápita, la tasa de inversión de los hogares y la ratio de activos financieros netos.
- **Unidad:** % de la renta disponible bruta.
- **Acceso:** API de Eurostat. **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/nasq_10_ki?geo=ES&na_item=SRG_S14_S15` · 2026-11-20.

### Vivienda

#### 27. Índice de precios de la vivienda
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `prc_hpi_q` · `purchase=TOTAL`, `unit=I15_Q` o `I25_Q` (también `RCH_Q` y `RCH_A`).
- **Periodicidad y fechas:** trimestral · ⚠️ **2005-T4** → 2026-T2 (empieza después de 2000; los tres primeros trimestres de 2005 vienen sin valor). Eurostat empieza antes que el IPV del INE (2007-T1), por eso se prefiere.
- **Discontinuidad:** no.
- **Rupturas desde 2000:** las rupturas no retropoladas se marcan con `b` (ESMS `prc_hpi_inx`, 15.2); España no tiene ninguna.
- **Retraso:** un trimestre y una semana (ESMS, 14.1). **Calendario:** Eurostat.
- **Ajustes:** ⚠️ solo sin ajuste.
- **Desgloses:** vivienda nueva y usada.
- **Unidad:** índice 2015 = 100 o 2025 = 100; variaciones.
- **Acceso:** API de Eurostat. **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/prc_hpi_q?geo=ES` · 2026-11-20.

#### 28. Permisos de construcción de viviendas
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** Eurostat · `sts_cobp_m` · `cpa2_1=CPA_F41001_X_410014` (edificios residenciales salvo residencias colectivas), `indic_bt=BPRM_DW` (número de viviendas), `unit=I21`.
- **Periodicidad y fechas:** mensual · SCA 2000-01 → 2026-07; NSA desde 1995-01 (1995-1999 con la bandera `e`, estimado).
- **Discontinuidad:** no. **Rupturas desde 2000:** ninguna bandera.
- **Retraso:** envío a t+3 meses (ESMS `sts`, 14.1). **Calendario:** Eurostat.
- **Ajustes:** NSA, SCA.
- **Desgloses:** unifamiliares y plurifamiliares; superficie (m²); edificios no residenciales. Existe también la versión trimestral (`sts_cobp_q`).
- **Unidad:** índice 2021 = 100.
- **Acceso:** API de Eurostat. **Licencia:** Eurostat.
- **Estado:** verificado · `…/data/sts_cobp_m?geo=ES&cpa2_1=CPA_F41001_X_410014&indic_bt=BPRM_DW&unit=I21` · 2026-11-20.

#### 29. Compraventa de viviendas
- **Clasificación:** sin clasificar.
- **Organismo y códigos:** INE · Estadística de Transmisiones de Derechos de la Propiedad (ETDP) · tabla 6150 · serie `ETDP1826` (total nacional, compraventa, número).
- **Periodicidad y fechas:** mensual · ⚠️ **2007-01** → 2026-09. Definitivos hasta 2025-12; provisionales en 2026.
- **Discontinuidad:** no.
- **⚠️ Ajustes:** solo serie original; ninguna de las 17 tablas de la operación está corregida. **Decisión registrada:** entra sin desestacionalizar porque no existe otra medida que cubra el campo. La alternativa de Eurostat (`prc_hpi_hsnq`) tampoco está ajustada y empieza más tarde (2008-T1).
- **Rupturas desde 2000:** no consta ninguna; pendiente de revisar la metodología del INE (§8).
- **Retraso:** unos 48 días (septiembre de 2026 se publicó el 17-11-2026).
- **Calendario:** INE.
- **Desgloses:** vivienda nueva o usada, libre o protegida (`ETDP1822` a `ETDP1825`); comunidades autónomas.
- **Unidad:** número de viviendas.
- **Acceso:** API del INE. **Licencia:** INE, CC BY 4.0.
- **Estado:** verificado · `https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/ETDP1826?nult=600` · 2026-11-20.

### Precios

#### 30. IPCA (índice de precios de consumo armonizado)
- **Clasificación:** sin clasificar. Nota: la OCDE usa como componente adelantado del CLI de España los «precios de servicios sin vivienda, invertidos», que es otra serie (§2.3).
- **Organismo y códigos:** Eurostat · `prc_hicp_minr` · `coicop18=TOTAL`, `unit=RCH_A` (tasa anual) o `I25` (índice 2025 = 100).
- **Periodicidad y fechas:** mensual · índice 1996-01 → 2026-10; tasa 1997-01 → 2026-10.
- **Discontinuidad:** ⚠️ el conjunto anterior `prc_hicp_manr` («(1997-2025)») termina en 2025-12. Su sustituto es `prc_hicp_minr` (ECOICOP versión 2), que Eurostat publica desde 1996: es una serie enlazada por la propia fuente.
- **Rupturas desde 2000:** «Potential breaks in the HICP data for January 2026 are possible» por el cambio de clasificación y de método (ESMS `prc_hicp`, 15.2). Pendiente de confirmar con el INE (§8).
- **Retraso:** entre 15 y 18 días (ESMS, 14.1). **Calendario:** Eurostat (indicadores del euro).
- **Ajustes:** sin ajuste.
- **Desgloses:** 555 rúbricas de la ECOICOP.
- **Unidad:** % o índice.
- **Acceso:** API de Eurostat. **Licencia:** Eurostat.
- **Estado:** verificado, con pendiente · `…/data/prc_hicp_minr?geo=ES&coicop18=TOTAL` · 2026-11-20.

## 4. Especificación de la tasa de paro (`une_rt_m`)

| Aspecto | Resultado |
|---|---|
| Existe | Sí: «Unemployment by sex and age – monthly data», actualizado el 2026-11-19. ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/une_rt_m_esms.htm> |
| Definición | Personas de 15 a 74 años sin empleo, que han buscado trabajo activamente en las cuatro semanas anteriores y están disponibles en dos semanas (ESMS, apartado de conceptos y definiciones) |
| Versiones de ajuste | `NSA`, `SA`, `TC`. No existe la versión corregida de calendario |
| Grupos de edad | `TOTAL` (15-74), `Y_LT25` (menores de 25) e `Y25-74` |
| Estándar del paro juvenil | Menores de 25 años: «young people (under 25 years)» ([Statistics Explained · Unemployment statistics](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Unemployment_statistics)). ⚠️ El cuadro del MIP usa el tramo 15-24 para el paro juvenil anual (`tipslm80`) |
| Sexo | `T`, `M`, `F` |
| Unidades | `PC_ACT` (% de la población activa) y `THS_PER` (miles de personas) |
| España | 1986-04 → 2026-09 en todas las combinaciones; desagregación de Denton a partir de la EPA y el paro registrado (indicador 1) |

## 5. Fuentes para el futuro semáforo

### 5.1 Indicador compuesto adelantado de la OCDE (CLI)
- **Existe para España:** sí. La OCDE calcula el CLI «only for G20 countries plus Spain and 5 zone aggregates» (metadatos del conjunto).
- **Acceso:** API SDMX, `https://sdmx.oecd.org/public/rest/data/OECD.SDD.STES,DSD_STES@DF_CLI,4.1/ESP.M.LI...AA...` (CSV con la cabecera `Accept: application/vnd.sdmx.data+csv`).
- **Datos:** mensual · 1987-06 → 2026-10 · versión `AA` (amplitude adjusted, ajustada en amplitud), que la OCDE considera su indicador principal.
- **Qué anticipa:** los puntos de giro de la brecha del PIB (PIB real menos su tendencia), con unos 6 a 9 meses de adelanto («Interpreting OECD Composite Leading Indicators», octubre de 2020).
- **Componentes de España:** ver §2.3. Se agregan cuando hay al menos un 60 % de componentes disponibles, mediante encadenamiento (metadatos del conjunto).
- **Licencia:** pendiente. La web de la OCDE no admite consultas automáticas (error 403) (§8).

### 5.2 Regla de Sahm (OCDE)
- **Existe para España:** sí. Es un hallazgo de esta exploración, no estaba en la petición inicial.
- **Qué es:** un indicador de recesión basado en el aumento del paro, adaptado por la OCDE con umbrales específicos por país (descripción del conjunto `DSD_STES@DF_SAHM`).
- **Acceso:** API SDMX, `https://sdmx.oecd.org/public/rest/data/OECD.SDD.STES,DSD_STES@DF_SAHM,/ESP.........`.
- **Datos:** mensual · 1990-01 → 2026-09 · tres medidas: `LORTRESA` (indicador, en puntos porcentuales), `LORTRESG` (distancia al umbral) y `LORTRERS` (señal de recesión).
- **Licencia:** pendiente (como la del CLI).

### 5.3 Cuadro del procedimiento de desequilibrios macroeconómicos (MIP)
- **Existe para España:** sí, pero ⚠️ **todos los indicadores principales son anuales** (datos de España 1995-2025 en las tablas consultadas).
- **Indicadores y umbrales oficiales** ([Eurostat · MIP information on data](https://ec.europa.eu/eurostat/web/macroeconomic-imbalances-procedure/information-data)): 13 indicadores principales.

| Área | Indicador | Umbral |
|---|---|---|
| Exterior y competitividad | Saldo por cuenta corriente (media de 3 años, % del PIB) | −4 % / +6 % |
| | Posición de inversión internacional neta (% del PIB) | −35 % |
| | Tipo de cambio efectivo real, 42 socios (variación en 3 años) | ±3 % (zona del euro) |
| | Cuotas de exportación frente a economías avanzadas (variación en 3 años) | −3 % |
| | Coste laboral unitario nominal por hora (variación en 3 años) | 9 % (zona del euro) |
| Interior | Deuda bruta de las administraciones públicas (% del PIB) | 60 % |
| | Deuda de los hogares consolidada (% del PIB) · `tipspd22` | 55 % |
| | Deuda de las sociedades no financieras consolidada (% del PIB) · `tipspd30` | 85 % |
| | Flujo de crédito a los hogares (% del saldo t−1) · `tipspc40` | 14 % |
| | Flujo de crédito a las sociedades no financieras sin IED (% del saldo t−1) · `tipspc30` | 13 % |
| | Índice de precios de la vivienda nominal (variación anual) · `tipsho20` | 9 % |
| Mercado laboral | Tasa de paro, 15-74 (%) · `tipsun20` | 10 % |
| | Tasa de actividad, 15-64 (variación en 3 años, p. p.) · `tipslm60` | −0,2 p. p. |

- **Acceso:** API de Eurostat, tablas `tips*`. Con datos de España consultados: `tipspd22`, `tipspd20` (deuda privada consolidada) y `tipsun20`; el resto de códigos de la tabla salen del catálogo de Eurostat y no se han consultado uno a uno. ⚠️ `tipspd40` expresa la deuda de los hogares en % de la renta disponible ajustada, no en % del PIB; la tabla del umbral del 55 % es `tipspd22`.
- **Licencia:** Eurostat.

### 5.4 Brecha de crédito sobre el PIB
- **Existe para España:** sí, la publica el Banco de Pagos Internacionales (BIS). En el catálogo del Banco de España no se ha encontrado una serie equivalente.
- **Acceso:** API SDMX del BIS, `https://stats.bis.org/api/v1/data/WS_CREDIT_GAP/Q.ES.P.A.C?format=csv`. Dimensiones: frecuencia, país, prestatario (`P` = sector privado no financiero), prestamista (`A` = todos los sectores) y tipo de dato (`A` = ratio de crédito sobre el PIB, `B` = tendencia con filtro HP, `C` = brecha).
- **Datos:** trimestral · brecha 1980-T1 → 2026-T1; ratio desde 1970-T1 · unidad: % del PIB.
- **Licencia:** ⚠️ las condiciones generales del BIS permiten el uso no comercial y remiten, para los datos del Data Portal, al apartado «About BIS statistics», que no se ha leído (§8) ([BIS terms and conditions](https://www.bis.org/terms_conditions.htm)).

### 5.5 Indicador de sentimiento económico (ESI)
- **Existe para España:** sí. Es el indicador 9 de este inventario: `ei_bssi_m_r2`, `BS-ESI-I`, mensual, 1987-04 → 2026-10.
- **Acceso alternativo:** ficheros de la Comisión en `https://ec.europa.eu/economy_finance/db_indicators/surveys/documents/series/nace2_ecfin_2610/main_indicators_sa_nace2.zip` (lista en la [página de series temporales](https://economy-finance.ec.europa.eu/economic-forecast-and-surveys/business-and-consumer-surveys/download-business-and-consumer-survey-data/time-series_en)). La Comisión prueba además un navegador de datos con API.
- **Pendiente:** su composición en España desde que faltan el comercio y los servicios (2024-09) (§8).

## 6. Fechas oficiales de las recesiones españolas

El Comité de Fechado del Ciclo Económico Español de la Asociación Española de Economía (AEE), creado en diciembre de 2012, publica la cronología oficial de referencia en su web: [archivo histórico del ciclo económico español](https://www.asesec.org/CFCweb/index.php/archivo-historico-del-ciclo-economico-espanol/) (consultado el 2026-11-20).

- Frecuencia trimestral, basada en la contabilidad nacional trimestral del INE.
- Las recesiones empiezan en el pico del ciclo y terminan en el valle.
- Cita sugerida por el Comité: Asociación Española de Economía (2015), «Fechado del ciclo económico español», Comité de Fechado del Ciclo Económico Español.

| Recesión | Pico | Valle | Duración de la recesión | Expansión siguiente |
|---|---|---|---|---|
| Crisis financiera | 2008T2 | 2009T4 | 6 trimestres | 3 trimestres |
| Doble recesión («2011-2012») | **2010T4** | **2013T2** | 12 trimestres | 27 trimestres |
| COVID-19 | 2019T4 | 2020T2 | 2 trimestres | — |

⚠️ Para el Comité, la segunda recesión va de finales de 2010 a mediados de 2013, no solo 2011-2012. El Comité publica también un índice de actividad propio («Índice CF»), que no se ha evaluado.

## 7. Anotados fuera del cuadro

| Indicador | Motivo | Para cuándo |
|---|---|---|
| Afiliación a la Seguridad Social | Organismo fuera de Eurostat, INE y BdE | Versiones posteriores |
| Paro registrado (SEPE) | Organismo fuera de las tres fuentes | Versiones posteriores |
| Matriculaciones de turismos (ANFAC / DGT) | Organismo fuera de las tres fuentes; es componente del CLI de la OCDE | Versiones posteriores |
| Hipotecas sobre viviendas (INE, HPT, `HPT34618` número e `HPT34565` importe; 2003-01 → 2026-08, solo serie original) | El campo ya lo cubre el indicador 21. Lo único que aporta de más es el número de hipotecas | Alternativa, si se quiere el número |
| Confianza del comercio minorista y de los servicios (`ei_bssi_m_r2`, `BS-RCI-BAL` y `BS-SCI-BAL`) | Se interrumpen en 2024-09 para España | Hasta conocer la causa y si existe una serie sustituta |
| Precio de la vivienda del INE (IPV) | Empieza en 2007-T1; Eurostat tiene la serie desde 2005-T4 | Descartado |
| Producción de servicios en volumen (`sts_sepr_m`, IPSS del INE) | Solo desde 2021-01 | Descartado |
| Ratio de morosidad solo de hogares | No se publica; sería un cálculo propio | Decisión de la capa de cálculos |

## 8. Pendientes de verificar

| # | Pendiente | Afecta a | Motivo | Pista para resolverlo |
|---|---|---|---|---|
| P1 | Causa del corte en 2024-09 de las confianzas del comercio y de los servicios, y composición del ESI español desde entonces | 9, §5.5, §7 | No hay ningún aviso en las páginas de la Comisión ni del INE consultadas | Nota de la Comisión sobre preguntas suspendidas (30-7-2024) y «Review of the composition and performance of the ESI» (Gkiouleka, 17-10-2025), en la [página de documentos metodológicos](https://economy-finance.ec.europa.eu/economic-forecast-and-surveys/business-and-consumer-surveys/methodology-business-and-consumer-surveys/methodological-guidelines-and-other-documents_en) |
| P2 | Nota «Restoration of consistent consumer survey time series for Spain 2025» (8-1-2026) | 3, 11 | No leída | Misma página de documentos metodológicos |
| P3 | Licencia de los datos de encuestas difundidos por Eurostat | 3, 9-16 | Eurostat restringe a uso no comercial los datos «de otras fuentes»; la Comisión publica bajo CC BY 4.0 | Confirmar si las encuestas de la Comisión cuentan como «otra fuente» para Eurostat |
| P4 | Licencia del rendimiento del bono (origen BCE) | 19 | Misma excepción de Eurostat | Política de reutilización del BCE |
| P5 | Licencia del IGBM (origen Bolsa de Madrid) y si el valor mensual es una media o un cierre | 23 | Dato de un tercero difundido por el BdE | Catálogo y metodología del BdE, capítulo 22 |
| P6 | Licencia de la OCDE (CLI y regla de Sahm) | §5.1, §5.2 | La web de la OCDE devuelve 403 a las consultas automáticas | Leer las condiciones de uso de la OCDE manualmente |
| P7 | Licencia de los datos del BIS («About BIS statistics») | §5.4 | No leído | <https://www.bis.org/terms_conditions.htm> remite a ese apartado |
| P8 | Retraso de publicación de las series del BdE | 20-23 | No figura en el catálogo | Calendario de difusión del BdE (§2.2) |
| P9 | Fecha de publicación nacional de la contabilidad trimestral y revisiones de referencia del INE (base contable, retropolaciones) | 2, 4, 25 | Páginas de metodología del INE no leídas | Operación CNTR del INE, pestaña de metodología |
| P10 | Rupturas nacionales de la EPA (2005; nuevas ponderaciones por población) | 1 | Eurostat dice que las ajusta en la serie mensual; detalle del INE no leído | Metodología de la EPA del INE |
| P11 | Posible ruptura del IPCA en enero de 2026 (ECOICOP v2) según el INE | 30 | Solo consta el aviso de Eurostat | Metodología del IPCA del INE |
| P12 | Rupturas o cambios metodológicos de la ETDP y de las series del BdE | 20-23, 29 | No constan en el catálogo ni en las tablas | Metodologías respectivas |
| P13 | Clasificación de los 18 indicadores sin clasificar | Varios | Ninguna fuente consultada los clasifica de forma explícita | Literatura del BdE sobre indicadores cíclicos; manual de Eurostat (capítulos no revisados) |

## 9. Decisiones registradas durante el inventario

- Los organismos fuera de Eurostat, INE y BdE se anotan para versiones posteriores (§7).
- Las series que empiezan después de 2000 entran marcadas con ⚠️.
- Las fuentes del semáforo no cuentan como candidatos.
- La deuda de los hogares se sigue con dos medidas complementarias: saldo en % del PIB (17) y crédito (20 y 21).
- Crédito nuevo para vivienda: opción a, total desde 2003 con renegociaciones; desglose de renegociados desde 2015.
- Compraventas: entran sin desestacionalizar porque no hay otra medida que cubra el campo.
- Morosidad: entra la ratio publicada para hogares y empresas juntos.
- Componentes del CLI con fuente oficial: entran como candidatos (15, 16 y 23). El límite de 30 era orientativo.
- No se empalman ni se retropolan series: solo se usan series enlazadas por la propia fuente.
