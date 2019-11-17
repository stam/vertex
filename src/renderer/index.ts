import * as Three from "three";
import meshStore from "../store/Mesh";
import { OrbitControls } from "three-orbitcontrols-ts";
import waveStore from "../store/Wave";

// const calculateBeatsAway = (start: number, bpm: number) => {
//   const current = new Date().getTime();

//   const diff = current - start;
//   const offset = 60000 / bpm;

//   return Math.floor(diff / offset);
// }

export class Renderer {
  renderer!: Three.WebGLRenderer;
  scene!: Three.Scene;
  camera!: Three.Camera;
  // meshes: Three.Mesh[] = [];

  frame = 0;

  // music sync
  beat = 0;
  bpm = 133;
  timestamp = new Date().getTime();

  initialize(canvas: HTMLCanvasElement) {
    this.setupScene(canvas);
    this.createMeshes();
    this.loadOutputs();
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
    for (const mesh of meshStore.meshes) {
      var geometry = new Three.BoxGeometry(1, 1, 1);
      var material = new Three.MeshNormalMaterial();
      var cube = new Three.Mesh(geometry, material);

      mesh.create(cube, this);
      // mesh._instance = cube;
      // mesh._renderer = this;
      // this.meshes.push(cube);
      this.scene.add(cube);
    }
  }

  loadOutputs() {
    for (const wave of waveStore.waves) {
      wave._renderer = this;
    }
  }

  updateSync(timestamp: number, bpm: number) {
    this.timestamp = timestamp;
    this.bpm = bpm;
  }

  updateBeat(beat: number) {
    this.beat = beat;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.frame += 0.02;

    // if (!waveStore.waves.length) {
    //   return;
    // }

    const wave = waveStore.waves[0];

    for (var mesh of meshStore.meshes) {
      if (!mesh._instance) {
        return;
      }

      // console.log("wave", wave.value);
      mesh.x = wave.value;
      // mesh.x += 0.02;
      // mesh.render(this);
      // mesh.position.x = this.beat - 2;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

const renderer = new Renderer();

export default renderer;
