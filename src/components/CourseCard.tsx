import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { useDashboard } from '../context/DashboardContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { updateCourseProgress } = useDashboard();
  
  const handleProgressUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= course.totalSections) {
      updateCourseProgress(course.id, value);
    }
  };

  const getPlatformColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case 'udemy':
        return 'bg-red-100 text-red-800';
      case 'coursera':
        return 'bg-blue-100 text-blue-800';
      case 'edx':
        return 'bg-purple-100 text-purple-800';
      case 'udacity':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPlatformColor(course.platform)}`}>
            {course.platform}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-800">{course.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <BookOpen size={16} className="mr-1" />
          <span>{course.completedSections} of {course.totalSections} sections</span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor={`sections-${course.id}`} className="block text-xs text-gray-600 mb-1">
            Update completed sections:
          </label>
          <input
            id={`sections-${course.id}`}
            type="number"
            min="0"
            max={course.totalSections}
            value={course.completedSections}
            onChange={handleProgressUpdate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            <span>Started: {new Date(course.startDate).toLocaleDateString()}</span>
            <br />
            <span>Due: {new Date(course.endDate).toLocaleDateString()}</span>
          </div>
          
          <a 
            href={course.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            <span className="mr-1">Open Course</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;