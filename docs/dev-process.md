# Development Process

[Back to Docs Home](README.md)

Follow the steps in [Dev Setup](dev-setup.md) before running any scripts described here.

## Scripts

Top-level scripts in [package.json](../package.json):

- `npm run initialize` to install all NPM dependencies.
- `npm run all:install` installs just the package-specific dependencies. Used by `initialize`.
- `npm run docs:serve` runs a simple server to view the documentation.
- `npm run docs:browse` opens your web browser to the documentation home page.

For package-specific scripts, review docs in their directories:

- [`app/site`](../app/site/README.md) to run a dev server and build the site.

## View Documentation

To view documentation in your browser, run `npm run docs:serve` and then `npm run docs:browse`. This is the same documentation you are reading now, but in HTML instead of raw markdown.

[Back to Docs Home](README.md)
