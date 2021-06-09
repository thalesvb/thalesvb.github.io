---
title: Zuera Never End
project: zuera_never_end

features:
  - title: Sound Packs as installable apps
    description: Storage-friendly for your phone. Install only the ones you want.
    image: img/icons/APK_format.png
  - title: Bookmarkable sounds
    description: Easily find your most needed sounds in a bookmark panel.
    image: img/icons/book-bookmark.png
  - title: Fast to start, faster to repeat
    description: Sounds are loaded on demand and buffered.
    image: img/icons/dashboard-alt.png
  - title: Text-To-Speech
    description: Use your own lines.
    image: img/icons/google_tts.png
  - title: Chorus/Echo play with Bluetooth
    description: Join a channel with your buddies and spread the anarchical buzz.
    image: img/icons/bluetooth.png
---

# We will, we will mock you!
A flexible soundboard app that could grant you a one-time pass to Human Resources.


Zuera Never End

The following Sound Packs are currently avaiable for this app:

* Bom Negócio: well know advertisements in Brazil;
* Dismotivator: Disney movies;
* Family Guy: the sitcom itself;
* Hollyworld: General movies;
* Internet Classics: Popular YouTube;
* League of Legends: taunts from this MOBA;
* Marioware: Mario games;
* Mortal Karnage: Mortal Kombat games;
* Music Loops: music;
* Real Treta Strategy : Real Time Strategy games;
* Trotsky: phone pranks;
* Vault: Valve games;
* Warcraft: Warcraft games.

Not released for general public.

## Android native App

Built with no other code than Android SDK to achive 150KB APK size for the main application.

## People claimed chorus, a WebApp was born

To reach a broader audience and still keep a one-man band development team, the product reborn as a WebApp, accessible to any device that supports HTML5.

# Making of: The history of ZNE

Initially, the main API target was 19 (Android 4.4), but a few weeks later a friend asked to support his phone, then code was tinkered down and compliant with API 9 (Android 2.3).

Sounds, even with edition magic (cut/convert) still claims a precious storage space. The wise choice was to have them decoupled from base application as separate sound packs (DLCs). A bit of research and tests around with [Parceable API][and_sdk_parceable] made that possible.

Eclipse Android Developer Tools was still the primary IDE advertised when this endeavour started.
Each Sound package had the same bootstrap code to communicate with main application, but even builting around a shared library it was still needed to have multiple project to build them.

Some time later Android Studio kicked in, at this moment I also read about Gradle builds and a feature that got my attention: [Build Variants][and_build_flavor]. Sound Pack Projects was refactored to be a single one, thus reducing maintenance complexity.

## Generalization to welcome a wider audience

Even being built as a pratical joke, app got desired by a different audience: Apple device users.

First option was to learn native development for other platform, something I wasn't thrilled to do. My first mobile development learning attempt was for Nokia (Symbian 3), a few months before the news about Microsoft Aquisition (and dismantling it in favor of its OS). Android learning was more to grasps the difference in developing for mobile, know its features and constraints to implement.

At that time the "code once, run anywhere" concept was still on baby steps, the best and most favorable to me was Cordova, and technology choice was done.

[and_build_flavor]: https://developer.android.com/studio/build/build-variants
[and_sdk_parceable]: https://developer.android.com/reference/android/os/Parcelable