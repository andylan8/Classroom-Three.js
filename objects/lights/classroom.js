import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../../scene.js";

// classroom ceiling lights
const pointLight = new THREE.PointLight( 0xffffff, 4000, 60 );
pointLight.position.set( -30, 35, 0 );
scene.add( pointLight );

const pointLight2 = new THREE.PointLight( 0xffffff, 4000, 60 );
pointLight2.position.set( 0, 35, 0 );
scene.add( pointLight2 );

const pointLight3 = new THREE.PointLight( 0xffffff, 4000, 60 );
pointLight3.position.set( 30, 35, 0 );
scene.add( pointLight3 );

// projector spot light
const spotLight = new THREE.SpotLight( 0xffffff, 100 );
spotLight.position.set( 12, 15, 16.8 );
spotLight.angle = Math.PI / 8;
spotLight.penumbra = 0.8;
spotLight.decay = 0.1;
spotLight.distance = 1000;
spotLight.castShadow = true;
spotLight.target.position.set(16, 21, 60);
scene.add( spotLight );
scene.add( spotLight.target );

// ambient white light
const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );