/**
 * Dropped Resources Module
 *
 * Handles creation and management of resources dropped on the ground
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import { worldObjects, interactableObjects, camera } from './gameState.js';
import { isValidResource } from './resources.js';

// Array to track all dropped resources
export const droppedResources = [];

/**
 * Creates a dropped resource at the specified position
 * @param {string} resourceType - Type of resource (e.g., 'wood')
 * @param {number} amount - Amount of resource in this drop
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created resource drop object
 */
export function createDroppedResource(resourceType, amount, x, z) {
  if (!isValidResource(resourceType)) {
    console.warn(`Attempted to drop unknown resource type: ${resourceType}`);
    return null;
  }

  const dropAmount = Math.max(1, Math.floor(amount));
  if (dropAmount <= 0) return null;

  const resourceDrop = new THREE.Group();

  // Create visual representation based on resource type
  if (resourceType === 'wood') {
    // Create a wood log mesh
    const logGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
    const logMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513, // Brown
      roughness: 0.8
    });
    const log = new THREE.Mesh(logGeometry, logMaterial);
    log.rotation.z = Math.PI / 2; // Lay it on its side
    log.position.y = 0.15;
    log.castShadow = true;
    log.receiveShadow = true;
    resourceDrop.add(log);

    // Add end caps (lighter color)
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xD2B48C, // Tan
      roughness: 0.7
    });
    const capGeometry = new THREE.CircleGeometry(0.15, 8);

    const cap1 = new THREE.Mesh(capGeometry, capMaterial);
    cap1.rotation.y = Math.PI / 2;
    cap1.position.set(0.3, 0.15, 0);
    resourceDrop.add(cap1);

    const cap2 = new THREE.Mesh(capGeometry, capMaterial);
    cap2.rotation.y = -Math.PI / 2;
    cap2.position.set(-0.3, 0.15, 0);
    resourceDrop.add(cap2);
  } else if (resourceType === 'stone') {
    // Create a stone chunk mesh (irregular dodecahedron)
    const stoneGeometry = new THREE.DodecahedronGeometry(0.3, 0);
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x696969, // Gray
      roughness: 0.9,
      metalness: 0.1
    });
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.y = 0.3;
    stone.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    stone.scale.set(
      0.8 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4
    );
    stone.castShadow = true;
    stone.receiveShadow = true;
    resourceDrop.add(stone);
  }

  // Position the resource
  resourceDrop.position.set(x, 0, z);
  resourceDrop.rotation.y = Math.random() * Math.PI * 2;

  // Store metadata
  resourceDrop.userData = {
    type: 'droppedResource',
    resourceType: resourceType,
    amount: dropAmount,
    removable: false // Can't be removed with spacebar, only picked up
  };

  // Add to tracking arrays
  droppedResources.push(resourceDrop);
  worldObjects.push(resourceDrop);
  interactableObjects.add(resourceDrop);

  return resourceDrop;
}

/**
 * Drops a resource near the player's position
 * @param {string} resourceType - Type of resource to drop
 * @param {number} amount - Amount to drop
 */
export function dropResourceNearPlayer(resourceType, amount) {
  if (amount <= 0 || !isValidResource(resourceType)) return null;

  // Calculate drop position in front of player
  const dropDistance = 2;
  const dropX = camera.position.x + Math.sin(camera.rotation.y) * dropDistance;
  const dropZ = camera.position.z + Math.cos(camera.rotation.y) * dropDistance;

  return createDroppedResource(resourceType, amount, dropX, dropZ);
}

/**
 * Removes a dropped resource from the world
 * @param {THREE.Group} resourceDrop - The resource drop to remove
 */
export function removeDroppedResource(resourceDrop) {
  // Remove from droppedResources array
  const index = droppedResources.indexOf(resourceDrop);
  if (index > -1) {
    droppedResources.splice(index, 1);
  }

  // Remove from worldObjects array
  const worldIndex = worldObjects.indexOf(resourceDrop);
  if (worldIndex > -1) {
    worldObjects.splice(worldIndex, 1);
  }

  // Remove from interactable objects
  interactableObjects.remove(resourceDrop);

  // Dispose of geometry and materials
  resourceDrop.traverse(child => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(material => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });

  // Remove from scene
  if (resourceDrop.parent) {
    resourceDrop.parent.remove(resourceDrop);
  }
}
