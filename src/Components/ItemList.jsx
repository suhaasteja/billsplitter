// ItemList.jsx
import React, { useState } from 'react';

const ItemList = ({ items, people, allocations, onToggleAllocation }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Allocate Items</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.name} className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{item.name}</h3>
              <span className="text-green-600 font-medium">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {people.map((person) => (
                <label
                  key={person}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors
                      ${
                        allocations[item.name]?.includes(person)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                >
                  <input
                    type="checkbox"
                    checked={allocations[item.name]?.includes(person)}
                    onChange={() => onToggleAllocation(item.name, person)}
                    className="sr-only" // Changed from hidden to sr-only for accessibility
                  />
                  {person}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
