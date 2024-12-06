// AddPeopleForm.jsx
import React, { useState } from 'react';

const AddPeopleForm = ({ people, onAddPerson }) => {
  const [newPerson, setNewPerson] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPerson && !people.includes(newPerson)) {
      onAddPerson(newPerson);
      setNewPerson("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add People</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Person name"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Add Person
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {people.map((person) => (
          <span
            key={person}
            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
          >
            {person}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AddPeopleForm;
