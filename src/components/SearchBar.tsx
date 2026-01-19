interface Props {
  search: string;
  setSearch: (v: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="py-2.5 px-4 rounded-3xl w-100 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gray-800 dark:focus:border-gray-300 focus:outline focus:outline-gray-800 dark:focus:outline-gray-300"
      />
    </div>
  );
};

export default SearchBar;
