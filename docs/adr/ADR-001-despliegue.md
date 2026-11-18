# ADR-001 · Plataforma de despliegue

- **Estado:** aceptada
- **Fecha:** 2026-11-18
- **Decide:** Pablo
- **Revisar:** al final de la semana 5 (migración prevista a Cloud Run) o si el arranque en frío molesta al enseñar el portfolio.

## Contexto

El observatorio necesita estar publicado en Internet desde la semana 1, con una API casi vacía, para que todo cambio pase por la cadena completa (rama → integración continua → despliegue). Es un proyecto personal de aprendizaje, sin presupuesto definido, con repositorio público como portfolio. En la semana 1 ya se aprende Git, GitHub, integración continua y pruebas desde cero.

## Opciones consideradas

| Opción | Backend (API) | Base de datos | Coste aprox. |
| --- | --- | --- | --- |
| A | Render, plan gratuito | Neon, plan gratuito | 0 € |
| B | Railway Hobby | Railway | ~5 $/mes, variable con el uso |
| C | Render de pago | Neon, plan gratuito | ~7 $/mes |
| D | Google Cloud Run (contenedor Docker) | Neon, plan gratuito | 0 € dentro del nivel gratuito; requiere tarjeta |

## Criterios

Coste, arranque en frío, persistencia de los datos, complejidad añadida en la semana 1, valor de aprendizaje para un entorno empresarial, riesgo de factura inesperada y reversibilidad.

## Decisión

**Opción A** ahora: API en Render (plan gratuito) y base de datos en Neon (plan gratuito). **Opción D planificada** como ejercicio de migración hacia el final de la semana 5, cuando la API tenga contenido.

Motivos:
1. La semana 1 se centra en la cadena de calidad; añadir contenedores y nube mezclaría demasiados conceptos nuevos.
2. Coste cero y sin riesgo de factura: Neon suspende el cómputo al superar su límite en lugar de cobrar.
3. La base de datos en Neon no cambia aunque cambie la plataforma de la API.
4. Migrar a Cloud Run más adelante enseña contenedores con algo real dentro y demuestra que la decisión era reversible.

## Consecuencias

- **Aceptamos:** la API gratuita se duerme tras 15 minutos sin uso y tarda alrededor de un minuto en despertar.
- **Aceptamos:** el disco del servidor de Render es efímero, así que nada se guarda en local (ni SQLite ni ficheros subidos).
- **Obligación de diseño:** la API no guarda estado propio (*stateless*), y toda la configuración, incluida la cadena de conexión a la base de datos, va en variables de entorno. Esto es lo que hace la migración barata.
- **Se descarta Render Postgres gratuito** porque caduca a los 30 días.
- **Escalado previsto:** pasar a C (Render de pago) si se enseña el portfolio y el arranque en frío molesta.
