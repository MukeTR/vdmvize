"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { HUB, DESTINATIONS } from "@/lib/site";

// geographic (deg) -> unit vector, and back — used to interpolate along a route
function toVec(lat: number, lng: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    Math.cos(la) * Math.cos(lo),
    Math.sin(la),
    Math.cos(la) * Math.sin(lo)
  );
}
function toLatLng(v: THREE.Vector3) {
  const n = v.clone().normalize();
  return {
    lat: (Math.asin(n.y) * 180) / Math.PI,
    lng: (Math.atan2(n.z, n.x) * 180) / Math.PI,
  };
}

// a small glowing plane sprite drawn on a canvas (no external assets)
function makePlaneSprite() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.font = "78px system-ui, 'Segoe UI Symbol', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // slight nose-up tilt so it reads as flying
  ctx.translate(size / 2, size / 2 + 4);
  ctx.rotate(-Math.PI / 10);
  // warm glow halo
  ctx.shadowColor = "rgba(232,178,76,1)";
  ctx.shadowBlur = 26;
  ctx.fillStyle = "#ffe6ab";
  ctx.fillText("✈", 0, 0);
  // second pass — crisp bright core
  ctx.shadowBlur = 6;
  ctx.fillStyle = "#fff6e2";
  ctx.fillText("✈", 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(9, 9, 1);
  return sprite;
}

type Route = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
  phase: number;
  speed: number;
  __obj?: THREE.Sprite;
};

// planes literally fly these routes; arcs render all destinations
const PLANE_CITIES = ["Paris", "Londra", "New York", "Atina", "Berlin"];

export default function GlobeScene() {
  const globeEl = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 560, h: 560 });
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // responsive square-ish canvas
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = Math.min(el.clientHeight || w, w);
      setSize({ w, h: h || w });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const arcs = useMemo(
    () =>
      DESTINATIONS.map((d) => ({
        startLat: HUB.lat,
        startLng: HUB.lng,
        endLat: d.lat,
        endLng: d.lng,
        color: ["rgba(232,178,76,0.05)", "rgba(90,200,250,0.9)"],
      })),
    []
  );

  const points = useMemo(
    () => [
      { lat: HUB.lat, lng: HUB.lng, size: 0.55, color: "#e8b24c", hub: true },
      ...DESTINATIONS.map((d) => ({
        lat: d.lat,
        lng: d.lng,
        size: 0.32,
        color: "#5ac8fa",
        hub: false,
      })),
    ],
    []
  );

  const rings = useMemo(
    () => [
      { lat: HUB.lat, lng: HUB.lng, color: "#e8b24c" },
      ...DESTINATIONS.filter((d) => PLANE_CITIES.includes(d.city)).map((d) => ({
        lat: d.lat,
        lng: d.lng,
        color: "#5ac8fa",
      })),
    ],
    []
  );

  const routes = useMemo<Route[]>(
    () =>
      DESTINATIONS.filter((d) => PLANE_CITIES.includes(d.city)).map((d, i) => ({
        startLat: HUB.lat,
        startLng: HUB.lng,
        endLat: d.lat,
        endLng: d.lng,
        color: ["#e8b24c", "#5ac8fa"],
        phase: i / PLANE_CITIES.length,
        speed: 0.06 + i * 0.008,
      })),
    []
  );

  const globeMaterial = useMemo(() => {
    const m = new THREE.MeshPhongMaterial({
      color: "#0f1e38",
      emissive: "#081426",
      emissiveIntensity: 1,
      shininess: 4,
    });
    return m;
  }, []);

  // camera + controls setup
  useEffect(() => {
    const g = globeEl.current;
    if (!g) return;
    const controls = g.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI / 3.4;
    controls.maxPolarAngle = Math.PI / 1.7;
    g.pointOfView({ lat: 32, lng: 24, altitude: 2.35 }, 0);

    // warmer key light
    const scene = g.scene();
    const dir = new THREE.DirectionalLight(0xbfd6ff, 1.1);
    dir.position.set(1, 0.6, 1);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0x2a3a5c, 1.4));
    setReady(true);
  }, [reduced]);

  // animate planes along their great-circle routes
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const g = globeEl.current;
      if (g) {
        for (const r of routes) {
          if (!r.__obj) continue;
          if (!reduced) r.phase = (r.phase + r.speed * dt) % 1;
          const t = reduced ? 0.5 : r.phase;
          const a = toVec(r.startLat, r.startLng);
          const b = toVec(r.endLat, r.endLng);
          const mid = a.clone().lerp(b, t).normalize();
          const { lat, lng } = toLatLng(mid);
          const alt = 0.12 * Math.sin(Math.PI * t) + 0.008;
          const pos = g.getCoords(lat, lng, alt);
          r.__obj.position.set(pos.x, pos.y, pos.z);
          const scl = 8 + 2.5 * Math.sin(Math.PI * t);
          r.__obj.scale.set(scl, scl, 1);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, reduced, routes]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <Globe
        ref={globeEl}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showAtmosphere
        atmosphereColor="#5ac8fa"
        atmosphereAltitude={0.2}
        showGraticules
        // arcs (flight routes)
        arcsData={arcs}
        arcColor={"color" as any}
        arcStroke={0.5}
        arcAltitudeAutoScale={0.42}
        arcDashLength={0.45}
        arcDashGap={0.9}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={reduced ? 0 : 3200}
        // city markers
        pointsData={points}
        pointLat={"lat" as any}
        pointLng={"lng" as any}
        pointColor={"color" as any}
        pointAltitude={0.012}
        pointRadius={"size" as any}
        // pulsing rings
        ringsData={rings}
        ringColor={(d: any) => (t: number) => {
          const base = d.color === "#e8b24c" ? "232,178,76" : "90,200,250";
          return `rgba(${base},${Math.sqrt(1 - t) * 0.5})`;
        }}
        ringMaxRadius={4}
        ringPropagationSpeed={reduced ? 0 : 1.6}
        ringRepeatPeriod={1600}
        // planes flying the routes
        customLayerData={routes}
        customThreeObject={(d: any) => {
          const s = makePlaneSprite();
          d.__obj = s;
          return s;
        }}
        customThreeObjectUpdate={() => {}}
      />
    </div>
  );
}
