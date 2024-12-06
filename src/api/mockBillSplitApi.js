// Create this file at: /src/api/mockBillSplitApi.js

const mockItems = {
    items: [
      {
        name: "ObiDbl",
        price: 2.65
      },
      {
        name: "98 Meat Pty XChz\nCounter-Eat In",
        price: 88.20
      },
      {
        name: "Fresh Juice",
        price: 5.50
      },
      {
        name: "Garden Salad",
        price: 12.95
      },
      {
        name: "French Fries",
        price: 4.99
      }
    ]
  };
  
  const mockPeople = [];
  let mockSession = {
    items: mockItems.items,
    people: mockPeople
  };
  
  const mockBillSplitApi = {
    uploadImage: async (imageFile) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockItems;
    },
  
    getSession: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSession;
    },
  
    addPerson: async (name) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!mockSession.people.includes(name)) {
        mockSession.people.push(name);
      }
      return {
        message: 'Person added successfully.',
        people: mockSession.people
      };
    },
  
    finalizeSplit: async (allocations) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const totals = {};
      
      mockSession.people.forEach(person => {
        totals[person] = 0;
      });
  
      Object.entries(allocations).forEach(([itemName, sharedBy]) => {
        const item = mockSession.items.find(item => item.name === itemName);
        if (item && sharedBy.length > 0) {
          const splitAmount = item.price / sharedBy.length;
          sharedBy.forEach(person => {
            totals[person] += splitAmount;
          });
        }
      });
  
      return {
        message: 'Split finalized.',
        totals: totals
      };
    }
  };
  
  export { mockBillSplitApi };