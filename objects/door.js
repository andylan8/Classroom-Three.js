/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */

export var door = new THREE.Group();

const loader = new THREE.TextureLoader();
const texture = loader.load('../textures/wood.jpg');
const texture_norm = loader.load('../textures/wood_norm.jpg');
const texture_rough = loader.load('../textures/wood_rough.jpg');
const wood_material = new THREE.MeshStandardMaterial({ map: texture, normalMap: texture_norm, roughnessMap: texture_rough });

const doorWidth = 6;
const doorHeight = 10;
const doorDepth = .5;
const doorBoard = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth);
const doorMaterial = wood_material;

const doorMesh = new THREE.Mesh(doorBoard, doorMaterial);
doorMesh.position.set(doorWidth / 2, doorHeight / 2, 0);
doorMesh.castShadow = true;
doorMesh.recieveShadow = true;
door.add(doorMesh);


const doorKnobRadius = .2;
const doorKnobWS = 20;
const doorKnobHS = 20;
const doorKnob = new THREE.SphereGeometry(doorKnobRadius, doorKnobWS, doorKnobHS);
const doorKnobMaterial = new THREE.MeshStandardMaterial({ color: 0xb4b5b7, metalness: 0.6, roughness: 0.4 });
const doorKnobMesh1 = new THREE.Mesh(doorKnob, doorKnobMaterial);
doorKnobMesh1.position.set(5.3, 4.5, .5);

const doorKnobMesh2 = new THREE.Mesh(doorKnob, doorKnobMaterial);
doorKnobMesh2.position.set(5.3, 4.5, -.5);
doorKnobMesh1.castShadow = true;
doorKnobMesh1.recieveShadow = true;
doorKnobMesh2.castShadow = true;
doorKnobMesh2.recieveShadow = true;
door.add(doorKnobMesh1);
door.add(doorKnobMesh2);

const bridgeRadius = .15;  
const bridgeHeight = 1;  
const bridgeHS = 30;  
const knobBridge = new THREE.CylinderGeometry(bridgeRadius, bridgeRadius, bridgeHeight, bridgeHS );
const bridgeMaterial = new THREE.MeshStandardMaterial({ color: 0xb4b5b7, metalness: 0.6, roughness: 0.4 });
const bridgeMesh = new THREE.Mesh(knobBridge, bridgeMaterial);
bridgeMesh.rotation.x = Math.PI / 2;
bridgeMesh.position.set(5.3, 4.5, 0);
bridgeMesh.castShadow = true;
bridgeMesh.recieveShadow = true;
door.add(bridgeMesh);

const hingeRadius = .1;  
const hingeHeight = 1;  
const hingeHS = 30;  
const hinge = new THREE.CylinderGeometry(hingeRadius, hingeRadius, hingeHeight, hingeHS );
const hingeMat = new THREE.MeshStandardMaterial({ color: 0xb4b5b7, metalness: 0.6, roughness: 0.4 });

const hingeMesh1 = new THREE.Mesh(hinge, hingeMat);
hingeMesh1.position.set(-.05, 2, .3);
hingeMesh1.castShadow = true;
hingeMesh1.recieveShadow = true;
door.add(hingeMesh1);

const hingeMesh2 = new THREE.Mesh(hinge, hingeMat);
hingeMesh2.position.set(-.05, 5, .3);
hingeMesh2.castShadow = true;
hingeMesh2.recieveShadow = true;
door.add(hingeMesh2);

const hingeMesh3 = new THREE.Mesh(hinge, hingeMat);
hingeMesh3.position.set(-.05, 8, .3);
hingeMesh3.castShadow = true;
hingeMesh3.recieveShadow = true;
door.add(hingeMesh3);

const plateWidth = .3;
const plateHeight = .7;
const plate = new THREE.PlaneGeometry(plateWidth, plateHeight);
const plateMesh = new THREE.MeshStandardMaterial({ color: 0xb4b5b7, metalness: 0.6, roughness: 0.4 });

const plateMesh1 = new THREE.Mesh(plate, plateMesh);
plateMesh1.rotation.y = 3 * Math.PI / 2;
plateMesh1.position.set(-.01, 2, .05);
plateMesh1.castShadow = true;
plateMesh1.recieveShadow = true;
door.add(plateMesh1);

const plateMesh2 = new THREE.Mesh(plate, plateMesh);
plateMesh2.rotation.y = 3 * Math.PI / 2;
plateMesh2.position.set(-.01, 5, .05);
plateMesh2.castShadow = true;
plateMesh2.recieveShadow = true;
door.add(plateMesh2);

const plateMesh3 = new THREE.Mesh(plate, plateMesh);
plateMesh3.rotation.y = 3 * Math.PI / 2;
plateMesh3.position.set(-.01, 8, .05);
plateMesh3.castShadow = true;
plateMesh3.recieveShadow = true;
door.add(plateMesh3);


export const doorPivot = new THREE.Group();
doorPivot.rotation.y = 2 * Math.PI / 2;
doorPivot.position.set(-39, -2, 60);

doorPivot.add(door);
