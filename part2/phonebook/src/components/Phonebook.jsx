import PropTypes from 'prop-types';
import { useState } from 'react';
import personService from '../services/person';
import Filter from './Filter';

const Phonebook = ({ persons, setPersons, setMessage }) => {
  const [query, setQuery] = useState('');

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (!personToDelete) {
      setMessage('Person not found');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${personToDelete.name}?`
    );

    if (confirmDelete) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
          setMessage(`${personToDelete.name} successfully deleted.`);
        })
        .catch((error) => {
          setMessage(`ERROR: ${error.name}!`);
        });
    }
  };

  const filteredPersons = persons.filter(
    (person) =>
      (person.name && person.name.toLowerCase().includes(query.toLowerCase())) ||
      (person.number && person.number.includes(query))
  );

  return (
    <div className="w-screen h-screen">
      <h3 className="text-xl font-bold mt-10 text-center pr-10 text-yellow-400">
        Numbers
      </h3>
      <Filter query={query} setQuery={setQuery} />
      <ul className="text-lg font-bold mt-10 text-center w-full text-yellow-500">
  <table className="table-auto w-full max-w-3xl mx-auto bg-stone-900 rounded text-left">
    <thead className="bg-zinc-400 text-black text-lg font-bold" >
      <tr>
        <th className="py-2 px-4">Name</th>
        <th className="py-2 px-6">Number</th>
        <th className="py-2 px-4 text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredPersons.map((person) => (
        <tr key={person.id} className="bg-stone-900 ">
          <td className="py-2 px-4">{person.name}</td>
          <td className="py-2 px-4">{person.number}</td>
          <td className="py-2 px-4 text-center">
            <button
              onClick={() => deletePerson(person.id)}
              className="w-24 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</ul>

    </div>
  );
};

Phonebook.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Phonebook;
