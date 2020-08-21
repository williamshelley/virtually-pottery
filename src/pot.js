import * as THREE from "three";
import { updateSaveStatusIndicator } from "./save_status_indicator";
import { merge } from "lodash";

export const LAST_POT_STORAGE_KEY = "LAST_POT_STORAGE_KEY";

const DEFAULT_POT = {
  radius: 5,
  numLevels: 20,
}

const SAVE_DELAY = 500;

export const createDefaultPot = (camera) => {
  return createPot(merge({}, DEFAULT_POT, { camera }));
}

// creates a vector2 point and passes it to callback
const createPotPoint = ({
  pot,
  numLevels,
  radius,
  level,
  callback,
  baseRadius = 0.2,
  curve = 1,
  yOffsetDivisor = 2,
  currentPoint,
}) => {
  if (pot) {
    baseRadius = pot.baseRadius;
    radius = pot.radius;
    numLevels = pot.numLevels;
  }

  let x = Math.sin(curve * baseRadius) * numLevels + radius;
  x = currentPoint ? currentPoint.x : x;
  let y = (level - radius) - (numLevels / yOffsetDivisor);
  let point = new THREE.Vector2(x, y);
  callback(point);
}

const updatePotGeometry = pot => {
  return () => {
    let points = [];
    const callback = point => points.push(point);
    for (let i = 0; i < pot.numLevels; i++) {
      if (pot.currentPoints[i]) {
        const currentPoint  = pot.currentPoints[i];
        createPotPoint({ pot, level: i, callback, currentPoint });
      } else {
        createPotPoint({ pot, level: i, callback });
      }
    }

    pot.geometry = new THREE.LatheGeometry(points, pot.numPointsPerLevel);
  }
}

// initialization returns a mesh object with LatheGeometry and texture
export function createPot({
  radius,
  numLevels,
  camera,
  baseRadius = 0.2,
  pullSpeed = 0.01,
  maxWidth = 3,
  minWidth = 0,
  maxLevels = 40,
  minLevels = 5,
  numPointsPerLevel = 20,
}) {
  const loader = new THREE.TextureLoader();
  let points = [];

  if (numLevels > maxLevels) {
    numLevels = maxLevels;
  } else if (numLevels < minLevels) {
    numLevels = minLevels;
  }

  function callback(point) {
    points.push(point);
  }

  for (let i = 0; i < numLevels; i++) {
    createPotPoint({ radius, level: i, callback, numLevels });
  }

  while (points.length < maxLevels) {
    points.push(new THREE.Vector2());
  }

  let potGeo = new THREE.LatheGeometry(points, numPointsPerLevel);
  let potMat = new THREE.MeshBasicMaterial({
    map: loader.load("../assets/images/earthenware.jpg"),
    side: THREE.DoubleSide
  });
  let pot = new THREE.Mesh(potGeo, potMat);

  pot.baseRadius = baseRadius;
  pot.numPointsPerLevel = numPointsPerLevel;
  pot.camera = camera;
  pot.radius = radius;
  pot.numLevels = numLevels;
  pot.deltaPerLevel = points.map(() => 1.0);
  pot.pullSpeed = pullSpeed;
  pot.maxWidth = maxWidth;
  pot.minWidth = minWidth;
  pot.pullDirection = -1;
  pot.smooth = false;
  pot.updateGeometry = updatePotGeometry(pot);
  pot.currentPoints = points;
  pot.saveTimer = null;
  pot.saveWaitTime = 250;
  pot.saved = true;
  pot.isDragging = false;

  let isMoving = false;
  let keyDown = false;
  const mouseDrag = onDrag({ pot, keyDown, isMoving });


  window.addEventListener("mousedown", mouseDrag, false);
  window.addEventListener("mouseup", mouseDrag, false);
  window.addEventListener("mousemove", mouseDrag, false);

  const _autosave = autosave.bind(this, pot);
  pot.saveTimer = setInterval(_autosave, SAVE_DELAY);

  return pot;
}

const autosave = (pot) => {
  if (!pot.saved  && !window.isDragging && !window.isClicking) {
    save(pot);
    pot.saved = true;
  }
}

export const animatePot = (pot) => {
  pot.rotation.y += pot.pullSpeed * 10;
}

// Wall smoothing based on average of point below and point above mouse pointer
export const smoothWallPoints = (i, pot) => {
  let { deltaPerLevel, numLevels, pullSpeed, maxWidth, minWidth } = pot;
  const range = 1;
  if (i >= range && i < numLevels - range) {
    let amtToAdd = pullSpeed;
    let newDelta = deltaPerLevel[i] + amtToAdd;
    let avgDeltaSum = newDelta;
    let numElements = 1;

    for (let r = i - range; r < i + range + 1; r++) {
      numElements++;
      avgDeltaSum += pot.deltaPerLevel[r];
    }

    let avgDelta = avgDeltaSum / (range * numElements);

    if (avgDelta < maxWidth && avgDelta > minWidth) {
      pot.deltaPerLevel[i] = avgDelta;
    }
  }
}


// Pull wall based on pullDirection
export const pullWallPoints = (i, pot) => {
  let { deltaPerLevel, pullDirection, pullSpeed, maxWidth, minWidth } = pot;
  let amtToAdd = pullDirection * pullSpeed;
  let newDelta = deltaPerLevel[i] + amtToAdd;
  
  if (newDelta < maxWidth && newDelta > minWidth) {
    pot.deltaPerLevel[i] = newDelta;
  }
}

export const updatePotFromStorage = (currentPot, storedPot) => {
  const { currentPoints, numLevels, deltaPerLevel, baseRadius } = storedPot;

  if (currentPoints && numLevels && deltaPerLevel && baseRadius) {
    currentPot.geometry = new THREE.LatheGeometry(currentPoints, numLevels);
    currentPot.deltaPerLevel = deltaPerLevel;
    currentPot.numLevels = numLevels;
    currentPot.baseRadius = baseRadius;
    currentPot.currentPoints = currentPoints;
  }
}


// returns current mousePosition
export const getMousePosition = (pot, event) => {
  let { camera } = pot;

  let dragVec = new THREE.Vector3();
  let dragPos = new THREE.Vector3();

  dragVec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, pot.position.z);

  dragVec.unproject(camera);
  dragVec.sub(camera.position).normalize();
  var distance = (pot.position.z - camera.position.z) / dragVec.z;
  dragPos.copy(camera.position).add(dragVec.multiplyScalar(distance));

  return dragPos;
}

export const bundle = pot => {
  const { material, numLevels, currentPoints, deltaPerLevel, baseRadius } = pot;

  return {
    material, numLevels, currentPoints, deltaPerLevel, baseRadius
  }
}

export const alterWall = ({ pot, event }) => {
  console.log("edit pot")
  edit(pot);

  let { numLevels, deltaPerLevel, smooth, camera } = pot;
  let pointsToModify = new Set();
  const mousePos = getMousePosition(pot, event, camera);

  for (let i = 0; i < pot.geometry.vertices.length; i++) {
    if (mousePos.y <= pot.geometry.vertices[i].y + 1.5 && mousePos.y >= pot.geometry.vertices[i].y - 1.5) {
      pointsToModify.add(i);
    }
  }

  let newPoints = [];
  const callback = point => newPoints.push(point);

  for (let i = 0; i < numLevels; i++) {
    if (pointsToModify.has(i)) {
      if (!smooth) { pullWallPoints(i, pot); } 
      else { smoothWallPoints(i, pot); }

      createPotPoint({ pot, level: i, callback, curve: deltaPerLevel[i] });
    } else {
      createPotPoint({ pot, level: i, callback, curve: deltaPerLevel[i] });
    }
  }

  pot.currentPoints = newPoints;
  pot.geometry = new THREE.LatheGeometry(newPoints, pot.numPointsPerLevel);
  // pot.currentPoints = JSON.parse(JSON.stringify(pot.geometry));
}



export const onDrag = ({ pot, isMoving }) => {
  return event => {
    if (event.type === "mousedown") { 
      isMoving = true; 
      window.isClicking = true;
    }
    if (event.type === "mouseup") { 
      isMoving = false; 
      window.isDragging = false;
      window.isClicking = false;
    }
    if (event.type === "mousemove" && isMoving) {
      window.isDragging = true;
      updateSaveStatusIndicator(pot)
      alterWall({ pot, event });
    }
  }
}

Number.prototype.between = (num, min, max) => {
  return num >= min && num <= max;
}

const save = (pot) => {
  pot.saved = true;
  updateSaveStatusIndicator(pot);
  localStorage.setItem(LAST_POT_STORAGE_KEY, JSON.stringify(bundle(pot)));
}

const edit = (pot) => {
  pot.saved = false;
  updateSaveStatusIndicator(pot);
}

THREE.Mesh.prototype.save = function() {
  save(this);
}

THREE.Mesh.prototype.changeMaterial = function (newMaterialUrl) {
  const loader = new THREE.TextureLoader();
  const newMaterial = new THREE.MeshBasicMaterial({
    map: loader.load(newMaterialUrl),
    side: THREE.DoubleSide
  });

  this.material = newMaterial;
}