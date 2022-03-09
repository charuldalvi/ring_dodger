import React, { useRef, useMemo, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { ringPositionState, pointcheckerPositionState } from "../gameState";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import Effects from "./Effects";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  PositionalAudio,
} from "@react-three/drei";
import wind from "../assets/music/wind.ogg";
import { useTrimesh } from "@react-three/cannon";

function Rings() {
  const rings = useRecoilValue(ringPositionState);
  const ring = useRef();
  const points = useRecoilValue(ringPositionState);
  const point = useRef();
  const leftbox = useRef();

  const reset = useResetRecoilState(ringPositionState);

  const [boxgeo, boxmat] = useMemo(() => {
    const boxgeo = new THREE.BoxBufferGeometry(1, 1, 1);
    const boxmat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xff0000),
      emissiveIntensity: 1,
      emissive: 0xb0e9ff,
      roughness: 1,
      opacity: 0.2,
    });

    return [boxgeo, boxmat];
  }, []);

  const [geo, mat] = useMemo(() => {
    const geo = new THREE.TorusBufferGeometry(2, 0.3, 16, 100, 6.3);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb0e9ff),
      emissiveIntensity: 1,
      emissive: 0xb0e9ff,
      roughness: 1,
      opacity: 0,
    });

    return [geo, mat];
  }, []);

  useFrame((state) => {
    var clock = state.clock;
    var time = 0;
    var delta = 0;
    var direction = new THREE.Vector3(0, 0, 1);
    var speed = 100; // units a second - 2 seconds

    delta = clock.getDelta();
    time += delta;

    // rings.forEach((enemy, i) => {
    //   if (enemy.z >= 860) {
    //     reset();
    //     ring.current.position.addScaledVector(direction, speed * delta);
    //     console.log(speed);
    //   } else {
    //   }
    // });
  });

  return (
    <group>
      {rings.map((enemy, i) => (
        <mesh
          ref={ring}
          visible={enemy.z > -80 ? true : false}
          position={[enemy.x, enemy.y, enemy.z]}
          key={i}
          geometry={geo}
          material={mat}
          material-transparent
          material-opacity={1}
        ></mesh>
      ))}

      {rings.map((enemy, i) => (
        <pointLight
          key={i}
          intensity={enemy.z > 0 ? 0 : 0.1}
          position={[enemy.x, enemy.y, enemy.z]}
        />
      ))}
      
    </group>
  );
}

export default Rings;
