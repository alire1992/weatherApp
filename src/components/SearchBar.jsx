import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <form className="w-[90%] bg-blue-50 flex items-center justify-center gap-1.5  mx-auto px-0 py-1  rounded-3xl sm:w-[75%] md:w-[45%] xl:w-[33%]">
      <button
        className="bg-blue-100 p-2 rounded-full mx-0 cursor-pointer"
        type="submit"
      >
        <FaSearch className="text-xl text-blue-700 md:text-2xl" />
      </button>
      <input
        type="text"
        placeholder="Enter your city name..."
        name="cityName"
        className="w-[90%] border-none outline-none placeholder:text-blue-400 placeholder:font-semibold"
      />
    </form>
  );
}

export default SearchBar;
