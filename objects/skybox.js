import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import * as THREE_ADDON from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

const loader = new THREE_ADDON.EXRLoader();
const texture = loader.load( './textures/day2.exr' );

const skyboxGeo = new THREE.BoxGeometry(6000, 6000, 6000);
const skyboxMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

const skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);
scene.add(skybox);