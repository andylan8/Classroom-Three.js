/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

function createLeg() {
    const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 32 );
    const material = new THREE.MeshStandardMaterial( { color: 0xb4b5b7, metalness: 0.6, roughness: 0.4 } );
    const cylinder = new THREE.Mesh( geometry, material );

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    return cylinder;
}

let chair = new THREE.Group();

let leg1 = createLeg();
leg1.position.set(0.5, 0.5, 0.5);
chair.add( leg1 );

let leg2 = createLeg();
leg2.position.set(-0.5, 0.5, 0.5);
chair.add( leg2 );

let leg3 = createLeg();
leg3.position.set(0.5, 0.5, -0.5);
chair.add( leg3 );

let leg4 = createLeg();
leg4.position.set(-0.5, 0.5, -0.5);
chair.add( leg4 );

const length = 1, width = 0.05;
const shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, width );
shape.lineTo( length, width );
shape.lineTo( length, 0 );
shape.lineTo( 0, 0 );

const seat = new THREE.ExtrudeGeometry( shape );
const seatMaterial = new THREE.MeshStandardMaterial( { color: 0x202020, metalness: 0 } );
let seatMesh = new THREE.Mesh( seat, seatMaterial );
seatMesh.position.set(-length/2, 1.1, -length/2);

seatMesh.castShadow = true;
seatMesh.receiveShadow = true;

chair.add( seatMesh );

let backrest = new THREE.BoxGeometry(1.2, 1.7, 0.2);
let backrestMaterial = new THREE.MeshStandardMaterial( { color: 0x303030 } );
let backrestMesh = new THREE.Mesh( backrest, backrestMaterial );
backrestMesh.position.set(0, 2.1, -0.5);

backrestMesh.castShadow = true;
backrestMesh.receiveShadow = true;

chair.add( backrestMesh );

export { chair };