/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

export const pencilLength = 4;
const width = 0.25;

const eraser_portion = 0.09;
const tip_portion = 0.15;

const eraser_length = pencilLength * eraser_portion;
const tip_length = pencilLength * tip_portion;

const eraser = new THREE.Shape();
eraser.moveTo(0, pencilLength);
eraser.lineTo(width / 2, pencilLength);
eraser.lineTo(width / 2, pencilLength - eraser_length);

const wood = new THREE.Shape();
wood.moveTo(width / 2, pencilLength - eraser_length);
wood.lineTo(width / 2, tip_length);

const tip = new THREE.Shape();
tip.moveTo(width / 2, tip_length);
tip.lineTo(0, 0);

const eraser_geom = new THREE.LatheGeometry(eraser.getPoints(), 20);
const wood_geom = new THREE.LatheGeometry(wood.getPoints(), 20);
const tip_geom = new THREE.LatheGeometry(tip.getPoints(), 20);

const eraser_mat = new THREE.MeshStandardMaterial({ color: 0xD2B1B5, side: THREE.BackSide });
const wood_mat = new THREE.MeshStandardMaterial({ color: 0xffb605, side: THREE.BackSide });
const tip_mat = new THREE.MeshStandardMaterial({ color: 0xEDB560, side: THREE.BackSide });

const eraser_mesh = new THREE.Mesh(eraser_geom, eraser_mat);
const wood_mesh = new THREE.Mesh(wood_geom, wood_mat);
const tip_mesh = new THREE.Mesh(tip_geom, tip_mat);

const pencil = new THREE.Group();

eraser_mesh.castShadow = true;
eraser_mesh.receiveShadow = true;
pencil.add(eraser_mesh);

wood_mesh.castShadow = true;
wood_mesh.receiveShadow = true;
pencil.add(wood_mesh);

tip_mesh.castShadow = true;
tip_mesh.receiveShadow = true;
pencil.add(tip_mesh);

export { pencil };