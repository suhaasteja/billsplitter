import React from 'react';
import PersonBadge from './PersonBadge';

const ItemList = ({ items, people, allocations, onToggleAllocation }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    const itemElement = e.currentTarget;
    itemElement.classList.add('bg-purple-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const itemElement = e.currentTarget;
    itemElement.classList.remove('bg-purple-50');
  };

  const handleDrop = (e, itemName) => {
    e.preventDefault();
    const itemElement = e.currentTarget;
    itemElement.classList.remove('bg-purple-50');
    
    const person = e.dataTransfer.getData('person');
    if (person) {
      onToggleAllocation(itemName, person);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Items to Split</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.name}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, item.name)}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-200 transition-colors"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <span className="text-lg font-semibold text-purple-600">
                ${item.price.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-2">
                {allocations[item.name]?.length > 0 ? 'Shared by:' : 'Drag names here to assign'}
              </p>
              <div className="min-h-[40px] flex flex-wrap gap-2 p-2 bg-gray-50 rounded-md">
                {allocations[item.name]?.map((person) => (
                  <PersonBadge
                    key={person}
                    person={person}
                    draggable={false}
                    onDelete={() => onToggleAllocation(item.name, person)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;