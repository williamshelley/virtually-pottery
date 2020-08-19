import {
  createScene,
  createCamera,
  createRenderer,
  animate
} from "./src/util/threejs_util.js";
import { animatePot, createPot } from "./src/pot.js";
import { createSidebar } from "./src/options_sidebar.js";
import { createColorPalette } from "./src/color_palette";
import { createHeightSlider } from "./src/height_slider.js";

import "./assets/stylesheets/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  var scene = createScene();
  var camera = createCamera();
  var renderer = createRenderer();

  // add instructions
  root.appendChild(renderer.domElement);


  let pot = createPot({ radius: 5, numLevels: 20, camera });
  scene.add(pot);
  
  const sidebar = createSidebar(pot);
  const colorPalette = createColorPalette(pot);
  const heightSlider = createHeightSlider(pot);
  root.appendChild(sidebar);
  root.appendChild(colorPalette);
  root.appendChild(heightSlider);

  const _animateScene = () => {
    animatePot(pot, 0.03);
  }

  animate(renderer, scene, camera, _animateScene);
})