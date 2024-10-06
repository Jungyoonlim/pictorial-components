import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ThreeDProjectVisualizer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;
    let labelRenderer: any;
    let controls: any;

    const init = async () => {
      const OrbitControls = (await import('three/examples/jsm/controls/OrbitControls')).OrbitControls;
      const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer');

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // CSS2D Renderer for labels
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      mountRef.current.appendChild(labelRenderer.domElement);

      // Orbit controls
      controls = new OrbitControls(camera, labelRenderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Helper functions
      const createSphere = (color: number, position: [number, number, number]) => {
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...position);
        return sphere;
      };

      const createLabel = (text: string, position: [number, number, number]) => {
        const div = document.createElement('div');
        div.className = 'label';
        div.textContent = text;
        div.style.marginTop = '-1em';
        const label = new CSS2DObject(div);
        label.position.set(...position);
        return label;
      };

      const createConnection = (start: [number, number, number], end: [number, number, number]) => {
        const points = [
          new THREE.Vector3(...start),
          new THREE.Vector3(...end)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        return new THREE.Line(geometry, material);
      };

      // Create project structure
      const frontend = createSphere(0x00ff00, [0, 2, 0]);
      scene.add(frontend);
      scene.add(createLabel('Frontend', [0, 2.7, 0]));

      const backend = createSphere(0x0000ff, [0, 0, 0]);
      scene.add(backend);
      scene.add(createLabel('Backend', [0, 0.7, 0]));

      const database = createSphere(0xff0000, [0, -2, 0]);
      scene.add(database);
      scene.add(createLabel('Database', [0, -1.3, 0]));

      const api = createSphere(0xffff00, [-2, 0, 0]);
      scene.add(api);
      scene.add(createLabel('API', [-2, 0.7, 0]));

      // Create connections
      scene.add(createConnection([0, 2, 0], [0, 0, 0]));  // Frontend to Backend
      scene.add(createConnection([0, 0, 0], [0, -2, 0])); // Backend to Database
      scene.add(createConnection([0, 0, 0], [-2, 0, 0])); // Backend to API

      // Position camera
      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
      };
      animate();
    };

    init();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      {hoveredElement && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}>
          {hoveredElement}
        </div>
      )}
    </div>
  );
};

export default ThreeDProjectVisualizer;