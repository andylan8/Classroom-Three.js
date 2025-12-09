import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

const loader = new THREE.TextureLoader();
const podium_texture = loader.load('./textures/podium.jpg');

const podium = new THREE.Group();

const width = 5;
const height = 7;
const depth = .2;

const leftSide = new THREE.BoxGeometry(width, height, depth);
const rightSide = new THREE.BoxGeometry(width, height, depth);
const backSide = new THREE.BoxGeometry(width-1, height, depth);
const wallMat = new THREE.MeshStandardMaterial({ map: podium_texture, color: 0x964B00 });

const left = new THREE.Mesh(leftSide, wallMat);
left.rotation.y = Math.PI / 2;
left.position.set(14, 0, 0);
const right = new THREE.Mesh(rightSide, wallMat);
right.rotation.y = Math.PI / 2;
right.position.set(18, 0, 0);
const back = new THREE.Mesh(backSide, wallMat);
back.position.set(16, 0, -2.5);

podium.add(left);
podium.add(right);
podium.add(back);

const flatRestWidth = 4;
const flatRestHeight = .05;
const flatRestDepth = 4.5;

const support = new THREE.BoxGeometry(flatRestWidth, flatRestHeight, flatRestDepth);
const top = new THREE.BoxGeometry(flatRestWidth, flatRestHeight, flatRestDepth);
const supportMat = new THREE.MeshStandardMaterial({ map: podium_texture, color: 0x964B00 });
const topMat = new THREE.MeshStandardMaterial({ map: podium_texture, color: 0x964B00 });
const topMesh = new THREE.Mesh(top, topMat);
const supportMesh = new THREE.Mesh(support, supportMat);
topMesh.position.set(16, 3, 0);
podium.add(topMesh);
supportMesh.position.set(16, 2, 0);
podium.add(supportMesh);
podium.position.set(20, 3, 45);

scene.add(podium);