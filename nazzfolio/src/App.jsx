import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  YoutubeLogo,
  InstagramLogo,
  XLogo,
  TiktokLogo,
  ThreadsLogo,
  Envelope,
  Calendar,
  ArrowUpRight,
} from "@phosphor-icons/react";
import logo from "./assets/Nlogo.svg";
import GitHubCalendar from "./components/GitHubCalendar";
import Scene3D from "./components/Scene3D";
import Cursor from "./components/Cursor";
import LocalTime from "./components/LocalTime";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#5a51e8";

const socialLinks = [
  { Icon: LinkedinLogo, label: "LinkedIn", href: "https://www.linkedin.com/in/nazzgiannelli" },
  { Icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/nazzgiannelli" },
  { Icon: YoutubeLogo, label: "YouTube", href: "https://www.youtube.com/@nazzgiannelli" },
  { Icon: TiktokLogo, label: "TikTok", href: "https://www.tiktok.com/@nazzgiannelli" },
  { Icon: ThreadsLogo, label: "Threads", href: "https://www.threads.net/@nazzgiannelli" },
  { Icon: XLogo, label: "X", href: "https://x.com/nazzgiannelli" },
];

const projects = [
  {
    index: "01",
    label: "R3PLICA",
    desc: "Digital replicas of real products, ready for real-time",
    href: "https://www.r3plica.space/",
  },
  {
    index: "02",
    label: "tuiboard",
    desc: "Terminal kanban on plain markdown",
    href: "https://tuiboard.nazzareno.xyz/",
  },
  {
    index: "03",
    label: "Art Picker",
    desc: "Curated art discoveries",
    href: "https://www.instagram.com/art_picker",
  },
];

const products = [
  {
    index: "A",
    label: "Blender addons",
    desc: "Workflow shortcuts born from production needs",
    href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=blender%20addon",
  },
  {
    index: "B",
    label: "Unreal Engine tools",
    desc: "Utilities for real-time pipelines",
    href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=unreal%20engine",
  },
  {
    index: "C",
    label: "Notion templates",
    desc: "Systems for organized minds",
    href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=notion%20template",
  },
];

const stack = [
  "UNREAL ENGINE",
  "DIGITAL TWINS",
  "BLENDER",
  "REAL-TIME 3D",
  "REACT",
  "PIXEL STREAMING",
  "METAHUMAN",
  "PRODUCT DESIGN",
  "ARCHVIZ",
  "AI PIPELINES",
];

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="overflow-hidden whitespace-nowrap py-2 select-none">
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0">
          {items.map((item, i) => (
            <span
              key={`${copy}-${i}`}
              className="display text-3xl md:text-5xl mx-5 flex items-center gap-10"
            >
              <span className={i % 2 === 0 ? "hollow" : "text-[var(--ink)]"}>
                {item}
              </span>
              <span style={{ color: ACCENT }}>✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero choreography — gsap.from everywhere, so content is never left
      // hidden if JS dies before this runs.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-kicker", { y: 24, opacity: 0, duration: 0.7 })
        .from(
          ".hero-line",
          { yPercent: 110, duration: 1, stagger: 0.12 },
          "-=0.3"
        )
        .from(".hero-tag", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".hero-social a",
          { y: 14, opacity: 0, duration: 0.4, stagger: 0.05 },
          "-=0.3"
        )
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.1");

      // Section labels + content reveal on scroll
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray(".project-row").forEach((row, i) => {
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });

      // Contribution cells pop in scattered, like assets streaming in
      gsap.from(".gh-cell", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.0015, from: "random" },
        scrollTrigger: { trigger: ".gh-grid", start: "top 88%" },
      });

      // Giant CONNECT headline drifts horizontally with scroll
      gsap.to(".connect-title", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".connect-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="noise relative" style={{ background: "var(--bg)" }}>
      <Scene3D />
      <Cursor />

      <div className="relative z-10">
        {/* ---------- nav ---------- */}
        <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 text-xs">
          <img
            src={logo}
            alt="Nazzareno Giannelli logo"
            className="w-9 h-9"
          />
          <span className="text-[var(--muted)] hidden md:block">
            expanding reality with digital solutions
          </span>
          <a
            href="mailto:nazzareno.giannelli@gmail.com"
            data-hover
            className="border border-[var(--muted)]/40 px-4 py-1.5 hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors"
          >
            say hi ↗
          </a>
        </nav>

        {/* ---------- hero ---------- */}
        <header className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24">
          <p className="hero-kicker text-xs md:text-sm text-[var(--muted)] mb-6">
            <span style={{ color: ACCENT }}>//</span> CTO @ R3PLICA · Unreal
            Engine Authorized Instructor
          </p>

          <h1 className="display text-[12.4vw] md:text-[13vw] leading-none">
            <span className="block overflow-hidden">
              <span className="hero-line block">NAZZARENO</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line hollow block">GIANNELLI</span>
            </span>
          </h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="hero-tag text-sm md:text-base text-[var(--muted)] max-w-md">
              from product design to real-time 3D, bringing real brands and
              products into the digital space
              <span
                className="inline-block w-2 h-4 ml-2 align-middle"
                style={{
                  backgroundColor: ACCENT,
                  animation: "blink 0.8s step-end infinite",
                }}
              />
            </p>

            <div className="hero-social flex gap-5">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  data-hover
                  className="text-[var(--muted)] hover:text-[var(--accent-bright)] transition-colors duration-200"
                >
                  <Icon size={22} weight="regular" />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-scroll mt-16 md:mt-24 text-[10px] tracking-[0.3em] text-[var(--muted)]">
            SCROLL ↓
          </div>
        </header>

        {/* ---------- stack marquee ---------- */}
        <section className="py-10 border-y border-white/5">
          <MarqueeRow items={stack} />
          <MarqueeRow items={stack} reverse />
        </section>

        {/* ---------- projects ---------- */}
        <section className="px-6 md:px-12 py-28 md:py-36">
          <p data-reveal className="text-xs text-[var(--muted)] mb-10">
            <span style={{ color: ACCENT }}>//</span> projects — where to find
            my work
          </p>

          <div className="border-t border-white/10">
            {projects.map(({ index, label, desc, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="project-row group flex items-baseline gap-6 md:gap-12 border-b border-white/10 py-8 md:py-12"
              >
                <span
                  className="text-xs md:text-sm shrink-0"
                  style={{ color: ACCENT }}
                >
                  {index}
                </span>
                <span className="row-title display text-4xl md:text-7xl flex-1">
                  {label}
                </span>
                <span className="hidden md:block text-sm text-[var(--muted)] max-w-xs text-right">
                  {desc}
                </span>
                <ArrowUpRight
                  size={28}
                  className="row-arrow text-[var(--muted)] shrink-0 self-center"
                />
              </a>
            ))}
          </div>
        </section>

        {/* ---------- products ---------- */}
        <section className="px-6 md:px-12 pb-28 md:pb-36">
          <p data-reveal className="text-xs text-[var(--muted)] mb-10">
            <span style={{ color: ACCENT }}>//</span> products — tools I sell
            online
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {products.map(({ index, label, desc, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                data-reveal
                className="group border border-white/10 p-8 md:p-10 hover:border-[var(--accent-bright)] hover:-translate-y-1.5 transition-all duration-300 bg-white/[0.02]"
              >
                <span
                  className="display text-5xl md:text-6xl hollow-accent block mb-8 opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  {index}
                </span>
                <span className="display text-xl md:text-2xl block mb-3 normal-case tracking-normal">
                  {label}
                </span>
                <span className="text-xs text-[var(--muted)] block mb-6">
                  {desc}
                </span>
                <span className="text-xs flex items-center gap-1 text-[var(--muted)] group-hover:text-[var(--accent-bright)] transition-colors">
                  gumroad <ArrowUpRight size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- connect ---------- */}
        <section className="connect-section px-6 md:px-12 py-28 md:py-40 border-t border-white/5 overflow-hidden">
          <h2 className="connect-title display text-[16vw] md:text-[12vw] whitespace-nowrap leading-none mb-14">
            LET'S <span className="hollow-accent">BUILD</span>
          </h2>

          <div data-reveal className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href="mailto:nazzareno.giannelli@gmail.com"
              data-hover
              className="flex items-center gap-3 px-7 py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-1"
              style={{ background: "#382FBC", color: "#fff" }}
            >
              <Envelope size={18} /> nazzareno.giannelli@gmail.com
            </a>
            <a
              href="https://tidycal.com/nazzareno"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="flex items-center gap-3 px-7 py-4 text-sm border border-white/20 hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors"
            >
              <Calendar size={18} /> book a call
            </a>
            <a
              href="https://github.com/NazzarenoGiannelli"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="flex items-center gap-3 px-7 py-4 text-sm border border-white/20 hover:border-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors"
            >
              <GithubLogo size={18} /> github
            </a>
          </div>
        </section>

        {/* ---------- github activity ---------- */}
        <GitHubCalendar />

        {/* ---------- footer ---------- */}
        <footer className="px-6 md:px-12 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <LocalTime />
          <p>© {new Date().getFullYear()} Nazzareno Giannelli — v2, drafted with Fable 5</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
