/**
 * Interior Animals Module
 * 
 * Handles creation and management of indoor animals (cats, dogs)
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import { interiorAnimals, interactableObjects, worldState } from './gameState.js';

/**
 * Creates a cat at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created cat object
 */
export function createCat(x, z) {
  const cat = new THREE.Group();
  const size = CONFIG.objects.cat.size;
  
  // Body - sleek and elongated
  const bodyGeometry = new THREE.BoxGeometry(size * 1.0, size * 0.3, size * 0.3);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cat.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.3;
  body.castShadow = true;
  body.receiveShadow = true;
  cat.add(body);
  
  // Head - smaller and rounded
  const headGeometry = new THREE.BoxGeometry(size * 0.35, size * 0.3, size * 0.3);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.5, size * 0.35, 0);
  head.castShadow = true;
  cat.add(head);
  
  // Ears - triangular
  const earGeometry = new THREE.ConeGeometry(size * 0.08, size * 0.12, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 0.45, size * 0.6, size * 0.15);
  cat.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 0.45, size * 0.6, -size * 0.15);
  cat.add(ear2);
  
  // Eyes - glowing green
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 4, 4);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cat.eyeColor,
    emissive: CONFIG.objects.cat.eyeColor,
    emissiveIntensity: 0.5
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.65, size * 0.4, size * 0.1);
  cat.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.65, size * 0.4, -size * 0.1);
  cat.add(eye2);
  
  // Tail - curved cylinder
  const tailGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.08, size * 0.8, 4);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.5, size * 0.4, 0);
  tail.rotation.z = -Math.PI / 4;
  tail.castShadow = true;
  cat.add(tail);
  
  // Legs - simple cylinders
  const legGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.05, size * 0.3);
  const legs = [];
  const legPositions = [
    { x: size * 0.3, z: size * 0.15 },
    { x: size * 0.3, z: -size * 0.15 },
    { x: -size * 0.3, z: size * 0.15 },
    { x: -size * 0.3, z: -size * 0.15 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.15, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    cat.add(leg);
  });
  
  cat.position.set(x, 0, z);
  cat.userData = {
    type: 'cat',
    removable: true,
    isAnimal: true,
    legs: legs,
    tail: tail,
    moveSpeed: CONFIG.objects.cat.moveSpeed || 2,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    wanderRadius: 5
  };

  // Add to scene and track in interiorAnimals array for animation
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(cat);
    interiorAnimals.push(cat); // Add to array so it gets animated
  } else {
    interactableObjects.add(cat);
    interiorAnimals.push(cat);
  }

  return cat;
}

/**
 * Creates a dog at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created dog object
 */
export function createDog(x, z) {
  const dog = new THREE.Group();
  const size = CONFIG.objects.dog.size;

  // Body - using cylinder (CapsuleGeometry not available in Three.js r128)
  const bodyGeometry = new THREE.CylinderGeometry(size * 0.25, size * 0.25, size * 0.9, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.objects.dog.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.45;
  body.rotation.z = Math.PI / 2; // Rotate to horizontal
  body.castShadow = true;
  body.receiveShadow = true;
  dog.add(body);

  // Head - rounded using sphere
  const headGeometry = new THREE.SphereGeometry(size * 0.25, 12, 12);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.65, size * 0.5, 0);
  head.scale.set(1.1, 1, 1); // Slightly elongated forward
  head.castShadow = true;
  dog.add(head);

  // Snout - rounded cone for more realistic muzzle
  const snoutGeometry = new THREE.ConeGeometry(size * 0.12, size * 0.3, 8);
  const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
  snout.position.set(size * 0.88, size * 0.42, 0);
  snout.rotation.z = -Math.PI / 2; // Point forward
  snout.castShadow = true;
  dog.add(snout);

  // Nose - black sphere at tip of snout
  const noseGeometry = new THREE.SphereGeometry(size * 0.06, 6, 6);
  const noseMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.4
  });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(size * 1.03, size * 0.42, 0);
  dog.add(nose);

  // Ears - floppy using flattened boxes
  const earGeometry = new THREE.BoxGeometry(size * 0.12, size * 0.25, size * 0.04);
  const earMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.objects.dog.earColor,
    roughness: 0.9
  });
  const ear1 = new THREE.Mesh(earGeometry, earMaterial);
  ear1.position.set(size * 0.55, size * 0.62, size * 0.2);
  ear1.rotation.set(0.2, 0, 0.4); // Angled down and out
  ear1.castShadow = true;
  dog.add(ear1);

  const ear2 = new THREE.Mesh(earGeometry, earMaterial);
  ear2.position.set(size * 0.55, size * 0.62, -size * 0.2);
  ear2.rotation.set(0.2, 0, -0.4); // Angled down and out
  ear2.castShadow = true;
  dog.add(ear2);

  // Eyes - white sclera with dark pupils
  const eyeWhiteGeometry = new THREE.SphereGeometry(size * 0.09, 8, 8);
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.6
  });
  const eyeWhite1 = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
  eyeWhite1.position.set(size * 0.78, size * 0.56, size * 0.15);
  eyeWhite1.scale.set(1, 1, 0.6); // Flatten slightly
  dog.add(eyeWhite1);

  const eyeWhite2 = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
  eyeWhite2.position.set(size * 0.78, size * 0.56, -size * 0.15);
  eyeWhite2.scale.set(1, 1, 0.6); // Flatten slightly
  dog.add(eyeWhite2);

  // Pupils - dark brown/black
  const pupilGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a0f00,
    roughness: 0.2
  });
  const pupil1 = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupil1.position.set(size * 0.83, size * 0.56, size * 0.15);
  dog.add(pupil1);

  const pupil2 = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupil2.position.set(size * 0.83, size * 0.56, -size * 0.15);
  dog.add(pupil2);
  
  // Tail - wagging, more tapered
  const tailGeometry = new THREE.ConeGeometry(size * 0.06, size * 0.5, 6);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.55, size * 0.55, 0);
  tail.rotation.set(0, 0, -Math.PI / 2.5); // Angle upward
  tail.castShadow = true;
  dog.add(tail);

  // Store tail reference for wagging animation
  dog.userData.tail = tail;

  // Legs - using cylinders (CapsuleGeometry not available in Three.js r128)
  const legGeometry = new THREE.CylinderGeometry(size * 0.055, size * 0.055, size * 0.25, 8);
  const legs = [];
  const legPositions = [
    { x: size * 0.35, z: size * 0.18 },
    { x: size * 0.35, z: -size * 0.18 },
    { x: -size * 0.3, z: size * 0.18 },
    { x: -size * 0.3, z: -size * 0.18 }
  ];

  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.2, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    dog.add(leg);
  });
  
  dog.position.set(x, 0, z);
  dog.userData = {
    type: 'dog',
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.dog.moveSpeed || 3,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    wanderRadius: 6,
    tail: tail
  };

  // Add to scene and track in interiorAnimals array for animation
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(dog);
    interiorAnimals.push(dog); // Add to array so it gets animated
  } else {
    interactableObjects.add(dog);
    interiorAnimals.push(dog);
  }

  return dog;
}
