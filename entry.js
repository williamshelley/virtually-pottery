import {
  animatePot,
  createPot,
} from "./src/pot.js";
import {
  createSidebar
} from "./src/options_sidebar.js";
import {
  createScene,
  createCamera,
  createRenderer,
  animate
} from "./src/util/threejs_util.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  var scene = createScene();
  var camera = createCamera();
  var renderer = createRenderer();
  root.appendChild(renderer.domElement);


  let pot = createPot({
    radius: 5,
    numLevels: 20,
    camera
  });
  scene.add(pot);
  const sidebar = createSidebar(pot);
  root.appendChild(sidebar);

  const _animateScene = () => {
    animatePot(pot, 0.03);
  }

  animate(renderer, scene, camera, _animateScene);
})