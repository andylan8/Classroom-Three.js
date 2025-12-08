/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import * as THREE_ADDON from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, camera, create_material_from_texture } from "../scene.js";

const width = 1000;
const height = 1000;

const geometry = new THREE.PlaneGeometry( width, height );
let material = create_material_from_texture("./textures/Grass");
material.normalMap = null;
material.roughnessMap = null;

material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set( 20, 20 );

const grass = new THREE.Mesh(geometry, material);
geometry.rotateX(-Math.PI / 2);
grass.translateY(-3);
scene.add(grass);