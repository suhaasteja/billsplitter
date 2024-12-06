import React, { useState, useEffect } from "react";
import ImageUploadForm from "./ImageUploadForm";
import AddPeopleForm from "./AddPeopleForm";
import ItemList from "./ItemList";
import ResultsDisplay from "./ResultsDisplay";
import { mockBillSplitApi } from "../api/mockBillSplitApi";
import { Upload, Users, DollarSign } from "lucide-react";

const BillSplitApp = () => {
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [allocations, setAllocations] = useState({});
  const [totals, setTotals] = useState({});
  const [step, setStep] = useState("upload");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await mockBillSplitApi.getSession();
        if (session.items) setItems(session.items);
        if (session.people) setPeople(session.people);
      } catch (error) {
        console.error("Failed to load session:", error);
      }
    };
    loadSession();
  }, []);

  const handleUploadSuccess = (uploadedItems) => {
    setItems(uploadedItems);
    setStep("allocate");
  };

  const handleAddPerson = async (name) => {
    try {
      const response = await mockBillSplitApi.addPerson(name);
      // Immediately update the local state with the new people array
      setPeople(response.people);
      return response; // Return the response so the form knows the operation succeeded
    } catch (error) {
      console.error("Failed to add person:", error);
      throw error; // Throw the error so the form can handle it
    }
  };

  const handleToggleAllocation = (itemName, personName) => {
    setAllocations((prevAllocations) => {
      const newAllocations = { ...prevAllocations };

      if (!newAllocations[itemName]) {
        newAllocations[itemName] = [];
      }

      const personIndex = newAllocations[itemName].indexOf(personName);
      if (personIndex === -1) {
        newAllocations[itemName] = [...newAllocations[itemName], personName];
      } else {
        newAllocations[itemName] = newAllocations[itemName].filter(
          (p) => p !== personName
        );
      }

      if (newAllocations[itemName].length === 0) {
        delete newAllocations[itemName];
      }

      return newAllocations;
    });
  };

  const handleFinalize = async () => {
    try {
      const response = await mockBillSplitApi.finalizeSplit(allocations);
      setTotals(response.totals);
      setStep("summary");
    } catch (error) {
      console.error("Failed to finalize split:", error);
    }
  };

  const isReadyToFinalize = () => {
    return (
      items.length > 0 &&
      people.length > 0 &&
      items.every((item) => allocations[item.name]?.length > 0)
    );
  };

  const handleDeletePerson = async (personToDelete) => {
    try {
      // Remove person from people array
      setPeople((currentPeople) =>
        currentPeople.filter((person) => person !== personToDelete)
      );

      // Remove person from all allocations
      setAllocations((currentAllocations) => {
        const newAllocations = { ...currentAllocations };

        // Remove the person from each item's allocations
        Object.keys(newAllocations).forEach((itemName) => {
          newAllocations[itemName] = newAllocations[itemName].filter(
            (person) => person !== personToDelete
          );

          // Remove the item entry if no one is allocated
          if (newAllocations[itemName].length === 0) {
            delete newAllocations[itemName];
          }
        });

        return newAllocations;
      });
    } catch (error) {
      console.error("Failed to delete person:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1611/1611154.png"
          alt="Bill Split Icon"
          className="w-12 h-12 object-contain"
        />
        <span>Bill Split Calculator</span>
      </h1>

      {step === "upload" && (
        <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
      )}

      {step === "allocate" && (
        <div className="space-y-8">
          {/* Center the AddPeopleForm */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <AddPeopleForm
                people={people}
                onAddPerson={handleAddPerson}
                onDeletePerson={handleDeletePerson}
              />
            </div>
          </div>

          {items.length > 0 && (
            <ItemList
              items={items}
              people={people}
              allocations={allocations}
              onToggleAllocation={handleToggleAllocation}
            />
          )}

          {items.length > 0 && people.length > 0 && (
            <button
              onClick={handleFinalize}
              disabled={!isReadyToFinalize()}
              className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors mb-8 disabled:bg-purple-300 disabled:cursor-not-allowed"
            >
              Calculate Split
            </button>
          )}
        </div>
      )}

      {step === "summary" && <ResultsDisplay totals={totals} />}
    </div>
  );
};

export default BillSplitApp;
