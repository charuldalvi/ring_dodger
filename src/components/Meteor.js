import React, { useRef, useMemo } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  ringPositionState,
  pointcheckerPositionState,
  meteorPositionState,
} from "../gameState";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

//Physics
import { useSphere } from "@react-three/cannon";
import { MeshWobbleMaterial } from "@react-three/drei";

const Meteor = () => {
  const rings = useRecoilValue(meteorPositionState);
  const ring = useRef();

  const [ref, api] = useSphere(() => ({
    mass: 0,
    args: [3, 12, 12],
    onCollide: (obj) => {
      if (obj.body.name === "Spaceship") {
        console.log("Spaceship");
      }
    },
  }));

  const reset = useResetRecoilState(meteorPositionState);

  const [geo, mat] = useMemo(() => {
    const geo = new THREE.IcosahedronBufferGeometry(1, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x808080),
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

    rings.forEach((enemy, i) => {

      if (enemy.z >= 800) {
        reset();
        ref.current.position.addScaledVector(direction, speed * delta);

        console.log(speed);
      } else {
      }
    });
  });

  return (
    <group ref={ref} name={"Meteor"}>
      {rings.map((enemy, i) => (
        <mesh
          ref={ring}
          visible={enemy.z > -80 ? true : false}
          position={[enemy.x, enemy.y, enemy.z]}
          key={i}
          geometry={geo}
         
        >
          <MeshWobbleMaterial
            attach="material"
            color="grey"
            factor={1}
            speed={0.2}
          />
        </mesh>
      ))}
      {rings.map((enemy, i) => (
        <mesh
          visible={enemy.z > -80 ? true : false}
          position={[enemy.x, enemy.y, enemy.z]}
          key={i}
        >
          <sphereBufferGeometry attach="geometry" args={[1, 12, 12]} />
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Meteor;
