# Especificación del cuadro de coyuntura

- **Estado:** especificación para la ingesta del bloque 3. Recoge decisiones ya tomadas; no añade ni quita ninguna.
- **Origen de las decisiones:** sesión de tutor A del bloque 2, 2026-11-24. **Decide: Pablo.** La variación del IPCA (§5) la confirmó Pablo el 2026-11-24.
- **Fecha de verificación:** 2026-11-24. Todas las consultas de este documento se hicieron ese día salvo que se indique otra fecha.
- **Documento de partida:** [inventario de fuentes](inventario-fuentes.md). Los números `#` son los de su tabla de candidatos.
- **Cómo se verificó:** consultas a las API de Eurostat, INE y Banco de España (datos y metadatos devueltos ese día) y lectura de las fichas metodológicas oficiales citadas en cada caso. Lo que no se pudo verificar se marca como **pendiente**; los casos que las reglas no resuelven van a las [preguntas para Pablo](#12-preguntas-para-pablo).

Leyenda de ajuste: **NSA** sin ajustar · **SA** desestacionalizada · **CA** corregida de calendario · **SCA** desestacionalizada y corregida de calendario · **TC** tendencia-ciclo.

## Índice

1. [Indicadores y bloques](#1-indicadores-y-bloques)
2. [Reglas generales R1-R7](#2-reglas-generales-r1-r7)
3. [Fichas por indicador](#3-fichas-por-indicador)
4. [Especificación de la tasa de paro](#4-especificación-de-la-tasa-de-paro)
5. [IPCA](#5-ipca)
6. [Episodios de referencia](#6-episodios-de-referencia)
7. [Comparación con antes de cada crisis](#7-comparación-con-antes-de-cada-crisis)
8. [Qué se guarda por serie](#8-qué-se-guarda-por-serie)
9. [Requisitos para el frontend (bloque 6)](#9-requisitos-para-el-frontend-bloque-6)
10. [Bono a 10 años, condicionado](#10-bono-a-10-años-condicionado)
11. [Pendientes verificados y abiertos](#11-pendientes-verificados-y-abiertos)
12. [Preguntas para Pablo](#12-preguntas-para-pablo)

## 1. Indicadores y bloques

Quince indicadores en seis bloques. El papel (adelantado, coincidente o retrasado) es el del inventario cuando tiene fuente; las hipótesis de Pablo sin fuente se marcan como **«hipótesis, pendiente de verificar»**.

| Bloque | # | Indicador | Papel | Fuente del papel |
|---|---|---|---|---|
| Actividad | 4 | PIB en volumen | Serie de referencia del ciclo | OCDE (inventario §2.3) |
| Actividad | 5 | Producción industrial | Coincidente | Conference Board; *Handbook*, p. 89 (inventario §2.3) |
| Actividad | 6 | Producción de bienes de equipo | Adelantado | Conference Board (inventario §2.3) |
| Actividad | 25 | Consumo de los hogares | Coincidente | Conference Board; *Handbook*, p. 89 (inventario §2.3) |
| Empleo | 1 | Tasa de paro | Retrasado | *Handbook*, p. 77 (inventario §2.3) |
| Empleo | 16 | Expectativas de empleo en la construcción | Adelantado | OCDE, componente del CLI (inventario §2.3) |
| Confianza | 11 | Confianza del consumidor | Adelantado | OCDE, componente del CLI (inventario §2.3) |
| Confianza | 15 | Utilización de la capacidad productiva | Adelantado | OCDE, componente del CLI (inventario §2.3) |
| Hogares y crédito | 17 | Deuda de los hogares (% del PIB) | Retrasado | Hipótesis, pendiente de verificar |
| Hogares y crédito | 20 | Deuda de los hogares (financiación del BdE) | Retrasado | Hipótesis, pendiente de verificar |
| Hogares y crédito | 26 | Tasa de ahorro de los hogares | Coincidente | Hipótesis, pendiente de verificar |
| Hogares y crédito | 22 | Ratio de créditos dudosos | Retrasado | Hipótesis, pendiente de verificar |
| Vivienda | 29 | Compraventa de viviendas | Sin clasificar | El inventario no tiene fuente |
| Mercados y precios | 19 | Rendimiento del bono a 10 años | Adelantado (invertido), condicionado (§10) | Conference Board (inventario §2.3) |
| Mercados y precios | 30 | IPCA | Sin clasificar | El inventario no tiene fuente |

La deuda de los hogares se sigue con dos medidas: el saldo en % del PIB (#17) y la financiación que publica el Banco de España (#20).

## 2. Reglas generales R1-R7

| Regla | Contenido |
|---|---|
| **R1. Ajuste** | SCA si existe; si no, SA; si no, NSA. |
| **R2. Serie NSA** | Solo variación interanual. |
| **R3. Variaciones** | Interanual + mensual (series mensuales) o intertrimestral (series trimestrales), salvo R2. |
| **R4. Unidad de la variación** | Tasas, ratios y saldos de encuesta: en puntos porcentuales (p. p.) o puntos. Índices y niveles: en %. |
| **R5. Historia** | Desde 2000-01 / 2000T1. Si la serie empieza después, desde su inicio, y se marca en el cuadro. |
| **R6. Frecuencias mezcladas** | Cada serie en su frecuencia nativa, sin agregar ni interpolar; cada dato muestra su periodo. El percentil histórico de cada serie se calcula sobre sus propios periodos. |
| **R7. Revisiones** | Se sobrescribe; se guardan la fecha de captura y la fecha de revisión. Si la fuente marca un dato como estimación o provisional, se guarda y se muestra esa bandera; si no lo marca, no se inventa. |

Cómo marca cada fuente los datos provisionales (verificado en las respuestas de las API del 2026-11-24):

- **Eurostat:** bandera por observación (`p` provisional, `e` estimado, `d` definición distinta, `b` ruptura…).
- **INE:** cada dato trae `TipoDato` «Provisional» o «Definitivo».
- **Banco de España:** la API no trae marca de provisionalidad (inventario §2.2).

## 3. Fichas por indicador

Las variaciones y percentiles se aplican sobre la serie con el ajuste elegido por R1. Donde una regla deja un caso abierto, la ficha remite a la pregunta correspondiente (§12).

### Actividad

#### #4 · PIB en volumen

| Campo | Valor |
|---|---|
| Bloque | Actividad |
| Papel y fuente | Serie de referencia del ciclo · OCDE (inventario §2.3) |
| Fuente | Eurostat (a partir de la contabilidad nacional trimestral del INE) |
| Dataset | `namq_10_gdp` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/namq_10_gdp_esms.htm> |
| Código y dimensiones | `freq=Q`, `unit=CLV20_MEUR`, `s_adj=SCA`, `na_item=B1GQ`, `geo=ES` → `Q.CLV20_MEUR.SCA.B1GQ.ES` |
| Frecuencia | Trimestral |
| Unidad | Millones de euros, volúmenes encadenados (referencia 2020) |
| Ajuste aplicado | SCA (R1) |
| Transformaciones | Variación interanual e intertrimestral (R3) |
| Unidad de la variación | % (nivel, R4) |
| Inicio de la historia | 2000T1 (la serie empieza en 1995T1) |
| Avisos | Bandera `p` (provisional) desde 2024T1 hasta 2026T3. Para España, con `CLV20_MEUR`, la API solo devuelve NSA y SCA; el inventario indicaba también SA y CA. Eurostat publica las variaciones ya calculadas (`CLV_PCH_PRE`, `CLV_PCH_SM`): ver pregunta Q5 |

#### #5 · Producción industrial

| Campo | Valor |
|---|---|
| Bloque | Actividad |
| Papel y fuente | Coincidente · Conference Board y *Handbook*, p. 89 (inventario §2.3) |
| Fuente | Eurostat (a partir del IPI del INE) |
| Dataset | `sts_inpr_m` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/sts_esms.htm> |
| Código y dimensiones | `freq=M`, `indic_bt=PRD`, `nace_r2=B-D`, `s_adj=SCA`, `unit=I21`, `geo=ES` → `M.PRD.B-D.SCA.I21.ES` |
| Frecuencia | Mensual |
| Unidad | Índice, 2021 = 100 |
| Ajuste aplicado | SCA (R1). Disponibles: NSA (desde 1975-01), CA y SCA (desde 1992-01) |
| Transformaciones | Variación interanual y mensual (R3) |
| Unidad de la variación | % (índice, R4) |
| Inicio de la historia | 2000-01 (la serie SCA empieza en 1992-01) |
| Avisos | **Toda la serie SCA lleva la bandera `p`** (1992-01 a 2026-09), porque se reestima con cada actualización del ajuste estacional: ver pregunta Q9. Eurostat publica `PCH_PRE` y `PCH_SM`: ver pregunta Q5. Ruptura futura anunciada por el INE con CNAE-2025 (inventario #5) |

#### #6 · Producción de bienes de equipo

| Campo | Valor |
|---|---|
| Bloque | Actividad |
| Papel y fuente | Adelantado · Conference Board, «Capital Equipment Component of Industrial Production» (LEI de España; componente confirmado en <https://www.conference-board.org/topics/business-cycle-indicators/spain>, 2026-11-24) |
| Fuente | Eurostat (a partir del IPI del INE) |
| Dataset | `sts_inpr_m` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/sts_esms.htm> |
| Código y dimensiones | `freq=M`, `indic_bt=PRD`, `nace_r2=MIG_CAG`, `s_adj=SCA`, `unit=I21`, `geo=ES` → `M.PRD.MIG_CAG.SCA.I21.ES` |
| Frecuencia | Mensual |
| Unidad | Índice, 2021 = 100 |
| Ajuste aplicado | SCA (R1). Disponibles: NSA, CA y SCA |
| Transformaciones | Variación interanual y mensual (R3) |
| Unidad de la variación | % (índice, R4) |
| Inicio de la historia | 2000-01 (la serie SCA empieza en 1992-01) |
| Avisos | Como #5: toda la serie SCA lleva la bandera `p` (Q9); variaciones publicadas (Q5) |

#### #25 · Consumo de los hogares

| Campo | Valor |
|---|---|
| Bloque | Actividad |
| Papel y fuente | Coincidente · Conference Board («Final Consumption Expenditure», CEI de España) y *Handbook*, p. 89 (inventario §2.3) |
| Fuente | Eurostat (a partir de la contabilidad nacional trimestral del INE) |
| Dataset | `namq_10_fcs` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/namq_10_gdp_esms.htm> (la API remite a esta ficha) |
| Código y dimensiones | `freq=Q`, `unit=CLV20_MEUR`, `s_adj=SCA`, `na_item=P31_S14` (total), `geo=ES` → `Q.CLV20_MEUR.SCA.P31_S14.ES`. El inventario recoge también los bienes duraderos (`na_item=P311_S14`): ver pregunta Q4 |
| Frecuencia | Trimestral |
| Unidad | Millones de euros, volúmenes encadenados (referencia 2020) |
| Ajuste aplicado | SCA (R1). Para España con `CLV20_MEUR` la API devuelve NSA y SCA |
| Transformaciones | Variación interanual e intertrimestral (R3) |
| Unidad de la variación | % (nivel, R4) |
| Inicio de la historia | 2000T1 (la serie empieza en 1995T1) |
| Avisos | Bandera `p` desde 2024T1. Eurostat publica `CLV_PCH_PRE` y `CLV_PCH_SM` (Q5) |

### Empleo

#### #1 · Tasa de paro

Especificación cerrada en §4. Resumen:

| Campo | Valor |
|---|---|
| Bloque | Empleo |
| Papel y fuente | Retrasado · *Handbook on Cyclical Composite Indicators*, p. 77 (inventario §2.3) |
| Fuente | Eurostat |
| Dataset | `une_rt_m` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/une_rt_m_esms.htm> |
| Código y dimensiones | Cabecera `M.SA.TOTAL.PC_ACT.T.ES` (`freq`, `s_adj`, `age`, `unit`, `sex`, `geo`). Además: `sex=M` y `sex=F` con `age=TOTAL`; `age=Y_LT25` con `sex=T` |
| Frecuencia | Mensual |
| Unidad | % de la población activa (`PC_ACT`) |
| Ajuste aplicado | SA para todo (especificación de §4; no existe SCA ni CA: ajustes disponibles NSA, SA y TC) |
| Transformaciones | Variación mensual e interanual; percentiles del nivel y de las dos variaciones; récords (§4) |
| Unidad de la variación | p. p. |
| Inicio de la historia | 2000-01 (todas las combinaciones empiezan en 1986-04) |
| Avisos | Los últimos meses son estimaciones provisionales de Eurostat, pero **no llevan bandera** (§4, punto a). Única bandera en la serie: `d` en 1995-12, fuera del periodo |

#### #16 · Expectativas de empleo en la construcción

| Campo | Valor |
|---|---|
| Bloque | Empleo |
| Papel y fuente | Adelantado · OCDE, componente del CLI de España («Construction survey – employment: future tendency sa») (inventario §2.3) |
| Fuente | Eurostat (encuestas armonizadas de la Comisión Europea) |
| Dataset | `ei_bsbu_m_r2` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/ei_bcs_esms.htm> |
| Código y dimensiones | `freq=M`, `indic=BS-CEME-BAL`, `s_adj=SA`, `geo=ES` → `M.BS-CEME-BAL.SA.ES` |
| Frecuencia | Mensual |
| Unidad | Saldo de respuestas |
| Ajuste aplicado | SA (R1; no existe SCA). Disponibles: NSA y SA |
| Transformaciones | Variación interanual y mensual (R3) |
| Unidad de la variación | Puntos (saldo de encuesta, R4) |
| Inicio de la historia | 2000-01 (la serie empieza en 1989-01) |
| Avisos | Sin banderas. Licencia de las encuestas difundidas por Eurostat: pendiente P3 del inventario |

### Confianza

#### #11 · Confianza del consumidor

| Campo | Valor |
|---|---|
| Bloque | Confianza |
| Papel y fuente | Adelantado · OCDE, componente del CLI de España («Consumer survey – confidence indicator sa») (inventario §2.3) |
| Fuente | Eurostat (encuestas armonizadas de la Comisión Europea) |
| Dataset | `ei_bssi_m_r2` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/ei_bcs_esms.htm> |
| Código y dimensiones | `freq=M`, `indic=BS-CSMCI-BAL`, `s_adj=SA`, `geo=ES` → `M.BS-CSMCI-BAL.SA.ES` |
| Frecuencia | Mensual |
| Unidad | Saldo de respuestas |
| Ajuste aplicado | SA (R1; no existe SCA). Disponibles: NSA y SA |
| Transformaciones | Variación interanual y mensual (R3) |
| Unidad de la variación | Puntos (saldo de encuesta, R4) |
| Inicio de la historia | 2000-01 (la serie empieza en 1986-06) |
| Avisos | **Serie restaurada por la Comisión** (P2, §11): los meses 2024-10 a 2025-04 son estimaciones econométricas y la historia anterior se ajustó en nivel al nuevo proveedor. Eurostat no los marca con bandera (Q10). Licencia: pendiente P3 del inventario |

#### #15 · Utilización de la capacidad productiva

| Campo | Valor |
|---|---|
| Bloque | Confianza |
| Papel y fuente | Adelantado · OCDE, componente del CLI de España («Manufacturing survey – rate of capacity utilization sa») (inventario §2.3) |
| Fuente | Eurostat (encuesta industrial armonizada de la Comisión Europea) |
| Dataset | `ei_bsin_q_r2` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/ei_bcs_esms.htm> |
| Código y dimensiones | `freq=Q`, `indic=BS-ICU-PC`, `s_adj=SA`, `geo=ES` → `Q.BS-ICU-PC.SA.ES` |
| Frecuencia | Trimestral (la encuesta se hace en el primer mes de cada trimestre; inventario #15) |
| Unidad | % de la capacidad («Current level of capacity utilization (%)») |
| Ajuste aplicado | SA (R1; no existe SCA). Disponibles: NSA y SA |
| Transformaciones | Variación interanual e intertrimestral (R3) |
| Unidad de la variación | p. p. (tasa, R4) |
| Inicio de la historia | 2000T1 (la serie empieza en 1987T2) |
| Avisos | Sin banderas. Último dato 2026T4 (la encuesta se adelanta al trimestre) |

### Hogares y crédito

#### #17 · Deuda de los hogares (% del PIB)

| Campo | Valor |
|---|---|
| Bloque | Hogares y crédito |
| Papel y fuente | Retrasado · **hipótesis, pendiente de verificar** |
| Fuente | Eurostat |
| Dataset | `nasq_10_f_bs` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/nasq_10_f_esms.htm> |
| Código y dimensiones | `freq=Q`, `unit=PC_GDP`, `sector=S14_S15`, `finpos=LIAB`, `na_item=F4`, `geo=ES` → `Q.PC_GDP.S14_S15.LIAB.F4.ES` |
| Frecuencia | Trimestral |
| Unidad | % del PIB (pasivos en préstamos de hogares e ISFLSH) |
| Ajuste aplicado | NSA (R1): el dataset no tiene dimensión de ajuste estacional |
| Transformaciones | Solo variación interanual (R2): ver pregunta Q2 |
| Unidad de la variación | p. p. (ratio, R4) |
| Inicio de la historia | 2000T1 (la serie empieza en 1999T1) |
| Avisos | Bandera `p` desde 2024T1 hasta 2026T2 |

#### #20 · Deuda de los hogares (financiación del Banco de España)

| Campo | Valor |
|---|---|
| Bloque | Hogares y crédito |
| Papel y fuente | Retrasado · **hipótesis, pendiente de verificar** |
| Fuente | Banco de España, Boletín Estadístico, capítulo 3 (indicadores de liquidez y financiación, SEC 2010) |
| Dataset | API del BdE `listaSeries`; catálogo `catalogo_be.csv`, fichero `BE0321.csv` |
| Código y dimensiones | Saldo: `BE_3_21.1` (API `DCF_M.N.ES.W0.S1M.S1.N.L.LE.FD.T._Z.XDC._T.M.V.N._T`). Tasa de crecimiento interanual publicada: `BE_3_21.3` (API `DCF_M.N.ES.W0.S1M.S1.N.L.LE.FD.T._Z.XDC._T.M.V.TVA._T`). Hogares e ISFLSH, pasivos, total financiación (F3 + F4), saldo a final de periodo, sin consolidar. Cuál se usa: pregunta Q3 |
| Frecuencia | Mensual |
| Unidad | Saldo: miles de euros. Tasa: % |
| Ajuste aplicado | NSA (R1): la fuente indica «Sin ajuste de estacionalidad» |
| Transformaciones | Solo variación interanual (R2): ver preguntas Q2 y Q3 |
| Unidad de la variación | Saldo → % (nivel, R4). Si se usa la tasa publicada: pregunta Q3 |
| Inicio de la historia | 2000-01 (saldo desde 1994-12; tasa desde 1995-12) |
| Avisos | Sin marca de provisionalidad (la API no la trae). Licencia: citar al BdE como fuente también cuando hay cálculos (§9) |

#### #26 · Tasa de ahorro de los hogares

| Campo | Valor |
|---|---|
| Bloque | Hogares y crédito |
| Papel y fuente | Coincidente · **hipótesis, pendiente de verificar** |
| Fuente | Eurostat |
| Dataset | `nasq_10_ki` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/nasq_10_nf_tr_esms.htm> (la API remite a esta ficha) |
| Código y dimensiones | `freq=Q`, `unit=PC`, `s_adj=SCA`, `na_item=SRG_S14_S15`, `sector=S14_S15`, `geo=ES` → `Q.PC.SCA.SRG_S14_S15.S14_S15.ES` |
| Frecuencia | Trimestral |
| Unidad | % de la renta disponible bruta (B8G / (B6G + D8Net) × 100) |
| Ajuste aplicado | SCA (R1). Disponibles: NSA y SCA |
| Transformaciones | Variación interanual e intertrimestral (R3) |
| Unidad de la variación | p. p. (tasa, R4) |
| Inicio de la historia | 2000T1 (la serie empieza en 1999T1) |
| Avisos | Sin banderas |

#### #22 · Ratio de créditos dudosos

| Campo | Valor |
|---|---|
| Bloque | Hogares y crédito |
| Papel y fuente | Retrasado · **hipótesis, pendiente de verificar** |
| Fuente | Banco de España, Boletín Estadístico, capítulo 4 |
| Dataset | API del BdE `listaSeries`; catálogo, fichero `BE0403.csv` |
| Código y dimensiones | `BE_4_3.12` (API `D_BEEA2020`) |
| Frecuencia | Mensual |
| Unidad | % (la API y su ficha dicen «Porcentaje»; el catálogo CSV dice «Euros», incoherencia ya anotada en el inventario) |
| Ajuste aplicado | NSA (R1): serie sin ajuste |
| Transformaciones | Solo variación interanual (R2): ver pregunta Q2 |
| Unidad de la variación | p. p. (ratio, R4) |
| Inicio de la historia | 2000-01 (la serie empieza en 1980-12) |
| Avisos | Cobertura: hogares y empresas juntos (decisión del inventario #22). ⚠️ La descripción de la API («Instituciones financieras. Monetarias. Total créditos dudosos al sector privado residente») no coincide con la del catálogo («Entidades de crédito y EFC… a otros sectores residentes»): pendiente V3 (§11). Último dato: 2026-09 |

### Vivienda

#### #29 · Compraventa de viviendas

| Campo | Valor |
|---|---|
| Bloque | Vivienda |
| Papel y fuente | Sin clasificar (el inventario no tiene fuente) |
| Fuente | INE, Estadística de Transmisiones de Derechos de la Propiedad (ETDP), tabla 6150 · metodología: <https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736171438&menu=metodologia&idp=1254735576606> |
| Dataset | API Tempus3 del INE: `DATOS_SERIE/ETDP1826` |
| Código y dimensiones | `ETDP1826`: «Total Nacional. General. Compraventa. Número» |
| Frecuencia | Mensual |
| Unidad | Número de viviendas |
| Ajuste aplicado | NSA (R1): solo existe la serie original |
| Transformaciones | Solo variación interanual (R2) |
| Unidad de la variación | % (nivel, R4) |
| Inicio de la historia | ⚠️ **2007-01**, se marca en el cuadro (R5) |
| Avisos | Cada dato lleva `TipoDato` «Provisional» o «Definitivo»: en la consulta del 2026-11-24, provisionales 2026-01 a 2026-09. Compraventas sin desestacionalizar (decisión del inventario #29). Licencia del INE: citar la fuente y la fecha de la última actualización (§8) |

### Mercados y precios

#### #19 · Rendimiento del bono a 10 años (condicionado, §10)

| Campo | Valor |
|---|---|
| Bloque | Mercados y precios |
| Papel y fuente | Adelantado (invertido) · Conference Board, «Long Term Government Bond Yield (inverted)». Condicionado (§10) |
| Fuente | Eurostat (origen BCE) |
| Dataset | `irt_lt_mcby_m` · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/irt_lt_mcby_esms.htm> |
| Código y dimensiones | `freq=M`, `int_rt=MCBY`, `geo=ES` → `M.MCBY.ES` |
| Frecuencia | Mensual |
| Unidad | % (rendimiento del criterio de convergencia de la UEM) |
| Ajuste aplicado | NSA (R1): el dataset no tiene dimensión de ajuste estacional |
| Transformaciones | Solo variación interanual (R2): ver pregunta Q2 |
| Unidad de la variación | p. p. (tasa, R4) |
| Inicio de la historia | 2000-01 (la serie empieza en 1980-01) |
| Avisos | Entra solo si se cumple la condición de §10 (licencia P4 o fuente alternativa) |

#### #30 · IPCA

Especificación en §5. Resumen:

| Campo | Valor |
|---|---|
| Bloque | Mercados y precios |
| Papel y fuente | Sin clasificar (el inventario no tiene fuente) |
| Fuente | Eurostat (a partir del IPCA del INE) |
| Dataset | `prc_hicp_minr` (ECOICOP versión 2) · ESMS: <https://ec.europa.eu/eurostat/cache/metadata/en/prc_hicp_esms.htm> |
| Código y dimensiones | `freq=M`, `unit=RCH_A` (tasa de variación anual), `coicop18=TOTAL`, `geo=ES` → `M.RCH_A.TOTAL.ES` |
| Frecuencia | Mensual |
| Unidad | % (tasa interanual publicada por la fuente) |
| Ajuste aplicado | NSA (R1): el dataset no tiene dimensión de ajuste estacional |
| Transformaciones | Se muestra como inflación: solo la tasa interanual, tomada de la fuente. Variación: diferencia en p. p. de la tasa interanual frente al mes anterior. Percentil sobre la tasa interanual |
| Unidad de la variación | p. p. |
| Inicio de la historia | 2000-01 (la tasa empieza en 1997-01) |
| Avisos | Sin banderas. El índice general no cambia con la ECOICOP v2 (P11, §11) |

## 4. Especificación de la tasa de paro

Especificación cerrada (opción A para el hito): serie mensual de Eurostat `une_rt_m`.

| Campo | Decisión |
|---|---|
| Fuente | Eurostat `une_rt_m`; serie de cabecera `M.SA.TOTAL.PC_ACT.T.ES` |
| Series | General (`TOTAL`, `T`), por sexo (`M`, `F`) y juvenil (`Y_LT25`) |
| Unidad | % de la población activa (`PC_ACT`) |
| Ajuste | Desestacionalizada (SA) para todo: nivel, variaciones y percentiles |
| Variación | Mensual e interanual, en puntos porcentuales |
| Percentil histórico | Del nivel y de las dos variaciones, desde 2000-01 |
| Récord | De subida = mayor variación positiva en p. p.; de bajada = mayor negativa; desde 2000-01; mensual e interanual |
| Revisiones | Se sobrescribe; se guardan fechas de captura y de revisión. La prueba retrospectiva del bloque 7 usa datos revisados y la web lo dice |
| 2020 | Se guarda siempre; posible exclusión en el récord: bloque 7 |

**Verificación (2026-11-24):**

- Las cuatro series (`TOTAL.T`, `TOTAL.M`, `TOTAL.F`, `Y_LT25.T`) existen en SA con `PC_ACT` para España, de 1986-04 a 2026-09. Ajustes disponibles: NSA, SA y TC. Dataset actualizado por Eurostat el 2026-11-24.
- **(a) ¿Marca Eurostat qué meses son estimación?** **No con banderas.** Su ficha metodológica (ESMS `une_rt_m`, apartado 18.5 «Data compilation») dice que para España, entre otros países, «Quarterly LFS data are combined with monthly registered unemployment data using a temporal disaggregation Denton model. For the most recent months (for which the LFS data are not yet available), the monthly benchmark factors are forecasted using seasonal ARIMA regression models. The provisional estimates are calculated by multiplying these factors by the available registered unemployment figures». Pero en los datos la única bandera de España es `d` en 1995-12. Por R7 no se inventa la bandera: la explicación va a la página de metodología citando a Eurostat (§9).
- Revisión conocida: datos de 2021-01 a 2023-12 revisados por el Censo 2021, publicados el 3-5-2024 (ESMS `une_rt_m`, apartado de revisiones).

## 5. IPCA

| Campo | Decisión |
|---|---|
| Qué se muestra | La inflación: solo la tasa interanual del IPCA general |
| Origen de la tasa | Si la fuente publica la tasa, se toma la publicada; si no, se calcula y se marca (asterisco + metodología) |
| Variación | Diferencia en p. p. de la tasa interanual frente a la del mes anterior (confirmado por Pablo el 2026-11-24) |
| Percentil | Sobre la tasa interanual |

**Verificación (2026-11-24):**

- **(b) ¿Publica Eurostat la tasa interanual ya calculada?** **Sí.** El dataset vigente es `prc_hicp_minr` («HICP – ECOICOP ver.2 – indices and rates of change, monthly data»). Publica `RCH_A` («Annual rate of change») para España de 1997-01 a 2026-10, además de `RCH_M`, `RCH_MV12MAVR` y los índices `I25` e `I15`. Por la regla anterior **se toma la publicada y no lleva asterisco**.
- Los dos datasets citados en el encargo existen, pero están cerrados: `prc_hicp_manr` (tasa anual) y `prc_hicp_mmor` (tasa mensual, «(1996-2025)») terminan en 2025-12 (última actualización 2026-02-06). La ficha de Eurostat lo explica: «The data using the ECOICOP classification (1996-2025) is available in dissemination in Eurostat database and frozen unless error corrections are needed. Data starting from January 2026 are only available under the ECOICOP version 2 classification» (ESMS `prc_hicp`, apartado de series temporales) y «the dataset ECOICOP1 is archived and frozen» (15.3).
- La variación (diferencia de tasas) es un cálculo propio: lleva la marca de dato calculado (§9).
- Ruptura de enero de 2026: ver P11 en §11.

## 6. Episodios de referencia

Fechas del Comité de Fechado del Ciclo Económico Español de la Asociación Española de Economía (AEE), aplicadas con la **convención NBER**: la recesión va del trimestre siguiente al pico hasta el valle, ambos incluidos. Un trimestre marca sus tres meses.

| Episodio (etiqueta) | Pico (AEE) | Valle (AEE) | Recesión marcada | Meses marcados |
|---|---|---|---|---|
| 2008 | 2008T2 | 2009T4 | 2008T3-2009T4 | 2008-07 a 2009-12 |
| 2011-2013 | 2010T4 | 2013T2 | 2011T1-2013T2 | 2011-01 a 2013-06 |
| 2020 | 2019T4 | 2020T2 | 2020T1-2020T2 | 2020-01 a 2020-06 |

Fuente de las fechas: [archivo histórico del ciclo económico español](https://www.asesec.org/CFCweb/index.php/archivo-historico-del-ciclo-economico-espanol/) (consultado el 2026-11-24). Cita sugerida por el Comité: Asociación Española de Economía (2015), «Fechado del ciclo económico español», Comité de Fechado del Ciclo Económico Español.

**Verificación (2026-11-24).** (c) **¿Es el «pico» de la AEE el último trimestre de expansión? No se puede confirmar: las páginas del Comité se contradicen.**

- Las fechas de pico y valle coinciden con las de la tabla.
- La página de métodos dice: «Recessions start at the peak and end at the following trough. Expansions start immediately after the trough and end immediately before the following peak» ([methods](https://www.asesec.org/CFCweb/index.php/methods/)). Según ese texto, el trimestre del pico no pertenece a la expansión.
- La nota del archivo histórico dice: «Se incluye el pico y el valle para contabilizar la duración de la recesión. Ambos se excluyen para contabilizar la duración de la expansión».
- Sin embargo, las duraciones de recesión de la tabla del Comité (6, 12 y 2 trimestres) son las que salen de contar desde el trimestre siguiente al pico hasta el valle, es decir, la convención NBER. Contando el pico, saldrían 7, 13 y 3.
- La página de métodos no menciona al NBER ni ninguna convención equivalente.

Se mantiene la decisión tomada y se pregunta a Pablo (Q1).

## 7. Comparación con antes de cada crisis

Se calculan las dos comparaciones; qué se muestra se decide en el bloque 6.

| Comparación | Referencia antes de la crisis | Frente a |
|---|---|---|
| **Media contra media** | Media de los 12 meses (o 4 trimestres) que terminan en el último mes (o trimestre) del trimestre del pico | Media de los últimos 12 meses (o 4 trimestres) |
| **Punto contra punto** | Dato del último mes del trimestre del pico (o del trimestre del pico) | Último dato |

Periodos de referencia que resultan de los picos de §6:

| Episodio | Pico | Media de referencia, series mensuales | Media de referencia, series trimestrales | Punto de referencia |
|---|---|---|---|---|
| 2008 | 2008T2 | 2007-07 a 2008-06 | 2007T3 a 2008T2 | 2008-06 / 2008T2 |
| 2011-2013 | 2010T4 | 2010-01 a 2010-12 | 2010T1 a 2010T4 | 2010-12 / 2010T4 |
| 2020 | 2019T4 | 2019-01 a 2019-12 | 2019T1 a 2019T4 | 2019-12 / 2019T4 |

**Aviso de metodología:** la referencia de 2011 ya está deprimida por la crisis de 2008.

Qué medida de cada serie se compara (nivel, tasa…): pregunta Q7.

## 8. Qué se guarda por serie

Además de los datos (periodo, valor y, si la fuente la trae, la bandera de provisionalidad de R7):

| Metadato | Para qué |
|---|---|
| Fuente | Citar la fuente en cada dato (§9) |
| Código | Identificar la serie en la fuente |
| Fecha de última actualización según la fuente | Requisito de la licencia del INE: citar la fuente y la fecha de la última actualización ([aviso legal del INE](https://www.ine.es/dyngs/AYU/index.htm?cid=125), inventario §2.2) |
| Fecha de captura | Saber cuándo se descargó el dato (R7) |

Dónde da cada fuente la fecha de última actualización (nota de verificación, no es una decisión):

- **Eurostat:** campo `updated` de la respuesta JSON-stat de cada dataset (por ejemplo, `une_rt_m` actualizado el 2026-11-24T11:00:00+01:00).
- **INE:** campo `Ultima_Modificacion` de la tabla en `TABLAS_OPERACION/ETDP` (tabla 6150: 17-11-2026, 09:00). El campo `Fecha` de cada dato es la fecha del periodo de referencia, no la de publicación.
- **Banco de España:** no se ha encontrado en la API un campo de fecha de actualización: pendiente V4 (§11).

## 9. Requisitos para el frontend (bloque 6)

Solo se anotan; se construyen en el bloque 6.

- **Página de metodología** con todas las decisiones de este documento:
  - episodios y convención NBER (§6);
  - periodos de referencia de las comparaciones y el aviso sobre 2011 (§7);
  - revisiones (R7);
  - estimaciones del paro mensual, citando a Eurostat (§4, punto a);
  - series que empiezan tarde (R5; en este cuadro, las compraventas desde 2007-01);
  - compraventas sin desestacionalizar (#29);
  - IPCA (§5).
- **Citar la fuente en cada dato.**
- **Fecha de última actualización** en los datos del INE.
- **Banco de España:** citarlo como fuente también cuando hay cálculos; sus enlaces se abren en ventana nueva ([aviso legal del BdE](https://www.bde.es/wbe/es/pie/aviso-legal/), inventario §2.2).
- **Marca en los datos calculados por nosotros.**

## 10. Bono a 10 años, condicionado

**Decisión:**

- Entra solo si se verifica su licencia (P4) o se encuentra otra fuente con licencia clara (por ejemplo, el BdE).
- Si no se confirma su papel de adelantado, se muestra como contexto, no como señal.

**Verificación (2026-11-24):**

1. **Licencia por Eurostat (P4).** El aviso de Eurostat dice: «The following Eurostat data and documents may not be reused for commercial purposes, but non-commercial reuse is possible without restriction: Data identified as belonging to sources other than Eurostat» ([copyright notice](https://ec.europa.eu/eurostat/web/main/help/copyright-notice)). La página no explica cómo se identifican esos datos.
2. **Licencia del BCE (origen del dato).** El aviso del BCE dice: «users of this website may make free use of the information obtained directly from it subject to the following conditions: When such information is distributed or reproduced, it must appear accurately and the ECB must be cited as the source. […] If the information is modified by the user (e.g. by seasonal adjustment of statistical data or calculation of growth rates) this must be stated explicitly» ([ECB disclaimer and copyright](https://www.ecb.europa.eu/services/using-our-site/disclaimer/html/index.en.html)). Esta condición cubre la información obtenida directamente de la web del BCE, no la que difunde Eurostat. La política específica del portal de datos del BCE no se pudo leer: la dirección probada devolvió 503 y después 404. **Pendiente.**
3. **Alternativa en el BdE.** El catálogo del BdE contiene `BE_2_10.10` (API `D_G2B1I0ZP`): «Tipos de interés. Mercado secundario de valores. Bonos y obligaciones del Estado. A 10 años (criterio de convergencia). Operaciones simples al contado». Es mensual, en %, de 1991-11 a 2026-10, con la columna «Fuente» del catálogo vacía. Le aplica el aviso legal del BdE: uso permitido citando al BdE, también cuando hay cálculos; no es una licencia abierta (inventario §2.2). No se ha consultado su serie de datos en la API ni su metodología.
4. **¿A qué se refiere la clasificación del inventario?** **Al nivel del rendimiento (con el signo invertido), no a la pendiente de la curva.** El componente del LEI de España de la Conference Board se llama «Long Term Government Bond Yield (inverted)» (<https://www.conference-board.org/topics/business-cycle-indicators/spain>, consultado el 2026-11-24). La página no da más detalle de cómo se construye.

**Estado:** la condición no está resuelta. Elegir entre las opciones 1, 2 y 3, y decidir si la clasificación de la Conference Board basta como confirmación del papel adelantado: pregunta Q11.

## 11. Pendientes verificados y abiertos

| # | Pendiente | Estado | Resultado y cita |
|---|---|---|---|
| (a) | ¿Marca Eurostat qué meses de `une_rt_m` son estimación? | **Verificado** | No con banderas; lo explica en la metodología (ESMS `une_rt_m`, 18.5). Ver §4 |
| (b) | ¿Publica Eurostat la tasa interanual del IPCA? | **Verificado** | Sí, `prc_hicp_minr`, `unit=RCH_A`. `prc_hicp_manr` y `prc_hicp_mmor` existen pero están congelados en 2025-12 (ESMS `prc_hicp`). Ver §5 |
| (c) | ¿Es el pico de la AEE el último trimestre de expansión? | **Abierto** | Las páginas del Comité se contradicen; sus duraciones de recesión cuadran con la convención NBER. Ver §6 y Q1 |
| P2 | Restauración de la confianza del consumidor de España | **Verificado** | Nota de la Comisión «Restoration of consistent consumer survey time series for Spain» (diciembre de 2025, publicada el 8-1-2026, [PDF](https://economy-finance.ec.europa.eu/document/download/89d26b00-ab6c-440a-87dd-879ae120fa3a_en?filename=Restoration%20of%20consistent%20CONS%20series%20for%20ES%202025.pdf)). En octubre de 2024 el proveedor español de la encuesta a consumidores abandonó el programa; un nuevo proveedor recoge datos desde mayo de 2025 por web, frente al teléfono anterior. La Comisión enlazó los datos nuevos con la historia hasta 2024-09 mediante técnicas econométricas: «This included estimation of the missing data in the 7-month break period and the adjustment of the historical data to the properties of the newly collected data, thereby creating one consistent time series for each survey question». Con ello se reanudó la publicación del indicador de confianza del consumidor. En Eurostat, los meses estimados no llevan bandera (consulta del 2026-11-24). Ver #11 y Q10 |
| P4 | Licencia del bono a 10 años | **Abierto** | Ver §10 y Q11 |
| P11 | Posible ruptura del IPCA en 2026-01 | **Verificado para el índice general** | Eurostat avisa: «Potential breaks in the HICP data for January 2026 are possible» (ESMS `prc_hicp`, 15.2). Pero el INE dice que la reclasificación no afecta al índice general: «dado que se trata únicamente de una reclasificación de los componentes básicos del IPC, el índice general no se verá afectado, manteniéndose inalterado tanto en su valor como en sus tasas» ([Metodología IPC base 2025](https://www.ine.es/metodologia/t25/metodologia_IPC_base_2025.pdf), enero de 2026, cap. IX «Enlace de series»; el IPCA comparte metodología con el IPC salvo las diferencias que el documento enumera). Eurostat confirma que «Las cifras históricas de inflación para el IPCA de todas las partidas no cambiarán» ([Preguntas y respuestas sobre las mejoras del IPCA](https://www.ine.es/ine/IPCA_ECOICOP.pdf), Eurostat, 15-12-2025, pregunta 8). Además, desde enero de 2026 el IPCA incluye los juegos de azar (Metodología IPC base 2025, «Características técnicas del IPCA», punto 1) |
| V1 | Ajustes del PIB y del consumo para España | **Verificado** | Con `CLV20_MEUR` solo existen NSA y SCA (el inventario decía NSA, SA, CA y SCA). No cambia la elección: SCA |
| V2 | Bandera `p` en toda la serie SCA de la producción industrial | **Verificado** | Ver Q9 |
| V3 | Descripción de la ratio de dudosos (`D_BEEA2020`) | **Abierto** | La API dice «Instituciones financieras. Monetarias. Total créditos dudosos al sector privado residente. Proporción sobre el total». El catálogo dice «Entidades de crédito y EFC. Balance componentes. Créditos. A otros sectores residentes. Ratio de dudosidad». Hay que confirmarlo en la metodología del capítulo 4 del Boletín Estadístico |
| V4 | Fecha de última actualización de las series del BdE | **Abierto** | No se ha encontrado en la respuesta de la API |
| — | Clasificación de las hipótesis (#17, #20, #22, #26) | **Abierto** | Sin fuente; pendiente P13 del inventario |
| — | Licencia de las encuestas difundidas por Eurostat (#11, #15, #16) | **Abierto** | Pendiente P3 del inventario |

## 12. Preguntas para Pablo

Casos que las decisiones y las reglas R1-R7 no resuelven. No se ha decidido ninguno.

| # | Pregunta | Afecta a |
|---|---|---|
| Q1 | La AEE no confirma que el pico sea el último trimestre de expansión: su texto dice que la recesión empieza en el pico, pero sus duraciones cuadran con la convención NBER (§6). ¿Se mantiene la convención NBER (recesión 2008T3-2009T4, 2011T1-2013T2 y 2020T1-2020T2) o se marcan los trimestres del pico (2008T2, 2010T4 y 2019T4) como recesión? | §6, §7 |
| Q2 | R2 deja solo la variación interanual en todas las series NSA. En el bono, los dudosos, la financiación del BdE y la deuda en % del PIB, la fuente no ofrece ajuste estacional porque no es habitual en saldos, ratios financieras o tipos de interés. ¿Se aplica R2 al pie de la letra también a estas series? | #17, #19, #20, #22 |
| Q3 | Financiación a hogares: ¿se usa el saldo (`BE_3_21.1`, miles de euros) con una variación calculada por nosotros, o la tasa de crecimiento interanual que publica el BdE (`BE_3_21.3`, %)? En el segundo caso, ¿la variación es en p. p.? No se ha verificado si la tasa del BdE se calcula a partir de saldos o de flujos; si es de flujos, las dos opciones no darán el mismo número | #20 |
| Q4 | Consumo de los hogares: el inventario recoge el total (`P31_S14`) y los bienes duraderos (`P311_S14`). ¿Entra solo el total, o también los duraderos? | #25 |
| Q5 | La regla «se toma la publicada si existe» está decidida solo para el IPCA. Eurostat publica ya calculadas las variaciones del PIB y del consumo (`CLV_PCH_PRE`, `CLV_PCH_SM`) y de la producción industrial (`PCH_PRE`, `PCH_SM`). ¿Se toman las publicadas o se calculan a partir del nivel? | #4, #5, #6, #25 |
| Q6 | Percentil histórico: está definido para el paro (nivel y variaciones) y para el IPCA (tasa interanual). En el resto de series, ¿se calcula sobre el nivel, sobre las variaciones o sobre todo? | Todas salvo #1 y #30 |
| Q7 | Comparación con antes de cada crisis: ¿qué medida se compara en cada serie? Por ejemplo: nivel del índice, tasa interanual o, en el IPCA, la tasa interanual | §7 |
| Q8 | R5 fija la historia desde 2000-01. Para tener la variación interanual de 2000-01 hace falta el dato de 1999-01. ¿Se descargan también los 12 meses (o 4 trimestres) anteriores a 2000 para calcular las variaciones, o la primera variación interanual es la de 2001-01? | Todas |
| Q9 | La producción industrial SCA lleva la bandera `p` en toda la serie, desde 1992-01, porque se reestima con cada ajuste estacional. Por R7, la bandera se guarda y se muestra. ¿Se muestra en todos los datos, o la página de metodología lo explica una vez? | #5, #6 |
| Q10 | La confianza del consumidor tiene 7 meses estimados por la Comisión (2024-10 a 2025-04) y la historia anterior ajustada en nivel, sin bandera en Eurostat. R7 impide inventar la bandera. ¿Se añade a la página de metodología, que hoy no lo incluye en la lista de §9? | #11, §9 |
| Q11 | Bono: (1) ¿Basta alguna de las opciones de §10 (licencia del BCE descargando del BCE, o la serie `BE_2_10.10` del BdE bajo su aviso legal) como «licencia clara»? (2) ¿La clasificación de la Conference Board, que se refiere al nivel invertido y no a la pendiente de la curva, confirma su papel de adelantado o se muestra como contexto? | #19, §10 |
