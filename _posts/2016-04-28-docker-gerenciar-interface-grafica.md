---
universal_name: docker_manage_with_gui
lang: pt-br
title: Docker + gerenciamento com interface gráfica = - sofrimento
categories: Docker
tags: Tip
---

Desde que conheci o [*Docker*](//docker.com) sempre o utilizei via terminal.
Tudo funciona perfeitamente, mas não é prático para uso interativo se considerar que, devido ao seu funcionamento, ele deve ser executado como *root*, e ficar sempre logado como tal, ou abusar do *sudo*, não é uma prática encorajada em segurança de sistema, devido à abrir margens para situações catastróficas caso ocorra algum descuido, similar ao que foi veiculado recentemente em que uma empresa foi totalmente extinta do mapa com um *"rm -rf"*.

Para executar os contêineres sempre mantenho um arquivo de scripts com os comandos pois, além de simplificar o processo de inicialização, evita também um descuido de digitação.
Deletá-los, ou as imagens que os originaram, são mais comandos, e repetitivos.
Como o uso primariamente em ambiente de desenvolvimento com interface gráfica disponível, qualquer facilitador neste sentido é bem vindo.
Fiz uma rápida pesquisada e surgiram várias opções gráficas, inclusive a imagem [*Not Dockers GUI*](//github.com/kevana/not-dockers-ui){:target="_blank"} para rodar no próprio *Docker* uma aplicação Web de administração.
Não precisava de muitas funcionalidades, pois o usaria primariamente para remover imagens e contêineres não mais utilizados.

A opção que me atendeu foi o aplicativo do Chrome [*Simple Docker UI*](//github.com/felixgborrego/docker-ui-chrome-app){:target="_blank"}, por ter um tamanho pequeno e ter um recurso interessante: um botão *Garbage Collection* para remover imagens armazenadas localmente que não estejam vinculadas a nenhum contêiner.
Único inconveniente deste botão é que não há como colocar uma lista de exceções, e imagens que uso em contêiner temporário, caso do Jekyll para fazer desenvolvimentos desta página, também são removidas (descobri da pior forma).
Bastou apenas configurar um serviço para que o *Docker* permitisse acesso via API (própria página do aplicativo explica como), e em dois minutos já estava gerenciando-o pelo aplicativo.

{% include post_image.md image="simple-docker-ui-home.jpg" description="Tela inicial do Simple Docker UI conectada a uma instância Docker." %}

Na aba das imagens é possível rever detalhes de cada uma, como as portas expostas possíveis para comunicação externa, histórico e data de criação da imagem, e também permite pesquisar e baixar diretamente imagens do *Registry Hub* público.

{% include post_image.md image="simple-docker-ui-image-exposed-ports.jpg" description="Em destaque a seção da aba imagens que mostra os detalhes de portas expostas. Adicionalmente, mostra que a aplicação é responsiva." %}


Este aplicativo pode trabalhar de forma similar ao [*Docker Compose*](//docs.docker.com/compose/), já definindo na criação do contêiner o mapeamento das portas, mapeamento de volumes, e a ligação com outros contêineres, mas nada muito avançado, o próprio nome do aplicativo enfatiza isto.
