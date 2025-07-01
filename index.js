const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(morgan("tiny"))
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000000)
    
    const person = {...request.body, id}

    if (!person.name || !person.number || persons.some(i => i.name === person.name)) {
        return response.status(400).end()
    }
    persons = persons.concat(person)

    response.status(200).end()
})

app.get('/info', (request, response) => {
    response.send(`<h2>Phonebook has info for ${persons.length} people</h2> <h2>${Date()}</h2>`);
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})