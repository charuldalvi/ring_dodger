import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFrame } from "react-three-fiber";
import useStore from "./store";


function GameplayUI() {

    const lifeline = useStore((state) => state.lifeline);
    const score = useStore((state) => state.score);

    const secref = useRef()
    const minref = useRef()

    
    let totalSeconds = 0
    let timer = 0

    const timerText = document.querySelector('.timer');

    useEffect(() => {

        // setInterval(setTime, 1000);

        // function setTime() {
        //   ++totalSeconds;
        //   minref.current.innerHTML = pad(parseInt(totalSeconds / 60));
        //   secref.current.innerHTML = pad(totalSeconds % 60)
        // }
    })

 

  function pad(val) {
    var valString = val + " ";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  return (
    <div>
      <div className="ui">
        <p style={{color: "white", fontSize: "20px", marginBottom: "1px", marginLeft: "-12px"}}>Score</p>
        <div className="row">
          {/* <h1 ref={minref}></h1> */}
          <h1>{score}</h1>  
          {/* <h1 ref={secref}></h1> */}
        </div>
        {/* <div className="row">
                    <h1>Score : </h1>
                    &nbsp;<h1>{score}</h1>
                </div> */}
      </div>
      <div className="lifelineUI">
        <div className="row">
            <h1><span>Lifeline : </span> {lifeline}</h1>
        </div>
      </div>
      
    </div>
  );
}

export default GameplayUI;
