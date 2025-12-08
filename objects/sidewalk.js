/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import * as THREE_ADDON from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, camera, create_material_from_texture } from "../scene.js";

const width = 66;
let length = 1000;
const thickness = 2;

const geometry = new THREE.BoxGeometry( width, length, thickness );
let mat1 = create_material_from_texture("./textures/Stone", 0xC3C3B7);
let mat2 = create_material_from_texture("./textures/Stone", 0xC3C3B7);
let mat3 = create_material_from_texture("./textures/Stone", 0xC3C3B7);
let mat4 = create_material_from_texture("./textures/Stone", 0xC3C3B7);

mat1.displacementMap = null;
mat1.roughnessMap = null;
mat2.displacementMap = null;
mat2.roughnessMap = null;
mat3.displacementMap = null;
mat3.roughnessMap = null;
mat4.displacementMap = null;
mat4.roughnessMap = null;

mat1.map.wrapS = THREE.RepeatWrapping;
mat1.map.wrapT = THREE.RepeatWrapping;

mat2.map.wrapS = THREE.RepeatWrapping;
mat2.map.wrapT = THREE.RepeatWrapping;

mat3.map.wrapS = THREE.RepeatWrapping;
mat3.map.wrapT = THREE.RepeatWrapping;

mat4.map.wrapS = THREE.RepeatWrapping;
mat4.map.wrapT = THREE.RepeatWrapping;

mat1.map.repeat.set( 3.5, 40 );
mat2.map.repeat.set( 3.5, 20 );
mat3.map.repeat.set( 3.5, 14 );
mat4.map.repeat.set( 1, 2.5 );

const sidewalk = new THREE.Mesh(geometry, mat1);
geometry.rotateX(-Math.PI / 2);
sidewalk.translateY(-2.9);
sidewalk.translateX(-120);
scene.add(sidewalk);

length = 500 + 120 - width / 2;
const sidewalk2 = sidewalk.clone();
sidewalk2.geometry = new THREE.BoxGeometry(width, length, thickness);
sidewalk2.geometry.rotateX(-Math.PI / 2);
sidewalk2.material = mat2;
sidewalk2.translateZ(140);
sidewalk2.translateX(length / 2 + width / 2);
sidewalk2.rotateY(Math.PI / 2);
scene.add(sidewalk2);

length = 500 - 120 - width / 2;
const sidewalk3 = sidewalk.clone();
sidewalk3.geometry = new THREE.BoxGeometry(width, length, thickness);
sidewalk3.geometry.rotateX(-Math.PI / 2);
sidewalk3.material = mat3;
sidewalk3.translateZ(140);
sidewalk3.translateX(-length / 2 - width / 2);
sidewalk3.rotateY(Math.PI / 2);
scene.add(sidewalk3);

length = 140 - width / 2 - 60;
const sidewalk_connection = sidewalk.clone();
sidewalk_connection.geometry = new THREE.BoxGeometry(width / 2, length, thickness);
sidewalk_connection.geometry.rotateX(-Math.PI / 2);
sidewalk_connection.material = mat4;
sidewalk_connection.translateZ(60 + length / 2);
sidewalk_connection.translateX(120 - 33 - width / 8);
//sidewalk_connection.rotateY(Math.PI / 2);
scene.add(sidewalk_connection);