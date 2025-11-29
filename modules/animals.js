/**
 * Animal creation and movement functions
 */

import { CONFIG } from './config.js';
import { worldAnimals, interiorAnimals, clock, worldState } from './gameState.js';

// Re-export animal creation functions from their respective modules
export { createCow, createPig, createHorse, createDragon, createInitialAnimals } from './worldAnimals.js';
export { createCat, createDog } from './interiorAnimals.js';

// Scratch vectors reused across animation frames to reduce GC churn
const directionVec = new THREE.Vector3();
const driftVec = new THREE.Vector3();
const yawWrap = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));

function animateDragonParts(dragon, data, currentTime, distanceToTarget) {
  // Wing flaps (folded when grounded)
  if (data.wings) {
    const wingRange = data.isFlying ? 0.85 : 0.25;
    const wingBase = data.isFlying ? 0.25 : -0.45;
    const flap = Math.sin(currentTime * data.flapSpeed) * wingRange + wingBase;
    const ripple = Math.sin(currentTime * 2) * 0.05;
    data.wings[0].rotation.z = flap;
    data.wings[1].rotation.z = -flap;
    data.wings[0].rotation.x = ripple;
    data.wings[1].rotation.x = ripple;
  }
  
  // Leg trot while on ground
  if (data.legs && !data.isFlying) {
    const walkCycle = currentTime * 6;
    data.legs.forEach((leg, index) => {
      const offset = index < 2 ? 0 : Math.PI;
      leg.rotation.x = Math.sin(walkCycle + offset) * 0.35 * Math.min(1, distanceToTarget / 2);
    });
  }
  
  // Tail sway
  if (data.tailSegments) {
    data.tailSegments.forEach((segment, index) => {
      segment.rotation.y = Math.sin(currentTime * 2 + index * 0.4) * (data.isFlying ? 0.35 : 0.2);
    });
  }
}

function updateDragon(dragon, delta, currentTime, hardBoundary, softBoundary) {
  const data = dragon.userData;
  const config = CONFIG.objects.dragon;
  
  // Pick new horizontal target
  if (currentTime > data.nextMoveTime) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * data.wanderRadius * 0.6 + data.wanderRadius * 0.4;
    data.targetPosition.set(
      data.initialPosition.x + Math.cos(angle) * distance,
      0,
      data.initialPosition.z + Math.sin(angle) * distance
    );
    data.targetPosition.x = THREE.MathUtils.clamp(data.targetPosition.x, -hardBoundary, hardBoundary);
    data.targetPosition.z = THREE.MathUtils.clamp(data.targetPosition.z, -hardBoundary, hardBoundary);
    data.nextMoveTime = currentTime + 2 + Math.random() * 3;
  }
  
  // Flight state management
  if (!data.isFlying && currentTime > data.nextFlightCheck) {
    if (Math.random() < 0.55) {
      data.isFlying = true;
      data.targetAltitude = THREE.MathUtils.randFloat(config.minFlightHeight, config.maxFlightHeight);
      data.flightEndTime = currentTime + 6 + Math.random() * 6;
    }
    data.nextFlightCheck = currentTime + 6 + Math.random() * 6;
  } else if (data.isFlying && currentTime > data.flightEndTime) {
    data.isFlying = false;
    data.targetAltitude = data.groundHeight;
    data.nextFlightCheck = currentTime + 8 + Math.random() * 6;
  }
  
  // Subtle altitude shifts while airborne
  if (data.isFlying && Math.random() < 0.02) {
    data.targetAltitude = THREE.MathUtils.randFloat(config.minFlightHeight, config.maxFlightHeight);
  }
  
  const desiredAltitude = data.isFlying ? data.targetAltitude : data.groundHeight;
  
  directionVec.subVectors(data.targetPosition, dragon.position);
  directionVec.y = desiredAltitude - dragon.position.y;
  
  const distanceToTarget = directionVec.length();
  
  if (distanceToTarget > 0.4) {
    directionVec.multiplyScalar(1 / distanceToTarget);
    driftVec.set(-directionVec.z, 0, directionVec.x)
      .multiplyScalar(Math.sin(currentTime * 1.5) * (data.isFlying ? 0.35 : 0.12));
    const speed = (data.isFlying ? data.flySpeed : data.moveSpeed) * delta;
    dragon.position.addScaledVector(directionVec, speed);
    dragon.position.add(driftVec);
  } else {
    dragon.position.y = desiredAltitude + Math.sin(currentTime * (data.isFlying ? 2 : 1.5)) * (data.isFlying ? 0.22 : 0.05);
  }
  
  // Stabilize altitude
  dragon.position.y = THREE.MathUtils.lerp(dragon.position.y, desiredAltitude, delta * 1.2);
  dragon.position.y = Math.max(data.groundHeight * 0.6, dragon.position.y);
  
  // Orientation
  const targetAngle = Math.atan2(directionVec.x, directionVec.z || 0.0001);
  const angleDiff = yawWrap(targetAngle - dragon.rotation.y);
  dragon.rotation.y += angleDiff * delta * 2.2;
  
  if (data.isFlying) {
    const pitchTarget = THREE.MathUtils.clamp(directionVec.y * 0.8, -0.5, 0.5);
    dragon.rotation.x = THREE.MathUtils.lerp(dragon.rotation.x, pitchTarget, delta * 4);
    dragon.rotation.z = Math.sin(currentTime * 0.9) * 0.08;
  } else {
    dragon.rotation.x = 0;
    dragon.rotation.z = Math.sin(currentTime * 6) * 0.02;
  }
  
  // Soft boundary correction
  if (Math.abs(dragon.position.x) > softBoundary) {
    dragon.position.x = THREE.MathUtils.clamp(dragon.position.x, -softBoundary, softBoundary);
    data.targetPosition.x = dragon.position.x + (Math.random() - 0.5) * 20;
  }
  if (Math.abs(dragon.position.z) > softBoundary) {
    dragon.position.z = THREE.MathUtils.clamp(dragon.position.z, -softBoundary, softBoundary);
    data.targetPosition.z = dragon.position.z + (Math.random() - 0.5) * 20;
  }
  
  animateDragonParts(dragon, data, currentTime, distanceToTarget);
}

/**
 * Update all animals' movement and animations
 * @param {number} delta - Time since last frame
 */
export function updateAnimals(delta) {
  const currentTime = clock.getElapsedTime();
  
  // Update world animals when outside
  if (!worldState.isInside) {
    const hardBoundary = CONFIG.world.size / 2 - CONFIG.world.boundaryPadding;
    const softBoundary = CONFIG.world.size / 2 - 15;
    
    for (let i = 0; i < worldAnimals.length; i++) {
      const animal = worldAnimals[i];
      const data = animal.userData;
      
      if (data.type === 'dragon') {
        updateDragon(animal, delta, currentTime, hardBoundary, softBoundary);
        continue;
      }
      
      // Check if it's time to pick a new target
      if (currentTime > data.nextMoveTime) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * data.wanderRadius * 0.7 + data.wanderRadius * 0.3;
        
        data.targetPosition.set(
          data.initialPosition.x + Math.cos(angle) * distance,
          0,
          data.initialPosition.z + Math.sin(angle) * distance
        );
        
        data.targetPosition.x = THREE.MathUtils.clamp(data.targetPosition.x, -hardBoundary, hardBoundary);
        data.targetPosition.z = THREE.MathUtils.clamp(data.targetPosition.z, -hardBoundary, hardBoundary);
        data.nextMoveTime = currentTime + 2 + Math.random() * 4;
      }
      
      // Move towards target
      directionVec.subVectors(data.targetPosition, animal.position);
      const distanceToTarget = directionVec.length();
      
      if (distanceToTarget > 1) {
        directionVec.multiplyScalar(1 / distanceToTarget); // normalize
        
        // Slight curved drift
        driftVec.set(-directionVec.z, 0, directionVec.x)
          .multiplyScalar(Math.sin(currentTime * 2) * 0.1);
        
        animal.position.addScaledVector(directionVec, data.moveSpeed * delta);
        animal.position.add(driftVec);
        
        // Smooth rotation toward travel direction
        const targetAngle = Math.atan2(directionVec.x, directionVec.z);
        const angleDiff = yawWrap(targetAngle - animal.rotation.y);
        animal.rotation.y += angleDiff * delta * 3;
        
        const bobSpeed = 8 + data.moveSpeed;
        const bobAmount = Math.sin(currentTime * bobSpeed) * 0.03;
        animal.position.y = Math.abs(bobAmount) * data.moveSpeed * 0.25;
        animal.rotation.z = Math.sin(currentTime * bobSpeed * 0.7) * 0.01;
        if (data.type === 'horse') {
          animal.rotation.x = Math.sin(currentTime * bobSpeed * 0.5) * 0.02;
        }
      } else {
        // Idle breathing
        animal.position.y = Math.sin(currentTime * 2) * 0.01;
        animal.rotation.z = 0;
        animal.rotation.x = 0;
        
        if (Math.random() < 0.01) {
          animal.rotation.y += (Math.random() - 0.5) * 0.5;
        }
      }
      
      // Soft boundary correction
      if (Math.abs(animal.position.x) > softBoundary) {
        animal.position.x = THREE.MathUtils.clamp(animal.position.x, -softBoundary, softBoundary);
        data.targetPosition.x = animal.position.x + (Math.random() - 0.5) * 20;
      }
      if (Math.abs(animal.position.z) > softBoundary) {
        animal.position.z = THREE.MathUtils.clamp(animal.position.z, -softBoundary, softBoundary);
        data.targetPosition.z = animal.position.z + (Math.random() - 0.5) * 20;
      }
    }
  }
  
  // Update interior animals when inside
  if (worldState.isInside) {
    for (let i = 0; i < interiorAnimals.length; i++) {
      const animal = interiorAnimals[i];
      // Check if it's time to pick a new target
      if (currentTime > animal.userData.nextMoveTime) {
        // Pick a new random target within room
        const roomSize = CONFIG.interior.roomSize;
        const maxDistance = roomSize / 3; // Smaller wander radius for interior
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxDistance * 0.7 + maxDistance * 0.3;
        
        animal.userData.targetPosition.set(
          Math.cos(angle) * distance,
          0,
          Math.sin(angle) * distance
        );
        
        // Keep target within room bounds
        const boundary = roomSize / 2 - CONFIG.interior.boundaryPadding;
        animal.userData.targetPosition.x = THREE.MathUtils.clamp(animal.userData.targetPosition.x, -boundary, boundary);
        animal.userData.targetPosition.z = THREE.MathUtils.clamp(animal.userData.targetPosition.z, -boundary, boundary);
        
        // Set next move time (shorter wait times for interior)
        const waitTime = 1 + Math.random() * 3;
        animal.userData.nextMoveTime = currentTime + waitTime;
      }
      
      // Move towards target
      directionVec.subVectors(animal.userData.targetPosition, animal.position);
      const distanceToTarget = directionVec.length();
      
      if (distanceToTarget > 0.3) {
        // Move the animal with slight curve for more natural movement
        const moveDistance = animal.userData.moveSpeed * delta * 0.7; // Slightly slower indoors
        directionVec.multiplyScalar(1 / distanceToTarget); // normalize
        
        // Add slight perpendicular drift for curved paths
        driftVec.set(-directionVec.z, 0, directionVec.x)
          .multiplyScalar(Math.sin(currentTime * 2) * 0.05);
        
        animal.position.addScaledVector(directionVec, moveDistance);
        animal.position.add(driftVec);
        
        const targetAngle = Math.atan2(directionVec.x, directionVec.z);
        const angleDiff = yawWrap(targetAngle - animal.rotation.y);
        animal.rotation.y += angleDiff * delta * 3;
        
        // Animate legs
        if (animal.userData.legs) {
          const walkCycle = currentTime * 8;
          animal.userData.legs.forEach((leg, index) => {
            const offset = index < 2 ? 0 : Math.PI;
            leg.rotation.x = Math.sin(walkCycle + offset) * 0.3;
          });
        }
        
        // Subtle bobbing
        animal.position.y = Math.abs(Math.sin(currentTime * 6) * 0.02);
        
        // Tail wagging for dogs
        if (animal.userData.type === 'dog' && animal.userData.tail) {
          animal.userData.tail.rotation.y = Math.sin(currentTime * 10) * 0.3;
        }
      } else {
        // Idle animations
        animal.position.y = Math.sin(currentTime * 2) * 0.01;
        
        // Reset leg positions
        if (animal.userData.legs) {
          animal.userData.legs.forEach(leg => {
            leg.rotation.x = 0;
          });
        }
        
        // Gentle tail movement for cats
        if (animal.userData.type === 'cat') {
          const tail = animal.userData.tail;
          if (tail) {
            tail.rotation.y = Math.sin(currentTime * 1.5) * 0.1;
          }
        }
      }
    }
  }
}
