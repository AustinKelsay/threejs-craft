/**
 * Input handling system
 */

import { CONFIG } from './config.js';
import { getResourceIcon, getResourceLabel } from './resources.js';
import {
  renderer, camera, keys, mouseControls, player, highlightedObject,
  cameraController, worldState, interactableObjects, skyMesh, sunMesh,
  moonMesh, sunLight, moonLight, ambientLight, uiElements, setSelectedObjectType,
  selectedObjectType, ghostRotation, setGhostRotation, setInventoryOpen, addResource,
  removeResource, hasResourceAmount, worldObjects, inventoryOpen, selectedInventoryResource, raycaster, mobs
} from './gameState.js';
import { buildObject, removeObject, resetObjectHighlight } from './building.js';
import { updateObjectSelector, updateSelectorContent, updateSaveStatus, toggleInventory, updateInventoryDisplay } from './ui.js';
import { saveGameState, loadGameState, hasSaveData, saveCurrentInterior, loadHouseInterior } from './saveLoad.js';
import { applyCameraMovement, updateCameraRotation } from './camera.js';
import { createInterior, removeInterior } from './interior.js';
import { dropResourceNearPlayer, removeDroppedResource } from './droppedResources.js';
import { disposeObject } from './utils.js';
import { damageMob } from './mobs.js';
import { triggerPunchAnimation } from './hands.js';
import { mountDragon, dismountDragon, isMounted } from './mount.js';

/**
 * Setup all event listeners
 */
export function setupEventListeners() {
  // Keyboard controls
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  
  // Mouse controls
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onClick);
  document.addEventListener('pointerlockchange', onPointerLockChange);
  
  // Save/Load button handlers
  const saveButton = document.getElementById('saveButton');
  const loadButton = document.getElementById('loadButton');
  
  if (saveButton) {
    saveButton.addEventListener('click', handleSave);
  }
  
  if (loadButton) {
    loadButton.addEventListener('click', handleLoad);
  }
}

/**
 * Handle keydown events
 * @param {KeyboardEvent} event
 */
function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      keys.forward = true;
      break;
    case 'KeyS':
    case 'ArrowDown':
      keys.backward = true;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      keys.left = true;
      break;
    case 'KeyD':
    case 'ArrowRight':
      keys.right = true;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keys.sprint = true;
      break;
    case 'Space':
      if (isMounted()) {
        event.preventDefault();
        return;
      }
      if (event.target === document.body) {
        event.preventDefault();
        // Handle both jump and remove
        if (highlightedObject) {
          removeObject();
        } else if (player.canJump) {
          player.velocity.y = CONFIG.player.jumpSpeed;
          player.canJump = false;
        }
      }
      break;
    case 'KeyQ':
      // Rotate ghost object counter-clockwise when building
      if (selectedObjectType !== 0) {
        setGhostRotation(ghostRotation + Math.PI / 4);
      } else if (!mouseControls.active) {
        // Normal camera rotation when not building
        applyCameraMovement(0.1, 0);
      }
      break;
    case 'KeyE':
      // Rotate ghost object clockwise when building
      if (selectedObjectType !== 0) {
        setGhostRotation(ghostRotation - Math.PI / 4);
      } else if (!mouseControls.active) {
        // Normal camera rotation when not building
        applyCameraMovement(-0.1, 0);
      }
      break;
    case 'KeyB':
      buildObject();
      break;
    case 'Digit0':
      setSelectedObjectType(0); // Fists
      updateObjectSelector();
      break;
    case 'Digit1':
      setSelectedObjectType(1); // Tree
      updateObjectSelector();
      break;
    case 'Digit2':
      setSelectedObjectType(2); // Rock
      updateObjectSelector();
      break;
    case 'Digit3':
      setSelectedObjectType(3); // House
      updateObjectSelector();
      break;
    case 'Digit4':
      setSelectedObjectType(4); // Cow
      updateObjectSelector();
      break;
    case 'Digit5':
      setSelectedObjectType(5); // Pig
      updateObjectSelector();
      break;
    case 'Digit6':
      setSelectedObjectType(6); // Horse
      updateObjectSelector();
      break;
    case 'Digit7':
      setSelectedObjectType(7); // Dog (when inside)
      updateObjectSelector();
      break;
    case 'F5':
      event.preventDefault(); // Prevent browser refresh
      handleSave();
      break;
    case 'F9':
      event.preventDefault();
      handleLoad();
      break;
    case 'KeyI':
      const isOpen = toggleInventory();
      setInventoryOpen(isOpen);
      break;
    case 'Backspace':
      if (isMounted()) {
        event.preventDefault();
        dismountDragon();
      }
      break;
    case 'KeyG':
      handleDropResource();
      break;
  }
}

/**
 * Handle keyup events
 * @param {KeyboardEvent} event
 */
function onKeyUp(event) {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      keys.forward = false;
      break;
    case 'KeyS':
    case 'ArrowDown':
      keys.backward = false;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      keys.left = false;
      break;
    case 'KeyD':
    case 'ArrowRight':
      keys.right = false;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keys.sprint = false;
      break;
  }
}

/**
 * Handle mouse move events
 * @param {MouseEvent} event
 */
function onMouseMove(event) {
  if (mouseControls.active) {
    mouseControls.movementX = event.movementX || 0;
    mouseControls.movementY = event.movementY || 0;
  }
}

/**
 * Handle click events
 */
function onClick() {
  // Check if clicking on a door
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'door') {
    handleDoorClick(highlightedObject);
    return;
  }

  // Check if picking up a dropped resource
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'droppedResource') {
    handleResourcePickup(highlightedObject);
    return;
  }

  // Mount a dragon when clicked
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'dragon' && !isMounted()) {
    mountDragon(highlightedObject);
    if (!mouseControls.active) {
      renderer.domElement.requestPointerLock();
    }
    return;
  }

  // Check if punching a tree with fists
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'tree' && selectedObjectType === 0) {
    handleTreePunch(highlightedObject);
    return;
  }

  // Check if punching a rock with fists
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'rock' && selectedObjectType === 0) {
    handleRockPunch(highlightedObject);
    return;
  }

  // Check if punching a mob with fists
  if (highlightedObject && highlightedObject.userData && highlightedObject.userData.type === 'mob' && selectedObjectType === 0) {
    handleMobPunch(highlightedObject);
    return;
  }

  // Fallback: try to punch a mob directly under crosshair within short range
  if (selectedObjectType === 0 && tryPunchMobAtCrosshair()) {
    return;
  }

  // Swing fists even if nothing is hit when we're in control
  if (selectedObjectType === 0 && mouseControls.active) {
    triggerPunchAnimation();
  }

  // Otherwise handle pointer lock
  if (!mouseControls.active) {
    renderer.domElement.requestPointerLock();
  }
}

/**
 * Handle pointer lock change events
 */
function onPointerLockChange() {
  mouseControls.active = document.pointerLockElement === renderer.domElement;
}

/**
 * Handles door click interactions
 * @param {THREE.Mesh} door - The door being clicked
 */
function handleDoorClick(door) {
  if (door.userData.isExitDoor) {
    // Exit from interior to outside
    exitToOutside();
  } else if (door.userData.parentHouse) {
    // Enter from outside to interior
    enterHouse(door.userData.parentHouse);
  }
}

// Tree interaction tuning constants (kept here for quick balancing)
const TREE_PUNCH_DAMAGE = 1;
const TREE_WOOD_REWARD_RANGE = { min: 1, max: 3 };
const PLAYER_PUNCH_DAMAGE = CONFIG.player.punchDamage;
const MOB_PUNCH_RANGE = 4;

// Rock interaction tuning constants
const ROCK_PUNCH_DAMAGE = 1;
const ROCK_STONE_REWARD_RANGE = { min: 1, max: 2 };

/**
 * Handles punching a tree to get wood
 * @param {THREE.Object3D} tree - The tree being punched
 */
function handleTreePunch(tree) {
  if (!tree?.userData || tree.userData.type !== 'tree') {
    return;
  }

  triggerPunchAnimation();

  const woodGained = randomIntInRange(
    TREE_WOOD_REWARD_RANGE.min,
    TREE_WOOD_REWARD_RANGE.max
  );
  addResource('wood', woodGained);

  // Decrease tree health
  const treeHealth = applyTreeDamage(tree, TREE_PUNCH_DAMAGE);

  // Update inventory display if open
  updateInventoryDisplay();

  // Show feedback message with health
  showResourceGainedMessage(`+${woodGained} Wood 🪵 (Tree: ${treeHealth.current}/${treeHealth.max} HP)`);

  // Check if tree should be destroyed
  if (treeHealth.destroyed) {
    destroyTree(tree);
    return;
  }

  shakeTree(tree);
}

/**
 * Handles punching a rock to get stone
 * @param {THREE.Object3D} rock - The rock being punched
 */
function handleRockPunch(rock) {
  if (!rock?.userData || rock.userData.type !== 'rock') {
    return;
  }

  triggerPunchAnimation();

  const stoneGained = randomIntInRange(
    ROCK_STONE_REWARD_RANGE.min,
    ROCK_STONE_REWARD_RANGE.max
  );
  addResource('stone', stoneGained);

  // Decrease rock health
  const rockHealth = applyRockDamage(rock, ROCK_PUNCH_DAMAGE);

  // Update inventory display if open
  updateInventoryDisplay();

  // Show feedback message with health
  showResourceGainedMessage(`+${stoneGained} Stone 🪨 (Rock: ${rockHealth.current}/${rockHealth.max} HP)`);

  // Check if rock should be destroyed
  if (rockHealth.destroyed) {
    destroyRock(rock);
    return;
  }

  shakeRock(rock);
}

/**
 * Handles punching a mob (e.g., spider).
 * @param {THREE.Object3D} mob
 */
function handleMobPunch(mob) {
  triggerPunchAnimation();
  damageMob(mob, PLAYER_PUNCH_DAMAGE);
  const hp = mob?.userData?.health ?? 0;
  const maxHp = mob?.userData?.maxHealth ?? 0;
  showResourceGainedMessage(`Hit! (${hp}/${maxHp})`);
}

/**
 * Raycast straight ahead to punch the nearest mob within range.
 * @returns {boolean} True if a mob was hit.
 */
function tryPunchMobAtCrosshair() {
  const centerPointer = new THREE.Vector2(0, 0);
  const oldFar = raycaster.far;
  raycaster.setFromCamera(centerPointer, camera);
  raycaster.far = MOB_PUNCH_RANGE;

  const intersects = raycaster.intersectObjects(mobs, true);
  raycaster.far = oldFar;
  for (let i = 0; i < intersects.length; i++) {
    const obj = findMobParent(intersects[i].object);
    if (obj) {
      handleMobPunch(obj);
      return true;
    }
  }
  return false;
}

/**
 * Walk up the parent chain to find a mob object.
 * @param {THREE.Object3D} mesh
 * @returns {THREE.Object3D|null}
 */
function findMobParent(mesh) {
  let current = mesh;
  while (current) {
    if (current.userData && current.userData.type === 'mob') return current;
    current = current.parent;
  }
  return null;
}

/**
 * Show a temporary message when resources are gained
 * @param {string} message - Message to display
 */
function showResourceGainedMessage(message) {
  // Create or update the resource message element
  let messageEl = document.getElementById('resourceMessage');

  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.id = 'resourceMessage';
    messageEl.style.cssText = `
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: #4CAF50;
      padding: 10px 20px;
      border-radius: 5px;
      font-family: Arial;
      font-size: 18px;
      font-weight: bold;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s;
    `;
    document.body.appendChild(messageEl);
  }

  messageEl.textContent = message;
  messageEl.style.opacity = '1';

  // Fade out after 1.5 seconds
  setTimeout(() => {
    messageEl.style.opacity = '0';
  }, 1500);
}

/**
 * Handles dropping a resource from inventory
 */
function handleDropResource() {
  if (!inventoryOpen) {
    showResourceGainedMessage('Open inventory [I] to choose a resource to drop');
    return;
  }

  const resourceType = selectedInventoryResource;
  const dropAmount = 1;

  if (!resourceType) {
    showResourceGainedMessage('Select a resource in inventory to drop');
    return;
  }

  if (!hasResourceAmount(resourceType, dropAmount)) {
    showResourceGainedMessage(`No ${getResourceLabel(resourceType)} to drop`);
    return;
  }

  removeResource(resourceType, dropAmount);
  dropResourceNearPlayer(resourceType, dropAmount);
  updateInventoryDisplay();
  const icon = getResourceIcon(resourceType);
  const label = getResourceLabel(resourceType);
  showResourceGainedMessage(`Dropped ${dropAmount} ${label} ${icon}`);
}

/**
 * Apply damage to a tree and report the resulting state.
 * @param {THREE.Object3D} tree
 * @param {number} damage
 * @returns {{destroyed: boolean, current: number, max: number}}
 */
function applyTreeDamage(tree, damage) {
  const appliedDamage = Math.max(1, Math.floor(damage));
  const max = tree.userData.maxHealth || tree.userData.health || 0;
  const remaining = Math.max(0, (tree.userData.health || 0) - appliedDamage);

  tree.userData.health = remaining;

  return {
    destroyed: remaining <= 0,
    current: remaining,
    max: max
  };
}

/**
 * Removes a destroyed tree from all tracking collections and scene graph.
 * @param {THREE.Object3D} tree
 */
function destroyTree(tree) {
  const index = worldObjects.indexOf(tree);
  if (index > -1) {
    worldObjects.splice(index, 1);
  }

  interactableObjects.remove(tree);
  disposeObject(tree);

  if (tree.parent) {
    tree.parent.remove(tree);
  }

  setTimeout(() => {
    showResourceGainedMessage('🌲 Tree destroyed!');
  }, 200);
}

/**
 * Temporary squash/rotate effect to give punch feedback.
 * @param {THREE.Object3D} tree
 */
function shakeTree(tree) {
  const originalY = tree.rotation.y;
  const originalScale = tree.scale.clone();

  tree.rotation.y += 0.05;
  tree.scale.multiplyScalar(0.95);

  setTimeout(() => {
    if (tree.parent) { // Check if tree still exists
      tree.rotation.y = originalY;
      tree.scale.copy(originalScale);
    }
  }, 100);
}

/**
 * Apply damage to a rock and report the resulting state.
 * @param {THREE.Object3D} rock
 * @param {number} damage
 * @returns {{destroyed: boolean, current: number, max: number}}
 */
function applyRockDamage(rock, damage) {
  const appliedDamage = Math.max(1, Math.floor(damage));
  const max = rock.userData.maxHealth || rock.userData.health || 0;
  const remaining = Math.max(0, (rock.userData.health || 0) - appliedDamage);

  rock.userData.health = remaining;

  return {
    destroyed: remaining <= 0,
    current: remaining,
    max: max
  };
}

/**
 * Removes a destroyed rock from all tracking collections and scene graph.
 * @param {THREE.Object3D} rock
 */
function destroyRock(rock) {
  const index = worldObjects.indexOf(rock);
  if (index > -1) {
    worldObjects.splice(index, 1);
  }

  interactableObjects.remove(rock);
  disposeObject(rock);

  if (rock.parent) {
    rock.parent.remove(rock);
  }

  setTimeout(() => {
    showResourceGainedMessage('🪨 Rock destroyed!');
  }, 200);
}

/**
 * Temporary squash/rotate effect to give punch feedback for rocks.
 * @param {THREE.Object3D} rock
 */
function shakeRock(rock) {
  const originalRotX = rock.rotation.x;
  const originalRotZ = rock.rotation.z;
  const originalScale = rock.scale.clone();

  rock.rotation.x += 0.1;
  rock.rotation.z += 0.1;
  rock.scale.multiplyScalar(0.93);

  setTimeout(() => {
    if (rock.parent) { // Check if rock still exists
      rock.rotation.x = originalRotX;
      rock.rotation.z = originalRotZ;
      rock.scale.copy(originalScale);
    }
  }, 100);
}

/**
 * Random integer in [min, max] inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntInRange(min, max) {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * Handles picking up a dropped resource
 * @param {THREE.Object3D} resourceDrop - The dropped resource to pick up
 */
function handleResourcePickup(resourceDrop) {
  const resourceType = resourceDrop?.userData?.resourceType;
  const amount = Math.max(0, Math.floor(resourceDrop?.userData?.amount ?? 0));

  if (!resourceType || amount <= 0) {
    console.warn('Invalid dropped resource payload', resourceDrop);
    removeDroppedResource(resourceDrop);
    return;
  }

  // Add to inventory
  const added = addResource(resourceType, amount);
  if (!added) {
    console.warn(`Unknown resource pickup type: ${resourceType}`);
    removeDroppedResource(resourceDrop);
    return;
  }

  // Update inventory display
  updateInventoryDisplay();

  // Show feedback
  const icon = getResourceIcon(resourceType);
  const label = getResourceLabel(resourceType);
  showResourceGainedMessage(`+${amount} ${label} ${icon}`);

  // Remove the dropped resource from the world
  removeDroppedResource(resourceDrop);
}

/**
 * Transitions from outside world to house interior
 * @param {THREE.Object3D} house - The house being entered
 */
function enterHouse(house) {
  // Save current outside position and rotation
  worldState.outsidePosition.copy(camera.position);
  worldState.outsideRotation.yaw = cameraController.yaw;
  worldState.outsideRotation.pitch = cameraController.pitch;
  worldState.currentHouse = house;
  
  // Hide outside world objects
  interactableObjects.visible = false;
  if (skyMesh) skyMesh.visible = false;
  if (sunMesh) sunMesh.visible = false;
  if (moonMesh) moonMesh.visible = false;
  sunLight.visible = false;
  moonLight.visible = false;
  
  // Adjust ambient light for interior
  ambientLight.intensity = 0.5;
  
  // Check if we have saved interior data for this house
  const hasSavedInterior = worldState.houseInteriors.has(house.uuid);
  
  // Create interior world (skip default furniture if we have saved data)
  createInterior(house, hasSavedInterior);
  
  // Load saved interior if it exists
  if (hasSavedInterior) {
    loadHouseInterior(house.uuid);
  }
  
  // Position player inside near the door, scaled to room depth
  const roomDepth = worldState.currentInterior ? 
    worldState.currentInterior.roomDepth : 
    CONFIG.interior.roomSize;
  camera.position.set(0, CONFIG.player.height, roomDepth / 2 - 2);
  cameraController.yaw = Math.PI; // Face into the room
  cameraController.pitch = 0;
  updateCameraRotation();
  
  // Update world state
  worldState.isInside = true;
  
  // Reset selected object type to fists
  setSelectedObjectType(0);
  
  // Update selector to show interior items
  updateSelectorContent();
}

/**
 * Transitions from house interior back to outside world
 */
function exitToOutside() {
  // Save current interior before exiting
  if (worldState.currentHouse) {
    saveCurrentInterior();
  }
  
  // Remove interior
  removeInterior();
  
  // Show outside world objects
  interactableObjects.visible = true;
  if (skyMesh) skyMesh.visible = true;
  if (sunMesh) sunMesh.visible = true;
  if (moonMesh) moonMesh.visible = true;
  sunLight.visible = true;
  moonLight.visible = true;
  
  // Restore ambient light
  ambientLight.intensity = 0.3;
  
  // Restore player position and rotation
  camera.position.copy(worldState.outsidePosition);
  cameraController.yaw = worldState.outsideRotation.yaw;
  cameraController.pitch = worldState.outsideRotation.pitch;
  updateCameraRotation();
  
  // Update world state
  worldState.isInside = false;
  worldState.currentHouse = null;
  
  // Reset selected object type to fists
  setSelectedObjectType(0);
  
  // Update selector to show exterior items
  updateSelectorContent();
  
  // Reset any highlighted objects
  if (highlightedObject) {
    resetObjectHighlight(highlightedObject);
  }
}

/**
 * Handle window resize events
 */
export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Handle save game
 */
function handleSave() {
  const success = saveGameState();
  if (success) {
    updateSaveStatus('✅ Game saved successfully!', 'lightgreen');
  } else {
    updateSaveStatus('❌ Failed to save game', 'red');
  }
}

/**
 * Handle load game
 */
function handleLoad() {
  if (!hasSaveData()) {
    updateSaveStatus('⚠️ No save data found', 'orange');
    return;
  }
  
  const success = loadGameState();
  if (success) {
    updateSaveStatus('✅ Game loaded successfully!', 'lightgreen');
    // Update UI to reflect loaded state
    updateObjectSelector();
    updateSelectorContent();
  } else {
    updateSaveStatus('❌ Failed to load game', 'red');
  }
}

/**
 * Remove all event listeners (for cleanup)
 */
export function removeEventListeners() {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('click', onClick);
  document.removeEventListener('pointerlockchange', onPointerLockChange);
}
