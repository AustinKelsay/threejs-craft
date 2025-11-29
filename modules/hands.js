/**
 * First-person hands and simple punch animation.
 */

import { camera, selectedObjectType } from './gameState.js';

let handsGroup;
let leftHand;
let rightHand;
let punchTimer = 0;
let isLeftPunch = true; // Alternate between left and right punches

const PUNCH_DURATION = 0.35; // seconds
const PUNCH_DEPTH = 0.5;
const PUNCH_LIFT = 0.15;
const IDLE_SWAY = 0.015;

// Lowered and moved back to be less obstructive
const restLeftPos = new THREE.Vector3(-0.35, -0.55, -1.0);
const restRightPos = new THREE.Vector3(0.35, -0.55, -1.0);

function createFistMesh() {
  const fistGroup = new THREE.Group();

  // Skin color material - Minecraft-style flat shading
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xd2a679,
    roughness: 0.9,
    metalness: 0.0,
    flatShading: true
  });

  // Simple blocky hand like Minecraft - more cube-like, less elongated
  const handGeometry = new THREE.BoxGeometry(0.07, 0.12, 0.07);
  const hand = new THREE.Mesh(handGeometry, skinMaterial);
  hand.position.set(0, 0, 0);
  fistGroup.add(hand);

  fistGroup.castShadow = false;
  fistGroup.receiveShadow = false;

  return fistGroup;
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
 * Kick off a quick punch animation, alternating between left and right.
 */
export function triggerPunchAnimation() {
  if (!handsGroup) return;
  punchTimer = PUNCH_DURATION;
  isLeftPunch = !isLeftPunch; // Alternate for next punch
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

    // Only animate the active punching hand
    const punchingHand = isLeftPunch ? leftHand : rightHand;
    const restingHand = isLeftPunch ? rightHand : leftHand;

    // Punching hand moves forward and up
    punchingHand.position.z -= curve * PUNCH_DEPTH;
    punchingHand.position.y += curve * PUNCH_LIFT;
    punchingHand.rotation.x = -curve * 0.7;

    // Resting hand stays back with slight pull-back for realism
    const restingHandX = isLeftPunch ? 1 : -1;
    restingHand.position.x += restingHandX * curve * 0.05;
    restingHand.position.y -= curve * 0.02;
  }
}
