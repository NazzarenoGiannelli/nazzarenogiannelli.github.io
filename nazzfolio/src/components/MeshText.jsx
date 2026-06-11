import { useEffect, useRef } from "react";
import gsap from "gsap";

// Bowyer-Watson Delaunay triangulation over a small point set.
// Returns triangles as index triples into `pts`.
const triangulate = (pts) => {
  const n = pts.length;
  if (n < 3) return [];

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  const d = Math.max(maxX - minX, maxY - minY) * 10;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const verts = [
    ...pts,
    { x: midX - d, y: midY - d },
    { x: midX, y: midY + d },
    { x: midX + d, y: midY - d },
  ];
  let tris = [[n, n + 1, n + 2]];

  const circum = ([a, b, c]) => {
    const A = verts[a],
      B = verts[b],
      C = verts[c];
    const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (Math.abs(D) < 1e-12) return null;
    const a2 = A.x * A.x + A.y * A.y;
    const b2 = B.x * B.x + B.y * B.y;
    const c2 = C.x * C.x + C.y * C.y;
    const ux = (a2 * (B.y - C.y) + b2 * (C.y - A.y) + c2 * (A.y - B.y)) / D;
    const uy = (a2 * (C.x - B.x) + b2 * (A.x - C.x) + c2 * (B.x - A.x)) / D;
    return { x: ux, y: uy, r2: (A.x - ux) ** 2 + (A.y - uy) ** 2 };
  };

  const ekey = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);

  for (let i = 0; i < n; i++) {
    const p = verts[i];
    const bad = tris.filter((t) => {
      const cc = circum(t);
      return cc && (p.x - cc.x) ** 2 + (p.y - cc.y) ** 2 <= cc.r2;
    });

    const edgeCount = new Map();
    for (const t of bad) {
      for (const [a, b] of [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
      ]) {
        const k = ekey(a, b);
        edgeCount.set(k, (edgeCount.get(k) || 0) + 1);
      }
    }

    tris = tris.filter((t) => !bad.includes(t));
    for (const [k, count] of edgeCount) {
      if (count === 1) {
        const [a, b] = k.split("-").map(Number);
        tris.push([a, b, i]);
      }
    }
  }

  return tris.filter((t) => t.every((v) => v < n));
};

const SVG_NS = "http://www.w3.org/2000/svg";
const LINE_COLOR = "#7a6cff";
const DOT_COLOR = "#b3a9ff";
const INTERIOR_POINTS = 18;

// Wraps a text line. On hover, the glyphs dissolve while a fluo Delaunay
// mesh — edges drawing in, vertex dots breathing — materializes on top.
const MeshText = ({ children, className = "", variant = "solid" }) => {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const meshRef = useRef(null); // { lines, dots, tweens, tickerFn }
  const dismissRef = useRef(null);

  const destroyMesh = () => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.tweens.forEach((t) => t.kill());
    gsap.ticker.remove(mesh.tickerFn);
    svgRef.current.replaceChildren();
    gsap.set(svgRef.current, { opacity: 1 });
    meshRef.current = null;
  };

  const buildMesh = () => {
    destroyMesh();
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const { width: w, height: h } = wrap.getBoundingClientRect();
    if (!w || !h) return;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    // Corners + jittered edge midpoints anchor the mesh to the line box,
    // interior points give it body.
    const pad = 6;
    const pts = [
      { x: pad, y: pad },
      { x: w - pad, y: pad },
      { x: pad, y: h - pad },
      { x: w - pad, y: h - pad },
      { x: w / 2 + gsap.utils.random(-w / 6, w / 6), y: pad },
      { x: w / 2 + gsap.utils.random(-w / 6, w / 6), y: h - pad },
    ];
    for (let i = 0; i < INTERIOR_POINTS; i++) {
      pts.push({
        x: gsap.utils.random(pad, w - pad),
        y: gsap.utils.random(pad, h - pad),
      });
    }

    const tris = triangulate(pts);
    const edgeSet = new Set();
    const edges = [];
    for (const [a, b, c] of tris) {
      for (const [i, j] of [
        [a, b],
        [b, c],
        [c, a],
      ]) {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(k)) {
          edgeSet.add(k);
          edges.push([i, j]);
        }
      }
    }

    const lines = edges.map(([a, b]) => {
      const el = document.createElementNS(SVG_NS, "line");
      el.setAttribute("stroke", LINE_COLOR);
      el.setAttribute("stroke-width", "1");
      el.setAttribute("stroke-opacity", "0.75");
      svg.appendChild(el);
      return { el, a: pts[a], b: pts[b] };
    });

    const dots = pts.map((p) => {
      const el = document.createElementNS(SVG_NS, "circle");
      el.setAttribute("fill", DOT_COLOR);
      el.setAttribute("r", "0");
      svg.appendChild(el);
      return { el, p };
    });

    const render = () => {
      for (const { el, a, b } of lines) {
        el.setAttribute("x1", a.x);
        el.setAttribute("y1", a.y);
        el.setAttribute("x2", b.x);
        el.setAttribute("y2", b.y);
      }
      for (const { el, p } of dots) {
        el.setAttribute("cx", p.x);
        el.setAttribute("cy", p.y);
      }
    };
    render();

    const tweens = [];

    // Edges draw themselves in
    lines.forEach(({ el, a, b }) => {
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      el.setAttribute("stroke-dasharray", len);
      el.setAttribute("stroke-dashoffset", len);
      tweens.push(
        gsap.to(el, {
          attr: { "stroke-dashoffset": 0 },
          duration: 0.55,
          delay: gsap.utils.random(0, 0.35),
          ease: "power2.out",
          // jitter stretches edges past the recorded length — drop the dash
          onComplete: () => el.removeAttribute("stroke-dasharray"),
        })
      );
    });

    // Vertices pop, then every point breathes so the mesh feels alive
    dots.forEach(({ el, p }) => {
      tweens.push(
        gsap.to(el, {
          attr: { r: 2.4 },
          duration: 0.45,
          delay: gsap.utils.random(0.1, 0.45),
          ease: "back.out(3)",
        })
      );
      tweens.push(
        gsap.to(p, {
          x: `+=${gsap.utils.random(-7, 7)}`,
          y: `+=${gsap.utils.random(-7, 7)}`,
          duration: gsap.utils.random(1, 1.8),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    });

    gsap.ticker.add(render);
    meshRef.current = { tweens, tickerFn: render };
  };

  const deactivate = () => {
    clearTimeout(dismissRef.current);
    wrapRef.current?.classList.remove("mesh-active");
    if (!meshRef.current) return;
    gsap.to(svgRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: destroyMesh,
    });
  };

  const activate = () => {
    if (meshRef.current) return;
    buildMesh();
    wrapRef.current.classList.add("mesh-active");
    // Touch has no pointerleave worth trusting — let the easter egg
    // burn out on its own
    if (window.matchMedia("(pointer: coarse)").matches) {
      clearTimeout(dismissRef.current);
      dismissRef.current = setTimeout(deactivate, 2600);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(dismissRef.current);
      destroyMesh();
    },
    []
  );

  return (
    <span
      ref={wrapRef}
      className={`mesh-text ${variant} relative ${className}`}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onClick={activate}
      data-hover
    >
      {children}
      <svg ref={svgRef} className="mesh-svg" aria-hidden="true" />
    </span>
  );
};

export default MeshText;
