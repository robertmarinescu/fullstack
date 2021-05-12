import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");


  const handleNameChange = (event) => {
    const target = event.target
    setNewName(target.value);
  }

  const handleNumberChange = (event) => {
    const target = event.target
    setNewNumber(target.value);
  }

  const handleFilterChange = (event) => {
    const target = event.target
    setNewFilter(target.value);
  }

  function personExists(person) {
    return persons.some( p => p.name === person.name)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber
    }
    if(personExists(person)){
      alert(`${person.name} is already added to phonebook`)
      return false;
    }
    setPersons(persons.concat(person))
    setNewName("")
    setNewNumber("")
  }

  const filterPersons = persons.filter( person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}></input>
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        { newFilter
          ? filterPersons.map( person => <p key={person.name}>{person.name} {person.number}</p>)
          : persons.map( person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;
