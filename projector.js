/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Partner: Mattew Hanna

*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
/* Import Globals */
import { scene, camera } from "../scene.js";

const projector = new THREE.Group();

const vertices = [];
const indices = [];
const colors = [];
let vertexIndex = 0;

function addVertexNum(x, y, z, color) {
    vertices.push(x, y, z);
    colors.push(...color);
    return vertexIndex++;
}


// ============= box vertices =============
const width = 3;
const height = 1.8;
const depth = 2;
let box_color = [.84, .85, .9];

let box_back_left_bottom = addVertexNum(0, 0, 0, box_color);
let box_back_right_bottom = addVertexNum(width, 0, 0, box_color);
let box_back_right_top = addVertexNum(width, height, 0, box_color);
let box_back_left_top = addVertexNum(0, height, 0, box_color);

let box_front_left_bottom = addVertexNum(0, 0, depth, box_color);
let box_front_right_bottom = addVertexNum(width, 0, depth, box_color);
let box_front_right_top = addVertexNum(width, height, depth, box_color);
let box_front_left_top = addVertexNum(0, height, depth, box_color); 

//bottom base
indices.push(box_back_left_bottom, box_back_right_bottom, box_front_right_bottom);
indices.push(box_back_left_bottom, box_front_left_bottom, box_front_right_bottom);

//back base
indices.push(box_back_left_bottom, box_back_left_top, box_back_right_top);
indices.push(box_back_left_bottom, box_back_right_bottom, box_back_right_top);

//left base
indices.push(box_back_left_top, box_back_left_bottom, box_front_left_bottom);
indices.push(box_back_left_top, box_front_left_top, box_front_left_bottom);

//right base
indices.push(box_back_right_top, box_back_right_bottom, box_front_right_bottom);
indices.push(box_back_right_top, box_front_right_top, box_front_right_bottom);

//front base
indices.push(box_front_left_top, box_front_right_top, box_front_right_bottom);
indices.push(box_front_left_top, box_front_left_bottom, box_front_right_bottom);

//top base
indices.push(box_front_left_top, box_front_right_top, box_back_right_top);
indices.push(box_front_left_top, box_back_left_top, box_back_right_top);

const boxMesh = new THREE.BufferGeometry();
boxMesh.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
boxMesh.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );

boxMesh.computeVertexNormals();
boxMesh.setIndex( indices );

const boxMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const box = new THREE.Mesh(boxMesh, boxMat);

box.position.set(0, 2, 0);
projector.add(box);


// ============= camera =============
const cameraVertices = [];
const cameraIndices = [];
let cameraVIndex = 0;
const cameraRadius = .3;
const cameraHeight = .5;
const cameraSeg = 30;
const thickness = .03;
const cameraInnerR = cameraRadius - thickness;
function addCylinderVertex(y, r) {
    const vertices = [];
    for (let i = 0; i < cameraSeg; i++) {
      const angle = (i / cameraSeg) * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      vertices.push({ x, y, z });
    }
    return vertices;
}

const bottomOuter = addCylinderVertex(0, cameraRadius);
const bottomInner = addCylinderVertex(0, cameraInnerR);
const topOuter = addCylinderVertex(cameraHeight, cameraRadius);
const topInner = addCylinderVertex(cameraHeight, cameraInnerR);

const bottomOuterStart = cameraVIndex;
bottomOuter.forEach(v => {
    cameraVertices.push(v.x, v.y, v.z);
    cameraVIndex++;
});

const topOuterStart = cameraVIndex;
topOuter.forEach(v => {
    cameraVertices.push(v.x, v.y, v.z);
vertexIndex++;
});

const bottomInnerStart = cameraVIndex;
bottomInner.forEach(v => {
    cameraVertices.push(v.x, v.y, v.z);
    cameraVIndex++;
});

const topInnerStart = cameraVIndex;
topInner.forEach(v => {
    cameraVertices.push(v.x, v.y, v.z);
    cameraVIndex++;
});

for (let i = 0; i < cameraSeg; i++) {
    const next = (i + 1) % cameraSeg;

    const ob1 = bottomOuterStart + i;  
    const ob2 = bottomOuterStart + next; 
    const ot1 = topOuterStart + i;     
    const ot2 = topOuterStart + next; 

    const ib1 = bottomInnerStart + i; 
    const ib2 = bottomInnerStart + next; 
    const it1 = topInnerStart + i;   
    const it2 = topInnerStart + next; 

    cameraIndices.push(ob1, ob2, ot2);  
    cameraIndices.push(ob1, ot2, ot1);  

    cameraIndices.push(ib1, ib2, it2); 
    cameraIndices.push(ib1, it2, it1);  
}
for (let i = 0; i < cameraSeg; i++) {
    const next = (i + 1) % cameraSeg;

    const ot1 = topOuterStart + i;  
    const ot2 = topOuterStart + next; 
    const it1 = topInnerStart + i;   
    const it2 = topInnerStart + next;  

    cameraIndices.push(ot1, ot2, it2); 
    cameraIndices.push(ot1, it2, it1); 
}

const bottomOuterCenter = cameraVIndex;
cameraVertices.push(0, 0, 0);
cameraVIndex++;


const cameraMesh = new THREE.BufferGeometry();
cameraMesh.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(cameraVertices), 3 ) );
cameraMesh.computeVertexNormals();
cameraMesh.setIndex(cameraIndices);
const cameraMat = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide});
const cameraLens = new THREE.Mesh(cameraMesh, cameraMat);
cameraLens.position.set(2, 3, 1.8);
cameraLens.rotateX(Math.PI / 2);

// ============= lens =============
for (let i = 0; i < cameraSeg; i++) {
    const next = (i + 1) % cameraSeg;
    cameraIndices.push(bottomOuterCenter, bottomOuterStart + next, bottomOuterStart + i);
}
const lensMesh = new THREE.BufferGeometry();
lensMesh.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(cameraVertices), 3 ) );
lensMesh.computeVertexNormals();
lensMesh.setIndex(cameraIndices);
const lensMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide});
const lens = new THREE.Mesh(lensMesh, lensMat);
lens.scale.set(.99, .99, .99);
lens.position.set(2, 3, 2.3);
lens.rotateX(-Math.PI / 2);
projector.add(lens);
projector.add(cameraLens);

// ============= mount =============

const mountVertices = [];
const mountIndices = [];
let mountVIndex = 0;
const mountRadius = .3;
const mountHeight = 5;
const mountSeg = 30;
const mountInnerR = mountRadius - thickness;

const bOuter = addCylinderVertex(0, mountRadius);
const bInner = addCylinderVertex(0, mountInnerR);
const tOuter = addCylinderVertex(mountHeight, mountRadius);
const tInner = addCylinderVertex(mountHeight, mountInnerR);

const bOuterStart = mountVIndex;
bOuter.forEach(v => {
    mountVertices.push(v.x, v.y, v.z);
    mountVIndex++;
});

const tOuterStart = mountVIndex;
tOuter.forEach(v => {
    mountVertices.push(v.x, v.y, v.z);
    mountVIndex++;
});

const bInnerStart = mountVIndex;
bInner.forEach(v => {
    mountVertices.push(v.x, v.y, v.z);
    mountVIndex++;
});

const tInnerStart = mountVIndex;
tInner.forEach(v => {
    mountVertices.push(v.x, v.y, v.z);
    mountVIndex++;
});

for (let i = 0; i < mountSeg; i++) {
    const next = (i + 1) % mountSeg;

    const ob1 = bOuterStart + i;  
    const ob2 = bOuterStart + next; 
    const ot1 = tOuterStart + i;     
    const ot2 = tOuterStart + next; 

    const ib1 = bInnerStart + i; 
    const ib2 = bInnerStart + next; 
    const it1 = tInnerStart + i;   
    const it2 = tInnerStart + next; 

    mountIndices.push(ob1, ob2, ot2);  
    mountIndices.push(ob1, ot2, ot1);  

    mountIndices.push(ib1, ib2, it2); 
    mountIndices.push(ib1, it2, it1);  
}
for (let i = 0; i < mountSeg; i++) {
    const next = (i + 1) % mountSeg;

    const ot1 = tOuterStart + i;  
    const ot2 = tOuterStart + next; 
    const it1 = tInnerStart + i;   
    const it2 = tInnerStart + next;  

    cameraIndices.push(ot1, ot2, it2); 
    cameraIndices.push(ot1, it2, it1); 
}

const bOuterCenter = mountVIndex;
mountVertices.push(0, 0, 0);
mountVIndex++;


const mountMesh = new THREE.BufferGeometry();
mountMesh.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(mountVertices), 3 ) );
mountMesh.computeVertexNormals();
mountMesh.setIndex(cameraIndices);
const mountMat = new THREE.MeshBasicMaterial({ color: 0xeceded, side: THREE.DoubleSide});
const mount = new THREE.Mesh(mountMesh, mountMat);
mount.position.set(1.5, 3.5, 1);
projector.add(mount);

// ============= vents =============

const ventWidth = 1;
const ventHeight = .2;
const ventDepth = .5;
const ventVertices = [];
const ventIndices = [];
const ventColors = [];
let ventVIndex = 0;
let vent_color = [0, 0, 0];

function addVentVertexNum(x, y, z, color) {
    ventVertices.push(x, y, z);
    ventColors.push(...color);
    return ventVIndex++;
}

let vent_back_left_bottom = addVentVertexNum(0, 0, 0, vent_color);
let vent_back_right_bottom = addVentVertexNum(ventWidth, 0, 0, vent_color);
let vent_back_right_top = addVentVertexNum(ventWidth, ventHeight, 0, vent_color);
let vent_back_left_top = addVentVertexNum(0, ventHeight, 0, vent_color);

let vent_front_left_bottom = addVentVertexNum(0, 0, ventDepth, vent_color);
let vent_front_right_bottom = addVentVertexNum(ventWidth, 0, ventDepth, vent_color);
let vent_front_right_top = addVentVertexNum(ventWidth, ventHeight, ventDepth, vent_color);
let vent_front_left_top = addVentVertexNum(0, ventHeight, ventDepth, vent_color); 

//bottom base
ventIndices.push(vent_back_left_bottom, vent_back_right_bottom, vent_front_right_bottom);
ventIndices.push(vent_back_left_bottom, vent_front_left_bottom, vent_front_right_bottom);

//back base
ventIndices.push(vent_back_left_bottom, vent_back_left_top,vent_back_right_top);
ventIndices.push(vent_back_left_bottom, vent_back_right_bottom, vent_back_right_top);

//left base
ventIndices.push(vent_back_left_top, vent_back_left_bottom, vent_front_left_bottom);
ventIndices.push(vent_back_left_top, vent_front_left_top, vent_front_left_bottom);

//right base
ventIndices.push(vent_back_right_top, vent_back_right_bottom, vent_front_right_bottom);
ventIndices.push(vent_back_right_top, vent_front_right_top, vent_front_right_bottom);

//front base
ventIndices.push(vent_front_left_top, vent_front_right_top, vent_front_right_bottom);
ventIndices.push(vent_front_left_top, vent_front_left_bottom, vent_front_right_bottom);

//top base
ventIndices.push(vent_front_left_top, vent_front_right_top, vent_back_right_top);
ventIndices.push(vent_front_left_top, vent_back_left_top, vent_back_right_top);

const ventMesh = new THREE.BufferGeometry();
ventMesh.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(ventVertices), 3 ) );
ventMesh.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(ventColors), 3 ) );

ventMesh.computeVertexNormals();
ventMesh.setIndex( ventIndices );

const ventMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
const vent1 = new THREE.Mesh(ventMesh, ventMat);
const vent2 = new THREE.Mesh(ventMesh, ventMat);
const vent3 = new THREE.Mesh(ventMesh, ventMat);
const vent4 = new THREE.Mesh(ventMesh, ventMat);
const vent5 = new THREE.Mesh(ventMesh, ventMat);
const vent6 = new THREE.Mesh(ventMesh, ventMat);
const vent7 = new THREE.Mesh(ventMesh, ventMat);
const vent8 = new THREE.Mesh(ventMesh, ventMat);

vent1.position.set(.2, 2.4, -.01);
vent2.position.set(.2, 2.7, -.01);
vent3.position.set(.2, 3, -.01);
vent4.position.set(.2, 3.3, -.01);
vent5.position.set(1.8, 2.4, -.01);
vent6.position.set(1.8, 2.7, -.01);
vent7.position.set(1.8, 3, -.01);
vent8.position.set(1.8, 3.3, -.01);

projector.add(vent1);
projector.add(vent2);
projector.add(vent3);
projector.add(vent4);
projector.add(vent5);
projector.add(vent6);
projector.add(vent7);
projector.add(vent8);

projector.position.y = 3;

scene.add(projector);