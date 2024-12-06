import React from 'react';
import { X } from 'lucide-react';

const PersonBadge = ({ person, onDelete, draggable = true }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('person', person);
  };

  return (
    <span
      draggable={draggable}
      onDragStart={handleDragStart}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 
        rounded-full text-sm font-medium
        ${draggable 
          ? 'bg-purple-100 text-purple-800 cursor-move' 
          : 'bg-green-100 text-green-800'
        }
        transition-all duration-200
        ${draggable && 'hover:bg-purple-200 active:scale-95'}
      `}
    >
      {person}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(person);
          }}
          className="opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
          title="Remove person"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};

export default PersonBadge;