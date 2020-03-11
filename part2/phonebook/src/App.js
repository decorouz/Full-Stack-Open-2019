import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // const eventHandler = response => {
    //   setPersons(response.data);
    // };

    // const promise = axios.get('http://localhost:3001/persons');
    // promise.then(eventHandler);
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newPhoneNumber
    };

    const allNames = persons.map(person => person.name);

    if (allNames.includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons(persons.concat(newPersonObject));
    setNewName('');
    setNewPhoneNumber('');
  };

  const personsToShow = !filter
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const rowNames = () =>
    personsToShow.map(person => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
      </div>
    ));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonsForm
        onSubmit={addName}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newPhoneNumber, onChange: handleNumberChange }}
      />

      <h2>Numbers</h2>
      <Persons person={rowNames()} />
    </div>
  );
};

export default App;
