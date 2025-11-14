/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Partner: Mattew Hanna
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
/* Import Globals */
import { scene, camera } from "../scene.js";

var table = new THREE.Group();

const tableWidth = 10;
const tableHeight = .5;
const tableDepth = 4;
const tableTop = new THREE.BoxGeometry(tableWidth, tableHeight, tableDepth);
const tableTopMaterial = new THREE.MeshBasicMaterial({ color: 0xe7cb95 });

const standRadius = .25;
const standRS = 50;
const standHeight = 3.6;
const tableStand = new THREE.CylinderGeometry(standRadius, standRadius, standHeight, standRS);
const standMat = new THREE.MeshBasicMaterial({ color: 0xb4b5b7 });

const tableMesh = new THREE.Mesh(tableTop, tableTopMaterial);
tableMesh.position.y = 2;
table.add(tableMesh);

const stand1 = new THREE.Mesh(tableStand, standMat);
stand1.position.set(-4.5, 0, 0);

table.add(stand1);

const stand2 = new THREE.Mesh(tableStand, standMat);
stand2.position.x = 4.5;
table.add(stand2);

const barWidth = .35;
const barHeight = .2;
const barDepth = 4;
const bar = new THREE.BoxGeometry(barWidth, barHeight, barDepth);
const barMaterial = new THREE.MeshBasicMaterial({ color: 0xb4b5b7 });
const bar1 = new THREE.Mesh(bar, barMaterial);
bar1.position.set(-4.5, -1.6, 0);
const bar2 = new THREE.Mesh(bar, barMaterial);
bar2.position.set(4.5,-1.6,0);
table.add(bar1);
table.add(bar2);

const pivotRadius = .15;
const pivotWidth = 30;
const pivotHeight = 10;
const pivot = new THREE.SphereGeometry( pivotRadius, pivotWidth, pivotHeight );
const pivotMaterial = new THREE.MeshBasicMaterial({ color: 0xb4b5b7 });
const pivot1 = new THREE.Mesh(pivot, pivotMaterial);
pivot1.position.set(-4.5,-1.7,1.7);
table.add(pivot1);

const pivot2 = new THREE.Mesh(pivot, pivotMaterial);
pivot2.position.set(-4.5,-1.7,-1.7);
table.add(pivot2);

const pivot3 = new THREE.Mesh(pivot, pivotMaterial);
pivot3.position.set(4.5,-1.7,1.7);
table.add(pivot3);

const pivot4 = new THREE.Mesh(pivot, pivotMaterial);
pivot4.position.set(4.5,-1.7,-1.7);
table.add(pivot4);

const radius =  .25;  
const height =  .2;  
const radialSegments = 30;  
const stablizer = new THREE.ConeGeometry(radius, height, radialSegments);
const stabMaterial = new THREE.MeshBasicMaterial({ color: 0xb4b5b7 });
const stablizer1 = new THREE.Mesh(stablizer, stabMaterial);
stablizer1.position.set(-4.5,-1.85,-1.7);
table.add(stablizer1);

const stablizer2 = new THREE.Mesh(stablizer, stabMaterial);
stablizer2.position.set(-4.5,-1.85,1.7);
table.add(stablizer2);

const stablizer3 = new THREE.Mesh(stablizer, stabMaterial);
stablizer3.position.set(4.5,-1.85,-1.7);
table.add(stablizer3);

const stablizer4 = new THREE.Mesh(stablizer, stabMaterial);
stablizer4.position.set(4.5,-1.85,1.7);
table.add(stablizer4);

scene.add(table);