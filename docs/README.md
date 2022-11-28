# Documentation Home

You are at the entry-point for documentation. Find links to other documentation here.

Further documentation is available for each application and library. Check their respective `README.md` files.

## Top-Level Docs

- [Libraries and Applications](architecture-libs-and-apps.md) explains why the source files are divided as such.
- [Technology](technology.md) provides a high-level description of technologies in this project.
- [Documentation How-To](docs-how-to.md) contains instructions to write docs which fit in with the rest of 'em
  - [The Documentation Template](docs-template.md) is part of the How-To [How-To](docs-how-to.md) instructions.
- [Not Yet Implemented](docs-not-yet-implemented.md) is a target for links to yet-unmade documentation or features.

## Project Directory Structure/Index

Below is a brief description of the directories and top-level files in the project. Directories generally contain their own, more specific documentation in a `README.md`, linked below.

See [Libraries and Applications](architecture-libs-and-apps.md) to understand why some source code is under the `app/` directory versus `lib/`.

- `app/` contains all end-user applications.
  - [`site/`](../app/site/README.md) is the entry point, a static website to serve via Netlify.
- `lib/` contains isolated libraries with no stand-alone use.
- `docs/` contains this documentation - start at the [Docs Home Page](README.md)
