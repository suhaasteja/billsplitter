// ResultsDisplay.jsx
import React, { useState } from 'react';


const ResultsDisplay = ({ totals }) => {
  if (Object.keys(totals).length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="space-y-3">
        {Object.entries(totals).map(([person, amount]) => (
          <div
            key={person}
            className="flex justify-between items-center p-3 bg-gray-50 rounded"
          >
            <span className="font-medium">{person}</span>
            <span className="text-lg text-green-600 font-semibold">
              ${amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
