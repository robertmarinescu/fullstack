require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("details", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :details"
  )
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(err);
};

app.get("/", (req, res) => {
  res.send("<h1>Hello there!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </div>`
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
    console.log(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const findUserByName = (name) => {
  const person = persons.find((person) => person.name === name);
  return person ? true : false;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name cannot be empty",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number cannot be empty",
    });
  }

  // if (findUserByName(body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
