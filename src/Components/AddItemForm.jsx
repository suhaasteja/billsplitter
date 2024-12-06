// AddItemForm.jsx
import React, { useState } from 'react';

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      onAddItem({ ...newItem, price: parseFloat(newItem.price) });
      setNewItem({ name: '', price: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add Items</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Item name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            step="0.01"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemForm