const canvas = document.getElementById("bg3d");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  1,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});

renderer.setSize(520, 520);
renderer.setPixelRatio(window.devicePixelRatio);

// Geometry: aesthetic, not random
const geometry = new THREE.TorusKnotGeometry(10, 3, 140, 16);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xa855f7,
  roughness: 0.25,
  metalness: 0.4,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  transparent: true,
  opacity: 0.9
});

const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Soft light (important)
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(20, 20, 20);
scene.add(light);

camera.position.z = 40;

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.002;
  knot.rotation.y += 0.003;
  renderer.render(scene, camera);
}

animate();