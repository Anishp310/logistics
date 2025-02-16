import React, { useEffect, useState } from 'react';
import NepaliDate from "nepali-date"; // Import the Nepali date library

const Header = ({ heading }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [nepaliDate, setNepaliDate] = useState(""); // Nepali Date

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toDateString()); // Format date as "Mon Jan 27 2025"
    // Get Nepali date using NepaliDate library
    const nepali = new NepaliDate();
    const nepaliDateString = nepali.format("dddd, D MMMM YYYY"); // Format it to the desired Nepali format
    setNepaliDate(nepaliDateString);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center text-white">
        <p className="font-semibold text-xl">{heading}</p>
        <div className="text-sm text-gray-300">
          <p>{currentDate}</p>
          <p>{nepaliDate}</p>
        </div>
      </div>
      <hr className="mt-4 border-gray-600" />
    </div>
  );
};

export default Header;
