import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Html, OrbitControls, Stars, Stats, useProgress } from "@react-three/drei";
import {
  ringPositionState,
  smallringPositionState,
  pointcheckerPositionState,
  meteorPositionState,
  scoreState,
  shipPositionState,
  laserPositionState,
  whitemeteorPositionState,
} from "./gameState";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { RecoilRoot } from "recoil";
import * as THREE from "three";
import Planet from "./Planet.js";
import SpaceShip from "./SpaceShip.js";
import BlackMeteor from "./Black_Meteor";
import WhiteMeteor from "./White_Meteor";

import Rings from "./components/Rings";
import PointChecker from "./components/PointChecker";
import Background from "./components/Background";
import Effects from "./components/Effects";
import Meteor from "./components/Meteor";
import UI from "./components/UI";
import { Physics, useBox, useSphere, useTrimesh } from "@react-three/cannon";
import { Perf } from "r3f-perf";
import useStore from "./store";
import GameplayUI from "./GameplayUI";
import { Redirect } from "react-router";
import backgroundMusic from './assets/music/BGM.ogg'
let RING_SPEED = 0.5;

// Game settings.
const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = 0.1;
const GROUND_HEIGHT = -50;
let METEOR_VELOCITY = -0.5;

let elapsedTime = 0;





function InfiniteRings() {
  let group = useRef();
  let theta = 0;

  let z = 180;

  useFrame(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    group.current.position.z += 0.5;
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.TorusGeometry(2, 0.3, 16, 100, 6.3);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("hotpink"),
      emissiveIntensity: 1,
      emissive: 0xf61379,
      roughness: 1,
      opacity: 1,
      metalness: 1,
    });
    const coords = new Array(2500)
      .fill()
      .map((i) => [Math.random() * 12 - 8, 0, -180 - i * 60]);
    return [geo, mat, coords];
  }, []);
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
  );
}

function distance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

// This component runs game logic on each frame draw to update game state.
function GameTimer() {
  const [rings, setRings] = useRecoilState(ringPositionState);
  const [smallrings, setsmallRings] = useRecoilState(smallringPositionState);
  const [points, setPoints] = useRecoilState(pointcheckerPositionState);
  const [meteor, setMeteor] = useRecoilState(meteorPositionState);
  const [whitemeteor, setWhiteMeteor] = useRecoilState(
    whitemeteorPositionState
  );
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);

  useFrame(({ mouse, clock }) => {
    RING_SPEED += 0.00005;

    elapsedTime = clock.elapsedTime

    const hitEnemies = meteor
      ? meteor.map(
          (enemy) =>
            lasers.filter(
              () =>
                lasers.filter((laser) => distance(laser, enemy) < 1).length > 0
            ).length > 0
        )
      : [];

    if (hitEnemies.includes(true) && meteor.length > 0) {
      console.log("hit detected");
    }

    setRings(
      rings.map((ring) => ({ x: ring.x, y: ring.y, z: ring.z + RING_SPEED }))
    );

    setPoints(
      points.map((point) => ({
        x: point.x,
        y: point.y,
        z: point.z + RING_SPEED,
      }))
    );

    setMeteor(
      meteor
        .map((meteor) => ({ x: meteor.x, y: meteor.y, z: meteor.z + 0.8 }))
        .filter((enemy, idx) => !hitEnemies[idx])
    );

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
    );

    setWhiteMeteor(
      whitemeteor
        .map((met) => ({
          id: met.id,
          x: met.x * Math.random() * 4,
          y: met.y * Math.random() * 2,
          z: met.z - METEOR_VELOCITY,
        }))
        .filter((met) => met.z > 20)
    );
  });

  return null;
}



const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <OrbitControls
      ref={controls}
      enableZoom={true}
      enableRotate={true}
      args={[camera, domElement]}
    />
  );
};



function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "white", fontSize: "20px" }}>
      {parseInt(progress)} % loaded
    </Html>
  );
}

// An invisible clickable element in the front of the scene.
// Manages creating lasers with the correct initial velocity on click.
function LaserController() {
  const shipPosition = useRecoilValue(shipPositionState);
  const [lasers, setLasers] = useRecoilState(laserPositionState);
  return (
    <mesh
      position={[0, 0, 0]}
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
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color="orange"
        opacity={0.2}
        transparent
        visible={false}
      />
    </mesh>
  );
}

function MeteorController() {
  const [meteor, setMeteor] = useRecoilState(whitemeteorPositionState);

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
      ]);
    }, 500);
  }, []);

  useFrame(({ clock }) => {
    setMeteor([
      ...meteor,
      {
        id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
        x: 0,
        y: 0,
        z: 0,
      },
    ]);
  });

  return (
    <mesh position={[0, 0, -350]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color="orange"
        opacity={0.2}
        transparent
        visible={false}
      />
    </mesh>
  );
}

function Meteors() {
  const meteors = useRecoilValue(whitemeteorPositionState);
  return (
    <group>
      {meteors.map((laser) => (
        <mesh
          position={[laser.x, laser.y, laser.z]}
          key={`${laser.id}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereBufferGeometry attach="geometry" args={[1, 12, 12]} />
          <meshStandardMaterial
            attach="material"
            emissive="yellow"
            emissiveIntensity={1}
            color={"white"}
          />
        </mesh>
      ))}
    </group>
  );
}

// Draws all of the lasers existing in state.
function Lasers() {
  const lasers = useRecoilValue(laserPositionState);
  return (
    <group>
      {lasers.map((laser) => (
        <mesh
          position={[laser.x, laser.y, laser.z]}
          key={`${laser.id}`}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderBufferGeometry attach="geometry" args={[0.1, 0.03, 2, 32]} />
          <meshStandardMaterial
            attach="material"
            emissive="yellow"
            emissiveIntensity={1}
            color={"white"}
          />
        </mesh>
      ))}
    </group>
  );
}

function GameplayNext() {

  const reset =useStore((state) => state.reset)
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
        id="canvas"
        style={{
          width: "100vw",
          height: "100vh",
          position: "position",
          top: "0",
          left: "0",
          backgroundColor: "black",
        }}
      >
        <Canvas camera={{ fov: 75 }}>
          <Stats/>
          <RecoilRoot>
            {/* <CameraControls /> */}
            <directionalLight
              intensity={1}
              color={0xffffff}
              position={[0, 3, 2]}
            />
            <Suspense fallback={<Loader />}>
              <Background />
              <Planet />
              {/* <PointChecker /> */}
              <Physics
                gravity={[0, -30, 0]}
                defaultContactMaterial={{ restitution: 0 }}
              >
                <Meteor />
                <MeteorController />
                <Meteors />
                <SpaceShip />
                <Rings />
                {/* <Cube /> */}
              </Physics>
              <Lasers />
              <LaserController />
            </Suspense>
            <GameTimer />
          </RecoilRoot>
          <Effects />
        </Canvas>
        <GameplayUI/>
        {reset && <Redirect to="/GameOverUI" />}
        {/* {nextlevel && <Redirect to="/PlanetInfo" />} */}
      </div>
    </div>
  );
}

export default GameplayNext;
