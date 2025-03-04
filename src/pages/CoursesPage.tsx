import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import CourseCard from '../components/CourseCard';
import AddCourseForm from '../components/AddCourseForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Plus, Search } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const { courses, loading, error } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === '' || course.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });
  
  // Get unique platforms
  const platforms = Array.from(new Set(courses.map(course => course.platform)));

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-600">Manage and track all your enrolled courses</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 md:mt-0 flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Course
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="md:w-48">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Platforms</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No courses found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterPlatform('');
            }}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {showAddForm && <AddCourseForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default CoursesPage;