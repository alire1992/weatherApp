import { NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaMapMarkedAlt } from "react-icons/fa";

const links = [
  { to: "/", label: "Home", icon: FaHome, end: true },
  { to: "/favorites", label: "Favorites", icon: FaHeart },
  { to: "/map", label: "Map", icon: FaMapMarkedAlt },
];

// Colors follow the app palette: blue-50/100/500/700 (search bar, title)
// and orange-500 (focus outline, same as Button). Full class strings so
// Tailwind can detect them.
const theme = {
  day: {
    bar: "bg-blue-50/90 border-blue-100",
    link: "text-blue-700 hover:bg-blue-100",
    active: "bg-blue-500 text-white",
  },
  night: {
    bar: "bg-slate-900/80 border-slate-700",
    link: "text-blue-200 hover:bg-slate-700",
    active: "bg-blue-500 text-white",
  },
};
function Navbar({ isDay }) {
  // Mobile: fixed bottom tab bar. Desktop (lg): floating pill next to the header.

  const t = isDay ? theme.day : theme.night;

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 bottom-0 z-1200 flex justify-around border-t p-2 backdrop-blur-md transition-colors duration-500
        lg:static lg:inset-auto lg:z-auto lg:justify-start lg:gap-1 lg:rounded-full lg:border lg:p-1 lg:shadow-md ${t.bar}`}
    >
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-2xl px-5 py-1.5 text-xs font-semibold uppercase tracking-wide
             outline-orange-500 outline-offset-2 transition-colors duration-200
             lg:flex-row lg:gap-2 lg:rounded-full lg:px-4 lg:py-2 lg:text-sm
             ${isActive ? t.active : t.link}`
          }
        >
          <Icon className="text-xl lg:text-lg" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
