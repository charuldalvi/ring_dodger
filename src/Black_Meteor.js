/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: 29938490 (https://sketchfab.com/DeonWoodward)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/dbd699a1bf2249a596ecc411ab69679f
title: Moon/ Meteor
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'
import { meteorPositionState } from './gameState'
import { useRecoilValue } from 'recoil'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/meteors/scene.gltf')

  const meteors = useRecoilValue(meteorPositionState);


  useFrame(() => {
    group.current.position.z += 0.1;
    group.current.position.y -= 0.02;
  })

  return (
    
    <group ref={group} {...props} dispose={null} position={props.position}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.4, 0.4 , 0.4]} >
        <group rotation={[-0.27, 0.6, 1.93]} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_1.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_2.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_3.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_4.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_5.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_6.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_7.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_8.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_9.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_10.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_11.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_12.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_13.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_14.geometry} material-transparent material-opacity={1} />
        <mesh material={materials.Root} geometry={nodes.Icosphere_0_15.geometry} material-transparent material-opacity={1} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
