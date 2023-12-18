---
universal_name: console-experience-winchester-games
lang: en-us
title: "Console experience for Winchester Games"
description: An experiment to bring console ready-to-play experience on retro 9x gaming emulation, and a bit of knowledge sharing.
image: blog/resources/console-experience-winchester-games/img/winbox.jpg
categories: PCMR
tags: experiment retro
---

An experiment to bring consoles' *Ready-to-Play* experience for retro 9x gaming, effectively transforming [Winchester][ibm_winchester_disk] data into a game cartridge for DOSBox Pure.

___
**Disclaimers**  
This is mostly for the lulz, although it is a viable way to enjoy them.
Many old games can be refurbished to play in today Operational Systems, even restoring / replacing long gone features lost in time, like multiplayer ([GameSpy][openspy_home]), network protocols ([IPX][ipxwrapper_home]), accelerated audio APIs ([EAX][pcgamingwiki_audio_legacy]), graphical APIs([Glide][dege_home])... either by researching what to do by yourself or reading what [others documented on PCGamingWiki][pcgamingwiki_home].
They can also be brought to modernity in simple manners through a community engine or by remaster/port releases, if available.

This experiment is an exercise for bit twiddlers and takes advantage that an installed content will also be part of compressed game content, and a full reset to post-install snapshot is done by simply deleting a save file.

While writing this note (which took awhile), an issue raised on DOSBox Pure repo [^dbp_ghi_savfile_for_c_drive], one of main software of this experiment, was raised asking to it also create a save file for C drive (keep changes from clean OS installation), and [delivered on 0.9.8][dbp_098].
That almost fulfills the same purpose of this experiment for an average person, yet there are things that you can't do unless interact directly with OS layer.

## Purchase to Play: shallow insight about how software interacts with MS OS

Almost all retail software requires being installed prior usage, and that process have a few, common steps (on MS):

1. Extract/Copy files to destination directory.
1. Create `registry` entries needed for the software itself.
1. Create shortcuts (links) on Start Menu / Desktop pointing to software's executable.

Software state can either be stored on registry itself (as new/modified entries) and/or as files somewhere under destination directory or, on more modern software, into a OS managed folder (like *My Documents*).

---

This process is basically the same for a game.
The sensible part here being the Registry, because some important data are commonly stored there, like *where it was installed*, *save path*, even *which CD-ROM drive letter was* when it was installed.

## Requirements gathering

* Base Operational System drive must be ephemeral, i.e. changes are discarded after powering off.
* Game content container behaves like a cartridge: everything needed to run is embedded and game progress is persistent.

## Designing a solution
### ...but first, knowing better your deployment Environment

DOSBox Pure fulfills first requirement: you can enable that through a Core options switch.
It fulfills second requirement partially: by mounting a game bundle as a new hard drive, it records any modified content on that drive in a save file.

OS has a start-up mechanism which allows you to run anything.
It also have commands to copy files, so pre-made shortcuts can be pasted on Desktop.
It also have a command to insert records into Registry non-interactively, `regedit -s`.

### Console Design: implement a kickstart routine, the missing piece

The only adjustment on console side is implement something to run a pseudo install  on each boot, since changes on Registry, Desktop and Programs Start Menu folder are discarded on each boot.

This can be achieved by a simple batch file, doing the following tasks:
* Install `*.reg` files:
* Copy `*.lnk` files to desktop:
* Executes a `POSTINST.BAT` script: this is to address weird installation processes that require something more changed on system. Some early games writes a post-install file on `%WINDIR%` folder, for example.

### Cartridge Design: ruling where each key content should go

To make things simply at implementation phase, a few rules should be defined for assembling the container.

* A single, specific folder, must contain all `.reg` files.
* A single, specific folder, must contain all `.lnk` shortcuts.
* A single location for `POSTINST.BAT`.

For this experiment, all of them will be on container's root folder.

### Drawbacks evaluated

Well, Copy Protection.
You can choose a few options:
- Bypass them with a modified executable/lib.
- Emulate it through Damon Tools (something to add on `POSTINST.BAT` to mount image)

This is one reason why gaming community doesn't like DRMs and hates always-online requirements: they all take your right to play it once backing technology goes offline, or just exposes your system and is arbitrary disabled by [OS provider](https://support.microsoft.com/en-us/kb/3086255) for security reasons, breaking it.
But then, you waived your dignity once you agreed to their license without really agreeing with what is written on fine print: you don't own the game, you purchased a license to play it by publisher terms.

## Put plan on action

### Kickstart routine

```batch
xcopy d:\*.lnk c:\windows\desktop
d:
cd \
for %%i in (*.reg) do regedit /s %%i
postinst.bat
```

It  must be linked on Start-up Programs' folder.

DOS prompt screen is eager with system resources and slows down emulation dramatically.
A way to not penalize start-up time is configuring this routine to run minimized.

{% include post_image.md image="kickstart_minimized.png" description="Changing to be run minimized and closing on exit on script properties." %}

### Assembling container

Install the software on a dummy system ("Dev kit").
Ideally, this system should resemble target system as close as possible (drive letters for the Container Hard Disk, and CD-ROM) because otherwise you'll need to tweak *.lnk and .reg* to reflect target layout.

```
┐  
├─C: Ephemeral disk  
├─D: Cartrigde disk  
└─E: CD-ROM drive (if needed)  
```

On `regedit`, export software's related entries to work in a format that is accepted on target system.
You can check that through the first exported file line indicating version.
Commonly, the entries you need will be located either on `HKEY_CURRENT_USER\Software` or `HKEY_LOCAL_MACHINE\Software` hives, under product or company name.

Want to waste more time? Assemble uninstall procedure too!
Entry is stored under `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Uninstall`[^uninstall_key_location], either by software name or a generated GUID.

## Extra infos

If dummy system also runs on DOSBox Pure, you can mount its disk on host ([ImDisk](https://sourceforge.net/projects/imdisk-toolkit/) on Windows, `mount` on Linux) to transfer data.

___
[KernelEx][kernelex_home] may allow some non-9x software to run on them.

## Going the extra mile to play hybrid 9x/DOS on 9x DOS

On early 9x era we had games that provided both DOS and Windows versions on same package.
Just being pesky to use the "Reboot and start in DOS mode", you'll need to get drivers for CD drive and mouse pointer working for full enjoyment.

On Windows 98, it doesn't

* CD Drive: Oak (it is bundled on system)
* Mouse pointer: CuteMouse (downloadable on [its official page][cutemouse_home])

### CD Drive
*config.sys*:
```batch
devicehigh=c:\WINDOWS\COMMAND\EBD\Oakcdrom.sys /D:mscd001
```

*autoexec.bat*:
```batch
LH c:\windows\command\mscdex.exe /D:mscd001 /L:E
```

### Mouse pointer

*autoexec.bat*:
```batch
C:\DRV\CTMOUSE\BIN\Ctmouse.exe
```


[^dbp_ghi_savfile_for_c_drive]: [Differencing VHD for OS installation](https://github.com/schellingb/dosbox-pure/issues/423)
[^uninstall_key_location]: [Use the Registry to Remove Items from Install/uninstall List](https://www.uvm.edu/~bnelson/computer/windows95/usetheregistrytoremoveitemsfrominstalluninstalllist.html)

[cutemouse_home]: https://cutemouse.sourceforge.net
[dege_home]: http://dege.freeweb.hu
[openspy_home]: http://openspy.net/
[kernelex_home]: https://sourceforge.net/projects/kernelex/
[kernelex_jumper_extensions]: https://msfn.org/board/topic/157173-kext-diy-kernelex-extensions/
[ibm_winchester_disk]: https://en.wikipedia.org/wiki/History_of_IBM_magnetic_disk_drives#IBM_3340
[ipxwrapper_home]: http://www.solemnwarning.net/ipxwrapper/
[pcgamingwiki_audio_legacy]: https://www.pcgamingwiki.com/wiki/Glossary:Sound_card#Restore_legacy_audio_effects_on_newer_OS
[pcgamingwiki_home]: https://www.pcgamingwiki.com/wiki/Home
[dbp_098]: https://github.com/schellingb/dosbox-pure/releases/tag/0.9.8
