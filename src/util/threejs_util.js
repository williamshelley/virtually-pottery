import * as THREE from 'three';
import * as COLORS from './colors';

export function createScene() {
  let scene = new THREE.Scene();
  scene.background = COLORS.SANDSTONE;
  return scene;
}

export function createCamera() {
  // FOV, AR, Near, Far
  const aspectRatio = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.lookAt(new THREE.Vector3(0,0,0));
  camera.position.y = 10;
  camera.position.z = 80;
  return camera;
}

export function createRenderer() {
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#main-canvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

export function animate(renderer, scene, camera, action) {
  let _animate = animate.bind(this, renderer, scene, camera, action);
  action({ scene, camera });
  requestAnimationFrame( _animate );
  renderer.render(scene, camera);
}

const onMove = function(action, { raycaster, scene, camera }) {
  let mouse = new THREE.Vector2();
  window.addEventListener("mousemove", event => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    for ( let i = 0; i < intersects.length; i++ ) {
      if (intersects[i].object.uuid === this.uuid) {
        action(this, mouse);
      }
    }
  })
}

const onClick = function(action, { raycaster, scene, camera }) {
  let mouse = new THREE.Vector2();
  window.addEventListener("click", event => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    for ( let i = 0; i < intersects.length; i++ ) {
      if (intersects[i].object.uuid === this.uuid) {
        action(this, mouse);
      }
    }
  });
}

THREE.Mesh.prototype.onClick = onClick;

THREE.Mesh.prototype.onMove = onMove;