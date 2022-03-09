import React, { useRef, useMemo } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { lifelinepointPositionState } from '../gameState';
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber';
import Effects from './Effects';

function LifelinePointChecker() {
    const points = useRecoilValue(lifelinepointPositionState);
    const point = useRef();

    const lifeline = useStore((state) => state.lifeline);
  
    const reset = useResetRecoilState(lifelinepointPositionState);
  
    const [geo, mat] = useMemo(() => {
      const geo = new THREE.PlaneBufferGeometry(2,2);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFFFFFF),
        opacity: 1,
        visible: true,
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
      speed += delta;
      
      // points.forEach((p, i) => {  
      //   if (p.z >= 860) {
      //     reset();
      //     point.current.position.addScaledVector(direction, speed * delta);
          
      //   } else {
      //   }
      // });
  
      
    });
  
    
  
    return (
      <group>
        {points.map((enemy, i) => (
          
          <mesh
            ref={point}
            visible={lifeline < 3  ? true : false}
            position={[enemy.x, enemy.y , enemy.z]}
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

export default LifelinePointChecker
