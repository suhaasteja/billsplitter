import React, { useState } from 'react';
import PersonBadge from './PersonBadge';
import { Plus } from 'lucide-react';

const AddPeopleForm = ({ people, onAddPerson, onDeletePerson }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (people.includes(name.trim())) {
      setError('This person has already been added');
      return;
    }

    try {
      await onAddPerson(name.trim());
      setName('');
      setError('');
    } catch (err) {
      setError('Failed to add person. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add People</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-3">
          {people.length > 0
            ? 'Drag names to assign to items:'
            : 'No people added yet'}
        </p>
        <div className="min-h-[50px] p-3 bg-gray-50 rounded-lg flex flex-wrap gap-2">
          {people.map((person) => (
            <PersonBadge 
              key={person} 
              person={person} 
              onDelete={onDeletePerson}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPeopleForm;