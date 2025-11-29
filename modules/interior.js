/**
 * Interior World System
 * 
 * Creates dynamic interior rooms that match the exterior house style.
 * Each house has its own unique interior based on its dimensions and colors.
 */

import { CONFIG } from './config.js';
import { scene, worldState, interiorObjects, interiorAnimals } from './gameState.js';
import { disposeObject } from './utils.js';
import { addFurnitureToInterior } from './interiorObjects.js';
import { createCat, createDog } from './interiorAnimals.js';

/**
 * Computes interior room properties from a house style
 * Interior is slightly larger than exterior to feel spacious
 * @param {Object} houseStyle - The house style object from houseGenerator
 * @returns {Object} Interior properties (dimensions and colors)
 */
function computeInteriorFromStyle(houseStyle) {
  const palettes = CONFIG.house.palettes;
  
  // Interior is scaled up from house exterior (feels bigger inside)
  const interiorScale = 1.6;
  const roomWidth = houseStyle.width * interiorScale;
  const roomDepth = houseStyle.depth * interiorScale;
  const roomHeight = Math.max(2.8, houseStyle.height * 0.85); // Min 2.8m ceiling
  
  // Derive interior colors from house palette
  const exteriorWallColor = palettes.walls[houseStyle.wallColorIndex];
  const doorColor = palettes.doors[houseStyle.doorColorIndex];
  const trimColor = palettes.trim[houseStyle.trimColorIndex];
  
  // Make interior walls lighter/warmer than exterior
  const interiorWallColor = lightenColor(exteriorWallColor, 0.15);
  // Floor uses a wood tone based on trim color
  const floorColor = darkenColor(trimColor, 0.3);
  
  return {
    roomWidth,
    roomDepth,
    roomHeight,
    wallColor: interiorWallColor,
    floorColor,
    ceilingColor: 0xFFFFF8, // Warm white ceiling
    doorColor,
    trimColor
  };
}

/**
 * Lightens a hex color by a percentage
 * @param {number} color - Hex color value
 * @param {number} percent - Amount to lighten (0-1)
 * @returns {number} Lightened hex color
 */
function lightenColor(color, percent) {
  const r = Math.min(255, ((color >> 16) & 0xFF) + Math.floor(255 * percent));
  const g = Math.min(255, ((color >> 8) & 0xFF) + Math.floor(255 * percent));
  const b = Math.min(255, (color & 0xFF) + Math.floor(255 * percent));
  return (r << 16) | (g << 8) | b;
}

/**
 * Darkens a hex color by a percentage
 * @param {number} color - Hex color value
 * @param {number} percent - Amount to darken (0-1)
 * @returns {number} Darkened hex color
 */
function darkenColor(color, percent) {
  const r = Math.max(0, Math.floor(((color >> 16) & 0xFF) * (1 - percent)));
  const g = Math.max(0, Math.floor(((color >> 8) & 0xFF) * (1 - percent)));
  const b = Math.max(0, Math.floor((color & 0xFF) * (1 - percent)));
  return (r << 16) | (g << 8) | b;
}

/**
 * Creates an interior room environment matching the house style
 * @param {THREE.Object3D} house - The house object being entered
 * @param {boolean} skipFurniture - Whether to skip adding default furniture
 */
export function createInterior(house, skipFurniture = false) {
  // Create interior group
  worldState.interiorGroup = new THREE.Group();
  worldState.interiorGroup.name = 'interior';
  
  // Get house style and compute interior properties
  const houseStyle = house.userData.style;
  let interior;
  
  if (houseStyle) {
    // Dynamic interior based on house style
    interior = computeInteriorFromStyle(houseStyle);
  } else {
    // Fallback to default CONFIG values for old houses
    interior = {
      roomWidth: CONFIG.interior.roomSize,
      roomDepth: CONFIG.interior.roomSize,
      roomHeight: CONFIG.interior.ceilingHeight,
      wallColor: CONFIG.interior.wallColor,
      floorColor: CONFIG.interior.floorColor,
      ceilingColor: CONFIG.interior.ceilingColor,
      doorColor: CONFIG.objects.house.doorColor,
      trimColor: 0x8B4513
    };
  }
  
  // Store interior dimensions in worldState for furniture placement bounds
  worldState.currentInterior = interior;
  
  const { roomWidth, roomDepth, roomHeight, wallColor, floorColor, ceilingColor, doorColor, trimColor } = interior;
  
  // Floor
  const floorGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomDepth);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: floorColor,
    roughness: 0.8
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  worldState.interiorGroup.add(floor);
  
  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: wallColor,
    roughness: 0.9
  });
  
  // Back wall
  const backWallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
  backWall.receiveShadow = true;
  worldState.interiorGroup.add(backWall);
  
  // Left wall
  const sideWallGeometry = new THREE.BoxGeometry(0.2, roomHeight, roomDepth);
  const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
  leftWall.receiveShadow = true;
  worldState.interiorGroup.add(leftWall);
  
  // Right wall
  const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
  rightWall.receiveShadow = true;
  worldState.interiorGroup.add(rightWall);
  
  // Front wall with door opening (door width is ~2m)
  const doorWidth = 2;
  const frontWallSideWidth = (roomWidth - doorWidth) / 2;
  
  const frontWallLeftGeometry = new THREE.BoxGeometry(frontWallSideWidth, roomHeight, 0.2);
  const frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, wallMaterial);
  frontWallLeft.position.set(-roomWidth / 2 + frontWallSideWidth / 2, roomHeight / 2, roomDepth / 2);
  frontWallLeft.receiveShadow = true;
  worldState.interiorGroup.add(frontWallLeft);
  
  const frontWallRightGeometry = new THREE.BoxGeometry(frontWallSideWidth, roomHeight, 0.2);
  const frontWallRight = new THREE.Mesh(frontWallRightGeometry, wallMaterial);
  frontWallRight.position.set(roomWidth / 2 - frontWallSideWidth / 2, roomHeight / 2, roomDepth / 2);
  frontWallRight.receiveShadow = true;
  worldState.interiorGroup.add(frontWallRight);
  
  // Top of door frame
  const doorFrameHeight = roomHeight - 2.2;
  const doorFrameTopGeometry = new THREE.BoxGeometry(doorWidth, doorFrameHeight, 0.2);
  const doorFrameTop = new THREE.Mesh(doorFrameTopGeometry, wallMaterial);
  doorFrameTop.position.set(0, roomHeight - doorFrameHeight / 2, roomDepth / 2);
  doorFrameTop.receiveShadow = true;
  worldState.interiorGroup.add(doorFrameTop);
  
  // Ceiling
  const ceilingGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomDepth);
  const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: ceilingColor,
    roughness: 1
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.position.y = roomHeight;
  ceiling.receiveShadow = true;
  worldState.interiorGroup.add(ceiling);
  
  // Baseboard trim around the room
  addBaseboards(worldState.interiorGroup, roomWidth, roomDepth, trimColor);
  
  // Exit door (interactive)
  const exitDoorGeometry = new THREE.BoxGeometry(1.8, 2.2, 0.15);
  const exitDoorMaterial = new THREE.MeshStandardMaterial({ color: doorColor });
  const exitDoor = new THREE.Mesh(exitDoorGeometry, exitDoorMaterial);
  exitDoor.position.set(0, 1.1, roomDepth / 2 - 0.1);
  exitDoor.userData = {
    type: 'door',
    isInteractive: true,
    isExitDoor: true,
    originalMaterial: exitDoorMaterial
  };
  exitDoor.name = 'exitDoor';
  worldState.interiorGroup.add(exitDoor);
  
  // Interior lighting - scale light range with room size
  const lightRange = Math.max(roomWidth, roomDepth) * 1.5;
  const interiorLight = new THREE.PointLight(0xFFFAF0, 0.9, lightRange);
  interiorLight.position.set(0, roomHeight - 0.3, 0);
  interiorLight.castShadow = true;
  interiorLight.shadow.mapSize.width = 1024;
  interiorLight.shadow.mapSize.height = 1024;
  worldState.interiorGroup.add(interiorLight);
  
  // Add a subtle fill light for ambiance
  const fillLight = new THREE.PointLight(0xFFE4C4, 0.3, lightRange * 0.8);
  fillLight.position.set(0, roomHeight * 0.5, -roomDepth * 0.3);
  worldState.interiorGroup.add(fillLight);
  
  // Add furniture only if not loading saved interior
  if (!skipFurniture) {
    addFurnitureToInterior(roomWidth, roomDepth);
    
    // Add some interior animals in positions scaled to room
    createCat(-roomWidth / 3, -roomDepth / 4);
    createDog(roomWidth / 4, -roomDepth / 4);
  }
  
  // Add the interior to the scene
  scene.add(worldState.interiorGroup);
  
  // Only collect objects if we added default furniture (not when loading saved interior)
  if (!skipFurniture) {
    // Clear the arrays first to avoid duplicates
    interiorObjects.length = 0;
    interiorAnimals.length = 0;
    
    // Store interior objects for cleanup
    worldState.interiorGroup.traverse(child => {
      if (child.userData && child.userData.type) {
        // Add furniture objects
        if (['chair', 'table', 'couch', 'tv', 'bed'].includes(child.userData.type)) {
          interiorObjects.push(child);
        }
        // Add animal objects
        else if (['cat', 'dog'].includes(child.userData.type)) {
          interiorAnimals.push(child);
        }
      }
    });
  }
}

/**
 * Adds baseboard trim around the interior walls
 * @param {THREE.Group} group - Interior group to add to
 * @param {number} roomWidth - Room width
 * @param {number} roomDepth - Room depth
 * @param {number} trimColor - Color for baseboards
 */
function addBaseboards(group, roomWidth, roomDepth, trimColor) {
  const baseboardHeight = 0.12;
  const baseboardDepth = 0.04;
  const baseboardMaterial = new THREE.MeshStandardMaterial({ 
    color: trimColor,
    roughness: 0.6
  });
  
  // Back baseboard
  const backBoard = new THREE.Mesh(
    new THREE.BoxGeometry(roomWidth, baseboardHeight, baseboardDepth),
    baseboardMaterial
  );
  backBoard.position.set(0, baseboardHeight / 2, -roomDepth / 2 + baseboardDepth / 2);
  group.add(backBoard);
  
  // Left baseboard
  const leftBoard = new THREE.Mesh(
    new THREE.BoxGeometry(baseboardDepth, baseboardHeight, roomDepth),
    baseboardMaterial
  );
  leftBoard.position.set(-roomWidth / 2 + baseboardDepth / 2, baseboardHeight / 2, 0);
  group.add(leftBoard);
  
  // Right baseboard
  const rightBoard = new THREE.Mesh(
    new THREE.BoxGeometry(baseboardDepth, baseboardHeight, roomDepth),
    baseboardMaterial
  );
  rightBoard.position.set(roomWidth / 2 - baseboardDepth / 2, baseboardHeight / 2, 0);
  group.add(rightBoard);
}


/**
 * Removes the interior and restores the outside world
 */
export function removeInterior() {
  if (worldState.interiorGroup) {
    // Remove all interior objects
    interiorObjects.forEach(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    
    scene.remove(worldState.interiorGroup);
    worldState.interiorGroup = null;
    interiorObjects.length = 0; // Clear the array
    
    // Also dispose and clear interior animals
    interiorAnimals.forEach(animal => {
      if (animal.parent) {
        animal.parent.remove(animal);
      }
      disposeObject(animal);
    });
    interiorAnimals.length = 0; // Clear the array
  }
}

