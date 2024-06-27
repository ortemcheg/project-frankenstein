# Project Frankenstien

## Overview

I created this project to advance my skills in Node.js, configuring the TypeScript compiler, Telegram API, OpenAI API, GitHub Actions, and maybe other technologies. These are areas that interest me very much, but I can’t find enough time to practice them in a systematic way, so I am going to have fun with these pieces of technology here. Under H2 headings, I’ll be adding things that I find interesting, surprising, or valuable about the tech that I’m using here. Working on this project will also allow me to maintain some valuable knowledge, which tends to fade away if I don’t practice it for some time.

## TypeScript

The `compilerOptions.module` option tells the TS compiler the module format of the target environment, not the source (e.g., Node or browser, though the `module` option value is more specific, of course). The target environment in the TS documentation is referred to as the host. The host is what consumes the JavaScript emitted by the TS compiler.

### Gotcha: Module specifiers are not transformed

Module specifiers are strings that follow `from` in `import something from "./module.js"`. So if you wrote somthing like `import hello from './world.ts'` and then compile it to JS, the TS compiler won't replace `./world.ts` with `./world.js` (note the extension). You'll get a compilation error if you try to run this in Node or in the browser.

Interestingly, in your source code you can import a file with `ts` extension but reference it as a `js` file, so the following line in your sourfile:
`import something from './module.js`
will be interpreted by the TS compiler as
`import something from './module.ts` (note the extension) and thus resolved successfully.

The compiler won't change the specifier and hence your target environment will also resolve it successfully.

Explanation from TS Docs.

#### The reason

> why TypeScript doesn’t modify import specifiers during emit: the relationship between an import specifier and a file on disk (if one even exists) is host-defined, and TypeScript is not a host`

ECMAScript does not specify the algorythm for how modules should be resolved. So it's up to the host to create module resolution rules. An since TS compiler's job is to

> Ensure that imports in those outputs will resolve successfully

The TS compiler does not touch the specifiers and leaves the job of transforming module specifiers to developers.
