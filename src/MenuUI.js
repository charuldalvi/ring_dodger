import React, { useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Link } from "react-router-dom";
import Background from "./components/Background";
import * as THREE from "three";
import AgencyFB from "./assets/Agency FB_Regular.json";
import backgroundMusic from './assets/music/BGM.ogg'

function TextComponent() {
  const font = new THREE.FontLoader().parse(AgencyFB);

  // configure font geometry
  const textOptions = {
    font,
    size: 0.9,
    height: 0.1,
  };

  useFrame((state) => {

    const {camera} = state

    // camera.rotation.z = state.mouse.x * 3

  });

  return (
    <mesh position={[-3.2, 0.5, 0]}>
      <textBufferGeometry
        attach="geometry"
        args={["Search Planet X", textOptions]}
      />
      <meshNormalMaterial attach="material" opacity={0.9}/>
    </mesh>
  );
}

function MenuUI() {


  const audio = new Audio(backgroundMusic)
  audio.loop = true

  useEffect(() => {
    audio.play()
    return () => {
      audio.pause()
    }
  }, [audio])


  return (
    <section
      style={{ width: "100%", height: "100vh", backgroundColor: "black" }}
    >
      <Canvas>
        <Background />
        <TextComponent/>
      </Canvas>
      <div className="menu-ui d-flex justify-content-center align-items-center mt-5">
        <div className="container text-center">
          {/* <h1>Search Planet X</h1> */}
          <p>Discover the New World</p>
          <div className="button">
            <Link exact to="/Gameplay">
              Find
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuUI;
