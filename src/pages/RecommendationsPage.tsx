import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import RecommendationCard from '../components/RecommendationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const RecommendationsPage: React.FC = () => {
  const { recommendations, loading, error } = useDashboard();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  const highPriorityRecommendations = recommendations.filter(rec => rec.priority === 'high');
  const mediumPriorityRecommendations = recommendations.filter(rec => rec.priority === 'medium');
  const lowPriorityRecommendations = recommendations.filter(rec => rec.priority === 'low');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Study Recommendations</h1>
        <p className="text-gray-600">AI-driven suggestions to optimize your learning journey</p>
      </div>
      
      {highPriorityRecommendations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">High Priority</h2>
          </div>
          
          <div className="space-y-4">
            {highPriorityRecommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      )}
      
      {mediumPriorityRecommendations.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-yellow-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Medium Priority</h2>
          </div>
          
          <div className="space-y-4">
            {mediumPriorityRecommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      )}
      
      {lowPriorityRecommendations.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <Info className="text-blue-500 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Suggestions</h2>
          </div>
          
          <div className="space-y-4">
            {lowPriorityRecommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </div>
      )}
      
      {recommendations.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No recommendations available at this time.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;