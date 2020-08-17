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
  for (var i = 0; i < 10; i++) {
    points.push(new THREE.Vector2(Math.sin(0.2) * 10 + 5, (i - 5) * 2));
  }
  var geometry = new THREE.LatheGeometry(points);
  var material = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/images/earthenware.jpg")
  });
  var lathe = new THREE.Mesh(geometry, material);
  scene.add(lathe);
  lathe.onClick((obj, mouse) => {
    // console.log(lathe.geometry.vertices);
    // console.log(mouse);
  }, eventListenerInfo);

  let radius = 0.1;

  let moving = false

  let dragVec = new THREE.Vector3();
  let dragPos = new THREE.Vector3();

  function onDrag() {
    dragVec.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, sphere.position.z);
      
    dragVec.unproject(camera);
    
    dragVec.sub(camera.position).normalize();
    
    var distance = (sphere.position.z - camera.position.z) / dragVec.z;
    
    dragPos.copy(camera.position).add(dragVec.multiplyScalar(distance));
    
    console.log(dragPos);
  }

  function mouseDrag(event) {
    // console.log("hallo");
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

    // if (event.type === "mousedown") {


    // }
    // for (let i = 0; i < circle.geometry.vertices.length; i++) {
    // for (let j = 0; j < lathe.geometry.vertices.length; j++) {

      // for (var vertexIndex = 0; vertexIndex < lathe.geometry.vertices.length; vertexIndex++) {
      //   var localVertex = lathe.geometry.vertices[vertexIndex].clone();
      //   var globalVertex = localVertex.applyMatrix4(lathe.matrix);
      //   var directionVector = globalVertex.sub(lathe.position);

      //   var ray = new THREE.Raycaster(lathe.position, directionVector.clone().normalize());
      //   var collisionResults = ray.intersectObjects(scene.children);
      //   if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      //     console.log(globalVertex);
      //   }
      // }
    // }
  }
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
    lathe.rotation.y += 0.01;

  }

  window.scene = scene;
  animate(renderer, scene, camera, animateObjects);
})