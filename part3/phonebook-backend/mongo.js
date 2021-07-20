const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.jogmy.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: phoneNumber,
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log("phonebook: ");
      console.log(person);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

person.save().then((result) => {
  console.log(`added ${name} number ${phoneNumber} to phonebook`);
  mongoose.connection.close();
});
