from app import app, db
from models import Course, Event, Attendance, Recommendation, Insight
from datetime import datetime, timedelta
import json

def format_date(days_from_now):
    date = datetime.now() + timedelta(days=days_from_now)
    return date.strftime('%Y-%m-%d')

def seed_database():
    with app.app_context():
        # Clear existing data
        db.session.query(Insight).delete()
        db.session.query(Recommendation).delete()
        db.session.query(Attendance).delete()
        db.session.query(Event).delete()
        db.session.query(Course).delete()
        db.session.commit()
        
        '''# Seed courses
        courses = [
            Course(
                title='React - The Complete Guide',
                platform='Udemy',
                url='https://www.udemy.com/course/react-the-complete-guide/',
                progress=65,
                total_sections=20,
                completed_sections=13,
                start_date=format_date(-30),
                end_date=format_date(60),
                image_url='https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            ),
            Course(
                title='Machine Learning Specialization',
                platform='Coursera',
                url='https://www.coursera.org/specializations/machine-learning',
                progress=40,
                total_sections=15,
                completed_sections=6,
                start_date=format_date(-45),
                end_date=format_date(90),
                image_url='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            ),
            Course(
                title='CS50: Introduction to Computer Science',
                platform='edX',
                url='https://www.edx.org/course/cs50s-introduction-to-computer-science',
                progress=80,
                total_sections=10,
                completed_sections=8,
                start_date=format_date(-60),
                end_date=format_date(15),
                image_url='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            ),
            Course(
                title='Full Stack Web Development',
                platform='Udacity',
                url='https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044',
                progress=25,
                total_sections=12,
                completed_sections=3,
                start_date=format_date(-15),
                end_date=format_date(120),
                image_url='https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            ),
        ]
        
        db.session.add_all(courses)
        db.session.commit()
        
        # Seed events
        events = [
            Event(
                title='React Final Project Due',
                date=format_date(7),
                time='23:59',
                type='deadline',
                course_id=1,
                description='Submit the final project for React course',
            ),
            Event(
                title='Machine Learning Quiz',
                date=format_date(3),
                time='14:00',
                type='exam',
                course_id=2,
                description='Online quiz covering neural networks',
            ),
            Event(
                title='CS50 Lecture',
                date=format_date(1),
                time='10:00',
                type='lecture',
                course_id=3,
                description='Live lecture on algorithms',
            ),
            Event(
                title='Web Dev Assignment',
                date=format_date(5),
                time='23:59',
                type='assignment',
                course_id=4,
                description='Database integration assignment',
            ),
            Event(
                title='CS50 Final Exam',
                date=format_date(14),
                time='15:00',
                type='exam',
                course_id=3,
                description='Comprehensive final exam',
            ),
        ]
        
        db.session.add_all(events)
        db.session.commit()
        
        # Seed attendance records
        attendance_records = [
            Attendance(
                course_id=1,
                date=format_date(-7),
                status='present',
                notes='Covered React hooks in detail',
            ),
            Attendance(
                course_id=1,
                date=format_date(-5),
                status='present',
                notes='Project workshop session',
            ),
            Attendance(
                course_id=2,
                date=format_date(-6),
                status='absent',
                notes='Missed due to doctor appointment',
            ),
            Attendance(
                course_id=3,
                date=format_date(-4),
                status='present',
                notes='Data structures lecture',
            ),
            Attendance(
                course_id=3,
                date=format_date(-2),
                status='excused',
                notes='Excused absence - family emergency',
            ),
            Attendance(
                course_id=4,
                date=format_date(-3),
                status='present',
                notes='Frontend frameworks overview',
            ),
        ]
        
        db.session.add_all(attendance_records)
        db.session.commit()
        
        # Seed recommendations
        recommendations = [
            Recommendation(
                course_id=2,
                title='Focus on Machine Learning',
                description='You\'re falling behind on the ML course. Consider dedicating more time to catch up before the upcoming quiz.',
                priority='high',
            ),
            Recommendation(
                course_id=1,
                title='Complete React Project',
                description='Your React project deadline is approaching. Make sure to allocate sufficient time for testing and refinement.',
                priority='medium',
            ),
            Recommendation(
                course_id=3,
                title='Prepare for CS50 Final',
                description='The CS50 final exam is in two weeks. Start reviewing previous materials and practice exercises.',
                priority='high',
            ),
            Recommendation(
                course_id=4,
                title='Explore Additional Web Dev Resources',
                description='Consider checking out supplementary materials on database design to strengthen your understanding.',
                priority='low',
            ),
        ]
        
        db.session.add_all(recommendations)
        db.session.commit()
        '''
        # Seed insights
        insights = [
            Insight(
                week_starting=format_date(-7),
                hours_studied=18,
                courses_progressed=3,
                attendance_rate=85,
                upcoming_deadlines=2,
            ),
            Insight(
                week_starting=format_date(-14),
                hours_studied=15,
                courses_progressed=2,
                attendance_rate=75,
                upcoming_deadlines=1,
            ),
            Insight(
                week_starting=format_date(-21),
                hours_studied=20,
                courses_progressed=4,
                attendance_rate=90,
                upcoming_deadlines=3,
            ),
            Insight(
                week_starting=format_date(-28),
                hours_studied=12,
                courses_progressed=2,
                attendance_rate=80,
                upcoming_deadlines=2,
            ),
        ]
        
        db.session.add_all(insights)
        db.session.commit()
        
        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_database()