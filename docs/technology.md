# Technology

[Back to Docs Home](README.md)

This is a high-level description of the technologies used across this project. Libraries and applications also rely on technologies specific to them, and you can find descriptions of those technologies in their respective documentation.

## Typescript

A static type system for JavaScript. This project [follows this setup](https://blog.logrocket.com/make-sharing-typescript-code-types-quick-easy) though it will probably deviate as time goes on.

This project also extensively uses the Typescript configuration `"paths"` to reference internal libraries by name instead of by relative paths. When you see `"@lib/"` in an `import` statement, this is possible because of this configuration in the nearest `tsconfig.json` file. This supports the [Library/Application](architecture-libs-and-apps.md) idea without complicated and fragile file paths everywhere.

The `"paths"` configuration enables the Typescript compiler to find the modules to check types, but it does not modify the compilation output as [these docs](https://github.com/TypeStrong/ts-node#why-is-this-not-built-in-to-ts-node) explain. Thus, those `"@lib/"` custom names show up in the `dist` JavaScript files. Unfortunately, Node needs extra help to interpret those custom names. Enter the [tsconfig-paths package](https://www.npmjs.com/package/tsconfig-paths). The additional option to the `node` executable `-r tsconfig-paths/register` will reuse the paths defined in `tsconfig.json`.

## NodeJS

JavaScript run-time.

## Netlify static hosting

The entry point to the application and other pages which do not contain dynamic content are hosted by Netlify.

## Vite

Static site generator

## [Vite Plugin SSR](https://vite-plugin-ssr.com/)

A supercharged Vite plugin which emulates Next.js/Nuxt philosophy in Vite.

[Back to Docs Home](README.md)
