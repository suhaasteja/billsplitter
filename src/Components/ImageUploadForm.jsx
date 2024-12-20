// Update your ImageUploadForm.jsx

import React, { useState } from "react";
import { mockBillSplitApi } from "../api/mockBillSplitApi";  // Adjust this path based on your file structure

const ImageUploadForm = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const uploadResponse = await mockBillSplitApi.uploadImage(file);
      onUploadSuccess(uploadResponse.items);
    } catch (err) {
      setError(err.message || "Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestButton = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const uploadResponse = await mockBillSplitApi.uploadImage(null);
      onUploadSuccess(uploadResponse.items);
    } catch (err) {
      setError(err.message || "Failed to load test data. Please try again.");
      console.error("Test data error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Receipt</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <div className="text-center">Processing receipt...</div>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload receipt</span>{" "}
                    or drag and drop
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              disabled={loading}
            />
          </label>
        </div>
        
        <button
          onClick={handleTestButton}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          Load Test Data
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
};

export default ImageUploadForm;