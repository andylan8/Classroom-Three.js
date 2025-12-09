/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

import { doorPivot } from "./objects/door.js";
import { water, fountain } from "./objects/fountain.js";
const projection_size = 10;

export const scene = new THREE.Scene();
//export const camera = new THREE.OrthographicCamera(window.innerWidth / -projection_size, window.innerWidth / projection_size, window.innerHeight / projection_size, window.innerHeight / -projection_size, 0.1, 10000);
//export const camera = new THREE.OrthographicCamera(-20, 20, 20,-20, -60, 60);
export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(-44.173097, 12.2876946, -27.2086932);
camera.rotation.set(-2.9906, -0.661496, -3.048398);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

const ground_mat = create_material_from_texture("./textures/Floor", 0xD1C5B7);

ground_mat.map = ground_mat.displacementMap;

ground_mat.map.wrapS = THREE.RepeatWrapping;
ground_mat.map.wrapT = THREE.RepeatWrapping;
ground_mat.map.repeat.set( 8, 8 );

const ground = new THREE.Mesh(new THREE.BoxGeometry(120, 0.5, 120), ground_mat);
ground.position.y = -2;

ground.castShadow = false;
ground.receiveShadow = true;

scene.add(ground);
scene.add(doorPivot);
scene.add(fountain);

var isOpen = false;
var restoreRequested = false;

var fountainAudio = new Audio("./audio/fountain.mp3");
var closeDoorAudio = new Audio("./audio/close_door.mp3");
var openDoorAudio = new Audio("./audio/opening_door.mp3");

openDoorAudio.volume = 0.5;
closeDoorAudio.volume = 0.5;

fountainAudio.loop = true;
fountainAudio.volume = 0.0;
fountainAudio.play();

var closedDoor = false;

function animate() {
  requestAnimationFrame(animate);
  if (isOpen && doorPivot.rotation.y > Math.PI / 2) {
    doorPivot.rotation.y -= .02;
    closedDoor = false;
  }

  if (!isOpen && doorPivot.rotation.y < (2*Math.PI/2)) {
    doorPivot.rotation.y += .02;
  } else if (!isOpen && !closedDoor) {
    closeDoorAudio.play();
    closedDoor = true;
  }

  if (restoreRequested) {    
    camera.position.set(-44.173097, 12.2876946, -27.2086932);
    camera.rotation.set(-2.9906, -0.661496, -3.048398);
    doorPivot.rotation.y = Math.PI;
    isOpen = false;
    closedDoor = true;
    restoreRequested = false;
  }

  const distToFountain = camera.position.distanceTo(fountain.position);

  if (distToFountain <= 100.0) {
    const volume = Math.min(Math.max((100.0 - distToFountain) / 100.0, 0.0), 1.0);
    fountainAudio.volume = volume;
  } else {
    fountainAudio.volume = 0.0;
  }

  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.domElement.addEventListener('click', () => {
  controls.lock();
});


window.addEventListener("keydown", function (event) {
  const speedX = 2.5;
  const speedZ = 2.5;
  const speedY = 2.5;

  switch (event.key) {
    case "ArrowUp":
      camera.translateZ(-speedZ);
    break;
    case "ArrowDown":
      camera.translateZ(speedZ);
    break;
    case "ArrowLeft":
      camera.translateX(-speedX);
    break;
    case "ArrowRight":
      camera.translateX(speedX);
    break;
    case "Shift":
      camera.translateY(speedY);
    break;
    case "a":
    case "A":
      if (!isOpen) {
        openDoorAudio.play();
      }

      isOpen = !isOpen;  
      break;
    case "b":
    case "B":
      restoreRequested = true;
      break;
  }
});

export function create_material_from_texture(texture_path, color) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(`${texture_path}/color.jpg`);
  const ambient_occlusion = loader.load(`${texture_path}/ambient_occlusion.jpg`);
  const normal = loader.load(`${texture_path}/normal.jpg`);
  const roughness = loader.load(`${texture_path}/roughness.jpg`);
  const displacement = loader.load(`${texture_path}/displacement.jpg`);
  const metalness = loader.load(`${texture_path}/metalness.jpg`);

  return new THREE.MeshStandardMaterial({
    color: color ? color : 0xffffff,
    map: texture,
    //aoMap: ambient_occlusion,
    normalMap: normal,
    roughnessMap: roughness,
    displacementMap: displacement,
    metalnessMap: metalness,
  });
}

export function create_texture(texture_path) {
  return new THREE.TextureLoader().load(texture_path);
}

export function create_shape_from_verticies(verticies, scaleX, scaleY) {
    const shape = new THREE.Shape();
    shape.moveTo(verticies[0][0] * scaleX, verticies[0][1] * scaleY);

    for (let i = 1; i < verticies.length; ++i) {
        shape.lineTo(verticies[i][0] * scaleX, verticies[i][1] * scaleY);
    }

    return shape;
}