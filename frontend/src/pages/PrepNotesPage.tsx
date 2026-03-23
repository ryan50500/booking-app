const PrepNotesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Interview Prep</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            + Add Note
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['All', 'Behavioural', 'React', 'TypeScript', 'System Design', 'General'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-2">No prep notes yet</p>
          <p className="text-gray-400 text-sm">Click "+ Add Note" to start building your Q&amp;A library</p>
        </div>
      </div>
    </div>
  );
};

export default PrepNotesPage;
