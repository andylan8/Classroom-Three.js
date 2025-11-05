import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "http://127.0.0.1:5500/scene.js";


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);