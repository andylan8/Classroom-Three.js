import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

import { laptop } from "./laptop.js";
import { chair } from "./chair.js";
import { pencil, pencilLength } from "./pencil.js";
import { table, tableWidth, tableDepth, stablizerHeight } from "./table.js";
import { scene, camera } from "../scene.js";

let desk = new THREE.Group();

// Position laptop on table
let laptopClone = laptop.clone();
laptopClone.position.set(0, 2.275, 0);
laptopClone.rotation.y = Math.PI;
desk.add(laptopClone);

// Position chair next to table
let chairClone = chair.clone();
chairClone.position.set(0, -2, -3);
chairClone.scale.set(2, 2, 2);
desk.add(chairClone);

// Position pencil on table
let pencilClone = pencil.clone();
pencilClone.position.set(-2, 2.35, -pencilLength / 4);
pencilClone.rotation.x = Math.PI / 2;
pencilClone.scale.set(0.5, 0.5, 0.5);
desk.add(pencilClone);

desk.add(table);

const desk_cols_spacing = tableWidth;
const desk_rows_spacing = tableDepth + 15;
const desk_rows = 5;
const desk_cols = 7;

const desk_start_x = 40;
const desk_start_z = 30;

const positions = [];

for (let r = 0; r < desk_rows; r++) {
    for (let c = 0; c < desk_cols; c++) {
        positions.push([desk_start_x - desk_cols_spacing*c, 0, desk_start_z - desk_rows_spacing*r]);
    }
}

for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const deskClone = desk.clone();
    deskClone.position.set(pos[0], pos[1] + 0.225 + stablizerHeight, pos[2]);
    scene.add(deskClone);
}