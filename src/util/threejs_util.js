import * as THREE from 'three';

export function createScene() {
  return new THREE.Scene();
}

export function createCamera() {
  // FOV, AR, Near, Far
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  return camera;
}

export function createRenderer() {
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#webgl-canvas"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

export function animate(renderer, scene, camera, action) {
  let _animate = animate.bind(this, renderer, scene, camera, action);
  action({ scene, camera });
//   setTimeout( function() {
  requestAnimationFrame( _animate );
  // }, 1000 / 900 );
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