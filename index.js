require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const db = require('./modules/persons')
const app = express()

app.use(morgan("tiny"))
app.use(express.static('dist'))
app.use(express.json())


app.get('/api/persons', (request, response) => {
  db.find({}).then(result => response.json(result))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  db.findById(id)
    .then(result => response.json(result))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  db.findByIdAndDelete(id).then(()  => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const person = new db({...request.body})
  person.save().then(() => {
    response.json(person).end()
  })
})

app.get('/info', (request, response) => {
  response.send(`<h2>Phonebook has info for ${db.length} people</h2> <h2>${Date()}</h2>`);
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})