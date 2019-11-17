import * as Three from "three";
import meshStore, { Mesh } from "../store/Mesh";
import { OrbitControls } from "three-orbitcontrols-ts";
import inputStore from "../store/Output";
import { observable } from "mobx";

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

  @observable frame = 0;

  // music sync
  beat = 0;
  bpm = 133;
  timestamp = new Date().getTime();

  initialize(canvas: HTMLCanvasElement) {
    this.setupScene(canvas);
    this.initStores();
    this.applyConfig();
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

  initStores() {
    meshStore._renderer = this;
    inputStore._renderer = this;

    for (const mesh of meshStore.meshes) {
      this.initMesh(mesh);
    }

    for (const wave of inputStore.waves) {
      wave._renderer = this;
    }
  }

  initMesh(mesh: Mesh) {
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 0xffffff });
    const cube = new Three.Mesh(geometry, material);

    mesh.create(cube, this);
    this.scene.add(cube);
  }

  applyConfig() {
    const input = inputStore.waves[0];

    if (!input) {
      return;
    }
    meshStore.meshes[0].setInput(input, "x");
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
    this.renderer.render(this.scene, this.camera);
  }
}

const renderer = new Renderer();

export default renderer;
