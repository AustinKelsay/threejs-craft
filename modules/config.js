/**
 * Game configuration object containing all adjustable parameters
 * Modify these values to customize gameplay experience
 */
export const CONFIG = {
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
    highlightColor: 0xffff00, // Default highlight color (yellow)
    dragonHighlightColor: 0x00ff66, // Dragon-specific highlight (emerald glow)
    ghostOpacity: 0.3         // Preview object transparency
  },
  
  // Day/night cycle
  dayNight: {
    dayDuration: 240,         // Day length in seconds
    nightDuration: 30,        // Night length in seconds
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
