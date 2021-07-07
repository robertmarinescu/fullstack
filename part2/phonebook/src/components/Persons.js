import React from "react";

const PersonDetails = ({ person, handleDelete }) => {
  return (
    <div>
      <span>{person.name}</span>
      <span>&nbsp; {person.number} &nbsp;</span>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  );
};

const Persons = ({ newFilter, filterPersons, persons, handleDelete }) => {
  return (
    <div>
      {newFilter
        ? filterPersons.map((person) => (
            <PersonDetails
              key={person.name}
              person={person}
              handleDelete={handleDelete}
            />
          ))
        : persons.map((person) => (
            <PersonDetails
              key={person.name}
              person={person}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
};

export default Persons;
