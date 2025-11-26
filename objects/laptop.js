/*A.I. Disclaimer: All work for this assignment was completed by 
myself and entirely without the use of artificial intelligence tools 
such as ChatGPT, MS Copilot, other LLMs, etc.

Team Members: Matthew Hanna, Andy Lan
*/

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

const vertices = [];
const colors = [];
const indicies = [];

let vertIdx = 0;

function addVertex(x, y, z) {
    vertices.push(x, y, z);
    colors.push(0.15, 0.15, 0.15);
    return vertIdx++;
}

function addVertexWithColor(x, y, z, color) {
    vertices.push(x, y, z);
    colors.push(...color);
    return vertIdx++;
}

const width = 2;
const depth = 1;
const height = 0.1;

const screen_height = 1.0;
const screen_depth = 0.05;
const screen_depth_offset = 0.01;

let base_back_bottom_left = addVertex(-width/2, 0, -depth/2); // back bottom left
let base_back_top_left = addVertex(-width/2, height, -depth/2); // back top left
let base_back_bottom_right = addVertex(width/2, 0, -depth/2); // back bottom right
let base_back_top_right = addVertex(width/2, height, -depth/2); // back top right

let base_front_bottom_left = addVertex(-width/2, 0, depth/2); // front bottom left
let base_front_top_left = addVertex(-width/2, height, depth/2); // front top left
let base_front_bottom_right = addVertex(width/2, 0, depth/2); // front bottom right
let base_front_top_right = addVertex(width/2, height, depth/2); // front top right

let screen_frame_color = [0.1, 0.1, 0.1];

let screen_top_back_left = addVertexWithColor(-width/2, height + screen_height, -depth/2 + screen_depth_offset, screen_frame_color); // screen top back left
let screen_top_back_right = addVertexWithColor(width/2, height + screen_height, -depth/2 + screen_depth_offset, screen_frame_color); // screen top back right
let screen_top_front_left = addVertexWithColor(-width/2, height + screen_height, -depth/2 + screen_depth + screen_depth_offset, screen_frame_color); // screen top front left
let screen_top_front_right = addVertexWithColor(width/2, height + screen_height, -depth/2 + screen_depth + screen_depth_offset, screen_frame_color); // screen top front right

let screen_bottom_back_left = addVertexWithColor(-width/2, height, -depth/2 + screen_depth_offset, screen_frame_color); // screen bottom back left
let screen_bottom_back_right = addVertexWithColor(width/2, height, -depth/2 + screen_depth_offset, screen_frame_color); // screen bottom back right
let screen_bottom_front_left = addVertexWithColor(-width/2, height, -depth/2 + screen_depth + screen_depth_offset, screen_frame_color); // screen bottom front left
let screen_bottom_front_right = addVertexWithColor(width/2, height, -depth/2 + screen_depth + screen_depth_offset, screen_frame_color); // screen bottom front right

const display_color = [0.0, 0.0, 0.0];

let display_bottom_left = addVertexWithColor(-width/2 + 0.05, height + 0.05, -depth/2 + screen_depth + screen_depth_offset + 0.005, display_color); // display bottom left
let display_bottom_right = addVertexWithColor(width/2 - 0.05, height + 0.05, -depth/2 + screen_depth + screen_depth_offset + 0.005, display_color); // display bottom right
let display_top_left = addVertexWithColor(-width/2 + 0.05, height + screen_height - 0.05, -depth/2 + screen_depth + screen_depth_offset + 0.005, display_color); // display top left
let display_top_right = addVertexWithColor(width/2 - 0.05, height + screen_height - 0.05, -depth/2 + screen_depth + screen_depth_offset + 0.005, display_color); // display top right

const keyboard_color = [0.0, 0.0, 0.0];

let keyboard_top_left = addVertexWithColor(-width/2.5, height + 0.005, -depth/3, keyboard_color); // keyboard top left
let keyboard_top_right = addVertexWithColor(width/2.5, height + 0.005, -depth/3, keyboard_color); // keyboard top right
let keyboard_bottom_left = addVertexWithColor(-width/2.5, height + 0.005, depth / 6, keyboard_color); // keyboard bottom left
let keyboard_bottom_right = addVertexWithColor(width/2.5, height + 0.005, depth / 6, keyboard_color); // keyboard bottom right

const trackpad_color = [0.0, 0.0, 0.0];

let trackpad_top_left = addVertexWithColor(-width/8, height + 0.005, depth/4.5, trackpad_color); // trackpad top left
let trackpad_top_right = addVertexWithColor(width/8, height + 0.005, depth/4.5, trackpad_color); // trackpad top right
let trackpad_bottom_left = addVertexWithColor(-width/8, height + 0.005, depth/2, trackpad_color); // trackpad bottom left
let trackpad_bottom_right = addVertexWithColor(width/8, height + 0.005, depth/2, trackpad_color); // trackpad bottom right

// cover bottom (clock-wise)
indicies.push(base_front_bottom_left, base_back_bottom_left, base_back_bottom_right);
indicies.push(base_back_bottom_right, base_front_bottom_right, base_front_bottom_left);

// sides (counter clock-wise)
indicies.push(base_back_bottom_left, base_back_top_left, base_back_top_right);
indicies.push(base_back_top_right, base_back_bottom_right, base_back_bottom_left);

indicies.push(base_front_bottom_right, base_front_top_right, base_front_top_left);
indicies.push(base_front_top_left, base_front_bottom_left, base_front_bottom_right);

indicies.push(base_back_bottom_right, base_back_top_right, base_front_top_right);
indicies.push(base_front_top_right, base_front_bottom_right, base_back_bottom_right);

indicies.push(base_front_bottom_left, base_front_top_left, base_back_top_left);
indicies.push(base_back_top_left, base_back_bottom_left, base_front_bottom_left);

indicies.push(base_back_top_left, base_front_top_left, base_front_top_right);
indicies.push(base_front_top_right, base_back_top_right, base_back_top_left);

// screen
indicies.push(screen_top_back_left, screen_top_back_right, screen_bottom_back_left);
indicies.push(screen_bottom_back_left, screen_top_back_right, screen_bottom_back_right);

indicies.push(screen_bottom_front_left, screen_bottom_front_right, screen_top_front_right);
indicies.push(screen_top_front_right, screen_top_front_left, screen_bottom_front_left);

indicies.push(screen_top_back_right, screen_top_front_right, screen_bottom_back_right);
indicies.push(screen_bottom_back_right, screen_top_front_right, screen_bottom_front_right);

indicies.push(screen_top_front_left, screen_top_back_left, screen_bottom_front_left);
indicies.push(screen_bottom_front_left, screen_top_back_left, screen_bottom_back_left);

indicies.push(screen_top_back_left, screen_top_front_left, screen_top_front_right);
indicies.push(screen_top_front_right, screen_top_back_right, screen_top_back_left);

// display
indicies.push(display_bottom_left, display_bottom_right, display_top_right);
indicies.push(display_top_right, display_top_left, display_bottom_left);

// keyboard
indicies.push(keyboard_bottom_left, keyboard_bottom_right, keyboard_top_right);
indicies.push(keyboard_top_right, keyboard_top_left, keyboard_bottom_left);

// trackpad
indicies.push(trackpad_bottom_left, trackpad_bottom_right, trackpad_top_right);
indicies.push(trackpad_top_right, trackpad_top_left, trackpad_bottom_left);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );

geometry.computeVertexNormals();
geometry.setIndex( indicies );

const material = new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.7, roughness: 0.4 });
//const material = new THREE.MeshBasicMaterial( { color: 0x808080, metalness: 1, roughness: 0.5 } );
const laptop = new THREE.Mesh(geometry, material);

laptop.castShadow = true;
laptop.receiveShadow = true;

export { laptop };