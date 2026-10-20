// Page frame: background gradient only. Header, navbar and search bar live in AppLayout.
// `isDay` switches the gradient (defaults to day).
function PageShell({ isDay = true, children }) {
  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    // extra bottom padding on small screens so the bottom navbar never covers content
    <div
      className={`min-h-screen ${background} font-sans p-4 pb-24 md:p-8 md:pb-24 lg:pb-8 transition-colors duration-500`}
    >
      {children}
    </div>
  );
}

export default PageShell;
