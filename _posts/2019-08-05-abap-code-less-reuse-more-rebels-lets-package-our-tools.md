---
universal_name: abap-code-less-reuse-more-rebels-lets-package-our-tools
lang: en-us
title: "Code less, reuse more: Rebels, let’s package our tools!"
description: ABAP Packages and how to use it to limit and allow objects usages outside its package.
image: blog/resources/abap-code-less-reuse-more-rebels-lets-package-our-tools/img/4_PackageOverview.png
series: Code less, reuse more
categories: ABAP
tags: maintainability package reuse
---

Packages are one of our foundations to a leaner codebase, but ignored because of a few mistakes done in dark ages of ABAP world. Let's start fresh again and employ it to our well-being.

[After the prologue][prologue], this is our first episode: packages and its hidden powers.

> _Devtopia, once a peaceful and prosperous world, fell down after an unexpected attack from empire. Since that event, inhabitants of this devastated planet have gathered in small villages, hiding into (basement) caves, (wallpaper) woods, helping each other to survive in this decaying era, using their (developers) workbenches to build weapons and use them in a daily faithless fight each day against the oppressor. They knew that if they wanted to reconquer their own planet, they should join once again and collaborate with each other to outpower the empire force._

When you are coding in a development environment, there are only a few times that you really create something new. The most part of your work is dealing with some problem or requirement that someone already faced and provided a solution for it. The most obvious hard proof evidence is ALV, a standard tool to display data in tabular format. Whenever you are asked to display data in tabular format on Dynpro you don’t think twice in what to use.

Another example is updating standard data model, you learn (in a good or bad way) that you must use only standard (provided) functions/classes to change data in these models, because they ensure data consistency in various levels, like table lock, rules modeled in customizing, triggering events / post-actions, cascading replication, all that important stuff that a simply direct "MODIFY/UPDATE" in standard table will not handle. You don’t need to fully understand all the intrinsics of standard data models to comply with them, call the provided APIs and you are good to go.

Looking on our own turf, the Customer Namespace, well… it somewhat remembers me the 300 movie…

>_– The spartan guys?!_
>
>_– No, the Immortals. From outside it looks outstanding, powerful, but is simply defeated by a few guys well trained and coordinated._
>
>_– Oh…_

Our data models are (prone to be) systematically ignored and almost no one feel bad about it. If you do a where-usage in the top 5 Z application tables used in your system and find that at least one have more than 5 different blocks that use a INSERT/MODIFY/UPDATE statement to change table data, you should start to feel bad about it right now.

This same problem is generally followed up by another: code duplication. Since tables updates are done directly in application code instead of a central point, all checks necessary to guarantee data consistency is repeated in multiple points. If you need to add one additional check, you have to repeat this check in all those points, or you are introducing a silent bug that may be only detected weeks or months later that went into production when you are confronted with inconsistent data.

Business operations is functional, but what sustains it is somewhat fragile and requires more time than really needed to keep things working in a shiny state. One way that we can do it better is properly using all the power of packages.

## What is package?

> _Baby don’t overlook me, you must use me, much more._

Package is a container to group objects (really) related in some way, and can be nested to make a hierarchy of related things. You don’t just throw your clothes randomly into a wardrobe, you keep them organized because life taught you that is easier to find something in that way. Code have the same principle, you have to organize those boxes and name them properly. As your codebase grows, more packages are needed to keep them organized (in hierarchies).

The concept is as simple as that, a way to organize your source code (and all other development objects, ABAP ties them into a package). But why we have this mess into code organization?

* Its concept is simply unknown by a considerable part of ABAP Developers, because is not taught in basics. If you never programmed in another language that uses packages, you just assume that those plain few packages that you see on system, created in late 90’s and early 2000’s, are the correct way to use packages, because 20 years passed and no one changed or questioned it.
* There are various types of packages in ABAP, terminologies along the time like client/server, which overcomplicated a simple thing for beginners when they search information in Help pages.
* Help pages itself wasn’t nicely as today, giving only a brief explanation of package purpose and pointing you to inaccessible links for outsiders, like [this one from a doc made ten years ago][package_help_miswritten].

Not a good impression at first sight, but don’t run away yet, stick a bit more. You already paid for this ABAP trip, so let’s make it enjoyable. Do a rollback in those statements and start fresh again.

We want to organize, we want to make it easier to find things, we want to everyone respect and comply with data models. How packages can help me in that? Another ally join the fight: the almighty Package Interface.

## Package Interface… what?

Package itself group related things, but don’t differentiate what is a internal component and what is intended to be reused. That role is done by Package Interfaces, which lists what things from that package are public (intended to reuse); not finding a object in that list means that you shouldn’t be use it outside that package. One should look at it as a contract between developers:

> _You should only use what I told because I will always ensure that they’ll have the same functional behavior, even when I must to do some major changes in my internal components. You can’t blame me if you don’t fulfill our contract and something become broken on your side._

This is the same principle of designing and publishing an API, indeed our reusable code is a internal API for our system code.

This could even be checked and enforced by workbench tools, but…

## Package Check: Drawbacks

### Package Check is off by default

Yes, you read that right: it’s not on by default. Package checks do nothing while this check is turned off. No sorcery is required to activate, just two steps:

1. Open `SM30` for `PAKPARAM_V`
1. Change `GLOBAL_SWITCH` key to `RESTRICTED` value.

{% include post_image.md image="pakparam_v.png" description="PAKPARAM_V maintenance view with GLOBAL_SWITCH set to RESTRICTED" %}

While it is harmless to activate it, it is strongly advised to talk with our development leader or customer IT technical representative before activating it in your work system.

This is entirely optional as it only eases to check the code compliance that leads to a better codebase. But you can benefit from packages interface even with check turned off, but will be more like a verbal agreement.

### You still need to write use access to comply with Package Check

This is one thing that overcomplicate packages in ABAP: if you want to use a reusable object from a package in a code contained in another package, you must add the package interface to use access list.

This access list is one way to manage obsolete code deprecation and decommissioning. Even reusable code have a lifespan, because they can be improved so much that a new version of it is created, and you need to give time to everyone transition to the new reusable code.

Again, this is optional and only required if you are going to turn on Package Checks.

## Let’s review it all with a example

> _I want something else to get me through this semi-charmed kind of ABAP…_

Our example consists in (re-)create a simplified Business Partner Model. If you jump started your reading onto this part: shame on you. Read it from start and enjoy some sci-fiction (Did you know Code inspector configuration TCode is `SCI`?).

Our BP model is designed with only one table, and simply stores BP Number and its name. To guarantee consistency, a lock object is also created. Our design model it as a class and this class is the only intended object to be used by outside world (packages).

### Step 1: Organize everything related into a (encapsulated) package

Create package is easy as create a class/report: TCodes `SE21`, `SE80` or in Eclipse ADT itself.

{% include post_image.md image="1_PackageCreation.png" description="Creating Package Z_BUPA" %}

We need to tell that this package is encapsulated, that only objects described in Package Interface should be used by others. If you created in Eclipse ADT, you need to edit package and mark this flag, there is no way (until now) to do that while creating.

The table, lock object and class are also created in this package, just skipping how they are created.

### Step 2: Create a Package Interface and spread the word to the world

Also another step easy to do, just create the package interface and add objects to it.

{% include post_image.md image="2_PackageInterfaceCreation.png" description="Creating Package Interface ZIBUPA" %}

The UI to add objects to package interface could be better, because it required to fill fields in a more technical way.

{% include post_image.md image="3_AddObjectToPackageInterface.png" description="Adding a class ZCL_BUSINESS_PARTNER to Package Interface" %}

You can find that information in Object Directory Entry.

{% include post_image.md image="3a_ObjectEntry.png" description="Screenshot highlight the fields you use for adding object to Package Interface. They are the last two fields from Object line, after R3TR" %}

After adding objects to interface, save it and everything is ready.

{% include post_image.md image="4_PackageOverview.png" description="Screenshot showing an overview of Package Interface right after adding an element" %}

Our rip-off Business Partner is designed to be manipulated only by `ZCL_BUSINESS_PARTNER` class. All of its internal components, like database table and enqueue object should never be used outside this class, because our class handles them. If is required to extend this model, like make it replicate to another system, I could trigger that logic on `SAVE` method from this class and everyone who handle this data with this class will benefit from this improvement.

## Package Check: an ally to discover what code is trespassing our interfaces

All our efforts will be all in vain if no one respects the game rule. Package check

A development was delegated to developer who had fear to fight against empire. The development commander first task was to create a package for this development and give use access to our Business Partner API.

{% include post_image.md image="PackageUseAccess.png" description="Other package declaring the use of our fresh ZIBUPA Package Interface" %}

The mischievous developer wrote the code below, which does a direct select on a table not public visible by package interface.

{% include post_image.md image="5_ExternalProgViolating.png" description="A code snippet outer Z_BUPA domains using a table private to Z_BUPA, not exposed on its Package Interface ZIBUPA." %}

Our commander, in a routine check, found this with Package Check, alerting a problem a potential problem in our base.

{% include post_image.md image="6_PackageCheckError.png" description="Check results pointing that program for not respecting game rules" %}

The responsible for this code was found and conducted to an interrogation room.

> _– Bro, WTF?_
>
> _– I did what this spec told me: a select in a table…_
>
> _– No no no no! Don’t be too literal with what is written on spec. Try this way instead…_

## Change your coding workflow

The next time a development requires you to read or change data in a specific table, you first task is to identify what package that table belongs and verify if there is a function or class declared on its package interface that directly manipulate that table.

In a sci-fi world that everyone complies to packages interfaces, not finding a reusable object for changing data means one thing only: it is not supposed that you change data in that table by direct means (i.e. the requirement is wrong). The Package Interface

But remember, what as sci-fi in the past is now reality.

<div class="divider"></div>

Stay tuned for more instructions to win this war. Next episode is about some topics of documentation and how it can gear up your development speed.

Spoiler alert: Documentation is much more than a text document, even a code can be a documentation.

[prologue]: {% post_url 2019-06-03-abap-code-less-reuse-more-rebels-rejoin %}
[package_help_miswritten]: https://help.sap.com/doc/saphelp_nwpi71/7.1/en-US/af/40bd38652c8c42e10000009b38f8cf/frameset.htm