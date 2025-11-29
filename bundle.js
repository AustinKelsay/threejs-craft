(function() {
'use strict';

// ===== Module: config.js =====
/**
 * Game configuration object containing all adjustable parameters
 * Modify these values to customize gameplay experience
 */
const CONFIG = {
  // World settings
  world: {
    size: 1000,               // Playable area size
    groundSize: 2000,         // Visual ground plane size
    gridDivisions: 50,        // Grid helper divisions
    fogNear: 100,             // Fog start distance
    fogFar: 500,              // Fog end distance
    objectCount: 120,         // Number of initial objects to spawn
    animalCount: 20,          // Number of initial animals to spawn
    boundaryPadding: 20       // Padding from world edge for spawning
  },
  
  // Player physics and controls
  player: {
    height: 1.7,              // Eye height in meters
    speed: 10,                // Movement speed
    sprintSpeed: 20,          // Sprint speed (when holding Shift)
    lookSpeed: 0.002,         // Mouse sensitivity
    jumpSpeed: 10,            // Jump velocity
    gravity: 30,              // Gravity strength
    maxHealth: 10,            // Hearts
    punchDamage: 1,           // Base damage dealt by unarmed punch
    pitchLimit: Math.PI / 2   // Maximum look up/down angle
  },
  
  // Building system
  building: {
    distance: 8,              // Build/interact distance
    highlightColor: 0xffff00, // Object highlight color (yellow)
    ghostOpacity: 0.3         // Preview object transparency
  },
  
  // Day/night cycle
  dayNight: {
    dayDuration: 240,         // Day length in seconds
    nightDuration: 3,        // Night length in seconds
    sunDistance: 150,         // Sun orbit radius
    moonDistance: 150         // Moon orbit radius
  },
  
  // Object properties
  objects: {
    tree: {
      trunkColor: 0x8B4513,   // Brown
      foliageColor: 0x228B22,  // Forest green (fixed from leavesColor)
      minHeight: 4,
      maxHeight: 8,
      minRadius: 2,
      maxRadius: 3,
      foliageLayers: 3        // Number of leaf layers
    },
    rock: {
      color: 0x696969,        // Dim gray
      minSize: 0.5,
      maxSize: 2,
      deformationRange: 0.3   // Vertex noise range
    },
    house: {
      wallColor: 0xD2691E,    // Chocolate
      roofColor: 0x8B4513,    // Saddle brown
      doorColor: 0x654321,    // Dark brown
      windowColor: 0x87CEEB,  // Sky blue
      minSize: 3,
      maxSize: 5,
      windowEmissive: 0.2     // Window glow intensity
    },
    cow: {
      bodyColor: 0x8B4513,    // Brown
      spotColor: 0xFFFFFF,    // White spots
      snoutColor: 0xFFB6C1,   // Pink snout
      hornColor: 0xFFFFF0,    // Ivory horns
      udderColor: 0xFFB6C1,   // Pink udder
      size: 1.5,              // Reduced from 2
      moveSpeed: 2,           // Movement speed
      wanderRadius: 15        // How far they wander
    },
    pig: {
      bodyColor: 0xFFB6C1,    // Light pink
      snoutColor: 0xFF69B4,   // Hot pink snout
      size: 1,                // Reduced from 1.5
      moveSpeed: 3,
      wanderRadius: 10
    },
    horse: {
      bodyColor: 0x654321,    // Dark brown
      maneColor: 0x000000,    // Black mane
      hoofColor: 0x2F4F4F,    // Dark slate gray hooves
      size: 1.8,              // Reduced from 2.5
      moveSpeed: 5,
      wanderRadius: 20
    },
    dragon: {
      bodyColor: 0x2d5a4a,    // Deep emerald scales
      wingColor: 0x3d6b5a,    // Darker green membrane
      bellyColor: 0xc9a55c,   // Golden cream underbelly
      hornColor: 0x1a1a1a,    // Near-black horns/claws
      eyeColor: 0xff6b00,     // Fiery orange eyes
      size: 2.4,              // Overall scale
      moveSpeed: 4,           // Ground trot speed
      flySpeed: 10,           // Aerial glide speed
      wanderRadius: 40,       // Large roaming radius
      minFlightHeight: 6,     // Lowest cruising altitude
      maxFlightHeight: 14,    // Highest cruising altitude
      flapSpeed: 10           // Wingbeat rate
    },
    cat: {
      bodyColor: 0x808080,    // Gray
      size: 0.4,              // Small size
      moveSpeed: 2,
      eyeColor: 0x32CD32      // Lime green eyes
    },
    dog: {
      bodyColor: 0xD2691E,    // Chocolate brown
      size: 0.8,              // Medium size
      moveSpeed: 3,
      earColor: 0x8B4513      // Darker brown ears
    }
  },
  
  // Camera settings
  camera: {
    fov: 75,                  // Field of view
    near: 0.1,                // Near clipping plane
    far: 1000                 // Far clipping plane
  },
  
  // Rendering settings
  renderer: {
    shadowMapSize: 2048,      // Shadow quality
    antialias: true           // Smooth edges
  },

  // Hostile mobs
  mobs: {
    spider: {
      maxHealth: 6,
      moveSpeed: 6,
      chaseRange: 35,
      attackRange: 1.8,
      attackDamage: 1,
      attackCooldown: 1.2
    },
    spawn: {
      dayCount: 8,            // Baseline daytime mobs
      nightExtra: 6,          // Additional mobs spawned at nightfall
      spread: 0.4             // Spawn radius as fraction of world size
    }
  },
  
  // UI settings
  ui: {
    compassSize: 80,          // Compass diameter in pixels
    selectorItemSize: 60      // Object selector button size
  },
  
  // Dynamic house generation settings
  house: {
    // Dimension ranges for randomly generated houses
    dimensions: {
      minWidth: 4,
      maxWidth: 8,
      minDepth: 4,
      maxDepth: 7,
      minHeight: 3,
      maxHeight: 5
    },
    // Color palettes - each house randomly picks from these
    palettes: {
      // Wall colors - warm, earthy, and suburban tones
      walls: [
        0xE8DCC4,  // Cream
        0xD4C4A8,  // Beige
        0xC9B896,  // Tan
        0xE6D5C3,  // Linen
        0xB8A088,  // Khaki
        0xD2B48C,  // Tan brown
        0xF5DEB3,  // Wheat
        0xDEB887,  // Burlywood
        0xAA8866,  // Sandstone
        0x9C8B7A,  // Warm gray
        0xC4A882,  // Sand
        0xE0C8A8   // Pale gold
      ],
      // Roof colors - darker, contrasting tones
      roofs: [
        0x4A3728,  // Dark brown
        0x8B4513,  // Saddle brown
        0x654321,  // Dark wood
        0x3D3D3D,  // Charcoal
        0x8B0000,  // Dark red
        0x2F4F4F,  // Dark slate
        0x556B2F,  // Dark olive
        0x4A4A4A,  // Gray
        0x5C4033,  // Dark umber
        0x704214   // Sepia
      ],
      // Door colors - accent colors for personality
      doors: [
        0x8B0000,  // Dark red
        0x006400,  // Dark green
        0x00008B,  // Dark blue
        0x4A3728,  // Dark brown
        0xFFFFFF,  // White
        0x2F4F4F,  // Dark slate
        0xDAA520,  // Goldenrod
        0x800020,  // Burgundy
        0x1C1C1C,  // Near black
        0x4682B4   // Steel blue
      ],
      // Trim colors - complement walls and doors
      trim: [
        0xFFFFFF,  // White
        0xF5F5DC,  // Beige
        0x2F4F4F,  // Dark slate
        0x8B4513,  // Brown
        0x696969,  // Dim gray
        0x4A3728,  // Dark brown
        0xDEB887,  // Burlywood
        0x1C1C1C   // Near black
      ]
    }
  },
  
  // Interior world settings
  interior: {
    roomSize: 15,             // Interior room dimensions
    ceilingHeight: 3,         // Room height
    floorColor: 0x654321,     // Wood floor
    wallColor: 0xF5F5DC,      // Beige walls
    ceilingColor: 0xFFFFFF,   // White ceiling
    doorHighlightColor: 0x00FF00, // Green door highlight
    boundaryPadding: 2,       // Padding from walls for animal movement
    furniture: {
      chair: {
        seatColor: 0x8B4513,  // Brown seat
        legColor: 0x654321,   // Dark brown legs
        height: 0.8,
        width: 0.5,
        depth: 0.5
      },
      table: {
        topColor: 0x8B4513,   // Brown top
        legColor: 0x654321,   // Dark brown legs
        height: 0.75,
        width: 1.5,
        depth: 0.8
      },
      couch: {
        mainColor: 0x4169E1,  // Royal blue
        cushionColor: 0x6495ED, // Cornflower blue
        length: 2,
        width: 0.8,
        height: 0.7
      },
      tv: {
        frameColor: 0x2F2F2F, // Dark gray frame
        screenColor: 0x000000, // Black screen
        standColor: 0x4F4F4F,  // Gray stand
        width: 1.2,
        height: 0.7,
        depth: 0.1
      },
      bed: {
        frameColor: 0x8B4513,  // Brown frame
        mattressColor: 0xF0E68C, // Khaki mattress
        pillowColor: 0xFFFFFF, // White pillow
        length: 2,
        width: 1.5,
        height: 0.5
      }
    }
  }
};


// ===== Module: resources.js =====
/**
 * Resource registry and shared inventory helpers.
 * Extend RESOURCE_DEFINITIONS to introduce new collectible resources.
 */

/**
 * Central list of supported resources.
 * Each entry can carry presentation data and future limits.
 */
const RESOURCE_DEFINITIONS = {
  wood: {
    id: 'wood',
    label: 'Wood',
    icon: '🪵',
    maxStack: Number.POSITIVE_INFINITY,
    defaultAmount: 0
  },
  stone: {
    id: 'stone',
    label: 'Stone',
    icon: '🪨',
    maxStack: Number.POSITIVE_INFINITY,
    defaultAmount: 0
  }
};

/**
 * Creates an inventory object pre-populated with all known resources.
 * @returns {Object} Inventory keyed by resource id
 */
function createEmptyInventory() {
  const inventory = {};
  Object.values(RESOURCE_DEFINITIONS).forEach(def => {
    inventory[def.id] = def.defaultAmount ?? 0;
  });
  return inventory;
}

/**
 * Verifies the resource type exists in the registry.
 * @param {string} resourceType
 * @returns {boolean}
 */
function isValidResource(resourceType) {
  return Boolean(RESOURCE_DEFINITIONS[resourceType]);
}

/**
 * Returns a normalized, non-negative integer amount.
 * @param {number} amount
 * @returns {number}
 */
function normalizeAmount(amount) {
  if (!Number.isFinite(amount)) return 0;
  return Math.max(0, Math.floor(amount));
}

/**
 * Ensures the inventory contains a slot for the resource.
 * @param {Object} inventory
 * @param {string} resourceType
 */
function ensureResourceSlot(inventory, resourceType) {
  if (!Object.prototype.hasOwnProperty.call(inventory, resourceType)) {
    inventory[resourceType] = 0;
  }
}

/**
 * Adds a resource amount to the inventory.
 * @param {Object} inventory
 * @param {string} resourceType
 * @param {number} amount
 * @returns {boolean} True if resource is valid and amount applied
 */
function addToInventory(inventory, resourceType, amount = 1) {
  if (!isValidResource(resourceType)) return false;

  const delta = normalizeAmount(amount);
  ensureResourceSlot(inventory, resourceType);

  const stackLimit = getStackLimit(resourceType);
  const newTotal = Math.min(inventory[resourceType] + delta, stackLimit);
  inventory[resourceType] = newTotal;
  return true;
}

/**
 * Removes a resource amount from the inventory if available.
 * @param {Object} inventory
 * @param {string} resourceType
 * @param {number} amount
 * @returns {boolean} True if resource existed and amount was removed
 */
function removeFromInventory(inventory, resourceType, amount = 1) {
  if (!isValidResource(resourceType)) return false;

  const delta = normalizeAmount(amount);
  ensureResourceSlot(inventory, resourceType);

  if (inventory[resourceType] < delta) return false;
  inventory[resourceType] -= delta;
  return true;
}

/**
 * Checks inventory contains at least the specified amount.
 * @param {Object} inventory
 * @param {string} resourceType
 * @param {number} amount
 * @returns {boolean}
 */
function hasResource(inventory, resourceType, amount = 1) {
  if (!isValidResource(resourceType)) return false;
  const required = normalizeAmount(amount);
  ensureResourceSlot(inventory, resourceType);
  return inventory[resourceType] >= required;
}

/**
 * Returns the current amount of a resource in inventory.
 * @param {Object} inventory
 * @param {string} resourceType
 * @returns {number}
 */
function getResourceAmount(inventory, resourceType) {
  ensureResourceSlot(inventory, resourceType);
  return inventory[resourceType];
}

/**
 * Retrieves the configured stack limit for a resource.
 * @param {string} resourceType
 * @returns {number}
 */
function getStackLimit(resourceType) {
  return RESOURCE_DEFINITIONS[resourceType]?.maxStack ?? Number.POSITIVE_INFINITY;
}

/**
 * Friendly display label for a resource id.
 * @param {string} resourceType
 * @returns {string}
 */
function getResourceLabel(resourceType) {
  const definition = RESOURCE_DEFINITIONS[resourceType];
  if (definition?.label) return definition.label;
  return resourceType ? resourceType.charAt(0).toUpperCase() + resourceType.slice(1) : '';
}

/**
 * Icon to render alongside a resource.
 * @param {string} resourceType
 * @returns {string}
 */
function getResourceIcon(resourceType) {
  return RESOURCE_DEFINITIONS[resourceType]?.icon || '📦';
}

/**
 * Returns inventory entries in registry order (stable for UI display).
 * Unknown resources are appended to the end.
 * @param {Object} inventory
 * @returns {Array<[string, number]>}
 */
function getInventoryEntries(inventory) {
  const entries = [];
  Object.keys(RESOURCE_DEFINITIONS).forEach(id => {
    entries.push([id, getResourceAmount(inventory, id)]);
  });

  Object.keys(inventory).forEach(key => {
    if (!isValidResource(key)) {
      entries.push([key, getResourceAmount(inventory, key)]);
    }
  });

  return entries;
}


// ===== Module: gameState.js =====
/**
 * Game state management
 * Contains all global state variables
 */


// Core Three.js objects
let scene, camera, renderer;
let raycaster;
let clock;

// Player state management
const player = {
  velocity: new THREE.Vector3(),
  canJump: true,
  height: CONFIG.player.height
};
const playerMaxHealth = CONFIG.player.maxHealth;
let playerHealth = CONFIG.player.maxHealth;

// Camera controller for FPS-style movement
const cameraController = {
  yaw: 0,      // Horizontal rotation (Y-axis)
  pitch: 0     // Vertical rotation (X-axis)
};

// Input state tracking
const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  sprint: false
};

const mouseControls = {
  active: false,
  movementX: 0,
  movementY: 0
};

// Building system state
let selectedObjectType = 0;
const buildableTypes = ['fists', 'tree', 'rock', 'house', 'cow', 'pig', 'horse', 'dragon'];
const interiorBuildableTypes = ['fists', 'chair', 'table', 'couch', 'tv', 'bed', 'cat', 'dog'];
let highlightedObject = null;
let ghostObject = null;
let ghostRotation = 0;  // Rotation for ghost preview objects
let lastGhostType = null;  // Track last ghost type to avoid recreation
let lastGhostRotation = 0;  // Track last rotation to detect changes
let selectedInventoryResource = null;
const mobs = []; // Hostile mobs (e.g., spiders)

// World object management
const worldObjects = [];     // Outdoor objects (trees, rocks, houses)
const interiorObjects = [];  // Indoor objects (furniture: tv, chairs, couches, etc.)
const worldAnimals = [];     // Outdoor animals (cows, pigs, horses, dragons)
const interiorAnimals = [];  // Indoor animals (cats, dogs)
let interactableObjects;

// Interior world state management
const worldState = {
  isInside: false,                    // Whether player is inside a building
  currentHouse: null,                 // Reference to the house player entered
  outsidePosition: new THREE.Vector3(), // Player position before entering
  outsideRotation: { yaw: 0, pitch: 0 }, // Camera rotation before entering
  interiorGroup: null,                // Group containing all interior objects
  houseInteriors: new Map()           // Map of house UUID to interior data
};

// Lighting and environment
let sunLight, moonLight, ambientLight;
let skyMesh, sunMesh, moonMesh;

// UI element references
const uiElements = {
  crosshair: null,
  compass: null,
  selector: null,
  instructions: null,
  inventory: null,
  health: null,
  saveLoadPanel: null,
  damageFlash: null
};

// Inventory and resource system
const inventory = createEmptyInventory();
const RESOURCES = RESOURCE_DEFINITIONS;

let inventoryOpen = false;

// Setter functions for variables that need to be updated
function setScene(value) { scene = value; }
function setCamera(value) { camera = value; }
function setRenderer(value) { renderer = value; }
function setRaycaster(value) { raycaster = value; }
function setClock(value) { clock = value; }
function setInteractableObjects(value) { interactableObjects = value; }
function setSunLight(value) { sunLight = value; }
function setMoonLight(value) { moonLight = value; }
function setAmbientLight(value) { ambientLight = value; }
function setSkyMesh(value) { skyMesh = value; }
function setSunMesh(value) { sunMesh = value; }
function setMoonMesh(value) { moonMesh = value; }
function setHighlightedObject(value) { highlightedObject = value; }
function setGhostObject(value) { ghostObject = value; }
function setGhostRotation(value) { ghostRotation = value; }
function setSelectedObjectType(value) { selectedObjectType = value; }
function setLastGhostType(value) { lastGhostType = value; }
function setLastGhostRotation(value) { lastGhostRotation = value; }
function setInventoryOpen(value) { inventoryOpen = value; }
function setSelectedInventoryResource(value) { selectedInventoryResource = value; }
function setPlayerHealth(value) { playerHealth = Math.max(0, Math.floor(value)); }

// Resource management functions
function addResource(resourceType, amount = 1) {
  return addToInventory(inventory, resourceType, amount);
}

function removeResource(resourceType, amount = 1) {
  return removeFromInventory(inventory, resourceType, amount);
}

function hasResourceAmount(resourceType, amount = 1) {
  return hasResource(inventory, resourceType, amount);
}

function getResourceCount(resourceType) {
  return getResourceAmount(inventory, resourceType);
}


// ===== Module: utils.js =====
/**
 * Utility functions for the game
 */

/**
 * Properly dispose of Three.js objects to prevent memory leaks
 * @param {THREE.Object3D} object - The object to dispose
 */
function disposeObject(object) {
  if (!object) return;
  
  object.traverse(child => {
    if (child.isMesh) {
      // Dispose geometry
      if (child.geometry) {
        child.geometry.dispose();
      }
      
      // Dispose material(s)
      if (child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(material => {
          // Dispose textures
          for (const prop in material) {
            if (material[prop] && material[prop].isTexture) {
              material[prop].dispose();
            }
          }
          material.dispose();
        });
      }
    }
  });
  
  // Remove from parent
  if (object.parent) {
    object.parent.remove(object);
  }
}

/**
 * Find the parent object with type data
 * @param {THREE.Object3D} mesh - The mesh to search from
 * @returns {THREE.Object3D|null} The parent object with type data
 */
function findParentObject(mesh) {
  let current = mesh;
  while (current && !current.userData.type) {
    current = current.parent;
  }
  return current;
}


// ===== Module: camera.js =====
/**
 * Camera control functions for FPS-style movement
 */


// Reusable vectors to avoid per-frame allocations (unique names for bundler)
const CAMERA_FORWARD_VEC = new THREE.Vector3();
const CAMERA_RIGHT_VEC = new THREE.Vector3();

/**
 * Update camera rotation based on current yaw and pitch
 */
function updateCameraRotation() {
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
function applyCameraMovement(deltaYaw, deltaPitch) {
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
function getForwardVector(target = CAMERA_FORWARD_VEC) {
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
function getRightVector(target = CAMERA_RIGHT_VEC) {
  // Get right direction based on yaw only
  target.set(
    -Math.cos(cameraController.yaw),
    0,
    Math.sin(cameraController.yaw)
  );
  return target;
}


// ===== Module: houseGenerator.js =====
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


/**
 * Available roof style types
 */
const ROOF_STYLES = ['peaked', 'flat', 'gambrel', 'hip'];

/**
 * Generates a random house style configuration
 * This can be stored and reused to recreate identical houses
 * @returns {Object} House style configuration
 */
function generateHouseStyle() {
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
function createHouseFromStyle(style) {
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
function createHouseGhostPreview(style = null) {
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


// ===== Module: worldObjects.js =====
/**
 * World Objects Module
 * 
 * Handles creation and management of outdoor static objects (trees, rocks, houses)
 */


/**
 * Creates a tree at the specified position with varied shapes and styles
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 */
function createTree(x, z) {
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
function createRock(x, z) {
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
function createHouse(x, z, uuid = null, style = null) {
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
function createInitialWorldObjects(scene) {
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


// ===== Module: droppedResources.js =====
/**
 * Dropped Resources Module
 *
 * Handles creation and management of resources dropped on the ground
 */


// Array to track all dropped resources
const droppedResources = [];

/**
 * Creates a dropped resource at the specified position
 * @param {string} resourceType - Type of resource (e.g., 'wood')
 * @param {number} amount - Amount of resource in this drop
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created resource drop object
 */
function createDroppedResource(resourceType, amount, x, z) {
  if (!isValidResource(resourceType)) {
    console.warn(`Attempted to drop unknown resource type: ${resourceType}`);
    return null;
  }

  const dropAmount = Math.max(1, Math.floor(amount));
  if (dropAmount <= 0) return null;

  const resourceDrop = new THREE.Group();

  // Create visual representation based on resource type
  if (resourceType === 'wood') {
    // Create a wood log mesh
    const logGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
    const logMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513, // Brown
      roughness: 0.8
    });
    const log = new THREE.Mesh(logGeometry, logMaterial);
    log.rotation.z = Math.PI / 2; // Lay it on its side
    log.position.y = 0.15;
    log.castShadow = true;
    log.receiveShadow = true;
    resourceDrop.add(log);

    // Add end caps (lighter color)
    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xD2B48C, // Tan
      roughness: 0.7
    });
    const capGeometry = new THREE.CircleGeometry(0.15, 8);

    const cap1 = new THREE.Mesh(capGeometry, capMaterial);
    cap1.rotation.y = Math.PI / 2;
    cap1.position.set(0.3, 0.15, 0);
    resourceDrop.add(cap1);

    const cap2 = new THREE.Mesh(capGeometry, capMaterial);
    cap2.rotation.y = -Math.PI / 2;
    cap2.position.set(-0.3, 0.15, 0);
    resourceDrop.add(cap2);
  } else if (resourceType === 'stone') {
    // Create a stone chunk mesh (irregular dodecahedron)
    const stoneGeometry = new THREE.DodecahedronGeometry(0.3, 0);
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x696969, // Gray
      roughness: 0.9,
      metalness: 0.1
    });
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    stone.position.y = 0.3;
    stone.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    stone.scale.set(
      0.8 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4,
      0.8 + Math.random() * 0.4
    );
    stone.castShadow = true;
    stone.receiveShadow = true;
    resourceDrop.add(stone);
  }

  // Position the resource
  resourceDrop.position.set(x, 0, z);
  resourceDrop.rotation.y = Math.random() * Math.PI * 2;

  // Store metadata
  resourceDrop.userData = {
    type: 'droppedResource',
    resourceType: resourceType,
    amount: dropAmount,
    removable: false // Can't be removed with spacebar, only picked up
  };

  // Add to tracking arrays
  droppedResources.push(resourceDrop);
  worldObjects.push(resourceDrop);
  interactableObjects.add(resourceDrop);

  return resourceDrop;
}

/**
 * Drops a resource near the player's position
 * @param {string} resourceType - Type of resource to drop
 * @param {number} amount - Amount to drop
 */
function dropResourceNearPlayer(resourceType, amount) {
  if (amount <= 0 || !isValidResource(resourceType)) return null;

  // Calculate drop position in front of player
  const dropDistance = 2;
  const dropX = camera.position.x + Math.sin(camera.rotation.y) * dropDistance;
  const dropZ = camera.position.z + Math.cos(camera.rotation.y) * dropDistance;

  return createDroppedResource(resourceType, amount, dropX, dropZ);
}

/**
 * Removes a dropped resource from the world
 * @param {THREE.Group} resourceDrop - The resource drop to remove
 */
function removeDroppedResource(resourceDrop) {
  // Remove from droppedResources array
  const index = droppedResources.indexOf(resourceDrop);
  if (index > -1) {
    droppedResources.splice(index, 1);
  }

  // Remove from worldObjects array
  const worldIndex = worldObjects.indexOf(resourceDrop);
  if (worldIndex > -1) {
    worldObjects.splice(worldIndex, 1);
  }

  // Remove from interactable objects
  interactableObjects.remove(resourceDrop);

  // Dispose of geometry and materials
  resourceDrop.traverse(child => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(material => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });

  // Remove from scene
  if (resourceDrop.parent) {
    resourceDrop.parent.remove(resourceDrop);
  }
}


// ===== Module: worldAnimals.js =====
/**
 * World Animals Module
 * 
 * Handles creation and management of outdoor animals (cows, pigs, horses, dragons)
 */


/**
 * Creates a cow at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created cow object
 */
function createCow(x, z) {
  const cow = new THREE.Group();
  const size = CONFIG.objects.cow.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.5, size * 0.8, size * 0.8);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.6;
  body.castShadow = true;
  body.receiveShadow = true;
  cow.add(body);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.5, size * 0.5, size * 0.4);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.8, size * 0.6, 0);
  head.castShadow = true;
  cow.add(head);
  
  // Snout
  const snoutGeometry = new THREE.BoxGeometry(size * 0.3, size * 0.25, size * 0.3);
  const snoutMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.snoutColor,
    roughness: 0.9
  });
  const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
  snout.position.set(size * 1.05, size * 0.5, 0);
  cow.add(snout);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.85, size * 0.7, size * 0.15);
  cow.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.85, size * 0.7, -size * 0.15);
  cow.add(eye2);
  
  // Horns
  const hornGeometry = new THREE.CylinderGeometry(size * 0.03, size * 0.05, size * 0.2);
  const hornMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.hornColor,
    roughness: 0.7
  });
  const horn1 = new THREE.Mesh(hornGeometry, hornMaterial);
  horn1.position.set(size * 0.7, size * 0.85, size * 0.1);
  horn1.rotation.z = -0.3;
  cow.add(horn1);
  
  const horn2 = new THREE.Mesh(hornGeometry, hornMaterial);
  horn2.position.set(size * 0.7, size * 0.85, -size * 0.1);
  horn2.rotation.z = -0.3;
  cow.add(horn2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.08, size * 0.5);
  const legMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.bodyColor,
    roughness: 0.8
  });
  const legs = [];
  const legPositions = [
    { x: size * 0.5, z: size * 0.25 },
    { x: size * 0.5, z: -size * 0.25 },
    { x: -size * 0.5, z: size * 0.25 },
    { x: -size * 0.5, z: -size * 0.25 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, size * 0.25, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    cow.add(leg);
  });
  
  // Udder
  const udderGeometry = new THREE.SphereGeometry(size * 0.3, 6, 4);
  const udderMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cow.udderColor,
    roughness: 0.9
  });
  const udder = new THREE.Mesh(udderGeometry, udderMaterial);
  udder.position.set(-size * 0.2, size * 0.35, 0);
  udder.scale.y = 0.7;
  cow.add(udder);
  
  // Tail
  const tailGeometry = new THREE.CylinderGeometry(size * 0.03, size * 0.05, size * 0.6);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.75, size * 0.5, 0);
  tail.rotation.z = Math.PI / 6;
  cow.add(tail);
  
  cow.position.set(x, 0, z);
  cow.userData = { 
    type: 'cow', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.cow.moveSpeed,
    wanderRadius: CONFIG.objects.cow.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(cow);
  interactableObjects.add(cow);
  
  return cow;
}

/**
 * Creates a pig at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created pig object
 */
function createPig(x, z) {
  const pig = new THREE.Group();
  const size = CONFIG.objects.pig.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.2, size * 0.6, size * 0.7);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.pig.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.4;
  body.castShadow = true;
  body.receiveShadow = true;
  pig.add(body);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.45, size * 0.4, size * 0.4);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.65, size * 0.4, 0);
  head.castShadow = true;
  pig.add(head);
  
  // Snout
  const snoutGeometry = new THREE.CylinderGeometry(size * 0.1, size * 0.15, size * 0.15);
  const snoutMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.pig.snoutColor,
    roughness: 0.9
  });
  const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
  snout.position.set(size * 0.85, size * 0.35, 0);
  snout.rotation.z = Math.PI / 2;
  pig.add(snout);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.04, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.7, size * 0.5, size * 0.12);
  pig.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.7, size * 0.5, -size * 0.12);
  pig.add(eye2);
  
  // Ears
  const earGeometry = new THREE.ConeGeometry(size * 0.1, size * 0.15, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 0.55, size * 0.55, size * 0.15);
  ear1.rotation.z = -0.5;
  pig.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 0.55, size * 0.55, -size * 0.15);
  ear2.rotation.z = -0.5;
  pig.add(ear2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.06, size * 0.06, size * 0.3);
  const legs = [];
  const legPositions = [
    { x: size * 0.4, z: size * 0.2 },
    { x: size * 0.4, z: -size * 0.2 },
    { x: -size * 0.4, z: size * 0.2 },
    { x: -size * 0.4, z: -size * 0.2 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.15, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    pig.add(leg);
  });
  
  // Tail (curly)
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.1, 0.1, 0),
    new THREE.Vector3(-0.15, 0.15, 0.1),
    new THREE.Vector3(-0.2, 0.1, 0.15),
    new THREE.Vector3(-0.25, 0, 0.1)
  ]);
  
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 8, size * 0.02, 4, false);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.6, size * 0.5, 0);
  pig.add(tail);
  
  pig.position.set(x, 0, z);
  pig.userData = { 
    type: 'pig', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.pig.moveSpeed,
    wanderRadius: CONFIG.objects.pig.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(pig);
  interactableObjects.add(pig);
  
  return pig;
}

/**
 * Creates a horse at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created horse object
 */
function createHorse(x, z) {
  const horse = new THREE.Group();
  const size = CONFIG.objects.horse.size;
  
  // Body
  const bodyGeometry = new THREE.BoxGeometry(size * 1.8, size * 0.9, size * 0.7);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.bodyColor,
    roughness: 0.7
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.9;
  body.castShadow = true;
  body.receiveShadow = true;
  horse.add(body);
  
  // Neck
  const neckGeometry = new THREE.BoxGeometry(size * 0.4, size * 0.8, size * 0.4);
  const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
  neck.position.set(size * 0.8, size * 1.2, 0);
  neck.rotation.z = -0.3;
  neck.castShadow = true;
  horse.add(neck);
  
  // Head
  const headGeometry = new THREE.BoxGeometry(size * 0.5, size * 0.35, size * 0.3);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 1.2, size * 1.4, 0);
  head.castShadow = true;
  horse.add(head);
  
  // Mane
  const maneGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.6, size * 0.3);
  const maneMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.maneColor,
    roughness: 0.9
  });
  const mane = new THREE.Mesh(maneGeometry, maneMaterial);
  mane.position.set(size * 0.65, size * 1.4, 0);
  mane.rotation.z = -0.3;
  horse.add(mane);
  
  // Eyes
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    roughness: 0.3
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 1.15, size * 1.5, size * 0.12);
  horse.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 1.15, size * 1.5, -size * 0.12);
  horse.add(eye2);
  
  // Ears
  const earGeometry = new THREE.ConeGeometry(size * 0.06, size * 0.12, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 1.1, size * 1.65, size * 0.08);
  ear1.rotation.z = -0.2;
  horse.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 1.1, size * 1.65, -size * 0.08);
  ear2.rotation.z = -0.2;
  horse.add(ear2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.1, size * 0.9);
  const legs = [];
  const legPositions = [
    { x: size * 0.6, z: size * 0.2 },
    { x: size * 0.6, z: -size * 0.2 },
    { x: -size * 0.6, z: size * 0.2 },
    { x: -size * 0.6, z: -size * 0.2 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.45, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    horse.add(leg);
  });
  
  // Hooves
  const hoofGeometry = new THREE.CylinderGeometry(size * 0.09, size * 0.09, size * 0.1);
  const hoofMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.horse.hoofColor,
    roughness: 0.8
  });
  
  legPositions.forEach(pos => {
    const hoof = new THREE.Mesh(hoofGeometry, hoofMaterial);
    hoof.position.set(pos.x, size * 0.05, pos.z);
    horse.add(hoof);
  });
  
  // Tail
  const tailGeometry = new THREE.BoxGeometry(size * 0.15, size * 0.8, size * 0.1);
  const tail = new THREE.Mesh(tailGeometry, maneMaterial);
  tail.position.set(-size * 0.9, size * 0.7, 0);
  tail.rotation.z = 0.2;
  horse.add(tail);
  
  horse.position.set(x, 0, z);
  horse.userData = { 
    type: 'horse', 
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.horse.moveSpeed,
    wanderRadius: CONFIG.objects.horse.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0
  };
  
  worldAnimals.push(horse);
  interactableObjects.add(horse);
  
  return horse;
}

/**
 * Creates a friendly dragon that can walk and fly
 * Uses organic shapes for a more majestic, serpentine appearance
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created dragon object
 */
function createDragon(x, z) {
  const dragon = new THREE.Group();
  const config = CONFIG.objects.dragon;
  const s = config.size;
  
  // Enhanced materials with richer visual properties
  const scaleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2d5a4a,  // Deep emerald scales
    roughness: 0.35,
    metalness: 0.4
  });
  const scaleHighlightMat = new THREE.MeshStandardMaterial({ 
    color: 0x4a8f7a,  // Lighter emerald highlights
    roughness: 0.3,
    metalness: 0.5
  });
  const underbellyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xc9a55c,  // Golden cream underbelly
    roughness: 0.6,
    metalness: 0.1
  });
  const hornMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a1a,  // Near-black horns/claws
    roughness: 0.2,
    metalness: 0.6
  });
  const wingMembraneMat = new THREE.MeshStandardMaterial({ 
    color: 0x3d6b5a,  // Darker green membrane
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.15
  });
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff6b00,  // Fiery orange
    emissive: 0xff4400,
    emissiveIntensity: 0.8
  });
  const pupilMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000
  });

  // === MAIN BODY (serpentine torso) ===
  // Core body - elongated ellipsoid shape
  const bodyCore = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.65, 16, 12, 0, Math.PI * 2, 0, Math.PI),
    scaleMaterial
  );
  bodyCore.scale.set(2.2, 0.9, 1.0);
  bodyCore.position.set(0, s * 0.9, 0);
  bodyCore.castShadow = true;
  bodyCore.receiveShadow = true;
  dragon.add(bodyCore);

  // Chest bulge (front of body)
  const chest = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.55, 12, 10),
    scaleMaterial
  );
  chest.scale.set(1.0, 0.95, 0.9);
  chest.position.set(s * 0.85, s * 0.85, 0);
  chest.castShadow = true;
  dragon.add(chest);

  // Hip section (rear of body)
  const hips = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.5, 12, 10),
    scaleMaterial
  );
  hips.scale.set(1.1, 0.85, 0.95);
  hips.position.set(-s * 0.7, s * 0.8, 0);
  hips.castShadow = true;
  dragon.add(hips);

  // Underbelly plates
  for (let i = 0; i < 6; i++) {
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(s * 0.35, s * 0.08, s * 0.5),
      underbellyMaterial
    );
    plate.position.set(s * (0.7 - i * 0.28), s * 0.42, 0);
    plate.castShadow = true;
    dragon.add(plate);
  }

  // === NECK (curved, segmented) ===
  const neckSegments = 4;
  for (let i = 0; i < neckSegments; i++) {
    const t = i / (neckSegments - 1);
    const radius = THREE.MathUtils.lerp(s * 0.32, s * 0.22, t);
    const segment = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 10, 8),
      scaleMaterial
    );
    // Curved neck path rising upward and forward
    segment.position.set(
      s * (1.0 + t * 0.7),
      s * (1.0 + t * 0.6 + Math.sin(t * Math.PI * 0.5) * 0.2),
      0
    );
    segment.scale.set(1.1, 1.0, 0.85);
    segment.castShadow = true;
    dragon.add(segment);
  }

  // === HEAD ===
  // Main skull
  const skull = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.32, 12, 10),
    scaleMaterial
  );
  skull.scale.set(1.4, 1.0, 1.0);
  skull.position.set(s * 1.85, s * 1.7, 0);
  skull.castShadow = true;
  dragon.add(skull);

  // Snout (elongated)
  const snout = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.2, 10, 8),
    scaleMaterial
  );
  snout.scale.set(2.0, 0.7, 0.8);
  snout.position.set(s * 2.25, s * 1.62, 0);
  snout.castShadow = true;
  dragon.add(snout);

  // Lower jaw
  const lowerJaw = new THREE.Mesh(
    new THREE.SphereGeometry(s * 0.15, 8, 6),
    scaleMaterial
  );
  lowerJaw.scale.set(1.8, 0.5, 0.7);
  lowerJaw.position.set(s * 2.15, s * 1.48, 0);
  lowerJaw.castShadow = true;
  dragon.add(lowerJaw);

  // Brow ridges
  const browL = new THREE.Mesh(
    new THREE.BoxGeometry(s * 0.18, s * 0.08, s * 0.12),
    scaleHighlightMat
  );
  browL.position.set(s * 1.95, s * 1.82, s * 0.12);
  browL.rotation.z = -0.3;
  dragon.add(browL);
  const browR = browL.clone();
  browR.position.z = -s * 0.12;
  browR.rotation.z = -0.3;
  dragon.add(browR);

  // Nostrils
  const nostrilGeo = new THREE.SphereGeometry(s * 0.035, 6, 4);
  const nostrilMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const nostrilL = new THREE.Mesh(nostrilGeo, nostrilMat);
  nostrilL.position.set(s * 2.48, s * 1.67, s * 0.06);
  dragon.add(nostrilL);
  const nostrilR = nostrilL.clone();
  nostrilR.position.z = -s * 0.06;
  dragon.add(nostrilR);

  // Eyes with slit pupils
  const eyeWhiteGeo = new THREE.SphereGeometry(s * 0.1, 10, 8);
  const eyeL = new THREE.Mesh(eyeWhiteGeo, eyeMaterial);
  eyeL.scale.set(0.9, 1.0, 0.6);
  eyeL.position.set(s * 2.0, s * 1.78, s * 0.18);
  dragon.add(eyeL);
  const eyeR = eyeL.clone();
  eyeR.position.z = -s * 0.18;
  dragon.add(eyeR);

  // Slit pupils
  const pupilGeo = new THREE.SphereGeometry(s * 0.045, 6, 4);
  const pupilL = new THREE.Mesh(pupilGeo, pupilMaterial);
  pupilL.scale.set(0.4, 1.0, 0.5);
  pupilL.position.set(s * 2.08, s * 1.78, s * 0.22);
  dragon.add(pupilL);
  const pupilR = pupilL.clone();
  pupilR.position.z = -s * 0.22;
  dragon.add(pupilR);

  // Horns (curved backward)
  const hornGeo = new THREE.ConeGeometry(s * 0.08, s * 0.55, 8);
  const hornL = new THREE.Mesh(hornGeo, hornMaterial);
  hornL.position.set(s * 1.65, s * 2.0, s * 0.2);
  hornL.rotation.set(0.4, 0, 0.6);
  hornL.castShadow = true;
  dragon.add(hornL);
  const hornR = hornL.clone();
  hornR.position.z = -s * 0.2;
  hornR.rotation.set(-0.4, 0, 0.6);
  dragon.add(hornR);

  // Small ear frills
  const frillGeo = new THREE.ConeGeometry(s * 0.12, s * 0.25, 4);
  const frillL = new THREE.Mesh(frillGeo, scaleHighlightMat);
  frillL.position.set(s * 1.72, s * 1.85, s * 0.28);
  frillL.rotation.set(0.8, 0, 0.3);
  dragon.add(frillL);
  const frillR = frillL.clone();
  frillR.position.z = -s * 0.28;
  frillR.rotation.set(-0.8, 0, 0.3);
  dragon.add(frillR);

  // === BACK SPINES ===
  const spineCount = 8;
  for (let i = 0; i < spineCount; i++) {
    const t = i / (spineCount - 1);
    const spineHeight = s * THREE.MathUtils.lerp(0.35, 0.18, t);
    const spine = new THREE.Mesh(
      new THREE.ConeGeometry(s * 0.06, spineHeight, 4),
      scaleHighlightMat
    );
    spine.position.set(
      s * (1.2 - i * 0.35),
      s * 1.35 + (i < 3 ? i * 0.08 : (5 - i) * 0.05),
      0
    );
    spine.castShadow = true;
    dragon.add(spine);
  }

  // === TAIL (long, sinuous, with spade tip) ===
  const tailSegments = [];
  const tailCount = 8;
  for (let i = 0; i < tailCount; i++) {
    const t = i / (tailCount - 1);
    const radius = s * THREE.MathUtils.lerp(0.28, 0.08, t);
    const tailSeg = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 8, 6),
      scaleMaterial
    );
    tailSeg.scale.set(1.2, 0.9, 0.9);
    tailSeg.position.set(
      -s * (0.95 + i * 0.4),
      s * (0.6 - i * 0.03),
      0
    );
    tailSeg.castShadow = true;
    tailSegments.push(tailSeg);
    dragon.add(tailSeg);
  }

  // Tail spade tip
  const spadeShape = new THREE.Shape();
  spadeShape.moveTo(0, 0);
  spadeShape.lineTo(s * 0.25, s * 0.1);
  spadeShape.lineTo(s * 0.35, s * 0.35);
  spadeShape.lineTo(0, s * 0.5);
  spadeShape.lineTo(-s * 0.35, s * 0.35);
  spadeShape.lineTo(-s * 0.25, s * 0.1);
  spadeShape.lineTo(0, 0);
  const spadeGeo = new THREE.ShapeGeometry(spadeShape);
  const tailSpade = new THREE.Mesh(spadeGeo, scaleHighlightMat);
  tailSpade.position.set(-s * 4.2, s * 0.35, 0);
  tailSpade.rotation.set(0, Math.PI / 2, Math.PI * 0.1);
  tailSpade.castShadow = true;
  tailSegments.push(tailSpade);
  dragon.add(tailSpade);

  // === LEGS (muscular, with claws) ===
  const legs = [];
  const legPositions = [
    { x: s * 0.7, z: s * 0.4, isFront: true },
    { x: s * 0.7, z: -s * 0.4, isFront: true },
    { x: -s * 0.5, z: s * 0.45, isFront: false },
    { x: -s * 0.5, z: -s * 0.45, isFront: false }
  ];

  legPositions.forEach((pos, idx) => {
    const legGroup = new THREE.Group();
    legGroup.position.set(pos.x, s * 0.55, pos.z);

    // Upper leg (thigh)
    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(s * 0.14, s * 0.16, s * 0.5, 8),
      scaleMaterial
    );
    thigh.position.y = -s * 0.1;
    thigh.rotation.x = pos.isFront ? 0.2 : -0.15;
    thigh.castShadow = true;
    legGroup.add(thigh);

    // Lower leg
    const shin = new THREE.Mesh(
      new THREE.CylinderGeometry(s * 0.1, s * 0.08, s * 0.4, 6),
      scaleMaterial
    );
    shin.position.set(0, -s * 0.4, pos.isFront ? s * 0.05 : -s * 0.04);
    shin.castShadow = true;
    legGroup.add(shin);

    // Foot
    const foot = new THREE.Mesh(
      new THREE.SphereGeometry(s * 0.12, 8, 6),
      scaleMaterial
    );
    foot.scale.set(1.3, 0.6, 1.0);
    foot.position.set(0, -s * 0.55, pos.isFront ? s * 0.06 : -s * 0.05);
    foot.castShadow = true;
    legGroup.add(foot);

    // Claws (3 per foot)
    for (let c = -1; c <= 1; c++) {
      const claw = new THREE.Mesh(
        new THREE.ConeGeometry(s * 0.03, s * 0.12, 5),
        hornMaterial
      );
      claw.position.set(
        c * s * 0.06,
        -s * 0.62,
        (pos.isFront ? s * 0.1 : -s * 0.09) + c * s * 0.02
      );
      claw.rotation.x = Math.PI + (pos.isFront ? 0.5 : -0.4);
      legGroup.add(claw);
    }

    legs.push(legGroup);
    dragon.add(legGroup);
  });

  // === WINGS (smooth membrane style) ===
  function createWing(side) {
    const wing = new THREE.Group();
    const zSign = side === 'left' ? 1 : -1;
    const w = 2.2; // Wing scale multiplier for bigger wings
    
    // Wing attaches to shoulder
    wing.position.set(s * 0.2, s * 1.1, zSign * s * 0.45);

    // Main wing membrane - elegant curved shape
    const membraneShape = new THREE.Shape();
    membraneShape.moveTo(0, 0);
    // Leading edge curves up and out
    membraneShape.quadraticCurveTo(s * 1.2 * w, s * 0.4 * w, s * 2.8 * w, s * 0.8 * w);
    // Wing tip curves
    membraneShape.quadraticCurveTo(s * 3.4 * w, s * 1.2 * w, s * 3.0 * w, s * 2.0 * w);
    // Trailing edge sweeps back
    membraneShape.quadraticCurveTo(s * 2.0 * w, s * 2.2 * w, s * 0.8 * w, s * 1.8 * w);
    membraneShape.quadraticCurveTo(s * 0.1 * w, s * 1.4 * w, -s * 0.5 * w, s * 0.7 * w);
    // Back to body
    membraneShape.quadraticCurveTo(-s * 0.3 * w, s * 0.3 * w, 0, 0);
    
    const membraneGeo = new THREE.ShapeGeometry(membraneShape);
    const membrane = new THREE.Mesh(membraneGeo, wingMembraneMat);
    membrane.rotation.set(0, zSign * Math.PI / 2, 0);
    membrane.position.set(0, 0, zSign * s * 0.1);
    membrane.castShadow = true;
    wing.add(membrane);

    // Leading edge ridge (thickened front of wing)
    const ridgeShape = new THREE.Shape();
    ridgeShape.moveTo(0, 0);
    ridgeShape.quadraticCurveTo(s * 1.2 * w, s * 0.35 * w, s * 2.6 * w, s * 0.75 * w);
    ridgeShape.lineTo(s * 2.5 * w, s * 0.9 * w);
    ridgeShape.quadraticCurveTo(s * 1.1 * w, s * 0.5 * w, 0, s * 0.15);
    ridgeShape.lineTo(0, 0);
    
    const ridgeGeo = new THREE.ShapeGeometry(ridgeShape);
    const ridge = new THREE.Mesh(ridgeGeo, scaleMaterial);
    ridge.rotation.set(0, zSign * Math.PI / 2, 0);
    ridge.position.set(0.02, 0.02, zSign * s * 0.12);
    ridge.castShadow = true;
    wing.add(ridge);

    return wing;
  }

  const leftWing = createWing('left');
  const rightWing = createWing('right');
  dragon.add(leftWing, rightWing);

  // Position dragon in world
  dragon.position.set(x, 0, z);
  
  dragon.userData = {
    type: 'dragon',
    removable: true,
    isAnimal: true,
    isFriendly: true,
    legs,
    wings: [leftWing, rightWing],
    tailSegments,
    moveSpeed: config.moveSpeed,
    flySpeed: config.flySpeed,
    wanderRadius: config.wanderRadius,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    nextFlightCheck: 0,
    flightEndTime: 0,
    isFlying: false,
    targetAltitude: 0,
    groundHeight: s * 0.6,
    flapSpeed: config.flapSpeed
  };
  
  worldAnimals.push(dragon);
  interactableObjects.add(dragon);
  
  return dragon;
}

/**
 * Creates initial animals in the world
 * @param {THREE.Scene} scene - The Three.js scene
 */
function createInitialAnimals(scene) {
  // Create a variety of animals
  for (let i = 0; i < CONFIG.world.animalCount; i++) {
    const x = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    const z = (Math.random() - 0.5) * CONFIG.world.size * 0.7;
    
    const type = Math.random();
    
    if (type < 0.25) {
      const cow = createCow(x, z);
      scene.add(cow);
    } else if (type < 0.5) {
      const pig = createPig(x, z);
      scene.add(pig);
    } else if (type < 0.85) {
      const horse = createHorse(x, z);
      scene.add(horse);
    } else {
      const dragon = createDragon(x, z);
      scene.add(dragon);
    }
  }
}


// ===== Module: interiorObjects.js =====
/**
 * Interior Objects Module
 * 
 * Handles creation and management of indoor furniture (chairs, tables, couches, TVs, beds)
 */


/**
 * Creates a chair at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created chair object
 */
function createChair(x = 0, z = 0) {
  const chair = new THREE.Group();
  const config = CONFIG.interior.furniture.chair;
  
  // Seat
  const seatGeometry = new THREE.BoxGeometry(config.width, 0.05, config.depth);
  const seatMaterial = new THREE.MeshStandardMaterial({ 
    color: config.seatColor,
    roughness: 0.7
  });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = config.height / 2;
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);
  
  // Backrest
  const backGeometry = new THREE.BoxGeometry(config.width, config.height / 2, 0.05);
  const backrest = new THREE.Mesh(backGeometry, seatMaterial);
  backrest.position.set(0, config.height * 0.75, -config.depth / 2 + 0.025);
  backrest.castShadow = true;
  chair.add(backrest);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.02, 0.02, config.height / 2);
  const legMaterial = new THREE.MeshStandardMaterial({ 
    color: config.legColor,
    roughness: 0.8
  });
  
  const legPositions = [
    { x: config.width / 2 - 0.05, z: config.depth / 2 - 0.05 },
    { x: -config.width / 2 + 0.05, z: config.depth / 2 - 0.05 },
    { x: config.width / 2 - 0.05, z: -config.depth / 2 + 0.05 },
    { x: -config.width / 2 + 0.05, z: -config.depth / 2 + 0.05 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, config.height / 4, pos.z);
    leg.castShadow = true;
    chair.add(leg);
  });
  
  chair.position.set(x, 0, z);
  chair.userData = { type: 'chair', removable: true };
  
  // Add to scene/group but don't add to interiorObjects array yet
  // The interior.js module will handle tracking after adding to the group
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(chair);
  } else {
    interactableObjects.add(chair);
    interiorObjects.push(chair); // Only add to array if not in interior group
  }
  
  return chair;
}

/**
 * Creates a table at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created table object
 */
function createTable(x = 0, z = 0) {
  const table = new THREE.Group();
  const config = CONFIG.interior.furniture.table;
  
  // Tabletop
  const topGeometry = new THREE.BoxGeometry(config.width, 0.1, config.depth);
  const topMaterial = new THREE.MeshStandardMaterial({ 
    color: config.topColor,
    roughness: 0.6
  });
  const tabletop = new THREE.Mesh(topGeometry, topMaterial);
  tabletop.position.y = config.height;
  tabletop.castShadow = true;
  tabletop.receiveShadow = true;
  table.add(tabletop);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, config.height);
  const legMaterial = new THREE.MeshStandardMaterial({ 
    color: config.legColor,
    roughness: 0.8
  });
  
  const legPositions = [
    { x: config.width / 2 - 0.1, z: config.depth / 2 - 0.1 },
    { x: -config.width / 2 + 0.1, z: config.depth / 2 - 0.1 },
    { x: config.width / 2 - 0.1, z: -config.depth / 2 + 0.1 },
    { x: -config.width / 2 + 0.1, z: -config.depth / 2 + 0.1 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos.x, config.height / 2, pos.z);
    leg.castShadow = true;
    table.add(leg);
  });
  
  table.position.set(x, 0, z);
  table.userData = { type: 'table', removable: true };
  
  // Add to scene/group but don't add to interiorObjects array yet
  // The interior.js module will handle tracking after adding to the group
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(table);
  } else {
    interactableObjects.add(table);
    interiorObjects.push(table); // Only add to array if not in interior group
  }
  
  return table;
}

/**
 * Creates a couch at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created couch object
 */
function createCouch(x = 0, z = 0) {
  const couch = new THREE.Group();
  const config = CONFIG.interior.furniture.couch;
  
  // Base
  const baseGeometry = new THREE.BoxGeometry(config.length, config.height / 2, config.width);
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: config.mainColor,
    roughness: 0.8
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = config.height / 4;
  base.castShadow = true;
  base.receiveShadow = true;
  couch.add(base);
  
  // Backrest
  const backGeometry = new THREE.BoxGeometry(config.length, config.height / 2, 0.2);
  const backrest = new THREE.Mesh(backGeometry, baseMaterial);
  backrest.position.set(0, config.height / 2, -config.width / 2 + 0.1);
  backrest.castShadow = true;
  couch.add(backrest);
  
  // Armrests
  const armGeometry = new THREE.BoxGeometry(0.2, config.height * 0.6, config.width);
  const armrest1 = new THREE.Mesh(armGeometry, baseMaterial);
  armrest1.position.set(config.length / 2 - 0.1, config.height * 0.3, 0);
  armrest1.castShadow = true;
  couch.add(armrest1);
  
  const armrest2 = new THREE.Mesh(armGeometry, baseMaterial);
  armrest2.position.set(-config.length / 2 + 0.1, config.height * 0.3, 0);
  armrest2.castShadow = true;
  couch.add(armrest2);
  
  // Cushions
  const cushionGeometry = new THREE.BoxGeometry(config.length / 3 - 0.1, 0.1, config.width - 0.2);
  const cushionMaterial = new THREE.MeshStandardMaterial({ 
    color: config.cushionColor,
    roughness: 0.9
  });
  
  for (let i = 0; i < 3; i++) {
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.position.set(
      (i - 1) * (config.length / 3),
      config.height / 2 + 0.05,
      0
    );
    couch.add(cushion);
  }
  
  couch.position.set(x, 0, z);
  couch.userData = { type: 'couch', removable: true };
  
  // Add to scene/group but don't add to interiorObjects array yet
  // The interior.js module will handle tracking after adding to the group
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(couch);
  } else {
    interactableObjects.add(couch);
    interiorObjects.push(couch); // Only add to array if not in interior group
  }
  
  return couch;
}

/**
 * Creates a TV at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created TV object
 */
function createTV(x = 0, z = 0) {
  const tv = new THREE.Group();
  const config = CONFIG.interior.furniture.tv;
  
  // Stand
  const standGeometry = new THREE.BoxGeometry(config.width * 0.8, 0.1, config.depth * 2);
  const standMaterial = new THREE.MeshStandardMaterial({ 
    color: config.standColor,
    roughness: 0.7
  });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.position.y = 0.5;
  stand.castShadow = true;
  stand.receiveShadow = true;
  tv.add(stand);
  
  // Support pole
  const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
  const pole = new THREE.Mesh(poleGeometry, standMaterial);
  pole.position.y = 0.75;
  pole.castShadow = true;
  tv.add(pole);
  
  // Screen frame
  const frameGeometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
  const frameMaterial = new THREE.MeshStandardMaterial({ 
    color: config.frameColor,
    roughness: 0.3
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.y = 1 + config.height / 2;
  frame.castShadow = true;
  tv.add(frame);
  
  // Screen
  const screenGeometry = new THREE.BoxGeometry(config.width * 0.95, config.height * 0.9, 0.01);
  const screenMaterial = new THREE.MeshStandardMaterial({ 
    color: config.screenColor,
    roughness: 0.2,
    metalness: 0.5
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 1 + config.height / 2, config.depth / 2);
  tv.add(screen);
  
  tv.position.set(x, 0, z);
  tv.userData = { type: 'tv', removable: true };
  
  // Add to scene/group but don't add to interiorObjects array yet
  // The interior.js module will handle tracking after adding to the group
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(tv);
  } else {
    interactableObjects.add(tv);
    interiorObjects.push(tv); // Only add to array if not in interior group
  }
  
  return tv;
}

/**
 * Creates a bed at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created bed object
 */
function createBed(x = 0, z = 0) {
  const bed = new THREE.Group();
  const config = CONFIG.interior.furniture.bed;
  
  // Frame
  const frameGeometry = new THREE.BoxGeometry(config.width, config.height / 2, config.length);
  const frameMaterial = new THREE.MeshStandardMaterial({ 
    color: config.frameColor,
    roughness: 0.8
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.y = config.height / 4;
  frame.castShadow = true;
  frame.receiveShadow = true;
  bed.add(frame);
  
  // Mattress
  const mattressGeometry = new THREE.BoxGeometry(config.width - 0.1, 0.2, config.length - 0.1);
  const mattressMaterial = new THREE.MeshStandardMaterial({ 
    color: config.mattressColor,
    roughness: 0.9
  });
  const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
  mattress.position.y = config.height / 2 + 0.1;
  mattress.castShadow = true;
  mattress.receiveShadow = true;
  bed.add(mattress);
  
  // Headboard
  const headboardGeometry = new THREE.BoxGeometry(config.width, config.height, 0.1);
  const headboard = new THREE.Mesh(headboardGeometry, frameMaterial);
  headboard.position.set(0, config.height / 2, -config.length / 2 + 0.05);
  headboard.castShadow = true;
  bed.add(headboard);
  
  // Pillows
  const pillowGeometry = new THREE.BoxGeometry(config.width / 3, 0.1, 0.3);
  const pillowMaterial = new THREE.MeshStandardMaterial({ 
    color: config.pillowColor,
    roughness: 0.9
  });
  
  const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial);
  pillow1.position.set(-config.width / 4, config.height / 2 + 0.25, -config.length / 2 + 0.3);
  bed.add(pillow1);
  
  const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial);
  pillow2.position.set(config.width / 4, config.height / 2 + 0.25, -config.length / 2 + 0.3);
  bed.add(pillow2);
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, config.height / 2);
  const legPositions = [
    { x: config.width / 2 - 0.1, z: config.length / 2 - 0.1 },
    { x: -config.width / 2 + 0.1, z: config.length / 2 - 0.1 },
    { x: config.width / 2 - 0.1, z: -config.length / 2 + 0.1 },
    { x: -config.width / 2 + 0.1, z: -config.length / 2 + 0.1 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, frameMaterial);
    leg.position.set(pos.x, config.height / 4, pos.z);
    leg.castShadow = true;
    bed.add(leg);
  });
  
  bed.position.set(x, 0, z);
  bed.userData = { type: 'bed', removable: true };
  
  // Add to scene/group but don't add to interiorObjects array yet
  // The interior.js module will handle tracking after adding to the group
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(bed);
  } else {
    interactableObjects.add(bed);
    interiorObjects.push(bed); // Only add to array if not in interior group
  }
  
  return bed;
}

/**
 * Adds default furniture to the interior room
 * Positions are scaled based on room dimensions
 * @param {number} roomWidth - Width of the interior room (optional, falls back to CONFIG)
 * @param {number} roomDepth - Depth of the interior room (optional, falls back to CONFIG)
 */
function addFurnitureToInterior(roomWidth = null, roomDepth = null) {
  // Use provided dimensions or fall back to CONFIG
  const width = roomWidth || CONFIG.interior.roomSize;
  const depth = roomDepth || CONFIG.interior.roomSize;
  
  // Add some chairs near the front (positive Z)
  const chair1 = createChair(-width / 4, depth / 4);
  chair1.rotation.y = Math.PI / 4;
  
  const chair2 = createChair(width / 4, depth / 4);
  chair2.rotation.y = -Math.PI / 4;
  
  // Add a table between the chairs
  createTable(0, depth / 4);
  
  // Add a couch facing the back wall
  const couch = createCouch(0, -depth / 3);
  couch.rotation.y = Math.PI;
  
  // Add a TV against the back wall
  createTV(0, -depth / 2 + 1);
  
  // Add a bed on the side
  const bed = createBed(width / 3, 0);
  bed.rotation.y = Math.PI / 2;
}


// ===== Module: interiorAnimals.js =====
/**
 * Interior Animals Module
 * 
 * Handles creation and management of indoor animals (cats, dogs)
 */


/**
 * Creates a cat at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created cat object
 */
function createCat(x, z) {
  const cat = new THREE.Group();
  const size = CONFIG.objects.cat.size;
  
  // Body - sleek and elongated
  const bodyGeometry = new THREE.BoxGeometry(size * 1.0, size * 0.3, size * 0.3);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cat.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.3;
  body.castShadow = true;
  body.receiveShadow = true;
  cat.add(body);
  
  // Head - smaller and rounded
  const headGeometry = new THREE.BoxGeometry(size * 0.35, size * 0.3, size * 0.3);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.5, size * 0.35, 0);
  head.castShadow = true;
  cat.add(head);
  
  // Ears - triangular
  const earGeometry = new THREE.ConeGeometry(size * 0.08, size * 0.12, 4);
  const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear1.position.set(size * 0.45, size * 0.6, size * 0.15);
  cat.add(ear1);
  
  const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
  ear2.position.set(size * 0.45, size * 0.6, -size * 0.15);
  cat.add(ear2);
  
  // Eyes - glowing green
  const eyeGeometry = new THREE.SphereGeometry(size * 0.05, 4, 4);
  const eyeMaterial = new THREE.MeshStandardMaterial({ 
    color: CONFIG.objects.cat.eyeColor,
    emissive: CONFIG.objects.cat.eyeColor,
    emissiveIntensity: 0.5
  });
  const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye1.position.set(size * 0.65, size * 0.4, size * 0.1);
  cat.add(eye1);
  
  const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eye2.position.set(size * 0.65, size * 0.4, -size * 0.1);
  cat.add(eye2);
  
  // Tail - curved cylinder
  const tailGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.08, size * 0.8, 4);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.5, size * 0.4, 0);
  tail.rotation.z = -Math.PI / 4;
  tail.castShadow = true;
  cat.add(tail);
  
  // Legs - simple cylinders
  const legGeometry = new THREE.CylinderGeometry(size * 0.05, size * 0.05, size * 0.3);
  const legs = [];
  const legPositions = [
    { x: size * 0.3, z: size * 0.15 },
    { x: size * 0.3, z: -size * 0.15 },
    { x: -size * 0.3, z: size * 0.15 },
    { x: -size * 0.3, z: -size * 0.15 }
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.15, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    cat.add(leg);
  });
  
  cat.position.set(x, 0, z);
  cat.userData = {
    type: 'cat',
    removable: true,
    isAnimal: true,
    legs: legs,
    tail: tail,
    moveSpeed: CONFIG.objects.cat.moveSpeed || 2,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    wanderRadius: 5
  };

  // Add to scene and track in interiorAnimals array for animation
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(cat);
    interiorAnimals.push(cat); // Add to array so it gets animated
  } else {
    interactableObjects.add(cat);
    interiorAnimals.push(cat);
  }

  return cat;
}

/**
 * Creates a dog at the specified position
 * @param {number} x - X coordinate
 * @param {number} z - Z coordinate
 * @returns {THREE.Group} The created dog object
 */
function createDog(x, z) {
  const dog = new THREE.Group();
  const size = CONFIG.objects.dog.size;

  // Body - using cylinder (CapsuleGeometry not available in Three.js r128)
  const bodyGeometry = new THREE.CylinderGeometry(size * 0.25, size * 0.25, size * 0.9, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.objects.dog.bodyColor,
    roughness: 0.8
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = size * 0.45;
  body.rotation.z = Math.PI / 2; // Rotate to horizontal
  body.castShadow = true;
  body.receiveShadow = true;
  dog.add(body);

  // Head - rounded using sphere
  const headGeometry = new THREE.SphereGeometry(size * 0.25, 12, 12);
  const head = new THREE.Mesh(headGeometry, bodyMaterial);
  head.position.set(size * 0.65, size * 0.5, 0);
  head.scale.set(1.1, 1, 1); // Slightly elongated forward
  head.castShadow = true;
  dog.add(head);

  // Snout - rounded cone for more realistic muzzle
  const snoutGeometry = new THREE.ConeGeometry(size * 0.12, size * 0.3, 8);
  const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
  snout.position.set(size * 0.88, size * 0.42, 0);
  snout.rotation.z = -Math.PI / 2; // Point forward
  snout.castShadow = true;
  dog.add(snout);

  // Nose - black sphere at tip of snout
  const noseGeometry = new THREE.SphereGeometry(size * 0.06, 6, 6);
  const noseMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.4
  });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(size * 1.03, size * 0.42, 0);
  dog.add(nose);

  // Ears - floppy using flattened boxes
  const earGeometry = new THREE.BoxGeometry(size * 0.12, size * 0.25, size * 0.04);
  const earMaterial = new THREE.MeshStandardMaterial({
    color: CONFIG.objects.dog.earColor,
    roughness: 0.9
  });
  const ear1 = new THREE.Mesh(earGeometry, earMaterial);
  ear1.position.set(size * 0.55, size * 0.62, size * 0.2);
  ear1.rotation.set(0.2, 0, 0.4); // Angled down and out
  ear1.castShadow = true;
  dog.add(ear1);

  const ear2 = new THREE.Mesh(earGeometry, earMaterial);
  ear2.position.set(size * 0.55, size * 0.62, -size * 0.2);
  ear2.rotation.set(0.2, 0, -0.4); // Angled down and out
  ear2.castShadow = true;
  dog.add(ear2);

  // Eyes - white sclera with dark pupils
  const eyeWhiteGeometry = new THREE.SphereGeometry(size * 0.09, 8, 8);
  const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.6
  });
  const eyeWhite1 = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
  eyeWhite1.position.set(size * 0.78, size * 0.56, size * 0.15);
  eyeWhite1.scale.set(1, 1, 0.6); // Flatten slightly
  dog.add(eyeWhite1);

  const eyeWhite2 = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
  eyeWhite2.position.set(size * 0.78, size * 0.56, -size * 0.15);
  eyeWhite2.scale.set(1, 1, 0.6); // Flatten slightly
  dog.add(eyeWhite2);

  // Pupils - dark brown/black
  const pupilGeometry = new THREE.SphereGeometry(size * 0.05, 6, 6);
  const pupilMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a0f00,
    roughness: 0.2
  });
  const pupil1 = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupil1.position.set(size * 0.83, size * 0.56, size * 0.15);
  dog.add(pupil1);

  const pupil2 = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupil2.position.set(size * 0.83, size * 0.56, -size * 0.15);
  dog.add(pupil2);
  
  // Tail - wagging, more tapered
  const tailGeometry = new THREE.ConeGeometry(size * 0.06, size * 0.5, 6);
  const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
  tail.position.set(-size * 0.55, size * 0.55, 0);
  tail.rotation.set(0, 0, -Math.PI / 2.5); // Angle upward
  tail.castShadow = true;
  dog.add(tail);

  // Store tail reference for wagging animation
  dog.userData.tail = tail;

  // Legs - using cylinders (CapsuleGeometry not available in Three.js r128)
  const legGeometry = new THREE.CylinderGeometry(size * 0.055, size * 0.055, size * 0.25, 8);
  const legs = [];
  const legPositions = [
    { x: size * 0.35, z: size * 0.18 },
    { x: size * 0.35, z: -size * 0.18 },
    { x: -size * 0.3, z: size * 0.18 },
    { x: -size * 0.3, z: -size * 0.18 }
  ];

  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, bodyMaterial);
    leg.position.set(pos.x, size * 0.2, pos.z);
    leg.castShadow = true;
    legs.push(leg);
    dog.add(leg);
  });
  
  dog.position.set(x, 0, z);
  dog.userData = {
    type: 'dog',
    removable: true,
    isAnimal: true,
    legs: legs,
    moveSpeed: CONFIG.objects.dog.moveSpeed || 3,
    targetPosition: new THREE.Vector3(x, 0, z),
    initialPosition: new THREE.Vector3(x, 0, z),
    nextMoveTime: 0,
    wanderRadius: 6,
    tail: tail
  };

  // Add to scene and track in interiorAnimals array for animation
  if (worldState.interiorGroup) {
    worldState.interiorGroup.add(dog);
    interiorAnimals.push(dog); // Add to array so it gets animated
  } else {
    interactableObjects.add(dog);
    interiorAnimals.push(dog);
  }

  return dog;
}


// ===== Module: world.js =====
/**
 * World creation and environment functions
 */


/**
 * Create the game world environment
 */
function createWorld() {
  // Create ground plane with procedural variation
  const groundGeometry = new THREE.PlaneGeometry(
    CONFIG.world.groundSize, 
    CONFIG.world.groundSize, 
    100, 
    100
  );
  
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3a7d3a,
    roughness: 0.8,
    metalness: 0.2
  });
  
  // Add subtle height variation for natural terrain
  const vertices = groundGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    vertices[i + 2] = Math.random() * 0.2 - 0.1;
  }
  groundGeometry.computeVertexNormals();
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  ground.name = 'ground';
  scene.add(ground);
  
  // Add grid helper for spatial reference
  const gridHelper = new THREE.GridHelper(
    CONFIG.world.size, 
    CONFIG.world.gridDivisions, 
    0x444444, 
    0x222222
  );
  gridHelper.name = 'gridHelper';
  scene.add(gridHelper);
  
  // Create sky dome
  const skyGeometry = new THREE.SphereGeometry(CONFIG.world.fogFar, 32, 16);
  const skyMaterial = new THREE.MeshBasicMaterial({
    color: 0x87CEEB,
    side: THREE.BackSide
  });
  const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
  skyMesh.name = 'sky';
  scene.add(skyMesh);
  setSkyMesh(skyMesh);
  
  // Initialize interactable objects group
  const interactableObjects = new THREE.Group();
  interactableObjects.name = 'interactableObjects';
  scene.add(interactableObjects);
  setInteractableObjects(interactableObjects);
}

/**
 * Create lighting for the scene
 */
function createLighting() {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  setAmbientLight(ambientLight);
  
  // Sun light
  const sunLight = new THREE.DirectionalLight(0xffffff, 1);
  sunLight.position.set(50, 100, 50);
  sunLight.castShadow = true;
  sunLight.shadow.camera.left = -50;
  sunLight.shadow.camera.right = 50;
  sunLight.shadow.camera.top = 50;
  sunLight.shadow.camera.bottom = -50;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 200;
  sunLight.shadow.mapSize.width = CONFIG.renderer.shadowMapSize;
  sunLight.shadow.mapSize.height = CONFIG.renderer.shadowMapSize;
  scene.add(sunLight);
  setSunLight(sunLight);
  
  // Moon light (initially disabled)
  const moonLight = new THREE.DirectionalLight(0x6666ff, 0.3);
  moonLight.position.set(-50, 100, -50);
  moonLight.castShadow = true;
  moonLight.shadow.camera.left = -50;
  moonLight.shadow.camera.right = 50;
  moonLight.shadow.camera.top = 50;
  moonLight.shadow.camera.bottom = -50;
  moonLight.shadow.camera.near = 0.1;
  moonLight.shadow.camera.far = 200;
  moonLight.shadow.mapSize.width = CONFIG.renderer.shadowMapSize;
  moonLight.shadow.mapSize.height = CONFIG.renderer.shadowMapSize;
  moonLight.visible = false;
  scene.add(moonLight);
  setMoonLight(moonLight);
  
  // Create sun mesh
  const sunGeometry = new THREE.SphereGeometry(10, 32, 16);
  const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffff00
  });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sunMesh);
  setSunMesh(sunMesh);
  
  // Create moon mesh
  const moonGeometry = new THREE.SphereGeometry(8, 32, 16);
  const moonMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xcccccc
  });
  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moonMesh.visible = false;
  scene.add(moonMesh);
  setMoonMesh(moonMesh);
}


// ===== Module: interior.js =====
/**
 * Interior World System
 * 
 * Creates dynamic interior rooms that match the exterior house style.
 * Each house has its own unique interior based on its dimensions and colors.
 */


/**
 * Computes interior room properties from a house style
 * Interior is slightly larger than exterior to feel spacious
 * @param {Object} houseStyle - The house style object from houseGenerator
 * @returns {Object} Interior properties (dimensions and colors)
 */
function computeInteriorFromStyle(houseStyle) {
  const palettes = CONFIG.house.palettes;
  
  // Interior is scaled up from house exterior (feels bigger inside)
  const interiorScale = 1.6;
  const roomWidth = houseStyle.width * interiorScale;
  const roomDepth = houseStyle.depth * interiorScale;
  const roomHeight = Math.max(2.8, houseStyle.height * 0.85); // Min 2.8m ceiling
  
  // Derive interior colors from house palette
  const exteriorWallColor = palettes.walls[houseStyle.wallColorIndex];
  const doorColor = palettes.doors[houseStyle.doorColorIndex];
  const trimColor = palettes.trim[houseStyle.trimColorIndex];
  
  // Make interior walls lighter/warmer than exterior
  const interiorWallColor = lightenColor(exteriorWallColor, 0.15);
  // Floor uses a wood tone based on trim color
  const floorColor = darkenColor(trimColor, 0.3);
  
  return {
    roomWidth,
    roomDepth,
    roomHeight,
    wallColor: interiorWallColor,
    floorColor,
    ceilingColor: 0xFFFFF8, // Warm white ceiling
    doorColor,
    trimColor
  };
}

/**
 * Lightens a hex color by a percentage
 * @param {number} color - Hex color value
 * @param {number} percent - Amount to lighten (0-1)
 * @returns {number} Lightened hex color
 */
function lightenColor(color, percent) {
  const r = Math.min(255, ((color >> 16) & 0xFF) + Math.floor(255 * percent));
  const g = Math.min(255, ((color >> 8) & 0xFF) + Math.floor(255 * percent));
  const b = Math.min(255, (color & 0xFF) + Math.floor(255 * percent));
  return (r << 16) | (g << 8) | b;
}

/**
 * Darkens a hex color by a percentage
 * @param {number} color - Hex color value
 * @param {number} percent - Amount to darken (0-1)
 * @returns {number} Darkened hex color
 */
function darkenColor(color, percent) {
  const r = Math.max(0, Math.floor(((color >> 16) & 0xFF) * (1 - percent)));
  const g = Math.max(0, Math.floor(((color >> 8) & 0xFF) * (1 - percent)));
  const b = Math.max(0, Math.floor((color & 0xFF) * (1 - percent)));
  return (r << 16) | (g << 8) | b;
}

/**
 * Creates an interior room environment matching the house style
 * @param {THREE.Object3D} house - The house object being entered
 * @param {boolean} skipFurniture - Whether to skip adding default furniture
 */
function createInterior(house, skipFurniture = false) {
  // Create interior group
  worldState.interiorGroup = new THREE.Group();
  worldState.interiorGroup.name = 'interior';
  
  // Get house style and compute interior properties
  const houseStyle = house.userData.style;
  let interior;
  
  if (houseStyle) {
    // Dynamic interior based on house style
    interior = computeInteriorFromStyle(houseStyle);
  } else {
    // Fallback to default CONFIG values for old houses
    interior = {
      roomWidth: CONFIG.interior.roomSize,
      roomDepth: CONFIG.interior.roomSize,
      roomHeight: CONFIG.interior.ceilingHeight,
      wallColor: CONFIG.interior.wallColor,
      floorColor: CONFIG.interior.floorColor,
      ceilingColor: CONFIG.interior.ceilingColor,
      doorColor: CONFIG.objects.house.doorColor,
      trimColor: 0x8B4513
    };
  }
  
  // Store interior dimensions in worldState for furniture placement bounds
  worldState.currentInterior = interior;
  
  const { roomWidth, roomDepth, roomHeight, wallColor, floorColor, ceilingColor, doorColor, trimColor } = interior;
  
  // Floor
  const floorGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomDepth);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: floorColor,
    roughness: 0.8
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  worldState.interiorGroup.add(floor);
  
  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: wallColor,
    roughness: 0.9
  });
  
  // Back wall
  const backWallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, 0.2);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
  backWall.receiveShadow = true;
  worldState.interiorGroup.add(backWall);
  
  // Left wall
  const sideWallGeometry = new THREE.BoxGeometry(0.2, roomHeight, roomDepth);
  const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
  leftWall.receiveShadow = true;
  worldState.interiorGroup.add(leftWall);
  
  // Right wall
  const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
  rightWall.receiveShadow = true;
  worldState.interiorGroup.add(rightWall);
  
  // Front wall with door opening (door width is ~2m)
  const doorWidth = 2;
  const frontWallSideWidth = (roomWidth - doorWidth) / 2;
  
  const frontWallLeftGeometry = new THREE.BoxGeometry(frontWallSideWidth, roomHeight, 0.2);
  const frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, wallMaterial);
  frontWallLeft.position.set(-roomWidth / 2 + frontWallSideWidth / 2, roomHeight / 2, roomDepth / 2);
  frontWallLeft.receiveShadow = true;
  worldState.interiorGroup.add(frontWallLeft);
  
  const frontWallRightGeometry = new THREE.BoxGeometry(frontWallSideWidth, roomHeight, 0.2);
  const frontWallRight = new THREE.Mesh(frontWallRightGeometry, wallMaterial);
  frontWallRight.position.set(roomWidth / 2 - frontWallSideWidth / 2, roomHeight / 2, roomDepth / 2);
  frontWallRight.receiveShadow = true;
  worldState.interiorGroup.add(frontWallRight);
  
  // Top of door frame
  const doorFrameHeight = roomHeight - 2.2;
  const doorFrameTopGeometry = new THREE.BoxGeometry(doorWidth, doorFrameHeight, 0.2);
  const doorFrameTop = new THREE.Mesh(doorFrameTopGeometry, wallMaterial);
  doorFrameTop.position.set(0, roomHeight - doorFrameHeight / 2, roomDepth / 2);
  doorFrameTop.receiveShadow = true;
  worldState.interiorGroup.add(doorFrameTop);
  
  // Ceiling
  const ceilingGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomDepth);
  const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: ceilingColor,
    roughness: 1
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.position.y = roomHeight;
  ceiling.receiveShadow = true;
  worldState.interiorGroup.add(ceiling);
  
  // Baseboard trim around the room
  addBaseboards(worldState.interiorGroup, roomWidth, roomDepth, trimColor);
  
  // Exit door (interactive)
  const exitDoorGeometry = new THREE.BoxGeometry(1.8, 2.2, 0.15);
  const exitDoorMaterial = new THREE.MeshStandardMaterial({ color: doorColor });
  const exitDoor = new THREE.Mesh(exitDoorGeometry, exitDoorMaterial);
  exitDoor.position.set(0, 1.1, roomDepth / 2 - 0.1);
  exitDoor.userData = {
    type: 'door',
    isInteractive: true,
    isExitDoor: true,
    originalMaterial: exitDoorMaterial
  };
  exitDoor.name = 'exitDoor';
  worldState.interiorGroup.add(exitDoor);
  
  // Interior lighting - scale light range with room size
  const lightRange = Math.max(roomWidth, roomDepth) * 1.5;
  const interiorLight = new THREE.PointLight(0xFFFAF0, 0.9, lightRange);
  interiorLight.position.set(0, roomHeight - 0.3, 0);
  interiorLight.castShadow = true;
  interiorLight.shadow.mapSize.width = 1024;
  interiorLight.shadow.mapSize.height = 1024;
  worldState.interiorGroup.add(interiorLight);
  
  // Add a subtle fill light for ambiance
  const fillLight = new THREE.PointLight(0xFFE4C4, 0.3, lightRange * 0.8);
  fillLight.position.set(0, roomHeight * 0.5, -roomDepth * 0.3);
  worldState.interiorGroup.add(fillLight);
  
  // Add furniture only if not loading saved interior
  if (!skipFurniture) {
    addFurnitureToInterior(roomWidth, roomDepth);
    
    // Add some interior animals in positions scaled to room
    createCat(-roomWidth / 3, -roomDepth / 4);
    createDog(roomWidth / 4, -roomDepth / 4);
  }
  
  // Add the interior to the scene
  scene.add(worldState.interiorGroup);
  
  // Only collect objects if we added default furniture (not when loading saved interior)
  if (!skipFurniture) {
    // Clear the arrays first to avoid duplicates
    interiorObjects.length = 0;
    interiorAnimals.length = 0;
    
    // Store interior objects for cleanup
    worldState.interiorGroup.traverse(child => {
      if (child.userData && child.userData.type) {
        // Add furniture objects
        if (['chair', 'table', 'couch', 'tv', 'bed'].includes(child.userData.type)) {
          interiorObjects.push(child);
        }
        // Add animal objects
        else if (['cat', 'dog'].includes(child.userData.type)) {
          interiorAnimals.push(child);
        }
      }
    });
  }
}

/**
 * Adds baseboard trim around the interior walls
 * @param {THREE.Group} group - Interior group to add to
 * @param {number} roomWidth - Room width
 * @param {number} roomDepth - Room depth
 * @param {number} trimColor - Color for baseboards
 */
function addBaseboards(group, roomWidth, roomDepth, trimColor) {
  const baseboardHeight = 0.12;
  const baseboardDepth = 0.04;
  const baseboardMaterial = new THREE.MeshStandardMaterial({ 
    color: trimColor,
    roughness: 0.6
  });
  
  // Back baseboard
  const backBoard = new THREE.Mesh(
    new THREE.BoxGeometry(roomWidth, baseboardHeight, baseboardDepth),
    baseboardMaterial
  );
  backBoard.position.set(0, baseboardHeight / 2, -roomDepth / 2 + baseboardDepth / 2);
  group.add(backBoard);
  
  // Left baseboard
  const leftBoard = new THREE.Mesh(
    new THREE.BoxGeometry(baseboardDepth, baseboardHeight, roomDepth),
    baseboardMaterial
  );
  leftBoard.position.set(-roomWidth / 2 + baseboardDepth / 2, baseboardHeight / 2, 0);
  group.add(leftBoard);
  
  // Right baseboard
  const rightBoard = new THREE.Mesh(
    new THREE.BoxGeometry(baseboardDepth, baseboardHeight, roomDepth),
    baseboardMaterial
  );
  rightBoard.position.set(roomWidth / 2 - baseboardDepth / 2, baseboardHeight / 2, 0);
  group.add(rightBoard);
}


/**
 * Removes the interior and restores the outside world
 */
function removeInterior() {
  if (worldState.interiorGroup) {
    // Remove all interior objects
    interiorObjects.forEach(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(mat => mat.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    
    scene.remove(worldState.interiorGroup);
    worldState.interiorGroup = null;
    interiorObjects.length = 0; // Clear the array
    
    // Also dispose and clear interior animals
    interiorAnimals.forEach(animal => {
      if (animal.parent) {
        animal.parent.remove(animal);
      }
      disposeObject(animal);
    });
    interiorAnimals.length = 0; // Clear the array
  }
}



// ===== Module: building.js =====
/**
 * Building system for placing and removing objects
 */


// Reusable scratch values to avoid per-frame allocations (unique names for bundler)
const centerPointer = new THREE.Vector2(0, 0);
const BUILD_FORWARD_VEC = new THREE.Vector3();

/**
 * Build an object at the current build position
 */
function buildObject() {
  // Get the appropriate buildable types based on location
  const currentBuildableTypes = worldState.isInside ? interiorBuildableTypes : buildableTypes;
  const type = currentBuildableTypes[selectedObjectType];
  
  // Don't build if fists are selected
  if (type === 'fists') return;
  
  const buildPos = getBuildPosition();
  if (buildPos) {
    let newObject = null;
    if (worldState.isInside) {
      // Interior objects
      switch (type) {
        case 'chair':
          newObject = createChair(buildPos.x, buildPos.z);
          break;
        case 'table':
          newObject = createTable(buildPos.x, buildPos.z);
          break;
        case 'couch':
          newObject = createCouch(buildPos.x, buildPos.z);
          break;
        case 'tv':
          newObject = createTV(buildPos.x, buildPos.z);
          break;
        case 'bed':
          newObject = createBed(buildPos.x, buildPos.z);
          break;
        case 'cat':
          newObject = createCat(buildPos.x, buildPos.z);
          break;
        case 'dog':
          newObject = createDog(buildPos.x, buildPos.z);
          break;
      }
    } else {
      // Exterior objects
      switch (type) {
        case 'tree':
          newObject = createTree(buildPos.x, buildPos.z);
          break;
        case 'rock':
          newObject = createRock(buildPos.x, buildPos.z);
          break;
        case 'house':
          newObject = createHouse(buildPos.x, buildPos.z);
          break;
        case 'cow':
          newObject = createCow(buildPos.x, buildPos.z);
          break;
        case 'pig':
          newObject = createPig(buildPos.x, buildPos.z);
          break;
        case 'horse':
          newObject = createHorse(buildPos.x, buildPos.z);
          break;
        case 'dragon':
          newObject = createDragon(buildPos.x, buildPos.z);
          break;
      }
    }
    // Apply rotation to the newly created object
    if (newObject) {
      newObject.rotation.y = ghostRotation;
    }
  }
}

/**
 * Remove the currently highlighted object from the world
 */
function removeObject() {
  if (!highlightedObject || !highlightedObject.userData.removable) {
    return;
  }
  
  try {
    // Remove from scene
    interactableObjects.remove(highlightedObject);
    
    if (worldState.isInside) {
      // Remove from interior objects array
      const index = interiorObjects.indexOf(highlightedObject);
      if (index > -1) {
        interiorObjects.splice(index, 1);
      }
      
      // Remove from interior animals if it's an animal
      const animalTypes = ['cat', 'dog'];
      if (animalTypes.includes(highlightedObject.userData.type)) {
        const animalIndex = interiorAnimals.indexOf(highlightedObject);
        if (animalIndex > -1) {
          interiorAnimals.splice(animalIndex, 1);
        }
      }
    } else {
      // Remove from world objects array
      const index = worldObjects.indexOf(highlightedObject);
      if (index > -1) {
        worldObjects.splice(index, 1);
      }
      
      // Remove from world animals if it's an animal
      const animalTypes = ['cow', 'pig', 'horse', 'dragon'];
      if (animalTypes.includes(highlightedObject.userData.type)) {
        const animalIndex = worldAnimals.indexOf(highlightedObject);
        if (animalIndex > -1) {
          worldAnimals.splice(animalIndex, 1);
        }
      }
    }
    
    // Dispose of object resources
    disposeObject(highlightedObject);
    
    // Clear reference
    setHighlightedObject(null);
    
  } catch (error) {
    console.error('Failed to remove object:', error);
  }
}

/**
 * Get the position where an object should be built
 * @returns {THREE.Vector3|null} Build position or null
 */
function getBuildPosition() {
  // Get forward direction for building placement
  const forward = getForwardVector(BUILD_FORWARD_VEC);
  
  // Variable distance based on camera pitch (looking down = closer, looking up = farther)
  const pitchFactor = 1 - (camera.rotation.x / (Math.PI / 2)); // 0 when looking down, 2 when looking up
  const baseDistance = worldState.isInside ? CONFIG.building.distance * 0.5 : CONFIG.building.distance;
  const distance = baseDistance * (0.5 + pitchFactor * 0.5);
  
  const buildPos = camera.position.clone();
  buildPos.addScaledVector(forward, distance);
  buildPos.y = 0;
  
  // Ensure build position is within room bounds when inside
  if (worldState.isInside) {
    // Use dynamic room dimensions if available
    const interior = worldState.currentInterior;
    const halfWidth = (interior ? interior.roomWidth : CONFIG.interior.roomSize) / 2 - 1;
    const halfDepth = (interior ? interior.roomDepth : CONFIG.interior.roomSize) / 2 - 1;
    buildPos.x = Math.max(-halfWidth, Math.min(halfWidth, buildPos.x));
    buildPos.z = Math.max(-halfDepth, Math.min(halfDepth, buildPos.z));
  }
  
  return buildPos;
}

/**
 * Update object highlighting and ghost preview
 */
function updateObjectHighlight() {
  // Cast ray from camera center
  raycaster.setFromCamera(centerPointer, camera);
  
  // Include both world and interior objects
  const objectsToCheck = worldState.isInside ? 
    [worldState.interiorGroup] : 
    interactableObjects.children;
  
  // Use recursive=true to check all children (including doors on houses)
  const intersects = raycaster.intersectObjects(objectsToCheck, true);
  
  // Reset previous highlight
  if (highlightedObject) {
    resetObjectHighlight(highlightedObject);
    setHighlightedObject(null);
  }
  
  // Highlight new object if within range
  if (intersects.length > 0) {
    const distance = intersects[0].distance;
    const hitObject = intersects[0].object;
    
    // First check if we hit a door directly
    if (hitObject.userData && hitObject.userData.type === 'door' && distance < CONFIG.building.distance) {
      // Check if it's an exterior door (when outside) or interior door (when inside)
      if (!worldState.isInside || (worldState.isInside && hitObject.userData.isInteractive)) {
        setHighlightedObject(hitObject);
        highlightDoor(hitObject);
        return;
      }
    }
    
    // If not a door, find the top-level parent object (house, tree, etc.)
    let parentObject = hitObject;
    while (parentObject.parent && parentObject.parent.name !== 'interactableObjects' && parentObject.parent.name !== 'interior') {
      parentObject = parentObject.parent;
    }
    
    // Check if the parent is interactable within range
    if (parentObject && parentObject.userData && distance < CONFIG.building.distance) {
      const type = parentObject.userData.type;
      const isPickup = type === 'droppedResource';
      const isMob = type === 'mob';
      const isRemovable = parentObject.userData.removable === true;

      if (isPickup || isRemovable || isMob) {
        setHighlightedObject(parentObject);
        highlightObject(parentObject);
      }
    }
  }
  
  // Update ghost object for building preview
  updateGhostObject();
}

/**
 * Highlight an object with emissive color
 * @param {THREE.Object3D} object - Object to highlight
 */
function highlightObject(object) {
  object.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.emissive = new THREE.Color(CONFIG.building.highlightColor);
      child.material.emissiveIntensity = 0.3;
    }
  });
}

/**
 * Reset object highlighting
 * @param {THREE.Object3D} object - Object to reset
 */
function resetObjectHighlight(object) {
  // Check if it's a door
  if (object.userData && object.userData.type === 'door') {
    // Reset door material emissive properties
    if (object.material) {
      // Clone the material if it hasn't been cloned yet
      if (!object.material.isClone) {
        object.material = object.material.clone();
        object.material.isClone = true;
      }
      object.material.emissive = new THREE.Color(0x000000);
      object.material.emissiveIntensity = 0;
    }
  } else {
    // Regular object highlight reset
    object.traverse(child => {
      if (child.isMesh && child.material) {
        // Clone the material if it hasn't been cloned yet
        if (!child.material.isClone) {
          child.material = child.material.clone();
          child.material.isClone = true;
        }
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
  }
}

/**
 * Highlights an interactive door with green color
 * @param {THREE.Mesh} door - The door mesh to highlight
 */
function highlightDoor(door) {
  if (door.isMesh && door.material) {
    // Clone the material if it hasn't been cloned yet
    if (!door.material.isClone) {
      door.material = door.material.clone();
      door.material.isClone = true;
    }
    door.material.emissive = new THREE.Color(CONFIG.interior.doorHighlightColor);
    door.material.emissiveIntensity = 0.4;
  }
}

/**
 * Update the ghost preview object for building
 */
function updateGhostObject() {
  // Get the appropriate buildable types based on location
  const currentBuildableTypes = worldState.isInside ? interiorBuildableTypes : buildableTypes;
  const type = currentBuildableTypes[selectedObjectType];
  
  // Remove ghost if fists selected
  if (type === 'fists') {
    if (ghostObject) {
      disposeObject(ghostObject);
      setGhostObject(null);
      setLastGhostType(null);
      setLastGhostRotation(0);
    }
    return;
  }
  
  // Check if we need to recreate the ghost (type changed or rotation changed)
  const needsRecreation = !ghostObject || type !== lastGhostType || ghostRotation !== lastGhostRotation;
  
  // Get build position
  const buildPos = getBuildPosition();
  if (!buildPos) {
    if (ghostObject) {
      disposeObject(ghostObject);
      setGhostObject(null);
    }
    return;
  }
  
  // Update position if ghost exists and doesn't need recreation
  if (ghostObject && !needsRecreation) {
    ghostObject.position.copy(buildPos);
    return;
  }
  
  // Remove existing ghost if recreating
  if (ghostObject) {
    disposeObject(ghostObject);
    setGhostObject(null);
  }
  
  // Create new ghost for building preview
  if (buildPos) {
    // Create a detailed ghost object with direction indicator
    const ghostGroup = new THREE.Group();
    const ghostMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: CONFIG.building.ghostOpacity,
      depthWrite: false
    });
    
    switch (type) {
      case 'tree':
        // Tree with directional lean
        const treeGhost = new THREE.Mesh(
          new THREE.ConeGeometry(2, 6, 8),
          ghostMaterial.clone()
        );
        treeGhost.material.color.set(0x00ff00);
        treeGhost.position.y = 3;
        ghostGroup.add(treeGhost);
        
        // Add a small branch to show direction
        const branchGhost = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.3, 1.5),
          ghostMaterial.clone()
        );
        branchGhost.material.color.set(0x8B4513);
        branchGhost.position.set(0.8, 2, 0);
        branchGhost.rotation.z = -Math.PI / 6;
        ghostGroup.add(branchGhost);
        break;
        
      case 'rock':
        // Rock with directional marking
        const rockGhost = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 6, 5),
          ghostMaterial.clone()
        );
        rockGhost.material.color.set(0x888888);
        rockGhost.scale.set(1.1, 0.8, 1.1);
        rockGhost.position.y = 0.5;
        ghostGroup.add(rockGhost);
        
        // Add small crystal to show front
        const crystalGhost = new THREE.Mesh(
          new THREE.ConeGeometry(0.2, 0.5, 4),
          ghostMaterial.clone()
        );
        crystalGhost.material.color.set(0xaaaaff);
        crystalGhost.position.set(0.8, 0.7, 0);
        crystalGhost.rotation.z = -Math.PI / 6;
        ghostGroup.add(crystalGhost);
        break;
        
      case 'house':
        // Dynamic house ghost preview using the house generator
        const housePreview = createHouseGhostPreview();
        // Copy all children from the preview to our ghost group
        while (housePreview.children.length > 0) {
          const child = housePreview.children[0];
          housePreview.remove(child);
          ghostGroup.add(child);
        }
        break;
        
      case 'cow':
        // Cow body
        const cowBody = new THREE.Mesh(
          new THREE.BoxGeometry(2.1, 1.05, 1.2),
          ghostMaterial.clone()
        );
        cowBody.material.color.set(0x8B4513);
        cowBody.position.y = 0.75;
        ghostGroup.add(cowBody);
        
        // Cow head to show direction
        const cowHead = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.6, 0.6),
          ghostMaterial.clone()
        );
        cowHead.material.color.set(0x8B4513);
        cowHead.position.set(1.2, 0.8, 0);
        ghostGroup.add(cowHead);
        
        // Snout
        const cowSnout = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.2, 0.4),
          ghostMaterial.clone()
        );
        cowSnout.material.color.set(0xFFB6C1);
        cowSnout.position.set(1.5, 0.7, 0);
        ghostGroup.add(cowSnout);
        break;
        
      case 'pig':
        // Pig body
        const pigBody = new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 6, 4),
          ghostMaterial.clone()
        );
        pigBody.material.color.set(0xFFB6C1);
        pigBody.position.y = 0.45;
        pigBody.scale.set(1.4, 0.9, 1.1);
        ghostGroup.add(pigBody);
        
        // Pig head
        const pigHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 6, 4),
          ghostMaterial.clone()
        );
        pigHead.material.color.set(0xFFB6C1);
        pigHead.position.set(0.9, 0.5, 0);
        ghostGroup.add(pigHead);
        
        // Snout
        const pigSnout = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.2, 0.15),
          ghostMaterial.clone()
        );
        pigSnout.material.color.set(0xFF69B4);
        pigSnout.position.set(1.2, 0.45, 0);
        pigSnout.rotation.z = Math.PI / 2;
        ghostGroup.add(pigSnout);
        break;
        
      case 'horse':
        // Horse body
        const horseBody = new THREE.Mesh(
          new THREE.BoxGeometry(2.3, 1.3, 0.9),
          ghostMaterial.clone()
        );
        horseBody.material.color.set(0x654321);
        horseBody.position.y = 0.9;
        ghostGroup.add(horseBody);
        
        // Horse neck
        const horseNeck = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 1, 0.4),
          ghostMaterial.clone()
        );
        horseNeck.material.color.set(0x654321);
        horseNeck.position.set(1.0, 1.3, 0);
        horseNeck.rotation.z = -Math.PI / 8;
        ghostGroup.add(horseNeck);
        
        // Horse head
        const horseHead = new THREE.Mesh(
          new THREE.BoxGeometry(0.7, 0.5, 0.3),
          ghostMaterial.clone()
        );
        horseHead.material.color.set(0x654321);
        horseHead.position.set(1.4, 1.7, 0);
        ghostGroup.add(horseHead);
        break;
      
      case 'dragon':
        // Serpentine body silhouette
        const dragonBody = new THREE.Mesh(
          new THREE.SphereGeometry(1.5, 10, 8),
          ghostMaterial.clone()
        );
        dragonBody.material.color.set(0x2d5a4a);
        dragonBody.scale.set(1.8, 0.75, 0.85);
        dragonBody.position.y = 0.9;
        ghostGroup.add(dragonBody);
        
        // Neck curve
        const dragonNeck = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 8, 6),
          ghostMaterial.clone()
        );
        dragonNeck.material.color.set(0x2d5a4a);
        dragonNeck.position.set(1.6, 1.35, 0);
        ghostGroup.add(dragonNeck);
        
        // Head
        const dragonHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 8, 6),
          ghostMaterial.clone()
        );
        dragonHead.material.color.set(0x2d5a4a);
        dragonHead.scale.set(1.4, 0.9, 0.9);
        dragonHead.position.set(2.1, 1.6, 0);
        ghostGroup.add(dragonHead);
        
        // Tail
        const dragonTail = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.08, 2.8, 6),
          ghostMaterial.clone()
        );
        dragonTail.material.color.set(0x2d5a4a);
        dragonTail.position.set(-2.2, 0.5, 0);
        dragonTail.rotation.z = Math.PI / 2;
        ghostGroup.add(dragonTail);
        
        // Wings (curved shapes)
        const wingShape = new THREE.Shape();
        wingShape.moveTo(0, 0);
        wingShape.quadraticCurveTo(2.0, 3.0, 0.5, 4.5);
        wingShape.quadraticCurveTo(-0.5, 3.5, -1.0, 2.5);
        wingShape.quadraticCurveTo(-0.5, 1.2, 0, 0);
        const wingGeo = new THREE.ShapeGeometry(wingShape);
        
        const dragonWingL = new THREE.Mesh(wingGeo, ghostMaterial.clone());
        dragonWingL.material.color.set(0x3d6b5a);
        dragonWingL.position.set(0.3, 1.1, 0.5);
        dragonWingL.rotation.set(0, Math.PI / 2, 0.2);
        ghostGroup.add(dragonWingL);
        
        const dragonWingR = new THREE.Mesh(wingGeo, ghostMaterial.clone());
        dragonWingR.material.color.set(0x3d6b5a);
        dragonWingR.position.set(0.3, 1.1, -0.5);
        dragonWingR.rotation.set(0, -Math.PI / 2, 0.2);
        dragonWingR.scale.x = -1;
        ghostGroup.add(dragonWingR);
        break;
        
      // Interior objects
      case 'chair':
        // Chair seat
        const chairSeat = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.05, 0.5),
          ghostMaterial.clone()
        );
        chairSeat.material.color.set(0x8B4513);
        chairSeat.position.y = 0.4;
        ghostGroup.add(chairSeat);
        
        // Chair back to show direction
        const chairBack = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.4, 0.05),
          ghostMaterial.clone()
        );
        chairBack.material.color.set(0x8B4513);
        chairBack.position.set(0, 0.6, -0.225);
        ghostGroup.add(chairBack);
        break;
        
      case 'table':
        // Table top
        const tableTop = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.05, 0.8),
          ghostMaterial.clone()
        );
        tableTop.material.color.set(0x8B4513);
        tableTop.position.y = 0.75;
        ghostGroup.add(tableTop);
        
        // Add a small detail to show front
        const tableFront = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 0.02, 0.1),
          ghostMaterial.clone()
        );
        tableFront.material.color.set(0x654321);
        tableFront.position.set(0, 0.77, 0.35);
        ghostGroup.add(tableFront);
        break;
        
      case 'couch':
        // Couch base
        const couchBase = new THREE.Mesh(
          new THREE.BoxGeometry(2, 0.35, 0.8),
          ghostMaterial.clone()
        );
        couchBase.material.color.set(0x4169E1);
        couchBase.position.y = 0.175;
        ghostGroup.add(couchBase);
        
        // Couch back
        const couchBack = new THREE.Mesh(
          new THREE.BoxGeometry(2, 0.35, 0.2),
          ghostMaterial.clone()
        );
        couchBack.material.color.set(0x4169E1);
        couchBack.position.set(0, 0.35, -0.3);
        ghostGroup.add(couchBack);
        break;
        
      case 'tv':
        // TV screen
        const tvScreen = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.7, 0.1),
          ghostMaterial.clone()
        );
        tvScreen.material.color.set(0x2F2F2F);
        tvScreen.position.y = 1.2;
        ghostGroup.add(tvScreen);
        
        // TV stand
        const tvStand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.2, 0.8),
          ghostMaterial.clone()
        );
        tvStand.material.color.set(0x4F4F4F);
        tvStand.position.y = 0.4;
        ghostGroup.add(tvStand);
        break;
        
      case 'bed':
        // Bed frame
        const bedFrame = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.3, 2),
          ghostMaterial.clone()
        );
        bedFrame.material.color.set(0x8B4513);
        bedFrame.position.y = 0.25;
        ghostGroup.add(bedFrame);
        
        // Headboard to show direction
        const headboard = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.8, 0.1),
          ghostMaterial.clone()
        );
        headboard.material.color.set(0x8B4513);
        headboard.position.set(0, 0.7, -0.95);
        ghostGroup.add(headboard);
        break;
        
      case 'cat':
        // Cat body
        const catBody = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.1, 0.48, 6),
          ghostMaterial.clone()
        );
        catBody.material.color.set(0x808080);
        catBody.position.y = 0.12;
        catBody.rotation.z = Math.PI / 2;
        ghostGroup.add(catBody);
        
        // Cat head
        const catHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.14, 6, 6),
          ghostMaterial.clone()
        );
        catHead.material.color.set(0x808080);
        catHead.position.set(0.2, 0.14, 0);
        ghostGroup.add(catHead);
        
        // Ears
        const catEar1 = new THREE.Mesh(
          new THREE.ConeGeometry(0.06, 0.08, 3),
          ghostMaterial.clone()
        );
        catEar1.material.color.set(0x808080);
        catEar1.position.set(0.18, 0.24, 0.06);
        ghostGroup.add(catEar1);
        
        const catEar2 = catEar1.clone();
        catEar2.position.set(0.18, 0.24, -0.06);
        ghostGroup.add(catEar2);
        break;
        
      case 'dog':
        // Dog body
        const dogBody = new THREE.Mesh(
          new THREE.BoxGeometry(0.96, 0.4, 0.32),
          ghostMaterial.clone()
        );
        dogBody.material.color.set(0xD2691E);
        dogBody.position.y = 0.32;
        ghostGroup.add(dogBody);
        
        // Dog head
        const dogHead = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.28, 0.28),
          ghostMaterial.clone()
        );
        dogHead.material.color.set(0xD2691E);
        dogHead.position.set(0.56, 0.36, 0);
        ghostGroup.add(dogHead);
        
        // Snout
        const dogSnout = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.12, 0.16),
          ghostMaterial.clone()
        );
        dogSnout.material.color.set(0xD2691E);
        dogSnout.position.set(0.68, 0.32, 0);
        ghostGroup.add(dogSnout);
        
        // Tail up to show happiness
        const dogTail = new THREE.Mesh(
          new THREE.CylinderGeometry(0.048, 0.032, 0.32, 4),
          ghostMaterial.clone()
        );
        dogTail.material.color.set(0xD2691E);
        dogTail.position.set(-0.4, 0.4, 0);
        dogTail.rotation.z = Math.PI / 3;
        ghostGroup.add(dogTail);
        break;
    }
    
    const ghost = ghostGroup;
    ghost.position.copy(buildPos);
    ghost.rotation.y = ghostRotation; // Apply rotation
    scene.add(ghost);
    setGhostObject(ghost);
    
    // Track the type and rotation for next frame
    setLastGhostType(type);
    setLastGhostRotation(ghostRotation);
  }
}


// ===== Module: player.js =====
/**
 * Player movement and physics
 */


// Reusable vectors to minimize allocations in the hot update loop
const moveVector = new THREE.Vector3();
const forwardVec = new THREE.Vector3();
const rightVec = new THREE.Vector3();

/**
 * Update player movement and physics
 * @param {number} delta - Time since last frame
 */
function updatePlayer(delta) {
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


// ===== Module: hands.js =====
/**
 * First-person hands and simple punch animation.
 */


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
function createHands() {
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
function triggerPunchAnimation() {
  if (!handsGroup) return;
  punchTimer = PUNCH_DURATION;
}

/**
 * Update hand visibility and punch animation each frame.
 * @param {number} delta
 */
function updateHands(delta) {
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


// ===== Module: dayNight.js =====
/**
 * Day/night cycle system
 */


// Preallocated colors to avoid per-frame allocations
const sunriseColor = new THREE.Color(0xff6b35);
const dayColor = new THREE.Color(0x87ceeb);
const nightColor = new THREE.Color(0x191970);
const workingColor = new THREE.Color();

/**
 * Update the day/night cycle
 */
function updateDayNightCycle() {
  const totalCycle = CONFIG.dayNight.dayDuration + CONFIG.dayNight.nightDuration;
  const elapsed = clock.getElapsedTime() % totalCycle;
  const isDay = elapsed < CONFIG.dayNight.dayDuration;
  
  let progress, lightIntensity;
  const skyColor = workingColor;
  
  if (isDay) {
    // Day time
    progress = elapsed / CONFIG.dayNight.dayDuration;
    const sunAngle = progress * Math.PI;
    
    // Update sun position and light
    const sunX = Math.cos(sunAngle) * CONFIG.dayNight.sunDistance;
    const sunY = Math.sin(sunAngle) * CONFIG.dayNight.sunDistance;
    sunLight.position.set(sunX, sunY, 50);
    sunMesh.position.set(sunX, sunY, -100);
    sunLight.visible = true;
    sunMesh.visible = true;
    moonLight.visible = false;
    moonMesh.visible = false;
    
    lightIntensity = 0.5 + Math.sin(sunAngle) * 0.5;
    sunLight.intensity = lightIntensity;
    ambientLight.intensity = 0.3 + lightIntensity * 0.2;
    
    // Sky color transitions
    skyColor.copy((progress < 0.1 || progress > 0.9) ? sunriseColor : dayColor);
    scene.fog.color.copy(skyColor);
  } else {
    // Night time
    progress = (elapsed - CONFIG.dayNight.dayDuration) / CONFIG.dayNight.nightDuration;
    const moonAngle = progress * Math.PI;
    
    // Update moon position and light
    const moonX = -Math.cos(moonAngle) * CONFIG.dayNight.moonDistance;
    const moonY = Math.sin(moonAngle) * CONFIG.dayNight.moonDistance;
    moonLight.position.set(moonX, moonY, -50);
    moonMesh.position.set(moonX, moonY, -100);
    moonLight.visible = true;
    moonMesh.visible = true;
    sunLight.visible = false;
    sunMesh.visible = false;
    
    lightIntensity = 0.1 + Math.sin(moonAngle) * 0.2;
    moonLight.intensity = lightIntensity;
    ambientLight.intensity = 0.1;
    
    skyColor.copy(nightColor);
    scene.fog.color.copy(skyColor);
  }
  
  // Update sky color
  skyMesh.material.color.copy(skyColor);
  
  // Update compass time display
  updateCompass(isDay, progress);
}

/**
 * Update compass display with current time
 * @param {boolean} isDay - Whether it's day time
 * @param {number} progress - Progress through current cycle (0-1)
 */
function updateCompass(isDay, progress) {
  const needle = document.getElementById('compassNeedle');
  const timeDisplay = document.getElementById('timeDisplay');
  
  if (needle) {
    const rotation = -cameraController.yaw * (180 / Math.PI) - 90;
    needle.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
  }
  
  if (timeDisplay) {
    if (isDay) {
      timeDisplay.textContent = progress < 0.5 ? 'Morning' : 'Afternoon';
    } else {
      timeDisplay.textContent = 'Night';
    }
  }
}


// ===== Module: ui.js =====
/**
 * UI elements creation and management
 */


let damageFlashTimeout = null;

/**
 * Create all UI elements for the game
 */
function createUIElements() {
  createCrosshair();
  createCompass();
  createObjectSelector();
  createSaveLoadPanel();
  createInventoryPanel();
  createHealthPanel();
  createDamageFlash();
  updateHealthUI();
  updateInstructions();
  updateObjectSelector();
}

/**
 * Create the aiming crosshair
 */
function createCrosshair() {
  const crosshair = document.createElement('div');
  crosshair.innerHTML = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <div style="width: 20px; height: 2px; background: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
      <div style="width: 2px; height: 20px; background: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
    </div>
  `;
  document.body.appendChild(crosshair);
  uiElements.crosshair = crosshair;
}

/**
 * Create the compass UI element
 */
function createCompass() {
  const compass = document.createElement('div');
  compass.style.cssText = `
    position: absolute;
    top: 20px;
    left: 20px;
    width: ${CONFIG.ui.compassSize}px;
    height: ${CONFIG.ui.compassSize}px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: white;
    font-family: Arial;
    font-size: 12px;
  `;
  compass.innerHTML = `
    <div style="position: absolute; top: 5px; left: 50%; transform: translateX(-50%);">N</div>
    <div id="compassNeedle" style="position: absolute; top: 50%; left: 50%; width: 2px; height: 30px; background: red; transform-origin: center bottom;"></div>
    <div id="timeDisplay" style="position: absolute; top: ${CONFIG.ui.compassSize + 10}px; left: 50%; transform: translateX(-50%); text-align: center; width: 100px;">Day</div>
  `;
  document.body.appendChild(compass);
  uiElements.compass = compass;
}

/**
 * Create the object selector UI
 */
function createObjectSelector() {
  const selector = document.createElement('div');
  selector.style.cssText = `
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 5px;
  `;
  
  document.body.appendChild(selector);
  uiElements.selector = selector;
  
  // Update the selector content based on location
  updateSelectorContent();
}

/**
 * Update the selector content based on whether we're inside or outside
 */
function updateSelectorContent() {
  if (!uiElements.selector) return;
  
  // Different items for interior vs exterior
  const exteriorItems = [
    { icon: '✊', label: 'Fists', key: '0' },
    { icon: '🌳', label: 'Tree', key: '1' },
    { icon: '🪨', label: 'Rock', key: '2' },
    { icon: '🏠', label: 'House', key: '3' },
    { icon: '🐄', label: 'Cow', key: '4' },
    { icon: '🐷', label: 'Pig', key: '5' },
    { icon: '🐴', label: 'Horse', key: '6' },
    { icon: '🐉', label: 'Dragon', key: '7' }
  ];
  
  const interiorItems = [
    { icon: '✊', label: 'Fists', key: '0' },
    { icon: '🪑', label: 'Chair', key: '1' },
    { icon: '🔲', label: 'Table', key: '2' },
    { icon: '🛋️', label: 'Couch', key: '3' },
    { icon: '📺', label: 'TV', key: '4' },
    { icon: '🛏️', label: 'Bed', key: '5' },
    { icon: '🐱', label: 'Cat', key: '6' },
    { icon: '🐕', label: 'Dog', key: '7' }
  ];
  
  const items = worldState.isInside ? interiorItems : exteriorItems;
  
  uiElements.selector.innerHTML = items.map((item, index) => `
    <div class="selector-item" data-type="${index}" style="
      width: ${CONFIG.ui.selectorItemSize}px;
      height: ${CONFIG.ui.selectorItemSize}px;
      background: #333;
      border: 2px solid ${index === selectedObjectType ? '#ff0' : '#666'};
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      text-align: center;
      font-size: 12px;
    ">
      <div>${item.icon}<br>${item.label}<br>[${item.key}]</div>
    </div>
  `).join('');
}

/**
 * Create a simple heart-based health panel.
 */
function createHealthPanel() {
  const panel = document.createElement('div');
  panel.id = 'healthPanel';
  panel.style.cssText = `
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    color: white;
    font-family: Arial;
    font-size: 18px;
    min-width: 120px;
    text-align: center;
    z-index: 900;
  `;
  document.body.appendChild(panel);
  uiElements.health = panel;
}

/**
 * Fullscreen red flash overlay shown when the player takes damage.
 */
function createDamageFlash() {
  const overlay = document.createElement('div');
  overlay.id = 'damageFlash';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(255, 0, 0, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease;
    z-index: 1500;
  `;
  document.body.appendChild(overlay);
  uiElements.damageFlash = overlay;
}

/**
 * Briefly flash the damage overlay. Defaults to 0.5s.
 * @param {number} durationMs
 */
function triggerDamageFlash(durationMs = 500) {
  const overlay = uiElements.damageFlash || document.getElementById('damageFlash');
  if (!overlay) return;

  overlay.style.opacity = '1';
  if (damageFlashTimeout) {
    clearTimeout(damageFlashTimeout);
  }
  damageFlashTimeout = setTimeout(() => {
    overlay.style.opacity = '0';
  }, durationMs);
}

/**
 * Update the heart display to reflect current player health.
 */
function updateHealthUI() {
  const panel = document.getElementById('healthPanel');
  if (!panel) return;
  const hearts = '❤️'.repeat(Math.max(0, playerHealth));
  const missing = '🤍'.repeat(Math.max(0, playerMaxHealth - playerHealth));
  panel.textContent = `${hearts}${missing}`;
}

/**
 * Update the instructions panel styling
 */
function updateInstructions() {
  const instructions = document.getElementById('instructions');
  if (instructions) {
    instructions.style.background = 'rgba(0, 0, 0, 0.7)';
    instructions.style.color = 'white';
    instructions.style.padding = '10px';
    instructions.style.borderRadius = '5px';
    uiElements.instructions = instructions;
  }
}

/**
 * Update the object selector UI to show current selection
 */
function updateObjectSelector() {
  // Just update the content which will handle the selection highlight
  updateSelectorContent();
}

/**
 * Create save/load panel
 */
function createSaveLoadPanel() {
  const panel = document.createElement('div');
  panel.id = 'saveLoadPanel';
  panel.style.cssText = `
    position: absolute;
    top: ${CONFIG.ui.compassSize + 100}px;
    left: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-family: Arial;
    font-size: 14px;
  `;
  
  panel.innerHTML = `
    <div style="margin-bottom: 10px; font-weight: bold;">💾 Save/Load</div>
    <button id="saveButton" style="
      margin: 5px;
      padding: 5px 10px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    ">Save Game [F5]</button>
    <button id="loadButton" style="
      margin: 5px;
      padding: 5px 10px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    ">Load Game [F9]</button>
    <div id="saveStatus" style="margin-top: 10px; font-size: 12px;"></div>
  `;
  
  document.body.appendChild(panel);
  uiElements.saveLoadPanel = panel;
}

/**
 * Update save status message
 * @param {string} message - Status message to display
 * @param {string} color - Text color (default: white)
 */
function updateSaveStatus(message, color = 'white') {
  const statusElement = document.getElementById('saveStatus');
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.color = color;

    // Clear message after 3 seconds
    setTimeout(() => {
      statusElement.textContent = '';
    }, 3000);
  }
}

/**
 * Create the inventory panel
 */
function createInventoryPanel() {
  const panel = document.createElement('div');
  panel.id = 'inventoryPanel';
  panel.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #666;
    color: white;
    font-family: Arial;
    font-size: 16px;
    min-width: 300px;
    display: none;
    z-index: 1000;
  `;

  panel.innerHTML = `
    <div style="margin-bottom: 15px; font-weight: bold; font-size: 20px; text-align: center; border-bottom: 2px solid #666; padding-bottom: 10px;">
      📦 Inventory
    </div>
    <div id="inventoryContent" style="margin-top: 10px;">
      <!-- Will be populated by updateInventoryDisplay -->
    </div>
    <div style="margin-top: 15px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #666; padding-top: 10px;">
      Press [I] to close
    </div>
  `;

  document.body.appendChild(panel);
  uiElements.inventory = panel;

  // Initialize inventory display
  updateInventoryDisplay();
}

/**
 * Toggle inventory panel visibility
 */
function toggleInventory() {
  const panel = document.getElementById('inventoryPanel');
  if (panel) {
    const isOpen = panel.style.display !== 'none';
    const willOpen = isOpen ? 'none' : 'block';
    panel.style.display = willOpen;

    if (willOpen === 'block') {
      ensureInventorySelection();
    }

    updateInventoryDisplay();
    return willOpen === 'block';
  }
  return false;
}

/**
 * Update the inventory display with current resources
 */
function updateInventoryDisplay() {
  const contentElement = document.getElementById('inventoryContent');
  if (!contentElement) return;

  const listWrapper = document.createElement('div');
  listWrapper.style.display = 'flex';
  listWrapper.style.flexDirection = 'column';
  listWrapper.style.gap = '10px';

  const inventoryEntries = getInventoryEntries(inventory);

  inventoryEntries.forEach(([resource, amount]) => {
    const resourceIcon = getResourceIcon(resource);
    const resourceLabel = getResourceLabel(resource);
    const item = document.createElement('button');
    item.type = 'button';
    item.dataset.resource = resource;
    item.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      border: 1px solid ${selectedInventoryResource === resource ? '#4CAF50' : '#666'};
      color: white;
      cursor: pointer;
      text-align: left;
    `;

    item.innerHTML = `
      <span style="font-size: 18px;">${resourceIcon} ${resourceLabel}</span>
      <span style="font-weight: bold; font-size: 18px; color: #4CAF50;">${amount}</span>
    `;

    item.addEventListener('click', () => {
      setSelectedInventoryResource(resource);
      updateInventoryDisplay();
    });

    listWrapper.appendChild(item);
  });

  // Clear and re-render
  contentElement.innerHTML = '';
  contentElement.appendChild(listWrapper);
}

/**
 * Pick the first available resource as selection if none is chosen.
 */
function ensureInventorySelection() {
  if (selectedInventoryResource) return;
  const entries = getInventoryEntries(inventory);
  const firstWithAmount = entries.find(([, amount]) => amount > 0);
  const fallback = entries[0];
  const choice = (firstWithAmount || fallback || [null])[0];
  if (choice) {
    setSelectedInventoryResource(choice);
  }
}


// ===== Module: health.js =====
/**
 * Player health management and UI hooks.
 * Health is expressed in whole-heart units for simplicity.
 */


let regenTimer = 0;

/**
 * Reset player health to maximum.
 */
function resetPlayerHealth() {
  setPlayerHealth(playerMaxHealth);
  updateHealthUI();
}

/**
 * Apply damage to the player.
 * @param {number} amount - Whole-heart damage.
 * @param {string} source - Text label for debugging/logging.
 */
function damagePlayer(amount, source = 'unknown') {
  const damage = Math.max(0, Math.floor(amount));
  if (damage <= 0) return;

  setPlayerHealth(playerHealth - damage);
  updateHealthUI();
  triggerDamageFlash(500);

  if (playerHealth <= 0) {
    handlePlayerDeath(source);
  }
}

/**
 * Heal the player by a certain amount (clamped to max).
 * @param {number} amount
 */
function healPlayer(amount) {
  const heal = Math.max(0, Math.floor(amount));
  if (heal <= 0) return;
  setPlayerHealth(Math.min(playerHealth + heal, playerMaxHealth));
  updateHealthUI();
}

/**
 * Regenerate 1 heart per second while inside a house.
 * Call every frame with delta time.
 * @param {number} delta
 */
function updateHealthRegen(delta) {
  if (worldState.isInside && playerHealth < playerMaxHealth) {
    regenTimer += delta;
    if (regenTimer >= 1) {
      const heartsToHeal = Math.floor(regenTimer);
      regenTimer -= heartsToHeal;
      healPlayer(heartsToHeal);
    }
  } else {
    regenTimer = 0;
  }
}

/**
 * Simple death handler: alert and restart the game.
 * This keeps state handling minimal and future-friendly.
 */
function handlePlayerDeath(source) {
  console.warn(`Player died (source: ${source}). Restarting game.`);
  alert('You died! Restarting...');
  window.location.reload();
}


// ===== Module: mobs.js =====
/**
 * Hostile mob management (first mob: spider).
 * Keep behaviour simple and data-driven for future mobs.
 */


// Scratch vectors reused every frame
const tempDir = new THREE.Vector3();

let lastIsDay = true;

/**
 * Spawn initial hostile mobs in the world (day baseline).
 */
function createInitialMobs() {
  spawnSpiders(CONFIG.mobs.spawn.dayCount, CONFIG.mobs.spawn.spread);
}

/**
 * Main mob update loop.
 * @param {number} delta
 */
function updateMobs(delta) {
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
function damageMob(mob, damage) {
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


// ===== Module: saveLoad.js =====
/**
 * Save/Load System
 * Handles saving and loading game state to localStorage
 */


const SAVE_KEY = 'jscraft_save';
const SAVE_VERSION = '1.0';

/**
 * Save the current game state
 * @returns {boolean} Success status
 */
function saveGameState() {
  try {
    // Always save current interior if inside a house
    if (worldState.isInside && worldState.currentHouse) {
      saveCurrentInterior();
    }
    
    // Convert house interiors Map to serializable format
    const houseInteriorsData = {};
    worldState.houseInteriors.forEach((interiorData, houseUuid) => {
      houseInteriorsData[houseUuid] = interiorData;
    });
    
    // Prepare save data
    
    const saveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      timeOfDay: clock.getElapsedTime(), // Save the current time
      player: {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
        },
        rotation: {
          yaw: cameraController.yaw,
          pitch: cameraController.pitch
        },
        selectedObjectType: selectedObjectType,
        ghostRotation: ghostRotation
      },
      worldState: {
        isInside: worldState.isInside,
        currentHouseUuid: worldState.currentHouse ? worldState.currentHouse.uuid : null,
        outsidePosition: worldState.outsidePosition.toArray(),
        outsideRotation: worldState.outsideRotation
      },
      worldObjects: worldObjects.map(obj => ({
        type: obj.userData.type,
        position: obj.position.toArray(),
        rotation: obj.rotation.y,
        uuid: obj.uuid,
        // Persist house style for dynamic houses
        style: obj.userData.style || null
      })),
      worldAnimals: worldAnimals.map(animal => ({
        type: animal.userData.type,
        position: animal.position.toArray(),
        rotation: animal.rotation.y
      })),
      houseInteriors: houseInteriorsData
    };
    
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

/**
 * Load a saved game state
 * @returns {boolean} Success status
 */
function loadGameState() {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) {
      console.log('No save data found');
      return false;
    }
    
    let saveData;
    try {
      saveData = JSON.parse(savedData);
    } catch (parseError) {
      console.error('Failed to parse save data:', parseError);
      return false;
    }
    
    // Validate save data structure
    if (!saveData || typeof saveData !== 'object') {
      console.error('Invalid save data structure');
      return false;
    }
    
    // Check version compatibility
    if (saveData.version !== SAVE_VERSION) {
      // Version mismatch but continue loading
    }
    
    // Clear existing objects (except initial terrain)
    clearWorldObjects();
    
    // Restore player position and rotation
    camera.position.set(
      saveData.player.position.x,
      saveData.player.position.y,
      saveData.player.position.z
    );
    cameraController.yaw = saveData.player.rotation.yaw;
    cameraController.pitch = saveData.player.rotation.pitch;
    updateCameraRotation();
    
    // Restore selected object and ghost rotation
    selectedObjectType = saveData.player.selectedObjectType || 0;
    ghostRotation = saveData.player.ghostRotation || 0;
    
    // Restore time of day
    if (saveData.timeOfDay !== undefined) {
      clock.elapsedTime = saveData.timeOfDay;
      clock.oldTime = performance.now() / 1000 - saveData.timeOfDay;
    }
    
    // Restore world objects
    saveData.worldObjects.forEach(objData => {
      let newObj = null;
      const [x, y, z] = objData.position;
      
      switch (objData.type) {
        case 'tree':
          newObj = createTree(x, z);
          break;
        case 'rock':
          newObj = createRock(x, z);
          break;
        case 'house':
          // Pass UUID and style to recreate identical house appearance
          newObj = createHouse(x, z, objData.uuid, objData.style || null);
          break;
      }
      
      if (newObj) {
        newObj.rotation.y = objData.rotation;
      }
    });
    
    // Restore world animals
    saveData.worldAnimals.forEach(animalData => {
      let newAnimal = null;
      const [x, y, z] = animalData.position;
      
      switch (animalData.type) {
        case 'cow':
          newAnimal = createCow(x, z);
          break;
        case 'pig':
          newAnimal = createPig(x, z);
          break;
        case 'horse':
          newAnimal = createHorse(x, z);
          break;
        case 'dragon':
          newAnimal = createDragon(x, z);
          break;
      }
      
      if (newAnimal) {
        newAnimal.rotation.y = animalData.rotation;
      }
    });
    
    // Restore house interiors data
    if (saveData.houseInteriors && typeof saveData.houseInteriors === 'object') {
      worldState.houseInteriors.clear();
      Object.entries(saveData.houseInteriors).forEach(([houseUuid, interiorData]) => {
        // Validate interior data structure
        if (interiorData && 
            Array.isArray(interiorData.objects) && 
            Array.isArray(interiorData.animals)) {
          worldState.houseInteriors.set(houseUuid, interiorData);
        }
      });
      // House interiors restored
    }
    
    // If player was inside a house, restore that interior
    if (saveData.worldState.isInside && saveData.worldState.currentHouseUuid) {
      const house = worldObjects.find(obj => obj.uuid === saveData.worldState.currentHouseUuid);
      if (house) {
        // Set world state
        worldState.currentHouse = house;
        worldState.isInside = true;
        worldState.outsidePosition.fromArray(saveData.worldState.outsidePosition);
        worldState.outsideRotation = saveData.worldState.outsideRotation;
        
        // Hide outside world objects
        if (interactableObjects) interactableObjects.visible = false;
        if (skyMesh) skyMesh.visible = false;
        if (sunMesh) sunMesh.visible = false;
        if (moonMesh) moonMesh.visible = false;
        if (sunLight) sunLight.visible = false;
        if (moonLight) moonLight.visible = false;
        if (ambientLight) ambientLight.intensity = 0.5;
        
        // Create interior with saved data
        createInterior(house, true); // Skip default furniture
        loadHouseInterior(house.uuid);
        
        // Update UI for interior mode
        updateSelectorContent();
      }
    } else {
      // Reset world state if not inside
      worldState.isInside = false;
      worldState.currentHouse = null;
    }

    // Respawn mobs for the loaded world (not persisted yet)
    createInitialMobs();
    
    return true;
  } catch (error) {
    console.error('Failed to load game:', error);
    return false;
  }
}

/**
 * Clear all world objects (used before loading)
 */
function clearWorldObjects() {
  // Clear world objects
  [...worldObjects].forEach(obj => {
    if (obj.parent) obj.parent.remove(obj);
    disposeObject(obj);
  });
  worldObjects.length = 0;
  
  // Clear world animals
  [...worldAnimals].forEach(animal => {
    if (animal.parent) animal.parent.remove(animal);
    disposeObject(animal);
  });
  worldAnimals.length = 0;

  // Clear hostile mobs
  [...mobs].forEach(mob => {
    if (mob.parent) mob.parent.remove(mob);
    disposeObject(mob);
  });
  mobs.length = 0;
  
  // Clear interior objects if inside
  if (worldState.isInside) {
    [...interiorObjects].forEach(obj => {
      if (obj.parent) obj.parent.remove(obj);
      disposeObject(obj);
    });
    interiorObjects.length = 0;
    
    [...interiorAnimals].forEach(animal => {
      if (animal.parent) animal.parent.remove(animal);
      disposeObject(animal);
    });
    interiorAnimals.length = 0;
  }
}

/**
 * Check if a save exists
 * @returns {boolean} True if save exists
 */
function hasSaveData() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

/**
 * Get save data info without loading
 * @returns {Object|null} Save info or null
 */
function getSaveInfo() {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;
    
    const saveData = JSON.parse(savedData);
    return {
      timestamp: new Date(saveData.timestamp),
      objectCount: saveData.worldObjects.length,
      animalCount: saveData.worldAnimals.length
    };
  } catch (error) {
    return null;
  }
}

/**
 * Delete save data
 */
function deleteSaveData() {
  localStorage.removeItem(SAVE_KEY);
  console.log('Save data deleted');
}

/**
 * Save the current interior to the house interiors map
 * Traverses the interior group to collect all furniture and pets
 * Only saves if player is currently inside a house
 */
function saveCurrentInterior() {
  if (!worldState.currentHouse || !worldState.isInside) {
    return;
  }
  
  const houseUuid = worldState.currentHouse.uuid;
  
  // Collect all interior objects from the interior group
  const objectsToSave = [];
  const animalsToSave = [];
  
  if (worldState.interiorGroup) {
    worldState.interiorGroup.traverse(child => {
      if (child.userData && child.userData.type) {
        const saveData = {
          type: child.userData.type,
          position: child.position.toArray(),
          rotation: child.rotation.y || 0
        };
        
        if (['chair', 'table', 'couch', 'tv', 'bed'].includes(child.userData.type)) {
          objectsToSave.push(saveData);
        } else if (['cat', 'dog'].includes(child.userData.type)) {
          animalsToSave.push(saveData);
        }
      }
    });
  }
  
  const interiorData = {
    objects: objectsToSave,
    animals: animalsToSave,
    timestamp: Date.now()
  };
  
  worldState.houseInteriors.set(houseUuid, interiorData);
}

/**
 * Load a specific house's interior from saved data
 * Recreates all furniture and pets in their saved positions
 * @param {string} houseUuid - UUID of the house to load interior for
 * @returns {boolean} True if interior was loaded successfully, false otherwise
 */
function loadHouseInterior(houseUuid) {
  const interiorData = worldState.houseInteriors.get(houseUuid);
  
  if (!interiorData || !worldState.interiorGroup) {
    return false;
  }
  
  // Clear arrays to track new objects
  interiorObjects.length = 0;
  interiorAnimals.length = 0;
  
  // Restore interior objects
  interiorData.objects.forEach(objData => {
    let newObj = null;
    const [x, y, z] = objData.position;
    
    switch (objData.type) {
      case 'chair':
        newObj = createChair(x, y, z);
        break;
      case 'table':
        newObj = createTable(x, y, z);
        break;
      case 'couch':
        newObj = createCouch(x, y, z);
        break;
      case 'tv':
        newObj = createTV(x, y, z);
        break;
      case 'bed':
        newObj = createBed(x, y, z);
        break;
    }
    
    if (newObj) {
      newObj.rotation.y = objData.rotation || 0;
      // Always add to interior group when loading interior
      if (worldState.interiorGroup) {
        worldState.interiorGroup.add(newObj);
      }
      // Track in the array
      if (!interiorObjects.includes(newObj)) {
        interiorObjects.push(newObj);
      }
    }
  });
  
  // Restore interior animals
  interiorData.animals.forEach(animalData => {
    let newAnimal = null;
    const [x, , z] = animalData.position;
    
    switch (animalData.type) {
      case 'cat':
        newAnimal = createCat(x, z);
        break;
      case 'dog':
        newAnimal = createDog(x, z);
        break;
    }
    
    if (newAnimal) {
      newAnimal.rotation.y = animalData.rotation || 0;
      // Always add to interior group when loading interior
      if (worldState.interiorGroup) {
        worldState.interiorGroup.add(newAnimal);
      }
      // Track in the array
      if (!interiorAnimals.includes(newAnimal)) {
        interiorAnimals.push(newAnimal);
      }
    }
  });
  
  return true;
}


// ===== Module: input.js =====
/**
 * Input handling system
 */


/**
 * Setup all event listeners
 */
function setupEventListeners() {
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
function onWindowResize() {
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
function removeEventListeners() {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('click', onClick);
  document.removeEventListener('pointerlockchange', onPointerLockChange);
}


// ===== Module: animals.js =====
/**
 * Animal creation and movement functions
 */


// Re-export animal creation functions from their respective modules

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
function updateAnimals(delta) {
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


// ===== Module: main.js =====
/**
 * JSCraft 3D - Three.js Implementation
 * Main entry point for the modular game
 * 
 * @version 2.0.0
 * @license MIT
 */


/**
 * Initialize the game
 */
function init() {
  try {
    // Clock for time tracking
    setClock(new THREE.Clock());
    
    // Scene setup
    setScene(new THREE.Scene());
    scene.fog = new THREE.Fog(0x87CEEB, CONFIG.world.fogNear, CONFIG.world.fogFar);
    
    // Camera setup
    setCamera(new THREE.PerspectiveCamera(
      CONFIG.camera.fov,
      window.innerWidth / window.innerHeight,
      CONFIG.camera.near,
      CONFIG.camera.far
    ));
    camera.position.set(0, CONFIG.player.height, 0);
    
    // Initialize camera rotation properly
    updateCameraRotation();
    scene.add(camera);
    
    // Renderer setup
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
      throw new Error('Game canvas not found');
    }
    
    setRenderer(new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: CONFIG.renderer.antialias 
    }));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Raycaster for object interaction
    setRaycaster(new THREE.Raycaster());
    
    // Setup world
    createWorld();
    createLighting();
    createInitialWorldObjects(scene);
    createInitialAnimals(scene);
    createInitialMobs();
    createHands();
    
    // Setup controls
    setupEventListeners();
    
    // Setup UI
    createUIElements();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start game loop
    animate();
    
  } catch (error) {
    console.error('Failed to initialize game:', error);
    alert('Failed to start the game. Please check the console for errors.');
  }
}

/**
 * Main animation loop
 */
function animate() {
  requestAnimationFrame(animate);
  
  const delta = clock.getDelta();
  
  updatePlayer(delta);
  updateHealthRegen(delta);
  updateHands(delta);
  
  // Update different systems based on location
  if (!worldState.isInside) {
    updateDayNightCycle();
  }
  
  // Animals update regardless of location (different animals inside/outside)
  updateAnimals(delta);
  updateMobs(delta);
  
  updateObjectHighlight();
  
  renderer.render(scene, camera);
}

/**
 * Clean up resources when the window is closed
 */
function cleanup() {
  // Dispose of all world objects
  worldObjects.forEach(object => {
    disposeObject(object);
  });
  
  // Dispose of renderer
  if (renderer) {
    renderer.dispose();
  }
  
  // Remove event listeners
  removeEventListeners();
  window.removeEventListener('resize', onWindowResize);
}

// Initialize on load
window.addEventListener('load', init);

// Cleanup on unload
window.addEventListener('beforeunload', cleanup);


})();
