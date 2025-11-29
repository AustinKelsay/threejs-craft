/**
 * Player movement and physics
 */

import { CONFIG } from './config.js';
import { camera, player, keys, mouseControls, worldState } from './gameState.js';
import { getForwardVector, getRightVector, applyCameraMovement } from './camera.js';

// Reusable vectors to minimize allocations in the hot update loop
const moveVector = new THREE.Vector3();
const forwardVec = new THREE.Vector3();
const rightVec = new THREE.Vector3();

/**
 * Update player movement and physics
 * @param {number} delta - Time since last frame
 */
export function updatePlayer(delta) {
  // Apply gravity
  player.velocity.y -= CONFIG.player.gravity * delta;
  
  // Calculate movement direction using camera vectors
  moveVector.set(0, 0, 0);
  const forward = getForwardVector(forwardVec);
  const right = getRightVector(rightVec);
  
  // Add movement based on input
  if (keys.forward) moveVector.add(forward);
  if (keys.backward) moveVector.sub(forward);
  if (keys.left) moveVector.add(right);  // Fixed: was reversed
  if (keys.right) moveVector.sub(right); // Fixed: was reversed
  
  // Normalize and scale by speed (use sprint speed if Shift is held)
  if (moveVector.length() > 0) {
    moveVector.normalize();
    const currentSpeed = keys.sprint ? CONFIG.player.sprintSpeed : CONFIG.player.speed;
    moveVector.multiplyScalar(currentSpeed * delta);
  }
  
  // Update position
  camera.position.add(moveVector);
  camera.position.y += player.velocity.y * delta;
  
  // Ground collision
  if (camera.position.y <= CONFIG.player.height) {
    camera.position.y = CONFIG.player.height;
    player.velocity.y = 0;
    player.canJump = true;
  }
  
  // World boundaries
  if (worldState.isInside) {
    // Interior boundaries - use dynamic room dimensions if available
    const interior = worldState.currentInterior;
    const boundaryX = (interior ? interior.roomWidth : CONFIG.interior.roomSize) / 2 - 0.5;
    const boundaryZ = (interior ? interior.roomDepth : CONFIG.interior.roomSize) / 2 - 0.5;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -boundaryX, boundaryX);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -boundaryZ, boundaryZ);
  } else {
    // Outside world boundaries
    const boundary = CONFIG.world.size / 2;
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -boundary, boundary);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -boundary, boundary);
  }
  
  // Mouse look with proper yaw/pitch control
  if (mouseControls.active && (mouseControls.movementX !== 0 || mouseControls.movementY !== 0)) {
    applyCameraMovement(
      -mouseControls.movementX * CONFIG.player.lookSpeed,
      -mouseControls.movementY * CONFIG.player.lookSpeed
    );
    
    mouseControls.movementX = 0;
    mouseControls.movementY = 0;
  }
}
