import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

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
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const duplicateUser = persons.find((p) => p.name === person.name);
        personService
          .update(duplicateUser.id, person)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== duplicateUser.id ? p : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(
              `${returnedPerson.name}'s number was change to ${returnedPerson.number}`
            );
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            console.log(error.response.data);
            setMessage(`Error: ${error.response.data.error}`);
            setTimeout(() => {
              setMessage(null);
              // window.location.reload();
            }, 3000);
          });
        console.log(persons);
      }
      return false;
    }
    personService
      .create(person)
      .then((person) => {
        console.log(person);
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${person.name}`);
        console.log(message)
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage(`Error: ${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
          // window.location.reload();
        }, 3000);
      });
  };

  const hook = () => {
    personService.getAll().then((personList) => {
      console.log("Promise fulfilled");
      setPersons(personList);
    });
  };

  useEffect(hook, []);

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  const handleDelete = (id) => {
    const user = persons.find((p) => p.id === id);
    console.log("id-ul userului este", user.id);
    if (window.confirm(`Delete ${user.name}`)) {
      personService
        .deleteResource(id)
        .then(() => {
          console.log("user with id ", id, "deleted");
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setMessage(
            `Information of ${user.name} has already been removed from the server`
          );
          setTimeout(() => {
            setMessage(null);
            window.location.reload();
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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

      <Persons
        newFilter={newFilter}
        filterPersons={filterPersons}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
