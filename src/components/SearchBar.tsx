interface Props {
  search: string;
  setSearch: (v: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="flex-1 text-center">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="py-2.5 px-4 rounded-3xl w-100 text-sm bg-gray-100 focus:border-gray-800  focus:outline focus:outline-gray-800"
      />
    </div>
  );
};

export default SearchBar;
