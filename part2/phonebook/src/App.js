import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");


  const handleNameChange = (event) => {
    const target = event.target
    setNewName(target.value);
  }

  const handleNumberChange = (event) => {
    const target = event.target
    setNewNumber(target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
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
  {persons.map( person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default App;
