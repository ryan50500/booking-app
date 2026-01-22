import { useState } from 'react';

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock data
  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      date: 'Dec 25, 2024',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      date: 'Dec 28, 2024',
      time: '2:30 PM',
      status: 'pending',
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Davis',
      specialization: 'Pediatrics',
      date: 'Dec 30, 2024',
      time: '11:00 AM',
      status: 'confirmed',
    },
  ];

  const pastAppointments = [
    {
      id: '4',
      doctorName: 'Dr. Robert Wilson',
      specialization: 'Orthopedics',
      date: 'Dec 10, 2024',
      time: '3:00 PM',
      status: 'completed',
    },
    {
      id: '5',
      doctorName: 'Dr. Jennifer Martinez',
      specialization: 'Neurology',
      date: 'Dec 5, 2024',
      time: '9:30 AM',
      status: 'completed',
    },
  ];

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Past Appointments
              </button>
            </div>
          </div>

          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 text-lg">No appointments found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-gray-600">{appointment.specialization}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {appointment.time}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col sm:flex-row gap-2">
                        {activeTab === 'upcoming' && (
                          <>
                            <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                              Reschedule
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                              Cancel
                            </button>
                          </>
                        )}
                        {activeTab === 'past' && (
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
