import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three'
import { AdditiveBlending } from 'three';

function Background() {

  const ref = useRef()

    const vertexShader = `
    void main() {
      gl_Position = vec4( position, 1.0 );
  }
  `;
  
    const fragmentShader = `#ifdef GL_ES
    precision mediump float;
    #endif
  
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float time;
  
    float Cell(vec2 c) {
      vec2 uv = fract(c);
      c -= uv;
      return (1.-length(uv*10.-1.)) * step(fract(sin(c.x+c.y*1e2)*1e3), .04);
    }
  
    void main() {
  
         vec2 p = gl_FragCoord.xy / u_resolution.xy -.5;
         float a = fract(atan(p.x, p.y) / 6.2832);
         float d = length(p);
  
         vec2 coord = vec2(pow(d, .04), a)*256.;
         vec2 delta = vec2(1. + u_time*time, 0.);
  
         float c = Cell(coord-=delta);
         c += Cell(coord-=delta);
  
         gl_FragColor = vec4(c*d*3.);
    }`;
  
    const uniforms = useMemo(
      () => ({
        u_time: { type: "f", value: 1.0 },
        time: {type: "f", value: 0.6},
        u_resolution: { type: "v2", value: new THREE.Vector2() },
      }),
      []
    );
  
    useFrame(() => {
      uniforms.u_time.value += 0.05;
      uniforms.time.value += 0.0001;
    });
  
    useLayoutEffect(() => {
      uniforms.u_resolution.value.x = window.innerWidth;
      uniforms.u_resolution.value.y = window.innerHeight;
      
    });
  
    return (
      <mesh ref={ref}>
        <planeBufferGeometry attach="geometry" args={[2, 2]}/>
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={false}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    );
}

export default Background
