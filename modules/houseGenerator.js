/**
 * House Generator Module
 * 
 * Creates dynamically varied houses with randomized architectural elements.
 * Each house is unique while maintaining a cohesive neighborhood aesthetic.
 * 
 * Features:
 * - Variable dimensions (width, depth, height)
 * - Multiple roof styles (peaked, flat, gambrel, hip)
 * - Color palettes for walls, roofs, doors, and trim
 * - Dynamic window placement and count
 * - Optional architectural details (chimney, porch, shutters, awning)
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';

/**
 * Available roof style types
 */
const ROOF_STYLES = ['peaked', 'flat', 'gambrel', 'hip'];

/**
 * Generates a random house style configuration
 * This can be stored and reused to recreate identical houses
 * @returns {Object} House style configuration
 */
export function generateHouseStyle() {
  const palette = CONFIG.house.palettes;
  
  // Pick random colors from palettes
  const wallColorIndex = Math.floor(Math.random() * palette.walls.length);
  const roofColorIndex = Math.floor(Math.random() * palette.roofs.length);
  const doorColorIndex = Math.floor(Math.random() * palette.doors.length);
  const trimColorIndex = Math.floor(Math.random() * palette.trim.length);
  
  // Random dimensions within configured bounds
  const width = CONFIG.house.dimensions.minWidth + 
    Math.random() * (CONFIG.house.dimensions.maxWidth - CONFIG.house.dimensions.minWidth);
  const depth = CONFIG.house.dimensions.minDepth + 
    Math.random() * (CONFIG.house.dimensions.maxDepth - CONFIG.house.dimensions.minDepth);
  const height = CONFIG.house.dimensions.minHeight + 
    Math.random() * (CONFIG.house.dimensions.maxHeight - CONFIG.house.dimensions.minHeight);
  
  // Random roof style
  const roofStyle = ROOF_STYLES[Math.floor(Math.random() * ROOF_STYLES.length)];
  // Slightly tighten roof proportions to keep silhouettes grounded
  const roofHeight = height * (0.36 + Math.random() * 0.22);   // ~0.36-0.58 of wall height
  const roofOverhang = 0.18 + Math.random() * 0.22;            // 0.18-0.40 meters of eave
  
  // Window configuration
  const windowsPerSide = Math.floor(1 + Math.random() * 2); // 1-2 windows per side
  const windowSize = 0.6 + Math.random() * 0.4; // 0.6-1.0
  const hasSecondFloorWindows = height > 3.5 && Math.random() > 0.4;
  
  // Door configuration
  const doorWidth = 0.8 + Math.random() * 0.4; // 0.8-1.2
  const doorHeight = 2.0 + Math.random() * 0.5; // 2.0-2.5
  const doorOffsetX = (Math.random() - 0.5) * (width * 0.3); // Slight offset from center
  
  // Architectural features (each has a chance to appear)
  const hasChimney = Math.random() > 0.5;
  const chimneyPosition = Math.random() - 0.5; // Left or right side
  const hasPorch = Math.random() > 0.6;
  const porchDepth = 1.0 + Math.random() * 0.5;
  const hasShutters = Math.random() > 0.5;
  const hasAwning = !hasPorch && Math.random() > 0.7; // Awning if no porch
  
  return {
    // Color indices (we store indices to reference the palette)
    wallColorIndex,
    roofColorIndex,
    doorColorIndex,
    trimColorIndex,
    // Dimensions
    width,
    depth,
    height,
    // Roof
    roofStyle,
    roofHeight,
    roofOverhang,
    // Windows
    windowsPerSide,
    windowSize,
    hasSecondFloorWindows,
    // Door
    doorWidth,
    doorHeight,
    doorOffsetX,
    // Features
    hasChimney,
    chimneyPosition,
    hasPorch,
    porchDepth,
    hasShutters,
    hasAwning
  };
}

/**
 * Creates a Three.js house mesh group from a style configuration
 * @param {Object} style - House style configuration from generateHouseStyle()
 * @returns {THREE.Group} The house mesh group
 */
export function createHouseFromStyle(style) {
  const house = new THREE.Group();
  const palette = CONFIG.house.palettes;
  
  // Get colors from palette using stored indices
  const wallColor = palette.walls[style.wallColorIndex];
  const roofColor = palette.roofs[style.roofColorIndex];
  const doorColor = palette.doors[style.doorColorIndex];
  const trimColor = palette.trim[style.trimColorIndex];
  const windowColor = CONFIG.objects.house.windowColor;
  
  // Create materials
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: wallColor,
    roughness: 0.8
  });
  const roofMaterial = new THREE.MeshStandardMaterial({ 
    color: roofColor,
    roughness: 0.7
  });
  roofMaterial.side = THREE.DoubleSide; // Prevent single-sided gaps on gables
  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: doorColor,
    roughness: 0.6
  });
  const trimMaterial = new THREE.MeshStandardMaterial({ 
    color: trimColor,
    roughness: 0.5
  });
  const windowMaterial = new THREE.MeshStandardMaterial({ 
    color: windowColor,
    emissive: windowColor,
    emissiveIntensity: 0.2,
    roughness: 0.1
  });
  
  // === MAIN STRUCTURE ===
  const baseGeometry = new THREE.BoxGeometry(style.width, style.height, style.depth);
  const base = new THREE.Mesh(baseGeometry, wallMaterial);
  base.position.y = style.height / 2;
  base.castShadow = true;
  base.receiveShadow = true;
  house.add(base);
  
  // === ROOF ===
  const roof = createRoof(style, roofMaterial, trimMaterial);
  roof.position.y = style.height;
  house.add(roof);
  
  // === DOOR ===
  const doorGroup = createDoor(style, doorMaterial, trimMaterial);
  doorGroup.position.set(style.doorOffsetX, style.doorHeight / 2, style.depth / 2 + 0.05);
  doorGroup.castShadow = true;
  doorGroup.receiveShadow = true;
  
  // Set the parentHouse reference on the door mesh (for entering the house)
  if (doorGroup.doorMesh) {
    doorGroup.doorMesh.userData.parentHouse = house;
  }
  house.add(doorGroup);
  
  // === WINDOWS ===
  addWindows(house, style, windowMaterial, trimMaterial);
  
  // === OPTIONAL FEATURES ===
  if (style.hasChimney) {
    const chimney = createChimney(style, roofMaterial);
    house.add(chimney);
  }
  
  if (style.hasPorch) {
    const porch = createPorch(style, trimMaterial);
    house.add(porch);
  }
  
  if (style.hasAwning) {
    const awning = createAwning(style, roofMaterial);
    house.add(awning);
  }
  
  if (style.hasShutters) {
    addShutters(house, style, trimMaterial);
  }
  
  // Add foundation/base trim
  const foundationGeometry = new THREE.BoxGeometry(
    style.width + 0.2, 
    0.15, 
    style.depth + 0.2
  );
  const foundation = new THREE.Mesh(foundationGeometry, trimMaterial);
  foundation.position.y = 0.075;
  foundation.receiveShadow = true;
  house.add(foundation);
  
  return house;
}

/**
 * Creates a roof based on the style configuration
 * Uses angled planes for reliable geometry positioning
 * @param {Object} style - House style
 * @param {THREE.Material} roofMaterial - Roof material
 * @param {THREE.Material} trimMaterial - Trim material
 * @returns {THREE.Group} Roof group
 */
function createRoof(style, roofMaterial, trimMaterial) {
  const roofGroup = new THREE.Group();
  const overhang = style.roofOverhang;
  const deckThickness = 0.08; // thin sealing plate that closes the house top
  const deckWidth = style.width + overhang * 2;
  const deckDepth = style.depth + overhang * 2;
  const yBase = deckThickness;

  // Base deck ensures the roof fully seals the wall top even with thin slopes
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(deckWidth, deckThickness, deckDepth),
    roofMaterial
  );
  deck.position.y = deckThickness / 2;
  deck.castShadow = true;
  deck.receiveShadow = true;
  roofGroup.add(deck);

  // Fascia/eave trim to hide seams and ground the silhouette
  addEaveTrim(roofGroup, deckWidth, deckDepth, deckThickness, trimMaterial);
  
  switch (style.roofStyle) {
    case 'peaked': {
      // Classic A-frame roof using two angled planes
      const halfWidth = deckWidth / 2;
      const roofDepth = deckDepth;
      
      // Calculate the slope length (hypotenuse of the triangle)
      const slopeLength = Math.sqrt(halfWidth * halfWidth + style.roofHeight * style.roofHeight);
      const roofAngle = Math.atan2(style.roofHeight, halfWidth);
      
      // Roof thickness
      const thickness = 0.15;
      
      // Left roof slope
      const leftRoofGeom = new THREE.BoxGeometry(slopeLength, thickness, roofDepth);
      const leftRoof = new THREE.Mesh(leftRoofGeom, roofMaterial);
      leftRoof.rotation.z = roofAngle;
      leftRoof.position.set(-halfWidth / 2, yBase + style.roofHeight / 2, 0);
      leftRoof.castShadow = true;
      leftRoof.receiveShadow = true;
      roofGroup.add(leftRoof);
      
      // Right roof slope
      const rightRoof = new THREE.Mesh(leftRoofGeom, roofMaterial);
      rightRoof.rotation.z = -roofAngle;
      rightRoof.position.set(halfWidth / 2, yBase + style.roofHeight / 2, 0);
      rightRoof.castShadow = true;
      rightRoof.receiveShadow = true;
      roofGroup.add(rightRoof);
      
      // Front gable (triangle)
      const gableShape = new THREE.Shape();
      gableShape.moveTo(-halfWidth, 0);
      gableShape.lineTo(0, style.roofHeight);
      gableShape.lineTo(halfWidth, 0);
      gableShape.closePath();
      
      const gableGeom = new THREE.ShapeGeometry(gableShape);
      const frontGable = new THREE.Mesh(gableGeom, roofMaterial);
      frontGable.position.set(0, yBase, roofDepth / 2);
      frontGable.castShadow = true;
      roofGroup.add(frontGable);
      
      // Back gable
      const backGable = new THREE.Mesh(gableGeom, roofMaterial);
      backGable.position.set(0, yBase, -roofDepth / 2);
      backGable.rotation.y = Math.PI;
      backGable.castShadow = true;
      roofGroup.add(backGable);

      // Ridge cap to hide any seam at the apex
      const ridgeGeom = new THREE.BoxGeometry(roofDepth + 0.05, thickness * 0.6, thickness * 0.6);
      const ridge = new THREE.Mesh(ridgeGeom, trimMaterial);
      ridge.rotation.y = Math.PI / 2;
      ridge.position.set(0, yBase + style.roofHeight - thickness * 0.3, 0);
      ridge.castShadow = true;
      roofGroup.add(ridge);
      break;
    }
    
    case 'flat': {
      // Flat roof with slight lip
      const roofGeometry = new THREE.BoxGeometry(
        deckWidth, 
        0.2, 
        deckDepth
      );
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = yBase + 0.1;
      roof.castShadow = true;
      roof.receiveShadow = true;
      roofGroup.add(roof);
      
      // Add parapet/lip
      const parapetHeight = 0.35;
      const parapetThickness = 0.1;
      const halfWidth = deckWidth / 2;
      const halfDepth = deckDepth / 2;
      
      // Front parapet
      const frontParapet = new THREE.Mesh(
        new THREE.BoxGeometry(deckWidth, parapetHeight, parapetThickness),
        trimMaterial
      );
      frontParapet.position.set(0, yBase + parapetHeight / 2 + 0.2, halfDepth - parapetThickness / 2);
      roofGroup.add(frontParapet);
      
      // Back parapet
      const backParapet = frontParapet.clone();
      backParapet.position.z = -(halfDepth - parapetThickness / 2);
      roofGroup.add(backParapet);

      // Left parapet
      const leftParapet = new THREE.Mesh(
        new THREE.BoxGeometry(parapetThickness, parapetHeight, deckDepth),
        trimMaterial
      );
      leftParapet.position.set(-(halfWidth - parapetThickness / 2), yBase + parapetHeight / 2 + 0.2, 0);
      roofGroup.add(leftParapet);

      // Right parapet
      const rightParapet = leftParapet.clone();
      rightParapet.position.x = halfWidth - parapetThickness / 2;
      roofGroup.add(rightParapet);
      break;
    }
    
    case 'gambrel': {
      // Barn-style gambrel roof with two slopes on each side
      const halfWidth = deckWidth / 2;
      const roofDepth = deckDepth;
      const lowerHeight = style.roofHeight * 0.45;
      const upperHeight = style.roofHeight - lowerHeight;
      const thickness = 0.12;
      
      // Lower slope is steeper (about 60 degrees)
      const lowerAngle = Math.PI / 3;
      const lowerWidth = lowerHeight / Math.tan(lowerAngle);
      const lowerSlopeLength = Math.sqrt(lowerWidth * lowerWidth + lowerHeight * lowerHeight);
      
      // Upper slope is gentler (about 30 degrees)
      const upperWidth = halfWidth - lowerWidth;
      const upperSlopeLength = Math.sqrt(upperWidth * upperWidth + upperHeight * upperHeight);
      const upperAngle = Math.atan2(upperHeight, upperWidth);
      
      // Left lower slope
      const lowerLeftGeom = new THREE.BoxGeometry(lowerSlopeLength, thickness, roofDepth);
      const lowerLeft = new THREE.Mesh(lowerLeftGeom, roofMaterial);
      lowerLeft.rotation.z = lowerAngle;
      lowerLeft.position.set(-halfWidth + lowerWidth / 2, yBase + lowerHeight / 2, 0);
      lowerLeft.castShadow = true;
      roofGroup.add(lowerLeft);
      
      // Left upper slope
      const upperLeftGeom = new THREE.BoxGeometry(upperSlopeLength, thickness, roofDepth);
      const upperLeft = new THREE.Mesh(upperLeftGeom, roofMaterial);
      upperLeft.rotation.z = upperAngle;
      upperLeft.position.set(-upperWidth / 2, yBase + lowerHeight + upperHeight / 2, 0);
      upperLeft.castShadow = true;
      roofGroup.add(upperLeft);
      
      // Right lower slope
      const lowerRight = new THREE.Mesh(lowerLeftGeom, roofMaterial);
      lowerRight.rotation.z = -lowerAngle;
      lowerRight.position.set(halfWidth - lowerWidth / 2, yBase + lowerHeight / 2, 0);
      lowerRight.castShadow = true;
      roofGroup.add(lowerRight);
      
      // Right upper slope
      const upperRight = new THREE.Mesh(upperLeftGeom, roofMaterial);
      upperRight.rotation.z = -upperAngle;
      upperRight.position.set(upperWidth / 2, yBase + lowerHeight + upperHeight / 2, 0);
      upperRight.castShadow = true;
      roofGroup.add(upperRight);
      
      // Front gable
      const gableShape = new THREE.Shape();
      gableShape.moveTo(-halfWidth, 0);
      gableShape.lineTo(-halfWidth + lowerWidth, lowerHeight);
      gableShape.lineTo(0, lowerHeight + upperHeight);
      gableShape.lineTo(halfWidth - lowerWidth, lowerHeight);
      gableShape.lineTo(halfWidth, 0);
      gableShape.closePath();
      
      const gableGeom = new THREE.ShapeGeometry(gableShape);
      const frontGable = new THREE.Mesh(gableGeom, roofMaterial);
      frontGable.position.set(0, yBase, roofDepth / 2);
      roofGroup.add(frontGable);
      
      const backGable = new THREE.Mesh(gableGeom, roofMaterial);
      backGable.position.set(0, yBase, -roofDepth / 2);
      backGable.rotation.y = Math.PI;
      roofGroup.add(backGable);

      const ridgeGeom = new THREE.BoxGeometry(roofDepth + 0.05, thickness * 0.7, thickness * 0.7);
      const ridge = new THREE.Mesh(ridgeGeom, trimMaterial);
      ridge.rotation.y = Math.PI / 2;
      ridge.position.set(0, yBase + lowerHeight + upperHeight - thickness * 0.35, 0);
      ridge.castShadow = true;
      roofGroup.add(ridge);
      break;
    }
    
    case 'hip': {
      // Hip roof - simplified as a scaled four-sided pyramid for full coverage
      const hipGeom = new THREE.ConeGeometry(1, style.roofHeight, 4, 1, false);
      hipGeom.scale(deckWidth / 2, 1, deckDepth / 2);

      const hip = new THREE.Mesh(hipGeom, roofMaterial);
      hip.rotation.y = Math.PI / 4; // Align faces to the house axes
      hip.position.y = yBase + style.roofHeight / 2;
      hip.castShadow = true;
      hip.receiveShadow = true;
      roofGroup.add(hip);

      // Small cap to keep the apex from looking paper-thin
      const capSize = 0.12;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(capSize, capSize * 0.6, capSize),
        trimMaterial
      );
      cap.position.y = yBase + style.roofHeight - capSize * 0.3;
      cap.castShadow = true;
      roofGroup.add(cap);
      break;
    }
  }
  
  return roofGroup;
}

/**
 * Adds fascia/eave trim around the base of a roof
 * @param {THREE.Group} roofGroup - The roof group to append to
 * @param {number} deckWidth - Full roof deck width
 * @param {number} deckDepth - Full roof deck depth
 * @param {number} deckThickness - Thickness of the sealing deck
 * @param {THREE.Material} trimMaterial - Material for trim
 */
function addEaveTrim(roofGroup, deckWidth, deckDepth, deckThickness, trimMaterial) {
  const fasciaHeight = Math.max(0.06, deckThickness * 0.9);
  const fasciaThickness = 0.08;
  const halfWidth = deckWidth / 2;
  const halfDepth = deckDepth / 2;

  const front = new THREE.Mesh(
    new THREE.BoxGeometry(deckWidth, fasciaHeight, fasciaThickness),
    trimMaterial
  );
  front.position.set(0, fasciaHeight / 2, halfDepth);
  front.castShadow = true;
  roofGroup.add(front);

  const back = front.clone();
  back.position.z = -halfDepth;
  roofGroup.add(back);

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(fasciaThickness, fasciaHeight, deckDepth),
    trimMaterial
  );
  left.position.set(-halfWidth, fasciaHeight / 2, 0);
  left.castShadow = true;
  roofGroup.add(left);

  const right = left.clone();
  right.position.x = halfWidth;
  roofGroup.add(right);
}

/**
 * Creates a door mesh with optional frame
 * The door mesh is marked with userData.type = 'door' for raycaster detection
 * @param {Object} style - House style
 * @param {THREE.Material} doorMaterial - Door material
 * @param {THREE.Material} trimMaterial - Frame material
 * @returns {THREE.Group} Door group with doorMesh property for easy access
 */
function createDoor(style, doorMaterial, trimMaterial) {
  const doorGroup = new THREE.Group();
  
  // Main door - this is the interactive element
  const doorGeometry = new THREE.BoxGeometry(style.doorWidth, style.doorHeight, 0.1);
  const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
  doorMesh.name = 'doorMesh';
  // Mark the door mesh itself as interactive (raycaster hits this mesh)
  doorMesh.userData = {
    type: 'door',
    originalMaterial: doorMaterial
  };
  doorGroup.add(doorMesh);
  
  // Store reference to the door mesh on the group for easy access
  doorGroup.doorMesh = doorMesh;
  
  // Door frame
  const frameThickness = 0.08;
  const frameDepth = 0.15;
  
  // Top frame
  const topFrame = new THREE.Mesh(
    new THREE.BoxGeometry(style.doorWidth + frameThickness * 2, frameThickness, frameDepth),
    trimMaterial
  );
  topFrame.position.y = style.doorHeight / 2 + frameThickness / 2;
  doorGroup.add(topFrame);
  
  // Side frames
  const sideFrame = new THREE.Mesh(
    new THREE.BoxGeometry(frameThickness, style.doorHeight, frameDepth),
    trimMaterial
  );
  const leftFrame = sideFrame.clone();
  leftFrame.position.x = -(style.doorWidth / 2 + frameThickness / 2);
  doorGroup.add(leftFrame);
  
  const rightFrame = sideFrame.clone();
  rightFrame.position.x = style.doorWidth / 2 + frameThickness / 2;
  doorGroup.add(rightFrame);
  
  // Door handle
  const handleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const handleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xC0C0C0, 
    metalness: 0.8 
  });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(style.doorWidth * 0.35, 0, 0.08);
  doorGroup.add(handle);
  
  return doorGroup;
}

/**
 * Adds windows to all sides of the house
 * @param {THREE.Group} house - House group
 * @param {Object} style - House style
 * @param {THREE.Material} windowMaterial - Window material
 * @param {THREE.Material} trimMaterial - Window frame material
 */
function addWindows(house, style, windowMaterial, trimMaterial) {
  const windowGeometry = new THREE.BoxGeometry(
    style.windowSize, 
    style.windowSize * 0.8, 
    0.08
  );
  
  // Helper to create a window with frame
  const createWindow = (x, y, z, rotationY = 0) => {
    const windowGroup = new THREE.Group();
    
    // Glass
    const glass = new THREE.Mesh(windowGeometry, windowMaterial);
    windowGroup.add(glass);
    
    // Frame
    const frameThickness = 0.05;
    const frameWidth = style.windowSize + frameThickness * 2;
    const frameHeight = style.windowSize * 0.8 + frameThickness * 2;
    
    // Horizontal divider
    const hDivider = new THREE.Mesh(
      new THREE.BoxGeometry(style.windowSize, frameThickness, 0.1),
      trimMaterial
    );
    windowGroup.add(hDivider);
    
    // Vertical divider
    const vDivider = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, style.windowSize * 0.8, 0.1),
      trimMaterial
    );
    windowGroup.add(vDivider);
    
    // Outer frame
    const outerFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameWidth, frameThickness, 0.12),
      trimMaterial
    );
    const topFrame = outerFrame.clone();
    topFrame.position.y = style.windowSize * 0.4 + frameThickness / 2;
    windowGroup.add(topFrame);
    
    const bottomFrame = outerFrame.clone();
    bottomFrame.position.y = -(style.windowSize * 0.4 + frameThickness / 2);
    windowGroup.add(bottomFrame);
    
    const sideFrameGeom = new THREE.BoxGeometry(frameThickness, frameHeight, 0.12);
    const leftFrame = new THREE.Mesh(sideFrameGeom, trimMaterial);
    leftFrame.position.x = -(style.windowSize / 2 + frameThickness / 2);
    windowGroup.add(leftFrame);
    
    const rightFrame = new THREE.Mesh(sideFrameGeom, trimMaterial);
    rightFrame.position.x = style.windowSize / 2 + frameThickness / 2;
    windowGroup.add(rightFrame);
    
    windowGroup.position.set(x, y, z);
    windowGroup.rotation.y = rotationY;
    return windowGroup;
  };
  
  // Front windows (avoid door area)
  const frontY = style.height * 0.55;
  const windowSpacing = style.width / (style.windowsPerSide + 1);
  
  for (let i = 0; i < style.windowsPerSide; i++) {
    // Calculate x position, avoiding the door area
    let xPos = (i + 1) * windowSpacing - style.width / 2;
    
    // Skip if too close to door
    if (Math.abs(xPos - style.doorOffsetX) < style.doorWidth * 0.8) continue;
    
    const frontWindow = createWindow(
      xPos, 
      frontY, 
      style.depth / 2 + 0.05
    );
    house.add(frontWindow);
  }
  
  // Second floor windows (if applicable)
  if (style.hasSecondFloorWindows) {
    const secondFloorY = style.height * 0.8;
    for (let i = 0; i < style.windowsPerSide; i++) {
      const xPos = (i + 1) * windowSpacing - style.width / 2;
      const window = createWindow(xPos, secondFloorY, style.depth / 2 + 0.05);
      house.add(window);
    }
  }
  
  // Side windows
  const sideSpacing = style.depth / 2;
  const sideY = style.height * 0.55;
  
  // Left side
  const leftWindow = createWindow(
    -style.width / 2 - 0.05,
    sideY,
    0,
    Math.PI / 2
  );
  house.add(leftWindow);
  
  // Right side
  const rightWindow = createWindow(
    style.width / 2 + 0.05,
    sideY,
    0,
    -Math.PI / 2
  );
  house.add(rightWindow);
  
  // Back window
  const backWindow = createWindow(
    0,
    frontY,
    -style.depth / 2 - 0.05,
    Math.PI
  );
  house.add(backWindow);
}

/**
 * Creates a chimney
 * @param {Object} style - House style
 * @param {THREE.Material} material - Chimney material
 * @returns {THREE.Mesh} Chimney mesh
 */
function createChimney(style, material) {
  const chimneyWidth = 0.5 + Math.random() * 0.3;
  const chimneyHeight = style.roofHeight * 0.8 + 0.5;
  const chimneyDepth = 0.5 + Math.random() * 0.2;
  
  const chimneyGeometry = new THREE.BoxGeometry(chimneyWidth, chimneyHeight, chimneyDepth);
  const chimney = new THREE.Mesh(chimneyGeometry, material);
  
  // Position on roof
  const xPos = style.chimneyPosition * (style.width * 0.3);
  const zPos = -style.depth * 0.2;
  
  chimney.position.set(
    xPos,
    style.height + chimneyHeight / 2,
    zPos
  );
  chimney.castShadow = true;
  chimney.receiveShadow = true;
  
  return chimney;
}

/**
 * Creates a front porch
 * @param {Object} style - House style
 * @param {THREE.Material} material - Porch material
 * @returns {THREE.Group} Porch group
 */
function createPorch(style, material) {
  const porchGroup = new THREE.Group();
  
  const porchWidth = style.width * 0.7;
  const porchDepth = style.porchDepth;
  const porchHeight = 0.15;
  
  // Porch floor
  const floorGeometry = new THREE.BoxGeometry(porchWidth, porchHeight, porchDepth);
  const floor = new THREE.Mesh(floorGeometry, material);
  floor.position.set(0, porchHeight / 2, style.depth / 2 + porchDepth / 2);
  floor.receiveShadow = true;
  porchGroup.add(floor);
  
  // Porch posts
  const postHeight = 2.2;
  const postGeometry = new THREE.CylinderGeometry(0.08, 0.1, postHeight, 8);
  
  const leftPost = new THREE.Mesh(postGeometry, material);
  leftPost.position.set(
    -porchWidth / 2 + 0.15, 
    porchHeight + postHeight / 2, 
    style.depth / 2 + porchDepth - 0.15
  );
  leftPost.castShadow = true;
  porchGroup.add(leftPost);
  
  const rightPost = leftPost.clone();
  rightPost.position.x = porchWidth / 2 - 0.15;
  porchGroup.add(rightPost);
  
  // Porch roof
  const roofGeometry = new THREE.BoxGeometry(porchWidth + 0.2, 0.1, porchDepth + 0.3);
  const porchRoof = new THREE.Mesh(roofGeometry, material);
  porchRoof.position.set(0, porchHeight + postHeight + 0.05, style.depth / 2 + porchDepth / 2);
  porchRoof.castShadow = true;
  porchRoof.receiveShadow = true;
  porchGroup.add(porchRoof);
  
  // Small step
  const stepGeometry = new THREE.BoxGeometry(porchWidth * 0.5, 0.1, 0.3);
  const step = new THREE.Mesh(stepGeometry, material);
  step.position.set(0, 0.05, style.depth / 2 + porchDepth + 0.15);
  step.receiveShadow = true;
  porchGroup.add(step);
  
  return porchGroup;
}

/**
 * Creates a door awning
 * @param {Object} style - House style
 * @param {THREE.Material} material - Awning material
 * @returns {THREE.Mesh} Awning mesh
 */
function createAwning(style, material) {
  const awningWidth = style.doorWidth * 1.5;
  const awningDepth = 0.8;
  
  const awningShape = new THREE.Shape();
  awningShape.moveTo(0, 0);
  awningShape.lineTo(awningDepth, -0.3);
  awningShape.lineTo(awningDepth, -0.35);
  awningShape.lineTo(0, -0.05);
  
  const extrudeSettings = {
    depth: awningWidth,
    bevelEnabled: false
  };
  
  const awningGeometry = new THREE.ExtrudeGeometry(awningShape, extrudeSettings);
  const awning = new THREE.Mesh(awningGeometry, material);
  
  awning.rotation.y = Math.PI / 2;
  awning.position.set(
    style.doorOffsetX - awningWidth / 2,
    style.doorHeight + 0.3,
    style.depth / 2 + 0.05
  );
  awning.castShadow = true;
  
  return awning;
}

/**
 * Adds shutters to windows
 * @param {THREE.Group} house - House group
 * @param {Object} style - House style
 * @param {THREE.Material} material - Shutter material
 */
function addShutters(house, style, material) {
  const shutterWidth = style.windowSize * 0.25;
  const shutterHeight = style.windowSize * 0.8;
  const shutterDepth = 0.05;
  
  const shutterGeometry = new THREE.BoxGeometry(shutterWidth, shutterHeight, shutterDepth);
  
  // Add shutters to front windows
  const frontY = style.height * 0.55;
  const windowSpacing = style.width / (style.windowsPerSide + 1);
  
  for (let i = 0; i < style.windowsPerSide; i++) {
    const xPos = (i + 1) * windowSpacing - style.width / 2;
    
    // Skip if too close to door
    if (Math.abs(xPos - style.doorOffsetX) < style.doorWidth * 0.8) continue;
    
    // Left shutter
    const leftShutter = new THREE.Mesh(shutterGeometry, material);
    leftShutter.position.set(
      xPos - style.windowSize / 2 - shutterWidth / 2 - 0.02,
      frontY,
      style.depth / 2 + 0.03
    );
    house.add(leftShutter);
    
    // Right shutter
    const rightShutter = new THREE.Mesh(shutterGeometry, material);
    rightShutter.position.set(
      xPos + style.windowSize / 2 + shutterWidth / 2 + 0.02,
      frontY,
      style.depth / 2 + 0.03
    );
    house.add(rightShutter);
  }
}

/**
 * Creates a simplified ghost preview for house placement
 * Uses the style to show an approximation of the final house
 * @param {Object} style - House style (optional, will generate if not provided)
 * @returns {THREE.Group} Ghost preview group
 */
export function createHouseGhostPreview(style = null) {
  if (!style) {
    style = generateHouseStyle();
  }
  
  const ghost = new THREE.Group();
  const ghostMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    transparent: true, 
    opacity: 0.3,
    depthWrite: false
  });
  
  // Base
  const baseMaterial = ghostMaterial.clone();
  baseMaterial.color.set(CONFIG.house.palettes.walls[style.wallColorIndex]);
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(style.width, style.height, style.depth),
    baseMaterial
  );
  base.position.y = style.height / 2;
  ghost.add(base);
  
  // Simplified roof preview
  const roofMaterial = ghostMaterial.clone();
  roofMaterial.color.set(CONFIG.house.palettes.roofs[style.roofColorIndex]);
  
  if (style.roofStyle === 'flat') {
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(style.width + 0.3, 0.2, style.depth + 0.3),
      roofMaterial
    );
    roof.position.y = style.height + 0.1;
    ghost.add(roof);
  } else {
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(
        Math.max(style.width, style.depth) * 0.7,
        style.roofHeight,
        4
      ),
      roofMaterial
    );
    roof.position.y = style.height + style.roofHeight / 2;
    roof.rotation.y = Math.PI / 4;
    ghost.add(roof);
  }
  
  // Door indicator
  const doorMaterial = ghostMaterial.clone();
  doorMaterial.color.set(CONFIG.house.palettes.doors[style.doorColorIndex]);
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(style.doorWidth, style.doorHeight, 0.1),
    doorMaterial
  );
  door.position.set(style.doorOffsetX, style.doorHeight / 2, style.depth / 2 + 0.1);
  ghost.add(door);
  
  return ghost;
}
