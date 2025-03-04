import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import EventCard from '../components/EventCard';
import AddEventForm from '../components/AddEventForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';

const CalendarPage: React.FC = () => {
  const { events, loading, error } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  const eventsForSelectedDate = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );
  
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-600">Manage your schedule and upcoming events</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 md:mt-0 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Event
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-xl font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-7 text-center py-2 border-b">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 auto-rows-fr">
              {Array(monthStart.getDay())
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-start-${index}`} className="p-2 border-t border-r" />
                ))}
              
              {monthDays.map((day, i) => {
                const dayEvents = getEventsForDay(day);
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 border-t border-r min-h-[80px] cursor-pointer ${
                      isSelected ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 text-sm ${
                          isToday
                            ? 'bg-indigo-600 text-white rounded-full'
                            : isSelected
                            ? 'font-semibold text-indigo-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>
                    
                    {dayEvents.length > 0 && (
                      <div className="mt-1">
                        {dayEvents.slice(0, 2).map((event, index) => (
                          <div
                            key={event.id}
                            className={`text-xs truncate px-1 py-0.5 rounded mt-0.5 ${
                              event.type === 'deadline'
                                ? 'bg-red-100 text-red-800'
                                : event.type === 'lecture'
                                ? 'bg-blue-100 text-blue-800'
                                : event.type === 'exam'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {Array(6 - ((monthDays.length + monthStart.getDay()) % 7 || 7))
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-end-${index}`} className="p-2 border-t border-r" />
                ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            
            <div className="space-y-4">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No events scheduled for this day.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showAddForm && <AddEventForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default CalendarPage;