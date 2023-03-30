const mongoose = require('mongoose')

if(process.argv.length < 3 ) {
    console.log('give password as argument');
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://luisexneider1999:${password}@fullstack.jcfodl0.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteShema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteShema)
const note = new Note({
    content: 'HTM is easy',
    important: true,
})

note.save().then(result => {
    console.log('noted saved');
    mongoose.connection.close()
})

