require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())
app.use(cors())

morgan.token('obj', function (req) {
  return   (JSON.stringify(req.body))
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'))


let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(result => res.json(result))
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  const localDateTime = new Date()
  Person.find({})
    .then(() => {
      res.send(`<p>Phonebook has info for ${persons.length} people </p> <p>${localDateTime}</p>`)
    })
    .catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error) )

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() =>   res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return  res.status(400).json({ error: 'name is missing' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  if (persons.some((person) => person.name === body.name)) {
    return  res.status(400).json({ error: 'name must be unique' })
  }
  else{
    let person = new Person({
      name: body.name,
      number: body.number
    })
    person.save()
      .then(savedPerson => res.status(201).json(savedPerson))
      .catch(error => next(error))
  }

})

app.put('/api/persons/:id', (req, res, next) => {
  const { name , number } = req.body

  const person = {
    name: name,
    number: number
  }

  Person.findById(req.params.id)
    .then(foundPerson => {
      if (!foundPerson) {
        return res.status(404).json({ error: 'Person not found' })
      }

      return Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.status(200).json(updatedPerson)
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
