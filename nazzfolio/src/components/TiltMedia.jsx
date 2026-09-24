import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";

// Project preview that behaves like an object in a real-time viewport:
// it tilts toward the cursor, a light sweep follows the pointer, and videos
// only play while they're on screen.
const TiltMedia = ({ media }) => {
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || isCoarsePointer() || prefersReducedMotion()) return;

    const rotX = gsap.quickTo(frame, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotY = gsap.quickTo(frame, "rotationY", { duration: 0.6, ease: "power3.out" });

    const onMove = (e) => {
      const r = frame.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rotY((px - 0.5) * 10);
      rotX((0.5 - py) * 8);
      frame.style.setProperty("--mx", `${px * 100}%`);
      frame.style.setProperty("--my", `${py * 100}%`);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);
    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const inner =
    media.type === "video" ? (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="block w-full h-full object-cover"
      />
    ) : (
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        className="block w-full h-full object-cover"
      />
    );

  const isVideoLink = media.href?.includes("youtube.com");

  return (
    <div className="tilt-stage">
      <div ref={frameRef} className="tilt-frame group/media">
        {media.href ? (
          <a
            href={media.href}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="block w-full h-full"
          >
            {inner}
            <span className="media-badge">
              {isVideoLink ? (
                <>
                  <Play size={14} weight="fill" /> watch
                </>
              ) : (
                <>
                  open <ArrowUpRight size={14} />
                </>
              )}
            </span>
          </a>
        ) : (
          inner
        )}
        <span className="tilt-glare" aria-hidden="true" />
        <span className="tilt-corners" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TiltMedia;
