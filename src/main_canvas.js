import * as THREE from "three";

const createPotPoint = ({
  pot,
  numLevels,
  radius,
  level,
  callback,
  curve = 1
}) => {
  if (pot) {
    radius = pot.radius;
    numLevels = pot.numLevels;
  }

  let x = Math.sin(curve * 0.2) * numLevels + radius;
  let point = new THREE.Vector2(x, (level - radius) - numLevels / 2);
  callback(point);
}

export function createPot({
  radius,
  numLevels,
  camera,
  zPosition = -40,
  pullSpeed = 0.01,
  maxWidth = 10,
  minWidth = 0
}) {
  const loader = new THREE.TextureLoader();
  let points = [];

  function callback(point) {
    points.push(point);
  }
  for (let i = 0; i < numLevels; i++) {
    createPotPoint({
      radius,
      level: i,
      callback,
      numLevels
    })
  }

  let potGeo = new THREE.LatheGeometry(points);
  let potMat = new THREE.MeshBasicMaterial({
    map: loader.load("../assets/images/earthenware.jpg")
  });
  let pot = new THREE.Mesh(potGeo, potMat);

  pot.radius = radius;
  pot.numLevels = numLevels;
  pot.deltaPerLevel = points.map(() => 1.0);
  pot.pullSpeed = pullSpeed;
  pot.maxWidth = maxWidth;
  pot.minWidth = minWidth;
  pot.position.z = zPosition;

  let isMoving = false;
  let keyDown = false;
  const mouseDrag = onDrag({ pot, keyDown, isMoving, camera });
  window.addEventListener("keypress", mouseDrag, false);
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
  keyDown,
  camera
}) => {
  let dragVec = new THREE.Vector3();
  let dragPos = new THREE.Vector3();
  let {
    numLevels,
    deltaPerLevel,
    maxWidth,
    minWidth
  } = pot;

  let pullDirection = (keyDown === true) ? -1 : 1;
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
      let amtToAdd = pullDirection * pot.pullSpeed;
      let newDelta = deltaPerLevel[i] + amtToAdd;

      if (newDelta < maxWidth && newDelta > minWidth) {
        pot.deltaPerLevel[i] = newDelta;
      }

      createPotPoint({
        pot,
        level: i,
        callback,
        curve: deltaPerLevel[i]
      })
    } else {
      createPotPoint({
        pot,
        level: i,
        callback,
        curve: deltaPerLevel[i]
      })
    }
  }
  pot.geometry = new THREE.LatheGeometry(newPoints);
}

export const onDrag = ({ pot, keyDown, isMoving, camera }) => {
  return event => {

    if (event.type === "keypress") {
      keyDown = !keyDown;
    }
    
    if (event.type === "mousedown") {
      isMoving = true;
    }

    if (event.type === "mouseup") {
      isMoving = false;
    }
    
    if (event.type === "mousemove" && isMoving) {
      makePull({ pot, keyDown, event, camera })
    }
  }
}

Number.prototype.between = (num, min, max) => {
  return num >= min && num <= max;
}

THREE.Mesh.prototype.changeMaterial = function(newMaterialUrl) {
  const loader = new THREE.TextureLoader();
  const newMaterial = new THREE.MeshBasicMaterial({
    map: loader.load(newMaterialUrl)
  });

  this.material = newMaterial;
}