import React from 'react';

const PersonsForm = ({
  newName,
  newPhoneNumber,
  addPerson,
  handleNameChange,
  handleNumberChange
}) => {
  return (
    <form onSubmit={addPerson}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input value={newName} onChange={handleNameChange} />
            </td>
          </tr>
          <tr>
            <td>number: </td>
            <td>
              <input value={newPhoneNumber} onChange={handleNumberChange} />
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
