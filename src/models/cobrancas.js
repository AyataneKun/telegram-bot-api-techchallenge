import { Schema, model } from 'mongoose';

const schema = new Schema({
    nome: String,
    sobrenome: String,
    email: {
        type: String,
        required: [true, 'Email obrigatório'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    idCarrefour: {
        type: Number,
        required: [true, 'ID Carrefour obrigatório.'],
        minlength: 5,
        maxlength: 5,
    },
    valor: Number,
    dataCobranca: {
        type: Date,
        required: [true, 'Data obrigatória.'],
        default: Date.now(),
    },
    pendente: Boolean,
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

const cobrancaModels = model('Cobranca', schema);

export default cobrancaModels;