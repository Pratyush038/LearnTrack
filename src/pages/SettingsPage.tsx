import React, { useState } from 'react';
import { Bell, Calendar, Clock, User, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('1');
  const [calendarSync, setCalendarSync] = useState('google');
  const [timeFormat, setTimeFormat] = useState('12');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save settings to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Customize your learning dashboard experience</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button className="px-6 py-4 text-indigo-600 border-b-2 border-indigo-600 font-medium">
              General
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Account
            </button>
            <button className="px-6 py-4 text-gray-500 hover:text-gray-700 font-medium">
              Privacy
            </button>
          </nav>
        </div>
        
        <form onSubmit={handleSaveSettings} className="p-6">
          {/* Notifications Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            </div>
            
            <div className="space-y-4 ml-8">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notifications" className="text-gray-700">
                  Email Notifications
                </label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    className="absolute w-0 h-0 opacity-0"
                  />
                  <label
                    htmlFor="email-notifications"
                    className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ${
                      emailNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        emailNotifications ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="push-notifications" className="text-gray-700">
                  Push Notifications
                </label>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    type="checkbox"
                    id="push-notifications"
                    checked={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                    className="absolute w-0 h-0 opacity-0"
                  />
                  <label
                    htmlFor="push-notifications"
                    className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ${
                      pushNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        pushNotifications ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="reminder-time" className="block text-gray-700 mb-1">
                  Event Reminders
                </label>
                <select
                  id="reminder-time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="0">No reminders </option>
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="120">2 hours before</option>
                  <option value="1440">1 day before</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Calendar Integration */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Calendar Integration</h2>
            </div>
            
            <div className="space-y-4 ml-8">
              <div>
                <label htmlFor="calendar-sync" className="block text-gray-700 mb-1">
                  Sync with
                </label>
                <select
                  id="calendar-sync"
                  value={calendarSync}
                  onChange={(e) => setCalendarSync(e.target.value)}
                  className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="google">Google Calendar</option>
                  <option value="outlook">Outlook Calendar</option>
                  <option value="apple">Apple Calendar</option>
                  <option value="none">None</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
                >
                  Connect Calendar
                </button>
              </div>
            </div>
          </div>
          
          {/* Display Preferences */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Clock className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Display Preferences</h2>
            </div>
            
            <div className="space-y-4 ml-8">
              <div>
                <label htmlFor="time-format" className="block text-gray-700 mb-1">
                  Time Format
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="timeFormat"
                      value="12"
                      checked={timeFormat === '12'}
                      onChange={() => setTimeFormat('12')}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">12-hour (1:30 PM)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="timeFormat"
                      value="24"
                      checked={timeFormat === '24'}
                      onChange={() => setTimeFormat('24')}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">24-hour (13:30)</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="date-format" className="block text-gray-700 mb-1">
                  Date Format
                </label>
                <select
                  id="date-format"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Account Information */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <User className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
            </div>
            
            <div className="space-y-4 ml-8">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value="john.doe@example.com"
                  readOnly
                  className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                />
              </div>
              
              <div>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          
          {/* Privacy */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="text-indigo-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Privacy</h2>
            </div>
            
            <div className="space-y-4 ml-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="data-collection"
                  checked={true}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="data-collection" className="ml-2 block text-gray-700">
                  Allow anonymous usage data collection to improve the service
                </label>
              </div>
              
              <div>
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Export My Data
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;