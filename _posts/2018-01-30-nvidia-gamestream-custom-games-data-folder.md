---
universal_name: nvidia_gamestream_custom_games_data_folder
lang: pt-br
title: Localização dos jogos/aplicativos adicionados manualmente ao NVIDIA GameStream
categories: NVIDIA
tags: GameStream
---

Ao dar sobrevida a um dispositivo Google TV com o aplicativo [Moonlight](http://moonlight-stream.com), para uso do GameStream, notei que é possível adicionar manualmente, no menu lançador, jogos e aplicativos que não são reconhecidos automaticamente pelo software.
Estas informações teriam de estar guardadas no próprio computador, pois é feito em uma etapa anterior a sincronização do dispositivo.
Procurei saber onde isto fica para fazer backup.

{% include post_image.md image="GameStreamApps.png" description="Seção do GameStream onde é possível adicionar manualmente aplicativos e jogos" %}

Estes dados ficam em um diretório da NVIDIA dentro do *Local Application Data* do Windows:

> `%localappdata%\NVIDIA Corporation\Shield Apps\`

Cada lançador é um simples [atalho do Windows (*.lnk)](https://en.wikipedia.org/wiki/Shortcut_(computing)#Microsoft_Windows).

As *Artes de caixa* associada ao atalho ficam em uma subpasta oculta `StreamingAssets`, dentro de uma pasta com o nome respectivo ao atalho que ela representa.

> `%localappdata%\NVIDIA Corporation\Shield Apps\StreamingAssets\`

O nome do arquivo da arte de caixa é `box-art.png`.

Em resumo é isto, agora pode usar esta informação para o bem, ou para o mal.