//se llama la libreria
const express = require('express')
//libreria para conectarse a la base de datos
const mongoose = require('mongoose')
//libreria para permitir origenes cruzados
const cors = require('cors')
//se instancia la libreria
const app = express()
const password = process.argv[2]
//comenzamos haciendo la conección y modelos para la base de datos
const url = `mongodb+srv://luisexneider1999:${password}@fullstack.jcfodl0.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
//se crea el esquema
const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean,
})
//se crea el modelo
const Note = mongoose.model('Note', noteSchema)
//se crea un middleware, para poder observar lo que se envia al server
const requestLoogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('body:', request.body);
    console.log('---');
    next()
}
// middleware para cuando se intenta acceder a una ruta que no existe, este se debe poner al final de la rutas
const unKnowEndpoind = (request, response) => {
    response.status(400).send({error: 'unknow endpoint'})
}
//se agregan los middleware al app
//para poder acceder a la información en formato json
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLoogger)

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(element => element.id))
        : 0
    return maxId + 1
}
//se crean las rutas para hacer las peticiones:
// ruta home de la aplicaión
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})
//ruta para obtener las notas
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})
//ruta para obtener una sola nota
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(element => element.id === id)
    if(note){
        response.json(note)
        return
    }
    response.status(404).end()
})
//ruta para eliminar una sola nota usando el id
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(element => element.id !== id)
    response.status(202).end()
})
//ruta para crear una nueva nota
app.post('/api/notes', (request, response) => {
    const body = request.body
    if(!body.content){
        response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        import: body.important || false,
        id: generateId()
    }
    notes = notes.concat(note)
    response.status(200).json(note)
})
//se llama el middleware cuando se intenta acceder a una ruta que no existe
app.use(unKnowEndpoind)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log((`Server running on port ${PORT}`))
})