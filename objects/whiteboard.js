/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import * as THREE_ADDON from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, camera, create_material_from_texture } from "../scene.js";

const width = 80;
const height = 30;
const y_offset = 5;
const x_offset = 10;

const geometry = new THREE.PlaneGeometry( width, height );
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, metalness: 0.0, roughness: 0.2 });
const whiteboard = new THREE.Mesh(geometry, material);

const holder_depth = 1;
const holder_height = 1;

const holder_points = [
    -width / 2, 0, 0, // 0
    -width / 2, -holder_height, 0, // 1
    -width / 2, -holder_height, -holder_depth, // 2
    -width / 2, -holder_height / 2, -holder_depth, // 3
    
    width / 2, 0, 0, // 4
    width / 2, -holder_height, 0, // 5
    width / 2, -holder_height, -holder_depth, // 6
    width / 2, -holder_height / 2, -holder_depth, // 7
]

const indicies = [
    0, 4, 5,
    0, 5, 1,

    1, 5, 6,
    1, 6, 2,

    3, 7, 6,
    3, 6, 2,
];

const holder_geometry = new THREE.BufferGeometry();

holder_geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(holder_points), 3 ) );

holder_geometry.setIndex( indicies );
holder_geometry.computeVertexNormals();

let holder_mat = create_material_from_texture("./textures/Metal", 0xb4b5b7);//new THREE.MeshStandardMaterial( { color: 0x848681, metalness: 0.7, roughness: 0.5, side: THREE.DoubleSide } );
holder_mat.displacementMap = null;
holder_mat.side = THREE.DoubleSide;
//const material = new THREE.MeshBasicMaterial( { color: 0x848681, metalness: 1, roughness: 0.5 } );
const holder = new THREE.Mesh(holder_geometry, holder_mat);

whiteboard.position.set(x_offset, -2 + height / 2 + y_offset, 58);
holder.position.set(x_offset, -2 + y_offset, 58);

scene.add(whiteboard);
scene.add(holder);

/*
const plane_geom = new THREE.BoxGeometry(width, 10);
const plane_mat = new THREE.MeshStandardMaterial({transparent: false, opacity: 0.5});
const plane = new THREE.Mesh(plane_geom, plane_mat);

plane.castShadow = false;
plane.receiveShadow = true;

plane.position.set(x_offset, -2 + y_offset - 2, 55);
scene.add(plane);*/