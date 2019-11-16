import * as Three from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

export default class Renderer {
  renderer!: Three.WebGLRenderer;
  scene!: Three.Scene;
  camera!: Three.Camera;
  meshes: Three.Mesh[] = [];

  step = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.setupScene(canvas);
    this.createMeshes();
    this.animate();
  }

  setupScene(canvas: HTMLCanvasElement) {
    const { width, height } = canvas.getBoundingClientRect();
    this.scene = new Three.Scene();

    const camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    this.camera = camera;

    const renderer = new Three.WebGLRenderer({ canvas });
    renderer.setSize(width, height);

    this.renderer = renderer;

    new OrbitControls(camera, renderer.domElement);
  }

  createMeshes() {
    var geometry = new Three.BoxGeometry(1, 1, 1);
    var material = new Three.MeshNormalMaterial();
    var cube = new Three.Mesh(geometry, material);
    this.meshes.push(cube);
    this.scene.add(cube);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.step += 0.01;
    for (var mesh of this.meshes) {
      var x = mesh.position.x;
      var y = mesh.position.y;

      mesh.position.z = Math.sin(this.step + Math.sqrt(x * x + y * y));
    }

    this.renderer.render(this.scene, this.camera);
  }
}
