---
universal_name: abap-meticulous-investigation-in-backend-restricting-fiori-launchpad-abap-theme-selection
lang: en-us
title: "Meticulous Investigation in Backend: Restricting Fiori Launchpad (ABAP) theme selection"
description: Restrict available themes for user selection in Fiori Launchpad with a simple implicit enhancement.
image: blog/resources/abap-meticulous-investigation-in-backend-restricting-fiori-launchpad-abap-theme-selection/img/themesel_after.png
series: ABAP Folk Tales
categories: ABAP
tags: fiori sap
---

We had Blue Crystal, Belize, now we have Quartz. What we haven't until now, 3 Fiori revisions later, is a way to allow only a few selected themes to user choose from. Customers create their themes but are left with two options to restrict theme selection:

* Disable entirely have only a custom one set as default
* Have multiple custom themes, but they have to be displayed alongside all standard ones.

The third option, displaying only customer ones, was not possible… until now.

__Disclaimer__: This is a about an enhancement in INTEROP service, the backbone of all data gathered to make Fiori Launchpad work as we know it (tiles, catalogs, and a bunch of other things). Changing  that service blindly can screw really good your system Launchpad. Read carefully the instructions or ask for system backup before starting, one of them will surely help you in this journey.

__Note__: Those steps were initially done on 7.52 (ABAP Trial) and could be exactly replicated on an older system (7.40). Therefore this standard part is somewhat stable and the procedure should be the same or similar for other stack versions. Steps were done through SAPGUI for Java.

## How did I find where to enhance?

The same way as any Fiori/UI5 application that you know nothing (Jon Snow): peek network traffic in browser [developer console][developer_console_network]. All modern web applications communicate with one (or multiple) backend endpoint(s), and UI5 is no exception (OData / REST). You can find its name there.

{% include post_image.md image="InteropEndpoint.png" description="Themes HTTP request highlighted on Developer Console Network tab, where you can find INTEROP service mentioned on Request URL" %}

Here we have path `/sap/opu/odata/UI2/INTEROP/Themes`. Reading a bit more about how developers implement OData services, you'll find that `SEGW projects` commonly falls into `/opu/odata/sap/` space, so this INTEROP should be a bit special and have a own handler class or, at least, one assigned. You can [find it through SICF][howto_find_icf_implementation] transaction.

{% include post_image.md image="sicf_interop.png" description="Locating INTEROP path on SICF…" %}

{% include post_image.md image="sicf_interop_handler.png" description="…and then locating its handler class." %}

## To debug or not to debug?

Not to debug, be clever. And then debug (cleverly).

We have a name, we have search tools, we have the premise that all new code are implemented in classes. Do the math. Open SE84 and search for it.

{% include post_image.md image="se84_search.png" description="Naming patterns plus good descriptions simplifies our work, we can quickly locate the implementing class." %}

We have the class: `/UI2/CL_EDM_DA_INTEROP_THM_00`. You can either read its source code and locate, or help yourself with [layer-aware debug][howto_layer_aware_debug].

{% include post_image.md image="layer_aware_debug.png" description="Activating layer-aware debug to stop only in that class." %}

{% include post_image.md image="handler_correct_spot.png" description="A debug later, spotted where it fills the internal table responsible for theme list" %}

Enhancement point spotted! Class constructor of class `/UI2/CL_EDM_DA_INTEROP_THM_00`. Just one implicit enhancement there and job is done.

{% include post_image.md image="themesel_after.png" description="Theme selection after enhancement, displaying only High Contrast themes" %}

I could happily finish here but I won't. Let's do this enhancement wise, a pluggable one to be quick to adapt whenever SAP decides to change standard code. Normal development would be with a new customer class wrapping company rules to restrict themes, but I did by creating a BAdI definition and calling it there, and only then implementing a customer class. Why? To share it with you!

You can download/install from git repo [thalesvb/flponprem-themerestriction][repo_theme_restriction] and all you need to do is implement a BAdI with your rules, the same way you do for standard code. Whenever SAP changes (or relocates) that code, git repo will (probably) be updated. You fetch that update for your system, and that's it. No need to manually readapt code on your end.

This is not bulletproof, it is still possible to set any theme with URL parameters because that happens on Fiori Launchpad Javascript, before any call to backend. There is margin to disable this behavior, but that's an excellent start for one horror story and I will not help you with it.

Now if you'll just look right here…

{% include post_image.md image="neuralyzer.jpg" description="[Neuralyzer sound]" %}


[developer_console_network]: https://developers.google.com/web/tools/chrome-devtools/network
[howto_find_icf_implementation]: https://blogs.sap.com/2013/08/10/how-to-find-the-implementation-of-an-icf-service/
[howto_layer_aware_debug]: https://blogs.sap.com/2010/07/27/layer-aware-debugging-in-nw-70-ehp2/
[repo_theme_restriction]: //github.com/thalesvb/flponprem-themerestriction