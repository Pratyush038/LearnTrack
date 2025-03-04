import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import CourseCard from '../components/CourseCard';
import EventCard from '../components/EventCard';
import RecommendationCard from '../components/RecommendationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { BookOpen, Calendar, Lightbulb, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { courses, events, recommendations, insights, loading, error } = useDashboard();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  // Get upcoming events (next 7 days)
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Get high priority recommendations
  const highPriorityRecommendations = recommendations
    .filter(rec => rec.priority === 'high')
    .slice(0, 2);
  
  // Get latest insight
  const latestInsight = [...insights].sort((a, b) => 
    new Date(b.weekStarting).getTime() - new Date(a.weekStarting).getTime()
  )[0];
  
  // Calculate overall progress
  const totalCompletedSections = courses.reduce((sum, course) => sum + course.completedSections, 0);
  const totalSections = courses.reduce((sum, course) => sum + course.totalSections, 0);
  const overallProgress = totalSections > 0 ? Math.round((totalCompletedSections / totalSections) * 100) : 0;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Learning Dashboard</h1>
        <p className="text-gray-600">Track your progress, manage your schedule, and stay on top of your learning journey.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Courses</h3>
            <BookOpen className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{courses.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active courses</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Overall Progress</h3>
            <BarChart className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{overallProgress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Upcoming Events</h3>
            <Calendar className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{upcomingEvents.length}</p>
          <p className="text-sm text-gray-500 mt-1">In the next 7 days</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Study Time</h3>
            <Lightbulb className="text-yellow-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{latestInsight?.hoursStudied || 0}h</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Courses</h2>
            <Link to="/courses" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Upcoming Events */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
              <Link to="/calendar" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No upcoming events in the next 7 days.</p>
              )}
            </div>
          </div>
          
          {/* Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Study Recommendations</h2>
              <Link to="/recommendations" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {highPriorityRecommendations.length > 0 ? (
                highPriorityRecommendations.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No high priority recommendations at this time.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;