import { useEffect, useState } from "react";
import logo from "../assets/Nlogo.svg";
import { EMAIL, navLinks } from "../content";

// Transparent over the hero, then gains a backdrop so it never sits on top
// of content. Slides away while scrolling down, comes back on scroll up.
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Only flip on a clear change of direction, so smooth-scroll easing
      // at the end of a gesture doesn't make the bar flicker
      const dy = y - lastY;
      if (Math.abs(dy) < 6) return;
      setHidden(dy > 0 && y > window.innerHeight * 0.6);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`site-nav fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-6 px-6 md:px-12 py-4 text-xs ${
        scrolled ? "is-scrolled" : ""
      } ${hidden ? "is-hidden" : ""}`}
    >
      <a href="#top" aria-label="Back to top" data-hover className="shrink-0">
        <img src={logo} alt="Nazzareno Giannelli logo" className="w-9 h-9" />
      </a>

      <ul className="hidden lg:flex items-center gap-8 text-[var(--muted)]">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              data-hover
              className="nav-link hover:text-[var(--ink)] transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href={`mailto:${EMAIL}`}
        data-hover
        className="border border-[var(--muted)]/50 px-4 py-1.5 hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors"
      >
        say hi ↗
      </a>
    </nav>
  );
};

export default Nav;
