
const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 

        console.log('DB conectada');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a inicia la conexion a la base de datos')
    }
}

module.exports = {
    dbConection
}