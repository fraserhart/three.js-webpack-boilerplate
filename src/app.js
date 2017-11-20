import * as THREE from 'three';
import './assets/scss/styles.scss';
import line from './objects/line';
import cube from './objects/cube';
import chopper from './assets/chopper/chopper.json';

const StereoEffect = require('three-stereo-effect')(THREE);

let fovMultiplier = 0.99;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const stereoEffect = new StereoEffect(renderer);
stereoEffect.eyeSeparation = 1;
stereoEffect.setSize(window.innerWidth, window.innerHeight);

const loader = new THREE.ObjectLoader();
const model = loader.parse(chopper);
model.scale.set(3, 3, 3);

scene.add(model);

scene.add(cube);

scene.add(line);

const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.03;
  cube.rotation.y += 0.03;

  line.rotation.y += 0.03;

  if (camera.fov < 15) {
    fovMultiplier = 1.01;
  } else if (camera.fov > 35) {
    fovMultiplier = 0.99;
  }

  camera.fov *= fovMultiplier;
  camera.updateProjectionMatrix();

  stereoEffect.render(scene, camera);
};


animate();
