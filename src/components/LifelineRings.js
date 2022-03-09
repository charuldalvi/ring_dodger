import React, { useRef, useMemo, useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { lifelinePositionState } from "../gameState";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import Effects from "./Effects";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  PositionalAudio,
} from "@react-three/drei";
import life from "../assets/music/Life.ogg";
import useStore from '../store'

function LifelineRings() {
    const rings = useRecoilValue(lifelinePositionState);
    const ring = useRef();
    
    const lifeline = useStore((state) => state.lifeline);

    const reset = useResetRecoilState(lifelinePositionState);
  
    const [geo, mat] = useMemo(() => {
      const geo = new THREE.TorusBufferGeometry(2, 0.3, 16, 100, 6.3);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffff00),
        emissiveIntensity: 1,
        emissive: 0xFFE333,
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
            visible={lifeline < 3  ? true : false}
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
            visible={lifeline < 3  ? true : false}
            intensity={enemy.z > 0 ? 0 : 0.1}
            color={0xFFE333}
            position={[enemy.x, enemy.y, enemy.z]}
          />
        ))}
        
      </group>
    );
}

export default LifelineRings
