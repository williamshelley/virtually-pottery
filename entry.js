const {
  html,
  div,
  span,
  p,
  h1,
  h2,
  h3,
  createNode,
  divNode,
  spanNode,
  pNode,
  h1Node,
  h2Node,
  h3Node
} = require("./src/html_util.js");
const {
  createScene,
  createCamera,
  createRenderer,
  animate,
} = require("./src/util/threejs_util.js");

// var THREE = require('three'); // require peer dependency
// var initializeDomEvents = require('threex.domevents');
import * as THREE from "three";
// const initializeDomEvents = require("threex.domevents");
// import * as THREEx from "threex.domevents";

// const scene = new THREE.Scene();
// import "./assets/stylesheets/default.scss";

document.addEventListener("DOMContentLoaded", () => {


  const root = document.getElementById("root");

  var scene = createScene();
  var camera = createCamera();
  var renderer = createRenderer();
  var raycaster = new THREE.Raycaster();
  var eventListenerInfo = {
    raycaster,
    scene,
    camera
  };
  let loader = new THREE.TextureLoader();
  root.appendChild(renderer.domElement);


  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 3, 3),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

  scene.add(sphere);



  var points = [];
  for (let i = 0; i < 20; i++) {
    points.push(new THREE.Vector2(Math.sin(0.2) * 10 + 5, (i - 5)));
  }
  var latheGeo = new THREE.LatheGeometry(points);
  var material = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/images/earthenware.jpg")
  });
  var lathe = new THREE.Mesh(latheGeo, material);
  scene.add(lathe);
  lathe.onClick((obj, mouse) => {
    // console.log(lathe.geometry.vertices);
    // console.log(mouse);
  }, eventListenerInfo);

  lathe.position.y = -5;

  let radius = 0.1;

  let moving = false;
  let specialKeyDown = false;

  let dragVec = new THREE.Vector3();
  let dragPos = new THREE.Vector3();

  // console.log(lathe.geometry.vertices);

  let arrAmt = points.map(point => 1.0);
  let modifier = 0.02;

  //pedal

  function onDrag() {
    let pullSpeed = modifier;
    let pullDirection = (specialKeyDown ===  true) ? -1 : 1;
    dragVec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, sphere.position.z);

    dragVec.unproject(camera);

    dragVec.sub(camera.position).normalize();

    var distance = (sphere.position.z - camera.position.z) / dragVec.z;

    dragPos.copy(camera.position).add(dragVec.multiplyScalar(distance));

    // console.log(lathe.geometry.vertices);
    lathe.geometry.verticesNeedUpdate = true;
    // console.log(dragPos);
    for (let i = 0; i < lathe.geometry.vertices.length; i++) {
      if (dragPos.y <= lathe.geometry.vertices[i].y + 0.5 && dragPos.y >= lathe.geometry.vertices[i].y - 0.5) {
        var newPoints = [];
        for (var j = 0; j < 30; j++) {
          if (j !== i && j !== i - 1 && j !== i + 1) {
            newPoints.push(new THREE.Vector2(Math.sin(arrAmt[j] * 0.2) * 10 + 5, (j - 5)));
          } else {
            // arrAmt[i] += arrAmt[i] += pullDirection * pullSpeed;
            if (
              ((arrAmt[i] <=  10 && arrAmt[i] >= 0) || (arrAmt[i] > 10 && pullDirection < 0)) 
            ||
              ((arrAmt[i] >= 0 && arrAmt[i] <= 10) || (arrAmt[i] < 0 && pullDirection > 0))) {

              arrAmt[i] += pullDirection * pullSpeed;
              }
            newPoints.push(new THREE.Vector2(Math.sin(arrAmt[j] * 0.2) * 10 + 5, (j - 5)));
          }
        }
        lathe.geometry = new THREE.LatheGeometry(newPoints);
        // }
        // lathe.geometry.vertices[i].position = new THREE.Vector2(Math.sin(0.2 * 10 + 5, (i - 5) * 2));
        // lathe.geometry.vertices[ i ].y = dragPos.z;
      }
      // console.log(lathe);
    }
  }

  function mouseDrag(event) {
    // console.log("hallo");
    if (event.type === "keypress") {
      specialKeyDown = !specialKeyDown;
    }

    // if (event.type === "keyup") {
    //   specialKeyDown = false;
    // }

    if (event.type === "mousedown") {
      moving = true;
      onDrag();
    }
    if (event.type === "mouseup") {
      moving = false;
    }

    if (event.type === "mousemove" && moving) {
      // console.log("dragging");
      onDrag();
    }
  }
  // window.addEventListener("keydown", mouseDrag, false);
  window.addEventListener("keypress", mouseDrag, false);
  // window.addEventListener("keyup", mouseDrag, false);
  window.addEventListener("mousedown", mouseDrag, false);
  window.addEventListener("mouseup", mouseDrag, false);
  window.addEventListener("mousemove", mouseDrag, false);


  let mouse = new THREE.Vector2();
  let pos = new THREE.Vector3();
  sphere.position.z = -39;

  let vec = new THREE.Vector3();
  window.addEventListener("mousemove", event => {
    vec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, sphere.position.z);

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    var distance = (sphere.position.z - camera.position.z) / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));

    sphere.position.x = pos.x;
    sphere.position.y = pos.y;
    sphere.position.z = pos.z;
  });



  lathe.position.z = -40;

  function animateObjects() {
    lathe.rotation.y += 0.03;

  }

  window.scene = scene;
  animate(renderer, scene, camera, animateObjects);
})