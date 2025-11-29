/**
 * Utility functions for the game
 */

/**
 * Properly dispose of Three.js objects to prevent memory leaks
 * @param {THREE.Object3D} object - The object to dispose
 */
export function disposeObject(object) {
  if (!object) return;

  // Track already-disposed materials to avoid double-dispose on shared refs
  const disposedMaterials = new Set();

  const disposeMaterial = (material) => {
    if (!material || disposedMaterials.has(material)) return;
    // Dispose textures
    for (const prop in material) {
      if (material[prop] && material[prop].isTexture) {
        material[prop].dispose();
      }
    }
    material.dispose();
    disposedMaterials.add(material);
  };
  
  object.traverse(child => {
    if (!child.isMesh) return;

    // Dispose geometry
    if (child.geometry) {
      child.geometry.dispose();
    }
    
    // Collect all materials that might have been cached on the mesh
    const materials = [];
    const baseMaterial = child.material;
    if (baseMaterial) {
      if (Array.isArray(baseMaterial)) {
        materials.push(...baseMaterial);
      } else {
        materials.push(baseMaterial);
      }
    }

    // Cached highlight/base materials created by the highlight system
    if (child.userData) {
      const { highlightMaterial, baseMaterial: cachedBase } = child.userData;
      if (highlightMaterial) materials.push(highlightMaterial);
      if (cachedBase && cachedBase !== baseMaterial) materials.push(cachedBase);
      // Clear references to help GC
      child.userData.highlightMaterial = null;
      child.userData.baseMaterial = null;
      child.userData.baseEmissive = null;
      child.userData.baseEmissiveIntensity = null;
    }

    materials.forEach(disposeMaterial);
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
export function findParentObject(mesh) {
  let current = mesh;
  while (current && !current.userData.type) {
    current = current.parent;
  }
  return current;
}
