export const billSplitApi = {
  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('bill_image', imageFile);
    
    const response = await fetch('http://localhost:5000/upload_image', {
      method: 'POST',
      body: formData,
      credentials: 'include',  // Add this line
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Update other API calls similarly
  getSession: async () => {
    const response = await fetch('http://localhost:5000/session', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  addPerson: async (name) => {
    const response = await fetch('http://localhost:5000/add_person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  finalizeSplit: async (allocations) => {
    const response = await fetch('http://localhost:5000/finalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ allocations }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};