import TelegramBot from 'node-telegram-bot-api';
import dfSendMessage from './dialogflow.js';
import { opcoesCompras } from './functions/comprasFunctions.js';
import { opcoesCobrancas } from './functions/cobrancaFunctions.js';
import { conectar } from './config/database.js';
import { fillDB, findID, fillDBCobranca } from './functions/databaseFunctions.js';

async function con(){
    await conectar();
    return 'finalizado.';
}

async function entries(){
    const fim = await con();
    console.log(fim);

    // let test = '{ "nome": "Aluisio", "sobrenome": "Meloni", "email": "aluisiomeloni@gmail.com", "idCarrefour": 12345, "valor":123.50, "pendente": true}';
    // let entry = JSON.parse(test);
    // console.log(entry);
    // fillDBCobranca(entry);
    // test = '{ "nome": "Aluisio", "sobrenome": "Meloni", "email": "aluisiomeloni@gmail.com", "idCarrefour": 12345, "valor":87.41, "pendente": true}';
    // entry = JSON.parse(test);
    // fillDBCobranca(entry);
    // test = '{ "nome": "Aluisio", "sobrenome": "Meloni", "email": "aluisiomeloni@gmail.com", "idCarrefour": 12345, "valor":227.92, "pendente": false}';
    // entry = JSON.parse(test);
    // fillDBCobranca(entry);
    // test = '{ "nome": "Aluisio", "sobrenome": "Meloni", "email": "aluisiomeloni@gmail.com", "idCarrefour": 12345, "valor":100, "pendente": false}';
    // entry = JSON.parse(test);
    // fillDBCobranca(entry);
    return 'finalizado tbm.';
}

async function testeDB(){
    const fim = await entries();
    console.log(fim);
    const teste = await findID(12345);
    console.log(teste);
}
testeDB();

const TOKEN = 'SEU_TOKEN_TELEGRAM';
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    let restart = false;

    const dfResponse = await dfSendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if(dfResponse.intent === 'greetings'){
        bot.sendMessage(chatId, responseText);
    }

    if(dfResponse.intent === 'farewell'){
        bot.sendMessage(chatId, responseText);
    }

    if(msg.text.toString() === "Informações sobre suas compras"){
        bot.sendMessage(chatId, 'Sobre quais compras você deseja mais informações?', {
            "reply_markup": {
                "keyboard": [["Ultima compra realizada"], ["Ultimas três compras realizadas"], ["Compras realizadas nos ultimos 15 dias"],
                    ["Compras realizadas nos ultimos 30 dias"], ["Todas as compras"], ["Sair"]],
                "one_time_keyboard": true
            }
        });
    }

    if(msg.text.toString() === "Ultima compra realizada" || msg.text.toString() === "Ultimas três compras realizadas" || msg.text.toString() === "Compras realizadas nos ultimos 15 dias" ||
        msg.text.toString() === "Compras realizadas nos ultimos 30 dias" || msg.text.toString() === "Todas as compras"){
            const result = (await opcoesCompras(msg.text.toString(), 12345)).toString();
            bot.sendMessage(chatId, result.toString());
            restart = true;
    }

    if(msg.text.toString() === "Informações de cobranças ou pagamentos"){
        bot.sendMessage(chatId, 'Opções sobre cobranças e pagamentos:', {
            "reply_markup": {
                "keyboard": [["Cobranças pendentes"], ["Informações dos ultimos pagamentos"], ["Contestar cobrança"], ["Sair"]],
                "one_time_keyboard": true
            }
        });
    }

    if(msg.text.toString() === "Cobranças pendentes" || msg.text.toString() === "Informações dos ultimos pagamentos" || msg.text.toString() === "Contestar cobrança"){
            const result = (await opcoesCobrancas(msg.text.toString(), 12345)).toString();
            bot.sendMessage(chatId, result);
            restart = true;
    }

    if(msg.text.toString() === "Reclamações"){
        bot.sendMessage(chatId, 'Para reclamações, por favor, utilize o sistema de atendimento ao consumidor no nosso site para maior conforto e segurança. https://www.carrefour.com.br/atendimento?crfimt=hm-tlink|carrefour|menu|servicos|atendimento|4');
        restart = true;
    }

    if(msg.text.toString() === "Sugestões de listas de compras"){
        bot.sendMessage(chatId, 'Bem vindo ao menu de sugestão de compras, aqui você encontrará listas de compras sugeridas para atender diversos tipos de eventos. \n'
            + 'Basta você escolher o tipo de evento, que enviaremos uma lista com as quantidades de cada produto encontrado em nosso site para seu evento!', {
                "reply_markup": {
                    "keyboard": [["Churrasco pequeno (até 7 pessoas)"], ["Churrasco grande (até 20 pessoas)"], ["Festa de Aniversário"], ["Casamento"], ["Confraternização da Empresa"]],
                    "one_time_keyboard": true
                }
            });
    }

    if(msg.text.toString() === "Churrasco pequeno (até 7 pessoas)" || msg.text.toString() === "Churrasco grande (até 20 pessoas)" || msg.text.toString() === "Festa de Aniversário"
        || msg.text.toString() === "Casamento" || msg.text.toString() === "Confraternização da Empresa"){
        
        bot.sendDocument(chatId, 'https://drive.google.com/uc?export=download&id=1T4kwp1ffMotio2xmGKIBOXK3B-933X0O');
        restart = true;
    }

    if(restart){
        bot.sendMessage(chatId, 'Caso precise de mais alguma coisa, comece novamente com o comando /start, ou finalize o contato com /end')
        restart = false;
    }

});

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id, "Certo. Vamos as opções disponíveis:", {
        "reply_markup": {
            "keyboard": [["Informações sobre suas compras"], ["Informações de cobranças ou pagamentos"], ["Reclamações"], ["Sugestões de listas de compras"], ["Sair"]],
            "one_time_keyboard": true
        }
    });
});

bot.onText(/\/end/, async function (msg) {
    const response = await dfSendMessage(msg.chat.id.toString(), 'Finalizar');
    if(response.intent === 'farewell'){
        bot.sendMessage(msg.chat.id, response.text);
    }
})