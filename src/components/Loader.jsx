import { FaSpinner } from "react-icons/fa";

function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-8">
      <FaSpinner className="text-5xl text-blue-400 animate-spin mb-4" />
      <p className="text-blue-100 font-semibold text-lg animate-pulse">
        {message}
      </p>
    </div>
  );
}

export default Loader;
