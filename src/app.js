import express from 'express';
import handlebars from 'express-handlebars'
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import viewsRoute from './routes/views.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use('/', viewsRoute)

const server = app.listen(8080, ()=>{
    console.log('Server On');
    
})
const io = new Server(server)

let messages = []

io.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('message', data=>{
        messages.push(data)
        io.emit('messageLogs',messages)
    })

    socket.on('authenticated', data=>{//Aca recibimos el mensaje del cliente para el logueo y despues lo enviamos para que todos vean el logueo menos quien lo envia
        socket.broadcast.emit('newUserConnected', data)
    })
})
