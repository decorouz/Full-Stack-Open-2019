import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const rowNames = () =>
    persons.map(person => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
      </div>
    ));

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewPhoneNumber(event.target.value);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rowNames()}
    </div>
  );
};

export default App;
