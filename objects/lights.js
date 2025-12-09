import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

import { scene, camera, create_texture, create_material_from_texture } from "../scene.js";

const light_positions = [
    [-30, 37.5, 0],
    [0, 37.5, 0],
    [30, 37.5, 0],

    [-30, 37.5, -40],
    [0, 37.5, -40],
    [30, 37.5, -40],

    [-30, 37.5, 40],
    [0, 37.5, 40],
    [30, 37.5, 40],
];

const barLights = new THREE.Group();

const width = 15;
const height = .3;
const depth = 3;

const bar = new THREE.BoxGeometry(width, height, depth);
const barMat = create_material_from_texture("./textures/Metal", 0xffffff); //new THREE.MeshStandardMaterial({ color: 0x000000 });
barMat.displacementMap = null;
const barMesh = new THREE.Mesh(bar, barMat);

barLights.add(barMesh);

const radius = .25;
const lightSegs = 25;
const length = 14.5;
const lights = new THREE.CylinderGeometry(radius, radius, length, lightSegs);
const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, emissive: new THREE.Color(1, 1, 1), emissiveIntensity: 1 });
const lightMesh = new THREE.Mesh(lights, lightMat);

//const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
//scene.add( pointLightHelper );

lightMesh.rotation.x = Math.PI / 2;
lightMesh.rotation.z = Math.PI / 2;
lightMesh.position.set(0, -0.2, 0);

const lightBar1 = lightMesh.clone();
const lightBar2 = lightMesh.clone();

lightBar1.translateX(radius + 0.2);
lightBar2.translateX(-radius - 0.2);

barLights.add(lightBar1);
barLights.add(lightBar2);

for (let i = 0; i < light_positions.length; ++i) {
    const position = light_positions[i];

    const barClone = barLights.clone();
    barClone.position.set(...position);
    barClone.translateY(-height / 2);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50, 0.1);
    pointLight.position.set(0, -5, 0);
    pointLight.castShadow = true;
    barClone.add(pointLight);
    // only add spotlights for first 6 lights because we dont want the spotlight texture to be bright from the front lights
    /*if (i < 6) {
        const spotLight = new THREE.SpotLight(0xffffff, 1000);
        spotLight.angle = Math.PI / 2.08;//2.1;
        spotLight.position.set(barClone.position.x + lightMesh.position.x, barClone.position.y + lightMesh.position.y - 0.1, barClone.position.z + lightMesh.position.z);
        spotLight.target.position.set(spotLight.position.x, spotLight.position.y - 1, spotLight.position.z);
        spotLight.castShadow = true;
        scene.add(spotLight);
        scene.add(spotLight.target);
    }*/

    //const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    //scene.add( spotLightHelper );

    scene.add( barClone );
}