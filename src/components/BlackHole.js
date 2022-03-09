import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { blackholePositionState } from "../gameState";

function BlackHole() {
  const blackhole = useRecoilValue(blackholePositionState);

  const [geo, mat] = useMemo(() => {
    const geo = new THREE.CylinderBufferGeometry(5, 5, 50, 32, 1, true);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xff0000),
      emissiveIntensity: 1,
      emissive: 0x000000,
      roughness: 0.4,
      metalness: 0.3,
      opacity: 1,
    });

    return [geo, mat];
  }, []);

  return (
    <group>
      {blackhole.map((hole, i) => (
        <mesh
          visible={hole.z > -80 ? true : false}
          position={[hole.x, hole.y, hole.z]}
          rotation={[Math.PI / 2, 0, 0]}
          key={i}
          geometry={geo}
          material={mat}
          material-transparent
          material-opacity={1}
        />
      ))}
    </group>
  );
}

export default BlackHole;
