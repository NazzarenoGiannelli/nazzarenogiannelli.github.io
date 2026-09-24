import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  GithubLogo,
  LinkedinLogo,
  Envelope,
  Calendar,
  ArrowUpRight,
} from "@phosphor-icons/react";
import GitHubCalendar from "./components/GitHubCalendar";
import MeshText from "./components/MeshText";
import Scene3D from "./components/Scene3D";
import Cursor from "./components/Cursor";
import LocalTime from "./components/LocalTime";
import Nav from "./components/Nav";
import WorkWithMe from "./components/WorkWithMe";
import Projects from "./components/Projects";
import Tools from "./components/Tools";
import HowIWork from "./components/HowIWork";
import {
  CALL_URL,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  elsewhere,
  marquee,
  shippedOn,
  socialLinks,
} from "./content";
import { prefersReducedMotion } from "./lib/motion";

gsap.registerPlugin(ScrollTrigger);

const MarqueeRow = ({ items, reverse = false }) => (
  <div className="overflow-hidden whitespace-nowrap py-2 select-none">
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
          {items.map((item, i) => (
            <span
              key={`${copy}-${i}`}
              className="display text-3xl md:text-5xl mx-5 flex items-center gap-10"
            >
              <span className={i % 2 === 0 ? "hollow" : "text-[var(--ink)]"}>
                {item}
              </span>
              <span className="text-[var(--accent-bright)]">✦</span>
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
    if (prefersReducedMotion()) return;

    // Lenis inertial scroll, driven by GSAP's ticker so ScrollTrigger,
    // the three.js scene and the smoothing all share one clock
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero choreography: gsap.from everywhere, so content is never left
      // hidden if JS dies before this runs.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-kicker", { y: 24, opacity: 0, duration: 0.7 })
        .from(".hero-line", { yPercent: 110, duration: 1, stagger: 0.12 }, "-=0.3")
        .from(".hero-tag", { y: 18, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta > *", { y: 14, opacity: 0, duration: 0.45, stagger: 0.06 }, "-=0.35")
        .from(".hero-social a", { y: 14, opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.3")
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.1");

      // Section labels + copy reveal on scroll
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Proof strip: names flicker on like assets resolving in a viewport
      gsap.from(".proof-item", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".proof-strip", start: "top 90%" },
      });

      // Lanes rise in, then their items stream in one by one
      gsap.utils.toArray(".lane").forEach((lane, i) => {
        gsap.from(lane, {
          y: 70,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: lane, start: "top 88%" },
        });
        gsap.from(lane.querySelectorAll(".lane-item"), {
          x: -16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          delay: 0.35 + i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: lane, start: "top 80%" },
        });
      });

      // Projects: the preview opens from the bottom edge like a viewport
      // resolving, with the content settling from a slight zoom. No rotation
      // here, the tilt belongs to the cursor only.
      gsap.utils.toArray(".project").forEach((project) => {
        const stage = project.querySelector(".tilt-stage");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: project, start: "top 85%" },
          defaults: { ease: "power3.out" },
        });
        tl.fromTo(
          stage,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85,
            ease: "power4.out",
            // leave no clip behind, so cursor tilt can use the full frame
            clearProps: "clipPath",
          },
        )
          .from(
            stage.querySelector(".tilt-frame"),
            { scale: 1.12, duration: 1.1 },
            0,
          )
          .from(
            project.querySelectorAll(".project-copy > *"),
            { y: 26, opacity: 0, duration: 0.7, stagger: 0.07 },
            0.15,
          );
      });

      gsap.utils.toArray(".tool-row").forEach((row, i) => {
        gsap.from(row, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%" },
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

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={root} id="top" className="noise relative" style={{ background: "var(--bg)" }}>
      <Scene3D />
      <Cursor />
      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <div className="relative z-10">
        <Nav />

        {/* ---------- hero ---------- */}
        <header className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-12">
          <p className="hero-kicker text-xs md:text-sm text-[var(--muted)] mb-6">
            <span className="text-[var(--accent-bright)]">//</span> CTO at
            R3PLICA, Unreal Authorized Instructor
          </p>

          <h1 className="display text-[12.4vw] md:text-[13vw] leading-none">
            <span className="block overflow-hidden">
              <MeshText className="hero-line block" variant="solid">
                NAZZARENO
              </MeshText>
            </span>
            <span className="block overflow-hidden">
              <MeshText className="hero-line hollow block" variant="hollow">
                GIANNELLI
              </MeshText>
            </span>
          </h1>

          <div className="mt-10 grid md:grid-cols-12 gap-10 md:items-end">
            <div className="md:col-span-7">
              <p className="hero-tag text-base md:text-xl text-[var(--ink)] leading-relaxed max-w-2xl">
                I build real-time 3D and the AI systems around it. Most days
                that's R3PLICA, a catalog of real furniture as digital twins
                that AI agents can actually read. The rest goes into small
                tools like tuiboard.
                <span className="inline-block w-2 h-4 ml-2 align-middle bg-[var(--accent-bright)] animate-[blink_0.8s_step-end_infinite]" />
              </p>

              <div className="hero-cta flex flex-wrap gap-4 mt-8">
                <a
                  href="#work"
                  data-hover
                  className="btn-primary flex items-center gap-3 px-6 py-3.5 text-sm"
                >
                  What I can build for you
                </a>
                <a
                  href={CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="btn-ghost flex items-center gap-3 px-6 py-3.5 text-sm"
                >
                  <Calendar size={18} /> Book a call
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex md:justify-end">
              <div className="hero-social flex gap-6">
                {socialLinks.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    data-hover
                    className="text-[var(--muted)] hover:text-[var(--accent-bright)] transition-colors duration-200"
                  >
                    <Icon size={24} weight="regular" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-scroll mt-14 md:mt-20 text-[10px] tracking-[0.3em] text-[var(--muted)]">
            SCROLL ↓
          </div>
        </header>

        {/* ---------- stack marquee ---------- */}
        <section aria-label="What I work with" className="py-10 border-y border-white/5">
          <MarqueeRow items={marquee} />
          <MarqueeRow items={marquee} reverse />
        </section>

        {/* ---------- proof strip ---------- */}
        <section
          aria-label="Where my work is published"
          className="proof-strip px-6 md:px-12 py-10 border-b border-white/5 flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
        >
          <p className="section-label shrink-0">
            <span className="text-[var(--accent-bright)]">//</span> shipped on,
            written about in
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {shippedOn.map(({ label, href }) => (
              <li key={label} className="proof-item">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    className="text-[var(--ink-soft)] hover:text-[var(--accent-bright)] transition-colors"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="text-[var(--ink-soft)]">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <WorkWithMe />
        <Projects />
        <Tools />
        <HowIWork />
        <GitHubCalendar />

        {/* ---------- connect ---------- */}
        <section
          id="contact"
          className="connect-section px-6 md:px-12 py-28 md:py-40 border-t border-white/5 overflow-hidden"
        >
          <h2 className="connect-title display text-[16vw] md:text-[12vw] whitespace-nowrap leading-none mb-10">
            LET'S <span className="hollow">BUILD</span>
          </h2>

          <p data-reveal className="text-base md:text-xl text-[var(--ink-soft)] max-w-2xl mb-12">
            Got a project, a question about Unreal or a Claude Code setup you
            want a second opinion on? Write me, or grab a slot on my calendar.
          </p>

          <div data-reveal className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href={`mailto:${EMAIL}`}
              data-hover
              className="btn-primary flex items-center gap-3 px-7 py-4 text-sm font-medium"
            >
              <Envelope size={18} /> {EMAIL}
            </a>
            <a
              href={CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-ghost flex items-center gap-3 px-7 py-4 text-sm"
            >
              <Calendar size={18} /> Book a call
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-ghost flex items-center gap-3 px-7 py-4 text-sm"
            >
              <LinkedinLogo size={18} /> LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-ghost flex items-center gap-3 px-7 py-4 text-sm"
            >
              <GithubLogo size={18} /> GitHub
            </a>
          </div>
        </section>

        {/* ---------- footer ---------- */}
        <footer className="px-6 md:px-12 py-10 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-[var(--muted)]">
          <LocalTime />
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {elsewhere.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1"
                >
                  {label} <ArrowUpRight size={11} />
                </a>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Nazzareno Giannelli</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
