import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const ResultsDisplay = ({ totals }) => {
  const data = Object.entries(totals).map(([name, amount]) => ({
    name,
    value: parseFloat(amount.toFixed(2))
  }));

  // Modern, visually appealing color palette
  const COLORS = [
    '#FF6B6B', // Coral red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky blue
    '#96CEB4', // Sage green
    '#FFEEAD', // Soft yellow
    '#D4A5A5', // Dusty rose
    '#9FA4C4', // Periwinkle
    '#CC99C9', // Lavender
    '#9EE09E', // Mint green
    '#F49AC2', // Pink
  ];

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-600">${payload[0].value.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            {((payload[0].value / totalAmount) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Split Summary</h2>
      </div>
      
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side: Pie Chart */}
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => 
                    `${name} (${(percent * 100).toFixed(1)}%)`
                  }
                  outerRadius={160}
                  innerRadius={80} // Added innerRadius for donut style
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2} // Added padding between segments
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Right side: Detailed breakdown */}
          <div className="space-y-6">
            {/* Total Amount Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-gray-600 font-medium mb-2">Total Amount</h3>
              <p className="text-3xl font-bold text-gray-800">
                ${totalAmount.toFixed(2)}
              </p>
            </div>

            {/* Individual Shares Card */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-gray-600 font-medium mb-4">Individual Shares</h3>
              <div className="space-y-3">
                {data.map((person, index) => (
                  <div 
                    key={person.name}
                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-gray-700">{person.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ${person.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;