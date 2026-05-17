function Header() {
  const firstLetter = "text-orange-500 text-6xl font-bold";
  return (
    <h1 className="text-5xl font-semibold font-serif tracking-widest text-center text-blue-500">
      <span className={firstLetter}>W</span>eather{" "}
      <span className={firstLetter}>A</span>pp
    </h1>
  );
}

export default Header;
