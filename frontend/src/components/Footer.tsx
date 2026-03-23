const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold">JobTrack</h3>
            <p className="text-gray-400 mt-1 text-sm">
              Your personal job search and interview prep tool.
            </p>
          </div>
          <div className="text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} JobTrack. Personal use only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
