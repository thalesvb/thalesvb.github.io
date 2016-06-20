---
universal_name: abap_debug_oo_exception_throw_point
lang: pt-br
title: Descobrir onde a exceção OO do ABAP Objects pipocou
categories: ABAP
tags: Debug
---

O depurador do ABAP sempre me surpreende com uma nova funcionalidade toda vez que engasgo com o café e esbarro sem querer no mouse, fazendo-o clicar aleatóriamente em algum canto do depurador.
Desta vez descobri o botão ![exceção][exception_button], que permite descobrir onde o objeto de exceção foi criado através do comando ``RAISE EXCEPTION``.

Este botão aparece apenas para objetos de exceção, na aba principal *Objetos*, e então em *Exibição individual*.

{% include post_image.md image="dbg_screen_except_but_region.png" description="Região da tela de depuração em que o botão 'Exceção' aparece." %}

É possível usar o menu de depuração para colocar pontos de parada nestas instruções, mas se eu já sei onde do programa Z a exceção é capturada, pode a partir deste ponto ir voltando relativamente no tempo e ver em qual linha cada exceção foi lançada.

Se você, assim como a platéia do Sílvio Santos, só acredita vendo, copie este report e veja a mágica acontecer.
Duas exceções são lançadas e encadeadas, e o debugger mostrará exatamente onde <del>o crime</del><ins>cada exceção</ins> aconteceu.

{% gist thalesvb/1516168fe3f22c94ae388f52bed636b7 %}

Infelizmente esta forma não permite visualizar os valores das variáveis naquele trecho que o ``RAISE EXCEPTION`` foi executado após ter saído de lá, mas isto também ocorre com as exceções clássicas e exceções de módulos de função.

{: .table }

| A exceção mais recente (primeira da cadeia, a última lançada) | A exceção mais antiga (última da cadeia, a primeira lançada) |
|:--:|:--:|
| ![dummy][exception_newest]{% include img_responsive.md %} | ![dummy][exception_oldest]{% include img_responsive.md %} |

Lembra daqueles ``TRY/CATCH`` sem nenhum tratamento e muito menos um ``INTO`` que você já ousou a colocar no código só por ser dia de maldade?
Pois então, agora tem (mais) um motivo para abandonar esta má prática e fazer melhor.

[exception_button]: {% include post_image_ref.md image="dbg_exception_button.png" description="Botão exceção da tela do depurador" %}
[exception_newest]: {% include post_image_ref.md image="exception_newest.png" description="Exceção mais recente, note que a numeração do objeto é maior que o da exceção mais antiga" %}
[exception_oldest]: {% include post_image_ref.md image="exception_oldest.png" description="Exceção mais antiga, note que a numeração do objeto é menor que o da exceção mais recente" %}