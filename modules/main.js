/**
 * JSCraft 3D - Three.js Implementation
 * Main entry point for the modular game
 * 
 * @version 2.0.0
 * @license MIT
 */

import { CONFIG } from './config.js';
import { 
  setScene, setCamera, setRenderer, setClock, setRaycaster,
  scene, camera, renderer, clock, worldState, worldObjects, worldAnimals,
  interiorObjects, interiorAnimals, mobs, interactableObjects
} from './gameState.js';
import { createWorld, createLighting } from './world.js';
import { createInitialWorldObjects } from './worldObjects.js';
import { createInitialAnimals, updateAnimals } from './animals.js';
import { createInitialMobs, updateMobs } from './mobs.js';
import { createUIElements } from './ui.js';
import { createHands, updateHands } from './hands.js';
import { updatePlayer } from './player.js';
import { updateMount } from './mount.js';
import { updateDayNightCycle } from './dayNight.js';
import { updateObjectHighlight } from './building.js';
import { setupEventListeners, onWindowResize, removeEventListeners } from './input.js';
import { updateCameraRotation } from './camera.js';
import { disposeObject } from './utils.js';
import { updateHealthRegen } from './health.js';

/**
 * Initialize the game
 */
function init() {
  try {
    if (!window.THREE) {
      throw new Error('Three.js is not available on this page');
    }

    const webglSupported = (() => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    })();
    if (!webglSupported) {
      alert('WebGL is not supported in this browser. Please update or enable hardware acceleration.');
      return;
    }

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
  updateMount(delta);
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
  const collections = [worldObjects, interiorObjects, worldAnimals, interiorAnimals, mobs];
  collections.forEach(list => {
    list.forEach(disposeObject);
  });

  if (worldState.interiorGroup) {
    disposeObject(worldState.interiorGroup);
  }

  if (interactableObjects) {
    interactableObjects.children.slice().forEach(disposeObject);
  }
  
  // Dispose of renderer
  if (renderer) {
    if (renderer.renderLists?.dispose) {
      renderer.renderLists.dispose();
    }
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
