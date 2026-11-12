import { useState } from "react";
import { NavLink } from "react-router-dom";
import Sharingan from "./Sharingan";

const links = [
  { to: "/", label: "Test", icon: "📝" },
  { to: "/classes", label: "Classes", icon: "🏫" },
  { to: "/events", label: "Events", icon: "🎯" },
  { to: "/expenses", label: "Expenses", icon: "🍜" },
  { to: "/about", label: "About", icon: "🍃" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rank/30 bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <Sharingan size={38} />
          <div className="leading-tight">
            <span className="font-display text-2xl font-black tracking-widest text-foil">
              LOMA
            </span>
            <p className="-mt-1 text-[10px] uppercase tracking-[0.25em] text-scroll/60">
              Academic Helper
            </p>
          </div>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition ${
                    isActive
                      ? "rasengan-btn shadow-lg"
                      : "text-scroll/80 hover:bg-rank/10 hover:text-rank"
                  }`
                }
              >
                <span className="mr-1.5">{l.icon}</span>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-rank/40 p-2 text-rank md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-rank/20 bg-ink/95 px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-wide ${
                    isActive ? "rasengan-btn" : "text-scroll/80 hover:bg-rank/10"
                  }`
                }
              >
                <span className="mr-2">{l.icon}</span>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
