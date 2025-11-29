/**
 * Hostile mob management (first mob: spider).
 * Keep behaviour simple and data-driven for future mobs.
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import {
  scene,
  camera,
  interactableObjects,
  mobs,
  worldState,
  clock
} from './gameState.js';
import { damagePlayer } from './health.js';
import { updateHealthUI } from './ui.js';
import { disposeObject } from './utils.js';

// Scratch vectors reused every frame
const tempDir = new THREE.Vector3();

let lastIsDay = true;

/**
 * Spawn initial hostile mobs in the world (day baseline).
 */
export function createInitialMobs() {
  spawnSpiders(CONFIG.mobs.spawn.dayCount, CONFIG.mobs.spawn.spread);
}

/**
 * Main mob update loop.
 * @param {number} delta
 */
export function updateMobs(delta) {
  // Pause mobs when inside to avoid unfair indoor hits
  if (worldState.isInside) return;

  const now = performance.now() / 1000;
  const isDay = isDaytime();

  // Nightfall bonus wave
  if (lastIsDay && !isDay) {
    spawnSpiders(CONFIG.mobs.spawn.nightExtra, CONFIG.mobs.spawn.spread);
  }
  lastIsDay = isDay;

  for (let i = mobs.length - 1; i >= 0; i--) {
    const mob = mobs[i];
    const data = mob.userData;

    // Basic chase: move toward player if in chase range
    tempDir.subVectors(camera.position, mob.position);
    // Work in XZ plane for movement/attacks
    tempDir.y = 0;
    const distanceToPlayer = tempDir.length();

    if (distanceToPlayer < data.chaseRange) {
      // Move toward player
      tempDir.normalize();
      mob.position.addScaledVector(tempDir, data.moveSpeed * delta);

      // Face player
      const targetYaw = Math.atan2(tempDir.x, tempDir.z);
      const angleDiff = Math.atan2(Math.sin(targetYaw - mob.rotation.y), Math.cos(targetYaw - mob.rotation.y));
      mob.rotation.y += angleDiff * Math.min(1, delta * 6);

      // Attack if close enough and off cooldown
      if (distanceToPlayer < data.attackRange && now - data.lastAttackTime >= data.attackCooldown) {
        data.lastAttackTime = now;
        damagePlayer(data.attackDamage, data.type);
      }
    } else {
      // Idle sway animation
      mob.position.y = Math.sin(now * 2 + i) * 0.05;
    }

    // Realistic spider leg animation - alternating tetrapod gait
    if (data.legs) {
      const walkCycle = now * 10;
      const isMoving = distanceToPlayer < data.chaseRange;
      const intensity = isMoving ? 1 : 0.15;
      
      data.legs.forEach((legGroup, idx) => {
        // Spiders use alternating tetrapod gait: legs 1,3 on one side + 2,4 on other move together
        const pairIdx = Math.floor(idx / 2);
        const isLeftSide = idx % 2 === 0;
        // Create alternating pattern
        const phase = ((pairIdx % 2 === 0) === isLeftSide) ? 0 : Math.PI;
        
        // Vertical bobbing motion
        const swing = Math.sin(walkCycle + phase) * 0.12 * intensity;
        // Forward/back sweep
        const sweep = Math.cos(walkCycle + phase) * 0.15 * intensity;
        
        legGroup.rotation.x = swing;
        legGroup.rotation.y = sweep * (isLeftSide ? 1 : -1);
      });
    }
  }
}

/**
 * Apply player punch damage to a mob.
 * @param {THREE.Object3D} mob
 * @param {number} damage
 */
export function damageMob(mob, damage) {
  if (!mob?.userData || mob.userData.type !== 'mob') return;

  const applied = Math.max(0, Math.floor(damage));
  if (applied <= 0) return;

  mob.userData.health = Math.max(0, mob.userData.health - applied);

  if (mob.userData.health <= 0) {
    killMob(mob);
  }
}

/**
 * Create a spider enemy with realistic anatomy.
 * @param {number} x
 * @param {number} z
 */
function createSpider(x, z) {
  const stats = CONFIG.mobs.spider;
  const spider = new THREE.Group();

  // Materials - shared for performance
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a, 
    roughness: 0.7,
    metalness: 0.1
  });
  const abdomenMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0f0f0f, 
    roughness: 0.6,
    metalness: 0.15
  });
  const legMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x151515, 
    roughness: 0.75,
    metalness: 0.05
  });
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff2222, 
    emissive: 0xff1111,
    emissiveIntensity: 0.8
  });
  const fangMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0a0a0a, 
    roughness: 0.4,
    metalness: 0.3
  });

  // Abdomen (opisthosoma) - large bulbous back section
  const abdomen = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 12, 10),
    abdomenMaterial
  );
  abdomen.scale.set(1.1, 0.85, 0.9);
  abdomen.position.set(-0.55, 0.38, 0);
  spider.add(abdomen);

  // Abdomen markings (red hourglass-like pattern)
  const markingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8b0000, 
    emissive: 0x3a0000,
    roughness: 0.5
  });
  const marking1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 6),
    markingMaterial
  );
  marking1.scale.set(1, 0.3, 0.7);
  marking1.position.set(-0.55, 0.72, 0);
  spider.add(marking1);

  const marking2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 6, 6),
    markingMaterial
  );
  marking2.scale.set(1, 0.3, 0.6);
  marking2.position.set(-0.35, 0.68, 0);
  spider.add(marking2);

  // Cephalothorax (prosoma) - front body section
  const thorax = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 12, 10),
    bodyMaterial
  );
  thorax.scale.set(1.2, 0.8, 1);
  thorax.position.set(0.15, 0.32, 0);
  spider.add(thorax);

  // Head region (fused with cephalothorax but visually distinct)
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 10, 8),
    bodyMaterial
  );
  head.scale.set(1.1, 0.9, 1);
  head.position.set(0.52, 0.30, 0);
  spider.add(head);

  // 8 Eyes arranged in two rows (typical spider pattern)
  const eyeGeoLarge = new THREE.SphereGeometry(0.045, 8, 8);
  const eyeGeoSmall = new THREE.SphereGeometry(0.03, 6, 6);
  
  // Front row - 4 larger eyes
  const frontEyes = [
    [0.68, 0.38, 0.08],
    [0.68, 0.38, -0.08],
    [0.65, 0.35, 0.15],
    [0.65, 0.35, -0.15]
  ];
  frontEyes.forEach(pos => {
    const eye = new THREE.Mesh(eyeGeoLarge, eyeMaterial);
    eye.position.set(pos[0], pos[1], pos[2]);
    spider.add(eye);
  });

  // Back row - 4 smaller eyes
  const backEyes = [
    [0.58, 0.42, 0.10],
    [0.58, 0.42, -0.10],
    [0.55, 0.40, 0.18],
    [0.55, 0.40, -0.18]
  ];
  backEyes.forEach(pos => {
    const eye = new THREE.Mesh(eyeGeoSmall, eyeMaterial);
    eye.position.set(pos[0], pos[1], pos[2]);
    spider.add(eye);
  });

  // Chelicerae (fangs)
  const fangGeo = new THREE.ConeGeometry(0.035, 0.18, 6);
  const leftFang = new THREE.Mesh(fangGeo, fangMaterial);
  leftFang.position.set(0.72, 0.18, 0.06);
  leftFang.rotation.set(0.3, 0, 0.2);
  spider.add(leftFang);

  const rightFang = new THREE.Mesh(fangGeo, fangMaterial);
  rightFang.position.set(0.72, 0.18, -0.06);
  rightFang.rotation.set(-0.3, 0, 0.2);
  spider.add(rightFang);

  // Pedipalps (small front appendages)
  const palpGeo = new THREE.CylinderGeometry(0.025, 0.02, 0.14, 5);
  const leftPalp = new THREE.Mesh(palpGeo, legMaterial);
  leftPalp.position.set(0.62, 0.22, 0.12);
  leftPalp.rotation.set(0.4, 0.3, 0.8);
  spider.add(leftPalp);

  const rightPalp = new THREE.Mesh(palpGeo, legMaterial);
  rightPalp.position.set(0.62, 0.22, -0.12);
  rightPalp.rotation.set(-0.4, -0.3, 0.8);
  spider.add(rightPalp);

  // 8 Jointed legs (4 pairs) - each leg has femur, tibia, and tarsus segments
  const legs = [];
  const legConfigs = [
    // [xBase, zOffset, yawAngle, legLength, liftAngle] for each pair
    { xBase: 0.28, zOff: 0.18, yaw: 0.6, len: 0.9, lift: 0.3 },   // Front legs
    { xBase: 0.18, zOff: 0.22, yaw: 0.25, len: 1.0, lift: 0.2 },  // Mid-front legs  
    { xBase: 0.05, zOff: 0.22, yaw: -0.2, len: 1.0, lift: 0.15 }, // Mid-back legs
    { xBase: -0.12, zOff: 0.18, yaw: -0.5, len: 0.85, lift: 0.25 } // Back legs
  ];

  legConfigs.forEach((cfg, pairIdx) => {
    [-1, 1].forEach((side) => {
      // Create leg group for animation
      const legGroup = new THREE.Group();
      legGroup.position.set(cfg.xBase, 0.30, cfg.zOff * side);

      // Femur (upper leg segment) - thicker, angled up then out
      const femurLen = cfg.len * 0.45;
      const femur = new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.03, femurLen, 6),
        legMaterial
      );
      femur.position.set(0, 0.08, femurLen * 0.3 * side);
      femur.rotation.set(0, cfg.yaw * side, (1.2 + cfg.lift) * side);
      legGroup.add(femur);

      // Tibia (lower leg segment) - thinner, angled down to ground
      const tibiaLen = cfg.len * 0.55;
      const tibia = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.015, tibiaLen, 6),
        legMaterial
      );
      // Position at end of femur
      const femurEndX = Math.sin((1.2 + cfg.lift) * side) * femurLen * 0.5;
      const femurEndY = Math.cos((1.2 + cfg.lift) * side) * femurLen * 0.5 + 0.08;
      const femurEndZ = (femurLen * 0.3 + femurLen * 0.4) * side;
      tibia.position.set(femurEndX, femurEndY - tibiaLen * 0.35, femurEndZ + tibiaLen * 0.2 * side);
      tibia.rotation.set(0, cfg.yaw * 0.5 * side, 0.3 * side);
      legGroup.add(tibia);

      // Joint knob between segments
      const joint = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 6, 6),
        legMaterial
      );
      joint.position.set(femurEndX * 0.7, femurEndY, femurEndZ * 0.8);
      legGroup.add(joint);

      spider.add(legGroup);
      legs.push(legGroup);
    });
  });

  // Spinnerets (small protrusions at back of abdomen)
  const spinneretGeo = new THREE.ConeGeometry(0.04, 0.1, 5);
  const spinneret1 = new THREE.Mesh(spinneretGeo, bodyMaterial);
  spinneret1.position.set(-1.02, 0.32, 0.04);
  spinneret1.rotation.set(0, 0, -1.5);
  spider.add(spinneret1);

  const spinneret2 = new THREE.Mesh(spinneretGeo, bodyMaterial);
  spinneret2.position.set(-1.02, 0.32, -0.04);
  spinneret2.rotation.set(0, 0, -1.5);
  spider.add(spinneret2);

  spider.position.set(x, 0, z);
  spider.userData = {
    type: 'mob',
    variant: 'spider',
    removable: false,
    health: stats.maxHealth,
    maxHealth: stats.maxHealth,
    moveSpeed: stats.moveSpeed,
    chaseRange: stats.chaseRange,
    attackRange: stats.attackRange,
    attackDamage: stats.attackDamage,
    attackCooldown: stats.attackCooldown,
    lastAttackTime: 0,
    legs
  };

  mobs.push(spider);
  interactableObjects.add(spider);
  scene.add(spider);

  return spider;
}

/**
 * Spawn a number of spiders within a spread radius.
 * @param {number} count
 * @param {number} spreadFraction
 */
function spawnSpiders(count, spreadFraction) {
  const spread = spreadFraction * CONFIG.world.size * 0.5;
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * spread * 2;
    const z = (Math.random() - 0.5) * spread * 2;
    createSpider(x, z);
  }
}

/**
 * Determine whether the current game time is day.
 * Mirrors dayNight.js logic without side effects.
 */
function isDaytime() {
  const totalCycle = CONFIG.dayNight.dayDuration + CONFIG.dayNight.nightDuration;
  const elapsed = clock.getElapsedTime() % totalCycle;
  return elapsed < CONFIG.dayNight.dayDuration;
}

/**
 * Cleanly remove a mob from the world.
 * @param {THREE.Object3D} mob
 */
function killMob(mob) {
  const idx = mobs.indexOf(mob);
  if (idx > -1) mobs.splice(idx, 1);
  interactableObjects.remove(mob);
  disposeObject(mob);
  if (mob.parent) mob.parent.remove(mob);
}
