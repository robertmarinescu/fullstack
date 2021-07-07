import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonDetails from "./components/PersonDetails";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => {
    const target = event.target;
    setNewName(target.value);
  };

  const handleNumberChange = (event) => {
    const target = event.target;
    setNewNumber(target.value);
  };

  const handleFilterChange = (event) => {
    const target = event.target;
    setNewFilter(target.value);
  };

  function personExists(person) {
    return persons.some((p) => p.name === person.name);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    if (personExists(person)) {
      alert(`${person.name} is already added to phonebook`);
      return false;
    }
    personService.create(person).then((person) => {
      console.log(person);
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    });
  };

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {newFilter
        ? filterPersons.map((person) => (
            <PersonDetails
              key={person.name}
              name={person.name}
              number={person.number}
            />
          ))
        : persons.map((person) => (
            <PersonDetails
              key={person.name}
              name={person.name}
              number={person.number}
            />
          ))}
    </div>
  );
};

export default App;
