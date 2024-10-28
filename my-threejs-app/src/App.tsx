import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const App = () => {
  useEffect(() => {
    // 씬, 카메라, 렌더러 생성
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // 배경색을 흰색으로 설정
    renderer.setClearColor(0x000000); // 흰색 배경
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 모든 면에 대해 하얀색 재질 생성
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 }), // 하얀색
    ];

    // 정육면체 생성 (재질 배열을 사용)
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // 광원 추가
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(50, 50, 100).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 강도를 0.5로 설정
    scene.add(ambientLight);

    // 카메라 위치 설정
    camera.position.z = 5;

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update(); // controls 업데이트
      renderer.render(scene, camera);
    };

    animate();

    // 창 크기 변경 시 카메라 비율 및 렌더러 크기 조정
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", () => {});
      controls.dispose();
    };
  }, []);

  return null;
};

export default App;
