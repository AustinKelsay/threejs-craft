/**
 * Player health management and UI hooks.
 * Health is expressed in whole-heart units for simplicity.
 */

import { CONFIG } from './config.js';
import { playerHealth, setPlayerHealth, playerMaxHealth, worldState } from './gameState.js';
import { updateHealthUI, triggerDamageFlash } from './ui.js';

let regenTimer = 0;

/**
 * Reset player health to maximum.
 */
export function resetPlayerHealth() {
  setPlayerHealth(playerMaxHealth);
  updateHealthUI();
}

/**
 * Apply damage to the player.
 * @param {number} amount - Whole-heart damage.
 * @param {string} source - Text label for debugging/logging.
 */
export function damagePlayer(amount, source = 'unknown') {
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
export function healPlayer(amount) {
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
export function updateHealthRegen(delta) {
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
