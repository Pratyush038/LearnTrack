import React from 'react';
import { CalendarEvent } from '../types';
import { Calendar, Clock, BookOpen, FileText, Award } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { courses, removeEvent } = useDashboard();
  
  const course = courses.find(c => c.id === event.courseId);
  
  const getEventTypeIcon = () => {
    switch (event.type) {
      case 'deadline':
        return <FileText size={16} className="text-red-500" />;
      case 'lecture':
        return <BookOpen size={16} className="text-blue-500" />;
      case 'exam':
        return <Award size={16} className="text-purple-500" />;
      case 'assignment':
        return <FileText size={16} className="text-green-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };
  
  const getEventTypeClass = () => {
    switch (event.type) {
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-purple-100 text-purple-800';
      case 'assignment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this event?')) {
      removeEvent(event.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{event.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${getEventTypeClass()}`}>
          {event.type}
        </span>
      </div>
      
      {course && (
        <p className="text-sm text-gray-600 mt-1">
          Course: {course.title}
        </p>
      )}
      
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <Calendar size={14} className="mr-1" />
        <span className="mr-3">{new Date(event.date).toLocaleDateString()}</span>
        <Clock size={14} className="mr-1" />
        <span>{event.time}</span>
      </div>
      
      {event.description && (
        <p className="mt-2 text-sm text-gray-600">{event.description}</p>
      )}
      
      <div className="mt-3 flex justify-end">
        <button 
          onClick={handleRemove}
          className="text-xs text-gray-500 hover:text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EventCard;