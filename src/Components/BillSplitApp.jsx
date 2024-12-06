// BillSplitApp.jsx

// React imports
import React, { useState, useEffect } from 'react';

// Component imports
import ImageUploadForm from './ImageUploadForm';
import AddPeopleForm from './AddPeopleForm';
import ItemList from './ItemList';
import ResultsDisplay from './ResultsDisplay';

// API imports
import { billSplitApi } from '../api/billSplitApi';

// Optional: Icons if you're using them
import { Upload, Users, DollarSign } from 'lucide-react';

const BillSplitApp = () => {
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [allocations, setAllocations] = useState({});
  const [totals, setTotals] = useState({});
  const [step, setStep] = useState('upload'); // upload, allocate, summary

  const handleUploadSuccess = (items) => {
    setItems(items);
    setStep('allocate');
  };

  const handleAddPerson = async (name) => {
    try {
      const response = await billSplitApi.addPerson(name);
      setPeople(response.people);
    } catch (error) {
      console.error('Failed to add person:', error);
    }
  };

  const handleFinalize = async () => {
    try {
      const response = await billSplitApi.finalizeSplit(allocations);
      setTotals(response.totals);
      setStep('summary');
    } catch (error) {
      console.error('Failed to finalize split:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Bill Split Calculator</h1>

      {step === 'upload' && (
        <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
      )}

      {step === 'allocate' && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AddPeopleForm people={people} onAddPerson={handleAddPerson} />
          </div>

          <ItemList
            items={items}
            people={people}
            allocations={allocations}
            onToggleAllocation={handleToggleAllocation}
          />

          {items.length > 0 && people.length > 0 && (
            <button 
              onClick={handleFinalize}
              className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors mb-8"
            >
              Calculate Split
            </button>
          )}
        </>
      )}

      {step === 'summary' && (
        <ResultsDisplay totals={totals} />
      )}
    </div>
  );
};

export default BillSplitApp;