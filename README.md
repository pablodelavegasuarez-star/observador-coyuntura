# Observatorio de pensiones

Observatorio de las pensiones en España con dos piezas:

- **Indicadores fiscales** del sistema de pensiones, construidos a partir de datos públicos.
- **Simulador de la rentabilidad real** de la pensión contributiva: qué rendimiento, descontada la inflación, obtiene una persona por lo que ha cotizado.

## Estado

En construcción. Es un proyecto de aprendizaje y todavía no tiene funcionalidades disponibles.

## API publicada

La API está desplegada en Render, en el plan gratuito (ver [ADR-001](docs/adr/ADR-001-despliegue.md)):

- Estado del servicio: <https://observatorio-pensiones-api.onrender.com/health>
- Documentación interactiva: <https://observatorio-pensiones-api.onrender.com/docs>

> **Aviso:** en el plan gratuito, el servicio se duerme tras 15 minutos sin recibir visitas y tarda alrededor de un minuto en despertar. Si la primera carga tarda, espera y vuelve a cargar la página.

## Aviso

Este proyecto tiene fines divulgativos y de aprendizaje. No es asesoramiento financiero, fiscal ni jurídico. Para decisiones sobre tu pensión, consulta a la Seguridad Social o a un profesional.

## Licencia

Distribuido bajo licencia MIT. Consulta el fichero [LICENSE](LICENSE).
