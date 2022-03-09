import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "react-three-fiber";
import Background from "./components/Background";
import backgroundMusic from './assets/music/BGM.ogg'
import useStore from "./store";

function GameOverUI() {

    const resetFalse = useStore((state) => state.setResetFalse)
    const resetScore =useStore((state) => state.resetScore)
    const resetLifeline =useStore((state) => state.resetLifeline)
  
    useEffect(() => {
      resetFalse()
      resetScore()
      resetLifeline()
    },[])
  

    const audio = new Audio(backgroundMusic)
    audio.loop = true
  
    useEffect(() => {
      audio.play()
      return () => {
        audio.pause()
      }
    }, [audio])

  return (
    <div style={{width: "100%", height: "100vh", backgroundColor: "black"}}>
      <Canvas>
        <Background />
      </Canvas>
      <div className="gameoverui d-flex flex-column justify-content-center align-items-center">
        <div>
          <h1>Game Over</h1>
          <div className="button">
            <Link exact to="/Gameplay">
              Play Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOverUI;
