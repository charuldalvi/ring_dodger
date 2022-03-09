import { useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {
  Html,
  OrbitControls,
  Stars,
  Stats,
  useFBX,
  useProgress,
} from '@react-three/drei'
import {
  ringPositionState,
  smallringPositionState,
  pointcheckerPositionState,
  meteorPositionState,
  scoreState,
  shipPositionState,
  laserPositionState,
  whitemeteorPositionState,
  blackholePositionState,
  lifelinePositionState,
  lifelinepointPositionState,
} from './gameState'
import './App.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RecoilRoot } from 'recoil'
import * as THREE from 'three'
import Planet from './Planet.js'
import SpaceShip from './SpaceShip.js'
import LowpolySpaceship from './LowpolySpaceship'
import BlackMeteor from './Black_Meteor'
import WhiteMeteor from './White_Meteor'

import Rings from './components/Rings'
import PointChecker from './components/PointChecker'
import Background from './components/Background'
import Effects from './components/Effects'
import Meteor from './components/Meteor'
import UI from './components/UI'
import { Physics, useBox, useSphere, useTrimesh } from '@react-three/cannon'
import { Perf } from 'r3f-perf'
import useStore from './store'
import GameplayUI from './GameplayUI'
import { Redirect } from 'react-router'
import BlackHole from './components/BlackHole'
import explosion from './assets/music/Explosion.flac'
import backgroundMusic from './assets/music/BGM.ogg'
import LifelineRings from './components/LifelineRings'
import { useSpring } from 'react-spring'

let RING_SPEED = 0.5

// Game settings.
const LASER_RANGE = 100
const LASER_Z_VELOCITY = 1
const ENEMY_SPEED = 0.1
const GROUND_HEIGHT = -50
let METEOR_VELOCITY = -0.5

let elapsedTime = 0

function InfiniteRings() {
  let group = useRef()
  let theta = 0

  let z = 180

  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    group.current.position.z += 0.5
  })

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.TorusGeometry(2, 0.3, 16, 100, 6.3)
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('hotpink'),
      emissiveIntensity: 1,
      emissive: 0xf61379,
      roughness: 1,
      opacity: 1,
      metalness: 1,
    })
    const coords = new Array(2500)
      .fill()
      .map((i) => [Math.random() * 12 - 8, 0, -180 - i * 60])
    return [geo, mat, coords]
  }, [])
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh
          key={i}
          visible={p3 > 20 ? false : true}
          geometry={geo}
          material={mat}
          position={[p1, p2, p3]}
        />
      ))}
    </group>
  )
}

function distance(p1, p2) {
  const a = p2.x - p1.x
  const b = p2.y - p1.y
  const c = p2.z - p1.z

  return Math.sqrt(a * a + b * b + c * c)
}

// This component runs game logic on each frame draw to update game state.
function GameTimer() {
  const [rings, setRings] = useRecoilState(ringPositionState)
  const [blackhole, setBlackhole] = useRecoilState(blackholePositionState)
  const [smallrings, setsmallRings] = useRecoilState(smallringPositionState)
  const [points, setPoints] = useRecoilState(pointcheckerPositionState)
  const [lifelinepoints, setLifelinePoints] = useRecoilState(
    lifelinepointPositionState
  )
  const [meteor, setMeteor] = useRecoilState(meteorPositionState)
  const [whitemeteor, setWhiteMeteor] = useRecoilState(whitemeteorPositionState)
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState)
  const [lifeline, setLifeLinePosition] = useRecoilState(lifelinePositionState)

  useFrame(({ mouse, clock }) => {
    RING_SPEED += 0.00005

    elapsedTime = clock.elapsedTime

    const hitEnemies = meteor
      ? meteor.map(
          (enemy) =>
            lasers.filter(
              () =>
                lasers.filter((laser) => distance(laser, enemy) < 1).length > 0
            ).length > 0
        )
      : []

    if (hitEnemies.includes(true) && meteor.length > 0) {
      const audio = new Audio(explosion)
      audio.play()
    }

    setRings(
      rings.map((ring) => ({ x: ring.x, y: ring.y, z: ring.z + RING_SPEED }))
    )

    setLifeLinePosition(
      lifeline.map((ring) => ({ x: ring.x, y: ring.y, z: ring.z + RING_SPEED }))
    )

    setPoints(
      points.map((point) => ({
        x: point.x,
        y: point.y,
        z: point.z + RING_SPEED,
      }))
    )

    setLifelinePoints(
      lifelinepoints.map((point) => ({
        x: point.x,
        y: point.y,
        z: point.z + RING_SPEED,
      }))
    )

    setMeteor(
      meteor
        .map((meteor) => ({ x: meteor.x, y: meteor.y, z: meteor.z + 0.8 }))
        .filter((enemy, idx) => !hitEnemies[idx])
    )

    setBlackhole(
      blackhole.map((hole) => ({
        x: hole.x,
        y: hole.y,
        z: hole.z + RING_SPEED,
      }))
    )

    // Move the Lasers and remove lasers at end of range or that have hit the ground.
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity,
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    )

    setWhiteMeteor(
      whitemeteor
        .map((met) => ({
          id: met.id,
          x: met.x * Math.random() * 4,
          y: met.y * Math.random() * 2,
          z: met.z - METEOR_VELOCITY,
        }))
        .filter((met) => met.z > 20)
    )
  })

  return null
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree()
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame((state) => controls.current.update())
  return (
    <OrbitControls
      ref={controls}
      enableZoom={true}
      enableRotate={true}
      args={[camera, domElement]}
    />
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: 'white', fontSize: '25px' }}>
      {parseInt(progress)} % loaded
    </Html>
  )
}

// An invisible clickable element in the front of the scene.
// Manages creating lasers with the correct initial velocity on click.
function LaserController() {
  const shipPosition = useRecoilValue(shipPositionState)
  const [lasers, setLasers] = useRecoilState(laserPositionState)
  return (
    <mesh
      position={[0, 0, 2]}
      onClick={() =>
        setLasers([
          ...lasers,
          {
            id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
            x: 0,
            y: 0,
            z: 0,
            velocity: [
              shipPosition.rotation.x * 1,
              shipPosition.rotation.y * 2,
            ],
          },
        ])
      }
    >
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial
        attach='material'
        color='orange'
        opacity={0.2}
        transparent
        visible={false}
      />
    </mesh>
  )
}

function MeteorController() {
  const [meteor, setMeteor] = useRecoilState(whitemeteorPositionState)

  useEffect(() => {
    setTimeout(() => {
      setMeteor([
        ...meteor,
        {
          id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
          x: 0,
          y: 0,
          z: 0,
        },
      ])
    }, 500)
  }, [])

  useFrame(({ clock }) => {
    setMeteor([
      ...meteor,
      {
        id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
        x: 0,
        y: 0,
        z: 0,
      },
    ])
  })

  return (
    <mesh position={[0, 0, -350]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshStandardMaterial
        attach='material'
        color='orange'
        opacity={0.2}
        transparent
        visible={false}
      />
    </mesh>
  )
}

function Meteors() {
  const meteors = useRecoilValue(whitemeteorPositionState)
  return (
    <group>
      {meteors.map((laser) => (
        <mesh
          position={[laser.x, laser.y, laser.z]}
          key={`${laser.id}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereBufferGeometry attach='geometry' args={[1, 12, 12]} />
          <meshStandardMaterial
            attach='material'
            emissive='yellow'
            emissiveIntensity={1}
            color={'white'}
          />
        </mesh>
      ))}
    </group>
  )
}

// Draws all of the lasers existing in state.
function Lasers() {
  const lasers = useRecoilValue(laserPositionState)
  return (
    <group>
      {lasers.map((laser) => (
        <mesh
          position={[laser.x, laser.y, laser.z]}
          key={`${laser.id}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderBufferGeometry attach='geometry' args={[0.1, 0.03, 2, 32]} />
          <meshStandardMaterial
            attach='material'
            emissive='yellow'
            emissiveIntensity={1}
            color={'white'}
          />
        </mesh>
      ))}
    </group>
  )
}

function FighterJet() {
  const fbx = useFBX('/Space Explorer/Low_Poly_Spaceship/spaceship.fbx')

  const group = useRef()

  const colorMap = useLoader(
    THREE.TextureLoader,
    '/Space Explorer/Low_Poly_Spaceship/spaceshipbody_col.jpg'
  )
  const metalnessMap = useLoader(
    THREE.TextureLoader,
    '/Space Explorer/Low_Poly_Spaceship/spaceship_metal.jpg'
  )
  const roughnessMap = useLoader(
    THREE.TextureLoader,
    '/Space Explorer/Low_Poly_Spaceship/spaceship_rough.jpg'
  )
  const emissiveMap = useLoader(
    THREE.TextureLoader,
    '/Space Explorer/Low_Poly_Spaceship/spaceship_Emm.png'
  )

  const newScore = useStore((state) => state.score)

  const incrementScore = useStore((state) => state.incrementScore)
  const incrementlifeline = useStore((state) => state.incrementtLifeline)

  const [shipPosition, setshipPosition] = useRecoilState(shipPositionState)
  const [points, setPoints] = useRecoilState(pointcheckerPositionState)
  const [meteors, setMeteors] = useRecoilState(meteorPositionState)
  const [rings, setRings] = useRecoilState(ringPositionState)
  const [score, setScore] = useRecoilState(scoreState)
  const [lifelinepoints, setLifelinePoints] = useRecoilState(
    lifelinepointPositionState
  )

  const decrementLifeline = useStore((state) => state.decrementLifeline)
  const lifeline = useStore((state) => state.lifeline)
  const reset = useStore((state) => state.reset)
  const setReset = useStore((state) => state.setResetTrue)

  const [expand, setExpand] = useState(true)

  // const [ref, api] = useBox(() => ({
  //   mass: 0,
  //   args: [1,1,1],
  // }));

  const p = useSpring({
    scale: expand ? [0.8, 1.57, 0.35] : [0.4, 1.2, 0.15],
  })

  useFrame(({ mouse }) => {
    setshipPosition({
      position: { x: mouse.x * 5, y: mouse.y * 2 },
      rotation: { z: mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
    })
  })
  // Update the ships position from the updated state.
  useFrame((state) => {
    group.current.rotation.z = shipPosition.rotation.z
    group.current.rotation.y = shipPosition.rotation.x
    group.current.rotation.x = shipPosition.rotation.y
    group.current.position.y = shipPosition.position.y
    group.current.position.x = shipPosition.position.x

    const { camera } = state

    const hitPoints = points
      ? points.map(
          (point) =>
            points.filter((en) => distance(group.current.position, point) < 3)
              .length > 0
        )
      : []

    // console.log(hitPoints);

    if (hitPoints.includes(true) && points.length > 0) {
      // setScore(score + 10);
      incrementScore()
    }

    // Move all of the points. Remove points that have been destroyed, or passed the player.
    setPoints(
      points
        .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z }))
        .filter((enemy, idx) => !hitPoints[idx])
    )

    const hitLifelinePoints = lifelinepoints
      ? lifelinepoints.map(
          (point) =>
            lifelinepoints.filter(
              (en) => distance(group.current.position, point) < 3
            ).length > 0
        )
      : []

    // console.log(hitLifelinePoints);

    if (hitLifelinePoints.includes(true) && lifelinepoints.length > 0) {
      console.log('lifeline increment')
      incrementlifeline()
    }

    // Move all of the points. Remove points that have been destroyed, or passed the player.
    setLifelinePoints(
      lifelinepoints
        .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z }))
        .filter((enemy, idx) => !hitLifelinePoints[idx])
    )

    const hitMeteors = meteors
      ? meteors.map(
          (meteor) =>
            meteors.filter((en) => distance(group.current.position, meteor) < 1)
              .length > 0
        )
      : []

    // console.log(hitPoints);

    if (hitMeteors.includes(true) && meteors.length > 0) {
      console.log('spaceship hit')
      if (lifeline < 1) {
        setReset()
        console.log(lifeline)
      } else {
        decrementLifeline()
      }
    }

    // Move all of the points. Remove points that have been destroyed, or passed the player.
    setMeteors(
      meteors
        .map((meteor) => ({ x: meteor.x, y: meteor.y, z: meteor.z }))
        .filter((meteor, idx) => !hitMeteors[idx])
    )
  })

  return (
    <group ref={group} dispose={null}>
      <mesh
        material={fbx.children[0].material}
        geometry={fbx.children[0].geometry}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshPhysicalMaterial
          attach='material'
          map={colorMap}
          metalnessMap={metalnessMap}
          roughnessMap={roughnessMap}
          emissiveMap={emissiveMap}
          metalness={0.5}
          roughness={1}
          emissiveIntensity={15}
          emissive={0xffffff}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  )
}

function Gameplay() {
  const reset = useStore((state) => state.reset)
  const nextlevel = useStore((state) => state.nextlevel)

  const audio = new Audio(backgroundMusic)
  audio.loop = true

  useEffect(() => {
    audio.play()
    return () => {
      audio.pause()
    }
  }, [audio])

  return (
    <div>
      <div
        id='canvas'
        style={{
          width: '100vw',
          height: '100vh',
          position: 'position',
          top: '0',
          left: '0',
          backgroundColor: 'black',
        }}
      >
        <Canvas camera={{ fov: 85 }}>
          <Stats />
          <RecoilRoot>
            {/* <CameraControls /> */}
            <directionalLight
              intensity={1}
              color={0xffffff}
              position={[0, 3, 2]}
            />
            <Physics
              gravity={[0, -30, 0]}
              defaultContactMaterial={{ restitution: 0 }}
            >
              <Suspense fallback={<Loader />}>
                <Background />
                <Meteor />
                <MeteorController />
                {/* <Meteors /> */}
                {/* <SpaceShip /> */}
                {/* <LowpolySpaceship /> */}
                <FighterJet />
                <Rings />
                <LifelineRings />
                <Planet />
                <Lasers />
                <BlackHole />
                <LaserController />
              </Suspense>
            </Physics>
            <GameTimer />
          </RecoilRoot>
          <Effects />
        </Canvas>
        <GameplayUI />
        {reset && <Redirect to='/GameOverUI' />}
        {nextlevel && <Redirect to='/PlanetInfo' />}
      </div>
    </div>
  )
}

export default Gameplay
