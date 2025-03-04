export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  url: string;
  progress: number;
  totalSections: number;
  completedSections: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  userId?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'deadline' | 'lecture' | 'exam' | 'assignment';
  courseId: string;
  description?: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'excused';
  notes?: string;
}

export interface StudyRecommendation {
  id: string;
  courseId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface WeeklyInsight {
  weekStarting: string;
  hoursStudied: number;
  coursesProgressed: number;
  attendanceRate: number;
  upcomingDeadlines: number;
}