"use client";
import  { useState, useCallback, useMemo } from 'react';
import { Drawer } from "flowbite-react";
import TimeSelector from './TimeSelector';

const INITIAL_SHIFT = { startTime: '09:00', endTime: '17:00' };
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function OpEdit({ isOpen, onClose, onScheduleUpdate }) {
  const initialDayStates = useMemo(() => {
    return DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { isToggled: true, shifts: [{ id: 1, ...INITIAL_SHIFT }] }
    }), {});
  }, []);

  const [dayStates, setDayStates] = useState(initialDayStates);

  const formatTo12Hour = useCallback((time24) => {
    const [hours24, minutes] = time24.split(':');
    const hours = parseInt(hours24);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }, []);

  const toggleDay = useCallback((day) => {
    setDayStates(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isToggled: !prev[day].isToggled
      }
    }));
  }, []);

  const updateShiftTime = useCallback((day, shiftId, timeType, newTime) => {
    setDayStates(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        shifts: prev[day].shifts.map(shift =>
          shift.id === shiftId
            ? { ...shift, [timeType]: newTime }
            : shift
        )
      }
    }));
  }, []);

  const addShift = useCallback((day) => {
    setDayStates(prev => {
      const currentShifts = prev[day].shifts;
      const newShift = {
        id: Math.max(...currentShifts.map(s => s.id)) + 1,
        ...INITIAL_SHIFT
      };
      return {
        ...prev,
        [day]: {
          ...prev[day],
          shifts: [...currentShifts, newShift]
        }
      };
    });
  }, []);

  const removeShift = useCallback((day, shiftId) => {
    setDayStates(prev => {
      if (prev[day].shifts.length <= 1) return prev;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          shifts: prev[day].shifts.filter(shift => shift.id !== shiftId)
        }
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    setDayStates(initialDayStates);
  }, [initialDayStates]);

  const handleApplyChanges = useCallback(() => {
    const newSchedule = Object.entries(dayStates).map(([day, state]) => ({
      day,
      hours: !state.isToggled ? 'Closed' : state.shifts
        .map(shift => `${formatTo12Hour(shift.startTime)} - ${formatTo12Hour(shift.endTime)}`)
        .join(', ')
    }));

    onScheduleUpdate(newSchedule);
    onClose();
  }, [dayStates, formatTo12Hour, onScheduleUpdate, onClose]);

  const renderShift = useCallback((day, shift) => (
    <div key={shift.id} className="flex flex-row my-2">
      <TimeSelector
        value={shift.startTime}
        onChange={(time) => updateShiftTime(day, shift.id, 'startTime', time)}
      />
      <span className="mx-4 my-auto">to</span>
      <TimeSelector
        value={shift.endTime}
        onChange={(time) => updateShiftTime(day, shift.id, 'endTime', time)}
      />
      {dayStates[day].shifts.length > 1 && (
        <button
          className="my-auto mx-6"
          onClick={() => removeShift(day, shift.id)}
        >
          <svg viewBox="0 0 16 16" width="1.3em" height="1.3em" xmlns="http://www.w3.org/2000/svg">
            <path fill="#9CA3AF" d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 1.6c3.52 0 6.4 2.88 6.4 6.4 0 3.52-2.88 6.4-6.4 6.4-3.52 0-6.4-2.88-6.4-6.4 0-3.52 2.88-6.4 6.4-6.4zM3 7.2v1.6h10V7.2H3z" />
          </svg>
        </button>
      )}
    </div>
  ), [dayStates, removeShift, updateShiftTime]);

  return (
    <Drawer open={isOpen} onClose={onClose} position="right" className="w-[30%]">
      <Drawer.Header />
      <Drawer.Items className="my-8 mx-2 pb-24">
        <div className="flex flex-col divide-y divide-gray-200">
          {DAYS.map(day => {
            const { isToggled, shifts } = dayStates[day];
            return (
              <div key={day} className="py-4">
                <div className="flex flex-row justify-between mx-1 pb-2">
                  <p className="text-xl text-gray-800">{day}</p>
                  <button
                    onClick={() => toggleDay(day)}
                    className={`relative w-[50px] h-[30px] rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
                      isToggled ? 'bg-pink-600' : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`block w-[22px] h-[22px] rounded-full bg-white transition-transform duration-300 ease-in-out ${
                        isToggled ? 'translate-x-[21px]' : 'translate-x-[3px]'
                      }`}
                    />
                  </button>
                </div>

                {isToggled ? (
                  <div className="flex flex-col justify-between mx-1 my-4 ease-in">
                    {shifts.map(shift => renderShift(day, shift))}
                    <div className="my-3 mx-1">
                      <button
                        className="text-lg font-medium text-pink-600 hover:bg-gray-100 px-2 py-2 rounded-sm"
                        onClick={() => addShift(day)}
                      >
                        Add a shift +
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mx-1 my-2 divide-y divide-gray-400">
                    <div className="flex justify-center items-center pb-4">
                      <div className="text-gray-400 text-base flex items-center">
                        Closed for the day.
                        <svg
                          viewBox="0 0 16 16"
                          width="1em"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 mb-[2px]"
                        >
                          <path
                            fill="currentColor"
                            d="M5 5.5C5 4.12 6.12 3 7.5 3S10 4.12 10 5.5V7h.5A1.5 1.5 0 0112 8.5v4a1.5 1.5 0 01-1.5 1.5h-6A1.5 1.5 0 013 12.5v-4A1.5 1.5 0 014.5 7H5V5.5zM7.5 4C6.67 4 6 4.67 6 5.5V7h3V5.5C9 4.67 8.33 4 7.5 4z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="pt-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Drawer.Items>

      {/* Fixed position buttons */}
      <div className="fixed bottom-0 right-0 w-[30%] bg-white border-t border-gray-200 p-4 flex justify-end gap-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          Reset All
        </button>
        <button
          onClick={handleApplyChanges}
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-200"
        >
          Apply Changes
        </button>
      </div>
    </Drawer>
  );
}