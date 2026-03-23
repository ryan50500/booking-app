import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-800',
  screening: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Link
            to="/applications"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            + Add Application
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-sm">Total Applied</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-yellow-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-purple-600 text-sm">Interviews</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-green-600 text-sm">Offers</p>
            <p className="text-3xl font-bold text-gray-800 mt-1">0</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/applications" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Applications</h2>
            <p className="text-gray-600">Track every application, status, and recruiter contact</p>
          </Link>
          <Link to="/prep-notes" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Interview Prep</h2>
            <p className="text-gray-600">Your personal Q&amp;A library — search before any interview</p>
          </Link>
        </div>

        {/* Recent Applications placeholder */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
          </div>
          <div className="p-6 text-center text-gray-500">
            <p>No applications yet.</p>
            <Link to="/applications" className="text-indigo-600 hover:underline mt-2 inline-block">
              Add your first application →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
