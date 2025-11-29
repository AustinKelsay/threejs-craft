/**
 * Resource registry and shared inventory helpers.
 * Extend RESOURCE_DEFINITIONS to introduce new collectible resources.
 */

/**
 * Central list of supported resources.
 * Each entry can carry presentation data and future limits.
 */
export const RESOURCE_DEFINITIONS = {
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
export function createEmptyInventory() {
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
export function isValidResource(resourceType) {
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
export function addToInventory(inventory, resourceType, amount = 1) {
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
export function removeFromInventory(inventory, resourceType, amount = 1) {
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
export function hasResource(inventory, resourceType, amount = 1) {
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
export function getResourceAmount(inventory, resourceType) {
  ensureResourceSlot(inventory, resourceType);
  return inventory[resourceType];
}

/**
 * Retrieves the configured stack limit for a resource.
 * @param {string} resourceType
 * @returns {number}
 */
export function getStackLimit(resourceType) {
  return RESOURCE_DEFINITIONS[resourceType]?.maxStack ?? Number.POSITIVE_INFINITY;
}

/**
 * Friendly display label for a resource id.
 * @param {string} resourceType
 * @returns {string}
 */
export function getResourceLabel(resourceType) {
  const definition = RESOURCE_DEFINITIONS[resourceType];
  if (definition?.label) return definition.label;
  return resourceType ? resourceType.charAt(0).toUpperCase() + resourceType.slice(1) : '';
}

/**
 * Icon to render alongside a resource.
 * @param {string} resourceType
 * @returns {string}
 */
export function getResourceIcon(resourceType) {
  return RESOURCE_DEFINITIONS[resourceType]?.icon || '📦';
}

/**
 * Returns inventory entries in registry order (stable for UI display).
 * Unknown resources are appended to the end.
 * @param {Object} inventory
 * @returns {Array<[string, number]>}
 */
export function getInventoryEntries(inventory) {
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
