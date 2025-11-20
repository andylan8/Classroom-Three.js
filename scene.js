import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/controls/OrbitControls.js";

export const scene = new THREE.Scene();
export const camera = new THREE.OrthographicCamera(-20, 20, 20,-20, -60, 60);
camera.position.set(12, 5, 14);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.update();

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const hemi = new THREE.HemisphereLight(0xffffff, 0x334455, 0.5);
hemi.position.set(0, 10, 0);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(10, 12, 6);
scene.add(dir);

const matDarkGrey  = new THREE.MeshBasicMaterial({ color: 0x444b52 });
const matLightGrey = new THREE.MeshBasicMaterial({ color: 0xa0a8b0 });
const matAccent    = new THREE.MeshBasicMaterial({ color: 0xf0c040 });
const matBlue      = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
const matBlack     = new THREE.MeshBasicMaterial({ color: 0x111111 });

const matPlatform  = new THREE.MeshStandardMaterial({ color: 0x7a7f85, metalness: 0.2, roughness: 0.8 });
const matEdge      = new THREE.MeshStandardMaterial({ color: 0xd9a441, metalness: 0.1, roughness: 0.6 });
const matWood      = new THREE.MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.75, metalness: 0.05 });
const matGreen     = new THREE.MeshStandardMaterial({ color: 0x1b5e3a, roughness: 0.4, metalness: 0.8 });

const ground = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 20), matBlue);
ground.position.y = -2;
scene.add(ground);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
