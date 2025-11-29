/**
 * UI elements creation and management
 */

import { CONFIG } from './config.js';
import { uiElements, selectedObjectType, worldState, buildableTypes, interiorBuildableTypes, inventory, inventoryOpen, selectedInventoryResource, setSelectedInventoryResource, playerHealth, playerMaxHealth } from './gameState.js';
import { getResourceIcon, getResourceLabel, getInventoryEntries } from './resources.js';

let damageFlashTimeout = null;

/**
 * Create all UI elements for the game
 */
export function createUIElements() {
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
export function updateSelectorContent() {
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
export function triggerDamageFlash(durationMs = 500) {
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
export function updateHealthUI() {
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
export function updateObjectSelector() {
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
export function updateSaveStatus(message, color = 'white') {
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
export function toggleInventory() {
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
export function updateInventoryDisplay() {
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
