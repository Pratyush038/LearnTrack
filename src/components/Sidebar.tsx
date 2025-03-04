import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  BarChart, 
  Settings, 
  LogOut,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { path: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { path: '/attendance', icon: <ClipboardCheck size={20} />, label: 'Attendance' },
    { path: '/insights', icon: <BarChart size={20} />, label: 'Insights' },
    { path: '/recommendations', icon: <Lightbulb size={20} />, label: 'Recommendations' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white flex flex-col">
      <div className="p-5 border-b border-indigo-800">
        <h1 className="text-xl font-bold flex items-center">
          <BookOpen className="mr-2" /> LearnTrack
        </h1>
        <p className="text-xs text-indigo-300 mt-1">Personal Learning Dashboard</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center px-5 py-3 text-sm transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-indigo-800 text-white'
                    : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-5 border-t border-indigo-800">
        <button 
          onClick={handleLogout}
          className="flex items-center text-indigo-300 hover:text-white transition-colors duration-200"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;