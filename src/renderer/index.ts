import * as Three from "three";
import { OrbitControls } from "three-orbitcontrols-ts";


// const calculateBeatsAway = (start: number, bpm: number) => {
//   const current = new Date().getTime();

//   const diff = current - start;
//   const offset = 60000 / bpm;

//   return Math.floor(diff / offset);
// }

export default class Renderer {
  renderer!: Three.WebGLRenderer;
  scene!: Three.Scene;
  camera!: Three.Camera;
  meshes: Three.Mesh[] = [];

  frame = 0;

  // music sync
  beat = 0;
  bpm = 133;
  timestamp = new Date().getTime();

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

  updateSync(timestamp: number, bpm: number) {
    console.log('updateSync', timestamp, bpm);
    this.timestamp = timestamp;
    this.bpm = bpm;
  }

  updateBeat(beat: number) {
    this.beat = beat;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // const beat = calculateBeatsAway(this.timestamp, this.bpm) % 4;
    this.frame += 0.02;

    for (var mesh of this.meshes) {
      // var x = mesh.position.x;
      // var y = mesh.position.y;

      mesh.position.x = this.beat - 2;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
