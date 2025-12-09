import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

import { scene, camera, create_texture } from "../../scene.js";

const light_positions = [
    [-30, 35, 0],
    [0, 35, 0],
    [30, 35, 0],

    [-30, 35, -40],
    [0, 35, -40],
    [30, 35, -40],

    // [-30, 35, 40],
    // [0, 35, 40],
    // [30, 35, 40],
];

const barLights = new THREE.Group();

const width = 15;
const height = .3;
const depth = .7;

const bar = new THREE.BoxGeometry(width, height, depth);
const barMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
const barMesh = new THREE.Mesh(bar, barMat);
barMesh.position.set(2.5, 37, 0);

barLights.add(barMesh);
 
// for (const position of light_positions) {
//     const pointLight = new THREE.PointLight( 0xffffff, 700, 0 );
//     pointLight.position.set( ...position );
//     pointLight.castShadow = true;
//     scene.add( pointLight );
// }



const radius = .25;
const lightSegs = 25;
const length = 14.5;
const lights = new THREE.CylinderGeometry(radius, radius, length, lightSegs);
const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const lightMesh = new THREE.Mesh(lights, lightMat);

const numOfLights = 7;
for (let i = 0; i < numOfLights; i++){
    const pointLight = new THREE.PointLight(0xffffff, 3, 35);
    pointLight.castShadow = false;
    const distance = (i / (numOfLights - 1)) - .5;
    pointLight.position.set(0, distance * length, 0);
    // const distance = length/numOfLights;
    // pointLight.position.set(0, distance*i, 0);
    lightMesh.add(pointLight);
}

lightMesh.rotation.x = Math.PI / 2;
lightMesh.rotation.z = Math.PI / 2;
lightMesh.position.set(2.5, 36.8, 0);

barLights.add(lightMesh);

barLights.position.y = .1;
scene.add(barLights);