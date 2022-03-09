import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import Background from "./components/Background";
import useStore from "./store";
import uranus from "./assets/uranus.jpg";
import { Perf } from "r3f-perf";

function PlanetInfo() {
  const resetFalse = useStore((state) => state.setResetFalse);
  const resetScore = useStore((state) => state.resetScore);
  const resetLifeline = useStore((state) => state.resetLifeline);
  const setNextLevelFalse = useStore((state) => state.setNextLevelFalse);

  useEffect(() => {
    resetFalse();
    resetScore();
    resetLifeline();
    setNextLevelFalse();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <Canvas>
      
        <Background />
      </Canvas>
      <div className="planetinfo d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1>Congratulations</h1>
          <h2 className="text-center" style={{ color: "white", opacity: 0.4 }}>
            You found a new Planet
          </h2>
          <div className="button">
            <Link exact to="/Gameplay">
              Next Level
            </Link>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="imageholder">
          <img src={uranus} alt="Uranus" />
        </div>
        <h1 className="mr-5">Uranus</h1>
        <div className="row d-flex justify-content-start align-items-center ml-auto">
          <h3 className="mr-5 mt-3">Diameter</h3>
          <h2 className="mt-3">50, 724 km</h2>
        </div>
        <div className="row d-flex justify-content-start align-items-center ml-auto">
          <h3 className="mr-5 mt-3">Habitable</h3>
          <h2 className="mt-3">No</h2>
        </div>
        <div className="row d-flex justify-content-start align-items-center ml-auto">
          <h3 className="mt-3">Atmosphere</h3>
          <h2 className="ml-4 mt-3">No</h2>
        </div>
        <div className="d-flex flex-column mt-3">
          <h3>Distance from Sun</h3>
          <h1>2.871 billion km</h1>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default PlanetInfo;
