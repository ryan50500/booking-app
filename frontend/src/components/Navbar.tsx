import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                JobTrack
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/applications"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Applications
            </Link>
            <Link
              to="/prep-notes"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Interview Prep
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
