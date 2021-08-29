require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/config')

const usuariosRouter = require('../routes/usuarios');
const authRouter = require('../routes/auth');

class Server {

    constructor() { 
        this.app = express();
        this.port = process.env.PORT

        // Path usuarios
        this.usuariosPath = '/api/usuarios';
        this.authpath     = '/api/auth';


        // Conection DB
        this.conectarDB()

        // Middleware
        this.middleware();

        // Routes
        this.routes()
    }

    async conectarDB(){
        await dbConection()
    }

    middleware(){

        // Cors
        this.app.use( cors () )

        // Parseo y Lectura de archivos Json
        this.app.use( express.json() )

        //  Directorio publico
        this.app.use( express.static('public'))

    }
 
    routes() {
        this.app.use(this.authpath, authRouter);
        this.app.use(this.usuariosPath, usuariosRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

module.exports = Server;