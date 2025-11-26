/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/controls/OrbitControls.js";

import { doorPivot } from "./objects/door.js";
const projection_size = 10;

export const scene = new THREE.Scene();
//export const camera = new THREE.OrthographicCamera(window.innerWidth / -projection_size, window.innerWidth / projection_size, window.innerHeight / projection_size, window.innerHeight / -projection_size, 0.1, 10000);
//export const camera = new THREE.OrthographicCamera(-20, 20, 20,-20, -60, 60);
export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10, 4, -10);
camera.lookAt(0, 4, 60);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.update();

const loader = new THREE.TextureLoader();
const tile_tex = loader.load('./textures/tiles.jpg');
const tile_tex_norm = loader.load('./textures/tiles_norm.jpg');
const tile_tex_rough = loader.load('./textures/tiles_rough.jpg');
const tile_tex_disp = loader.load('./textures/tiles_disp.jpg');
const ground_mat = new THREE.MeshStandardMaterial( { map:tile_tex, normalMap: tile_tex_norm, roughnessMap: tile_tex_rough, displacementMap: tile_tex_disp } );

tile_tex.wrapS = THREE.RepeatWrapping;
tile_tex.wrapT = THREE.RepeatWrapping;
tile_tex.repeat.set( 4, 4 );

const ground = new THREE.Mesh(new THREE.BoxGeometry(120, 0.5, 120), ground_mat);
ground.position.y = -2;

ground.castShadow = false;
ground.receiveShadow = true;

scene.add(ground);
scene.add(doorPivot);


var isOpen = false;

function animate() {
  requestAnimationFrame(animate);
  if (isOpen && doorPivot.rotation.y > Math.PI / 2) {
    doorPivot.rotation.y -= .02;
  }
  if (!isOpen && doorPivot.rotation.y < (2*Math.PI/2)) {
    doorPivot.rotation.y += .02;
  }
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener("keydown", function (event) {
  if (event.key == "A" || event.key == "a") {
    isOpen = !isOpen;
  }
});
