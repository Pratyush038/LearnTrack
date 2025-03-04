import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Check, X, AlertCircle } from 'lucide-react';

const AttendanceTable: React.FC = () => {
  const { courses, attendance, addAttendanceRecord, updateAttendanceRecord } = useDashboard();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [status, setStatus] = useState<'present' | 'absent' | 'excused'>('present');
  const [notes, setNotes] = useState<string>('');

  const filteredAttendance = selectedCourse 
    ? attendance.filter(record => record.courseId === selectedCourse)
    : attendance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse || !date) {
      alert('Please select a course and date');
      return;
    }
    
    // Check if there's already a record for this course and date
    const existingRecord = attendance.find(
      record => record.courseId === selectedCourse && record.date === date
    );
    
    if (existingRecord) {
      updateAttendanceRecord(existingRecord.id, status, notes);
    } else {
      addAttendanceRecord({
        courseId: selectedCourse,
        date,
        status,
        notes,
      });
    }
    
    // Reset form
    setNotes('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Check size={18} className="text-green-500" />;
      case 'absent':
        return <X size={18} className="text-red-500" />;
      case 'excused':
        return <AlertCircle size={18} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Tracker</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            Course
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'present' | 'absent' | 'excused')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="excused">Excused</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <input
            type="text"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Optional notes"
          />
        </div>
        
        <div className="md:col-span-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Record Attendance
          </button>
        </div>
      </form>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => {
                const course = courses.find((c) => c.id === record.courseId);
                return (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course?.title || 'Unknown Course'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        {getStatusIcon(record.status)}
                        <span className="ml-2 capitalize">{record.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.notes || '-'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;