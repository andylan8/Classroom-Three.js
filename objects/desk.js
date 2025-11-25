import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";

import { laptop } from "./laptop.js";
import { chair } from "./chair.js";
import { pencil, pencilLength } from "./pencil.js";
import { table, tableWidth, tableDepth } from "./table.js";
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

let pencilClone = pencil.clone();
pencilClone.position.set(-2, 2.35, -pencilLength / 4);
pencilClone.rotation.x = Math.PI / 2;
pencilClone.scale.set(0.5, 0.5, 0.5);
desk.add(pencilClone);

desk.add(table);

const table_cols_spacing = tableWidth;
const table_rows_spacing = tableDepth + 15;
const table_rows = 5;
const table_cols = 7;

const table_start_x = 40;
const table_start_z = 30;

const positions = [];

for (let r = 0; r < table_rows; r++) {
    for (let c = 0; c < table_cols; c++) {
        positions.push([table_start_x - table_cols_spacing*c, 0, table_start_z - table_rows_spacing*r]);
    }
}

for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const tableClone = desk.clone();
    tableClone.position.set(pos[0], pos[1], pos[2]);
    scene.add(tableClone);
}