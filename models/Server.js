require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConection } = require('../database/config')

const authRouter = require('../routes/auth');
const buscarRouter = require('../routes/buscar');
const usuariosRouter = require('../routes/usuarios');
const categoriasRouter = require('../routes/categorias');
const productosRouter = require('../routes/productos');

class Server {

    constructor() { 
        this.app = express();
        this.port = process.env.PORT

        // Path usuarios
        this.patchs = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos'
        }

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
        this.app.use(this.patchs.auth, authRouter);
        this.app.use(this.patchs.buscar, buscarRouter)
        this.app.use(this.patchs.categorias, categoriasRouter);
        this.app.use(this.patchs.usuarios, usuariosRouter);
        this.app.use(this.patchs.productos, productosRouter)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}

module.exports = Server;