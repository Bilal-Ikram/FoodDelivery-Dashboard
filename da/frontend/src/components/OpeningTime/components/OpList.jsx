import React, { useState } from 'react';
import OpEdit from './OpEdit';

export default function OpList() {
    const [schedule, setSchedule] = useState([
        { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
        { day: 'Sunday', hours: 'Closed' }
    ]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleScheduleUpdate = (newSchedule) => {
        setSchedule(newSchedule);
    };

    return (
        <>
            <div className='mt-14 mx-2 flex flex-row w-2/4 justify-between'>
                <div className='mr-6 pr-2'>
                    <p className='text-xl font-semibold text-slate-950 pb-1'>Regular Schedule</p>
                    <p className='text-base text-gray-400'>This is the schedule you follow on the day to day basis</p>
                </div>
                <div className='flex items-center ml-10'>
                    <button 
                        className="py-2 px-4 rounded-md transition-colors duration-200 text-pink-600 hover:bg-gray-200 flex items-center gap-2" 
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <span>Edit</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </button>
                </div>
            </div>

            <ul className='w-2/4 mx-2 my-6 divide-y divide-gray-200'>
                {schedule.map(({ day, hours }) => (
                    <li key={day} className='flex justify-between items-center py-2 my-2'>
                        <span className='font-medium text-gray-700'>{day}</span>
                        <span className='text-gray-600'>{hours}</span>
                    </li>
                ))}
            </ul>

            <OpEdit 
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onScheduleUpdate={handleScheduleUpdate}
            />
        </>
    );
}