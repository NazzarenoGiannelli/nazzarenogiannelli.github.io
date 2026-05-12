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
  ArrowSquareOut,
} from "@phosphor-icons/react";
import GitHubCalendar from "./components/GitHubCalendar";
import NowSection from "./components/NowSection";
import Stack from "./components/Stack";
import LocalTime from "./components/LocalTime";

const LinksPage = () => {
  const accent = "#382FBC";

  const socialLinks = [
    {
      Icon: LinkedinLogo,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nazzgiannelli",
    },
    {
      Icon: InstagramLogo,
      label: "Instagram",
      href: "https://www.instagram.com/nazzgiannelli",
    },
    {
      Icon: YoutubeLogo,
      label: "YouTube",
      href: "https://www.youtube.com/@nazzgiannelli",
    },
    {
      Icon: TiktokLogo,
      label: "TikTok",
      href: "https://www.tiktok.com/@nazzgiannelli",
    },
    {
      Icon: ThreadsLogo,
      label: "Threads",
      href: "https://www.threads.net/@nazzgiannelli",
    },
    { Icon: XLogo, label: "X", href: "https://x.com/nazzgiannelli" },
  ];

  const projects = [
    {
      label: "R3PLICA",
      desc: "Digital replicas catalog",
      href: "https://www.r3plica.space/",
    },
    {
      label: "Art Picker",
      desc: "Curated art discoveries",
      href: "https://www.instagram.com/art_picker",
    },
  ];

  const products = [
    {
      label: "Blender addons",
      href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=blender%20addon",
    },
    {
      label: "Unreal Engine tools",
      href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=unreal%20engine",
    },
    {
      label: "Notion templates",
      href: "https://nazzareno.gumroad.com/?sort=most_reviewed&tags=notion%20template",
    },
  ];

  const contactLinks = [
    {
      Icon: Envelope,
      href: "mailto:nazzareno.giannelli@gmail.com",
      label: "Email",
    },
    {
      Icon: Calendar,
      href: "https://tidycal.com/nazzareno",
      label: "Book a call",
    },
    {
      Icon: GithubLogo,
      href: "https://github.com/NazzarenoGiannelli",
      label: "GitHub",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{
        backgroundColor: "#0a0a0a",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <div className="w-full max-w-md">
        {/* Profile */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-24 h-24 rounded-full overflow-hidden mb-4"
            style={{ boxShadow: `0 0 0 2px #0a0a0a, 0 0 0 4px ${accent}` }}
          >
            <img
              src="/profile.jpg"
              alt="Nazzareno Giannelli"
              className="w-full h-full object-cover"
            />
          </div>
          <h1
            className="text-3xl text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nazzareno Giannelli
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            expanding reality with digital solutions
            <span
              className="inline-block w-2 h-4 ml-1"
              style={{
                backgroundColor: accent,
                animation: "blink 0.8s step-end infinite",
              }}
            />
          </p>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              title={label}
            >
              <Icon size={24} weight="regular" />
            </a>
          ))}
        </div>

        {/* Now */}
        <NowSection />

        {/* Stack */}
        <Stack />

        {/* Projects */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs mb-3" style={{ color: "#888" }}>
            <span style={{ color: accent }}>//</span> projects
          </p>
          <div className="flex flex-col gap-3">
            {projects.map(({ label, desc, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-3 border border-gray-800 hover:border-[#382FBC] transition-all duration-200"
                style={{ backgroundColor: "#111" }}
              >
                <div>
                  <span className="text-white text-sm">{label}</span>
                  {desc && (
                    <span className="text-gray-500 text-xs ml-2">— {desc}</span>
                  )}
                </div>
                <ArrowSquareOut
                  size={16}
                  weight="regular"
                  className="text-gray-600 group-hover:text-[#382FBC] transition-colors"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-10">
          <p className="text-gray-500 text-xs mb-3" style={{ color: "#888" }}>
            <span style={{ color: accent }}>//</span> products
          </p>
          <div className="flex flex-col gap-3">
            {products.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-4 py-3 border border-gray-800 hover:border-[#382FBC] transition-all duration-200"
                style={{ backgroundColor: "#111" }}
              >
                <span className="text-white text-sm">{label}</span>
                <ArrowSquareOut
                  size={16}
                  weight="regular"
                  className="text-gray-600 group-hover:text-[#382FBC] transition-colors"
                />
              </a>
            ))}
          </div>
        </div>

        {/* GitHub activity */}
        <GitHubCalendar />

        {/* Contact */}
        <div className="mb-10">
          <p className="text-gray-500 text-xs mb-3" style={{ color: "#888" }}>
            <span style={{ color: accent }}>//</span> connect
          </p>
          <div className="flex justify-center gap-6">
            {contactLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#382FBC] transition-colors duration-200"
                title={label}
              >
                <Icon size={20} weight="regular" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-xs">
          <LocalTime />
          <p className="mt-1">
            © {new Date().getFullYear()} Nazzareno Giannelli
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LinksPage;
