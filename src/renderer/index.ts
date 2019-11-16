import * as Three from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

export default class Renderer {
  constructor(canvas: HTMLCanvasElement) {
    const { width, height } = canvas.getBoundingClientRect();
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new Three.WebGLRenderer({ canvas });
    console.log(width, height)
    renderer.setSize(width, height);
    var geometry = new Three.BoxGeometry(1, 1, 1);
    new OrbitControls(camera, renderer.domElement);
    const boxes: Three.Mesh[] = [];
    var numBoxes = 9;
    for (let x = -numBoxes; x <= numBoxes; x++) {
      for (let y = -numBoxes; y <= numBoxes; y++) {
        var material = new Three.MeshNormalMaterial();
        var cube = new Three.Mesh(geometry, material);
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
  }
}
