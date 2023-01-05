# Development Process

[Back to Docs Home](README.md)

Follow the steps in [Dev Setup](dev-setup.md) before running any scripts described here.

## Scripts

Top-level scripts in [package.json](../package.json):

- `npm run initialize` to install all NPM dependencies.
- `npm run all:install` installs just the package-specific dependencies. Used by `initialize`.
- `npm test` runs tests on each package in a logical order.

For package-specific scripts, review docs in their directories:

- [`app/site`](../app/site/README.md) to run a dev server and build the site.

[Back to Docs Home](README.md)
