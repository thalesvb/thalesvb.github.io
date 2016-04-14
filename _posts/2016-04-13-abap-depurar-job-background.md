---
universal_name: abap_debug_job_background
lang: pt-br
title: Depurar jobs em background no SAP
categories: ABAP
tags: Debug Background
---

Você é aquele desenvolvedor que depura seus programas *online* feliz e serelepe usando as instruções *BREAK-POINT*, *BREAK* e/ou pontos de paradas de sessão e externos, mas quando um programa *background* dá dump e pedem para identificar o erro você adota a política do *"senta e chora"*?
Executa online para testar e funciona normalmente, mas somente quando testa em *background* o erro acontece?
Vê como única forma colocar um loop infinito para pegar o programa em execução na SM50, e quando dizem que o dump só ocorre em QA bate um desespero devido ao ambiente ser fechado para modificações?
Não mais.
E não, não é sugestão de pedir para *BASIS* abrir o ambiente para modificação.
Não é feitiçaria, muito menos tecnologia, já que não possui (ainda, pelo menos nos ambientes que tenho acesso) um botão próprio para isto.

A transação **SM37** (monitoramento de jobs) possui um *OKCODE* oculto que faz esta maravilha ser possível.
Basta, nesta transação, selecionar o job que deseja depurar, e então, no campo de comando, digitar o *OKCODE* **JDBG**.

{% include post_image.md image="sm37-JDBG.png" description="Tela da transação SM37 com um único job selecionado e o OKCODE *JDBG* já digitado no campo de comando, aguardando o 'enter'" %}

Após isto basta executar o comando e aparecerá a janela de depuração.

{% include post_image.md image="SAP/SAPGUI/debug_generico.png" generic=true description="Janela de depuração" %}

Recomendo fortemente colocar um breakpoint externo no código antes de iniciar o procedimento, pois o primeiro ponto de parada ainda é dentro do código standard, e é mais fácil já ter um breakpoint onde você precisa e chegar lá rapidamente com F8.

Procurando uma referência para citar, encontrei a página [Debug Background Job with Ease (SAP Community Network)](http://scn.sap.com/docs/DOC-70239){:target="_blank"} que, além deste método, menciona também dois reports que podem ser utilizados para depuração em ambientes não abertos para edição.

Estas informações são até razoavelmente fáceis de serem encontradas no [SAP Community Network](https://scn.sap.com){:target="_blank"}, mas como é pouco frequente ter de depurar nestas condições, acaba caindo no esquecimento por falta de uso.

Não se esqueça, <del>↑ ↑ ↓ ↓ ← → ← → B A</del><ins>**JDBG**</ins> neles.