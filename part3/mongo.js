const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]

const url =
  `mongodb+srv://${username}:${password}@cluster0.dbslyrp.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){

  Person.find({})
    .then(result => {
      console.log('phonebook: ')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

}else{
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
