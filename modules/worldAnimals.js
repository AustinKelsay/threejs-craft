/**
 * World Animals Module
 * 
 * Handles creation and management of outdoor animals (cows, pigs, horses, dragons)
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import { worldAnimals, interactableObjects } from './gameState.js';

/**
 * Creates a cow at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created cow object
 */
export function createCow(x, z) {
  const cow = new THREE.Group();
  const size = CONFIG.objects.cow.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.5, size * 0.8, size * 0.8);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.6;
  body.castShadow = true;
  body.receiveShadow = true;
  cow.add(body);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.5, size * 0.5, size * 0.4);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.8, size * 0.6, 0);
  head.castShadow = true;
  cow.add(head);
  
  // Snout
  const snoutGeometry = new THREE.BoxGeometry(size * 0.3, size * 0.25, size * 0.3);
  const snoutMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.snoutColor,
    roughness: 0.9
  });
  const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
  snout.position.set(size * 1.05, size * 0.5, 0);
  cow.add(snout);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.85, size * 0.7, size * 0.15);
  cow.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.85, size * 0.7, -size * 0.15);
  cow.add(eye2);
  
  // Horns
  const hornGeometry = new THREE.CylinderGeometry(size * 0.03, size * 0.05, size * 0.2);
  const hornMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.hornColor,
    roughness: 0.7
  });
  const horn1 = new THREE.Mesh(hornGeometry, hornMaterial);
  horn1.position.set(size * 0.7, size * 0.85, size * 0.1);
  horn1.rotation.z = -0.3;
  cow.add(horn1);
  
  const horn2 = new THREE.Mesh(hornGeometry, hornMaterial);
  horn2.position.set(size * 0.7, size * 0.85, -size * 0.1);
  horn2.rotation.z = -0.3;
  cow.add(horn2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.08, size * 0.5);
  const legMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.bodyColor,
    roughness: 0.8
  });
  const legs = [];
  const legPositions = [
    { x: size * 0.5, z: size * 0.25 },
    { x: size * 0.5, z: -size * 0.25 },
    { x: -size * 0.5, z: size * 0.25 },
    { x: -size * 0.5, z: -size * 0.25 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, size * 0.25, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    cow.add(leg);
  });
  
  // Udder
  const udderGeometry = new THREE.SphereGeometry(size * 0.3, 6, 4);
  const udderMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.udderColor,
    roughness: 0.9
  });
  const udder = new THREE.Mesh(udderGeometry, udderMaterial);
  udder.position.set(-size * 0.2, size * 0.35, 0);
  udder.scale.y = 0.7;
  cow.add(udder);
  
  // Tail
  const tailGeometry = new THREE.CylinderGeometry(size * 0.03, size * 0.05, size * 0.6);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.75, size * 0.5, 0);
  tail.rotation.z = Math.PI / 6;
  cow.add(tail);
  
  cow.position.set(x, 0, z);
  cow.userData = { 
    type: 'cow', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.cow.moveSpeed,
    wanderRadius: CONFIG.objects.cow.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(cow);
  interactableObjects.add(cow);
  
  return cow;
}

/**
 * Creates a pig at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created pig object
 */
export function createPig(x, z) {
  const pig = new THREE.Group();
  const size = CONFIG.objects.pig.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.7);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.pig.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.4;
  body.castShadow = true;
  body.receiveShadow = true;
  pig.add(body);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.45, size * 0.4, size * 0.4);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.65, size * 0.4, 0);
  head.castShadow = true;
  pig.add(head);
  
  // Snout
  const snoutGeometry = new THREE.CylinderGeometry(size * 0.1, size * 0.15, size * 0.15);
  const snoutMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.pig.snoutColor,
    roughness: 0.9
  });
  const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
  snout.position.set(size * 0.85, size * 0.35, 0);
  snout.rotation.z = Math.PI / 2;
  pig.add(snout);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.04, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.7, size * 0.5, size * 0.12);
  pig.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.7, size * 0.5, -size * 0.12);
  pig.add(eye2);
  
  // Ears
  const earGeometry = new THREE.ConeGeometry(size * 0.1, size * 0.15, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 0.55, size * 0.55, size * 0.15);
  ear1.rotation.z = -0.5;
  pig.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 0.55, size * 0.55, -size * 0.15);
  ear2.rotation.z = -0.5;
  pig.add(ear2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.06, size * 0.06, size * 0.3);
  const legs = [];
  const legPositions = [
    { x: size * 0.4, z: size * 0.2 },
    { x: size * 0.4, z: -size * 0.2 },
    { x: -size * 0.4, z: size * 0.2 },
    { x: -size * 0.4, z: -size * 0.2 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.15, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    pig.add(leg);
  });
  
  // Tail (curly)
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.1, 0.1, 0),
    new THREE.Vector3(-0.15, 0.15, 0.1),
    new THREE.Vector3(-0.2, 0.1, 0.15),
    new THREE.Vector3(-0.25, 0, 0.1)
  ]);
  
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 8, size * 0.02, 4, false);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.6, size * 0.5, 0);
  pig.add(tail);
  
  pig.position.set(x, 0, z);
  pig.userData = { 
    type: 'pig', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.pig.moveSpeed,
    wanderRadius: CONFIG.objects.pig.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(pig);
  interactableObjects.add(pig);
  
  return pig;
}

/**
 * Creates a horse at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created horse object
 */
export function createHorse(x, z) {
  const horse = new THREE.Group();
  const size = CONFIG.objects.horse.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.8, size * 0.9, size * 0.7);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.bodyColor,
    roughness: 0.7
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.9;
  body.castShadow = true;
  body.receiveShadow = true;
  horse.add(body);
  
  // Neck
  const neckGeometry = new THREE.BoxGeometry(size * 0.4, size * 0.8, size * 0.4);
  const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
  neck.position.set(size * 0.8, size * 1.2, 0);
  neck.rotation.z = -0.3;
  neck.castShadow = true;
  horse.add(neck);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.5, size * 0.35, size * 0.3);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 1.2, size * 1.4, 0);
  head.castShadow = true;
  horse.add(head);
  
  // Mane
  const maneGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.6, size * 0.3);
  const maneMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.maneColor,
    roughness: 0.9
  });
  const mane = new THREE.Mesh(maneGeometry, maneMaterial);
  mane.position.set(size * 0.65, size * 1.4, 0);
  mane.rotation.z = -0.3;
  horse.add(mane);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 1.15, size * 1.5, size * 0.12);
  horse.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 1.15, size * 1.5, -size * 0.12);
  horse.add(eye2);
  
  // Ears
  const earGeometry = new THREE.ConeGeometry(size * 0.06, size * 0.12, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 1.1, size * 1.65, size * 0.08);
  ear1.rotation.z = -0.2;
  horse.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 1.1, size * 1.65, -size * 0.08);
  ear2.rotation.z = -0.2;
  horse.add(ear2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.1, size * 0.9);
  const legs = [];
  const legPositions = [
    { x: size * 0.6, z: size * 0.2 },
    { x: size * 0.6, z: -size * 0.2 },
    { x: -size * 0.6, z: size * 0.2 },
    { x: -size * 0.6, z: -size * 0.2 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.45, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    horse.add(leg);
  });
  
  // Hooves
  const hoofGeometry = new THREE.CylinderGeometry(size * 0.09, size * 0.09, size * 0.1);
  const hoofMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.hoofColor,
    roughness: 0.8
  });
  
  legPositions.forEach(pos => {
    const hoof = new THREE.Mesh(hoofGeometry, hoofMaterial);
    hoof.position.set(pos.x, size * 0.05, pos.z);
    horse.add(hoof);
  });
  
  // Tail
  const tailGeometry = new THREE.BoxGeometry(size * 0.15, size * 0.8, size * 0.1);
  const tail = new THREE.Mesh(tailGeometry, maneMaterial);
  tail.position.set(-size * 0.9, size * 0.7, 0);
  tail.rotation.z = 0.2;
  horse.add(tail);
  
  horse.position.set(x, 0, z);
  horse.userData = { 
    type: 'horse', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.horse.moveSpeed,
    wanderRadius: CONFIG.objects.horse.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(horse);
  interactableObjects.add(horse);
  
  return horse;
}

/**
 * Creates a friendly dragon that can walk and fly
 * Uses organic shapes for a more majestic, serpentine appearance
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created dragon object
 */
export function createDragon(x, z) {
  const dragon = new THREE.Group();
  const config = CONFIG.objects.dragon;
  const s = config.size;
  
  // Enhanced materials with richer visual properties
  const scaleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2d5a4a,  // Deep emerald scales
    roughness: 0.35,
    metalness: 0.4
  });
  const scaleHighlightMat = new THREE.MeshStandardMaterial({ 
    color: 0x4a8f7a,  // Lighter emerald highlights
    roughness: 0.3,
    metalness: 0.5
  });
  const underbellyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xc9a55c,  // Golden cream underbelly
    roughness: 0.6,
    metalness: 0.1
  });
  const hornMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a,  // Near-black horns/claws
    roughness: 0.2,
    metalness: 0.6
  });
  const wingMembraneMat = new THREE.MeshStandardMaterial({ 
    color: 0x3d6b5a,  // Darker green membrane
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.15
  });
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff6b00,  // Fiery orange
    emissive: 0xff4400,
    emissiveIntensity: 0.8
  });
  const pupilMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000
  });

  // === MAIN BODY (serpentine torso) ===
  // Core body - elongated ellipsoid shape
  const bodyCore = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.65, 16, 12, 0, Math.PI * 2, 0, Math.PI),
    scaleMaterial
  );
  bodyCore.scale.set(2.2, 0.9, 1.0);
  bodyCore.position.set(0, s * 0.9, 0);
  bodyCore.castShadow = true;
  bodyCore.receiveShadow = true;
  dragon.add(bodyCore);

  // Chest bulge (front of body)
  const chest = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.55, 12, 10),
    scaleMaterial
  );
  chest.scale.set(1.0, 0.95, 0.9);
  chest.position.set(s * 0.85, s * 0.85, 0);
  chest.castShadow = true;
  dragon.add(chest);

  // Hip section (rear of body)
  const hips = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.5, 12, 10),
    scaleMaterial
  );
  hips.scale.set(1.1, 0.85, 0.95);
  hips.position.set(-s * 0.7, s * 0.8, 0);
  hips.castShadow = true;
  dragon.add(hips);

  // Underbelly plates
  for (let i = 0; i < 6; i++) {
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(s * 0.35, s * 0.08, s * 0.5),
      underbellyMaterial
    );
    plate.position.set(s * (0.7 - i * 0.28), s * 0.42, 0);
    plate.castShadow = true;
    dragon.add(plate);
  }

  // === NECK (curved, segmented) ===
  const neckSegments = 4;
  for (let i = 0; i < neckSegments; i++) {
    const t = i / (neckSegments - 1);
    const radius = THREE.MathUtils.lerp(s * 0.32, s * 0.22, t);
    const segment = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 10, 8),
      scaleMaterial
    );
    // Curved neck path rising upward and forward
    segment.position.set(
      s * (1.0 + t * 0.7),
      s * (1.0 + t * 0.6 + Math.sin(t * Math.PI * 0.5) * 0.2),
      0
    );
    segment.scale.set(1.1, 1.0, 0.85);
    segment.castShadow = true;
    dragon.add(segment);
  }

  // === HEAD ===
  // Main skull
  const skull = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.32, 12, 10),
    scaleMaterial
  );
  skull.scale.set(1.4, 1.0, 1.0);
  skull.position.set(s * 1.85, s * 1.7, 0);
  skull.castShadow = true;
  dragon.add(skull);

  // Snout (elongated)
  const snout = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.2, 10, 8),
    scaleMaterial
  );
  snout.scale.set(2.0, 0.7, 0.8);
  snout.position.set(s * 2.25, s * 1.62, 0);
  snout.castShadow = true;
  dragon.add(snout);

  // Lower jaw
  const lowerJaw = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.15, 8, 6),
    scaleMaterial
  );
  lowerJaw.scale.set(1.8, 0.5, 0.7);
  lowerJaw.position.set(s * 2.15, s * 1.48, 0);
  lowerJaw.castShadow = true;
  dragon.add(lowerJaw);

  // Brow ridges
  const browL = new THREE.Mesh(
    new THREE.BoxGeometry(s * 0.18, s * 0.08, s * 0.12),
    scaleHighlightMat
  );
  browL.position.set(s * 1.95, s * 1.82, s * 0.12);
  browL.rotation.z = -0.3;
  dragon.add(browL);
  const browR = browL.clone();
  browR.position.z = -s * 0.12;
  browR.rotation.z = -0.3;
  dragon.add(browR);

  // Nostrils
  const nostrilGeo = new THREE.SphereGeometry(s * 0.035, 6, 4);
  const nostrilMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const nostrilL = new THREE.Mesh(nostrilGeo, nostrilMat);
  nostrilL.position.set(s * 2.48, s * 1.67, s * 0.06);
  dragon.add(nostrilL);
  const nostrilR = nostrilL.clone();
  nostrilR.position.z = -s * 0.06;
  dragon.add(nostrilR);

  // Eyes with slit pupils
  const eyeWhiteGeo = new THREE.SphereGeometry(s * 0.1, 10, 8);
  const eyeL = new THREE.Mesh(eyeWhiteGeo, eyeMaterial);
  eyeL.scale.set(0.9, 1.0, 0.6);
  eyeL.position.set(s * 2.0, s * 1.78, s * 0.18);
  dragon.add(eyeL);
  const eyeR = eyeL.clone();
  eyeR.position.z = -s * 0.18;
  dragon.add(eyeR);

  // Slit pupils
  const pupilGeo = new THREE.SphereGeometry(s * 0.045, 6, 4);
  const pupilL = new THREE.Mesh(pupilGeo, pupilMaterial);
  pupilL.scale.set(0.4, 1.0, 0.5);
  pupilL.position.set(s * 2.08, s * 1.78, s * 0.22);
  dragon.add(pupilL);
  const pupilR = pupilL.clone();
  pupilR.position.z = -s * 0.22;
  dragon.add(pupilR);

  // Horns (curved backward)
  const hornGeo = new THREE.ConeGeometry(s * 0.08, s * 0.55, 8);
  const hornL = new THREE.Mesh(hornGeo, hornMaterial);
  hornL.position.set(s * 1.65, s * 2.0, s * 0.2);
  hornL.rotation.set(0.4, 0, 0.6);
  hornL.castShadow = true;
  dragon.add(hornL);
  const hornR = hornL.clone();
  hornR.position.z = -s * 0.2;
  hornR.rotation.set(-0.4, 0, 0.6);
  dragon.add(hornR);

  // Small ear frills
  const frillGeo = new THREE.ConeGeometry(s * 0.12, s * 0.25, 4);
  const frillL = new THREE.Mesh(frillGeo, scaleHighlightMat);
  frillL.position.set(s * 1.72, s * 1.85, s * 0.28);
  frillL.rotation.set(0.8, 0, 0.3);
  dragon.add(frillL);
  const frillR = frillL.clone();
  frillR.position.z = -s * 0.28;
  frillR.rotation.set(-0.8, 0, 0.3);
  dragon.add(frillR);

  // === BACK SPINES ===
  const spineCount = 8;
  for (let i = 0; i < spineCount; i++) {
    const t = i / (spineCount - 1);
    const spineHeight = s * THREE.MathUtils.lerp(0.35, 0.18, t);
    const spine = new THREE.Mesh(
      new THREE.ConeGeometry(s * 0.06, spineHeight, 4),
      scaleHighlightMat
    );
    spine.position.set(
      s * (1.2 - i * 0.35),
      s * 1.35 + (i < 3 ? i * 0.08 : (5 - i) * 0.05),
      0
    );
    spine.castShadow = true;
    dragon.add(spine);
  }

  // === TAIL (long, sinuous, with spade tip) ===
  const tailSegments = [];
  const tailCount = 8;
  for (let i = 0; i < tailCount; i++) {
    const t = i / (tailCount - 1);
    const radius = s * THREE.MathUtils.lerp(0.28, 0.08, t);
    const tailSeg = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 8, 6),
      scaleMaterial
    );
    tailSeg.scale.set(1.2, 0.9, 0.9);
    tailSeg.position.set(
      -s * (0.95 + i * 0.4),
      s * (0.6 - i * 0.03),
      0
    );
    tailSeg.castShadow = true;
    tailSegments.push(tailSeg);
    dragon.add(tailSeg);
  }

  // Tail spade tip
  const spadeShape = new THREE.Shape();
  spadeShape.moveTo(0, 0);
  spadeShape.lineTo(s * 0.25, s * 0.1);
  spadeShape.lineTo(s * 0.35, s * 0.35);
  spadeShape.lineTo(0, s * 0.5);
  spadeShape.lineTo(-s * 0.35, s * 0.35);
  spadeShape.lineTo(-s * 0.25, s * 0.1);
  spadeShape.lineTo(0, 0);
  const spadeGeo = new THREE.ShapeGeometry(spadeShape);
  const tailSpade = new THREE.Mesh(spadeGeo, scaleHighlightMat);
  tailSpade.position.set(-s * 4.2, s * 0.35, 0);
  tailSpade.rotation.set(0, Math.PI / 2, Math.PI * 0.1);
  tailSpade.castShadow = true;
  tailSegments.push(tailSpade);
  dragon.add(tailSpade);

  // === LEGS (muscular, with claws) ===
  const legs = [];
  const legPositions = [
    { x: s * 0.7, z: s * 0.4, isFront: true },
    { x: s * 0.7, z: -s * 0.4, isFront: true },
    { x: -s * 0.5, z: s * 0.45, isFront: false },
    { x: -s * 0.5, z: -s * 0.45, isFront: false }
  ];

  legPositions.forEach((pos, idx) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(pos.x, s * 0.55, pos.z);

    // Upper leg (thigh)
    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(s * 0.14, s * 0.16, s * 0.5, 8),
      scaleMaterial
    );
    thigh.position.y = -s * 0.1;
    thigh.rotation.x = pos.isFront ? 0.2 : -0.15;
    thigh.castShadow = true;
    legGroup.add(thigh);

    // Lower leg
    const shin = new THREE.Mesh(
      new THREE.CylinderGeometry(s * 0.1, s * 0.08, s * 0.4, 6),
      scaleMaterial
    );
    shin.position.set(0, -s * 0.4, pos.isFront ? s * 0.05 : -s * 0.04);
    shin.castShadow = true;
    legGroup.add(shin);

    // Foot
    const foot = new THREE.Mesh(
      new THREE.SphereGeometry(s * 0.12, 8, 6),
      scaleMaterial
    );
    foot.scale.set(1.3, 0.6, 1.0);
    foot.position.set(0, -s * 0.55, pos.isFront ? s * 0.06 : -s * 0.05);
    foot.castShadow = true;
    legGroup.add(foot);

    // Claws (3 per foot)
    for (let c = -1; c <= 1; c++) {
      const claw = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.03, s * 0.12, 5),
        hornMaterial
      );
      claw.position.set(
        c * s * 0.06,
        -s * 0.62,
        (pos.isFront ? s * 0.1 : -s * 0.09) + c * s * 0.02
      );
      claw.rotation.x = Math.PI + (pos.isFront ? 0.5 : -0.4);
      legGroup.add(claw);
    }

    legs.push(legGroup);
    dragon.add(legGroup);
  });

  // === WINGS (smooth membrane style) ===
  function createWing(side) {
    const wing = new THREE.Group();
    const zSign = side === 'left' ? 1 : -1;
    const w = 2.2; // Wing scale multiplier for bigger wings
    
    // Wing attaches to shoulder
    wing.position.set(s * 0.2, s * 1.1, zSign * s * 0.45);

    // Main wing membrane - elegant curved shape
    const membraneShape = new THREE.Shape();
    membraneShape.moveTo(0, 0);
    // Leading edge curves up and out
    membraneShape.quadraticCurveTo(s * 1.2 * w, s * 0.4 * w, s * 2.8 * w, s * 0.8 * w);
    // Wing tip curves
    membraneShape.quadraticCurveTo(s * 3.4 * w, s * 1.2 * w, s * 3.0 * w, s * 2.0 * w);
    // Trailing edge sweeps back
    membraneShape.quadraticCurveTo(s * 2.0 * w, s * 2.2 * w, s * 0.8 * w, s * 1.8 * w);
    membraneShape.quadraticCurveTo(s * 0.1 * w, s * 1.4 * w, -s * 0.5 * w, s * 0.7 * w);
    // Back to body
    membraneShape.quadraticCurveTo(-s * 0.3 * w, s * 0.3 * w, 0, 0);
    
    const membraneGeo = new THREE.ShapeGeometry(membraneShape);
    const membrane = new THREE.Mesh(membraneGeo, wingMembraneMat);
    membrane.rotation.set(0, zSign * Math.PI / 2, 0);
    membrane.position.set(0, 0, zSign * s * 0.1);
    membrane.castShadow = true;
    wing.add(membrane);

    // Leading edge ridge (thickened front of wing)
    const ridgeShape = new THREE.Shape();
    ridgeShape.moveTo(0, 0);
    ridgeShape.quadraticCurveTo(s * 1.2 * w, s * 0.35 * w, s * 2.6 * w, s * 0.75 * w);
    ridgeShape.lineTo(s * 2.5 * w, s * 0.9 * w);
    ridgeShape.quadraticCurveTo(s * 1.1 * w, s * 0.5 * w, 0, s * 0.15);
    ridgeShape.lineTo(0, 0);
    
    const ridgeGeo = new THREE.ShapeGeometry(ridgeShape);
    const ridge = new THREE.Mesh(ridgeGeo, scaleMaterial);
    ridge.rotation.set(0, zSign * Math.PI / 2, 0);
    ridge.position.set(0.02, 0.02, zSign * s * 0.12);
    ridge.castShadow = true;
    wing.add(ridge);

    return wing;
  }

  const leftWing = createWing('left');
  const rightWing = createWing('right');
  dragon.add(leftWing, rightWing);

  // Position dragon in world
  dragon.position.set(x, 0, z);
  
  dragon.userData = {
    type: 'dragon',
    removable: true,
    isAnimal: true,
    isFriendly: true,
    legs,
    wings: [leftWing, rightWing],
    tailSegments,
    moveSpeed: config.moveSpeed,
    flySpeed: config.flySpeed,
    wanderRadius: config.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    nextFlightCheck: 0,
    flightEndTime: 0,
    isFlying: false,
    targetAltitude: 0,
    groundHeight: s * 0.6,
    flapSpeed: config.flapSpeed
  };
  
  worldAnimals.push(dragon);
  interactableObjects.add(dragon);
  
  return dragon;
}

/**
 * Creates initial animals in the world
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function createInitialAnimals(scene) {
  // Create a variety of animals
  for (let i = 0; i < CONFIG.world.animalCount; i++) {
    const x = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    const z = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    
    const type = Math.random();
    
    if (type < 0.25) {
      const cow = createCow(x, z);
      scene.add(cow);
    } else if (type < 0.5) {
      const pig = createPig(x, z);
      scene.add(pig);
    } else if (type < 0.85) {
      const horse = createHorse(x, z);
      scene.add(horse);
    } else {
      const dragon = createDragon(x, z);
      scene.add(dragon);
    }
  }
}
