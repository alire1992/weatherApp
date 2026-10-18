function PageShell({ isDay = true, children }) {
  // Shared page frame: background + header + navbar.
  // Pages pass `isDay` to switch the gradient (defaults to day).

  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    <div
      className={`min-h-screen ${background} font-sans p-4 md:p-8 transition-colors duration-500`}
    >
      {children}
    </div>
  );
}

export default PageShell;
