const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
//definimos la url
const url = process.env.MONGODB_URL
//nos conectamos
console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error conecting to MongoDB', error.message)
  })
//creamos el esquema para notas
const noteSchema = mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
})
//modificamos el guardado de los datos

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
