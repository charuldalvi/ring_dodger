import React, { useRef, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { meteorPositionState } from '../gameState';
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber';

//Physics
import { useSphere } from '@react-three/cannon';

const WhiteMeteor = (props) => {

   

    const [ref, api] = useSphere(() => ({mass: 1}))

    
  
    const [geo, mat] = useMemo(() => {
      const geo = new THREE.SphereBufferGeometry(1,12,12);
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
      
    //   rings.forEach((enemy, i) => {  
    //     if (enemy.z >= 820) {
    //       reset();
    //       ref.current.position.addScaledVector(direction, speed * delta);
    //       console.log(speed);
    //     } else {
    //     }
    //   });
  
    });

    return (
        <mesh
        ref={ref}
        visible={true}
        position={props.position}
        key={props.key}
        geometry={geo}
        material={mat}
      >
       
      </mesh>
    )
}

export default WhiteMeteor
