import compraModels from '../models/compras';
import cobrancaModels from '../models/cobrancas';

async function fillDB(entry){
    try{
        const post = new compraModels(entry)
        await post.save();

    } catch (error){
        console.log(error);
    }
}

async function fillDBCobranca(entry){
    try{
        const post = new cobrancaModels(entry)
        await post.save();

    } catch (error){
        console.log(error);
    }
}

async function findID(id){
    try{
        const search = await compraModels.find({idCarrefour: id});
        if(search){
            return true;
        } else {
            return false;
        }
        
    } catch (error){
        console.log(error);
    }
}

const _fillDB = fillDB;
export { _fillDB as fillDB };
const _findID = findID;
export { _findID as findID };
const _fillDBCobranca = fillDBCobranca;
export { _fillDBCobranca as fillDBCobranca};