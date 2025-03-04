import React from 'react';
import InsightsChart from '../components/InsightsChart';
import { useDashboard } from '../context/DashboardContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Clock, BookOpen, CheckCircle, Calendar } from 'lucide-react';

const InsightsPage: React.FC = () => {
  const { insights, courses, attendance, loading, error } = useDashboard();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  // Get latest insight
  const latestInsight = [...insights].sort((a, b) => 
    new Date(b.weekStarting).getTime() - new Date(a.weekStarting).getTime()
  )[0];
  
  // Calculate overall attendance rate
  const totalAttendance = attendance.length;
  const presentAttendance = attendance.filter(record => record.status === 'present').length;
  const attendanceRate = totalAttendance > 0 
    ? Math.round((presentAttendance / totalAttendance) * 100) 
    : 0;
  
  // Calculate course completion estimates
  const courseEstimates = courses.map(course => {
    const completedPercentage = course.progress;
    const remainingPercentage = 100 - completedPercentage;
    
    // Estimate days to completion based on current progress rate
    const startDate = new Date(course.startDate);
    const today = new Date();
    const daysSinceStart = Math.max(1, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    const progressPerDay = completedPercentage / daysSinceStart;
    const estimatedDaysToCompletion = progressPerDay > 0 
      ? Math.ceil(remainingPercentage / progressPerDay)
      : 999;
    
    const estimatedCompletionDate = new Date();
    estimatedCompletionDate.setDate(today.getDate() + estimatedDaysToCompletion);
    
    return {
      courseId: course.id,
      title: course.title,
      progress: completedPercentage,
      estimatedDaysToCompletion: estimatedDaysToCompletion < 999 ? estimatedDaysToCompletion : null,
      estimatedCompletionDate: estimatedDaysToCompletion < 999 ? estimatedCompletionDate : null,
    };
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Learning Insights</h1>
        <p className="text-gray-600">Analytics and insights to optimize your learning journey</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Study Time</h3>
            <Clock className="text-indigo-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{latestInsight?.hoursStudied || 0}h</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Courses Progressed</h3>
            <BookOpen className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{latestInsight?.coursesProgressed || 0}</p>
          <p className="text-sm text-gray-500 mt-1">This week</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Attendance Rate</h3>
            <CheckCircle className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{attendanceRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Overall</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Upcoming Deadlines</h3>
            <Calendar className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-800">{latestInsight?.upcomingDeadlines || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Next 7 days</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Learning Trends</h2>
        <InsightsChart />
      </div>
      
      {/* Course Completion Estimates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Completion Estimates</h2>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Days to Completion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Completion Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseEstimates.map((estimate) => (
                <tr key={estimate.courseId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {estimate.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-[100px]">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${estimate.progress}%` }}
                        ></div>
                      </div>
                      <span>{estimate.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {estimate.estimatedDaysToCompletion !== null 
                      ? `${estimate.estimatedDaysToCompletion} days` 
                      : 'Insufficient data'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {estimate.estimatedCompletionDate !== null 
                      ? estimate.estimatedCompletionDate.toLocaleDateString() 
                      : 'Insufficient data'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;