/**
 * Camera control functions for FPS-style movement
 */

import { CONFIG } from './config.js';
import { camera, cameraController } from './gameState.js';

// Reusable vectors to avoid per-frame allocations (unique names for bundler)
const CAMERA_FORWARD_VEC = new THREE.Vector3();
const CAMERA_RIGHT_VEC = new THREE.Vector3();

/**
 * Update camera rotation based on current yaw and pitch
 */
export function updateCameraRotation() {
  // Apply camera rotation with proper Euler order to prevent tilting
  camera.rotation.order = 'YXZ';
  camera.rotation.y = cameraController.yaw;
  camera.rotation.x = cameraController.pitch;
  camera.rotation.z = 0; // Always ensure no roll
}

/**
 * Apply camera movement with yaw and pitch
 * @param {number} deltaYaw - Horizontal rotation delta
 * @param {number} deltaPitch - Vertical rotation delta
 */
export function applyCameraMovement(deltaYaw, deltaPitch) {
  // Update yaw (horizontal rotation)
  cameraController.yaw += deltaYaw;
  
  // Update pitch (vertical rotation) with clamping
  if (deltaPitch !== undefined) {
    cameraController.pitch += deltaPitch;
    cameraController.pitch = THREE.MathUtils.clamp(
      cameraController.pitch, 
      -CONFIG.player.pitchLimit, 
      CONFIG.player.pitchLimit
    );
  }
  
  // Apply the rotation
  updateCameraRotation();
}

/**
 * Get forward direction vector based on camera yaw
 * @param {THREE.Vector3} [target] - Optional vector to write into
 * @returns {THREE.Vector3} Forward direction vector
 */
export function getForwardVector(target = CAMERA_FORWARD_VEC) {
  // Get forward direction based on yaw only (for movement)
  target.set(
    -Math.sin(cameraController.yaw),
    0,
    -Math.cos(cameraController.yaw)
  );
  return target;
}

/**
 * Get right direction vector based on camera yaw
 * @param {THREE.Vector3} [target] - Optional vector to write into
 * @returns {THREE.Vector3} Right direction vector
 */
export function getRightVector(target = CAMERA_RIGHT_VEC) {
  // Get right direction based on yaw only
  target.set(
    -Math.cos(cameraController.yaw),
    0,
    Math.sin(cameraController.yaw)
  );
  return target;
}
