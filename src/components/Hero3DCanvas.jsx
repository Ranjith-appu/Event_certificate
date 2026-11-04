import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useHackathon } from '../context/HackathonContext';

const Hero3DCanvas = () => {
  const mountRef = useRef(null);
  const { reducedMotion } = useHackathon();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer with High Performance & Precision
    const width = currentMount.clientWidth || 520;
    const height = currentMount.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 19);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    // Group for the entire 3D centerpiece
    const centerpieceGroup = new THREE.Group();
    scene.add(centerpieceGroup);

    // 1. Futuristic Rocket Model (High-Tech Procedural Aerospace Mesh)
    const rocketGroup = new THREE.Group();

    // Rocket Fuselage (Multi-stage tapered cylindrical hull)
    const bodyGeom = new THREE.CylinderGeometry(0.75, 1.35, 4.6, 48);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x072863,
      metalness: 0.92,
      roughness: 0.22,
      emissive: 0x011336,
      emissiveIntensity: 0.35
    });
    const rocketBody = new THREE.Mesh(bodyGeom, bodyMat);
    rocketGroup.add(rocketBody);

    // Mid-hull Metallic Band (Electric Cyan Trim)
    const trimGeom = new THREE.CylinderGeometry(1.06, 1.1, 0.2, 48);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x00d2ff,
      emissiveIntensity: 0.6
    });
    const trimRing = new THREE.Mesh(trimGeom, trimMat);
    trimRing.position.y = 0.2;
    rocketGroup.add(trimRing);

    // Rocket Nosecone (Aerodynamic high-speed tip with beveled glow)
    const noseGeom = new THREE.ConeGeometry(0.75, 2.4, 48);
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      metalness: 0.88,
      roughness: 0.15,
      emissive: 0x0099cc,
      emissiveIntensity: 0.7
    });
    const noseCone = new THREE.Mesh(noseGeom, noseMat);
    noseCone.position.y = 3.5;
    rocketGroup.add(noseCone);

    // Cockpit Viewport (Sleek dark mirrored glass)
    const windowGeom = new THREE.SphereGeometry(0.48, 24, 24);
    const windowMat = new THREE.MeshPhysicalMaterial({ 
      color: 0x00f0ff,
      metalness: 0.9,
      roughness: 0.05,
      transmission: 0.6,
      transparent: true,
      opacity: 0.95
    });
    const cockpitWindow = new THREE.Mesh(windowGeom, windowMat);
    cockpitWindow.scale.set(0.75, 1.15, 0.35);
    cockpitWindow.position.set(0, 1.2, 1.22);
    rocketGroup.add(cockpitWindow);

    // Stabilizing Aerospace Fins (4 Chamfered swept wings)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(1.7, -1.0);
    finShape.lineTo(1.7, -2.1);
    finShape.lineTo(0, -1.4);
    finShape.closePath();

    const finExtrudeSettings = { 
      depth: 0.08, 
      bevelEnabled: true, 
      bevelSegments: 2, 
      steps: 1, 
      bevelSize: 0.04, 
      bevelThickness: 0.04 
    };
    const finGeom = new THREE.ExtrudeGeometry(finShape, finExtrudeSettings);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x0047ab,
      emissiveIntensity: 0.4
    });

    for (let i = 0; i < 4; i++) {
      const finMesh = new THREE.Mesh(finGeom, finMat);
      finMesh.rotation.y = (i * Math.PI) / 2;
      finMesh.position.y = -0.7;
      rocketGroup.add(finMesh);
    }

    // Engine Thruster Exhaust Nozzle
    const nozzleGeom = new THREE.CylinderGeometry(1.05, 1.45, 0.9, 48);
    const nozzleMat = new THREE.MeshStandardMaterial({
      color: 0x030d1d,
      metalness: 0.98,
      roughness: 0.35
    });
    const nozzle = new THREE.Mesh(nozzleGeom, nozzleMat);
    nozzle.position.y = -2.7;
    rocketGroup.add(nozzle);

    // Ethereal Plasma Plume (Smooth glowing gradient thruster)
    const flameGeom = new THREE.ConeGeometry(0.85, 3.0, 32);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const flame = new THREE.Mesh(flameGeom, flameMat);
    flame.rotation.x = Math.PI;
    flame.position.y = -4.3;
    rocketGroup.add(flame);

    // Position & angle the rocket gracefully (Brochure flight vector)
    rocketGroup.rotation.z = -0.42;
    rocketGroup.rotation.x = 0.22;
    rocketGroup.scale.set(1.08, 1.08, 1.08);
    centerpieceGroup.add(rocketGroup);

    // 2. High-Tech Concentric Digital Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({ 
      color: 0x00f0ff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.45 
    });
    const ringGeom1 = new THREE.TorusGeometry(4.3, 0.028, 16, 120);
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    centerpieceGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ 
      color: 0x38bdf8, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });
    const ringGeom2 = new THREE.TorusGeometry(5.4, 0.02, 16, 120);
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI / 3.6;
    centerpieceGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({ 
      color: 0xffd700, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.25 
    });
    const ringGeom3 = new THREE.TorusGeometry(6.2, 0.015, 16, 120);
    const ring3 = new THREE.Mesh(ringGeom3, ringMat3);
    ring3.rotation.x = -Math.PI / 3.2;
    centerpieceGroup.add(ring3);

    // 3. Subtle Floating Ambient Data Motes
    const moteCount = 65;
    const moteGeom = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    const moteColors = new Float32Array(moteCount * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cBlue = new THREE.Color(0x0047ab);
    const cGold = new THREE.Color(0xffd700);

    for (let i = 0; i < moteCount; i++) {
      const rad = 3.8 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      motePos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
      motePos[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      motePos[i * 3 + 2] = rad * Math.cos(phi);

      const col = Math.random() > 0.75 ? cGold : (Math.random() > 0.45 ? cCyan : cBlue);
      moteColors[i * 3] = col.r;
      moteColors[i * 3 + 1] = col.g;
      moteColors[i * 3 + 2] = col.b;
    }

    moteGeom.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    moteGeom.setAttribute('color', new THREE.BufferAttribute(moteColors, 3));

    const moteMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const motes = new THREE.Points(moteGeom, moteMat);
    centerpieceGroup.add(motes);

    // Studio Lighting Configuration
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    keyLight.position.set(12, 10, 14);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0033aa, 1.8);
    fillLight.position.set(-12, -6, -8);
    scene.add(fillLight);

    const rimGoldLight = new THREE.PointLight(0xffd700, 1.2, 25);
    rimGoldLight.position.set(2, 4, 6);
    scene.add(rimGoldLight);

    // Mouse Tracking with Smooth Damping (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = Math.max(-1, Math.min(1, x));
      mouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Professional Easing
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        // Subtle, smooth sinusoidal floating (period ~7.8s)
        centerpieceGroup.position.y = Math.sin(elapsed * 0.8) * 0.22;

        // Elegant, slow orbital rotations (no dizzying spin)
        ring1.rotation.z = elapsed * 0.12;
        ring2.rotation.x = elapsed * -0.09;
        ring3.rotation.y = elapsed * 0.07;
        motes.rotation.y = elapsed * 0.04;

        // Smooth breathing plasma plume (gentle pulsing, no strobe)
        const pulse = Math.sin(elapsed * 3.5);
        flame.scale.y = 1 + pulse * 0.08;
        flame.scale.x = 1 - pulse * 0.03;
        flame.scale.z = 1 - pulse * 0.03;
        flame.material.opacity = 0.72 + pulse * 0.1;

        // Damped mouse follow: silky 0.025 interpolation
        targetRotationY = mouseX * 0.28;
        targetRotationX = mouseY * 0.2;
        centerpieceGroup.rotation.y += (targetRotationY - centerpieceGroup.rotation.y) * 0.025;
        centerpieceGroup.rotation.x += (targetRotationX - centerpieceGroup.rotation.x) * 0.025;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[460px] md:h-[520px] flex items-center justify-center pointer-events-auto select-none">
      {/* Soft atmospheric radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/12 via-blue-600/8 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

export default Hero3DCanvas;
