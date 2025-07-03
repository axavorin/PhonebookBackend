const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Password needed')
  process.exit(1)
}
else if (process.argv.length == 4) {
    console.log("Please provide number for the person")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://bossespro53:${password}@ac-3bmll5x-shard-00-00.rztucth.mongodb.net:27017,ac-3bmll5x-shard-00-01.rztucth.mongodb.net:27017,ac-3bmll5x-shard-00-02.rztucth.mongodb.net:27017/?ssl=true&replicaSet=atlas-jx2cx3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Phonebook`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        });

        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result => {
        console.log('Number added!')
        mongoose.connection.close()
    })
}