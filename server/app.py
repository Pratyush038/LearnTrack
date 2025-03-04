from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, User, Course, Event, Attendance, Recommendation, Insight
import os
from dotenv import load_dotenv
from functools import wraps
import secrets

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', secrets.token_hex(16))
CORS(app, supports_credentials=True)

# Initialize the database
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Authentication decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

# Auth routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already taken"}), 400
    
    # Create new user
    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Auto login after registration
    session['user_id'] = user.id
    
    return jsonify(user.to_dict()), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    # Check if user exists and password is correct
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Set session
    session['user_id'] = user.id
    
    return jsonify(user.to_dict())

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"})

@app.route('/api/auth/user', methods=['GET'])
@login_required
def get_current_user():
    user = User.query.get(session['user_id'])
    if not user:
        session.pop('user_id', None)
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user.to_dict())

# Routes for Courses
@app.route('/api/courses', methods=['GET'])
@login_required
def get_courses():
    user_id = session.get('user_id')
    courses = Course.query.filter_by(user_id=user_id).all()
    return jsonify([course.to_dict() for course in courses])

@app.route('/api/courses', methods=['POST'])
@login_required
def add_course():
    data = request.json
    user_id = session.get('user_id')
    
    course = Course(
        title=data['title'],
        platform=data['platform'],
        url=data['url'],
        progress=data['progress'],
        total_sections=data['totalSections'],
        completed_sections=data['completedSections'],
        start_date=data['startDate'],
        end_date=data['endDate'],
        image_url=data['imageUrl'],
        user_id=user_id
    )
    db.session.add(course)
    db.session.commit()
    return jsonify(course.to_dict()), 201

@app.route('/api/courses/<int:course_id>', methods=['PUT'])
@login_required
def update_course(course_id):
    course = Course.query.get_or_404(course_id)
    
    # Check if the course belongs to the logged-in user
    if course.user_id != session.get('user_id'):
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.json
    
    if 'completedSections' in data:
        course.completed_sections = data['completedSections']
        course.progress = round((course.completed_sections / course.total_sections) * 100)
    
    db.session.commit()
    return jsonify(course.to_dict())

# Routes for Events
@app.route('/api/events', methods=['GET'])
@login_required
def get_events():
    user_id = session.get('user_id')
    # Get courses for this user
    user_courses = Course.query.filter_by(user_id=user_id).all()
    course_ids = [course.id for course in user_courses]
    
    # Get events for these courses
    events = Event.query.filter(Event.course_id.in_(course_ids)).all()
    return jsonify([event.to_dict() for event in events])

@app.route('/api/events', methods=['POST'])
@login_required
def add_event():
    data = request.json
    
    # Verify the course belongs to the user
    course = Course.query.get_or_404(data['courseId'])
    if course.user_id != session.get('user_id'):
        return jsonify({"error": "Unauthorized"}), 403
    
    event = Event(
        title=data['title'],
        date=data['date'],
        time=data['time'],
        type=data['type'],
        course_id=data['courseId'],
        description=data.get('description', '')
    )
    db.session.add(event)
    db.session.commit()
    return jsonify(event.to_dict()), 201

@app.route('/api/events/<int:event_id>', methods=['DELETE'])
@login_required
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    
    # Verify the event's course belongs to the user
    course = Course.query.get_or_404(event.course_id)
    if course.user_id != session.get('user_id'):
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(event)
    db.session.commit()
    return '', 204

# Routes for Attendance
@app.route('/api/attendance', methods=['GET'])
@login_required
def get_attendance():
    user_id = session.get('user_id')
    # Get courses for this user
    user_courses = Course.query.filter_by(user_id=user_id).all()
    course_ids = [course.id for course in user_courses]
    
    # Get attendance records for these courses
    attendance_records = Attendance.query.filter(Attendance.course_id.in_(course_ids)).all()
    return jsonify([record.to_dict() for record in attendance_records])

@app.route('/api/attendance', methods=['POST'])
@login_required
def add_attendance():
    data = request.json
    
    # Verify the course belongs to the user
    course = Course.query.get_or_404(data['courseId'])
    if course.user_id != session.get('user_id'):
        return jsonify({"error": "Unauthorized"}), 403
    
    attendance = Attendance(
        course_id=data['courseId'],
        date=data['date'],
        status=data['status'],
        notes=data.get('notes', '')
    )
    db.session.add(attendance)
    db.session.commit()
    return jsonify(attendance.to_dict()), 201

@app.route('/api/attendance/<int:record_id>', methods=['PUT'])
@login_required
def update_attendance(record_id):
    record = Attendance.query.get_or_404(record_id)
    
    # Verify the attendance record's course belongs to the user
    course = Course.query.get_or_404(record.course_id)
    if course.user_id != session.get('user_id'):
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.json
    
    if 'status' in data:
        record.status = data['status']
    if 'notes' in data:
        record.notes = data['notes']
    
    db.session.commit()
    return jsonify(record.to_dict())

# Routes for Recommendations
@app.route('/api/recommendations', methods=['GET'])
@login_required
def get_recommendations():
    user_id = session.get('user_id')
    # Get courses for this user
    user_courses = Course.query.filter_by(user_id=user_id).all()
    course_ids = [course.id for course in user_courses]
    
    # Get recommendations for these courses
    recommendations = Recommendation.query.filter(Recommendation.course_id.in_(course_ids)).all()
    return jsonify([rec.to_dict() for rec in recommendations])

# Routes for Insights
@app.route('/api/insights', methods=['GET'])
@login_required
def get_insights():
    # For now, return all insights (in a real app, these would be user-specific)
    insights = Insight.query.all()
    return jsonify([insight.to_dict() for insight in insights])

if __name__ == '__main__':
    app.run(debug=True)