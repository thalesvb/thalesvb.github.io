---
universal_name: abap_example_report_menu_programmatically
lang: pt-br
title: Exemplo de como criar programaticamente um menu no report, basta adicionar SSCRFIELDS
categories: ABAP
tags: Example
---

Ainda que o futuro do SAP seja cada vez menos em interações com programas GUI (Dynpro), conhecer o que ele oferece se faz necessário, pois estes programas ainda existirão, por um tempo razoável para dar algum tipo de manutenção, até mesmo novos desenvolvimentos.
Após ler as nuâncias dos comandos pela ajuda do F1, criei um pequeno programa menu que chama telas de seleção distintas.
Não há nenhuma magia negra envolvida, muito menos merece um prêmio por inovação, apenas um bom uso dos comandos disponíveis para telas de seleção.

Segue algumas imagens do que o código, presente no final do post, realiza.

{% include post_image.md image="MainSelScreen.png" description="Tela inicial do report, apresentando o menu de pushbuttons" %}

{% include post_image.md image="SubSelScreen-1.png" description="Tela de seleção do primeiro item do menu inicial." %}

{% include post_image.md image="SubSelScreen-1-Result.png" description="Resultado da execução do primeiro item do menu inicial." %}

{% include post_image.md image="SubSelScreen-2.png" description="Tela de seleção do segundo item do menu inicial." %}

{% include post_image.md image="SubSelScreen-2-Result.png" description="Resultado da execução do segundo item do menu inicial." %}

{% gist thalesvb/be04b7022814ce08744cfe8244253b70 %}
