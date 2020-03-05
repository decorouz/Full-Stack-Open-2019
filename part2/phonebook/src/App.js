import React, { useState } from 'react';

const Person = props => {
  return <div>{props.person.name}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const row = () =>
    persons.map(person => <div key={'name'}>{person.name}</div>);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const addName = event => {
    event.preventDefault();

    const nameObject = {
      name: newName
    };
    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {row()}
    </div>
  );
};

export default App;
