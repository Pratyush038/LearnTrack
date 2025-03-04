import React from 'react';
import AttendanceTable from '../components/AttendanceTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useDashboard } from '../context/DashboardContext';

const AttendancePage: React.FC = () => {
  const { loading, error } = useDashboard();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Tracker</h1>
        <p className="text-gray-600">Record and monitor your attendance for all courses</p>
      </div>
      
      <AttendanceTable />
    </div>
  );
};

export default AttendancePage;