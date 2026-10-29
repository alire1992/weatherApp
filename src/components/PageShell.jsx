function PageShell({ isDay = true, children }) {
  const background = isDay
    ? "bg-gradient-to-b from-cyan-300 to-sky-500"
    : "bg-gradient-to-b from-indigo-950 to-slate-900";

  return (
    <div className="min-h-dvh font-sans p-4 pb-24 md:p-8 md:pb-24 lg:pb-8">
      {/* Fixed background layer: always covers the full screen, whatever the content height */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 -z-10 transition-colors duration-500 ${background}`}
      />

      {children}
    </div>
  );
}

export default PageShell;
