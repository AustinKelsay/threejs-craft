/**
 * Dragon mounting and flight controls
 */

import { CONFIG } from './config.js';
import { camera, cameraController, keys, mountState, setHighlightedObject } from './gameState.js';
import { applyCameraMovement } from './camera.js';
import { resetObjectHighlight } from './building.js';

const FORWARD = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);
const targetCamPos = new THREE.Vector3();
const tempOffset = new THREE.Vector3();

/**
 * Whether the player is currently mounted on a dragon
 * @returns {boolean}
 */
export function isMounted() {
  return mountState.isMounted && mountState.dragon;
}

/**
 * Mount the given dragon and switch to flight control
 * @param {THREE.Object3D} dragon
 * @returns {boolean} True if mount succeeded
 */
export function mountDragon(dragon) {
  if (!dragon || isMounted()) {
    return false;
  }
  mountState.isMounted = true;
  mountState.dragon = dragon;
  mountState.flightVelocity.set(0, 0, 0);
  mountState.smoothCamera.copy(camera.position);

  dragon.userData.isMounted = true;
  dragon.userData.isFlying = true;
  dragon.userData.flightEndTime = Infinity;
  dragon.userData.targetAltitude = Math.max(dragon.position.y, dragon.userData.groundHeight + 2);

  // Clear highlight glow so the dragon uses flight emissive instead
  resetObjectHighlight(dragon);
  setHighlightedObject(null);

  // Align view with the dragon
  cameraController.yaw = dragon.rotation.y;
  cameraController.pitch = 0;
  applyCameraMovement(0, 0);

  return true;
}

/**
 * Dismount the current dragon and restore normal controls
 * @returns {boolean} True if dismounted
 */
export function dismountDragon() {
  if (!isMounted()) {
    return false;
  }

  const dragon = mountState.dragon;
  mountState.isMounted = false;
  mountState.dragon = null;
  mountState.flightVelocity.set(0, 0, 0);

  if (dragon && dragon.userData) {
    dragon.userData.isMounted = false;
    dragon.userData.flightEndTime = 0;
    dragon.userData.isFlying = false;
    dragon.userData.targetAltitude = dragon.userData.groundHeight;
  }

  // Drop the player just beside the dragon to avoid clipping
  camera.position.copy(dragon ? dragon.position : camera.position);
  camera.position.add(new THREE.Vector3(1, CONFIG.player.height, 1));
  mountState.smoothCamera.copy(camera.position);

  return true;
}

/**
 * Update mounted dragon flight and chase camera
 * @param {number} delta - seconds since last frame
 */
export function updateMount(delta) {
  if (!isMounted()) {
    return;
  }

  const dragon = mountState.dragon;
  if (!dragon || !dragon.parent) {
    dismountDragon();
    return;
  }

  // Build movement vector from camera facing and WASD
  camera.getWorldDirection(FORWARD);
  FORWARD.normalize();
  RIGHT.crossVectors(FORWARD, UP).normalize();

  const moveVec = mountState.flightVelocity;
  moveVec.set(0, 0, 0);
  if (keys.forward) moveVec.add(FORWARD);
  if (keys.backward) moveVec.sub(FORWARD);
  if (keys.left) moveVec.sub(RIGHT);
  if (keys.right) moveVec.add(RIGHT);

  const hasInput = moveVec.lengthSq() > 0;
  if (hasInput) {
    moveVec.normalize();
    const speed = CONFIG.objects.dragon.flySpeed * (keys.sprint ? 1.5 : 1);
    dragon.position.addScaledVector(moveVec, speed * delta);
  }

  // Keep dragon within bounds and above ground
  const boundary = CONFIG.world.size / 2;
  dragon.position.x = THREE.MathUtils.clamp(dragon.position.x, -boundary, boundary);
  dragon.position.z = THREE.MathUtils.clamp(dragon.position.z, -boundary, boundary);
  dragon.position.y = Math.max(CONFIG.player.height * 0.6, dragon.position.y);

  // Orient dragon to the camera yaw/pitch
  dragon.rotation.y = cameraController.yaw;
  dragon.rotation.x = THREE.MathUtils.lerp(dragon.rotation.x, cameraController.pitch * 0.6, delta * 8);
  dragon.rotation.z = THREE.MathUtils.lerp(dragon.rotation.z, hasInput ? -moveVec.x * 0.25 : 0, delta * 6);

  // Third-person chase camera offset
  tempOffset.copy(mountState.cameraOffset);
  tempOffset.applyAxisAngle(UP, cameraController.yaw);
  targetCamPos.copy(dragon.position).add(tempOffset);
  mountState.smoothCamera.lerp(targetCamPos, 1 - Math.exp(-delta * 10));
  camera.position.copy(mountState.smoothCamera);

  dragon.userData.isFlying = true;
}

