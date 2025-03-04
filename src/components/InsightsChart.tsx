import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ChartData
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useDashboard } from '../context/DashboardContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InsightsChart: React.FC = () => {
  const { insights } = useDashboard();
  
  // Sort insights by date (oldest to newest)
  const sortedInsights = [...insights].sort((a, b) => 
    new Date(a.weekStarting).getTime() - new Date(b.weekStarting).getTime()
  );
  
  const labels = sortedInsights.map(insight => 
    new Date(insight.weekStarting).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  );
  
  const studyHoursData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Hours Studied',
        data: sortedInsights.map(insight => insight.hoursStudied),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const attendanceData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: sortedInsights.map(insight => insight.attendanceRate),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  };
  
  const progressData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Courses Progressed',
        data: sortedInsights.map(insight => insight.coursesProgressed),
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
      },
      {
        label: 'Upcoming Deadlines',
        data: sortedInsights.map(insight => insight.upcomingDeadlines),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Weekly Study Hours</h3>
        <Line 
          data={studyHoursData} 
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours'
                }
              }
            }
          }}
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Attendance Rate</h3>
        <Bar 
          data={attendanceData} 
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Percentage (%)'
                }
              }
            }
          }}
        />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
        <h3 className="text-lg font-medium mb-4">Course Progress & Deadlines</h3>
        <Bar 
          data={progressData} 
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default InsightsChart;