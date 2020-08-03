import mongoose from 'mongoose';

mongoose.Promise = global.Promise

const config = {
  uri: 'mongodb://localhost:27017/node-mongoose',
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

async function conectar(){
    await mongoose.connect(config.uri, config.options);
}

const _conectar = conectar;
export { _conectar as conectar };

// export default {
//   connect: () => mongoose.connect(config.uri, config.options)
// }