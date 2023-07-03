import React, { useEffect, useState } from 'react';

const RecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/records/list');
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <div>
      <h1>This is the RecordList page</h1>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            Name: {record.name}, Mobile Number: {record.mobileNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
