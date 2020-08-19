import * as THREE from "three";

// creates a vector2 point and passes it to callback
const createPotPoint = ({
  pot,
  numLevels,
  radius,
  level,
  callback,
  curve = 1,
  yOffsetDivisor = 2
}) => {
  if (pot) {
    radius = pot.radius;
    numLevels = pot.numLevels;
  }

  let x = Math.sin(curve * 0.2) * numLevels + radius;
  let y = (level - radius) - (numLevels / yOffsetDivisor);
  let point = new THREE.Vector2(x, y);
  callback(point);
}

// initialization returns a mesh object with LatheGeometry and texture
export function createPot({
  radius,
  numLevels,
  camera,
  zPosition = -40,
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
    map: loader.load("../assets/images/earthenware.jpg")
  });
  let pot = new THREE.Mesh(potGeo, potMat);

  pot.numPointsPerLevel = numPointsPerLevel;
  pot.camera = camera;
  pot.radius = radius;
  pot.numLevels = numLevels;
  pot.deltaPerLevel = points.map(() => 1.0);
  pot.pullSpeed = pullSpeed;
  pot.maxWidth = maxWidth;
  pot.minWidth = minWidth;
  pot.position.z = zPosition - numLevels;
  pot.pullDirection = -1;
  pot.smooth = false;

  let isMoving = false;
  let keyDown = false;
  const mouseDrag = onDrag({ pot, keyDown, isMoving });

  window.addEventListener("mousedown", mouseDrag, false);
  window.addEventListener("mouseup", mouseDrag, false);
  window.addEventListener("mousemove", mouseDrag, false);

  return pot;
}

export const animatePot = (pot, rotationSpeed = 0.03) => {
  pot.rotation.y += rotationSpeed;
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

export const alterWall = ({ pot, event }) => {
  let { numLevels, deltaPerLevel, smooth, camera } = pot;
  let pointsToModify = new Set();
  const mousePos = getMousePosition(pot, event, camera);

  pot.geometry.verticesNeedUpdate = true;
  for (let i = 0; i < pot.geometry.vertices.length; i++) {
    if (mousePos.y <= pot.geometry.vertices[i].y + 1.5 && mousePos.y >= pot.geometry.vertices[i].y - 1.5) {
      pointsToModify.add(i);
    }
  }

  let newPoints = [];
  const callback = point => newPoints.push(point);

  for (var i = 0; i < numLevels; i++) {
    if (pointsToModify.has(i)) {
      if (!smooth) { pullWallPoints(i, pot); } 
      else { smoothWallPoints(i, pot); }

      createPotPoint({ pot, level: i, callback, curve: deltaPerLevel[i] });
    } else {
      createPotPoint({ pot, level: i, callback, curve: deltaPerLevel[i] });
    }
  }

  pot.geometry = new THREE.LatheGeometry(newPoints, pot.numPointsPerLevel);
}



export const onDrag = ({ pot, isMoving }) => {
  return event => {
    if (event.type === "mousedown") { isMoving = true; }
    if (event.type === "mouseup") { isMoving = false; }
    if (event.type === "mousemove" && isMoving) {
      alterWall({ pot, event });
    }
  }
}

Number.prototype.between = (num, min, max) => {
  return num >= min && num <= max;
}

THREE.Mesh.prototype.changeMaterial = function (newMaterialUrl) {
  const loader = new THREE.TextureLoader();
  const newMaterial = new THREE.MeshBasicMaterial({
    map: loader.load(newMaterialUrl)
  });

  this.material = newMaterial;
}