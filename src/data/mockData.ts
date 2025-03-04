import { Course, CalendarEvent, AttendanceRecord, StudyRecommendation, WeeklyInsight } from '../types';
import { addDays, format } from 'date-fns';

// Helper to generate dates relative to today
const getRelativeDate = (daysFromNow: number): string => {
  return format(addDays(new Date(), daysFromNow), 'yyyy-MM-dd');
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React - The Complete Guide',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/react-the-complete-guide/',
    progress: 65,
    totalSections: 20,
    completedSections: 13,
    startDate: getRelativeDate(-30),
    endDate: getRelativeDate(60),
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning',
    progress: 40,
    totalSections: 15,
    completedSections: 6,
    startDate: getRelativeDate(-45),
    endDate: getRelativeDate(90),
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'CS50: Introduction to Computer Science',
    platform: 'edX',
    url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
    progress: 80,
    totalSections: 10,
    completedSections: 8,
    startDate: getRelativeDate(-60),
    endDate: getRelativeDate(15),
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Full Stack Web Development',
    platform: 'Udacity',
    url: 'https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044',
    progress: 25,
    totalSections: 12,
    completedSections: 3,
    startDate: getRelativeDate(-15),
    endDate: getRelativeDate(120),
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'React Final Project Due',
    date: getRelativeDate(7),
    time: '23:59',
    type: 'deadline',
    courseId: '1',
    description: 'Submit the final project for React course',
  },
  {
    id: '2',
    title: 'Machine Learning Quiz',
    date: getRelativeDate(3),
    time: '14:00',
    type: 'exam',
    courseId: '2',
    description: 'Online quiz covering neural networks',
  },
  {
    id: '3',
    title: 'CS50 Lecture',
    date: getRelativeDate(1),
    time: '10:00',
    type: 'lecture',
    courseId: '3',
    description: 'Live lecture on algorithms',
  },
  {
    id: '4',
    title: 'Web Dev Assignment',
    date: getRelativeDate(5),
    time: '23:59',
    type: 'assignment',
    courseId: '4',
    description: 'Database integration assignment',
  },
  {
    id: '5',
    title: 'CS50 Final Exam',
    date: getRelativeDate(14),
    time: '15:00',
    type: 'exam',
    courseId: '3',
    description: 'Comprehensive final exam',
  },
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    courseId: '1',
    date: getRelativeDate(-7),
    status: 'present',
    notes: 'Covered React hooks in detail',
  },
  {
    id: '2',
    courseId: '1',
    date: getRelativeDate(-5),
    status: 'present',
    notes: 'Project workshop session',
  },
  {
    id: '3',
    courseId: '2',
    date: getRelativeDate(-6),
    status: 'absent',
    notes: 'Missed due to doctor appointment',
  },
  {
    id: '4',
    courseId: '3',
    date: getRelativeDate(-4),
    status: 'present',
    notes: 'Data structures lecture',
  },
  {
    id: '5',
    courseId: '3',
    date: getRelativeDate(-2),
    status: 'excused',
    notes: 'Excused absence - family emergency',
  },
  {
    id: '6',
    courseId: '4',
    date: getRelativeDate(-3),
    status: 'present',
    notes: 'Frontend frameworks overview',
  },
];

export const mockRecommendations: StudyRecommendation[] = [
  {
    id: '1',
    courseId: '2',
    title: 'Focus on Machine Learning',
    description: 'You\'re falling behind on the ML course. Consider dedicating more time to catch up before the upcoming quiz.',
    priority: 'high',
  },
  {
    id: '2',
    courseId: '1',
    title: 'Complete React Project',
    description: 'Your React project deadline is approaching. Make sure to allocate sufficient time for testing and refinement.',
    priority: 'medium',
  },
  {
    id: '3',
    courseId: '3',
    title: 'Prepare for CS50 Final',
    description: 'The CS50 final exam is in two weeks. Start reviewing previous materials and practice exercises.',
    priority: 'high',
  },
  {
    id: '4',
    courseId: '4',
    title: 'Explore Additional Web Dev Resources',
    description: 'Consider checking out supplementary materials on database design to strengthen your understanding.',
    priority: 'low',
  },
];

export const mockInsights: WeeklyInsight[] = [
  {
    weekStarting: getRelativeDate(-7),
    hoursStudied: 18,
    coursesProgressed: 3,
    attendanceRate: 85,
    upcomingDeadlines: 2,
  },
  {
    weekStarting: getRelativeDate(-14),
    hoursStudied: 15,
    coursesProgressed: 2,
    attendanceRate: 75,
    upcomingDeadlines: 1,
  },
  {
    weekStarting: getRelativeDate(-21),
    hoursStudied: 20,
    coursesProgressed: 4,
    attendanceRate: 90,
    upcomingDeadlines: 3,
  },
  {
    weekStarting: getRelativeDate(-28),
    hoursStudied: 12,
    coursesProgressed: 2,
    attendanceRate: 80,
    upcomingDeadlines: 2,
  },
];