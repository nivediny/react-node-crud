import React from 'react';

const FinanceDashboardBoxes = () => {
  const boxData = [
    {
      title: 'Total Income',
      value: '$2,342',

      color: 'bg-blue-500 text-white',
    },
    {
      title: 'Paid Invoices',
      value: '$2,312',

      color: 'bg-green-500 text-white',
    },
    {
      title: 'Unpaid Invoices',
      value: '$2,332',

      color: 'bg-yellow-500 text-white',
    },
    {
      title: 'Total Invoiced Bank',
      value: '$3,587',

      color: 'bg-purple-500 text-white',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {boxData.map((box, index) => (
        <div
          key={index}
          className={`rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow ${box.color}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{box.title}</p>
              <p className="text-2xl font-bold">{box.value}</p>
            </div>
            <span className="text-3xl">{box.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinanceDashboardBoxes;