/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../../scene.js";

// sunlight
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 1000, 1000, 1000 );
directionalLight.target.position.set( 0, 0, 0 );
directionalLight.castShadow = true;
scene.add( directionalLight );