# node-telegram-bot
Chatbot utilizando a API do telegram feito em Node.js usando o DialogFlow, MongoDB e Mongoose

## Instalar dependências
Todas as dependências necessárias para o código funcionar podem ser instaladas utilizando o comando:
```
    npm install
```

## Criar container para o banco MongoDB com Docker
Execute o arquivo shell para gerar o container, ou abra-o com um editor de texto e copie os comandos no terminal manualmente:

```
./runDocker.sh
```
*Obs.: O Docker precisa estar instalado. Instruções de como instalar o Docker em Windows, Mac e Linux, veja [este post](https://blog.umbler.com/br/containers-102-primeiros-passos-para-realizar-a-instalacao/?a=7e8480pk).*

## Para iniciar o Chatbot
Para iniciar o chatbot, após instalar todas as dependências, basta estar na pasta do projeto e utilizar o comando:
```
   npm start
```

## Referências, documentação e downloads
[Documentação do Telegram Bot API](https://core.telegram.org/bots/api)

[Documentação do pacote node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

[Informações e documentação do Dialogflow](https://www.npmjs.com/package/@google-cloud/dialogflow)

[Documentação do Mongoose](https://mongoosejs.com)

[Download das informações de chave do Dialogflow](https://drive.google.com/file/d/1lHAWeL9Zhdh37yzbUf2iFaEm3g29Mio_/view?usp=sharing)

## Observações
Para que as mensagens de boas vindas e adeus funcionem corretamente é necessário baixar as informações de chave do meu agente no Dialogflow no link do drive acima e colar seu conteúdo no arquivo 'configs-dialogflow.json'. Caso contrário, é necessário criar uma conta própria no DialogFlow, criar um agente e alterar as partes pertinentes no código.

Para que o Chat Bot funcione, é necessário criar um bot próprio no telegram. Para isso, veja o tutorial disponibilizado pelo próprio telegram: https://core.telegram.org/bots#6-botfather

## About Me

Para me conhecer ou entrar em contato: https://www.linkedin.com/in/aluisio-meloni-virgilio-764014121/