/**
 * World Objects Module
 * 
 * Handles creation and management of outdoor static objects (trees, rocks, houses)
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import { worldObjects, interactableObjects } from './gameState.js';
import { generateHouseStyle, createHouseFromStyle } from './houseGenerator.js';

/**
 * Creates a tree at the specified position with varied shapes and styles
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 */
export function createTree(x, z) {
  const tree = new THREE.Group();

  // Random tree style (0-4 for different tree types)
  const treeStyle = Math.floor(Math.random() * 5);

  // Random variations for size
  const heightVariation = CONFIG.objects.tree.minHeight + Math.random() * (CONFIG.objects.tree.maxHeight - CONFIG.objects.tree.minHeight);
  const radiusVariation = CONFIG.objects.tree.minRadius + Math.random() * (CONFIG.objects.tree.maxRadius - CONFIG.objects.tree.minRadius);

  // Trunk material
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.objects.tree.trunkColor,
    roughness: 0.8
  });

  // Foliage material with green color variation only
  // Vary only the green channel to keep it in green shades
  const baseColor = CONFIG.objects.tree.foliageColor;
  const greenVariation = Math.floor(Math.random() * 0x002200); // Only vary green channel
  const foliageColorVariation = baseColor + greenVariation;
  const foliageMaterial = new THREE.MeshStandardMaterial({
    color: foliageColorVariation,
    roughness: 0.9
  });

  switch(treeStyle) {
    case 0: // Tall Pine Tree (conical)
      {
        const trunkHeight = heightVariation * 0.35;
        const foliageHeight = heightVariation * 0.65;
        const trunkRadius = radiusVariation * 0.12;

        // Thin trunk
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius, trunkHeight, 6);
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Sharp cone foliage
        const foliageGeometry = new THREE.ConeGeometry(radiusVariation * 0.8, foliageHeight, 8);
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + foliageHeight / 2;
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        tree.add(foliage);
      }
      break;

    case 1: // Round Oak Tree (spherical)
      {
        const trunkHeight = heightVariation * 0.5;
        const foliageRadius = radiusVariation * 1.2;
        const trunkRadius = radiusVariation * 0.2;

        // Thicker trunk
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 8);
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Spherical foliage
        const foliageGeometry = new THREE.SphereGeometry(foliageRadius, 8, 8);
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + foliageRadius * 0.7;
        foliage.scale.y = 0.9; // Slightly squashed
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        tree.add(foliage);
      }
      break;

    case 2: // Bushy Tree (multiple layers)
      {
        const trunkHeight = heightVariation * 0.4;
        const layerHeight = heightVariation * 0.25;
        const trunkRadius = radiusVariation * 0.18;

        // Medium trunk
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius, trunkHeight, 8);
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Multiple cone layers for bushy effect
        const numLayers = 3;
        for (let i = 0; i < numLayers; i++) {
          const layerRadius = radiusVariation * (1.2 - i * 0.25);
          const layerGeometry = new THREE.ConeGeometry(layerRadius, layerHeight, 8);
          const layer = new THREE.Mesh(layerGeometry, foliageMaterial);
          layer.position.y = trunkHeight + i * layerHeight * 0.5 + layerHeight / 2;
          layer.castShadow = true;
          layer.receiveShadow = true;
          tree.add(layer);
        }
      }
      break;

    case 3: // Willow-style (droopy, wide)
      {
        const trunkHeight = heightVariation * 0.6;
        const foliageHeight = heightVariation * 0.5;
        const trunkRadius = radiusVariation * 0.15;

        // Slightly curved trunk
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.9, trunkRadius, trunkHeight, 8);
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.rotation.z = (Math.random() - 0.5) * 0.1; // Slight lean
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Wide, short foliage
        const foliageGeometry = new THREE.DodecahedronGeometry(radiusVariation * 1.3);
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + foliageHeight * 0.3;
        foliage.scale.set(1.3, 0.7, 1.3); // Flat and wide
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        tree.add(foliage);
      }
      break;

    case 4: // Small Shrub Tree (short and bushy)
      {
        const trunkHeight = heightVariation * 0.2;
        const foliageRadius = radiusVariation * 1.1;
        const trunkRadius = radiusVariation * 0.12;

        // Very short trunk
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 1.2, trunkHeight, 6);
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Multiple small spheres for bushy shrub effect
        const mainFoliage = new THREE.Mesh(
          new THREE.DodecahedronGeometry(foliageRadius),
          foliageMaterial
        );
        mainFoliage.position.y = trunkHeight + foliageRadius * 0.8;
        mainFoliage.scale.set(1, 0.85, 1);
        mainFoliage.castShadow = true;
        mainFoliage.receiveShadow = true;
        tree.add(mainFoliage);

        // Add a smaller top cluster
        const topCluster = new THREE.Mesh(
          new THREE.SphereGeometry(foliageRadius * 0.6, 6, 6),
          foliageMaterial
        );
        topCluster.position.y = trunkHeight + foliageRadius * 1.5;
        topCluster.castShadow = true;
        topCluster.receiveShadow = true;
        tree.add(topCluster);
      }
      break;
  }

  // Add rotation variation
  tree.rotation.y = Math.random() * Math.PI * 2;

  tree.position.set(x, 0, z);

  // Add health system - trees have 3-7 health (requires 3-7 punches to destroy)
  const treeHealth = 3 + Math.floor(Math.random() * 5);
  tree.userData = {
    type: 'tree',
    removable: true,
    health: treeHealth,
    maxHealth: treeHealth
  };

  worldObjects.push(tree);
  interactableObjects.add(tree);

  return tree;
}

/**
 * Creates a rock at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 */
export function createRock(x, z) {
  const rockGeometry = new THREE.DodecahedronGeometry(1, 0);
  const rockMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.rock.color,
    roughness: 0.9
  });
  const rock = new THREE.Mesh(rockGeometry, rockMaterial);
  
  rock.position.set(x, 0.5, z);
  rock.scale.set(
    0.5 + Math.random() * 0.5,
    0.3 + Math.random() * 0.4,
    0.5 + Math.random() * 0.5
  );
  rock.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  
  rock.castShadow = true;
  rock.receiveShadow = true;

  // Add health system - rocks have 4-8 health (requires 4-8 punches to destroy)
  const rockHealth = 4 + Math.floor(Math.random() * 5);
  rock.userData = {
    type: 'rock',
    removable: true,
    health: rockHealth,
    maxHealth: rockHealth
  };

  worldObjects.push(rock);
  interactableObjects.add(rock);

  return rock;
}

/**
 * Creates a house at the specified position with dynamic styling
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @param {string} uuid - Optional UUID to preserve during save/load (for interior persistence)
 * @param {Object} style - Optional house style object (used for save/load to recreate identical houses)
 * @returns {THREE.Group} The created house object
 */
export function createHouse(x, z, uuid = null, style = null) {
  // Generate or use provided style
  const houseStyle = style || generateHouseStyle();
  
  // Create the house mesh from the style
  const house = createHouseFromStyle(houseStyle);
  
  // Preserve UUID if provided (for save/load persistence)
  if (uuid) {
    house.uuid = uuid;
  }
  
  // Position the house
  house.position.set(x, 0, z);
  
  // Store metadata including the style for save/load
  house.userData = { 
    type: 'house', 
    removable: true,
    style: houseStyle  // Store style for persistence
  };
  
  // Find the door mesh and update its parentHouse reference
  house.traverse(child => {
    if (child.userData && child.userData.type === 'door') {
      child.userData.parentHouse = house;
    }
  });
  
  worldObjects.push(house);
  interactableObjects.add(house);
  
  return house;
}

/**
 * Creates initial world objects
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function createInitialWorldObjects(scene) {
  // Create a grid of objects
  for (let i = 0; i < CONFIG.world.objectCount; i++) {
    const x = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    const z = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    
    // Random object type
    const type = Math.random();
    
    if (type < 0.45) {
      createTree(x, z);
    } else if (type < 0.65) {
      createRock(x, z);
    } else {
      createHouse(x, z);
    }
  }
}
