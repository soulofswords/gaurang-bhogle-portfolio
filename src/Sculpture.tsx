import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export default function Sculpture({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const repaint = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    pausedRef.current = paused;
    repaint.current();
  }, [paused]);
  useEffect(() => {
    const container = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.65;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0, 7.7);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const geometry = new THREE.TorusKnotGeometry(1.04, 0.35, 240, 36, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd8d9dd,
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: 2.1,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.4, -0.35, -0.45);
    const group = new THREE.Group();
    group.add(knot);
    scene.add(group);
    const beadGeometry = new THREE.SphereGeometry(0.12, 24, 16);
    const beadMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6a35,
      emissive: 0xff3e13,
      emissiveIntensity: 0.5,
      metalness: 0.45,
      roughness: 0.25,
    });
    const bead = new THREE.Mesh(beadGeometry, beadMaterial);
    bead.position.set(1.8, 0.75, 0.4);
    group.add(bead);
    const key = new THREE.DirectionalLight(0xfff4e6, 5);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xff4f1c, 75, 20, 2);
    rim.position.set(2, -1.5, 2);
    scene.add(rim);
    const cool = new THREE.DirectionalLight(0xc6d9ff, 3);
    cool.position.set(-4, -1, 1);
    scene.add(cool);
    let frame = 0,
      visible = true,
      disposed = false,
      last = 0,
      elapsed = 0;
    const target = { x: 0, y: 0 };
    const draw = (time = 0) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = Math.min((time - last) / 1000 || 0, 0.05);
      last = time;
      if (!pausedRef.current) {
        elapsed += dt;
        knot.rotation.y = -0.35 + elapsed * 0.13;
        knot.rotation.z = -0.45 + Math.sin(elapsed * 0.18) * 0.16;
        group.rotation.x += (target.y - group.rotation.x) * 0.045;
        group.rotation.y += (target.x - group.rotation.y) * 0.045;
        group.position.y = Math.sin(elapsed * 0.7) * 0.075;
        bead.position.set(
          Math.cos(elapsed * 0.35) * 1.85,
          Math.sin(elapsed * 0.35) * 1.5,
          0.4,
        );
      }
      renderer.render(scene, camera);
      if (!pausedRef.current) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(draw);
    };
    repaint.current = start;
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      start();
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || pausedRef.current) return;
      const rect = container.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    const reset = () => {
      target.x = 0;
      target.y = 0;
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(container);
    intersection.observe(container);
    container.addEventListener("pointermove", pointer);
    container.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    const contextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      frame = 0;
      setReady(false);
    };
    const contextRestored = () => {
      setReady(true);
      start();
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    resize();
    setReady(true);
    return () => {
      disposed = true;
      repaint.current = () => {};
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      intersection.disconnect();
      container.removeEventListener("pointermove", pointer);
      container.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      geometry.dispose();
      material.dispose();
      beadGeometry.dispose();
      beadMaterial.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      className={`sculpture ${ready ? "is-ready" : ""}`}
      ref={host}
      aria-hidden="true"
    >
      <div className="sculpture-fallback" />
    </div>
  );
}
