import PropTypes from 'prop-types';

const Filter = ({ query, setQuery }) => {
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex flex-row items-center font-semibold">
      <label
        htmlFor="search"
        className="text-yellow-400 font-bold ml-28 text-lg"
      >
        Search:
      </label>
      <input
        id="search"
        value={query}
        onChange={handleSearch}
        className="bg-stone-200 rounded-md px-3 py-2 m-4 w-3/4 items-center"
      />
    </div>
  );
};

Filter.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Filter;
