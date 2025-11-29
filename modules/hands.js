/**
 * First-person hands and simple punch animation.
 */

import { camera, selectedObjectType } from './gameState.js';

let handsGroup;
let leftHand;
let rightHand;
let punchTimer = 0;

const PUNCH_DURATION = 0.35; // seconds
const PUNCH_DEPTH = 0.4;
const PUNCH_LIFT = 0.12;
const IDLE_SWAY = 0.02;

const restLeftPos = new THREE.Vector3(-0.25, -0.35, -0.7);
const restRightPos = new THREE.Vector3(0.25, -0.35, -0.7);

function createFistMesh() {
  const geometry = new THREE.BoxGeometry(0.16, 0.16, 0.2);
  const material = new THREE.MeshStandardMaterial({
    color: 0xd2a679,
    roughness: 0.8,
    metalness: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

/**
 * Attach simple fist meshes to the camera for first-person view.
 */
export function createHands() {
  if (handsGroup) return;

  handsGroup = new THREE.Group();
  handsGroup.name = 'playerHands';

  leftHand = createFistMesh();
  rightHand = createFistMesh();

  leftHand.position.copy(restLeftPos);
  rightHand.position.copy(restRightPos);

  handsGroup.add(leftHand);
  handsGroup.add(rightHand);
  handsGroup.visible = false;

  camera.add(handsGroup);
}

/**
 * Kick off a quick punch animation.
 */
export function triggerPunchAnimation() {
  if (!handsGroup) return;
  punchTimer = PUNCH_DURATION;
}

/**
 * Update hand visibility and punch animation each frame.
 * @param {number} delta
 */
export function updateHands(delta) {
  if (!handsGroup) return;

  handsGroup.visible = selectedObjectType === 0;

  const time = performance.now() * 0.001;
  const sway = Math.sin(time * 5) * IDLE_SWAY;

  // Reset to rest pose with a subtle idle sway
  leftHand.position.copy(restLeftPos);
  rightHand.position.copy(restRightPos);
  leftHand.position.y += sway;
  rightHand.position.y -= sway;
  leftHand.rotation.set(0, 0, 0);
  rightHand.rotation.set(0, 0, 0);

  if (punchTimer > 0) {
    punchTimer = Math.max(0, punchTimer - delta);
    const t = 1 - punchTimer / PUNCH_DURATION; // 0..1
    const curve = Math.sin(Math.min(1, t) * Math.PI);
    const offsetCurve = Math.sin(Math.min(1, Math.max(0, t - 0.08) / (1 - 0.08)) * Math.PI);

    leftHand.position.z -= curve * PUNCH_DEPTH;
    leftHand.position.y += curve * PUNCH_LIFT;
    leftHand.rotation.x = -curve * 0.6;

    rightHand.position.z -= offsetCurve * PUNCH_DEPTH;
    rightHand.position.y += offsetCurve * PUNCH_LIFT * 0.8;
    rightHand.rotation.x = -offsetCurve * 0.55;
  }
}
