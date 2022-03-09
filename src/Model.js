/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei'

import { useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/new_spaceship/model.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="Ship"
        material={materials['Material.001']}
        geometry={nodes.Ship.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.01, 0.01, 0.01]}>
        <mesh
          name="Circle"
          material={materials['Material.002']}
          geometry={nodes.Circle.geometry}
          position={[-111.63, -276.49, -20.31]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 100, 125.33]}
        />
        <mesh
          name="Circle001"
          material={materials['Material.002']}
          geometry={nodes.Circle001.geometry}
          position={[109.24, -276.49, -20.31]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 100, 125.33]}
        />
        <mesh
          name="Shield"
          material={materials.shield}
          geometry={nodes.Shield.geometry}
          position={[-0.01, -276.26, 20.64]}
          rotation={[Math.PI / 2, 0, 2.87]}
          scale={[-100, -100, -100]}
        />
        <mesh
          name="Shield001"
          material={materials.shield}
          geometry={nodes.Shield001.geometry}
          position={[-0.01, -276.26, 20.64]}
          rotation={[-Math.PI / 2, 0, -0.28]}
          scale={[100, 100, 100]}
        />
        <mesh
          name="Shield002"
          material={materials.shield}
          geometry={nodes.Shield002.geometry}
          position={[-0.01, -276.26, 20.64]}
          rotation={[Math.PI / 2, 0, 2.87]}
          scale={[-100, -100, -100]}
        />
        <mesh
          name="Torus001"
          material={materials['Material.003']}
          geometry={nodes.Torus001.geometry}
          position={[-111.63, -569.82, -20.31]}
          rotation={[-Math.PI / 2, 0, -2.51]}
          scale={[32.77, 32.77, 32.77]}
        />
        <mesh
          name="Torus004"
          material={materials['Material.003']}
          geometry={nodes.Torus004.geometry}
          position={[-111.63, -276.49, -20.31]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 100, 100]}
        />
        <mesh
          name="Torus007"
          material={materials['Material.003']}
          geometry={nodes.Torus007.geometry}
          position={[109.24, -569.82, -20.31]}
          rotation={[-Math.PI / 2, 0, -2.51]}
          scale={[32.77, 32.77, 32.77]}
        />
        <mesh
          name="Torus000"
          material={materials['Material.003']}
          geometry={nodes.Torus000.geometry}
          morphTargetDictionary={nodes.Torus000.morphTargetDictionary}
          morphTargetInfluences={nodes.Torus000.morphTargetInfluences}
          position={[109.24, -667.6, -20.31]}
          rotation={[-Math.PI / 2, 0, -1.26]}
          scale={[5.76, 5.76, 5.76]}
        />
        <mesh
          name="Torus002"
          material={materials['Material.003']}
          geometry={nodes.Torus002.geometry}
          morphTargetDictionary={nodes.Torus002.morphTargetDictionary}
          morphTargetInfluences={nodes.Torus002.morphTargetInfluences}
          position={[-111.63, -472.04, -20.31]}
          rotation={[-Math.PI / 2, 0, -2.51]}
          scale={[107.74, 107.74, 107.74]}
        />
        <mesh
          name="Torus003"
          material={materials['Material.003']}
          geometry={nodes.Torus003.geometry}
          morphTargetDictionary={nodes.Torus003.morphTargetDictionary}
          morphTargetInfluences={nodes.Torus003.morphTargetInfluences}
          position={[-111.63, -374.26, -20.31]}
          rotation={[-Math.PI / 2, 0, -1.26]}
          scale={[124.96, 124.96, 124.96]}
        />
        <mesh
          name="Torus005"
          material={materials['Material.003']}
          geometry={nodes.Torus005.geometry}
          morphTargetDictionary={nodes.Torus005.morphTargetDictionary}
          morphTargetInfluences={nodes.Torus005.morphTargetInfluences}
          position={[109.24, -374.26, -20.31]}
          rotation={[-Math.PI / 2, 0, -1.26]}
          scale={[124.96, 124.96, 124.96]}
        />
        <mesh
          name="Torus006"
          material={materials['Material.003']}
          geometry={nodes.Torus006.geometry}
          morphTargetDictionary={nodes.Torus006.morphTargetDictionary}
          morphTargetInfluences={nodes.Torus006.morphTargetInfluences}
          position={[109.24, -472.04, -20.31]}
          rotation={[-Math.PI / 2, 0, -2.51]}
          scale={[107.74, 107.74, 107.74]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/new_spaceship/model.gltf')
