import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import views from './routes/views.router.js'
import {Server} from 'socket.io';
import chatContext from './contexts/chatContext.js'
import userRouter from './routes/users.router.js'

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>console.log(`conectado al puerto ${PORT}`));

const io = new Server(server)

app.use(express.json());
//lectura de archivos estaticos
app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({ extended: true }))
//seteo de las vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use('/',views)
app.use('/api/users', userRouter)
//context
const utilidadesChat = new chatContext();
//socket
io.on('connection', async(socket)=>{
    console.log('socket conectado');
    let chat = await utilidadesChat.getUsers();
    io.emit("chatMessages", chat);

    //socket chat
    socket.on("message", async(data)=>{
        await utilidadesChat.save(data);
        let chat = await utilidadesChat.getUsers();
        io.emit("chatMessage", chat)
    })
})