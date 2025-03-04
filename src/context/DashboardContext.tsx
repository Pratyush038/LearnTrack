import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Course, 
  CalendarEvent, 
  AttendanceRecord, 
  StudyRecommendation, 
  WeeklyInsight 
} from '../types';
import api from '../api';
import { useAuth } from './AuthContext';

interface DashboardContextType {
  courses: Course[];
  events: CalendarEvent[];
  attendance: AttendanceRecord[];
  recommendations: StudyRecommendation[];
  insights: WeeklyInsight[];
  loading: boolean;
  error: string | null;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourseProgress: (courseId: string, completedSections: number) => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  removeEvent: (eventId: string) => Promise<void>;
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => Promise<void>;
  updateAttendanceRecord: (recordId: string, status: AttendanceRecord['status'], notes?: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [recommendations, setRecommendations] = useState<StudyRecommendation[]>([]);
  const [insights, setInsights] = useState<WeeklyInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Fetch all data on initial load and when authentication state changes
  useEffect(() => {
    const fetchData = async () => {
      // Only fetch data if user is authenticated
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const [
          coursesData,
          eventsData,
          attendanceData,
          recommendationsData,
          insightsData
        ] = await Promise.all([
          api.fetchCourses(),
          api.fetchEvents(),
          api.fetchAttendance(),
          api.fetchRecommendations(),
          api.fetchInsights()
        ]);

        setCourses(coursesData);
        setEvents(eventsData);
        setAttendance(attendanceData);
        setRecommendations(recommendationsData);
        setInsights(insightsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const addCourse = async (course: Omit<Course, 'id'>) => {
    try {
      const newCourse = await api.addCourse(course);
      setCourses([...courses, newCourse]);
    } catch (err) {
      console.error('Error adding course:', err);
      setError('Failed to add course. Please try again.');
    }
  };

  const updateCourseProgress = async (courseId: string, completedSections: number) => {
    try {
      const updatedCourse = await api.updateCourseProgress(courseId, completedSections);
      setCourses(
        courses.map((course) => {
          if (course.id === courseId) {
            return updatedCourse;
          }
          return course;
        })
      );
    } catch (err) {
      console.error('Error updating course progress:', err);
      setError('Failed to update course progress. Please try again.');
    }
  };

  const addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      const newEvent = await api.addEvent(event);
      setEvents([...events, newEvent]);
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to add event. Please try again.');
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      await api.removeEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      console.error('Error removing event:', err);
      setError('Failed to remove event. Please try again.');
    }
  };

  const addAttendanceRecord = async (record: Omit<AttendanceRecord, 'id'>) => {
    try {
      const newRecord = await api.addAttendanceRecord(record);
      setAttendance([...attendance, newRecord]);
    } catch (err) {
      console.error('Error adding attendance record:', err);
      setError('Failed to add attendance record. Please try again.');
    }
  };

  const updateAttendanceRecord = async (recordId: string, status: AttendanceRecord['status'], notes?: string) => {
    try {
      const updatedRecord = await api.updateAttendanceRecord(recordId, status, notes);
      setAttendance(
        attendance.map((record) => {
          if (record.id === recordId) {
            return updatedRecord;
          }
          return record;
        })
      );
    } catch (err) {
      console.error('Error updating attendance record:', err);
      setError('Failed to update attendance record. Please try again.');
    }
  };

  const value = {
    courses,
    events,
    attendance,
    recommendations,
    insights,
    loading,
    error,
    addCourse,
    updateCourseProgress,
    addEvent,
    removeEvent,
    addAttendanceRecord,
    updateAttendanceRecord,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};