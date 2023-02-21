# Reed's Website's Docs' Home

Welcome to the documentation for Reed's Website. Documentation of varied quality abounds.

To get situated on a new machine, see [Development Setup](dev-setup.md). Then head to [Development Process](dev-process.md) for more detail on development and descriptions of scripts.

The source files are divided into [Libraries and Applications](architecture-libs-and-apps.md).

A high-level description of the [Technologies](technology.md) used in this project.

[Documentation How-To](docs-how-to.md) contains instructions to write docs which fit in with the rest of 'em. [The Documentation Template](docs-template.md) is part of the [How-To](docs-how-to.md) instructions. [Not Yet Implemented](docs-not-yet-implemented.md) is a target for links to yet-unmade documentation or features.

## Project Directory Structure/Index

Below is a brief description of the directories and top-level files in the project. Directories generally contain their own, more specific documentation in a `README.md`, linked below.

See [Libraries and Applications](architecture-libs-and-apps.md) to understand why some source code is under the `app/` directory versus `lib/`.

- `app/` contains all end-user applications.
  - [`site/`](../app/site/README.md) is the entry point, a static website to serve via Netlify.
- `lib/` contains isolated libraries with no stand-alone use.
  - No libs yet
- `docs/` contains this documentation
  - Start at the [Docs Home Page](README.md)
