import PropTypes from 'prop-types';

const Filter = ({ query, setQuery }) => {
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
  <div className="flex flex-col items-center mt-6">
  <div className="flex items-center gap-3 w-full max-w-md px-4">
    <label
      htmlFor="search"
      className="text-yellow-400 font-bold text-lg sm:text-base"
    >
      Search:
    </label>
    <input
      id="search"
      value={query}
      onChange={handleSearch}
      className="flex-1 bg-stone-200 text-gray-800 rounded-lg px-4 py-2 shadow-sm border focus:outline-none focus:ring-2 focus:ring-yellow-400"
      placeholder="Search contacts..."
    />
  </div>
</div>

  );
};

Filter.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Filter;
