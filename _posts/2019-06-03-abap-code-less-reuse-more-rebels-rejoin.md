---
universal_name: abap-code-less-reuse-more-rebels-rejoin
lang: en-us
title: "Code less, reuse more: Rebels, rejoin!"
description: Prologue of a series about code maintainability and reuse.
series: Code less, reuse more
categories: ABAP
tags: maintainability reuse
---

We must resist and fight against the stakeholders empire. Let's make our world (code) better to live!

>_This is a prologue to a series of episodes about applying current tools available on ABAP Stack to lead code into maintainability track. This side project is sponsored by your likes, the first episode is guaranteed but the next ones depends on community reaction._

Maintainability is one of important foundations to have a good codebase. Recapping [its definition from Wikipedia][maintainability],

> Maintainability is the ease with which a product can be maintained in order to:
> * correct defects or their cause,
> * repair or replace faulty or worn-out components without having to replace still working parts,
> * prevent unexpected working condition,
> * maximize a product's useful life,
> * maximize efficiency, reliability, and safety,
> * meet new requirements,
> * make future maintenance easier, or
> * cope with a changed environment.

## Why maintainability is important?

Requirements changes, arises, bugs are found, performance problems are identified, new technologies / 3rd party software must be integrated. Time passes and codebase grows. If you don't keep it tidy and clean, you are asking for trouble, even for your future self.

> _The <del>bomb</del> <ins>code</ins> has been planted!_

Reusability is one path to achieve better maintainability, because the reusable part is extensively test edin a multitude of scenarios, and when you fix or improve this reusable part, you are fixing /improving the same situation in all others scenarios that use it. Not only that, you write new code faster, because this reusable part is assumed to be working as expected, you just need to test and validate your new lines.

Code duplication, for example, is something everyone wants to avoid, and one good example of how things can be done better when you have reusability in mind. You, as a developer, don't want to rewrite everything every time. On the same thread you have decoupling, a piece of code that does only one specific task. Something decoupled can be easily reused.

Let's take a car, for example, to visualize these concepts (or recap them):

* A manufacturer reuse the same engine, transmission, chassis, and almost every piece in a multitude of vehicles, with some adjustments (classes/function modules and its parameters).
* Those pieces are decoupled and are built to execute a specific task: engine turns fuel into mechanical energy, transmission adapts the output of the engine to the drive wheels, chassis is a solid support for every major part of a car, and hold everything together.
* If something breaks or wears out, you can simple change it. You don't buy a new car when the tires are worn out.
* With fuel evolution, first adapted cars replaced only engine/drive train (rewrite to work in HANA / integrate with external software) and kept all others components, because they still works fine for now. There is room for improvements, body were designed for keep fossil fuel engine cool and this is not required in electric engine, so a new body with lower drag coefficient can be designed (take HANA / external software capabilities to build features unthinkable in old scenario).
* The driver (end-user) still know how to drive the car, even if every internal component is changed, because the throttle, brake pedal, wheel is the same (user interface). Fancy features like radio controls can be added (Fiori, Flutter, Angular, Xamarin, any other UI technology, there are plenty), and only minor changes are required in the car internal components (OData/REST/Cloud Connector/API Management).

Because manufacturers don't reinvent the wheel every time they need to build a new car model, they save money, and less expenses turns into a bigger profit margins.

{% include post_image.md image="aha.jpg" description="A smart ostrich from a famous comedy cartoon laughing about this lame but yet precise IT joke" %}

## The empire is ruling over us

These principles are used almost everywhere, because they are not new. Somehow they don't landed properly in ABAP world (or landed pretty late). If the system you works only use a plain packages layout based on standard modules name (ZFI, ZSD,…), which simply hides everything almost barely related in the package related to module/team responsible to develop it, the empire already took the power. They can even exist inside those generic containers, but you are on your own to identify what is written to be reused or not. You must resist and fight back to make this information public!

## Take your weapons and join us in the battlefield

Packages are simple but a powerful weapon in this war. You only reuse something if you know it exists, and you ensure everyone reuses it when you lock down the internal objects and exposes only the ones which should be used.


Stay tuned for more instructions to win this war. Next episode is about packages and how Package Check is used to blame who violates reusable objects and collaborates with the empire in this fight.


[maintainability]: https://en.wikipedia.org/wiki/Maintainability