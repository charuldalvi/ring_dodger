import React, { useEffect, useRef } from 'react'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { extend, useFrame, useThree } from 'react-three-fiber'


extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })


function Effects() {
    const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    
    composer.current.render()
  }, 2)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera}  />
      <unrealBloomPass attachArray="passes" args={[undefined, 1, 0.8, 0.1]} />
      <filmPass attachArray="passes" args={[0.05, 0.5, 1000, false]} />
    </effectComposer>
  )
}

export default Effects
