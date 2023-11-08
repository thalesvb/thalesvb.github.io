---
universal_name: abap-code-less-reuse-more-rebels-we-need-your-expertise-documented
lang: en-us
title: "Code less, reuse more: Rebels, we need your expertise documented!"
description: Documentation is not only about a text document. Code readability and examples plays an important role in this topic.
image: blog/resources/abap-code-less-reuse-more-rebels-we-need-your-expertise-documented/img/confused_ikea_man.jpg
series: Code less, reuse more
categories: ABAP
tags: maintainability documentation
---

The magic of some applications ends at the moment you need to inspect, patch or improve it. This shouldn't be this way, and there is a a way to improve this point.

After the [first episode][first_episode], this is our second one: documentation on all fronts.

> _Months after Devtopia fall, the rebels struggles to survive successive attack waves and took refuge in woods while waiting communication from other groups. Intel exchange are rarely made because they didn't have a reliable communication channel. Then one day…_
>
> _– Commander, we have some news from North Rebels: they have successfully developed another weapon that finally will leverage our force against empire and allow us to reconquer capitol city. They are smuggling into our HQ right now._
>
> _– Finally good news!_
>
> _– There is only one caveat sir, some assembly is required…_
>
> {% include post_image.md image="confused_ikea_man.jpg" description="Confused IKEA man" %}
>
> _– Åh nej! Not that again!_

Down to the basics 101: a programming language is called language because it has the same nature of a spoken language: a syntax and semantics to build sentences. Also each language have its own grammar rules and you have to employ them properly to have coherence and cohesion. Yes, we are still talking about code.

Evidence 1:

```abap
method ysoserious.
  data variable type i.
  clear variable.
  ... main logic ...
  clear variable.
endmethod.
```

{% include post_image.md image="cnick.jpg" description="???" %}

ABAP Language ensures that a variable always starts its life cycle with initial value, so it doesn't make sense to clear it right after declaring it. Also why clear it before exiting method? That doesn't make sense at all in this context, but unfortunately it's not very uncommon to see both cases.
This could make some sense with global variables and/or class attributes, but this show that bad refactoring, lazy cut/paste make or even lack of knowledge turns codes uglier.

Languages changes, evolves and adapts, so do programming languages. Tables with header lines could make sense a long time ago when technology allowed only 72 characters per line and it wasn't possible to span a single statement across multiple lines, but nowadays this (obsolete for a few decades) feature create more headaches than solve problems. We don't write Old neither Middle English nowadays, your code shouldn't be using obsolete elements either.

No, we're not going off-topic, because…

## Your code is our prime documentation and we need to understand to improve and reuse it properly

> _Now that ain't workin' that's the way you do it_  
> _Lemme tell ya, them guys ain't dumb_  
> _Maybe get a blister on your little finger_  
> _Maybe get a blister on your thumb_  
> _We got to doc these operators, we gotta reuse it properly_

Let's face the truth: your first action to understand what a piece of code does is read it. This by itself is a good reason to write it properly, and you can learn more about it by by [reading the official style guide][abap_style_guide]. What it proposes is what non-ABAPers already do in their codes (since a long time ago), now we have _la pièce de résistance officiele et publique_ to finally write readable code in peace.

We are already limited by 30 characters, throwing Hungarian notation away frees up 3 of them (if you still don't know how to quickly discover how a variable was declared, time to study again your code editor). Using the name of tables, structures or even data element into naming is also a problem, it doesn't add anything useful to it.

Evidence 2:

```abap
data lt_partner  type standard table of bu_partner with empty key.
data lt_partner2 type standard table of bu_partner with empty key.
```

> _Who are the partners in lt_partner? Sold-tos, employees, contacts? Is lt_partner2 a subset of lt_partner1 or is a entirely different set of partners? Business Partner can be a lot of functions on system, it's impossible to decode that variable name until you investigate how that internal tables are filled._

A readable code is good for your future self, good for your teammates that won't call you on your vacations to ask something about something you wrote and nobody else understands, and is foremost a good business card of a reusable code. We, as humans, tend to only trust on things after we have some level of understanding about it. Reading a code that have a high WTFs/minute ratio makes you think twice about using it on your development, because you look at it and think "no way this is bug-free, I'd rather write it myself".

{% include post_image.md image="wtfm.jpg" description="Real-life example of code review: a good code has less WTFs per minute than a bad one" %}

Code quality also diverges to another topic in reusability: you found something that you can almost reuse, but you need to improve it a little bit to meet your needs. A second look on inner code and you found it was so bad that is impossible to adapt it on remaining time to fulfill the work item. A functional clone is born and that is why sometimes you can find two or more function modules that does the same thing on same system.

## For complex things, refactor it to be more readable

> _Write it, cut it, paste it save it._  
> _Load it, check it… Quick, rewrite it._

A thing that haunt us every other month when doing some maintenance on legacy reports: a piece of code that does a selection, fill a structure, build field catalog, then queries another table, pull forecast info from internet, and do some random calculation about it… all that stuff occupies about 300 lines of code inside a double-nested loop from a form named SELECTION; the program itself have just another form called DISPLAY, and that's it about encapsulation (all variables are global, by the way).

This is the worst case scenario, but even on new come sometimes you go by emotion (because you know, doing magic is addictive) and write big chunks of code. Refactoring them into smaller units makes easy do digest, and you can even give "functional" methods names to make code readable at high level, even [eliminating unneeded comments][coding_without_comments].

The process of refactoring also have a byproduct: eventually you will see that a class was doing two different things and you decide to split it in two classes. These two smaller classes now executes a specific thing, and specific things are way easier to reuse than cluttered things.

## For even more complex mastermind pieces, create additional documentation

```abap
data(question) = xsdbool( to_doc( ) or not to_doc( ) ).
assert question eq abap_true.
```

We have ABAP Doc and good ol' DOCU object, but there is a limit to what can be explained by that tools. Maybe you need to attach an image or a relative large code snippet to explain something, or your reusable thing is made from multiple parts that its documentation would be scattered along multiple objects if done on code.

{% include post_image.md image="manuals.png" description="Tools that doesn't need manuals solve problems. Tools that require them depends on how well that manual is written to solve or make it worse" %}

Remember that everyone can mount a jigsaw puzzle, but is way easier to do it when you know how it should look like when properly mounted. There is no point in creating a reusable thing if no one but you understand. They can use it the wrong way and create problems, or even ignore your solution because it looked too much difficult to reuse it and recreate the feature again (and again, and again…).

## Demonstration programs are also a good way to document things

> _Don't hold back, 'cause you woke up in the morning_  
> _With initiative to move, so why make it harder?_  
> _Don't hold back, if you think about it_  
> _So many people do, be cool man, look smarter._

Developers loves examples: the shortest path to understand something, seeing it in live-action, the possibility to debug it outside the business code. ALV demos are the most debugged reports in any SAP system, not because of bugs but to understand how they do something. Write and pack them into same package of what you are demonstrating, so they can be easily located.

Have a multi-purpose reusable thing? Don't be shy and write multiple reports. Don't forget the main point of them: make it easy to others understand your tool, and not only showcase all available features.

{% include post_image.md image="skifree.png" description="SkiFree wasn't a metaphor for the inevitability of death after all, you could outrun Snow Monster it by pressing F key" %}
This game would be so much fun when launched if a demo mode/tutorial taught us that.

## Easier said than done… but totally worth it

Lack of time is always the one blamed and used as excuse to write bad code. But probably we had short time to write it because we didn't had, or found, or understand a reusable object to speed up our development.This is a vicious circle that keeps going ad infinitum if no one takes the first step to break it. Yes, we all know other factors that makes our time short, sometimes even less than 50% of initial time but at least we can make our real time more productive and thus doing "better things" rather than "just good enough".

<div class="divider"></div>

Stay tuned for more instructions to win this war. Next episode is about interfaces and events as ways to have a stable code with switchable features.

[abap_style_guide]: https://github.com/SAP/styleguides
[coding_without_comments]: https://blog.codinghorror.com/coding-without-comments/
[first_episode]: {% post_url 2019-08-05-abap-code-less-reuse-more-rebels-lets-package-our-tools %}