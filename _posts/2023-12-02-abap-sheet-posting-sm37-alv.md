---
universal_name: abap-sheet-posting-sm37-alv
lang: en-us
title: "SM37 as ALV"
description: Enabling ALV (GRID mode) in SM37 transaction.
image: blog/resources/abap-sheet-posting-sm37-alv/img/sm37_after_log_filter_option.png
series: ABAP Sheet Posting
categories: ABAP
tags: tips
---

`SMX` transaction displays your own jobs in a pretty ALV, filterable and all the good gimmicks, but `SM37` is stuck in the past.
Well, it was, but long time ago it evolved and no fanfare nor red carpet was available for announcement. 
Yet you probably didn't knew until now because it is a rather non-trivial way to enable it and the only official documentation is scattered through Notes 589568 and 730451.

I actually found it through this [answer][sap_answer_enable_sm37_alv], with so many views that  deserves a blog of its own.

*Reviewer note: [it was actually blogged on 2011][sm37_mit_alv_grid], but search engine algorithm didn't put it where it deserves.
Let's bump it.*

## How-To

Run report `BTC_SWITCH_LIST_GRID` and activate it to your user through *Individual Settings* section by selecting *GRID Display*.

{% include post_image.md image="initial_screen.png" description="Report's initial screen." %}

Once you execute the screen, changes are persisted and presented through a pop-up.

{% include post_image.md image="saving_changes.png" description="Pop-up informing what actually changed due Save action." %}

**Note**: Take care to update your user only.
Otherwise you will bring joy to everyone else, and for things like that you must communicate first to give them time to plan a party.

## See the new horizon
Open SM37 again and the ALV presentation is now enabled.
Enjoy it!

{% include post_image.md image="sm37_after.png" description="Report's initial screen." %}

{% include post_image.md image="sm37_after_log_filter_option.png" description="Report's initial screen." %}

{% include post_image.md image="log_applying_filter.png" description="Report's initial screen." %}

{% include post_image.md image="log_filter_result.png" description="Report's initial screen." %}


[sap_answer_enable_sm37_alv]: https://answers.sap.com/answers/13070450/view.html
[sm37_mit_alv_grid]: https://tricktresor.de/blog/sm37-mit-alv-grid/