import axios from 'axios';
import { Course, CalendarEvent, AttendanceRecord, StudyRecommendation, WeeklyInsight } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session cookies
});

// Auth API
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/user');
  return response.data;
};

// Courses API
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  return response.data;
};

export const addCourse = async (course: Omit<Course, 'id'>): Promise<Course> => {
  const response = await api.post('/courses', course);
  return response.data;
};

export const updateCourseProgress = async (courseId: string, completedSections: number): Promise<Course> => {
  const response = await api.put(`/courses/${courseId}`, { completedSections });
  return response.data;
};

// Events API
export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
  const response = await api.post('/events', event);
  return response.data;
};

export const removeEvent = async (eventId: string): Promise<void> => {
  await api.delete(`/events/${eventId}`);
};

// Attendance API
export const fetchAttendance = async (): Promise<AttendanceRecord[]> => {
  const response = await api.get('/attendance');
  return response.data;
};

export const addAttendanceRecord = async (record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> => {
  const response = await api.post('/attendance', record);
  return response.data;
};

export const updateAttendanceRecord = async (
  recordId: string, 
  status: AttendanceRecord['status'], 
  notes?: string
): Promise<AttendanceRecord> => {
  const response = await api.put(`/attendance/${recordId}`, { status, notes });
  return response.data;
};

// Recommendations API
export const fetchRecommendations = async (): Promise<StudyRecommendation[]> => {
  const response = await api.get('/recommendations');
  return response.data;
};

// Insights API
export const fetchInsights = async (): Promise<WeeklyInsight[]> => {
  const response = await api.get('/insights');
  return response.data;
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  fetchCourses,
  addCourse,
  updateCourseProgress,
  fetchEvents,
  addEvent,
  removeEvent,
  fetchAttendance,
  addAttendanceRecord,
  updateAttendanceRecord,
  fetchRecommendations,
  fetchInsights,
};