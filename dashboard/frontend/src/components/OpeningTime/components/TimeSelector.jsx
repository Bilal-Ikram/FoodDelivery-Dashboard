import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const time24 = `${formattedHour}:${formattedMinute}`;
      const period = hour >= 12 ? 'PM' : 'AM';
      const hours12 = hour % 12 || 12;
      const time12 = `${hours12}:${formattedMinute} ${period}`;
      options.push({
        value: time24,
        display: time12
      });
    }
  }
  return options;
};

const TimeSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Memoize time options to prevent recalculation on every render
  const timeOptions = useMemo(() => generateTimeOptions(), []);

  // Memoize the format function
  const formatTo12Hour = useCallback((time24) => {
    const [hours24, minutes] = time24.split(':');
    const hours = parseInt(hours24);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }, []);

  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((e) => {
    if (!e.target.closest('.time-selector')) {
      setIsOpen(false);
    }
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  return (
    <div className="relative h-2/4 w-[30%] my-[2px] time-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
          text-left flex items-center justify-between"
      >
        {formatTo12Hour(value)}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 
            ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-36 mt-1 max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg 
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 z-10">
          {timeOptions.map((time) => (
            <div
              key={time.value}
              onClick={() => {
                onChange(time.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors
                ${value === time.value ? 'bg-white' : ''}`}
            >
              {time.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(TimeSelector);