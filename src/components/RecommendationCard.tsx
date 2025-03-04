import React from 'react';
import { StudyRecommendation } from '../types';
import { Lightbulb, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

interface RecommendationCardProps {
  recommendation: StudyRecommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { courses } = useDashboard();
  
  const course = courses.find(c => c.id === recommendation.courseId);
  
  const getPriorityIcon = () => {
    switch (recommendation.priority) {
      case 'high':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'medium':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'low':
        return <Info size={18} className="text-blue-500" />;
      default:
        return <Lightbulb size={18} className="text-gray-500" />;
    }
  };
  
  const getPriorityClass = () => {
    switch (recommendation.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getPriorityClass()}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {getPriorityIcon()}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
          {course && (
            <p className="text-sm text-gray-700 mt-1">
              Course: {course.title}
            </p>
          )}
          <p className="mt-2 text-sm">{recommendation.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;