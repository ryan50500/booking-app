const ApplicationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            + Add Application
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Withdrawn'].map((status) => (
            <button
              key={status}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {status}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">No applications yet</p>
          <p className="text-gray-400 text-sm">Click "+ Add Application" to log your first job application</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
