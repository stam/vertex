import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
var controls = new OrbitControls(camera, renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
document.body.appendChild(renderer.domElement);

const boxes : THREE.Mesh[] = [];
var numBoxes = 9;
for (let x = -numBoxes; x <= numBoxes; x++) {
  for (let y = -numBoxes; y <= numBoxes; y++) {
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = x * 1.1;
    cube.position.y = y * 1.1;
    boxes.push(cube);
    scene.add(cube);
  }
}

var step = 0;

var animate = function() {
  requestAnimationFrame(animate);

  // work through each box
  for (var box of boxes) {
    step += 0.0001;

    var x = box.position.x;
    var y = box.position.y;

    box.position.z = Math.sin(step + Math.sqrt(x * x + y * y));
  }

  renderer.render(scene, camera);
};

animate();
