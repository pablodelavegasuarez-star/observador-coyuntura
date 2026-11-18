# CLAUDE.md · Reglas del taller

## Contexto

Este repositorio es un proyecto de aprendizaje: un observatorio de pensiones en España, con indicadores fiscales basados en datos públicos y un simulador de la rentabilidad real de la pensión contributiva. Lo construye Pablo, consultor de negocio sin experiencia en desarrollo. El objetivo es que él entienda el proceso de desarrollo y tenga criterio técnico, no que el código se escriba lo más rápido posible.

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
11. **Reglas de pensiones con fuente.** Cada regla de cálculo lleva un comentario con su fuente oficial (BOE, Seguridad Social). Si no estás seguro de una regla, dilo y no la inventes.
12. **Datos ficticios.** Nunca uses datos personales reales en pruebas ni ejemplos.
13. **Idioma.** Código, nombres y mensajes de commit en inglés. Documentación (README, ADR, metodología) en español. Conmigo hablas en español.
14. **Pregunta antes de suponer.** Si falta un dato, una regla o una decisión, pregúntame o márcalo como pendiente. No rellenes huecos por tu cuenta.

## Arquitectura

La estructura de carpetas y los nombres de las capas se fijan en la semana 2 con su ADR. Principios que ya rigen:

- Separación por capas: ingesta de datos, almacenamiento, cálculos (indicadores, escenarios, simulador), API y frontend.
- La capa de cálculos es pura: no depende de la API, la base de datos ni la interfaz, y se prueba sola.
- El frontend no calcula nada: pide resultados a la API a través de su contrato OpenAPI.
- La API no guarda estado propio; toda la configuración va en variables de entorno (ver `docs/adr/`).

## Comandos habituales

(Se completará en las semanas 1 y 2.)
