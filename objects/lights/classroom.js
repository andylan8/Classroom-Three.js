/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera, create_texture } from "../../scene.js";

// classroom ceiling lights
const light_positions = [
    [-30, 35, 0],
    [0, 35, 0],
    [30, 35, 0],

    [-30, 35, -40],
    [0, 35, -40],
    [30, 35, -40],

    //[-30, 35, 40],
    //[0, 35, 40],
    //[30, 35, 40],
];

// for (const position of light_positions) {
//     const pointLight = new THREE.PointLight( 0xffffff, 700, 0 );
//     pointLight.position.set( ...position );
//     pointLight.castShadow = true;
//     scene.add( pointLight );
// }

// projector spot light
const spotLight = new THREE.SpotLight( 0xffffff, 3000 );
spotLight.position.set( 12, 18, 6.8 );
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 1;
spotLight.distance = 0;
spotLight.decay = 2;
spotLight.shadow.focus = 1;
spotLight.shadow.bias = - .003;
spotLight.castShadow = true;

const projector_texture = create_texture("./textures/projector_light.jpg");
projector_texture.minFilter = THREE.LinearFilter;
projector_texture.magFilter = THREE.LinearFilter;
projector_texture.generateMipmaps = false;
projector_texture.colorSpace = THREE.SRGBColorSpace;

spotLight.map = projector_texture;
spotLight.target.position.set(12, 18, 60);

scene.add(spotLight);
scene.add(spotLight.target);

// ambient white light
const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );