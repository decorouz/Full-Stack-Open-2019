import React, { useState, useEffect } from 'react';

import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import Filter from './components/Filter';
import phoneServices from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    phoneServices.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const nameHandler = event => {
    setNewName(event.target.value);
  };

  const numberHandler = event => {
    setNewPhoneNumber(event.target.value);
  };

  const filterHandler = event => {
    setFilter(event.target.value);
  };

  const deleteHandler = ({ id, name }) => {
    if (window.confirm(`Delete ${name}`))
      phoneServices.deleteItem(id).then(() => {
        phoneServices.getAll().then(data => {
          setPersons(data);
        });
      });
  };

  const addPerson = event => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
      number: newPhoneNumber
    };

    const allNames = persons.map(person => person.name);

    if (allNames.includes(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    phoneServices.create(newPersonObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewPhoneNumber('');
    });
  };

  const personsToShow = !filter
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const rowNames = () =>
    personsToShow.map(person => (
      <div key={person.name}>
        {person.name}: {person.number}{' '}
        <button onClick={() => deleteHandler(person)}>delete</button>
      </div>
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={filterHandler} />
      <h2>Add a new</h2>
      <PersonsForm
        onSubmit={addPerson}
        name={{ value: newName, onChange: nameHandler }}
        number={{ value: newPhoneNumber, onChange: numberHandler }}
      />

      <h2>Name and Numbers</h2>
      <Persons person={rowNames()} />
    </div>
  );
};

export default App;
