import * as THREE from "three";

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
    createPotPoint({
      radius,
      level: i,
      callback,
      numLevels
    });
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

  let isMoving = false;
  let keyDown = false;
  const mouseDrag = onDrag({
    pot,
    keyDown,
    isMoving,
    camera
  });
  window.addEventListener("mousedown", mouseDrag, false);
  window.addEventListener("mouseup", mouseDrag, false);
  window.addEventListener("mousemove", mouseDrag, false);

  return pot;
}

export const animatePot = (pot, rotationSpeed = 0.03) => {
  pot.rotation.y += rotationSpeed;
}

export const makePull = ({
  pot,
  event,
  camera
}) => {
  let dragVec = new THREE.Vector3();
  let dragPos = new THREE.Vector3();
  let {
    numLevels,
    deltaPerLevel,
    maxWidth,
    minWidth,
    pullDirection,
    pullSpeed
  } = pot;

  dragVec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, pot.position.z);


  dragVec.unproject(camera);

  dragVec.sub(camera.position).normalize();

  var distance = (pot.position.z - camera.position.z) / dragVec.z;

  dragPos.copy(camera.position).add(dragVec.multiplyScalar(distance));

  let pointsToModify = new Set();
  pot.geometry.verticesNeedUpdate = true;

  for (let i = 0; i < pot.geometry.vertices.length; i++) {
    if (dragPos.y <= pot.geometry.vertices[i].y + 1.5 && dragPos.y >= pot.geometry.vertices[i].y - 1.5) {
      pointsToModify.add(i);
    }
  }

  let newPoints = [];
  const callback = point => newPoints.push(point);
  for (var i = 0; i < numLevels; i++) {
    if (pointsToModify.has(i)) {
      let amtToAdd = pullDirection * pullSpeed;
      let newDelta = deltaPerLevel[i] + amtToAdd;

      if (newDelta < maxWidth && newDelta > minWidth) {
        pot.deltaPerLevel[i] = newDelta;
      }

      createPotPoint({
        pot,
        level: i,
        callback,
        curve: deltaPerLevel[i]
      });
    } else {
      createPotPoint({
        pot,
        level: i,
        callback,
        curve: deltaPerLevel[i]
      });
    }
  }

  pot.geometry = new THREE.LatheGeometry(newPoints, pot.numPointsPerLevel);
}

export const onDrag = ({
  pot,
  isMoving,
  camera
}) => {
  return event => {
    if (event.type === "mousedown") {
      isMoving = true;
    }

    if (event.type === "mouseup") {
      isMoving = false;
    }

    if (event.type === "mousemove" && isMoving) {
      makePull({
        pot,
        event,
        camera
      })
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