/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: jack2388 (https://sketchfab.com/jack2388)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/meteor-b3e9854bc59e4e1a9c83baf9633199ad
title: Meteor
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/meteors/white/scene.gltf')

  useFrame(() => {
    group.current.position.z += 0.01;
    group.current.position.y -= 0.001;
    group.current.position.x += 0.001;
  })
  return (
    <group ref={group} {...props} dispose={null} scale={[0.2, 0.2 ,0.2]} position={props.position}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group  rotation={[1.73, 0, 0]}>
            <mesh material={materials['Material.001']} geometry={nodes.mesh_0.geometry} material-transparent material-opacity = {1} />
            <mesh material={materials['Material.001']} geometry={nodes.mesh_1.geometry} material-transparent material-opacity = {1} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/meteors/white//scene.gltf')