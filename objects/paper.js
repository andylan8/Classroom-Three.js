import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

const width = 1.5;
const height = 2.4;
const loader = new THREE.TextureLoader();
const paper_texture = loader.load('../textures/paper.jpg');
const paperGeometry = new THREE.PlaneGeometry(width, height);
const paperMat = new THREE.MeshStandardMaterial({ map: paper_texture , color: 0xffffff });

const paper = new THREE.Mesh(paperGeometry, paperMat);

export { paper };

