---
universal_name: abap_user_profile_param_bspwd_user_level
lang: pt-br
title: Configuração de perfil para identificar facilmente mensagens lançadas no CRM WebUI
categories: ABAP
tags: WebUI
---

A área de mensagens do WebUI é a região das aplicações web do SAP mais visualizada pelos usuários deste sistema, por um simples motivo: a maior parte das mensagens, de sucesso, alerta ou erro, que são lançadas aparece nesta área.
Quando são mensagens informativas ou de sucesso é um mar de rosas, mas quando são as de alerta ou erro, especialmente as que não são previstas, é que começa o inferno astral do desenvolvedor.
Encontrar onde a mensagem é lançada deveria ser um trabalho rápido... Mas náo é.

A interface para lançar mensagens do WebUI, através do método <strong>ADD_MESSAGE</strong> da classe <strong>CL_BSP_WD_MESSAGE_SERVICE</strong> não permite que seja rastreada através do Where-Usage, entra na categoria de mensagem lançada de forma dinâmica, mesmo não sendo esta a intenção.
É necessário que o desenvolvedor se lembre que ele tem de recorrer a <del>gambiarra</del> <ins>truque</ins> de, logo acima ou abaixo, inserir um IF/ENDIF nunca executado lançando a mensagem através do commando MESSAGE.

```abap
IF 1 EQ 0. MESSAGE e000(R1). ENDIF.
```

A mensagem pode também ter sido lançada em um ponto obscuro dentro da solução standard quem nem a própria SAP pode lembrar que existe
Há o trabalho também de procurar na tabela T100 pela a mensagem para então saber qual seu número e a classe de mensagem que ela pertence, e algum tempo pode ser gasto nisso quando há os placeholders e é necessário uma combinação aleatória de asterisco para achar a entrada na tabela.
Todo este trabalho para identificar em qual mensagem deve ser colocado um ponto de parada e então começar a entender o cenário do erro.

> "Feliz o desenvolvedor que consegue rapidamente descobrir o erro que o usuário reporta."

Existe uma configuração de perfil de usuário que facilita a identificação de qual classe e número de mensagem foi utilizado para gerar as mensagens mostradas na parte superior da tela, além dos parâmetros utilizados na mensagem, como mostrado na imagem abaixo:

![Exemplo do parâmetro BSPWD_USER_LEVEL em funcionamento, mostrando, ao manter o mouse sobre a mensagem, os detalhes da classe de mensagem, número e valores 1 a 4 que foram usados para gerar a mensagem em tela.]({{page.img_dir}}abap_webui_bspwd_user_level_example.jpg)

Isto pode ser ativado da tela inicial do SAPLogon, acessando o menu ‘Sistema / Especificações do
usuário / Dados próprios’, e então incluir em seu perfil o parâmetro <strong>BSPWD_USER_LEVEL</strong> com valor
igual ou superior a 6.
Isto ajuda a não criar falsas expectativas de conseguir localizar exatamente onde a mensagem foi lançada ao
ver imediatamente que foi utilizado as mensagens ‘& & & &’.

Esta configuração também possibilita que sejam lançadas, para um mesmo evento, mensagens direcionadas a um segmento específico de usuário, preenchendo no método <strong>ADD_MESSAGE</strong> (instância da classe <strong>CL_BSP_WD_MESSAGE_SERVICE</strong>) o parâmetro <strong>IV_MSG_LEVEL</strong>.
Um exemplo é uma execução que depende de dados customizing, e tais dados não foram configurados. Para o usuário final pode-se lançar a mensagem "Não foi possível realizar a execução" e para o funcional mostrar adicionalmente o alerta "A tabela customizing Z(...) não está preenchida".
Todos ficam felizes, especialmente o ABAPer que não terá que parar o desenvolvimento e fazer um debug para ter de gerar provas de sua inocência em um crime que ele não cometeu.

O documento [Message handling in SAP CRM Web UI (SAP Community Network)](http://www.sdn.sap.com/irj/scn/go/portal/prtroot/docs/library/uuid/f08a833a-f5c0-2e10-bf94-d464bf5355dc?QuickLink=index&overridelayout=true&52239688229082){:target="_blank"} explica um pouco deste parâmetro.
