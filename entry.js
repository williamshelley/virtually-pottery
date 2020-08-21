import {
  createScene,
  createCamera,
  createRenderer,
  animate,
} from "./src/util/threejs_util.js";
import { animatePot, createPot, LAST_POT_STORAGE_KEY, updatePotFromStorage, createDefaultPot } from "./src/pot.js";

import "./assets/stylesheets/main.scss";
import createOptionsOverlay from "./src/options_overlay";
import * as THREE from "three";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  let scene = createScene();
  let camera = createCamera();
  let renderer = createRenderer();
  root.appendChild(renderer.domElement);

  // let pot = createPot({ radius: 5, numLevels: 20, camera });
  let pot = createDefaultPot(camera);
  let storedLastPot = localStorage.getItem(LAST_POT_STORAGE_KEY);
  if (storedLastPot) {
    storedLastPot = JSON.parse(storedLastPot);
    updatePotFromStorage(pot, storedLastPot);
  }

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