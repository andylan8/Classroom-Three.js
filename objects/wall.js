import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
import * as THREE_ADDON from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/Addons.js";

/* Import Globals */
import { scene, camera } from "../scene.js";

const width = 120;
const height = 40;
const hole_offset_x = 5;
const hole_offset_y = 8;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, height);
shape.lineTo(width, height);
shape.lineTo(width, 0);
shape.lineTo(0, 0);

const windowPath = new THREE.Path();
windowPath.moveTo(hole_offset_x, hole_offset_y);
windowPath.lineTo(hole_offset_x, height - hole_offset_y);
windowPath.lineTo(width - hole_offset_x, height - hole_offset_y);
windowPath.lineTo(width - hole_offset_x, hole_offset_y);
windowPath.lineTo(hole_offset_x, hole_offset_y);
shape.holes.push(windowPath);

const extrudeSettings = {
    depth: 1,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.9,
    bevelThickness: 0.2
};

const loader = new THREE.TextureLoader();
const texture = loader.load('./textures/wallpaper.jpg');
const wallpaper_material = new THREE.MeshStandardMaterial( { map:texture, color: 0xf0f0f0 } );

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const wall_with_window_mesh = new THREE.Mesh(geometry, wallpaper_material);

wall_with_window_mesh.castShadow = true;
wall_with_window_mesh.receiveShadow = true;
wall_with_window_mesh.position.set(-60, -2, -width / 2);
wall_with_window_mesh.rotation.y = -Math.PI / 2;

scene.add(wall_with_window_mesh);

let wall_with_window_mesh2 = wall_with_window_mesh.clone();
wall_with_window_mesh2.position.set(60, -2, width / 2);
wall_with_window_mesh2.rotation.y = Math.PI / 2;

wall_with_window_mesh2.castShadow = true;
wall_with_window_mesh2.receiveShadow = true;

scene.add(wall_with_window_mesh2);

let wall_no_window_geom = new THREE.BoxGeometry(120, 40, 1);
let wall_no_window = new THREE.Mesh(wall_no_window_geom, wallpaper_material);
wall_no_window.position.set(0, 18, -60);

wall_no_window.castShadow = true;
wall_no_window.receiveShadow = true;

scene.add(wall_no_window);

// make sure front wall has a hole cut out for a door
let front_wall_shape = new THREE.Shape();
front_wall_shape.moveTo(0, 0);
front_wall_shape.lineTo(0, height);
front_wall_shape.lineTo(width, height);
front_wall_shape.lineTo(width, 0);
front_wall_shape.lineTo(0, 0);

const door_offset_x = 15;;
const door_offset_y = 0;
const door_width = 6;
const door_height = 10;

const doorPath = new THREE.Path();
doorPath.moveTo(door_offset_x, door_offset_y);
doorPath.lineTo(door_offset_x, door_height);
doorPath.lineTo(door_offset_x + door_width, door_height);
doorPath.lineTo(door_offset_x + door_width, door_offset_y);
doorPath.lineTo(door_offset_x, door_offset_y);
front_wall_shape.holes.push(doorPath);

const front_wall_geometry = new THREE.ExtrudeGeometry(front_wall_shape, extrudeSettings);
const front_wall = new THREE.Mesh(front_wall_geometry, wallpaper_material);
front_wall.position.set(-width / 2, -2, 60);

front_wall.castShadow = true;
front_wall.receiveShadow = true;

scene.add(front_wall);

const ceiling_geom = new THREE.BoxGeometry(120, 1, 120);
const ceiling = new THREE.Mesh(ceiling_geom, wallpaper_material);
ceiling.position.set(0, 38, 0);
scene.add(ceiling);

const glass_mat = new THREE.MeshPhysicalMaterial({
    metalness: .9,
    roughness: .05,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    opacity: .5,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 0.9,
    side: THREE.BackSide,
});

const window = new THREE.BoxGeometry(width - (hole_offset_x * 2), (height - hole_offset_y*2), 0.5);
const window_mesh = new THREE.Mesh(window, glass_mat);
window_mesh.position.set(-60 - 0.25, -2 + hole_offset_y + ((height - hole_offset_y*2) / 2), 0);
window_mesh.rotation.y = -Math.PI / 2;
scene.add(window_mesh);

const window2_mesh = window_mesh.clone();
window2_mesh.position.set(60 + 0.25, -2 + hole_offset_y + ((height - hole_offset_y*2) / 2), 0);
window2_mesh.rotation.y = Math.PI / 2;
scene.add(window2_mesh);