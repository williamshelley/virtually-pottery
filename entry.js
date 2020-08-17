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
  // var THREEx = {};
  // initializeDomEvents(THREE, THREEx);
  // console.log(initializeDomEvents);

  const root = document.getElementById("root");
  // root.innerHTML += div({
  //   children: [
  //     h1({
  //       children: ["h1", "Testing", "1", "2", p({
  //         children: ["3"]
  //       })]
  //     }),
  //     h2({
  //       children: ["h2"]
  //     }),
  //     h3({
  //       children: ["h3"]
  //     })
  //   ]
  // });

  // let c1 = h3Node({
  //   innerText: "h3 child of h1"
  // });
  // let c2 = h3Node({
  //   innerText: "h3 child of h1"
  // });
  // let c3 = h3Node({
  //   innerText: "h3 child of h1"
  // });
  // let h1Child = divNode({
  //   innerText: "This is an h1 child!",
  //   children: [c1, c2, c3]
  // });

  // h1Child.addEventListener("click", () => console.log("hello"))

  // root.appendChild(h1Child);

  var scene = createScene();
  var camera = createCamera();
  var renderer = createRenderer();
  const loader = new THREE.TextureLoader();

  let shelfLength = 50;
  let shelfHeight = 32;

  let rightShelfGeo = new THREE.PlaneGeometry(shelfLength, 20, shelfHeight);
  let leftShelfGeo = new THREE.PlaneGeometry(shelfLength, 20, shelfHeight);

  var shelfMat = new THREE.MeshBasicMaterial({
    map: loader.load('assets/images/empty_shelf.jpg'),
  });

  let initialShelfTranslationZ = -10;
  let initialShelfTranslationX = 8
  let initialShelfRotationY = 1.5

  let rightShelf = new THREE.Mesh(rightShelfGeo, shelfMat);
  rightShelf.translateZ(initialShelfTranslationZ);
  rightShelf.translateX(initialShelfTranslationX);
  rightShelf.rotation.y = -initialShelfRotationY;
  
  let leftShelf = new THREE.Mesh(leftShelfGeo, shelfMat);
  leftShelf.translateZ(initialShelfTranslationZ);
  leftShelf.translateX(-initialShelfTranslationX);
  leftShelf.rotation.y = initialShelfRotationY;


  var cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

  var raycaster = new THREE.Raycaster();
  var eventListenerInfo = {
    raycaster,
    scene,
    camera
  };

  cube.position.z = -10;
  cube.value = "YAY!";
  scene.add(cube);
  scene.add(rightShelf);
  scene.add(leftShelf);

  root.appendChild(renderer.domElement);

  cube.onClick(obj => alert("cube"), eventListenerInfo);
  rightShelf.onClick(obj => alert("right shelf"), eventListenerInfo);
  leftShelf.onClick(obj => alert("left shelf"), eventListenerInfo);

  function animateObjects() {
    cube.rotation.y += 0.01;
  }

  window.scene = scene;
  animate(renderer, scene, camera, animateObjects);
})