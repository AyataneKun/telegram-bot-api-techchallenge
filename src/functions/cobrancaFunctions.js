import cobrancaModels from '../models/cobrancas';
import { findID } from './databaseFunctions';

async function opcoesCobrancas(func, id){
    if(!findID(id)){
        return "Código Carrefour informado inválido."
    }
    
    if(func === "Cobranças pendentes" && findID(id)){
        return await cobrancaModels.find({idCarrefour: id, pendente: true}).sort({ _id: 1});
        //return "Suas cobranças pendentes são: ";
    }

    if(func === "Informações dos ultimos pagamentos" && findID(id)){
        return await cobrancaModels.find({idCarrefour: id, pendente: false}).sort({ _id: -1}).limit(10);
        //return "Os ultimos 10 pagamentos realizados foram: ";
    }

    if(func === "Contestar cobrança" && findID(id)){
        return "Para constentações de cobranças, por favor, utilizar o site do Carrefour: www.carrefour.com.br/";
    }
}

const _opcoesCobrancas = opcoesCobrancas;
export { _opcoesCobrancas as opcoesCobrancas };