import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACCENT = new THREE.Color("#5a51e8");
const ACCENT_DEEP = new THREE.Color("#382FBC");
const DIM = new THREE.Color("#1c1840");

// Wireframe primitive built from edges so it reads as a technical drawing,
// not a shaded mesh.
const makeEdges = (geometry, color, opacity) => {
  const edges = new THREE.EdgesGeometry(geometry, 12);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
  });
  return new THREE.LineSegments(edges, material);
};

const Scene3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x060608, 8, 26);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const primitives = [
      {
        mesh: makeEdges(new THREE.IcosahedronGeometry(3.1, 0), ACCENT, 0.55),
        pos: [3.4, 0.4, -3],
        spin: [0.0011, 0.0017, 0.0004],
        drift: { amp: 0.45, speed: 0.32, phase: 0 },
      },
      {
        mesh: makeEdges(new THREE.TorusGeometry(1.7, 0.52, 10, 22), ACCENT_DEEP, 0.45),
        pos: [-4.1, -2.2, -5],
        spin: [0.0019, 0.0008, 0.0013],
        drift: { amp: 0.6, speed: 0.24, phase: 2.1 },
      },
      {
        mesh: makeEdges(new THREE.BoxGeometry(1.9, 1.9, 1.9), ACCENT, 0.4),
        pos: [-3.1, 2.6, -4],
        spin: [0.0014, 0.0021, 0.0009],
        drift: { amp: 0.5, speed: 0.4, phase: 4.2 },
      },
      {
        mesh: makeEdges(new THREE.ConeGeometry(1.2, 2.2, 5), DIM, 0.85),
        pos: [4.6, -3.1, -7],
        spin: [0.0008, 0.0026, 0.0011],
        drift: { amp: 0.7, speed: 0.2, phase: 1.3 },
      },
      {
        mesh: makeEdges(new THREE.OctahedronGeometry(0.9, 0), ACCENT, 0.65),
        pos: [0.4, 3.4, -8],
        spin: [0.0023, 0.0012, 0.0018],
        drift: { amp: 0.8, speed: 0.36, phase: 5.5 },
      },
    ];

    primitives.forEach(({ mesh, pos }) => {
      mesh.position.set(...pos);
      group.add(mesh);
    });

    // Sparse particle field for depth
    const starCount = 320;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 7 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x4a42d6,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Pointer parallax (lerped) + scroll-driven choreography
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let scrollProgress = 0;

    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? window.scrollY / max : 0;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf;

    const tick = () => {
      const t = clock.getElapsedTime();

      eased.x += (pointer.x - eased.x) * 0.04;
      eased.y += (pointer.y - eased.y) * 0.04;

      primitives.forEach(({ mesh, spin, drift, pos }) => {
        mesh.rotation.x += spin[0];
        mesh.rotation.y += spin[1];
        mesh.rotation.z += spin[2];
        mesh.position.y =
          pos[1] + Math.sin(t * drift.speed + drift.phase) * drift.amp;
      });

      // Whole constellation tilts toward the cursor and unwinds with scroll
      group.rotation.y = eased.x * 0.22 + scrollProgress * Math.PI * 0.6;
      group.rotation.x = eased.y * 0.16 + scrollProgress * 0.35;
      group.position.y = scrollProgress * 2.4;

      camera.position.x = eased.x * 0.6;
      camera.position.y = -eased.y * 0.4 - scrollProgress * 1.2;
      camera.lookAt(0, -scrollProgress * 1.2, -4);

      stars.rotation.y = t * 0.008 + scrollProgress * 0.4;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      primitives.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default Scene3D;
