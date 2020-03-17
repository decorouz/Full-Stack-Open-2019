import React, { useState, useEffect } from 'react';

import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import Filter from './components/Filter';
import phoneServices from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

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
    if (window.confirm(`Delete ${name}`)) {
      phoneServices.remove(id).then(() => {
        phoneServices.getAll().then(data => {
          setPersons(data);
          setNotification(`${name} was removed from server`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      });
    }
  };

  const addPerson = event => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newPhoneNumber
    };

    const isDuplicate = persons.find(p => p.name === newPersonObject.name);

    if (isDuplicate) {
      const id = isDuplicate.id;

      if (
        window.confirm(
          `${isDuplicate.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneServices
          .update(id, newPersonObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson
              )
            );

            setNotification(`${returnedPerson.name} number was changed`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);

            setNewName('');
            setNewPhoneNumber('');
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      phoneServices.create(newPersonObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));

        setNotification(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);

        setNewName('');
        setNewPhoneNumber('');
      });
    }
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
      <Notification message={notification} />
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
