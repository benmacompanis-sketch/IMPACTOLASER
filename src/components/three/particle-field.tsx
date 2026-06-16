"use client";

import { useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Shared, viewport-tracked mouse (the canvas is pointer-events:none, so we
 *  read the real cursor from window instead of R3F's canvas pointer). */
type MouseNdc = { x: number; y: number; active: boolean };

function useWindowMouse() {
  const ndc = useRef<MouseNdc>({ x: 0, y: 0, active: false });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ndc.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      ndc.current.active = true;
    };
    const onLeave = () => (ndc.current.active = false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ndc;
}

const FAR_AWAY = new THREE.Vector3(99999, 99999, 0);

/* ──────────────────────────────────────────────────────────────────────────
 * Glowing particle cloud — drifts, twinkles, and is repelled by / brightens
 * near the cursor (all on the GPU via the vertex/fragment shaders).
 * ────────────────────────────────────────────────────────────────────────── */
function GlowParticles({
  count,
  mouseRef,
}: {
  count: number;
  mouseRef: MutableRefObject<THREE.Vector3>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#6dabff") },
      uColorB: { value: new THREE.Color("#ffffff") },
      uSize: { value: 26 },
      uMouse: { value: new THREE.Vector3().copy(FAR_AWAY) },
      uMouseRadius: { value: 3.2 },
      uMousePush: { value: 1.3 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSeed" count={count} array={seeds} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          uniform float uTime;
          uniform float uSize;
          uniform vec3 uMouse;
          uniform float uMouseRadius;
          uniform float uMousePush;
          attribute float aSeed;
          varying float vTwinkle;
          varying float vInfluence;
          void main() {
            vec3 p = position;
            p.x += sin(uTime * 0.15 + aSeed) * 0.4;
            p.y += cos(uTime * 0.12 + aSeed * 1.3) * 0.4;

            // cursor repulsion (in the XY plane)
            vec2 toP = p.xy - uMouse.xy;
            float d = length(toP);
            float influence = 1.0 - smoothstep(0.0, uMouseRadius, d);
            vInfluence = influence;
            p.xy += normalize(toP + vec2(0.0001)) * influence * uMousePush;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            vTwinkle = 0.55 + 0.45 * sin(uTime * 1.2 + aSeed * 5.0);
            gl_PointSize = uSize * vTwinkle * (1.0 + influence * 1.8) * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vTwinkle;
          varying float vInfluence;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d);
            vec3 color = mix(uColorA, uColorB, smoothstep(0.0, 0.15, 0.18 - d) * vTwinkle);
            color += vInfluence * 0.6; // glow brighter near the cursor
            gl_FragColor = vec4(color, alpha * 0.85 * (vTwinkle + vInfluence * 0.5));
          }
        `}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Constellation: drifting nodes + fading links. Nodes are pushed away from
 * the cursor (non-accumulating display offset) so the web parts around it.
 * ────────────────────────────────────────────────────────────────────────── */
function Constellation({
  count,
  mouseRef,
}: {
  count: number;
  mouseRef: MutableRefObject<THREE.Vector3>;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const maxLineVerts = count * count * 2;

  const data = useMemo(() => {
    const nodes = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      nodes[i * 3 + 0] = (Math.random() - 0.5) * 18;
      nodes[i * 3 + 1] = (Math.random() - 0.5) * 11;
      nodes[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
    }
    return {
      nodes,
      velocities,
      display: new Float32Array(count * 3),
      linePositions: new Float32Array(maxLineVerts * 3),
      lineColors: new Float32Array(maxLineVerts * 3),
    };
  }, [count, maxLineVerts]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const { nodes, velocities, display, linePositions, lineColors } = data;
    const limit = { x: 9, y: 5.5, z: 4 };
    const m = mouseRef.current;
    const repelR = 3.6;
    const repelStrength = 1.7;

    // integrate base positions + bounce
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      nodes[ix] += velocities[ix] * dt * 60 * 0.016;
      nodes[ix + 1] += velocities[ix + 1] * dt * 60 * 0.016;
      nodes[ix + 2] += velocities[ix + 2] * dt * 60 * 0.016;
      if (nodes[ix] > limit.x || nodes[ix] < -limit.x) velocities[ix] *= -1;
      if (nodes[ix + 1] > limit.y || nodes[ix + 1] < -limit.y) velocities[ix + 1] *= -1;
      if (nodes[ix + 2] > limit.z - 2 || nodes[ix + 2] < -limit.z - 2) velocities[ix + 2] *= -1;

      // non-accumulating cursor push → display offset
      const dx = nodes[ix] - m.x;
      const dy = nodes[ix + 1] - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = dist < repelR ? 1 - dist / repelR : 0;
      const push = influence * influence * repelStrength;
      const inv = dist > 0.0001 ? 1 / dist : 0;
      display[ix] = nodes[ix] + dx * inv * push;
      display[ix + 1] = nodes[ix + 1] + dy * inv * push;
      display[ix + 2] = nodes[ix + 2];
    }

    // links between nearby display nodes
    let v = 0;
    const maxDist = 3.4;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = display[i * 3] - display[j * 3];
        const dy = display[i * 3 + 1] - display[j * 3 + 1];
        const dz = display[i * 3 + 2] - display[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          const a = 1 - dist / maxDist;
          linePositions[v * 3] = display[i * 3];
          linePositions[v * 3 + 1] = display[i * 3 + 1];
          linePositions[v * 3 + 2] = display[i * 3 + 2];
          linePositions[(v + 1) * 3] = display[j * 3];
          linePositions[(v + 1) * 3 + 1] = display[j * 3 + 1];
          linePositions[(v + 1) * 3 + 2] = display[j * 3 + 2];
          for (let k = 0; k < 2; k++) {
            lineColors[(v + k) * 3] = 0.18 * a;
            lineColors[(v + k) * 3 + 1] = 0.55 * a;
            lineColors[(v + k) * 3 + 2] = 1.0 * a;
          }
          v += 2;
        }
      }
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry as THREE.BufferGeometry;
      geo.setDrawRange(0, v);
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry as THREE.BufferGeometry;
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLineVerts} array={data.linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLineVerts} array={data.lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={data.display} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#9ec8ff" size={0.06} sizeAttenuation transparent depthWrite={false} opacity={0.9} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Rig: soft pointer parallax + projects the cursor into the group's local
 * space so both layers react to the real mouse position.
 * ────────────────────────────────────────────────────────────────────────── */
function Rig({
  mouseNdc,
  mouseLocal,
  children,
}: {
  mouseNdc: MutableRefObject<MouseNdc>;
  mouseLocal: MutableRefObject<THREE.Vector3>;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!group.current) return;
    const n = mouseNdc.current;

    // parallax
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, n.x * 0.12, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -n.y * 0.08, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, n.x * 0.6, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, n.y * 0.4, 0.04);

    // project cursor onto the z = -2 plane, then into group-local space
    if (!n.active) {
      mouseLocal.current.copy(FAR_AWAY);
      return;
    }
    tmp.set(n.x, n.y, 0.5).unproject(camera);
    tmp.sub(camera.position).normalize();
    const targetZ = -2;
    const dist = (targetZ - camera.position.z) / tmp.z;
    world.copy(camera.position).addScaledVector(tmp, dist);
    group.current.updateMatrixWorld();
    mouseLocal.current.copy(group.current.worldToLocal(world.clone()));
  });

  return <group ref={group}>{children}</group>;
}

export function ParticleField({ quality = "high" }: { quality?: "high" | "low" }) {
  const particleCount = quality === "high" ? 1000 : 380;
  const nodeCount = quality === "high" ? 70 : 38;

  const mouseNdc = useWindowMouse();
  const mouseLocal = useRef(new THREE.Vector3().copy(FAR_AWAY));

  return (
    <Rig mouseNdc={mouseNdc} mouseLocal={mouseLocal}>
      <GlowParticles count={particleCount} mouseRef={mouseLocal} />
      <Constellation count={nodeCount} mouseRef={mouseLocal} />
    </Rig>
  );
}
