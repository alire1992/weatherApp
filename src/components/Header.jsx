import { FaCloudSun } from "react-icons/fa";

function Header() {
  const headerClassConfig = {
    firstLetter: "text-5xl text-orange-500 sm:text-6xl font-bold",
    icon: "text-4xl sm:text-5xl text-orange-500",
    title:
      "text-4xl sm:text-5xl font-semibold font-serif tracking-widest text-center text-blue-500",
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <FaCloudSun className={headerClassConfig.icon} />
      <h1 className={headerClassConfig.title}>
        <span className={headerClassConfig.firstLetter}>W</span>eather{" "}
        <span className={headerClassConfig.firstLetter}>A</span>pp
      </h1>
    </div>
  );
}

export default Header;
