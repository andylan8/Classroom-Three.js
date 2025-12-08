/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import { Water } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, create_material_from_texture, create_shape_from_verticies } from "../scene.js";

const trash_verts = [
    [0.01171875, 0.4372395873069763],
    [0.4140625, 0.4372395873069763],
    [0.66796875, 0.4372395873069763],
    [0.66796875, 0.1664062738418579],
    [0.1953125, 0.1664062738418579],
    [0.1953125, -1],
    [0.5625, -1],
    [0.5625, -0.00026041269302368164],
    [0.66796875, -0.00026041269302368164],
    [0.66796875, -1],
    [0.56640625, -1],
];


const trashcan_shape = create_shape_from_verticies(trash_verts, 3, 5);

const trashcan_geom = new THREE.LatheGeometry(trashcan_shape.getPoints(), 4);

const trashcan_mat = create_material_from_texture("./textures/Plastic", 0x303030);//new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
trashcan_mat.side = THREE.DoubleSide;
trashcan_mat.displacementMap = null;

const trashcan = new THREE.Mesh(trashcan_geom, trashcan_mat);

trashcan.castShadow = true;
trashcan.receiveShadow = false;

trashcan.position.set(-50, 3.5, -50);
trashcan.rotateY(Math.PI / 4);

scene.add(trashcan);