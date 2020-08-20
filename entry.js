import {
  createScene,
  createCamera,
  createRenderer,
  animate
} from "./src/util/threejs_util.js";
import { animatePot, createPot } from "./src/pot.js";
import { createSidebar } from "./src/sidebar.js";
import { createColorPalette } from "./src/color_palette";
import { createHeightSlider } from "./src/height_slider.js";

import "./assets/stylesheets/main.scss";
import { createInfoOverlay } from "./src/info.js";
import createOptionsOverlay from "./src/options_overlay";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  var scene = createScene();
  var camera = createCamera();
  var renderer = createRenderer();

  root.appendChild(renderer.domElement);


  let pot = createPot({ radius: 5, numLevels: 20, camera });
  scene.add(pot);

  const optionsOverlay = createOptionsOverlay(pot);
  root.appendChild(optionsOverlay);

  window.addEventListener("resize", () => {
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth / window.innerHeight;
    
    scene.children.forEach(obj => {
      obj.camera = camera;
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const stopTextSelection = function () {
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  } 

  window.addEventListener("mousemove", e => {
    stopTextSelection();
  });

  const _animateScene = () => {
    animatePot(pot);
  }

  animate(renderer, scene, camera, _animateScene);
})