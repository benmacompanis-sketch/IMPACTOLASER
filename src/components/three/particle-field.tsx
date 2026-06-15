"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
 * Glowing particle cloud (soft additive discs) with gentle drift + twinkle.
 * ────────────────────────────────────────────────────────────────────────── */
function GlowParticles({ count }: { count: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute in a wide, deep slab for a sense of space.
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
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          count={count}
          array={seeds}
          itemSize={1}
        />
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
          attribute float aSeed;
          varying float vTwinkle;
          void main() {
            vec3 p = position;
            // slow organic drift
            p.x += sin(uTime * 0.15 + aSeed) * 0.4;
            p.y += cos(uTime * 0.12 + aSeed * 1.3) * 0.4;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            vTwinkle = 0.55 + 0.45 * sin(uTime * 1.2 + aSeed * 5.0);
            gl_PointSize = uSize * vTwinkle * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vTwinkle;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d);
            vec3 color = mix(uColorA, uColorB, smoothstep(0.0, 0.15, 0.18 - d) * vTwinkle);
            gl_FragColor = vec4(color, alpha * 0.85 * vTwinkle);
          }
        `}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Constellation: nodes drifting in 3D, connected by fading lines when close —
 * the "líneas conectadas / energía azul" network.
 * ────────────────────────────────────────────────────────────────────────── */
function Constellation({ count }: { count: number }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const maxConnections = count * count;
  const maxLineVerts = maxConnections * 2;

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
      linePositions: new Float32Array(maxLineVerts * 3),
      lineColors: new Float32Array(maxLineVerts * 3),
    };
  }, [count, maxLineVerts]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const { nodes, velocities, linePositions, lineColors } = data;
    const limit = { x: 9, y: 5.5, z: 4 };

    // integrate + bounce inside the slab
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      nodes[ix] += velocities[ix] * dt * 60 * 0.016;
      nodes[ix + 1] += velocities[ix + 1] * dt * 60 * 0.016;
      nodes[ix + 2] += velocities[ix + 2] * dt * 60 * 0.016;
      if (nodes[ix] > limit.x || nodes[ix] < -limit.x) velocities[ix] *= -1;
      if (nodes[ix + 1] > limit.y || nodes[ix + 1] < -limit.y) velocities[ix + 1] *= -1;
      if (nodes[ix + 2] > limit.z - 2 || nodes[ix + 2] < -limit.z - 2)
        velocities[ix + 2] *= -1;
    }

    // build line segments between nearby nodes
    let v = 0;
    const maxDist = 3.4;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = nodes[i * 3] - nodes[j * 3];
        const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
        const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          const a = 1 - dist / maxDist;
          linePositions[v * 3] = nodes[i * 3];
          linePositions[v * 3 + 1] = nodes[i * 3 + 1];
          linePositions[v * 3 + 2] = nodes[i * 3 + 2];
          linePositions[(v + 1) * 3] = nodes[j * 3];
          linePositions[(v + 1) * 3 + 1] = nodes[j * 3 + 1];
          linePositions[(v + 1) * 3 + 2] = nodes[j * 3 + 2];
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
          <bufferAttribute
            attach="attributes-position"
            count={maxLineVerts}
            array={data.linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLineVerts}
            array={data.lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={data.nodes}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#9ec8ff"
          size={0.06}
          sizeAttenuation
          transparent
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Rig: eases the whole scene toward the pointer for soft parallax depth.
 * ────────────────────────────────────────────────────────────────────────── */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.12,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.08,
      0.04
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      pointer.x * 0.6,
      0.04
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      pointer.y * 0.4,
      0.04
    );
  });

  return <group ref={group}>{children}</group>;
}

export function ParticleField({ quality = "high" }: { quality?: "high" | "low" }) {
  const particleCount = quality === "high" ? 1300 : 500;
  const nodeCount = quality === "high" ? 80 : 42;

  return (
    <>
      <Rig>
        <GlowParticles count={particleCount} />
        <Constellation count={nodeCount} />
      </Rig>
    </>
  );
}
