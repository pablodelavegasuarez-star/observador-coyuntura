# ADR-003 · Cuarentena de dependencias

- **Estado:** aceptada
- **Fecha:** 2026-11-18
- **Decide:** Pablo
- **Revisar:** cuando se monte la integración continua, y si la cuarentena retrasa un parche de seguridad más de una vez.

## Contexto

Un ataque a la cadena de suministro (*supply chain attack*) habitual consiste en publicar en PyPI una versión maliciosa de un paquete popular, a menudo con la cuenta robada de quien lo mantiene. Estas versiones suelen detectarse y retirarse en cuestión de horas o pocos días, pero quien las instala en ese intervalo queda expuesto.

Al crear el backend (ver [ADR-002](ADR-002-framework-api.md)), `uv.lock` incluía siete paquetes publicados en la última semana, entre ellos `fastapi` 0.164.0 y `filelock` 4.2.12, publicados el mismo día.

`uv.lock` fija versiones exactas y `pip-audit` detecta vulnerabilidades ya conocidas, pero ninguno de los dos protege frente a una versión maliciosa recién publicada que aún no figura en ninguna base de vulnerabilidades.

uv permite ignorar las versiones publicadas hace menos de un plazo (`exclude-newer`), ya sea un plazo relativo o una fecha fija, y hacer excepciones por paquete (`exclude-newer-package`).

## Opciones consideradas

| Opción | Configuración | A favor | En contra |
| --- | --- | --- | --- |
| A | Plazo relativo de 7 días: `exclude-newer = "7 days"` | Cubre la ventana habitual de detección con margen; las actualizaciones siguen llegando solas, con una semana de retraso | Las novedades, incluidos los parches, llegan con una semana de retraso |
| B | Plazo relativo de 3 días: `exclude-newer = "3 days"` | Menos retraso | Margen más justo si un ataque tarda en detectarse |
| C | Fecha fija: `exclude-newer = "2026-11-11T00:00:00Z"` | Totalmente reproducible | Hay que moverla a mano para recibir actualizaciones; es fácil olvidarlo y quedarse con versiones antiguas |
| D | Sin cuarentena | Sin fricción | No protege frente a una versión maliciosa recién publicada |

## Criterios

Reducción del riesgo de instalar una versión maliciosa, retraso en recibir parches, esfuerzo de mantenimiento y reproducibilidad de la instalación.

## Decisión

**Opción A:** cuarentena de 7 días, configurada en `backend/pyproject.toml`:

```toml
[tool.uv]
exclude-newer = "7 days"
```

Es un proyecto de aprendizaje, sin necesidad de estrenar versiones el mismo día, así que el coste de esperar una semana es casi nulo frente a la protección que aporta.

## Consecuencias

- **Versiones más antiguas al adoptarla:** al activarla, ocho paquetes bajaron a su versión anterior (por ejemplo, `fastapi` 0.164.0 → 0.162.4) y se rebajaron las versiones mínimas de `fastapi`, `httpx2` y `ruff` en `pyproject.toml` para que fueran compatibles con la cuarentena.
- **Aceptamos:** los parches de seguridad también esperan 7 días, salvo excepción (ver el procedimiento más abajo).
- **No es una protección completa:** cubre versiones maliciosas nuevas, no fallos en versiones antiguas. Para eso sigue `pip-audit`; ambas medidas se complementan.
- **El resultado de `uv lock` depende del día:** regenerar el lock en otra fecha puede dar versiones distintas. Es lo esperado.
- **El lock no caduca con el tiempo:** `uv.lock` guarda el plazo (`exclude-newer-span = "P7D"`), no una fecha, y las versiones ya fijadas no se vuelven a comprobar contra el corte. Se comprobó simulando el reloj de uv (variable interna de pruebas `UV_INTERNAL__TEST_CURRENT_TIMESTAMP`, uv 0.13.9) a +1 mes y +1 año: `uv lock --check` y `uv sync --locked` siguieron pasando, mientras que cambiar el plazo o las dependencias sin regenerar el lock sí hizo fallar la comprobación. Conviene repetir la comprobación si se actualiza uv, porque esa variable no forma parte de su interfaz documentada.
- **Fricción al añadir dependencias:** `uv add` propone como mínimo la versión más reciente que admite la cuarentena; subir ese mínimo a mano a una versión en cuarentena hace fallar la resolución.
- **Herramienta de empaquetado (`uv_build`):** con uv 0.13.9 en local no se ve afectada. Queda pendiente verificarlo con la versión de uv de la integración continua y de Render.

## Procedimiento de excepción para un parche de seguridad urgente

1. **Decide Pablo.** Ninguna excepción se aplica sin su aprobación explícita.
2. **Se aplica solo al paquete afectado** con `exclude-newer-package` en `backend/pyproject.toml`, con un comentario que indique el motivo (identificador de la vulnerabilidad), la fecha y la versión:

   ```toml
   [tool.uv]
   exclude-newer = "7 days"
   # Security exception approved by Pablo on YYYY-MM-DD: <CVE/GHSA id>.
   # Remove once <package> <version> is older than 7 days.
   exclude-newer-package = { "<package>" = false }
   ```

   Después se regenera el lock con `uv lock --upgrade-package <package>` y se pasan las comprobaciones habituales.
3. **Se retira** en un pull request nuevo cuando la versión instalada supera los 7 días de antigüedad. Basta con borrar la excepción y comprobar que `uv lock` no cambia ninguna versión.
