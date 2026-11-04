import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useHackathon } from '../context/HackathonContext';

const Prize3DCanvas = () => {
  const mountRef = useRef(null);
  const { reducedMotion } = useHackathon();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 360;
    const height = currentMount.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);

    const trophyGroup = new THREE.Group();
    scene.add(trophyGroup);

    // Highly polished metallic gold shader
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.94,
      roughness: 0.18,
      emissive: 0x4a3700,
      emissiveIntensity: 0.22
    });

    const darkBaseMat = new THREE.MeshStandardMaterial({
      color: 0x050e1f,
      metalness: 0.85,
      roughness: 0.28,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.15
    });

    // 1. Trophy Base (Hexagonal Pedestal)
    const baseGeom = new THREE.CylinderGeometry(1.5, 1.8, 0.8, 6);
    const baseMesh = new THREE.Mesh(baseGeom, darkBaseMat);
    baseMesh.position.y = -2.6;
    trophyGroup.add(baseMesh);

    // 2. Gold Trim on Base
    const baseRingGeom = new THREE.CylinderGeometry(1.54, 1.54, 0.15, 6);
    const baseRing = new THREE.Mesh(baseRingGeom, goldMat);
    baseRing.position.y = -2.15;
    trophyGroup.add(baseRing);

    // 3. Trophy Stem
    const stemGeom = new THREE.CylinderGeometry(0.3, 0.48, 1.2, 24);
    const stemMesh = new THREE.Mesh(stemGeom, goldMat);
    stemMesh.position.y = -1.5;
    trophyGroup.add(stemMesh);

    // 4. Central Cup
    const cupGeom = new THREE.CylinderGeometry(1.6, 0.5, 2.2, 48);
    const cupMesh = new THREE.Mesh(cupGeom, goldMat);
    cupMesh.position.y = 0.1;
    trophyGroup.add(cupMesh);

    // Cup Rim
    const rimGeom = new THREE.TorusGeometry(1.6, 0.11, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeom, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.2;
    trophyGroup.add(rimMesh);

    // 5. Dual Handles
    const handleGeom = new THREE.TorusGeometry(0.8, 0.09, 16, 32, Math.PI * 1.2);
    
    const handleLeft = new THREE.Mesh(handleGeom, goldMat);
    handleLeft.position.set(-1.6, 0.3, 0);
    handleLeft.rotation.z = Math.PI / 3;
    trophyGroup.add(handleLeft);

    const handleRight = new THREE.Mesh(handleGeom, goldMat);
    handleRight.position.set(1.6, 0.3, 0);
    handleRight.rotation.z = -Math.PI / 3;
    handleRight.rotation.y = Math.PI;
    trophyGroup.add(handleRight);

    // 6. Subtle Floating Ambient Gold Dust
    const sparkleCount = 35;
    const sparkleGeom = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      sparklePos[i * 3] = (Math.random() - 0.5) * 4.5;
      sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      sparklePos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    sparkleGeom.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));

    const sparkleMat = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffe680,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const sparkles = new THREE.Points(sparkleGeom, sparkleMat);
    trophyGroup.add(sparkles);

    // Studio Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambLight);

    const goldKeyLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    goldKeyLight.position.set(6, 8, 8);
    scene.add(goldKeyLight);

    const cyanFillLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    cyanFillLight.position.set(-6, -3, -5);
    scene.add(cyanFillLight);

    // Mouse Interaction
    let mouseX = 0;
    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
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

    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        // Slow, regal, professional floating & turning
        trophyGroup.position.y = Math.sin(elapsed * 1.0) * 0.12;
        trophyGroup.rotation.y = elapsed * 0.32 + mouseX * 0.25;
        sparkles.rotation.y = elapsed * -0.15;
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
    <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto flex items-center justify-center pointer-events-auto select-none">
      <div className="absolute inset-0 bg-yellow-500/8 rounded-full filter blur-2xl pointer-events-none -z-10" />
      <div ref={mountRef} className="w-full h-full cursor-grab" />
    </div>
  );
};

export default Prize3DCanvas;
