import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const ComponentTable = ({ data, columns }) => {
  const [records, setRecords] = useState(data);

  useEffect(() => {
    setRecords(data); // Update records whenever the data prop changes
  }, [data]);

  // Handle search functionality
  function handleFilter(event) {
    const filteredData = data.filter((row) => {
      // Filter by any column name such as name or email
      return (
        row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setRecords(filteredData);
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Search input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleFilter} // Ensure you pass the event here
        />
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns} // Directly pass columns with width
        data={records}
        sortable
        pagination
        highlightOnHover
        fixedHeader
        responsive
        customStyles={{
          headCells: {
            style: {
              color: '#4B5563', // Dark text for header
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
          },
          rows: {
            style: {
              '&:hover': {
                backgroundColor: '#F9FAFB', // Hover color for rows
              },
            },
          },
          pagination: {
            style: {
              backgroundColor: '#F3F4F6', // Background for pagination controls
              borderTop: '1px solid #E5E7EB',
            },
          },
        }}
      />
    </div>
  );
};

export default ComponentTable;
