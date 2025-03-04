from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    platform = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    progress = db.Column(db.Integer, default=0)
    total_sections = db.Column(db.Integer, nullable=False)
    completed_sections = db.Column(db.Integer, default=0)
    start_date = db.Column(db.String(50), nullable=False)
    end_date = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    
    events = db.relationship('Event', backref='course', lazy=True, cascade="all, delete-orphan")
    attendance_records = db.relationship('Attendance', backref='course', lazy=True, cascade="all, delete-orphan")
    recommendations = db.relationship('Recommendation', backref='course', lazy=True, cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'platform': self.platform,
            'url': self.url,
            'progress': self.progress,
            'totalSections': self.total_sections,
            'completedSections': self.completed_sections,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'imageUrl': self.image_url,
            'userId': self.user_id
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'date': self.date,
            'time': self.time,
            'type': self.type,
            'courseId': str(self.course_id),
            'description': self.description
        }

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'courseId': str(self.course_id),
            'date': self.date,
            'status': self.status,
            'notes': self.notes
        }

class Recommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    priority = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': str(self.id),
            'courseId': str(self.course_id),
            'title': self.title,
            'description': self.description,
            'priority': self.priority
        }

class Insight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    week_starting = db.Column(db.String(50), nullable=False)
    hours_studied = db.Column(db.Integer, nullable=False)
    courses_progressed = db.Column(db.Integer, nullable=False)
    attendance_rate = db.Column(db.Integer, nullable=False)
    upcoming_deadlines = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'weekStarting': self.week_starting,
            'hoursStudied': self.hours_studied,
            'coursesProgressed': self.courses_progressed,
            'attendanceRate': self.attendance_rate,
            'upcomingDeadlines': self.upcoming_deadlines
        }