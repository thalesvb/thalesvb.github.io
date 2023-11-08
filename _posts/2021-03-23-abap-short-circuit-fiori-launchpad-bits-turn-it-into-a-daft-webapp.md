---
universal_name: abap-short-circuit-fiori-launchpad-bits-turn-it-into-a-daft-webapp
lang: en-us
title: "Short Circuit Fiori Launchpad bits: Turn it into a daft WebApp"
description: Turn Fiori Launchpad into a (sort of) PWA and make it installable on devices.
image: blog/resources/abap-short-circuit-fiori-launchpad-bits-turn-it-into-a-daft-webapp/img/abap_install_prompt.png
series: ABAP Folk Tales
categories: ABAP
tags: fiori sap
---

[Fiori Client removal from app stores][sapnote_fiori_client_removal] was a buzz few months ago, big enough to make SAP rethink about its phasing out plan: postpone removal date, change distribution channel from (manual) ONE Support Downloads into a Managed distribution through stores (some business steps involved, but easier easier for common employees install on device).

Wouldn't be nice if they embraced Progressive Web App philosophy into Launchpad roots? They sell as Fiori apps, why not take it seriously as an app platform?
   
While you and me daydream about it, let's toy around what we have today.

## Disclaimers

Few days before publishing I saw [this answer][question_about_fiori_app_without_mobplat] from Gregor Wolf mentioning a video from [an earlier UI5Con][video_link_onprem_launchpad_as_pwa]. I saw it quickly (2x speed) and looks partially to what I tell here.

That video also focus on a proper Service Worker; something that I stub here for a reason also mentioned on video: there are quirks to use it on Launchpad. The main one for me, at development view, is being hostage of Framework/Vendor: there is no public documentation / API for Cache Buster tokens and (at the time of video) some UI5 requests were doing synchronous calls that bypass Service Worker. You can reverse-engineer the standard and implement into a functional state. It is unlikely to break between upgrades but the risk exists.

Sorry about some mobile screenshots taxing your scroll, blog engine sanitize any max-width/max-height attempt.

Chrome doesn't provide a way to manually change its display language on Linux (only ABAP sandbox have English as OS language), so I took the freedom to take Mobile screenshots in Portuguese too (silent protest against poor translation quality in some areas of Solution Manager).

## A (very) brief intro to PWA

Read [this page][pwa_intro].

What? It's brief to me, three words. That's not cheating, it's reuse. Who already heard about this will thank me for not wasting their time.

Ok, I will extend a bit: PWA is a way to make Web Applications (Web pages)  have a "native application" feeling to end-users, and one of those things is allowing them to install it (aka. Add to Home Screen, A2HS), the main focus today.

## Requirements to PWA be installable

Read [this other page][pwa_installable_webdev] or [this one][pwa_installable_mdn].

> _Stop with this laziness man!_

Seriously, read them. There are common requirements for all browsers, but each one can have a different requirement, because [PWA is still a draft specification][appmanifest_standard_history], even seven years after its first public draft.

Quick story short: to enable installation on Chrome, Firefox and Edge you must have two files declared in HTML: a [Web Application Manifest][appmanifest_standard] and a JavaScript to register a [Service Worker][service_worker_standard]. Service Worker operates in a separate file, you'll also have to write it and serve it too.

Functional stubs (at least on time of publication) for each resource are provided below for your laziness:

__Web Application Manifest__

```json
{
    "name": "Bonder Lostpad",
    "short_name": "BLP",
    "icons": [
        {
            "src": "/pwa/icon192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/pwa/icon512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#000000",
    "display": "standalone",
    "scope": "/",
    "start_url": "/"
}
```

__JavaScript to register a Service Worker__

```javascript
if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/pwa/sw.js', {scope: '/'})
        .then(function(registration) {
            console.log('Service Worker Registered with scope:',  registration.scope);
        });
}
```

__Service Worker itself__

```javascript
self.addEventListener('fetch', function(e) {
  // Hi, I'm Stubo!
});
```

__Top tip__: The easiest way to check if requirements to install are fulfilled is using Google Lighthouse, it pinpoints what is missing and what has error. This example, for example, will stop working in Chrome later in 2021, because it will be mandatory to have a offline mode.

{% include post_image.md image="pwa_lighthouse.png" description="Lighthouse results about our Launchpad enhanced with those stubs" %}

Now you know that the main focus to enable it lies in HTML and JavaScript running on it. Time to inspect Fiori Launchpad.

## Bird's-eye view onto Launchpad resources: identify which HTML pages are loaded

To know where to inject files we need to know what HTML pages make part of Launchpad experience. Developer console will aid you, it's just a filter away.

{% include post_image.md image="flp_dev_console.png" description="Developer console tracing HTTP requests, filtered by Document (HTML)" %}

Two HTML pages are identified: Login Screen and Launchpad itself. Too easy, I didn't even sweat.

## Non-invasive approach: Injection on HTTP response

The concept is very simple: ABAP system keeps untouched, we hijack some HTTP requests and inject PWA-related things into response, like a man-in-the-middle attack. Actually it is exactly like that and is legal: a Reverse Proxy doing content rewrite.

The one I used was Nginx, but you should be OK with any other like Apache. The needed features here are Content Rewrite and serve static files (for PWA specific resources).

Put the rules, spawn service and good to go!

```nginx
# Only relevant bits of nginx config.
# It could be better written...
location  /pwa/ {
    alias /var/pwa_stuff/pwa/;
}
location = /pwa/sw.js {
    types { } default_type "text/javascript";
    add_header "Service-Worker-Allowed" "/";
    alias /var/pwa_stuff/pwa/sw.js;
}
location = / {
    proxy_pass https://system.somewhere/sap/bc/ui2/flp;
    # PWA subfilter: Inject the stuff
    sub_filter_once off;
    sub_filter '<head>' '<head><link rel="manifest" href="/pwa/manifest.webmanifest">';
    sub_filter '</body>' '<script type="text/javascript" src="/pwa/app.js"></script></body>';
    sub_filter '/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html' '/';
}
```

{% include post_image.md image="pwa_launchpad.png" description="Install prompt for Bonder Lostpad in desktop" %}

{% include post_image.md image="mobile_install_banner.jpg" description="Install banner on mobile and also highlighting install option on browser menu" %}

Being installable, you can also have shortcuts for specific tasks (Fiori apps). Don't expect too much, it is less flexible than native app shortcuts.

{% include post_image.md image="pwa_shortcuts.jpg" description="PWA shortcuts for Solution Manager specific apps" %}

> _Celebration tonight, celebrate, don't wait too late…_
>
> _"Aw man, you can't stop now. This will not fulfill your blogging quota," ten minutes rule said._
>
> _"But we're just going to celebrate," said me. "Can I Crescendolls ipsum it?" I thought._

Shoot, I forgot why I wanted to blog this. That's what happens when you stop [to listen some robots rocking][compressorhead] (those aren't the ones you are thinking of ). Let's get back to the program.

## One more time, ABAP approach

Many ABAP landscapes have a kind of Reverse Proxy running called SAP Web Dispatcher. I don't recall any Rewrite Content feature on it (I could be wrong, it's not my expertise), but still this software is handled as a sensitive part of Landscape and is out of bounds for a common Developer, the brave one picked in the crowd to make things like this work. Let's try another approach: patch that in a developer way, there's nothing wrong with just a little fun.

We saw that two HTML pages were loaded. Login one isn't really needed to address, because it only makes sense to allow installation for users logged in.

### Launchpad Page: Cimico Quo

From the [other developer folk tale][folk_tale_theme_restriction] you should now know how to find the link between Fiori and ABAP, and this one is no different.

{% include post_image.md image="sicf_flp.png" description="Mapping of developer console HTTP request and SICF handler implementation" %}

After some effort voyaging around the code you'll find where SAP render Fiori Launchpad page, precisely at some bits of `/UI2/CL_FLP_HTTP_HANDLER` class. They even do some content injection on template.

{% include post_image.md image="handler_good_method_to_inject.png" description="A very suggestive method name about injection exists on HANDLE_REQUEST implementation" %}

A nice spot to implicit enhancement would be inside of `inject_config_metatags` method, where standard does content injection into Fiori HTML page.

We'll take advantage of that aerodynamic part and buff it with an implicit enhancement, our injection.

```abap
constants pwa_resources_path type string value `/sap/public/zflp_pwa_res`.
data(content) = ev_html_with_config.
content = replace( val = content sub = `</head>` with = |<link rel="manifest" href="{ pwa_resources_path }/manifest.webmanifest"> </head>| occ = 1 ).
content = replace( val = content sub = `</body>` with = |<script type="text/javascript" src="{ pwa_resources_path }/app.js" async></script></body>| occ = 1 ).
ev_html_with_config = content.
```

Refreshing Launchpad you'll get network errors, as expected, because two new resources were pointed (`manifest.webmanifest` and `app.js`) in HTML but ABAP server doesn't know them, yet.

### Serving static content: High Life on Public node

You can try but you won't be able to directly create a PUBLIC child node. No worries about that, [KBA 2478325][sapnote_workaround_create_public_node_sicf] explains a <del>bug</del><ins>not-so-trivial feature</ins> to accomplish this (yes, you could avoid a bit of this creating as a child of an existing leaf, but you would lose all the fun).

Why am I serving from a public node? Nothing special. My first experiments had Login page as part of PWA experience, and then you have to go public (No-user user in action).

A node needs a handler class, time to implement it. I recommend using the MIME repository to store PWA files, because you get a nice API to get it back, either on code (it's amazing what you'll find sneaking around API word), or codeless if you know the drill (read documentation).

```abap
method if_http_extension~handle_request.
  check server->request->get_method( ) eq if_http_request=>co_request_method_get.
  data(path) = server->request->get_header_field( if_http_header_fields_sap=>path_info ).

  case path.
    when `/app.js`
      or `/manifest.webmanifest`
      or `/sw.js`
      or `/icon192.png` or `/icon512.png`.

      " Expected resources for PWA. You shall pass.
    when others.
      " Someone meddling with service. Mock them!
      server->response->set_cdata( `Ah ah ah! You didn't say the magic word!` ).
      server->response->set_status( code = 400 reason = if_http_status=>reason_400 ).
      return.
  endcase.

  data(mime_api) = cl_mime_repository_api=>get_api( ).
  mime_api->get(
    exporting
      i_url = |/SAP/PUBLIC/ZFLP_PWA_MIME{ path }|
      i_check_authority = abap_false " "No-user" user is used when not logged in, he has no authorizations.
    importing
      e_content = data(content)
      e_mime_type = data(content_type) ##type
    exceptions
      others = 0 ).
  server->response->set_data( content ).
  server->response->set_content_type( content_type ).

  if path eq `/sw.js`.
    server->response->set_header_field( name = `Service-Worker-Allowed` value = `/` ).
  endif.

endmethod.
```

This is enough. Just load Web Manifest and Service Worker files into MIME and it is ready for the stage.

## Can you see it? Oh can you see it

{% include post_image.md image="abap_install_prompt.png" description="Install prompt directly from our ABAP changes" %}

{% include post_image.md image="abap_install_banner.png" description="Mobile install banner from our ABAP efforts" %}

{% include post_image.md image="mobile_post.png" description="Mobile homescreen after installing both cases" %}

## The aftermath

You can take both experience and knowledge to a next level, like fiorize installation experience through a Launchpad Plugin. You can toy with other things to improve PWA experience, but you'll always have to think twice if that requires something that relies on ABAP side: "Am I jeopardizing myself doing that?" "Is that code released for customers?" "Is there a public API for that?" You'll have to develop, mend, maintain, check on every support package upgrade.

Want the better experience? Be picky and make your company expenses worth by [influencing the software][sap_customer_influence], or meet us on some shady corner [mumbling about immutable decisions took inside][sap_never_implementing_basic_features].

As said earlier, PWA is still a draft specification. I wanted to have a different set of shortcuts per user role, but that is not possible now.

A git repo [thalesvb/flponprem-pwa][repo_flponprem-pwa] is available for your joy. Ready-to-go, one BAdI implementation away to activate this feature, bundled with one example.

Our work is never over, but this blog is. Merci à vous et à bientôt!

{% include post_image.md image="homage.png" description=" " %}

Meta-task: All tracks of [Discovery album][discovery_album] were referenced in this post, some of them more than once. Why don't you play the game? (this one doesn't count).

[appmanifest_standard]:https://www.w3.org/TR/appmanifest/
[appmanifest_standard_history]: https://www.w3.org/standards/history/appmanifest
[discovery_album]: https://en.wikipedia.org/wiki/Discovery_(Daft_Punk_album)
[compressorhead]: https://www.youtube.com/watch?v=j_gfk65qgRg
[folk_tale_theme_restriction]: {% post_url 2020-10-30-abap-meticulous-investigation-in-backend-restricting-fiori-launchpad-abap-theme-selection %}
[pwa_intro]: https://web.dev/what-are-pwas/
[pwa_installable_webdev]: https://web.dev/install-criteria/
[pwa_installable_mdn]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installable_PWAs
[question_about_fiori_app_without_mobplat]: https://answers.sap.com/answers/13315669/view.html
[repo_flponprem-pwa]: https://github.com/thalesvb/flponprem-pwa
[sap_customer_influence]: https://www.sap.com/about/customer-involvement/influence-adopt.html
[sap_never_implementing_basic_features]: https://blogs.sap.com/2021/02/07/international-editable-salv-day-2021-year-13/
[sapnote_fiori_client_removal]: https://launchpad.support.sap.com/#/notes/2992772
[sapnote_workaround_create_public_node_sicf]: https://launchpad.support.sap.com/#/notes/2478325
[service_worker_standard]: https://www.w3.org/TR/service-workers/
[video_link_onprem_launchpad_as_pwa]: https://www.youtube.com/watch?v=eCYzjVmU-sA