import compraModels from '../models/compras';
import { findID } from './databaseFunctions';

async function opcoesCompras(func, id){
    if(!findID(id)){
        return "Código Carrefour informado é inválido."
    }

    if(func === "Ultima compra realizada" && findID(id)){
        return await compraModels.find({idCarrefour: id}).sort({ _id: -1}).limit(1);
        //return "Sua ultima compra realizada foi feita em: xx/xx/xxxx, seguem informações: ";
    }

    if(func === "Ultimas três compras realizadas" && findID(id)){
        return await compraModels.find({idCarrefour: id}).sort({ _id: -1}).limit(3);
        //return "Suas ultimas três compras realizadas foram: ";
    }

    if(func === "Compras realizadas nos ultimos 15 dias" && findID(id)){
        return await compraModels.find({idCarrefour: id, dataCompra: {$gte: Date.now()-15, $lte: Date.now() } });
        //return "Suas compras realizadas nos ultimos 15 dias foram: ";
    }

    if(func === "Compras realizadas nos ultimos 30 dias" && findID(id)){
        return await compraModels.find({idCarrefour: id, dataCompra: {$gte: Date.now()-30, $lte: Date.now() } });
        //return "Suas compras realizadas nos ultimos 30 dias foram: ";
    }
}

const _opcoesCompras = opcoesCompras;
export { _opcoesCompras as opcoesCompras };