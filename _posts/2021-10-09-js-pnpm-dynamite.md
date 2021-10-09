---
universal_name: js-pnpm-dynamite
lang: en-us
title: "It's a dynamite: PNPM"
description: A better Package Manager without learning from scratch.
categories: JavaScript
tags: pnpm
---

NPM drains storage space rather quickly when installing dependencies. It may not be a concern for you but is a thing that bothers and busted me once while working on a remote workspace with storage quota.

Note for myself (since I don't work daily with JavaScript), the perfect NPM replacement: PNPM. There are other [benefits other than space saving][motivation] and other features not available on NPM, but my selling point is: read [Twitter testimonials about it][twitter_testimonials].

If you know NPM you basically know how to use PNPM, you don't even have to change ``package.json``, just install PNPM and add another “p” for extra power.

```shell
pnpm install
pnpm run
pnpm start
```

Try it now.

[motivation]: https://pnpm.io/motivation
[twitter_testimonials]: https://twitter.com/search?q=@pnpmjs